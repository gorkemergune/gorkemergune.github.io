import{c as l,r as c,j as r}from"./index-BxN_GMSb.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=l("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);function h(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}const n=["#ff4d6d","#f472b6","#00d4ff","#9d6bff","#ffd166","#00e5a0","#4d96ff","#ff9f1c"];function y({count:i=140,duration:d=4200,onDone:e}){const a=h(),f=c.useMemo(()=>a?[]:Array.from({length:i},(t,o)=>{const s=Math.random()>.5;return{id:o,left:Math.random()*100,delay:Math.random()*.6,fall:2.4+Math.random()*1.6,drift:(Math.random()-.5)*240,spin:360+Math.random()*720,w:6+Math.random()*6,h:s?void 0:10+Math.random()*10,round:s,color:n[o%n.length]}}),[i,a]);return c.useEffect(()=>{if(a){e==null||e();return}const t=setTimeout(()=>e==null?void 0:e(),d);return()=>clearTimeout(t)},[a,d,e]),a||f.length===0?null:r.jsxs("div",{className:"cf-root","aria-hidden":"true",children:[r.jsx("style",{children:u}),f.map(t=>r.jsx("span",{className:"cf-piece",style:{left:`${t.left}%`,width:t.w,height:t.round?t.w:t.h,background:t.color,borderRadius:t.round?"50%":2,boxShadow:`0 0 8px ${t.color}66`,animationDelay:`${t.delay}s`,"--fall":`${t.fall}s`,"--drift":`${t.drift}px`,"--spin":`${t.spin}deg`}},t.id))]})}const u=`
  .cf-root {
    position: fixed; inset: 0; overflow: hidden;
    pointer-events: none; z-index: 300;
  }
  .cf-piece {
    position: absolute; top: -24px;
    opacity: 0;
    animation: cf-fall var(--fall) cubic-bezier(0.3, 0.5, 0.5, 1) forwards;
    will-change: transform, opacity;
  }
  @keyframes cf-fall {
    0%   { opacity: 0; transform: translate(0, -10vh) rotate(0deg); }
    10%  { opacity: 1; }
    100% { opacity: 0; transform: translate(var(--drift), 105vh) rotate(var(--spin)); }
  }
`;export{y as C,p as R,h as p};
