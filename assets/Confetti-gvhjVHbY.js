import{r as n,j as a}from"./index-CVdzEOIy.js";function l(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}const c=["#ff4d6d","#f472b6","#00f0ff","#9d6bff","#ffd166","#00e5a0","#4d96ff","#ff9f1c"];function h({count:i=140,duration:f=4200,onDone:r}){const e=l(),d=n.useMemo(()=>e?[]:Array.from({length:i},(t,o)=>{const s=Math.random()>.5;return{id:o,left:Math.random()*100,delay:Math.random()*.6,fall:2.4+Math.random()*1.6,drift:(Math.random()-.5)*240,spin:360+Math.random()*720,w:6+Math.random()*6,h:s?void 0:10+Math.random()*10,round:s,color:c[o%c.length]}}),[i,e]);return n.useEffect(()=>{if(e){r==null||r();return}const t=setTimeout(()=>r==null?void 0:r(),f);return()=>clearTimeout(t)},[e,f,r]),e||d.length===0?null:a.jsxs("div",{className:"cf-root","aria-hidden":"true",children:[a.jsx("style",{children:m}),d.map(t=>a.jsx("span",{className:"cf-piece",style:{left:`${t.left}%`,width:t.w,height:t.round?t.w:t.h,background:t.color,borderRadius:t.round?"50%":2,boxShadow:`0 0 8px ${t.color}66`,animationDelay:`${t.delay}s`,"--fall":`${t.fall}s`,"--drift":`${t.drift}px`,"--spin":`${t.spin}deg`}},t.id))]})}const m=`
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
`;export{h as C,l as p};
