const {load} = require('cheerio');
const {validateOverrideDocument} = require('./override-schema');
const {getField, fields} = require('./field-registry');

const colors = Object.freeze({navy:'#062238',cream:'#f7f3eb',gold:'#bf8b30',olive:'#617044',charcoal:'#333333',white:'#ffffff'});
const spacing = Object.freeze({compact:'0.5rem',standard:'1rem',spacious:'2rem'});

function setStyle(element, declarations) {
  const changed = new Set(Object.keys(declarations));
  const retained = (element.attr('style') || '').split(';').filter(part => part.trim() && !changed.has(part.split(':')[0].trim()));
  element.attr('style', [...retained,...Object.entries(declarations).map(([key,value])=>`${key}:${value}`)].join(';'));
}

function applyOverrides({html,page,document}) {
  const overrides = validateOverrideDocument(document);
  const edits = overrides.filter(edit => edit.pageNumber === page.number);
  if (!edits.length) return html;
  if ([1,38].includes(page.number)) throw new Error('Page is locked');
  const $ = load(html);
  for (const edit of edits) {
    if (edit.route !== page.route) throw new Error('Page route mismatch');
    const field = getField(edit.pageNumber,edit.sectionId,edit.fieldId);
    const target = $(field.selector);
    if (target.length !== 1) throw new Error(`Expected exactly one target: ${edit.sectionId}.${edit.fieldId}`);
    switch (edit.kind) {
      case 'text': {
        if (target.find('h1,h2,h3,h4,h5,h6,p,a,section,article,div,button,input,textarea,ul,ol,table').length) {
          throw new Error('Text target contains structural descendants');
        }
        // Keep standalone decorative assets when a button label changes.
        const assets = target.find('img,svg').filter((_,node)=>$(node).parents('svg').length === 0).clone();
        target.text(edit.value).append(assets);
        break;
      }
      case 'link':
        if (!target.is('a')) throw new Error('Link target must be an anchor');
        target.attr('href',edit.value);
        break;
      case 'image':
      case 'alt':
        if (!target.is('img')) throw new Error('Image target must be an image');
        target.attr(edit.kind === 'image' ? 'src' : 'alt',edit.value);
        break;
      case 'color': setStyle(target,{'--rts-edit-color':colors[edit.value],color:'var(--rts-edit-color)'}); break;
      case 'spacing': setStyle(target,{'--rts-edit-spacing':spacing[edit.value],'margin-block':'var(--rts-edit-spacing)'}); break;
      case 'align': setStyle(target,{'text-align':edit.value}); break;
      case 'visibility':
        if (edit.value) target.removeAttr('hidden'); else target.attr('hidden','');
        break;
      case 'order':
        if (!field.orderGroup || !target.parent().hasClass(field.orderGroup)) throw new Error('Order target is outside its declared group');
        {
          const group = fields.filter(entry => entry.pageNumber === page.number && entry.orderGroup === field.orderGroup);
          const parent = target.parent();
          const nodes = group.map(entry => {
            const match = $(entry.selector);
            if (match.length !== 1 || match.parent()[0] !== parent[0]) throw new Error('Order group is incomplete');
            return match[0];
          });
          const siblings = parent.children().toArray();
          if (siblings.length !== nodes.length || siblings.some(node => !nodes.includes(node))) throw new Error('Order group contains undeclared siblings');
          const others = siblings.filter(node => node !== target[0]);
          target.remove();
          if (edit.value > others.length) $(others.at(-1)).after(target);
          else $(others[edit.value - 1]).before(target);
        }
        break;
      default: throw new Error('Unsupported edit');
    }
  }
  return $.html();
}

module.exports = {applyOverrides};
