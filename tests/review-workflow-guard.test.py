"""Run with python3 tests/review-workflow-guard.test.py (requires PyYAML 6.0.3)."""
import copy
from pathlib import Path
import subprocess
import tempfile
import unittest
import yaml

PATH = Path(__file__).resolve().parents[1] / '.github/workflows/deploy-website-review.yml'
SOURCE = PATH.read_text()
WORKFLOW = yaml.safe_load(SOURCE)
GUARD_NAME = 'Verify workflow has no unrelated infrastructure operations'
STEPS = WORKFLOW['jobs']['validate-and-deploy-review']['steps']
GUARD = next(s for s in STEPS if s['name'] == GUARD_NAME)


def accepts(workflow):
    source = yaml.safe_dump(workflow, sort_keys=False)
    if "<<'PYTHON'" in GUARD['run']:
        code = GUARD['run'].split("<<'PYTHON'\n", 1)[1].rsplit('\nPYTHON', 1)[0]
        scope = {'__name__': 'guard_test'}
        exec(compile(code, str(PATH), 'exec'), scope)
        try:
            scope['validate_workflow'](source)
            return True
        except (ValueError, AssertionError, yaml.YAMLError):
            return False
    # Exercise the original guard to demonstrate the self-match regression.
    with tempfile.TemporaryDirectory() as directory:
        path = Path(directory) / '.github/workflows/deploy-website-review.yml'
        path.parent.mkdir(parents=True)
        path.write_text(source)
        return subprocess.run(['bash', '-c', GUARD['run']], cwd=directory,
                              capture_output=True).returncode == 0


class ReviewWorkflowGuardTests(unittest.TestCase):
    def test_approved_review_workflow_passes(self):
        self.assertTrue(accepts(WORKFLOW))

    def test_comments_and_literal_diagnostics_are_not_commands(self):
        changed = copy.deepcopy(WORKFLOW)
        for step in changed['jobs']['validate-and-deploy-review']['steps']:
            if 'run' in step and step['name'] != GUARD_NAME:
                step['run'] += '\n# vercel supabase rts-deep-dive cloudflare zones\necho "Forbidden Vercel/Supabase/domain operation"\n'
        changed['name'] = 'Notes about Vercel and Supabase'
        self.assertTrue(accepts(changed))

    def test_infrastructure_commands_fail_closed_in_every_step(self):
        commands = [
            'vercel deploy --prod', 'npx supabase db push',
            'git -C rts-deep-dive push', 'npx wrangler routes delete route-id',
            'npx wrangler domains add example.com',
            'curl -X DELETE https://api.cloudflare.com/client/v4/zones/id/dns_records/id',
            'npx wrangler deploy --name rts-website',
            'npx wrangler delete rts-website',
            'bash -c "vercel deploy"', 'echo "$(vercel deploy)"',
            'echo safe; supabase db push', 'node ./unreviewed-script.js',
        ]
        for index, step in enumerate(STEPS):
            if 'run' not in step or step['name'] == GUARD_NAME:
                continue
            for command in commands:
                with self.subTest(step=step['name'], command=command):
                    changed = copy.deepcopy(WORKFLOW)
                    changed['jobs']['validate-and-deploy-review']['steps'][index]['run'] += '\n' + command + '\n'
                    self.assertFalse(accepts(changed))

    def test_new_steps_actions_jobs_and_execution_overrides_fail(self):
        for addition in ({'run': 'vercel deploy'}, {'uses': 'supabase/setup-cli@v1'}):
            changed = copy.deepcopy(WORKFLOW)
            changed['jobs']['validate-and-deploy-review']['steps'].append(addition)
            self.assertFalse(accepts(changed))
        changed = copy.deepcopy(WORKFLOW)
        changed['jobs']['other'] = {'runs-on': 'ubuntu-latest', 'steps': [{'run': 'vercel deploy'}]}
        self.assertFalse(accepts(changed))
        for key, value in [('defaults', {'run': {'shell': 'sh'}}), ('env', {'BASH_ENV': '/tmp/injected'})]:
            changed = copy.deepcopy(WORKFLOW)
            changed[key] = value
            self.assertFalse(accepts(changed))

    def test_identity_and_sha_guards_cannot_be_removed(self):
        for name in ('Validate requested candidate', 'Enforce exact checked-out SHA', 'Fail closed on review Worker configuration'):
            changed = copy.deepcopy(WORKFLOW)
            changed['jobs']['validate-and-deploy-review']['steps'] = [s for s in changed['jobs']['validate-and-deploy-review']['steps'] if s['name'] != name]
            self.assertFalse(accepts(changed))
        for key, value in [('EXPECTED_REPOSITORY', 'other/repo'), ('EXPECTED_WORKER', 'rts-website'), ('EXPECTED_ASSET_DIRECTORY', './other')]:
            changed = copy.deepcopy(WORKFLOW)
            changed['jobs']['validate-and-deploy-review']['env'][key] = value
            self.assertFalse(accepts(changed))

    def test_guard_must_run_first_and_cannot_be_skipped(self):
        changed = copy.deepcopy(WORKFLOW)
        steps = changed['jobs']['validate-and-deploy-review']['steps']
        guard = next(s for s in steps if s['name'] == GUARD_NAME)
        steps.remove(guard)
        steps.append(guard)
        self.assertFalse(accepts(changed))
        for key, value in [('if', 'false'), ('continue-on-error', True)]:
            changed = copy.deepcopy(WORKFLOW)
            next(s for s in changed['jobs']['validate-and-deploy-review']['steps'] if s['name'] == GUARD_NAME)[key] = value
            self.assertFalse(accepts(changed))

    def test_original_repository_and_candidate_checks_execute(self):
        import os
        run = next(s['run'] for s in STEPS if s['name'] == 'Validate requested candidate')
        for repo, candidate, expected in [
            ('teerex-bit/rts-website', '3b2f273fa00e07dd5db9b79c49331ab581ad9487', True),
            ('teerex-bit/other', '3b2f273fa00e07dd5db9b79c49331ab581ad9487', False),
            ('teerex-bit/rts-website', 'main', False),
            ('teerex-bit/rts-website', '3b2f273', False),
        ]:
            result = subprocess.run(['bash', '-c', run.replace('${{ inputs.candidate }}', candidate)],
                env={**os.environ, 'GITHUB_REPOSITORY': repo, 'EXPECTED_REPOSITORY': 'teerex-bit/rts-website'},
                capture_output=True)
            self.assertEqual(result.returncode == 0, expected)

    def test_original_worker_configuration_guard_executes(self):
        import json
        import os
        run = next(s['run'] for s in STEPS if s['name'] == 'Fail closed on review Worker configuration')
        baseline = {'name': 'rts-website-review', 'assets': {'directory': './public'}}
        variants = [(baseline, True)]
        for key, value in [('name', 'rts-website'), ('name', 'other-review'),
                           ('assets', {'directory': './other'}), ('routes', []),
                           ('route', 'reformingthesoul.com/*'), ('other', 'www.reformingthesoul.com')]:
            variants.append(({**baseline, key: value}, False))
        with tempfile.TemporaryDirectory() as directory:
            Path(directory, 'public').mkdir()
            for config, expected in variants:
                Path(directory, 'wrangler.jsonc').write_text(json.dumps(config))
                result = subprocess.run(['bash', '-c', run], cwd=directory,
                    env={**os.environ, **WORKFLOW['jobs']['validate-and-deploy-review']['env'],
                         'GITHUB_REPOSITORY': 'teerex-bit/rts-website'}, capture_output=True)
                self.assertEqual(result.returncode == 0, expected, config)

    def test_original_exact_checkout_enforcement_executes(self):
        import os
        run = next(s['run'] for s in STEPS if s['name'] == 'Enforce exact checked-out SHA')
        root = PATH.parents[2]
        actual = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip()
        with tempfile.NamedTemporaryFile() as env_file:
            for candidate, expected in [(actual, True), ('0' * 40, False)]:
                result = subprocess.run(['bash', '-c', run.replace('${{ inputs.candidate }}', candidate)],
                    cwd=root, env={**os.environ, 'GITHUB_ENV': env_file.name}, capture_output=True)
                self.assertEqual(result.returncode == 0, expected)

if __name__ == '__main__':
    unittest.main(verbosity=2)
