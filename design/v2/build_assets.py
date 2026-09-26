"""V2: exact V1 artwork, with the wordmark to the right of the symbol."""
from pathlib import Path
import subprocess
import xml.etree.ElementTree as ET
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public/assets'
for variant in ['dark-bg','light-bg','white','mono-dark']:
    source = ET.fromstring((OUT / f'rts-v1-logo-{variant}.svg').read_text())
    mark, text = source.findall('{http://www.w3.org/2000/svg}path')
    svg = OUT / f'rts-v2-logo-{variant}.svg'
    svg.write_text(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 270" width="600" height="270" role="img" aria-label="Reforming the Soul">
  <title>Reforming the Soul</title>
  <path transform="translate(-30 0)" fill="{mark.attrib['fill']}" fill-rule="evenodd" d="{mark.attrib['d']}"/>
  <path transform="translate(270 -174)" fill="{text.attrib['fill']}" fill-rule="evenodd" d="{text.attrib['d']}"/>
</svg>\n''')
    subprocess.run(['inkscape', str(svg), '--export-type=png', '--export-width=2400',
        '--export-filename=' + str(svg.with_suffix('.png'))], check=True, capture_output=True)
(OUT/'rts-v2-logo-master.png').write_bytes((OUT/'rts-v2-logo-dark-bg.png').read_bytes())
print('Exported V2 horizontal family; original symbol and lettering paths unchanged.')
