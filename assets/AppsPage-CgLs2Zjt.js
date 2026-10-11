import{c as f,u,d as v,r as c,l as y,j as e,L as j,A as k,b as w,X as N,e as z}from"./index-f0qu5WmO.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=f("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]),A={calendar:S};function I(){const{t:a}=u(),s=a("appsItems"),t=Array.isArray(s)?s:[],[p,i]=v(),d=p.get("app"),o=t.findIndex(n=>n.id===d),r=c.useRef(null);y({title:a("appsLabel"),description:a("appsSub"),path:"/apps"});const x=n=>{r.current=document.activeElement,i({app:n.id})},g=c.useCallback(()=>{i({},{replace:!1}),requestAnimationFrame(()=>{var n,l;return(l=(n=r.current)==null?void 0:n.focus)==null?void 0:l.call(n)})},[i]);return c.useEffect(()=>{d&&o===-1&&i({},{replace:!0})},[d,o,i]),e.jsxs("div",{className:"lab-page",children:[e.jsx("style",{children:M}),e.jsxs("div",{className:"ds-wrap lab-wrap",children:[e.jsxs(j,{to:"/",className:"lab-back",children:[e.jsx(k,{size:16,strokeWidth:1.5})," ",a("appsBack")]}),e.jsxs("header",{className:"lab-head",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"ds-kicker",children:[a("appsLabKicker")," · ",String(t.length).padStart(2,"0")]}),e.jsx("h1",{children:a("appsLabel")})]}),e.jsx("p",{children:a("appsSub")})]})]}),e.jsxs("section",{className:"lab","aria-label":a("appsLabKicker"),children:[e.jsxs("div",{className:"lab-ceiling","aria-hidden":"true",children:[e.jsx("i",{}),e.jsx("i",{}),e.jsx("i",{})]}),e.jsx("div",{className:"lab-floor","aria-hidden":"true"}),e.jsxs("ul",{className:"ds-wrap lab-row",children:[t.map((n,l)=>e.jsx("li",{children:e.jsx(L,{it:n,n:l+1,t:a,onOpen:()=>x(n)})},n.id)),e.jsx("li",{"aria-label":a("appsReserved"),children:e.jsxs("div",{className:"st st-reserved",children:[e.jsx("div",{className:"st-screen",children:e.jsx("div",{className:"st-glass",children:e.jsx("span",{className:"st-res-mark","aria-hidden":"true",children:"+"})})}),e.jsx("div",{className:"st-arm","aria-hidden":"true"}),e.jsx("div",{className:"st-bench",children:e.jsxs("div",{className:"st-plate",children:[e.jsxs("span",{className:"st-no",children:[a("appsStation")," ",String(t.length+1).padStart(2,"0")]}),e.jsx("span",{className:"st-name",children:a("appsReserved")}),e.jsx("span",{className:"st-res-text",children:a("appsMore")})]})})]})})]})]}),o>=0&&e.jsx(F,{it:t[o],n:o+1,t:a,onClose:g})]})}function b({it:a,size:s}){const t=A[a.icon];return a.image?e.jsx("img",{className:"st-icon",src:a.image,alt:"",width:s,height:s,style:{width:s,height:s}}):e.jsx("span",{className:"st-icon st-iconbox",style:{width:s,height:s,color:a.accent},children:t&&e.jsx(t,{size:s*.45,strokeWidth:1.4})})}function L({it:a,n:s,t,onOpen:p}){const i=Array.isArray(a.screens)&&a.screens[0];return e.jsxs("button",{type:"button",className:"st",style:{"--acc":a.accent},onClick:p,"aria-haspopup":"dialog",children:[e.jsx("span",{className:"st-screen",children:e.jsxs("span",{className:"st-glass",children:[e.jsxs("span",{className:"st-bar",children:[e.jsx("span",{className:"st-led","aria-hidden":"true"}),a.status==="live"?t("appsLive"):"",e.jsx("span",{className:"st-plat",children:a.platform})]}),i?e.jsx("img",{className:"st-shot",src:i,alt:"",loading:"lazy"}):e.jsx(b,{it:a,size:112}),e.jsx("span",{className:"st-tag",children:a.tagline})]})}),e.jsx("span",{className:"st-arm","aria-hidden":"true"}),e.jsx("span",{className:"st-bench",children:e.jsxs("span",{className:"st-plate",children:[e.jsxs("span",{className:"st-no",children:[t("appsStation")," ",String(s).padStart(2,"0")]}),e.jsx("span",{className:"st-name",children:a.name}),e.jsxs("span",{className:"st-go",children:[t("appsInspect")," ",e.jsx(w,{size:13,strokeWidth:1.6,"aria-hidden":"true"})]})]})})]})}function F({it:a,n:s,t,onClose:p}){const i=c.useRef(null),d=c.useRef(null),o=Array.isArray(a.screens)?a.screens:[];return c.useEffect(()=>{var g;(g=d.current)==null||g.focus();const r=document.body.style.overflow;document.body.style.overflow="hidden";const x=n=>{if(n.key==="Escape"){n.preventDefault(),p();return}if(n.key!=="Tab"||!i.current)return;const l=i.current.querySelectorAll("a[href], button:not([disabled])");if(!l.length)return;const m=l[0],h=l[l.length-1];n.shiftKey&&document.activeElement===m?(n.preventDefault(),h.focus()):!n.shiftKey&&document.activeElement===h&&(n.preventDefault(),m.focus())};return window.addEventListener("keydown",x),()=>{window.removeEventListener("keydown",x),document.body.style.overflow=r}},[p]),e.jsx("div",{className:"in-back",onMouseDown:r=>{r.target===r.currentTarget&&p()},children:e.jsxs("div",{ref:i,className:"in",role:"dialog","aria-modal":"true","aria-labelledby":"in-title",style:{"--acc":a.accent},children:[e.jsx("button",{ref:d,type:"button",className:"icon-btn in-close",onClick:p,"aria-label":t("appsClose"),children:e.jsx(N,{size:16,strokeWidth:1.6})}),e.jsxs("div",{className:"in-view",children:[e.jsx("div",{className:"in-screen",children:o.length?e.jsx("div",{className:"in-shots",children:o.map(r=>e.jsx("img",{src:r,alt:`${a.name} screenshot`},r))}):e.jsx(b,{it:a,size:168})}),!o.length&&e.jsx("p",{className:"in-note",children:t("appsNoShots")})]}),e.jsxs("div",{className:"in-body",children:[e.jsxs("div",{className:"in-k",children:[t("appsStation")," ",String(s).padStart(2,"0")," · ",a.platform]}),e.jsx("h2",{id:"in-title",children:a.name}),e.jsx("p",{className:"in-tag",children:a.tagline}),e.jsx("p",{className:"in-desc",children:a.description}),e.jsxs("dl",{className:"in-spec",children:[e.jsxs("div",{children:[e.jsx("dt",{children:t("appsPlatform")}),e.jsx("dd",{children:a.platform})]}),e.jsxs("div",{children:[e.jsx("dt",{children:t("appsStatus")}),e.jsxs("dd",{children:[e.jsx("span",{className:"st-led","aria-hidden":"true"})," ",a.status==="live"?t("appsLive"):"—"]})]}),Array.isArray(a.stack)&&e.jsxs("div",{className:"wide",children:[e.jsx("dt",{children:t("appsStack")}),e.jsx("dd",{className:"in-stack",children:a.stack.map(r=>e.jsx("span",{className:"label",children:r},r))})]})]}),e.jsxs("a",{className:"btn btn-primary in-cta",href:a.url,target:"_blank",rel:"noopener noreferrer",children:[a.cta," ",e.jsx(z,{size:15,strokeWidth:1.6})]})]})]})})}const M=`
  .lab-wrap { padding-top: 60px; }
  .lab-back { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: #8a919d; }
  .lab-back:hover { color: var(--c-ink); }
  .lab-head { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: 16px 56px; align-items: end; margin-top: 40px; }
  .lab-head h1 { font-family: var(--font-display); font-weight: 400; font-size: clamp(44px, 6vw, 80px); line-height: 0.98; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 18px; }
  .lab-head p { font-family: var(--font-body); font-size: 17px; line-height: 1.6; color: var(--c-body); }

  /* The room */
  .lab { position: relative; overflow: hidden; margin-top: 48px; padding: 96px 0 88px; isolation: isolate;
    background:
      radial-gradient(60% 50% at 50% 38%, rgba(0,240,255,0.07), transparent 70%),
      radial-gradient(30% 40% at 85% 30%, rgba(245,158,11,0.05), transparent 70%),
      repeating-linear-gradient(90deg, transparent 0 239px, rgba(255,255,255,0.025) 239px 240px),
      linear-gradient(180deg, #07080b 0%, #0b0d11 55%, #090a0d 100%);
    border-top: 1px solid var(--c-line); border-bottom: 1px solid var(--c-line); }
  .lab-ceiling { position: absolute; inset: 0 0 auto 0; height: 60px; display: flex; justify-content: space-around; pointer-events: none; z-index: -1; }
  .lab-ceiling i { width: 18%; height: 3px; margin-top: 22px; background: linear-gradient(90deg, transparent, rgba(190,240,255,0.55), transparent); box-shadow: 0 0 24px 4px rgba(0,240,255,0.12); }
  .lab-floor { position: absolute; left: -30%; right: -30%; bottom: 0; height: 52%; z-index: -1; pointer-events: none;
    background:
      repeating-linear-gradient(90deg, rgba(0,240,255,0.08) 0 1px, transparent 1px 90px),
      repeating-linear-gradient(0deg, rgba(0,240,255,0.06) 0 1px, transparent 1px 70px);
    transform: perspective(700px) rotateX(64deg); transform-origin: 50% 100%;
    -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.9), transparent 85%); mask-image: linear-gradient(to top, rgba(0,0,0,0.9), transparent 85%); }
  .lab-row { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px; align-items: end; }

  /* A workstation */
  .st { all: unset; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; width: 100%; cursor: pointer; }
  .st:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 10px; }
  .st-screen { position: relative; width: 100%; padding: 8px; background: linear-gradient(180deg, #1a1e26, #0f1116); border: 1px solid #2a2f38; box-shadow: 0 30px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.6); transition: transform 0.45s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.45s; }
  .st-glass { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; aspect-ratio: 16 / 11; overflow: hidden;
    background: radial-gradient(70% 70% at 50% 45%, color-mix(in srgb, var(--acc, #00F0FF) 22%, transparent), transparent 70%), linear-gradient(180deg, #0c1219, #070a0e);
    border: 1px solid rgba(0,240,255,0.18); }
  .st-glass::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px); pointer-events: none; }
  .st-glass::after { content: ''; position: absolute; inset: 0; background: linear-gradient(115deg, rgba(255,255,255,0.07), transparent 35%); pointer-events: none; }
  .st-bar { position: absolute; top: 0; left: 0; right: 0; display: flex; align-items: center; gap: 8px; padding: 9px 12px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #9fdbe6; border-bottom: 1px solid rgba(0,240,255,0.1); background: rgba(0,0,0,0.25); }
  .st-plat { margin-left: auto; color: var(--c-meta); }
  .st-led { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--c-tertiary); box-shadow: 0 0 8px rgba(245,158,11,0.9); }
  .st-icon { display: block; border-radius: 26%; object-fit: cover; box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 0 50px color-mix(in srgb, var(--acc, #00F0FF) 35%, transparent), 0 18px 40px rgba(0,0,0,0.6); }
  .st-iconbox { display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(180deg, #1c2029, #0e1015); }
  .st-shot { max-width: 92%; max-height: 80%; object-fit: contain; margin-top: 18px; }
  .st-tag { position: relative; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: #aab2bf; text-align: center; padding: 0 16px; }
  .st-arm { width: 14px; height: 34px; background: linear-gradient(90deg, #14171d, #262b34, #14171d); border-left: 1px solid #2a2f38; border-right: 1px solid #2a2f38; }
  .st-bench { position: relative; width: 112%; max-width: calc(100% + 40px); padding: 18px 22px 20px; background: linear-gradient(180deg, #1b1f27 0%, #111419 40%, #0b0d11 100%); border: 1px solid #2a2f38; border-top: 1px solid #3a404c; clip-path: polygon(4% 0, 96% 0, 100% 100%, 0 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06); }
  .st-bench::before { content: ''; position: absolute; left: 20%; right: 20%; top: 0; height: 26px; background: radial-gradient(50% 100% at 50% 0%, color-mix(in srgb, var(--acc, #00F0FF) 30%, transparent), transparent); pointer-events: none; }
  .st-plate { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; text-align: center; min-height: 92px; }
  .st-no { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--c-tertiary); }
  .st-name { font-family: var(--font-display); font-weight: 500; font-size: 26px; letter-spacing: -0.01em; color: var(--c-ink); }
  .st-go { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #c6cdd8; border-bottom: 1px solid rgba(0,240,255,0.4); padding-bottom: 3px; transition: color 0.3s, border-color 0.3s; }
  .st:hover .st-screen, .st:focus-visible .st-screen { transform: translateY(-6px); box-shadow: 0 40px 70px rgba(0,0,0,0.6), 0 0 40px color-mix(in srgb, var(--acc, #00F0FF) 18%, transparent); }
  .st:hover .st-go, .st:focus-visible .st-go { color: var(--c-primary); border-color: var(--c-primary); }
  .st-reserved { opacity: 0.5; cursor: default; }
  .st-reserved .st-glass { border-style: dashed; background: linear-gradient(180deg, #0b0e12, #07090c); }
  .st-res-mark { font-family: var(--font-display); font-size: 48px; color: #3a404c; }
  .st-res-text { font-family: var(--font-body); font-size: 12.5px; line-height: 1.5; color: var(--c-meta); max-width: 240px; }

  /* Inspection panel */
  .in-back { position: fixed; inset: 0; z-index: 300; background: rgba(5,6,9,0.84); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: flex; justify-content: center; align-items: flex-start; overflow-y: auto; padding: 56px 24px; animation: in-fade 0.25s ease-out; }
  .in { position: relative; width: 100%; max-width: 1040px; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); background: linear-gradient(180deg, #13161c, #0d0f13); border: 1px solid #2a2f38; box-shadow: 0 40px 90px rgba(0,0,0,0.7); animation: in-rise 0.35s cubic-bezier(0.2,0.8,0.2,1); }
  .in::before { content: ''; position: absolute; left: 8%; right: 8%; top: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--acc), transparent); }
  @keyframes in-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes in-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
  .in-close { position: absolute; right: 14px; top: 14px; z-index: 2; }
  .in-view { padding: 28px; border-right: 1px solid #1e222b; }
  .in-screen { display: flex; align-items: center; justify-content: center; aspect-ratio: 1; background: radial-gradient(60% 60% at 50% 45%, color-mix(in srgb, var(--acc) 22%, transparent), transparent 70%), repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 3px), #080a0e; border: 1px solid rgba(0,240,255,0.18); }
  .in-shots { display: flex; gap: 10px; overflow-x: auto; padding: 12px; max-height: 100%; }
  .in-shots img { height: 100%; max-height: 420px; width: auto; border: 1px solid #22262e; }
  .in-note { margin-top: 12px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.08em; line-height: 1.6; color: var(--c-meta); }
  .in-body { padding: 36px 36px 32px; }
  .in-k { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-tertiary); }
  .in h2 { font-family: var(--font-display); font-weight: 500; font-size: clamp(30px, 3.4vw, 44px); line-height: 1.05; letter-spacing: -0.02em; color: var(--c-ink); margin-top: 12px; }
  .in-tag { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 0.08em; color: #9fdbe6; margin-top: 10px; }
  .in-desc { font-family: var(--font-body); font-size: 15.5px; line-height: 1.7; color: #c3c9d4; margin-top: 18px; }
  .in-spec { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-top: 24px; border-top: 1px solid #1e222b; border-left: 1px solid #1e222b; }
  .in-spec > div { padding: 12px 14px; border-right: 1px solid #1e222b; border-bottom: 1px solid #1e222b; }
  .in-spec > .wide { grid-column: 1 / -1; }
  .in-spec dt { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-meta); }
  .in-spec dd { display: flex; align-items: center; gap: 8px; margin-top: 6px; font-family: var(--font-body); font-size: 14px; color: var(--c-ink); }
  .in-stack { flex-wrap: wrap; gap: 6px !important; }
  .in-cta { margin-top: 26px; }

  @media (prefers-reduced-motion: reduce) {
    .st-screen, .st-go { transition: none; }
    .st:hover .st-screen, .st:focus-visible .st-screen { transform: none; }
    .in-back, .in { animation: none; }
  }
  @media (max-width: 1100px) { .lab-row { gap: 28px; } .st-name { font-size: 22px; } }
  @media (max-width: 900px) {
    .lab-head { grid-template-columns: 1fr; }
    .lab-row { grid-template-columns: minmax(0, 1fr); max-width: 520px; margin: 0 auto; gap: 56px; }
    .lab { padding: 72px 0 80px; }
    .in { grid-template-columns: 1fr; }
    .in-view { border-right: none; border-bottom: 1px solid #1e222b; }
    .in-screen { aspect-ratio: 16 / 10; }
    .st-reserved .st-screen, .st-reserved .st-arm { display: none; }
    .st-plate { min-height: 0; }
  }
  @media (max-width: 600px) {
    .lab-wrap { padding-top: 40px; }
    .lab { margin-top: 32px; padding: 56px 0 64px; }
    .st-bench { width: 100%; max-width: 100%; clip-path: polygon(3% 0, 97% 0, 100% 100%, 0 100%); }
    .in-back { padding: 0; }
    .in { min-height: 100%; border: none; }
    .in-view { padding: 56px 16px 16px; }
    .in-body { padding: 22px 16px 32px; }
    .in-spec { grid-template-columns: 1fr; }
  }
`;export{I as default};
