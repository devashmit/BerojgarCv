const fs = require('fs');
const path = require('path');

const dir = 'd:/Berojgar Cv/BerojgarCv/src/components/cv-templates';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (!file.endsWith('.tsx') || file.includes('Thumb')) return;
  
  let p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');

  // Justify paragraphs that don't have text-center or text-right or already text-justify
  content = content.replace(/<p className="(.*?)"/g, (match, p1) => {
    if (!p1.includes('text-justify') && !p1.includes('text-center') && !p1.includes('text-right')) {
      return `<p className="text-justify ${p1}"`;
    }
    return match;
  });

  // Justify list items, unless they're single items like `— {s}`
  content = content.replace(/<li key=\{([a-zA-Z0-9_]+)\}([^>]*)>(.*?)<\/li>/g, (match, key, attrs, inner) => {
    if (!attrs.includes('className=')) {
      return `<li key={${key}} className="text-justify">${inner}</li>`;
    }
    if (!attrs.includes('text-justify') && !attrs.includes('text-center')) {
      // modify classname
      const updatedAttrs = attrs.replace(/className="/, 'className="text-justify ');
      return `<li key={${key}}${updatedAttrs}>${inner}</li>`;
    }
    return match;
  });

  content = content.replace(/<li([^>key]*)>\{bullet\}<\/li>/g, '<li$1 className="text-justify">{bullet.replace(/^[\\—\\-\\•\\.\\s]+/, "")}</li>');
  content = content.replace(/\{bullet\}/g, '{bullet.replace(/^[\\—\\-\\•\\.\\s]+/, "")}');
  
  // Fix nested replaces if they happened
  content = content.replace(/\{bullet\.replace\(\/\^\[\\—\\-\\•\\\.\\\s\]\+\/, ""\)\.replace\(\/\^\[\\—\\-\\•\\\.\\\s\]\+\/, ""\)\}/g, '{bullet.replace(/^[\\—\\-\\•\\.\\s]+/, "")}');

  // Remove exact emdashes in typical text structures 
  content = content.replace(/— \{s\}/g, '{s}');
  content = content.replace(/ — \$\{lang.proficiency\}/g, ' ${lang.proficiency}');

  fs.writeFileSync(p, content, 'utf8');
  console.log(`Updated ${file}`);
});
