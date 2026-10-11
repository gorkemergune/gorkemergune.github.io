import{q as A,u as m,j as e,B as O,r as f,X as R,e as B,F as L,d as C,l as K,L as W,A as _,i as F}from"./index-f0qu5WmO.js";const I=["#1d2a3a","#23303f","#1f2f2c","#2a2438","#1b2633"],M=["#3a2a1d","#33251c","#2f2a1f","#3b2420","#2b2c22"],D=t=>[...t].reduce((r,n)=>r*31+n.charCodeAt(0)>>>0,7);function k(t,r,n=""){const i=D(t),s=86+i%5*3,o=Math.min(100,s+Math.max(0,n.length-36)*.5);return{thickness:54+i%4*6,length:o,tone:r[i%r.length]}}const y={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12,oca:1,şub:2,sub:2,nis:4,haz:6,tem:7,ağu:8,agu:8,eyl:9,eki:10,kas:11,ara:12};function P(t){const r=String(t||"").trim().toLowerCase().match(/^([a-zçğıöşü]{3})[a-zçğıöşü]*\.?\s+(\d{4})$/);return!r||!y[r[1]]?null:Number(r[2])*100+y[r[1]]}function v(t){const r=t.map((n,i)=>({b:n,i,k:P(n.date)}));return r.some(n=>n.k===null)?t:r.sort((n,i)=>i.k-n.k||n.i-i.i).map(n=>n.b)}function w(t,r=38){const n=t.split(":")[0].trim();if(n.length<=r)return n;const i=n.slice(0,r);return`${i.slice(0,i.lastIndexOf(" "))}…`}const j=t=>(String(t||"").match(/\d{4}/)||[""])[0];function X(t,r){const n=(a,l)=>r==="tr"&&l?l:a,i=v(A.read.map(a=>({id:`read-${a.slug}`,collection:"read",slug:a.slug,title:a.title,short:w(a.title),authors:a.authors,byline:a.authors.length>2?`${a.authors[0].split(" ").slice(-1)[0]} et al.`:a.authors.join(", "),year:j(a.date),date:a.date,venue:a.venue,ref:a.arxiv,topic:n(a.category,a.categoryTr),tags:n(a.tags,a.tagsTr)||[],readOn:n(a.readOn,a.readOnTr),summary:n(a.summary,a.summaryTr),notes:a.notes||[],board:a.board||null,url:a.url,pdf:a.pdf,accent:a.accent,spine:k(a.slug,I,a.title)}))),s=t("blogItems"),o=t("blogPosts")||{},c=v((Array.isArray(s)?s:[]).filter(a=>a.slug&&o[a.slug]).map(a=>{const l=o[a.slug];return{id:`write-${a.slug}`,collection:"written",slug:a.slug,title:l.title||a.title,short:w(l.title||a.title,34),authors:["Görkem Ergüne"],byline:"G. Ergüne",year:j(l.date||a.date),date:l.date||a.date,topic:l.category||a.category,readTime:l.readTime||a.readTime,summary:l.description||a.excerpt,body:Array.isArray(l.body)?l.body:[],accent:"#F59E0B",spine:k(a.slug,M,l.title||a.title)}}));return{read:i,written:c}}function Y({book:t,onOpen:r,offset:n=0}){const{t:i}=m(),{thickness:s,length:o,tone:c}=t.spine;return e.jsxs("button",{type:"button",className:`bk-book ${t.collection}`,style:{"--bk-th":`${s}px`,"--bk-len":`${o}%`,"--bk-tone":c,"--bk-acc":t.accent,"--bk-off":`${n}px`},onClick:()=>r(t.id),"aria-label":`${t.title} — ${t.byline}${t.date?`, ${t.date}`:""}. ${i("bkOpen")}`,children:[e.jsx("span",{className:"bk-edge","aria-hidden":"true"}),e.jsx("span",{className:"bk-title","aria-hidden":"true",children:t.title}),e.jsx("span",{className:"bk-year","aria-hidden":"true",children:t.date||t.year}),e.jsxs("span",{className:"bk-tip","aria-hidden":"true",children:[e.jsx("span",{className:"bk-tip-t",children:t.title}),e.jsxs("span",{className:"bk-tip-m",children:[t.byline,t.date?` · ${t.date}`:"",t.topic?` · ${t.topic}`:""]})]})]})}function q({text:t}){return e.jsxs("span",{className:"bk-empty",role:"note",children:[e.jsx(O,{size:16,strokeWidth:1.5,"aria-hidden":"true"}),t]})}const H=5,N=1,G=3,z=(t,r)=>Array.from({length:Math.ceil(t.length/r)},(n,i)=>t.slice(i*r,(i+1)*r)),T=[[22,84,"#1a1d23"],[18,72,"#1d1a16"],[26,90,"#171b20"],[20,78,"#1c1915"],[24,68,"#181b21"],[16,86,"#1b1814"]];function S({seed:t,count:r,side:n}){return e.jsx("span",{className:`bk-stack bk-deco${n?" side":""}`,"aria-hidden":"true",children:Array.from({length:r},(i,s)=>{const[o,c,a]=T[(t*2+s)%T.length];return e.jsx("span",{style:{height:o,width:`${c}%`,background:`linear-gradient(180deg, ${a}, #0d0f12)`}},s)})})}function U({children:t,label:r}){return e.jsxs("div",{className:"bk-shelf",children:[e.jsx("div",{className:"bk-row",children:t}),e.jsx("div",{className:"bk-plank","aria-hidden":"true",children:r&&e.jsx("span",{children:r})})]})}function $({id:t,kicker:r,title:n,sub:i,books:s,emptyText:o,onOpen:c,side:a}){const l=z(s,H),x=z(l,N);for(;x.length<G;)x.push([]);const b=a==="right"?3:0;return e.jsxs("section",{className:`bk-case ${a}`,"aria-labelledby":`${t}-title`,children:[e.jsxs("header",{className:"bk-head",children:[e.jsxs("span",{className:"bk-kicker",children:[r," · ",String(s.length).padStart(2,"0")]}),e.jsx("h2",{id:`${t}-title`,children:n}),e.jsx("p",{children:i})]}),e.jsxs("div",{className:"bk-frame",children:[e.jsx("span",{className:"bk-crown","aria-hidden":"true"}),x.map((d,p)=>e.jsxs(U,{label:String(p+1).padStart(2,"0"),children:[s.length===0&&p===0&&e.jsx(q,{text:o}),d.map((g,h)=>e.jsx("ol",{className:"bk-stack","aria-label":`${n} — ${p*N+h+1}`,children:g.map((u,E)=>e.jsx("li",{children:e.jsx(Y,{book:u,onOpen:c,offset:(E*7+h*3)%13})},u.id))},h)),d.length>0?e.jsx(S,{seed:b+p,count:3,side:!0}):e.jsx(S,{seed:b+p,count:2+p%3})]},p))]})]})}function V({book:t,onClose:r}){const{t:n}=m(),i=f.useRef(null),s=f.useRef(null),o=t.collection==="read";f.useEffect(()=>{var x;(x=s.current)==null||x.focus();const a=document.body.style.overflow;document.body.style.overflow="hidden";const l=b=>{if(b.key==="Escape"){b.preventDefault(),r();return}if(b.key!=="Tab"||!i.current)return;const d=i.current.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]');if(!d.length)return;const p=d[0],g=d[d.length-1];b.shiftKey&&document.activeElement===p?(b.preventDefault(),g.focus()):!b.shiftKey&&document.activeElement===g&&(b.preventDefault(),p.focus())};return window.addEventListener("keydown",l),()=>{window.removeEventListener("keydown",l),document.body.style.overflow=a}},[r]);const c=o?[t.venue,t.date,t.ref,t.readOn&&`${n("articlesReadOn")} ${t.readOn}`].filter(Boolean):[t.date,t.topic,t.readTime&&`${t.readTime} ${n("bkReadTime")}`].filter(Boolean);return e.jsxs("div",{className:"br-back",onMouseDown:a=>{a.target===a.currentTarget&&r()},children:[e.jsx("style",{children:`
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
        .br-board { margin-top: 30px; }
        .br-board .art-row { display: grid; grid-template-columns: 130px repeat(var(--art-cols, 3), minmax(80px, 1fr)); gap: 12px; align-items: baseline; padding: 12px 0; border-top: 1px solid #2a251b; }
        .br-board .art-row-head { border-top: none; padding-bottom: 6px; }
        .br-board .art-cell-label { display: none; }
        .br-board .ch { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7d64; line-height: 1.4; }
        .br-board .mn { font-family: var(--font-mono); font-size: 12px; color: #e7c27a; }
        .br-board .sc { font-family: var(--font-mono); font-size: 12.5px; color: #e3dccd; font-variant-numeric: tabular-nums; }
        .br-board .vd { grid-column: 1 / -1; font-family: var(--font-body); font-size: 13.5px; line-height: 1.6; color: #b8ad98; }
        .br-board .cap { font-family: var(--font-body); font-size: 12.5px; line-height: 1.6; color: #8a7d64; margin-top: 12px; font-style: italic; }
        @media (prefers-reduced-motion: reduce) { .br-back, .br-book, .br-right { animation: none; } }
        @media (max-width: 860px) {
          .br-back { padding: 0; align-items: stretch; }
          .br-book { height: auto; max-height: none; grid-template-columns: 1fr; overflow-y: auto; perspective: none; filter: none; }
          .br-book::after { display: none; }
          .br-page { overflow: visible; padding: 28px 20px; border-radius: 0 !important; box-shadow: none; border-left: none; border-right: none; }
          .br-left { padding-top: 64px; }
          .br-right { animation: none; border-top: none; }
          .br-close { position: fixed; right: 12px; top: 12px; }
          .br-board .art-row-head { display: none; }
          .br-board .art-row { grid-template-columns: 1fr; gap: 6px; }
          .br-board .art-cell { display: flex; justify-content: space-between; gap: 12px; }
          .br-board .art-cell-label { display: inline; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7d64; }
        }
      `}),e.jsxs("div",{ref:i,className:"br-book",role:"dialog","aria-modal":"true","aria-labelledby":"br-title",children:[e.jsx("button",{ref:s,type:"button",className:"icon-btn br-close",onClick:r,"aria-label":n("bkClose"),children:e.jsx(R,{size:16,strokeWidth:1.6})}),e.jsxs("article",{className:"br-page br-left",tabIndex:0,children:[e.jsxs("div",{className:"br-kick",children:[n(o?"bkReadTitle":"bkWriteTitle"),t.topic?` · ${t.topic}`:""]}),e.jsx("h2",{id:"br-title",children:t.title}),e.jsx("p",{className:"br-authors",children:t.authors.join(" · ")}),c.length>0&&e.jsx("div",{className:"br-meta",children:c.map(a=>e.jsx("span",{children:a},a))}),e.jsx("div",{className:"br-rule"}),t.summary&&e.jsx("p",{className:"br-sum",children:t.summary}),t.tags&&t.tags.length>0&&e.jsx("div",{className:"br-tags",children:t.tags.map(a=>e.jsx("span",{children:a},a))}),e.jsxs("div",{className:"br-actions",children:[t.url&&e.jsxs("a",{className:"btn btn-primary",href:t.url,target:"_blank",rel:"noopener noreferrer",children:[n("bkReadOriginal")," ",e.jsx(B,{size:14,strokeWidth:1.6})]}),t.pdf&&e.jsxs("a",{className:"btn btn-secondary",href:t.pdf,download:!0,children:[n("articlesAnnotated")," ",e.jsx(L,{size:14,strokeWidth:1.6})]})]})]}),e.jsx("article",{className:"br-page br-right",tabIndex:0,"aria-label":n(o?"articlesNotesKicker":"bkTheText"),children:o?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"br-h",children:n("articlesNotesKicker")}),t.notes.map(a=>e.jsx(Z,{note:a},a.heading)),t.board&&e.jsx(J,{board:t.board})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"br-h",children:n("bkTheText")}),e.jsx("div",{className:"br-body",children:t.body.map((a,l)=>e.jsx("p",{children:a},l))})]})})]})]})}function Z({note:t}){const{lang:r}=m(),n=(i,s)=>r==="tr"&&s?s:i;return e.jsxs("section",{className:"br-note",children:[e.jsx("h3",{children:n(t.heading,t.headingTr)}),e.jsx("ul",{children:n(t.points,t.pointsTr).map(i=>e.jsx("li",{children:i},i))})]})}function J({board:t}){const{lang:r,t:n}=m(),i=(o,c)=>r==="tr"&&c?c:o,s=i(t.columns,t.columnsTr);return e.jsxs("section",{className:"br-note br-board",style:{"--art-cols":s.length},children:[e.jsx("h3",{children:n("articlesBoardTitle")}),e.jsxs("div",{className:"art-row art-row-head",children:[e.jsx("span",{className:"ch",children:"Model"}),s.map(o=>e.jsx("span",{className:"ch",children:o},o))]}),t.rows.map(o=>e.jsxs("div",{className:"art-row",children:[e.jsx("span",{className:"mn",children:o.name}),o.scores.map((c,a)=>e.jsxs("span",{className:"art-cell",children:[e.jsx("span",{className:"art-cell-label",children:s[a]}),e.jsx("span",{className:"sc",children:c})]},a)),e.jsx("p",{className:"vd",children:i(o.verdict,o.verdictTr)})]},o.name)),e.jsx("p",{className:"cap",children:i(t.caption,t.captionTr)})]})}function te(){const{lang:t,t:r}=m(),{read:n,written:i}=f.useMemo(()=>X(r,t),[r,t]),[s,o]=C(),c=s.get("book"),a=c?[...n,...i].find(d=>d.id===c):null,l=f.useRef(null);K({title:r("articlesLabel"),description:r("articlesSub"),path:"/articles"});const x=d=>{l.current=document.activeElement,o({book:d})},b=f.useCallback(()=>{o({}),requestAnimationFrame(()=>{var d,p;return(p=(d=l.current)==null?void 0:d.focus)==null?void 0:p.call(d)})},[o]);return f.useEffect(()=>{c&&!a&&o({},{replace:!0})},[c,a,o]),e.jsxs("div",{className:"kl",children:[e.jsx("style",{children:Q}),e.jsxs("div",{className:"ds-wrap kl-wrap",children:[e.jsxs(W,{to:"/",className:"link-hover kl-back",children:[e.jsx(_,{size:16,strokeWidth:1.5})," ",r("articlesBack")]}),e.jsxs("header",{className:"kl-head",children:[e.jsxs("div",{children:[e.jsx("div",{className:"ds-kicker",children:r("articlesBadge")}),e.jsx("h1",{children:e.jsx(F,{text:r("articlesLabel")})})]}),e.jsx("p",{children:r("articlesSub")})]}),e.jsxs("div",{className:"kl-room",children:[e.jsx($,{id:"bk-read",side:"left",kicker:r("bkReadKicker"),title:r("bkReadTitle"),sub:r("bkReadSub"),books:n,emptyText:r("bkReadEmpty"),onOpen:x}),e.jsx($,{id:"bk-write",side:"right",kicker:r("bkWriteKicker"),title:r("bkWriteTitle"),sub:r("bkWriteSub"),books:i,emptyText:r("bkWriteEmpty"),onOpen:x})]})]}),a&&e.jsx(V,{book:a,onClose:b})]})}const Q=`
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
`;export{te as default};
