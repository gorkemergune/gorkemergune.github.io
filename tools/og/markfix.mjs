import fs from 'fs';
import { PNG } from 'pngjs';
import { chromium } from 'playwright';

const DIR='/Users/gorkemparadise/Desktop/gorkemergune.github.io/public/og/';

// Locate the MARK row: the small solid accent square, then the ink to its right.
export function locate(file){
  const p=PNG.sync.read(fs.readFileSync(DIR+file));
  const at=(x,y)=>{const i=(p.width*y+x)<<2;return [p.data[i],p.data[i+1],p.data[i+2]];};
  const lum=(c)=>c[0]+c[1]+c[2];
  let sq=null;
  for(let y=60;y<280 && !sq;y++) for(let x=92;x<300;x++){
    const c=at(x,y); if(lum(c)<200) continue;
    // solid block: 8x8 all bright and same hue
    let solid=true;
    for(let dy=0;dy<8&&solid;dy++)for(let dx=0;dx<8;dx++){const d=at(x+dx,y+dy);if(lum(d)<200||Math.abs(d[0]-c[0])>26||Math.abs(d[2]-c[2])>26){solid=false;break;}}
    if(solid){ sq={x,y,color:c}; break; }
  }
  if(!sq) return null;
  // ink box to the right of the square
  let x0=1e9,x1=-1,y0=1e9,y1=-1;
  for(let y=sq.y-14;y<sq.y+26;y++) for(let x=sq.x+14;x<700;x++){
    if(lum(at(x,y))>190){ if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y; }
  }
  if(x1<0) return null;
  // count glyph clusters so the replacement keeps the original letter rhythm
  const colInk=[];
  for(let x=x0;x<=x1;x++){ let ink=false;
    for(let y=y0;y<=y1;y++) if(lum(at(x,y))>190){ ink=true; break; }
    colInk.push(ink); }
  let glyphs=0, run=false;
  for(const v of colInk){ if(v&&!run){glyphs++;run=true;} else if(!v) run=false; }
  return { sq, box:{x0,x1,y0,y1}, glyphs, width:p.width, height:p.height };
}

// Erase the text by interpolating between the clean rows above and below it,
// which preserves vertical grid lines and gradients.
function repair(p, box, pad=4){
  const top=box.y0-pad, bot=box.y1+pad;
  for(let y=top+1;y<bot;y++){
    const t=(y-top)/(bot-top);
    for(let x=box.x0-pad;x<=box.x1+pad;x++){
      const ia=(p.width*top+x)<<2, ib=(p.width*bot+x)<<2, i=(p.width*y+x)<<2;
      for(let k=0;k<3;k++) p.data[i+k]=Math.round(p.data[ia+k]*(1-t)+p.data[ib+k]*t);
      p.data[i+3]=255;
    }
  }
}

export async function fix(file, newMark, outDir){
  const loc=locate(file);
  if(!loc) return { file, ok:false, reason:'MARK satırı bulunamadı' };
  const p=PNG.sync.read(fs.readFileSync(DIR+file));
  repair(p, loc.box);
  const tmp=outDir+'/_base_'+file;
  fs.writeFileSync(tmp, PNG.sync.write(p));

  const col='rgb('+loc.sq.color.join(',')+')';
  const size=Math.round((loc.box.y1-loc.box.y0)+5);
  // glyph clusters exclude the space, so add it back to get the true character count
  const oldChars=loc.glyphs+Math.max(0,(loc.glyphs>=5?1:0));
  const advance=(loc.box.x1-loc.box.x0)/Math.max(1,oldChars-1);
  const adv=Math.max(0, advance-size*0.6);
  const b64=fs.readFileSync(tmp).toString('base64');
  const html=`<html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=block">
<style>html,body{margin:0;padding:0;width:${loc.width}px;height:${loc.height}px;overflow:hidden}
img{position:absolute;left:0;top:0}
span{position:absolute;left:${loc.box.x0}px;top:${loc.box.y0}px;line-height:1;
 font-family:'JetBrains Mono',monospace;font-size:${size}px;font-weight:400;
 letter-spacing:${adv.toFixed(2)}px;color:${col};white-space:nowrap}
</style></head><body><img src="data:image/png;base64,${b64}"><span>${newMark}</span></body></html>`;
  const br=await chromium.launch();
  const ctx=await br.newContext({viewport:{width:loc.width,height:loc.height},deviceScaleFactor:1});
  const pg=await ctx.newPage();
  await pg.setContent(html,{waitUntil:'networkidle'});
  await pg.evaluate(()=>document.fonts.ready);
  await pg.waitForTimeout(350);
  await pg.screenshot({path:outDir+'/'+file});
  await br.close();
  fs.unlinkSync(tmp);
  return { file, ok:true, box:loc.box, size, color:col };
}
