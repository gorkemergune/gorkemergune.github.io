import{c as y,u as o,l as w,j as e,L as f,A as N,i as k,s as l,f as z,e as d,E as S,W,N as L,r as $,b as E}from"./index-CVdzEOIy.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=y("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]),T={};function I(){const{lang:a}=o();return i=>{const[n,r]=i.split("-").map(Number);return new Date(n,r-1,1).toLocaleDateString(a==="tr"?"tr-TR":"en-US",{month:"short",year:"numeric"})}}function v({e:a,alt:i}){if(a.confidential)return e.jsx("span",{className:"xp-plate conf","aria-hidden":"true",children:e.jsx(b,{size:18,strokeWidth:1.5})});const n=T[a.icon];return e.jsx("span",{className:`xp-plate${a.logoLight?" light":""}`,title:i,children:a.logo?e.jsx("img",{src:a.logo,alt:`${i} logo`,loading:"lazy",decoding:"async"}):n?e.jsx(n,{size:20,strokeWidth:1.4,"aria-hidden":"true"}):null})}function u({e:a}){const{t:i}=o(),n=I(),r=a.end&&a.end===a.start;return e.jsxs("span",{className:"xp-dates",children:[n(a.start),!r&&e.jsxs(e.Fragment,{children:[" – ",a.end?n(a.end):i("xpPresent"),a.endExpected?` (${i("xpExpected")})`:""]})]})}function A({e:a}){const{lang:i,t:n}=o(),[r,p]=$.useState(!1),t=s=>i==="tr"&&a[`${s}Tr`]||a[s],x=t("points")||[],c=t("tags")||[],m=r?x:x.slice(0,2),j=a.confidential?n("xpConfidential"):t("org"),g=[t("type"),t("mode")].filter(Boolean).join(" · "),h=!a.end;return e.jsxs("li",{className:`xp-item${h?" ongoing":""}`,children:[e.jsx("span",{className:"xp-node","aria-hidden":"true"}),e.jsxs("article",{className:"xp-card",children:[e.jsx(v,{e:a,alt:a.orgShort||t("org")}),e.jsxs("div",{className:"xp-main",children:[e.jsxs("div",{className:"xp-top",children:[e.jsxs("div",{style:{minWidth:0},children:[e.jsx("h3",{className:"xp-role",children:t("role")}),e.jsxs("div",{className:"xp-org",children:[j,a.url&&!a.confidential&&e.jsx("a",{href:a.url,target:"_blank",rel:"noopener noreferrer",className:"xp-ext","aria-label":`${a.orgShort||a.org} — ${n("xpWebsite")}`,children:e.jsx(d,{size:13,strokeWidth:1.6})})]})]}),e.jsxs("div",{className:"xp-when",children:[e.jsx(u,{e:a}),h&&e.jsx("span",{className:"label label-primary",children:n("xpCurrent")})]})]}),g&&e.jsx("div",{className:"ds-meta xp-meta",children:g}),e.jsx("p",{className:"xp-sum",children:t("summary")}),m.length>0&&e.jsx("ul",{className:"xp-points",children:m.map(s=>e.jsx("li",{children:s},s))}),x.length>2&&e.jsx("button",{type:"button",className:"xp-more",onClick:()=>p(s=>!s),"aria-expanded":r,children:r?n("xpShowLess"):`${n("xpShowAll")} · ${x.length}`}),a.confidential&&t("note")&&e.jsxs("p",{className:"xp-note",children:[e.jsx(b,{size:11,strokeWidth:1.8})," ",t("note")]}),c.length>0&&e.jsx("div",{className:"xp-tags",children:c.map(s=>e.jsx("span",{className:"label",children:s},s))})]})]})]})}function R({e:a}){const{lang:i,t:n}=o(),r=t=>i==="tr"&&a[`${t}Tr`]||a[t],p=a.status==="completed";return e.jsxs("li",{className:`xp-item${p?"":" ongoing"}`,children:[e.jsx("span",{className:"xp-node","aria-hidden":"true"}),e.jsxs("article",{className:"xp-card",children:[e.jsx(v,{e:a,alt:r("org")}),e.jsxs("div",{className:"xp-main",children:[e.jsxs("div",{className:"xp-top",children:[e.jsxs("div",{style:{minWidth:0},children:[e.jsx("h3",{className:"xp-role",children:r("title")}),e.jsxs("div",{className:"xp-org",children:[r("org"),a.url&&e.jsx("a",{href:a.url,target:"_blank",rel:"noopener noreferrer",className:"xp-ext","aria-label":`${r("org")} — ${n("xpWebsite")}`,children:e.jsx(d,{size:13,strokeWidth:1.6})})]})]}),e.jsxs("div",{className:"xp-when",children:[e.jsx(u,{e:a}),e.jsx("span",{className:`label${p?"":" label-primary"}`,children:n(p?"xpCompleted":"xpInProgress")})]})]}),e.jsx("p",{className:"xp-sum",children:r("detail")})]})]})]})}function C({c:a}){const{lang:i}=o(),n=r=>i==="tr"&&a[`${r}Tr`]||a[r];return e.jsxs(f,{to:a.to,className:`xp-nav${a.image?"":" placeholder"}`,children:[a.image&&e.jsx("img",{src:a.image,alt:"",loading:"lazy",decoding:"async"}),e.jsx("span",{className:"xp-nav-shade","aria-hidden":"true"}),e.jsxs("span",{className:"xp-nav-body",children:[e.jsx("span",{className:"xp-nav-label",children:n("label")}),e.jsx("span",{className:"xp-nav-title",children:n("title")}),e.jsx("span",{className:"xp-nav-text",children:n("text")})]}),e.jsx("span",{className:"xp-nav-arrow","aria-hidden":"true",children:e.jsx(E,{size:18,strokeWidth:1.5})})]})}function D(){const{t:a}=o();return w({title:a("xpKicker"),description:a("xpSub"),path:"/experience"}),e.jsxs("div",{className:"xp",children:[e.jsx("style",{children:`
        .xp-banner { position: relative; margin-top: calc(-1 * var(--nav-h)); height: clamp(420px, 36vw, 560px); overflow: hidden; background: #07080b; isolation: isolate; border-bottom: 1px solid var(--c-line); }
        .xp-banner picture, .xp-banner picture img { position: absolute; inset: 0; width: 100%; height: 100%; }
        .xp-banner picture img { object-fit: cover; object-position: 62% 40%; }
        .xp-banner::after { content: ''; position: absolute; inset: 0; background:
          linear-gradient(90deg, rgba(10,12,16,0.94) 0%, rgba(10,12,16,0.78) 30%, rgba(10,12,16,0.2) 56%, rgba(10,12,16,0) 75%),
          linear-gradient(180deg, rgba(10,12,16,0.5) 0%, rgba(10,12,16,0) 26%, rgba(10,12,16,0) 70%, rgba(10,12,16,0.85) 100%); }
        .xp-banner-inner { position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 104px; padding-top: calc(var(--nav-h) + 24px); }
        .xp-banner h1 { font-family: var(--font-display); font-weight: 500; font-size: clamp(44px, 5.4vw, 80px); line-height: 0.98; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 18px; }
        .xp-banner h1 .dim { color: var(--c-secondary); }
        .xp-banner p { font-family: var(--font-body); font-size: 17px; line-height: 1.6; color: #c9cfd8; max-width: 520px; margin-top: 18px; }

        .xp-profile { position: relative; z-index: 3; display: flex; align-items: flex-end; gap: 28px; margin-top: -72px; padding-bottom: 40px; border-bottom: 1px solid var(--c-line); }
        .xp-photo { width: 152px; flex: none; aspect-ratio: 4 / 5; border: 1px solid rgba(255,255,255,0.12); background: #111419; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.45); }
        .xp-photo img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; display: block; }
        .xp-photo .mono { display: flex; align-items: center; justify-content: center; height: 100%; font-family: var(--font-display); font-size: 44px; color: #3a414e; }
        .xp-who { padding-bottom: 6px; }
        .xp-who .name { font-family: var(--font-display); font-weight: 500; font-size: 26px; letter-spacing: -0.01em; color: var(--c-ink); }
        .xp-who .role { font-family: var(--font-body); font-size: 15.5px; color: #d3d8e0; margin-top: 4px; }
        .xp-who .student { font-size: 14px; color: var(--c-meta); }
        .xp-who .sep { margin: 0 4px; }
        .xp-who .ds-link { margin-top: 14px; }

        .xp-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 3fr); gap: 56px; padding-top: 56px; padding-bottom: 120px; align-items: start; }
        .xp-sec + .xp-sec { margin-top: 64px; }
        .xp-sec-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 26px; }
        .xp-sec-head h2 { font-family: var(--font-display); font-weight: 400; font-size: 28px; letter-spacing: -0.015em; color: var(--c-ink); }

        .xp-tl { list-style: none; position: relative; padding-left: 30px; }
        .xp-tl::before { content: ''; position: absolute; left: 6px; top: 10px; bottom: 10px; width: 1px; background: linear-gradient(180deg, rgba(0,240,255,0.55), rgba(0,240,255,0.12)); }
        .xp-item { position: relative; }
        .xp-item + .xp-item { margin-top: 16px; }
        .xp-node { position: absolute; left: -30px; top: 26px; width: 13px; height: 13px; border-radius: 50%; border: 1px solid #5c6370; background: var(--c-bg); }
        .xp-item.ongoing .xp-node { border-color: var(--c-primary); background: var(--c-primary); box-shadow: 0 0 0 4px rgba(0,240,255,0.12); }
        .xp-card { display: grid; grid-template-columns: 88px minmax(0, 1fr); gap: 20px; padding: 20px 22px; border: 1px solid var(--c-line); background: rgba(17,20,25,0.7); transition: border-color 0.3s; }
        .xp-card:hover { border-color: var(--c-line-strong); }
        .xp-item.ongoing .xp-card { border-left: 2px solid rgba(0,240,255,0.55); }
        .xp-item:not(.ongoing) .xp-role { color: #d3d8e0; }
        .xp-plate { width: 88px; height: 56px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--c-line); background: #0f1117; color: #8a919d; overflow: hidden; }
        .xp-plate img { max-width: 76px; max-height: 38px; object-fit: contain; }
        .xp-plate.light { background: #f2f4f7; border-color: #f2f4f7; }
        .xp-plate.conf { color: var(--c-tertiary); border-style: dashed; }
        .xp-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; }
        .xp-role { font-family: var(--font-display); font-weight: 500; font-size: 19px; line-height: 1.25; color: var(--c-ink); }
        .xp-org { display: flex; align-items: center; gap: 6px; font-family: var(--font-body); font-size: 14.5px; color: #c3c9d4; margin-top: 3px; }
        .xp-ext { display: inline-flex; color: var(--c-meta); transition: color 0.3s; }
        .xp-ext:hover { color: var(--c-primary); }
        .xp-when { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex: none; }
        .xp-dates { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; color: #aab2bf; white-space: nowrap; }
        .xp-meta { margin-top: 8px; }
        .xp-sum { font-family: var(--font-body); font-size: 14.5px; line-height: 1.6; color: var(--c-body); margin-top: 10px; }
        .xp-points { margin: 10px 0 0 16px; }
        .xp-points li { font-family: var(--font-body); font-size: 13.5px; line-height: 1.55; color: #9aa1ad; margin-top: 5px; }
        .xp-more { margin-top: 10px; background: none; border: none; padding: 0; cursor: pointer; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #c6cdd8; border-bottom: 1px solid rgba(0,240,255,0.4); }
        .xp-more:hover { color: var(--c-primary); }
        .xp-note { display: flex; gap: 8px; align-items: baseline; margin-top: 12px; padding: 8px 12px; border-left: 2px solid var(--c-tertiary); background: rgba(245,158,11,0.06); font-family: var(--font-body); font-size: 13px; line-height: 1.5; color: #d8c9a8; }
        .xp-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }

        .xp-aside { display: flex; flex-direction: column; gap: 16px; }
        .xp-aside .ds-meta { margin-bottom: 4px; }
        .xp-nav { position: relative; display: block; aspect-ratio: 16 / 9; overflow: hidden; border: 1px solid var(--c-line); color: inherit; isolation: isolate; }
        .xp-nav img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.2,0.8,0.2,1); }
        .xp-nav.placeholder { background:
          radial-gradient(120% 90% at 85% 10%, rgba(56,189,248,0.10), rgba(56,189,248,0) 60%),
          repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 14px),
          linear-gradient(160deg, #181c24, #0d0f14); }
        .xp-nav-shade { position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(10,12,16,0.05) 0%, rgba(10,12,16,0.35) 45%, rgba(10,12,16,0.92) 100%); }
        .xp-nav-body { position: absolute; z-index: 2; left: 20px; right: 72px; bottom: 18px; display: flex; flex-direction: column; gap: 6px; }
        .xp-nav-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--c-primary); }
        .xp-nav-title { font-family: var(--font-display); font-weight: 500; font-size: 21px; line-height: 1.15; color: var(--c-ink); }
        .xp-nav-text { font-family: var(--font-body); font-size: 13px; line-height: 1.45; color: #c3c9d4; }
        .xp-nav-arrow { position: absolute; z-index: 2; right: 18px; bottom: 18px; width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(0,240,255,0.6); display: flex; align-items: center; justify-content: center; color: var(--c-primary); transition: background 0.3s, color 0.3s, transform 0.35s cubic-bezier(0.2,0.8,0.2,1); }
        .xp-nav:hover img { transform: scale(1.04); }
        .xp-nav:hover .xp-nav-arrow, .xp-nav:focus-visible .xp-nav-arrow { background: var(--c-primary); color: var(--c-on-primary); transform: translateX(3px); }
        .xp-nav:hover { border-color: var(--c-line-strong); }

        @media (prefers-reduced-motion: reduce) { .xp-nav img, .xp-nav-arrow { transition: none; } }
        @media (max-width: 1100px) {
          .xp-grid { grid-template-columns: 1fr; gap: 64px; }
          .xp-aside { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .xp-aside .ds-meta { grid-column: 1 / -1; }
        }
        @media (max-width: 700px) {
          .xp-banner { height: auto; min-height: 460px; }
          .xp-banner picture img { object-position: 58% 40%; }
          .xp-banner::after { background: linear-gradient(180deg, rgba(10,12,16,0.55) 0%, rgba(10,12,16,0.35) 35%, rgba(10,12,16,0.92) 75%, rgba(10,12,16,0.97) 100%); }
          .xp-banner-inner { padding-top: calc(var(--nav-h) + 150px); padding-bottom: 96px; }
          .xp-profile { gap: 18px; margin-top: -64px; }
          .xp-photo { width: 112px; }
          .xp-who .name { font-size: 22px; }
          .xp-who .student { display: block; margin-top: 4px; }
          .xp-who .sep { display: none; }
          .xp-aside { grid-template-columns: 1fr; }
          .xp-tl { padding-left: 22px; }
          .xp-tl::before { left: 4px; }
          .xp-node { left: -22px; width: 11px; height: 11px; }
          .xp-card { grid-template-columns: 1fr; gap: 14px; padding: 18px 16px; }
          .xp-plate { width: 88px; height: 52px; }
          .xp-top { flex-direction: column; gap: 8px; }
          .xp-when { align-items: flex-start; flex-direction: row; flex-wrap: wrap; align-items: center; }
        }
      `}),e.jsxs("section",{className:"xp-banner","aria-labelledby":"xp-title",children:[e.jsxs("picture",{"aria-hidden":"true",children:[e.jsx("source",{srcSet:"/media/experience-hero-1280.webp 1280w, /media/experience-hero.webp 2125w",sizes:"(max-width: 700px) 250vw, 100vw",type:"image/webp"}),e.jsx("img",{src:"/media/experience-hero-1280.jpg",alt:""})]}),e.jsxs("div",{className:"ds-wrap xp-banner-inner",children:[e.jsxs(f,{to:"/",className:"link-hover",style:O.back,children:[e.jsx(N,{size:16,strokeWidth:1.5})," ",a("learningBack")]}),e.jsx("div",{className:"ds-kicker",style:{marginTop:24},children:a("xpKicker")}),e.jsx("h1",{id:"xp-title",children:e.jsx(k,{text:a("xpTitle")})}),e.jsx("p",{children:a("xpSub")})]})]}),e.jsxs("div",{className:"ds-wrap",children:[e.jsxs("div",{className:"xp-profile",children:[e.jsx("div",{className:"xp-photo",children:l?e.jsxs("picture",{children:[e.jsx("source",{srcSet:l.webp,type:"image/webp"}),e.jsx("img",{src:l.jpg,alt:a("xpPhotoAlt"),width:l.width,height:l.height})]}):e.jsx("span",{className:"mono","aria-hidden":"true",children:"GE"})}),e.jsxs("div",{className:"xp-who",children:[e.jsx("div",{className:"name",children:"Görkem Ergüne"}),e.jsxs("div",{className:"role",children:[a("xpRole")," ",e.jsxs("span",{className:"student",children:[e.jsx("span",{className:"sep","aria-hidden":"true",children:"·"})," ",a("xpStudent")]})]}),e.jsxs("a",{href:"https://www.linkedin.com/in/gorkemergune/",target:"_blank",rel:"noopener noreferrer",className:"ds-link",children:[e.jsx(z,{size:13,strokeWidth:1.5})," ",a("xpLinkedIn")," ",e.jsx(d,{size:12,strokeWidth:1.5})]})]})]}),e.jsxs("div",{className:"xp-grid",children:[e.jsxs("div",{children:[e.jsxs("section",{className:"xp-sec","aria-labelledby":"xp-edu",children:[e.jsxs("div",{className:"xp-sec-head",children:[e.jsx("span",{className:"ds-meta",children:"01"}),e.jsx("h2",{id:"xp-edu",children:a("xpEducation")})]}),e.jsx("ol",{className:"xp-tl",children:S.map(i=>e.jsx(R,{e:i},i.id))})]}),e.jsxs("section",{className:"xp-sec","aria-labelledby":"xp-work",children:[e.jsxs("div",{className:"xp-sec-head",children:[e.jsx("span",{className:"ds-meta",children:"02"}),e.jsx("h2",{id:"xp-work",children:a("xpWork")})]}),e.jsx("ol",{className:"xp-tl",children:W.map(i=>e.jsx(A,{e:i},i.id))})]})]}),e.jsxs("aside",{className:"xp-aside","aria-label":a("xpExplore"),children:[e.jsx("div",{className:"ds-meta",children:a("xpExplore")}),L.map(i=>e.jsx(C,{c:i},i.id))]})]})]})]})}const O={back:{display:"flex",width:"fit-content",alignItems:"center",gap:8,fontFamily:"var(--font-mono)",fontSize:12,letterSpacing:"0.06em",color:"#aab2bf",cursor:"pointer"}};export{D as default};
