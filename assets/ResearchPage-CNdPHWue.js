import{c as j,u as m,j as e,b as z,r as g,X as k,G as w,e as u,L as y,F as N,d as S,l as A,A as $,i as E}from"./index-f0qu5WmO.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=j("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]),f=2,v=[[[70,"#2a2f38"],[86,"#3b2f22"],[62,"#22303a"],[78,"#2f2a35"]],[[82,"#2c3540"],[66,"#3a3226"],[90,"#25282f"]],[[74,"#34291f"],[88,"#232c36"],[60,"#2d3038"],[80,"#3a2f24"]],[[86,"#272b33"],[70,"#3b3024"],[64,"#22303a"]],[[78,"#2f2a35"],[90,"#283039"],[68,"#3a2f24"],[84,"#2a2f38"]],[[92,"#3b2f22"],[72,"#25282f"],[86,"#2c3540"],[66,"#34291f"],[80,"#2a2f38"],[74,"#3a3226"]]];function R({set:a,wide:d}){return e.jsx("span",{className:`lib-spines${d?" wide":""}`,"aria-hidden":"true",children:v[a].map(([i,o],l)=>e.jsx("span",{style:{height:`${i}%`,background:`linear-gradient(90deg, ${o}, #15181e 140%)`}},l))})}function L({items:a,onOpen:d}){const{t:i}=m(),o=i("researchCoverKinds")||{},l=Math.ceil(a.length/f)*f,x=Array.from({length:l},(r,s)=>a[s]||null),c=Array.from({length:l/f},(r,s)=>x.slice(s*f,(s+1)*f));return e.jsxs("div",{className:"lib-case","aria-label":i("libKicker"),children:[e.jsx("style",{children:`
        .lib-case { position: relative; padding: 34px 40px 30px; background:
            linear-gradient(180deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0) 18%),
            linear-gradient(180deg, #14171d 0%, #0c0e12 100%);
          border: 1px solid #262b34; box-shadow: 0 40px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05); }
        .lib-case::before, .lib-case::after { content: ''; position: absolute; top: 0; bottom: 0; width: 14px; background: linear-gradient(90deg, #1d2128, #2a2f38 50%, #1a1d23); border-left: 1px solid #30353f; border-right: 1px solid #0b0d11; }
        .lib-case::before { left: 0; } .lib-case::after { right: 0; }
        .lib-cornice { position: absolute; left: 0; right: 0; top: 0; height: 12px; background: linear-gradient(180deg, #2a2f38, #15181e); border-bottom: 1px solid #0b0d11; }
        .lib-cornice::after { content: ''; position: absolute; left: 6%; right: 6%; bottom: -2px; height: 2px; background: linear-gradient(90deg, transparent, rgba(245,158,11,0.75), transparent); filter: blur(0.5px); }
        .lib-strip { position: absolute; top: 24px; bottom: 24px; width: 2px; background: linear-gradient(180deg, transparent, rgba(0,240,255,0.55), transparent); z-index: 1; }
        .lib-strip.l { left: 6px; } .lib-strip.r { right: 6px; }

        .lib-shelf + .lib-shelf { margin-top: 30px; }
        .lib-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }
        .lib-plank { position: relative; height: 18px; margin: 0 -26px; background: linear-gradient(180deg, #3a3f48 0%, #23272e 40%, #15181e 100%); border-top: 1px solid #4a505a; box-shadow: 0 16px 34px rgba(245,158,11,0.16), 0 6px 10px rgba(0,0,0,0.6); }
        .lib-plank::after { content: ''; position: absolute; left: 4%; right: 4%; bottom: -1px; height: 1px; background: linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent); }
        .lib-plank-label { position: absolute; left: 30px; top: 50%; transform: translateY(-50%); font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: #8a7a5c; }

        .lib-bay { position: relative; display: flex; flex-direction: column; padding: 22px 16px 16px; text-align: left; color: inherit; font: inherit; cursor: pointer; border: 1px solid #1c2027; background:
            radial-gradient(70% 55% at 50% 0%, rgba(245,158,11,0.16), rgba(245,158,11,0) 70%),
            linear-gradient(180deg, #0f1116 0%, #0a0b0f 100%);
          box-shadow: inset 0 18px 30px rgba(0,0,0,0.65), inset 0 -10px 20px rgba(0,0,0,0.5), inset 12px 0 18px rgba(0,0,0,0.45), inset -12px 0 18px rgba(0,0,0,0.45);
          transition: border-color 0.35s, background 0.35s, box-shadow 0.35s; }
        .lib-bay::before { content: ''; position: absolute; left: 14%; right: 14%; top: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(245,158,11,0.85), transparent); box-shadow: 0 0 14px rgba(245,158,11,0.55); transition: opacity 0.35s; opacity: 0.75; }
        .lib-bay:hover, .lib-bay:focus-visible { border-color: rgba(0,240,255,0.45); background:
            radial-gradient(75% 60% at 50% 0%, rgba(245,158,11,0.28), rgba(245,158,11,0) 72%),
            linear-gradient(180deg, #12151b 0%, #0b0d11 100%); }
        .lib-bay:hover::before, .lib-bay:focus-visible::before { opacity: 1; }
        .lib-bay:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 3px; }

        .lib-spines { position: absolute; left: 10px; bottom: 0; height: 112px; display: flex; align-items: flex-end; gap: 2px; pointer-events: none; }
        .lib-spines span { width: 9px; border-top: 1px solid rgba(255,255,255,0.12); border-left: 1px solid rgba(255,255,255,0.05); box-shadow: inset -2px 0 3px rgba(0,0,0,0.4); }
        .lib-spines.wide { position: static; height: 150px; gap: 3px; }
        .lib-spines.wide span { width: 18px; }

        .lib-dossier { position: relative; z-index: 1; display: flex; flex-direction: column; flex: 1; }
        .lib-frame { position: relative; padding: 6px; background: linear-gradient(180deg, #1c2027, #111318); border: 1px solid #2c313c; box-shadow: 0 14px 26px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.6); transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s; }
        .lib-frame-in { aspect-ratio: 16 / 9; background: #07080b; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .lib-frame-in img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .lib-stand { height: 8px; margin: 0 30%; background: linear-gradient(180deg, #2c313c, #15181e); border-radius: 0 0 4px 4px; }
        .lib-bay:hover .lib-frame, .lib-bay:focus-visible .lib-frame { transform: translateY(-4px); box-shadow: 0 20px 34px rgba(0,0,0,0.7), 0 0 22px rgba(0,240,255,0.14); }

        .lib-plate { margin-top: 12px; padding: 12px 16px; background: linear-gradient(180deg, rgba(36,31,24,0.9), rgba(20,18,15,0.95)); border: 1px solid rgba(245,158,11,0.28); box-shadow: inset 0 1px 0 rgba(255,220,160,0.08); display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .lib-field { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #c9a86a; }
        .lib-title { font-family: var(--font-display); font-weight: 500; font-size: 19px; line-height: 1.25; color: var(--c-ink); transition: color 0.3s; }
        .lib-bay:hover .lib-title, .lib-bay:focus-visible .lib-title { color: var(--c-primary); }
        .lib-meta { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-top: auto; padding-top: 6px; }
        .lib-status { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #aab2bf; }
        .lib-status i { width: 7px; height: 7px; border-radius: 50%; background: #8a919d; box-shadow: 0 0 6px rgba(138,145,157,0.6); }
        .lib-status.live i { background: var(--c-primary); box-shadow: 0 0 8px rgba(0,240,255,0.8); animation: lib-blink 2s ease-in-out infinite; }
        .lib-status.live { color: var(--c-primary); }
        @keyframes lib-blink { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .lib-go { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #c6cdd8; opacity: 0.7; transition: opacity 0.3s, color 0.3s, transform 0.3s; }
        .lib-bay:hover .lib-go, .lib-bay:focus-visible .lib-go { opacity: 1; color: var(--c-primary); transform: translateX(3px); }
        .lib-kind { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.08em; color: #6b7280; line-height: 1.4; margin-top: 8px; }

        .lib-empty { cursor: default; display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-start; gap: 16px; min-height: 260px; }
        .lib-empty:hover { border-color: #1c2027; }
        .lib-empty .lib-plate { flex: none; align-self: stretch; border-style: dashed; border-color: rgba(245,158,11,0.22); background: rgba(20,18,15,0.6); }

        @media (prefers-reduced-motion: reduce) { .lib-status.live i { animation: none; } .lib-frame { transition: none; } }
        @media (max-width: 1100px) { .lib-case { padding: 30px 26px 26px; } .lib-row { gap: 18px; } }
        @media (max-width: 760px) {
          .lib-row { grid-template-columns: 1fr; gap: 0; }
          .lib-row > * + * { margin-top: 18px; }
          .lib-plank { margin: 0 -26px; }
          .lib-empty { min-height: 180px; }
        }
        @media (max-width: 600px) {
          .lib-case { padding: 20px 8px 16px; }
          .lib-case::before, .lib-case::after { width: 4px; }
          .lib-strip { display: none; }
          .lib-plank { margin: 0 -8px; }
          .lib-bay { padding: 16px 6px 10px; }
          .lib-title { font-size: 17px; }
        }
      `}),e.jsx("span",{className:"lib-cornice","aria-hidden":"true"}),e.jsx("span",{className:"lib-strip l","aria-hidden":"true"}),e.jsx("span",{className:"lib-strip r","aria-hidden":"true"}),c.map((r,s)=>e.jsxs("section",{className:"lib-shelf","aria-label":`${i("libShelf")} ${s+1}`,children:[e.jsx("div",{className:"lib-row",children:r.map((t,n)=>{const p=s*f+n;if(!t)return e.jsxs("div",{className:"lib-bay lib-empty",children:[e.jsx(R,{set:p%v.length,wide:!0}),e.jsx("div",{className:"lib-plate",children:e.jsx("span",{className:"lib-field",children:i("libReserved")})})]},`empty-${p}`);const b=t.status!=="completed";return e.jsx("button",{type:"button",className:"lib-bay",onClick:()=>d(p),"aria-label":`${t.title} — ${i(b?"researchStatus":"researchCompleted")}. ${i("libOpen")}`,children:e.jsxs("span",{className:"lib-dossier",children:[e.jsx("span",{className:"lib-frame",children:e.jsx("span",{className:"lib-frame-in",children:t.cover&&e.jsx("img",{src:t.cover,alt:`${t.title} — ${o[t.coverKind]||""}`,loading:s<2?"eager":"lazy",decoding:"async"})})}),e.jsx("span",{className:"lib-stand","aria-hidden":"true"}),e.jsxs("span",{className:"lib-plate",children:[e.jsx("span",{className:"lib-field",children:t.field}),e.jsx("span",{className:"lib-title",children:t.title}),e.jsxs("span",{className:"lib-meta",children:[e.jsxs("span",{className:`lib-status${b?" live":""}`,children:[e.jsx("i",{"aria-hidden":"true"}),i(b?"researchStatus":"researchCompleted")]}),e.jsxs("span",{className:"lib-go","aria-hidden":"true",children:[i("libOpen")," ",e.jsx(z,{size:12,strokeWidth:1.6})]})]}),o[t.coverKind]&&e.jsx("span",{className:"lib-kind",children:o[t.coverKind]})]})]})},t.title)})}),e.jsx("div",{className:"lib-plank","aria-hidden":"true",children:e.jsxs("span",{className:"lib-plank-label",children:[i("libShelf")," ",String(s+1).padStart(2,"0")]})})]},s))]})}function C({it:a,onClose:d}){const{t:i}=m(),o=i("researchCoverKinds")||{},l=g.useRef(null),x=g.useRef(null),c=a.status==="completed";return g.useEffect(()=>{var t;(t=x.current)==null||t.focus();const r=document.body.style.overflow;document.body.style.overflow="hidden";const s=n=>{if(n.key==="Escape"){n.preventDefault(),d();return}if(n.key!=="Tab"||!l.current)return;const p=l.current.querySelectorAll("a[href], button:not([disabled])");if(!p.length)return;const b=p[0],h=p[p.length-1];n.shiftKey&&document.activeElement===b?(n.preventDefault(),h.focus()):!n.shiftKey&&document.activeElement===h&&(n.preventDefault(),b.focus())};return window.addEventListener("keydown",s),()=>{window.removeEventListener("keydown",s),document.body.style.overflow=r}},[d]),e.jsxs("div",{className:"dz-back",onMouseDown:r=>{r.target===r.currentTarget&&d()},children:[e.jsx("style",{children:`
        .dz-back { position: fixed; inset: 0; z-index: 300; background: rgba(5,6,9,0.82); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: flex; justify-content: center; align-items: flex-start; overflow-y: auto; padding: 48px 24px; animation: dz-fade 0.25s ease-out; }
        .dz { position: relative; width: 100%; max-width: 980px; background: linear-gradient(180deg, #13161c, #0d0f13); border: 1px solid #2a2f38; box-shadow: 0 40px 90px rgba(0,0,0,0.7); animation: dz-rise 0.35s cubic-bezier(0.2,0.8,0.2,1); }
        .dz::before { content: ''; position: absolute; left: 10%; right: 10%; top: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(245,158,11,0.85), transparent); }
        @keyframes dz-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dz-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .dz-close { position: absolute; right: 14px; top: 14px; z-index: 2; }
        .dz-fig { margin: 0; padding: 22px 22px 0; }
        .dz-fig .in { background: #07080b; border: 1px solid #22262e; display: flex; justify-content: center; }
        .dz-fig img { max-width: 100%; max-height: 440px; object-fit: contain; display: block; }
        .dz-fig figcaption { margin-top: 8px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-meta); }
        .dz-body { padding: 24px 32px 32px; }
        .dz-top { display: flex; flex-wrap: wrap; gap: 10px 16px; align-items: center; }
        .dz-field { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #c9a86a; }
        .dz h2 { font-family: var(--font-display); font-weight: 500; font-size: clamp(24px, 3vw, 34px); line-height: 1.15; letter-spacing: -0.015em; color: var(--c-ink); margin-top: 12px; }
        .dz-abs { font-family: var(--font-body); font-size: 16px; line-height: 1.65; color: #c6cdd8; margin-top: 14px; }
        .dz-sec { margin-top: 28px; }
        .dz-h { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: #c6cdd8; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
        .dz-h::before { content: ''; width: 1px; height: 12px; background: var(--c-tertiary); }
        .dz-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .dz ul { list-style: none; display: flex; flex-direction: column; gap: 9px; }
        .dz li { display: flex; gap: 10px; font-family: var(--font-body); font-size: 14px; line-height: 1.55; color: #a7aebb; }
        .dz li::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--c-tertiary); margin-top: 8px; flex: none; }
        .dz p.txt { font-family: var(--font-body); font-size: 14px; line-height: 1.6; color: #a7aebb; }
        .dz-table { overflow-x: auto; }
        .dz table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 12.5px; }
        .dz th { padding: 8px 10px; border-bottom: 1px solid #2c313c; color: #7b8290; font-weight: 400; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; }
        .dz td { padding: 10px; border-bottom: 1px solid #1e222b; font-variant-numeric: tabular-nums; }
        .dz-cap { font-family: var(--font-body); font-size: 12.5px; line-height: 1.55; color: #6b7280; margin-top: 10px; }
        .dz-gal { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .dz-gal figure { margin: 0; border: 1px solid #1e222b; background: #0d0f14; }
        .dz-gal img { display: block; width: 100%; height: auto; }
        .dz-gal figcaption { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.08em; text-transform: uppercase; color: #7b8290; padding: 6px 8px; }
        .dz-links { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #1e222b; }
        @media (prefers-reduced-motion: reduce) { .dz-back, .dz { animation: none; } }
        @media (max-width: 720px) {
          .dz-back { padding: 0; }
          .dz { min-height: 100%; border: none; }
          .dz-fig { padding: 56px 14px 0; }
          .dz-body { padding: 20px 16px 28px; }
          .dz-cols { grid-template-columns: 1fr; }
          .dz-gal { grid-template-columns: repeat(2, 1fr); }
        }
      `}),e.jsxs("div",{ref:l,className:"dz",role:"dialog","aria-modal":"true","aria-labelledby":"dz-title",children:[e.jsx("button",{ref:x,type:"button",className:"icon-btn dz-close",onClick:d,"aria-label":i("libClose"),children:e.jsx(k,{size:16,strokeWidth:1.6})}),a.cover&&e.jsxs("figure",{className:"dz-fig",children:[e.jsx("div",{className:"in",children:e.jsx("img",{src:a.cover,alt:`${a.title} — ${o[a.coverKind]||""}`})}),o[a.coverKind]&&e.jsx("figcaption",{children:o[a.coverKind]})]}),e.jsxs("div",{className:"dz-body",children:[e.jsxs("div",{className:"dz-top",children:[e.jsx("span",{className:"dz-field",children:a.field}),e.jsx("span",{className:`label${c?"":" label-primary"}`,children:i(c?"researchCompleted":"researchStatus")})]}),e.jsx("h2",{id:"dz-title",children:a.title}),a.abstract&&e.jsx("p",{className:"dz-abs",children:a.abstract}),Array.isArray(a.methods)&&a.methods.length>0&&e.jsxs("div",{className:"dz-sec dz-cols",children:[e.jsxs("div",{children:[e.jsx("div",{className:"dz-h",children:i("researchMethods")}),e.jsx("ul",{children:a.methods.map(r=>e.jsx("li",{children:r},r))})]}),a.expected&&e.jsxs("div",{children:[e.jsx("div",{className:"dz-h",children:i(c?"researchOutcomes":"researchExpected")}),e.jsx("p",{className:"txt",children:a.expected})]})]}),a.results&&e.jsxs("div",{className:"dz-sec",children:[e.jsx("div",{className:"dz-h",children:i("researchResults")}),e.jsx("div",{className:"dz-table",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsx("tr",{children:a.results.columns.map((r,s)=>e.jsx("th",{style:{textAlign:s?"right":"left"},children:r},r))})}),e.jsx("tbody",{children:a.results.rows.map(r=>e.jsx("tr",{children:r.map((s,t)=>e.jsx("td",{style:{textAlign:t?"right":"left",color:t?"#e0e0e8":"#a2a2b8"},children:s},t))},r[0]))})]})}),a.results.caption&&e.jsx("p",{className:"dz-cap",children:a.results.caption})]}),Array.isArray(a.findings)&&a.findings.length>0&&e.jsxs("div",{className:"dz-sec",children:[e.jsx("div",{className:"dz-h",children:i("libFindings")}),e.jsx("ul",{children:a.findings.map(r=>e.jsx("li",{children:r},r))})]}),Array.isArray(a.images)&&a.images.length>0&&e.jsxs("div",{className:"dz-sec",children:[e.jsx("div",{className:"dz-gal",children:a.images.map(r=>e.jsxs("figure",{children:[e.jsx("img",{src:r.src,alt:r.caption,loading:"lazy"}),e.jsx("figcaption",{children:r.caption})]},r.src))}),a.imagesNote&&e.jsx("p",{className:"dz-cap",children:a.imagesNote})]}),(a.repo||a.project||a.pdf)&&e.jsxs("div",{className:"dz-links",children:[a.repo&&e.jsxs("a",{href:a.repo,target:"_blank",rel:"noopener noreferrer",className:"ds-link",children:[e.jsx(w,{size:13,strokeWidth:1.5})," ",i("researchRepo")," ",e.jsx(u,{size:12,strokeWidth:1.5})]}),a.project&&e.jsxs(y,{to:`/project/${a.project}`,className:"ds-link",onClick:d,children:[i("hfViewProject")," ",e.jsx(u,{size:12,strokeWidth:1.5})]}),a.pdf&&e.jsxs("a",{href:a.pdf,target:"_blank",rel:"noopener noreferrer",className:"ds-link",children:[e.jsx(N,{size:13,strokeWidth:1.5})," ",i("researchPdf")]})]})]})]})]})}function P(){const{t:a}=m(),d=a("researchItems"),i=Array.isArray(d)?d:[],[o,l]=S(),x=Number(o.get("r")),c=Number.isInteger(x)&&x>=1&&x<=i.length?x-1:-1,r=g.useRef(null);A({title:a("researchLabel"),description:a("researchSub"),path:"/research"});const s=n=>{r.current=document.activeElement,l({r:String(n+1)})},t=g.useCallback(()=>{l({},{replace:!1}),requestAnimationFrame(()=>{var n,p;return(p=(n=r.current)==null?void 0:n.focus)==null?void 0:p.call(n)})},[l]);return g.useEffect(()=>{o.get("r")&&c===-1&&l({},{replace:!0})},[o,c,l]),e.jsxs("div",{className:"rl",children:[e.jsx("style",{children:`
        .rl-wrap { padding-top: 48px; padding-bottom: 120px; }
        .rl-back { display: flex; width: fit-content; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: #aab2bf; }
        .rl-head { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: 24px 56px; align-items: end; margin: 32px 0 40px; }
        .rl-head h1 { font-family: var(--font-display); font-weight: 500; font-size: clamp(42px, 5vw, 76px); line-height: 1; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 18px; }
        .rl-head p { font-family: var(--font-body); font-size: 16px; line-height: 1.65; color: #c3c9d4; }
        .rl-note { display: flex; gap: 10px; margin-top: 16px; padding: 12px 14px; border-left: 2px solid var(--c-tertiary); background: rgba(245,158,11,0.06); font-family: var(--font-body); font-size: 13px; line-height: 1.55; color: #d8c9a8; }
        @media (max-width: 900px) { .rl-head { grid-template-columns: 1fr; } }
      `}),e.jsxs("div",{className:"ds-wrap rl-wrap",children:[e.jsxs(y,{to:"/",className:"link-hover rl-back",children:[e.jsx($,{size:16,strokeWidth:1.5})," ",a("researchBack")]}),e.jsxs("header",{className:"rl-head",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"ds-kicker",children:[a("libKicker")," · ",String(i.length).padStart(2,"0")]}),e.jsx("h1",{children:e.jsx(E,{text:a("researchLabel")})})]}),e.jsxs("div",{children:[e.jsx("p",{children:a("researchSub")}),e.jsxs("div",{className:"rl-note",children:[e.jsx(K,{size:15,strokeWidth:1.6,style:{color:"var(--c-tertiary)",flexShrink:0,marginTop:2}}),e.jsx("span",{children:a("researchDisclaimer")})]})]})]}),e.jsx(L,{items:i,onOpen:s})]}),c>=0&&e.jsx(C,{it:i[c],onClose:t})]})}export{P as default};
