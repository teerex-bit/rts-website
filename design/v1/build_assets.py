"""Trace the approved V1 board once; export identical paths in the RTS palette.

Requires Pillow, numpy, potracer, and Inkscape. No font substitution or
independent drawing is used. The first (approved primary) panel is the source.
"""
from pathlib import Path
import subprocess
import numpy as np
from PIL import Image
import potrace

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public/assets'
source = Image.open(Path(__file__).with_name('approved-color-board.png')).convert('RGB')
# Exact artwork bounds, excluding presentation headings and colorway labels.
art = np.array(source)[84:480, 30:362]
foreground = art.max(axis=2) > 105
y, x = np.indices(foreground.shape)
symbol = foreground & ((y < 258) | ((art[:,:,0].astype(int) - art[:,:,2].astype(int)) > 45))
lettering = foreground & ~symbol

def paths(mask):
    curves = potrace.Bitmap(~mask).trace(turdsize=1, alphamax=1, opttolerance=.12)
    commands = []
    def point(p):
        return f'{p.x:.3f},{p.y:.3f}'
    for curve in curves:
        d = ['M' + point(curve.start_point)]
        for segment in curve:
            if segment.is_corner:
                d += ['L' + point(segment.c), 'L' + point(segment.end_point)]
            else:
                d += ['C' + point(segment.c1) + ' ' + point(segment.c2) + ' ' + point(segment.end_point)]
        d.append('Z')
        commands.append(' '.join(d))
    return ' '.join(commands)

mark_paths, text_paths = paths(symbol), paths(lettering)
# Existing public website tokens: page-00-approved.css --p00-gold/--p00-navy.
variants = {
    'dark-bg': ('#b87525', '#ffffff'),
    'light-bg': ('#b87525', '#09263d'),
    'white': ('#ffffff', '#ffffff'),
    'mono-dark': ('#09263d', '#09263d'),
}
for variant, (mark, text) in variants.items():
    svg = OUT / f'rts-v1-logo-{variant}.svg'
    svg.write_text(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 332 396" width="332" height="396" role="img" aria-label="Reforming the Soul — Life with God">
  <title>Reforming the Soul — Life with God</title>
  <path fill="{mark}" fill-rule="evenodd" d="{mark_paths}"/>
  <path fill="{text}" fill-rule="evenodd" d="{text_paths}"/>
</svg>\n''')
    subprocess.run(['inkscape', str(svg), '--export-type=png', '--export-width=2400',
                    '--export-filename=' + str(svg.with_suffix('.png'))], check=True, capture_output=True)
(OUT / 'rts-v1-logo-master.png').write_bytes((OUT / 'rts-v1-logo-dark-bg.png').read_bytes())
print('Exported four identical-path SVG/PNG colorways and 2400px raster master.')
