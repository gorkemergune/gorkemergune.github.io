import { chromium } from 'playwright';
import { CARDS, svg } from './cards.mjs';
import fs from 'fs';
const OUT = process.argv[2];
const b = await chromium.launch();
for (const key of Object.keys(CARDS)) {
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500&family=Instrument+Serif&family=JetBrains+Mono:wght@400;500&display=block">
<style>html,body{margin:0;padding:0;background:#0b0b13;width:1200px;height:630px;overflow:hidden}svg{display:block}</style>
</head><body>${svg(key)}</body></html>`;
  const ctx = await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  await pg.setContent(html, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(600);
  // Shrink the serif title until it clears the artwork, measured for real.
  const limit = CARDS[key].titleMax || 600;
  const fitted = await pg.evaluate((limit) => {
    const t = [...document.querySelectorAll('text')].find(n => n.getAttribute('font-family') === 'Instrument Serif');
    let size = parseFloat(t.getAttribute('font-size'));
    while (t.getBBox().width > limit && size > 30) { size -= 1; t.setAttribute('font-size', String(size)); }
    return { size, width: Math.round(t.getBBox().width) };
  }, limit);
  console.log('   title', fitted.size + 'px', fitted.width + 'px wide (limit ' + limit + ')');
  await pg.waitForTimeout(150);
  await pg.screenshot({ path: `${OUT}/${key}.png` });
  await ctx.close();
  console.log('render:', key);
}
await b.close();
