import{q as A,u as h,j as t,B as O,r as f,X as R,e as L,F as B,d as C,l as W,L as _,A as K,i as I}from"./index-ar3QjfhL.js";const D=["#1d2a3a","#23303f","#1f2f2c","#2a2438","#1b2633"],M=["#3a2a1d","#33251c","#2f2a1f","#3b2420","#2b2c22"],F=e=>[...e].reduce((r,n)=>r*31+n.charCodeAt(0)>>>0,7);function k(e,r,n=""){const i=F(e),l=86+i%5*3,s=Math.min(100,l+Math.max(0,n.length-36)*.5);return{thickness:54+i%4*6,length:s,tone:r[i%r.length]}}const y={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12,oca:1,şub:2,sub:2,nis:4,haz:6,tem:7,ağu:8,agu:8,eyl:9,eki:10,kas:11,ara:12};function P(e){const r=String(e||"").trim().toLowerCase().match(/^([a-zçğıöşü]{3})[a-zçğıöşü]*\.?\s+(\d{4})$/);return!r||!y[r[1]]?null:Number(r[2])*100+y[r[1]]}function v(e){const r=e.map((n,i)=>({b:n,i,k:P(n.date)}));return r.some(n=>n.k===null)?e:r.sort((n,i)=>i.k-n.k||n.i-i.i).map(n=>n.b)}function w(e,r=38){const n=e.split(":")[0].trim();if(n.length<=r)return n;const i=n.slice(0,r);return`${i.slice(0,i.lastIndexOf(" "))}…`}const j=e=>(String(e||"").match(/\d{4}/)||[""])[0];function X(e,r){const n=(a,o)=>r==="tr"&&o?o:a,i=v(A.read.map(a=>({id:`read-${a.slug}`,collection:"read",slug:a.slug,title:a.title,short:w(a.title),authors:a.authors,byline:a.authors.length>2?`${a.authors[0].split(" ").slice(-1)[0]} et al.`:a.authors.join(", "),year:j(a.date),date:a.date,venue:a.venue,ref:a.arxiv,topic:n(a.category,a.categoryTr),tags:n(a.tags,a.tagsTr)||[],readOn:n(a.readOn,a.readOnTr),url:a.url,pdf:a.pdf,accent:a.accent,spine:k(a.slug,D,a.title)}))),l=e("blogItems"),s=e("blogPosts")||{},c=v((Array.isArray(l)?l:[]).filter(a=>a.slug&&s[a.slug]).map(a=>{const o=s[a.slug];return{id:`write-${a.slug}`,collection:"written",slug:a.slug,title:o.title||a.title,short:w(o.title||a.title,34),authors:["Görkem Ergüne"],byline:"G. Ergüne",year:j(o.date||a.date),date:o.date||a.date,topic:o.category||a.category,readTime:o.readTime||a.readTime,summary:o.description||a.excerpt,body:Array.isArray(o.body)?o.body:[],accent:"#F59E0B",spine:k(a.slug,M,o.title||a.title)}}));return{read:i,written:c}}function Y({book:e,onOpen:r,offset:n=0}){const{t:i}=h(),{thickness:l,length:s,tone:c}=e.spine;return t.jsxs("button",{type:"button",className:`bk-book ${e.collection}`,style:{"--bk-th":`${l}px`,"--bk-len":`${s}%`,"--bk-tone":c,"--bk-acc":e.accent,"--bk-off":`${n}px`},onClick:()=>r(e.id),"aria-label":`${e.title} — ${e.byline}${e.date?`, ${e.date}`:""}. ${i("bkOpen")}`,children:[t.jsx("span",{className:"bk-edge","aria-hidden":"true"}),t.jsx("span",{className:"bk-title","aria-hidden":"true",children:e.title}),t.jsx("span",{className:"bk-year","aria-hidden":"true",children:e.date||e.year}),t.jsxs("span",{className:"bk-tip","aria-hidden":"true",children:[t.jsx("span",{className:"bk-tip-t",children:e.title}),t.jsxs("span",{className:"bk-tip-m",children:[e.byline,e.date?` · ${e.date}`:"",e.topic?` · ${e.topic}`:""]})]})]})}function q({text:e}){return t.jsxs("span",{className:"bk-empty",role:"note",children:[t.jsx(O,{size:16,strokeWidth:1.5,"aria-hidden":"true"}),e]})}const H=5,N=1,G=3,z=(e,r)=>Array.from({length:Math.ceil(e.length/r)},(n,i)=>e.slice(i*r,(i+1)*r)),T=[[22,84,"#1a1d23"],[18,72,"#1d1a16"],[26,90,"#171b20"],[20,78,"#1c1915"],[24,68,"#181b21"],[16,86,"#1b1814"]];function $({seed:e,count:r,side:n}){return t.jsx("span",{className:`bk-stack bk-deco${n?" side":""}`,"aria-hidden":"true",children:Array.from({length:r},(i,l)=>{const[s,c,a]=T[(e*2+l)%T.length];return t.jsx("span",{style:{height:s,width:`${c}%`,background:`linear-gradient(180deg, ${a}, #0d0f12)`}},l)})})}function U({children:e,label:r}){return t.jsxs("div",{className:"bk-shelf",children:[t.jsx("div",{className:"bk-row",children:e}),t.jsx("div",{className:"bk-plank","aria-hidden":"true",children:r&&t.jsx("span",{children:r})})]})}function S({id:e,kicker:r,title:n,sub:i,books:l,emptyText:s,onOpen:c,side:a}){const o=z(l,H),x=z(o,N);for(;x.length<G;)x.push([]);const b=a==="right"?3:0;return t.jsxs("section",{className:`bk-case ${a}`,"aria-labelledby":`${e}-title`,children:[t.jsxs("header",{className:"bk-head",children:[t.jsxs("span",{className:"bk-kicker",children:[r," · ",String(l.length).padStart(2,"0")]}),t.jsx("h2",{id:`${e}-title`,children:n}),t.jsx("p",{children:i})]}),t.jsxs("div",{className:"bk-frame",children:[t.jsx("span",{className:"bk-crown","aria-hidden":"true"}),x.map((d,p)=>t.jsxs(U,{label:String(p+1).padStart(2,"0"),children:[l.length===0&&p===0&&t.jsx(q,{text:s}),d.map((g,m)=>t.jsx("ol",{className:"bk-stack","aria-label":`${n} — ${p*N+m+1}`,children:g.map((u,E)=>t.jsx("li",{children:t.jsx(Y,{book:u,onOpen:c,offset:(E*7+m*3)%13})},u.id))},m)),d.length>0?t.jsx($,{seed:b+p,count:3,side:!0}):t.jsx($,{seed:b+p,count:2+p%3})]},p))]})]})}function V({book:e,onClose:r}){const{t:n}=h(),i=f.useRef(null),l=f.useRef(null),s=e.collection==="read";f.useEffect(()=>{var x;(x=l.current)==null||x.focus();const a=document.body.style.overflow;document.body.style.overflow="hidden";const o=b=>{if(b.key==="Escape"){b.preventDefault(),r();return}if(b.key!=="Tab"||!i.current)return;const d=i.current.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]');if(!d.length)return;const p=d[0],g=d[d.length-1];b.shiftKey&&document.activeElement===p?(b.preventDefault(),g.focus()):!b.shiftKey&&document.activeElement===g&&(b.preventDefault(),p.focus())};return window.addEventListener("keydown",o),()=>{window.removeEventListener("keydown",o),document.body.style.overflow=a}},[r]);const c=s?[e.venue,e.date,e.ref,e.readOn&&`${n("articlesReadOn")} ${e.readOn}`].filter(Boolean):[e.date,e.topic,e.readTime&&`${e.readTime} ${n("bkReadTime")}`].filter(Boolean);return t.jsxs("div",{className:"br-back",onMouseDown:a=>{a.target===a.currentTarget&&r()},children:[t.jsx("style",{children:`
        .br-back { position: fixed; inset: 0; z-index: 300; background: rgba(5,6,9,0.84); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 32px 24px; animation: br-fade 0.25s ease-out; }
        @keyframes br-fade { from { opacity: 0; } to { opacity: 1; } }
        .br-book { position: relative; width: 100%; max-width: 1180px; height: min(86vh, 820px); display: grid; grid-template-columns: 1fr 1fr; perspective: 1800px; animation: br-open 0.55s cubic-bezier(0.2,0.8,0.2,1); filter: drop-shadow(0 40px 60px rgba(0,0,0,0.65)); }
        @keyframes br-open { from { opacity: 0; transform: scale(0.94) translateY(14px); } to { opacity: 1; transform: none; } }
        .br-page { position: relative; overflow-y: auto; padding: 46px 44px 40px; background:
            linear-gradient(180deg, rgba(245,158,11,0.035), rgba(245,158,11,0) 30%),
            linear-gradient(180deg, #17150f 0%, #121009 100%);
          border: 1px solid #2c271c; scrollbar-width: thin; scrollbar-color: #3a3326 transparent; }
        .br-left { border-radius: 6px 0 0 6px; box-shadow: inset -26px 0 30px -18px rgba(0,0,0,0.75); border-right: none; }
        .br-right { border-radius: 0 6px 6px 0; box-shadow: inset 26px 0 30px -18px rgba(0,0,0,0.75); transform-origin: left center; animation: br-turn 0.7s cubic-bezier(0.2,0.8,0.2,1); }
        @keyframes br-turn { from { transform: rotateY(-62deg); opacity: 0.4; } to { transform: none; opacity: 1; } }
        .br-book::after { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; transform: translateX(-1px); background: linear-gradient(180deg, transparent, rgba(0,0,0,0.9), transparent); pointer-events: none; }
        .br-close { position: absolute; right: -14px; top: -14px; z-index: 3; }
        .br-kick { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a86a; }
        .br-left h2 { font-family: var(--font-display); font-weight: 500; font-size: clamp(24px, 2.4vw, 32px); line-height: 1.18; letter-spacing: -0.015em; color: #f1ece2; margin-top: 16px; }
        .br-authors { font-family: var(--font-body); font-size: 14px; line-height: 1.6; color: #b8ad98; margin-top: 14px; }
        .br-meta { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
        .br-meta span { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.06em; color: #d8cdb6; padding: 4px 8px; border: 1px solid #3a3326; }
        .br-rule { height: 1px; background: linear-gradient(90deg, #3a3326, transparent); margin: 24px 0; }
        .br-sum { font-family: var(--font-body); font-size: 16px; line-height: 1.7; color: #e3dccd; }
        .br-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; }
        .br-tags span { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #a89a7e; }
        .br-tags span + span::before { content: '·'; margin-right: 6px; color: #5a5040; }
        .br-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
        .br-h { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a86a; margin-bottom: 18px; }
        .br-note + .br-note { margin-top: 26px; }
        .br-note h3 { font-family: var(--font-display); font-weight: 500; font-size: 19px; color: #f1ece2; margin-bottom: 12px; }
        .br-note ul { list-style: none; display: flex; flex-direction: column; gap: 11px; }
        .br-note li { display: flex; gap: 11px; font-family: var(--font-body); font-size: 15px; line-height: 1.7; color: #d6cebd; }
        .br-note li::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--c-tertiary); margin-top: 10px; flex: none; }
        .br-body p { font-family: var(--font-body); font-size: 16px; line-height: 1.8; color: #e0d8c8; }
        .br-body p + p { margin-top: 16px; }
        .br-book.br-single { max-width: 620px; height: auto; max-height: 86vh; grid-template-columns: 1fr; }
        .br-book.br-single::after { display: none; }
        .br-book.br-single .br-left { border-radius: 6px; border-right: 1px solid #2c271c; box-shadow: none; }
        @media (prefers-reduced-motion: reduce) { .br-back, .br-book, .br-right { animation: none; } }
        @media (max-width: 860px) {
          .br-back { padding: 0; align-items: stretch; }
          .br-book { height: auto; max-height: none; grid-template-columns: 1fr; overflow-y: auto; perspective: none; filter: none; }
          .br-book::after { display: none; }
          .br-page { overflow: visible; padding: 28px 20px; border-radius: 0 !important; box-shadow: none; border-left: none; border-right: none; }
          .br-left { padding-top: 64px; }
          .br-right { animation: none; border-top: none; }
          .br-close { position: fixed; right: 12px; top: 12px; }
        }
      `}),t.jsxs("div",{ref:i,className:`br-book${s?" br-single":""}`,role:"dialog","aria-modal":"true","aria-labelledby":"br-title",children:[t.jsx("button",{ref:l,type:"button",className:"icon-btn br-close",onClick:r,"aria-label":n("bkClose"),children:t.jsx(R,{size:16,strokeWidth:1.6})}),t.jsxs("article",{className:"br-page br-left",tabIndex:0,children:[t.jsxs("div",{className:"br-kick",children:[n(s?"bkReadTitle":"bkWriteTitle"),e.topic?` · ${e.topic}`:""]}),t.jsx("h2",{id:"br-title",children:e.title}),t.jsx("p",{className:"br-authors",children:e.authors.join(" · ")}),c.length>0&&t.jsx("div",{className:"br-meta",children:c.map(a=>t.jsx("span",{children:a},a))}),t.jsx("div",{className:"br-rule"}),e.summary&&t.jsx("p",{className:"br-sum",children:e.summary}),e.tags&&e.tags.length>0&&t.jsx("div",{className:"br-tags",children:e.tags.map(a=>t.jsx("span",{children:a},a))}),t.jsxs("div",{className:"br-actions",children:[e.url&&t.jsxs("a",{className:"btn btn-primary",href:e.url,target:"_blank",rel:"noopener noreferrer",children:[n("bkReadOriginal")," ",t.jsx(L,{size:14,strokeWidth:1.6})]}),e.pdf&&t.jsxs("a",{className:"btn btn-secondary",href:e.pdf,download:!0,children:[n("articlesAnnotated")," ",t.jsx(B,{size:14,strokeWidth:1.6})]})]})]}),!s&&t.jsxs("article",{className:"br-page br-right",tabIndex:0,"aria-label":n("bkTheText"),children:[t.jsx("div",{className:"br-h",children:n("bkTheText")}),t.jsx("div",{className:"br-body",children:e.body.map((a,o)=>t.jsx("p",{children:a},o))})]})]})]})}function Q(){const{lang:e,t:r}=h(),{read:n,written:i}=f.useMemo(()=>X(r,e),[r,e]),[l,s]=C(),c=l.get("book"),a=c?[...n,...i].find(d=>d.id===c):null,o=f.useRef(null);W({title:r("articlesLabel"),description:r("articlesSub"),path:"/articles"});const x=d=>{o.current=document.activeElement,s({book:d})},b=f.useCallback(()=>{s({}),requestAnimationFrame(()=>{var d,p;return(p=(d=o.current)==null?void 0:d.focus)==null?void 0:p.call(d)})},[s]);return f.useEffect(()=>{c&&!a&&s({},{replace:!0})},[c,a,s]),t.jsxs("div",{className:"kl",children:[t.jsx("style",{children:Z}),t.jsxs("div",{className:"ds-wrap kl-wrap",children:[t.jsxs(_,{to:"/",className:"link-hover kl-back",children:[t.jsx(K,{size:16,strokeWidth:1.5})," ",r("articlesBack")]}),t.jsxs("header",{className:"kl-head",children:[t.jsxs("div",{children:[t.jsx("div",{className:"ds-kicker",children:r("articlesBadge")}),t.jsx("h1",{children:t.jsx(I,{text:r("articlesLabel")})})]}),t.jsx("p",{children:r("articlesSub")})]}),t.jsxs("div",{className:"kl-room",children:[t.jsx(S,{id:"bk-read",side:"left",kicker:r("bkReadKicker"),title:r("bkReadTitle"),sub:r("bkReadSub"),books:n,emptyText:r("bkReadEmpty"),onOpen:x}),t.jsx(S,{id:"bk-write",side:"right",kicker:r("bkWriteKicker"),title:r("bkWriteTitle"),sub:r("bkWriteSub"),books:i,emptyText:r("bkWriteEmpty"),onOpen:x})]})]}),a&&t.jsx(V,{book:a,onClose:b})]})}const Z=`
  .kl-wrap { padding-top: 48px; padding-bottom: 120px; }
  .kl-back { display: flex; width: fit-content; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: #aab2bf; }
  .kl-head { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: 24px 56px; align-items: end; margin: 32px 0 44px; }
  .kl-head h1 { font-family: var(--font-display); font-weight: 500; font-size: clamp(42px, 5vw, 76px); line-height: 1; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 18px; }
  .kl-head p { font-family: var(--font-body); font-size: 16px; line-height: 1.65; color: #c3c9d4; }

  /* The room: one warm floor glow under both cases so they share a space. */
  .kl-room { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding-bottom: 30px; }
  .kl-room::after { content: ''; position: absolute; left: -2%; right: -2%; bottom: 0; height: 60px; background: radial-gradient(60% 100% at 50% 0%, rgba(245,158,11,0.16), transparent 70%); pointer-events: none; }

  .bk-case { display: flex; flex-direction: column; min-width: 0; }
  .bk-head { margin-bottom: 18px; }
  .bk-kicker { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--c-primary); }
  .bk-case.right .bk-kicker { color: var(--c-tertiary); }
  .bk-head h2 { font-family: var(--font-display); font-weight: 500; font-size: 28px; letter-spacing: -0.015em; color: var(--c-ink); margin-top: 8px; }
  .bk-head p { font-family: var(--font-body); font-size: 14.5px; line-height: 1.55; color: var(--c-body); margin-top: 6px; }

  .bk-frame { position: relative; padding: 26px 26px 18px; background:
      radial-gradient(90% 40% at 50% 0%, rgba(245,158,11,0.10), transparent 70%),
      linear-gradient(180deg, #1a1612 0%, #110f0c 100%);
    border: 1px solid #2d261d; border-left-width: 12px; border-right-width: 12px;
    border-left-color: #241e17; border-right-color: #241e17;
    box-shadow: 0 40px 70px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(0,0,0,0.5); }
  .bk-case.left .bk-frame { background:
      radial-gradient(90% 40% at 50% 0%, rgba(56,189,248,0.07), transparent 70%),
      linear-gradient(180deg, #14171c 0%, #0e1013 100%);
    border-color: #262b33; border-left-color: #1c2026; border-right-color: #1c2026; }
  .bk-crown { position: absolute; left: -12px; right: -12px; top: -12px; height: 12px; background: linear-gradient(180deg, #3a322a, #1b1712); border-bottom: 1px solid #0b0a08; }
  .bk-case.left .bk-crown { background: linear-gradient(180deg, #2f343d, #161a1f); }
  .bk-crown::after { content: ''; position: absolute; left: 8%; right: 8%; bottom: -3px; height: 2px; background: linear-gradient(90deg, transparent, rgba(245,158,11,0.7), transparent); }

  .bk-shelf + .bk-shelf { margin-top: 22px; }
  /* The two cases end level: the last shelf absorbs any height difference. */
  .bk-frame { flex: 1; display: flex; flex-direction: column; }
  .bk-shelf:last-child { flex: 1; display: flex; flex-direction: column; }
  .bk-shelf:last-child > .bk-row { flex: 1; }
  .bk-row { position: relative; min-height: 236px; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 14px 22px; padding: 18px 14px 0; background: radial-gradient(80% 70% at 50% 0%, rgba(245,158,11,0.09), transparent 75%); box-shadow: inset 0 16px 24px rgba(0,0,0,0.55); }
  .bk-plank { position: relative; height: 14px; margin: 0 -26px; background: linear-gradient(180deg, #4a3f33 0%, #2b241c 45%, #18140f 100%); border-top: 1px solid #5c4e3e; box-shadow: 0 12px 22px rgba(245,158,11,0.10), 0 6px 10px rgba(0,0,0,0.6); }
  .bk-case.left .bk-plank { background: linear-gradient(180deg, #3d434d 0%, #23272e 45%, #14171b 100%); border-top-color: #4d535e; }
  .bk-plank span { position: absolute; right: 34px; top: 50%; transform: translateY(-50%); font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.2em; color: #7d6e58; }

  /* A stack: books lie flat, first (newest) on top, sitting on the shelf. */
  .bk-stack { list-style: none; flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; position: relative; }
  .bk-stack > li { display: flex; position: relative; }
  .bk-stack > li:hover, .bk-stack > li:focus-within { z-index: 4; }
  .bk-deco { pointer-events: none; opacity: 0.6; align-items: flex-start; }
  .bk-deco.side { flex: 0 0 22%; }
  @media (max-width: 1240px) { .bk-deco.side { flex-basis: 12%; } }
  .bk-deco span { display: block; border-radius: 2px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 3px rgba(0,0,0,0.5); }
  .bk-deco span:nth-child(even) { margin-left: 8px; }

  .bk-book { position: relative; width: var(--bk-len); max-width: calc(100% - var(--bk-off)); min-height: var(--bk-th); height: auto; padding-top: 8px !important; padding-bottom: 8px !important; margin-left: var(--bk-off); display: grid; grid-template-columns: 16px minmax(0, 1fr); grid-template-rows: auto auto; align-content: center; column-gap: 12px; row-gap: 3px; padding: 0 18px 0 0; cursor: pointer; text-align: left; color: #f1ece2; font: inherit; border: none; border-radius: 3px 2px 2px 3px;
    background:
      linear-gradient(180deg, rgba(255,255,255,0.13) 0, rgba(255,255,255,0.03) 18%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.38) 100%),
      linear-gradient(90deg, transparent 0 calc(100% - 26px), rgba(231,194,122,0.28) calc(100% - 26px) calc(100% - 24px), transparent calc(100% - 24px) calc(100% - 20px), rgba(231,194,122,0.18) calc(100% - 20px) calc(100% - 19px), transparent calc(100% - 19px)),
      var(--bk-tone);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -2px 0 rgba(0,0,0,0.45), 0 3px 5px rgba(0,0,0,0.55);
    transition: transform 0.35s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.35s; }
  .bk-edge { grid-row: 1 / span 2; align-self: stretch; border-radius: 3px 0 0 3px; background: linear-gradient(180deg, color-mix(in srgb, var(--bk-acc) 75%, #fff 5%), color-mix(in srgb, var(--bk-acc) 40%, #000)); box-shadow: inset -1px 0 0 rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25); }
  .bk-title { grid-column: 2; font-family: var(--font-display); font-weight: 500; font-size: 14.5px; line-height: 1.28; color: #f1ece2; overflow-wrap: break-word; hyphens: manual; }
  .bk-year { grid-column: 2; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.06em; color: #d8b877; white-space: nowrap; }
  .bk-book:hover, .bk-book:focus-visible { transform: translateX(14px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 1px color-mix(in srgb, var(--bk-acc) 75%, transparent), 0 6px 14px rgba(0,0,0,0.6), 0 0 18px color-mix(in srgb, var(--bk-acc) 30%, transparent); }
  .bk-book:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 3px; }
  .bk-tip { position: absolute; left: 16px; bottom: calc(100% + 8px); z-index: 6; width: min(320px, 92%); padding: 10px 12px; text-align: left; background: #0b0d11; border: 1px solid rgba(245,158,11,0.45); box-shadow: 0 10px 24px rgba(0,0,0,0.55); opacity: 0; transform: translateY(4px); pointer-events: none; transition: opacity 0.2s, transform 0.2s; display: flex; flex-direction: column; gap: 4px; }
  .bk-case.left .bk-tip { border-color: rgba(0,240,255,0.45); }
  .bk-book:hover .bk-tip, .bk-book:focus-visible .bk-tip { opacity: 1; transform: none; }
  .bk-tip-t { font-family: var(--font-display); font-size: 14px; line-height: 1.3; color: var(--c-ink); }
  .bk-tip-m { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.06em; color: #aab2bf; }

  .bk-empty { align-self: center; display: inline-flex; align-items: center; gap: 10px; margin: auto; padding: 12px 16px; border: 1px dashed rgba(245,158,11,0.35); background: rgba(20,18,15,0.7); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; color: #d8c9a8; }

  @media (prefers-reduced-motion: reduce) { .bk-book, .bk-tip { transition: none; } }
  @media (max-width: 1100px) { .kl-room { gap: 24px; } .bk-frame { padding: 22px 18px 16px; } .bk-plank { margin: 0 -18px; } }
  @media (max-width: 900px) { .kl-head { grid-template-columns: 1fr; } .kl-room { grid-template-columns: 1fr; gap: 56px; } }
  /* Phones: one stack per row, books nearly full width, titles still horizontal. */
  @media (max-width: 640px) {
    .bk-frame { padding: 18px 10px 12px; border-left-width: 8px; border-right-width: 8px; }
    .bk-crown { left: -8px; right: -8px; }
    .bk-plank { margin: 0 -10px; }
    .bk-row { min-height: 0; padding: 14px 6px 0; }
    .bk-stack { flex-basis: 100%; }
    .bk-deco { display: none; }
    .bk-row:not(:has(.bk-book)) .bk-deco { display: flex; }
    .bk-book { width: calc(var(--bk-len) + 6%); max-width: 100%; margin-left: calc(var(--bk-off) / 2); min-height: 56px; height: auto; padding-top: 8px; padding-bottom: 8px; }
    .bk-book:hover, .bk-book:focus-visible { transform: translateX(6px); }
    .bk-tip { display: none; }
    .bk-title { font-size: 15px; }
  }
`;export{Q as default};
