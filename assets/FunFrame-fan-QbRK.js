import{c as f,u as l,j as e,r as s,L as d,A as x}from"./index-CVdzEOIy.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=f("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=f("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=f("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);function h(){const{t:n}=l();return e.jsxs(d,{to:"/fun",className:"fun-back",children:[e.jsx(x,{size:15,strokeWidth:1.5})," ",n("funCorner")]})}function v({kind:n="game",accent:a="#00f0ff",title:t,sub:r,children:i}){const{t:o}=l(),c=o(n==="send"?"funSurprisesLabel":n==="me"?"funSurpriseMeLabel":"funGamesLabel");return e.jsxs("header",{className:"fun-head",style:{"--fun-acc":a},children:[e.jsx(h,{}),e.jsxs("div",{className:"fun-kicker",children:[e.jsx("i",{"aria-hidden":"true"}),c]}),e.jsx("h1",{className:"fun-title",children:t}),r&&e.jsx("p",{className:"fun-sub",children:r}),i]})}function y(n){const a=new TextEncoder().encode(JSON.stringify(n));let t="";return a.forEach(r=>{t+=String.fromCharCode(r)}),btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function w(n){try{const a=n.replace(/-/g,"+").replace(/_/g,"/"),t=atob(a+"===".slice((a.length+3)%4));return JSON.parse(new TextDecoder().decode(Uint8Array.from(t,r=>r.charCodeAt(0))))}catch{return null}}const z=(n,a)=>`${window.location.origin}${window.location.pathname}#${n}?d=${y(a)}`;function j({url:n,title:a}){const{t}=l(),[r,i]=s.useState(!1),o=s.useRef(null);s.useEffect(()=>()=>clearTimeout(o.current),[]);const c=async()=>{try{await navigator.clipboard.writeText(n),i(!0),clearTimeout(o.current),o.current=setTimeout(()=>i(!1),2e3)}catch{window.prompt(t("funCopyPrompt"),n)}},p=typeof navigator<"u"&&typeof navigator.share=="function",u=async()=>{try{await navigator.share({title:a,url:n})}catch{}};return e.jsxs(e.Fragment,{children:[e.jsxs("button",{type:"button",className:"fun-btn",onClick:c,"aria-live":"polite",children:[r?e.jsx(m,{size:15,strokeWidth:1.8}):e.jsx(g,{size:15,strokeWidth:1.8}),t(r?"funCopied":"funShareLink")]}),p&&e.jsxs("button",{type:"button",className:"fun-btn ghost",onClick:u,children:[e.jsx(b,{size:15,strokeWidth:1.8})," ",t("funShare")]})]})}const S=`
  .fun-page { position: relative; z-index: 2; max-width: 760px; margin: 0 auto; padding: 56px 24px 120px; }
  .fun-page.narrow { max-width: 560px; }
  .fun-page.wide { max-width: 960px; }
  .fun-back { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: #8a919d; transition: color 0.2s; }
  .fun-back:hover, .fun-back:focus-visible { color: var(--c-ink); }
  .fun-head { position: relative; z-index: 2; margin-bottom: 36px; }
  .fun-kicker { display: flex; align-items: center; gap: 10px; margin-top: 36px; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #aab2bf; }
  .fun-kicker i { width: 8px; height: 8px; border-radius: 50%; background: var(--fun-acc); box-shadow: 0 0 10px var(--fun-acc); }
  .fun-title { font-family: var(--font-display); font-weight: 500; font-size: clamp(40px, 7vw, 64px); line-height: 1; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 14px; }
  .fun-sub { font-family: var(--font-body); font-size: 17px; line-height: 1.6; color: #a4abb7; max-width: 560px; margin-top: 14px; }
  .fun-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 0 20px; border-radius: 999px; border: 1px solid transparent; background: var(--fun-acc, var(--c-primary)); color: #0a0c10; font-family: var(--font-body); font-weight: 600; font-size: 15px; cursor: pointer; transition: transform 0.15s, filter 0.2s, background 0.2s; }
  .fun-btn:hover { filter: brightness(1.1); }
  .fun-btn:active { transform: scale(0.97); }
  .fun-btn:focus-visible { outline: 2px solid var(--c-ink); outline-offset: 3px; }
  .fun-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .fun-btn.ghost { background: transparent; color: var(--c-ink); border-color: #2c313c; }
  .fun-btn.ghost:hover { border-color: #4b515c; filter: none; }
  .fun-btn.small { min-height: 36px; padding: 0 14px; font-size: 13.5px; }
  .fun-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
  .fun-panel { position: relative; background: linear-gradient(180deg, #13161c, #0e1015); border: 1px solid #22262e; border-radius: 18px; padding: 24px; }
  .fun-stats { display: flex; justify-content: center; gap: 36px; flex-wrap: wrap; }
  .fun-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .fun-stat b { font-family: var(--font-mono); font-weight: 500; font-size: 26px; color: var(--c-ink); font-variant-numeric: tabular-nums; }
  .fun-stat span { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #7b8290; }
  .fun-field { display: flex; flex-direction: column; gap: 6px; }
  .fun-field label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #8a919d; }
  .fun-field input, .fun-field textarea { width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 12px; border: 1px solid #2c313c; background: #0c0e12; color: var(--c-ink); font-family: var(--font-body); font-size: 15px; resize: vertical; }
  .fun-field input:focus, .fun-field textarea:focus { outline: none; border-color: var(--fun-acc, var(--c-primary)); box-shadow: 0 0 0 3px color-mix(in srgb, var(--fun-acc, #00f0ff) 22%, transparent); }
  .fun-msg { font-family: var(--font-body); font-size: 15px; text-align: center; color: #c6cdd8; min-height: 24px; }
  .fun-msg.ok { color: #00e5a0; }
  .fun-msg.bad { color: #ff6b81; }
  .fun-hint { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; color: #7b8290; text-align: center; }
  @media (prefers-reduced-motion: reduce) { .fun-btn, .fun-back { transition: none; } .fun-btn:active { transform: none; } }
  @media (max-width: 600px) { .fun-page { padding: 36px 16px 96px; } .fun-sub { font-size: 15.5px; } .fun-panel { padding: 18px; border-radius: 14px; } }
`;export{S as F,j as S,v as a,h as b,w as d,y as e,z as s};
