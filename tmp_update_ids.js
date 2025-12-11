const fs = require('fs');
const p = 'data/products.json';
const raw = fs.readFileSync(p, 'utf8');
let arr = JSON.parse(raw);
const slug = s => String(s || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const used = new Set();
const mapping = [];
for (let i = 0; i < arr.length; i++) {
  const prod = arr[i];
  const base = slug(prod.name || prod.id || ('product' + i));
  let candidate = base;
  if (prod.color) candidate = base + '-' + slug(prod.color);
  const original = candidate;
  let n = 1;
  while (used.has(candidate)) {
    candidate = original + '-' + n;
    n++;
  }
  used.add(candidate);
  mapping.push({ old: prod.id, new: candidate });
  prod.id = candidate;
}
fs.writeFileSync(p, JSON.stringify(arr, null, 2) + '\n', 'utf8');
console.log('Updated IDs:');
mapping.forEach((m) => console.log(m.old + ' -> ' + m.new));
