import{u as c,k as x,j as e,L as m,f as h,G as g,A as b}from"./index-Ba8y5e9c.js";import{A as f}from"./arrow-left-D8Am7ypV.js";const o=[[456,860],[744,700],[480,540],[624,400]],p="M360 1000 C 420 950, 330 900, 456 860 S 780 770, 744 700 S 400 610, 480 540 S 650 450, 624 400",u="M624 400 S 560 330, 576 280";function k(){const{t}=c(),l=t("learningItems");x({title:t("learningLabel"),description:t("learningSub"),path:"/learning-path"});const i=Array.isArray(l)?l:[],s=a=>a.status==="completed"?t("learningCompleted"):a.status==="upcoming"?t("learningUpcoming"):t("learningStatus");return e.jsxs("div",{className:"lp",children:[e.jsx("style",{children:`
        .lp-forest { position: relative; margin-top: calc(-1 * var(--nav-h)); height: clamp(860px, 112vh, 1080px); overflow: hidden; background: #07080a; isolation: isolate; border-bottom: 1px solid var(--c-line); }
        .lp-forest picture, .lp-forest picture img { position: absolute; inset: 0; width: 100%; height: 100%; }
        .lp-forest picture img { object-fit: cover; object-position: 44% 40%; }
        .lp-shade { position: absolute; inset: 0; z-index: 0; pointer-events: none; background:
          linear-gradient(180deg, rgba(10,12,16,0.92) 0%, rgba(10,12,16,0.55) 22%, rgba(10,12,16,0.1) 42%, rgba(10,12,16,0.25) 70%, rgba(10,12,16,0.95) 100%),
          radial-gradient(120% 90% at 50% 45%, rgba(10,12,16,0) 40%, rgba(10,12,16,0.65) 100%); }
        .lp-head { position: relative; z-index: 2; padding-top: calc(var(--nav-h) + 40px); }
        .lp-head h1 { font-family: var(--font-display); font-weight: 400; font-size: clamp(44px, 5.4vw, 80px); line-height: 1; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 22px; }
        .lp-head p { font-family: var(--font-body); font-size: 17px; line-height: 1.65; color: #c9cfd8; max-width: 520px; margin-top: 18px; }
        .lp-trail { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
        .lp-trail path { fill: none; vector-effect: non-scaling-stroke; }
        .lp-stop { position: absolute; z-index: 2; transform: translate(-50%, -50%); }
        .lp-dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--c-ink); background: #0a0c10; box-shadow: 0 0 0 6px rgba(10,12,16,0.45); }
        .completed > .lp-dot { background: var(--c-ink); }
        .in-progress > .lp-dot { border-color: var(--c-primary); background: var(--c-primary); box-shadow: 0 0 0 6px rgba(0,240,255,0.16); }
        .upcoming > .lp-dot { border-style: dashed; opacity: 0.85; }
        .lp-card { position: absolute; top: 50%; width: 290px; transform: translateY(-50%); padding: 16px 18px; background: rgba(10,12,16,0.72); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08); }
        .lp-stop.right .lp-card { left: 30px; }
        .lp-stop.left .lp-card { right: 30px; }
        .lp-card .n { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.16em; color: var(--c-meta); }
        .lp-card h2 { font-family: var(--font-display); font-weight: 500; font-size: 20px; letter-spacing: -0.01em; color: var(--c-ink); margin-top: 8px; }
        .lp-card .f { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.08em; color: #aab2bf; margin-top: 6px; }
        .lp-card .row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 12px; }
        .upcoming > .lp-card { opacity: 0.85; }

        .lp-notes { padding-top: 88px; padding-bottom: 120px; }
        .lp-notes-grid { list-style: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: 1px solid var(--c-line); border-left: 1px solid var(--c-line); margin-top: 40px; }
        .lp-notes-grid > li { border-right: 1px solid var(--c-line); border-bottom: 1px solid var(--c-line); padding: 28px; }
        .lp-notes-grid h3 { font-family: var(--font-display); font-weight: 500; font-size: 20px; color: var(--c-ink); margin-top: 10px; }
        .lp-notes-grid p { font-family: var(--font-body); font-size: 14.5px; line-height: 1.65; color: var(--c-body); margin-top: 10px; }
        .lp-topics { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }

        .lp-mobile { display: none; }
        @media (max-width: 900px) {
          .lp-forest { height: auto; min-height: 0; padding-bottom: 48px; }
          .lp-forest picture img { object-position: 40% 40%; }
          .lp-shade { background: linear-gradient(180deg, rgba(10,12,16,0.9) 0%, rgba(10,12,16,0.45) 30%, rgba(10,12,16,0.55) 60%, rgba(10,12,16,0.96) 100%); }
          .lp-trail, .lp-stop { display: none; }
          .lp-mobile { display: block; position: relative; z-index: 2; list-style: none; margin-top: 260px; padding-left: calc(var(--ds-gutter) + 28px); }
          .lp-mobile::before { content: ''; position: absolute; top: 18px; bottom: 18px; left: calc(var(--ds-gutter) + 6px); border-left: 2px dashed rgba(238,240,244,0.45); }
          .lp-mobile li { position: relative; padding-bottom: 22px; }
          .lp-mobile li:last-child { padding-bottom: 0; }
          .lp-mobile .lp-dot { position: absolute; left: -28px; top: 18px; }
          .lp-mobile .lp-card { position: static; transform: none; width: auto; }
          .lp-notes-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) { .lp-notes-grid > li { padding: 22px 18px; } .lp-mobile { margin-top: 200px; } }
      `}),e.jsxs("section",{className:"lp-forest","aria-labelledby":"lp-title",children:[e.jsxs("picture",{"aria-hidden":"true",children:[e.jsx("source",{srcSet:"/media/forest-trail-1280.webp 1280w, /media/forest-trail-2400.webp 2400w",sizes:"100vw",type:"image/webp"}),e.jsx("img",{src:"/media/forest-trail-1280.jpg",alt:""})]}),e.jsx("div",{className:"lp-shade"}),e.jsxs("svg",{className:"lp-trail",viewBox:"0 0 1200 1000",preserveAspectRatio:"none","aria-hidden":"true",children:[e.jsx("path",{d:p,stroke:"rgba(10,12,16,0.55)",strokeWidth:"7"}),e.jsx("path",{d:p,stroke:"rgba(238,240,244,0.85)",strokeWidth:"2",strokeDasharray:"2 9",strokeLinecap:"round"}),e.jsx("path",{d:u,stroke:"rgba(238,240,244,0.45)",strokeWidth:"2",strokeDasharray:"1 10",strokeLinecap:"round"})]}),e.jsxs("div",{className:"ds-wrap lp-head",children:[e.jsxs(m,{to:"/",className:"link-hover",style:v.back,children:[e.jsx(f,{size:16,strokeWidth:1.5})," ",t("learningBack")]}),e.jsx("div",{className:"ds-kicker",style:{marginTop:28},children:t("learningBadge")}),e.jsx("h1",{id:"lp-title",children:t("learningLabel")}),e.jsx("p",{children:t("learningSub")})]}),i.slice(0,o.length).map((a,r)=>e.jsxs("div",{className:`lp-stop ${a.status} ${r%2?"right":"left"}`,style:{left:`${o[r][0]/1200*100}%`,top:`${o[r][1]/1e3*100}%`},children:[e.jsx("div",{className:"lp-dot"}),e.jsx(d,{it:a,i:r,total:i.length,status:s(a)})]},a.title)),e.jsx("ol",{className:"ds-wrap lp-mobile",children:i.map((a,r)=>e.jsxs("li",{className:a.status,children:[e.jsx("span",{className:"lp-dot"}),e.jsx(d,{it:a,i:r,total:i.length,status:s(a)})]},a.title))})]}),e.jsxs("section",{className:"ds-wrap lp-notes","aria-labelledby":"lp-notes",children:[e.jsx("div",{className:"ds-kicker",children:t("learningNotesKicker")}),e.jsx("h2",{id:"lp-notes",className:"ds-h2",children:e.jsx(h,{text:t("learningNotesTitle")})}),e.jsx("ol",{className:"lp-notes-grid",children:i.map((a,r)=>e.jsxs("li",{children:[e.jsxs("div",{className:"ds-meta",children:[String(r+1).padStart(2,"0")," · ",a.field," · ",s(a)]}),e.jsx("h3",{children:a.title}),a.abstract&&e.jsx("p",{children:a.abstract}),Array.isArray(a.topics)&&a.topics.length>0&&e.jsx("div",{className:"lp-topics","aria-label":t("learningTopics"),children:a.topics.map(n=>e.jsx("span",{className:"label",children:n},n))}),a.repo&&e.jsxs("a",{href:a.repo,target:"_blank",rel:"noopener noreferrer",className:"ds-link",style:{marginTop:20},children:[e.jsx(g,{size:13,strokeWidth:1.5})," ",t("learningRepo")," ",e.jsx(b,{size:12,strokeWidth:1.5})]})]},a.title))})]})]})}function d({it:t,i:l,total:i,status:s}){const{t:a}=c();return e.jsxs("div",{className:"lp-card",children:[e.jsxs("div",{className:"n",children:[String(l+1).padStart(2,"0")," / ",String(i).padStart(2,"0")]}),e.jsx("h2",{children:t.title}),e.jsx("div",{className:"f",children:t.field}),e.jsxs("div",{className:"row",children:[e.jsx("span",{className:"label",style:t.status==="in-progress"?{color:"var(--c-primary)",borderColor:"rgba(0,240,255,0.4)"}:void 0,children:s}),t.repo&&e.jsxs("a",{href:t.repo,target:"_blank",rel:"noopener noreferrer",className:"ds-meta",style:{color:"#c6cdd8",display:"inline-flex",gap:5,alignItems:"center"},"aria-label":`${t.title} — ${a("learningRepo")}`,children:[e.jsx(g,{size:12,strokeWidth:1.5})," repo"]})]})]})}const v={back:{display:"flex",width:"fit-content",alignItems:"center",gap:8,fontFamily:"var(--font-mono)",fontSize:12,letterSpacing:"0.06em",color:"#aab2bf",cursor:"pointer"}};export{k as default};
