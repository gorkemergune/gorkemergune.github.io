import{c as u,u as v,l as y,p as m,j as e,L as j,A as k,G as w,e as N}from"./index-CVdzEOIy.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=u("ListOrdered",[["path",{d:"M10 12h11",key:"6m4ad9"}],["path",{d:"M10 18h11",key:"11hvi2"}],["path",{d:"M10 6h11",key:"c7qv1k"}],["path",{d:"M4 10h2",key:"16xx2s"}],["path",{d:"M4 6h1v4",key:"cnovpq"}],["path",{d:"M6 18H4c0-1 2-2 2-3s-1-1.5-2-1",key:"m9a95d"}]]),b=a=>{var t;return((t=a.type)==null?void 0:t.en)==="Hackathon"};function $(){const{lang:a,t}=v(),p=r=>r&&typeof r=="object"?a==="tr"?r.tr:r.en:r;y({title:t("compLabel"),description:t("compSub"),path:"/competitions"});const s=m.filter(r=>!b(r)),l=m.filter(b),c=m.map(r=>Number((r.date.match(/\d{4}/)||[])[0])).filter(Boolean),i=c.length?`${Math.min(...c)}–${Math.max(...c)}`:"",[n,...d]=s;return e.jsxs("div",{className:"cp ds-wrap",children:[e.jsx("style",{children:`
        .cp { padding-top: 60px; padding-bottom: 120px; }
        .cp-back { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: #8a919d; }
        .cp-back:hover { color: var(--c-ink); }
        .cp-head { margin-top: 44px; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 24px 48px; }
        .cp-head h1 { font-family: var(--font-display); font-weight: 400; font-size: clamp(44px, 6vw, 80px); line-height: 0.98; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 18px; }
        .cp-head p { font-family: var(--font-body); font-size: 17px; line-height: 1.6; color: var(--c-body); max-width: 560px; margin-top: 16px; }
        .cp-record { display: flex; border: 1px solid var(--c-line); background: rgba(17,20,25,0.7); }
        .cp-record div { padding: 14px 20px; border-right: 1px solid var(--c-line); }
        .cp-record div:last-child { border-right: none; }
        .cp-record b { display: block; font-family: var(--font-display); font-weight: 500; font-size: 26px; color: var(--c-ink); font-variant-numeric: tabular-nums; line-height: 1; }
        .cp-record span { display: block; margin-top: 6px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-meta); white-space: nowrap; }

        .cp-group { margin-top: 72px; }
        .cp-glabel { display: flex; align-items: center; gap: 14px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #aab2bf; margin-bottom: 20px; }
        .cp-glabel::before { content: ''; width: 18px; height: 2px; background: var(--c-tertiary); }
        .cp-glabel::after { content: ''; flex: 1; height: 1px; background: var(--c-line); }
        .cp-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }

        .cp-plate { position: relative; display: flex; flex-direction: column; min-width: 0; padding: 22px 22px 18px; background: linear-gradient(180deg, #12151b, #0c0e12); border: 1px solid var(--c-line); transition: border-color 0.3s; }
        .cp-plate::before { content: ''; position: absolute; left: -1px; right: -1px; top: -1px; height: 2px; background: linear-gradient(90deg, var(--acc), transparent 75%); opacity: 0.7; }
        .cp-plate::after { content: ''; position: absolute; right: 8px; bottom: 8px; width: 10px; height: 10px; border-right: 1px solid #2c313c; border-bottom: 1px solid #2c313c; }
        .cp-plate:hover, .cp-plate:focus-within { border-color: #2c313c; }
        .cp-top { display: flex; align-items: center; gap: 14px; }
        .cp-emb { width: 44px; height: 44px; flex: none; display: flex; align-items: center; justify-content: center; border: 1px solid #23262e; background: #0f1117; font-family: var(--font-mono); font-size: 13px; font-weight: 600; }
        .cp-emb img { width: 76%; height: 76%; object-fit: contain; }
        .cp-meta { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--c-meta); line-height: 1.6; }
        .cp-meta em { font-style: normal; color: var(--acc); }
        .cp-name { font-family: var(--font-display); font-weight: 500; font-size: 22px; line-height: 1.15; letter-spacing: -0.01em; color: var(--c-ink); margin-top: 16px; }

        .cp-board { display: grid; grid-template-columns: repeat(var(--cells, 2), minmax(0, 1fr)); margin-top: 16px; border: 1px solid #1d2028; background: rgba(0,0,0,0.25); }
        .cp-cell { padding: 12px 14px; min-width: 0; }
        .cp-cell + .cp-cell { border-left: 1px solid #1d2028; }
        .cp-cell dt { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-tertiary); opacity: 0.85; }
        .cp-cell dd { margin-top: 6px; display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
        .cp-val { font-family: var(--font-mono); font-weight: 500; font-size: 26px; line-height: 1; color: var(--c-ink); font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
        .cp-unit { font-family: var(--font-mono); font-size: 11px; color: #8a919d; }
        .cp-team { display: flex; align-items: baseline; gap: 10px; margin-top: 12px; font-family: var(--font-mono); font-size: 12px; color: #c6cdd8; }
        .cp-team span { font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-meta); }
        .cp-sum { font-family: var(--font-body); font-size: 14px; line-height: 1.6; color: #a4abb7; margin-top: 14px; }
        .cp-built { display: block; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-tertiary); opacity: 0.85; margin-bottom: 6px; }
        .cp-foot { display: flex; justify-content: space-between; align-items: center; gap: 10px 16px; flex-wrap: wrap; margin-top: auto; padding-top: 18px; }
        .cp-plate:not(.cp-flag) .cp-foot { flex-direction: column; align-items: flex-start; }
        .cp-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .cp-links { display: flex; flex-wrap: wrap; gap: 6px 16px; }
        .cp-links a { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: #c6cdd8; border-bottom: 1px solid transparent; padding: 3px 0; }
        .cp-links a:hover, .cp-links a:focus-visible { color: var(--acc); border-bottom-color: var(--acc); }

        .cp-flag { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); grid-template-areas: 'head board' 'detail team' 'foot foot'; gap: 0 40px; padding: 30px 32px 24px; }
        .cp-flag > .cp-fhead { grid-area: head; }
        .cp-flag > .cp-board { grid-area: board; margin-top: 0; align-self: end; }
        .cp-flag > .cp-team { grid-area: team; align-self: start; font-size: 14px; margin-top: 14px; }
        .cp-flag > .cp-fdetail { grid-area: detail; }
        .cp-flag > .cp-foot { grid-area: foot; }
        .cp-flag .cp-name { font-size: clamp(28px, 3vw, 38px); }
        .cp-flag .cp-val { font-size: 40px; }
        .cp-flag .cp-cell { padding: 18px 20px; }
        @media (prefers-reduced-motion: reduce) { .cp-plate { transition: none; } }
        @media (max-width: 1100px) { .cp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 900px) {
          .cp-head { grid-template-columns: 1fr; }
          .cp-flag { grid-template-columns: 1fr; grid-template-areas: 'head' 'board' 'team' 'detail' 'foot'; padding: 24px 22px 18px; }
          .cp-flag > .cp-board { margin-top: 18px; }
        }
        @media (max-width: 640px) {
          .cp { padding-top: 40px; }
          .cp-grid { grid-template-columns: 1fr; }
          .cp-group { margin-top: 52px; }
          .cp-record { width: 100%; }
          .cp-record div { flex: 1; padding: 12px 12px; min-width: 0; }
          .cp-record b { font-size: 19px; }
          .cp-record span { white-space: normal; font-size: 9px; }
          .cp-flag .cp-val { font-size: 32px; }
          .cp-flag .cp-cell { padding: 14px 14px; }
        }
      `}),e.jsxs(j,{to:"/",className:"cp-back",children:[e.jsx(k,{size:16,strokeWidth:1.5})," ",t("compBack")]}),e.jsxs("header",{className:"cp-head",children:[e.jsxs("div",{children:[e.jsx("div",{className:"ds-kicker",children:t("compBadge")}),e.jsx("h1",{children:t("compLabel")}),e.jsx("p",{children:t("compSub")})]}),e.jsxs("div",{className:"cp-record","aria-label":t("compRecord"),children:[e.jsxs("div",{children:[e.jsx("b",{children:String(m.length).padStart(2,"0")}),e.jsx("span",{children:t("compEntries")})]}),e.jsxs("div",{children:[e.jsx("b",{children:String(s.length).padStart(2,"0")}),e.jsx("span",{children:t("compContests")})]}),e.jsxs("div",{children:[e.jsx("b",{children:String(l.length).padStart(2,"0")}),e.jsx("span",{children:t("compHackathons")})]}),i&&e.jsxs("div",{children:[e.jsx("b",{children:i.replace(/^20(\d\d)–20(\d\d)$/,"’$1–’$2")}),e.jsx("span",{children:t("compSeasons")})]})]})]}),e.jsxs("section",{className:"cp-group","aria-labelledby":"cp-g1",children:[e.jsx("h2",{id:"cp-g1",className:"cp-glabel",children:t("compGroupContests")}),n&&e.jsx(x,{c:n,loc:p,t,lang:a,flagship:!0}),e.jsx("div",{className:"cp-grid",style:{marginTop:16},children:d.map(r=>e.jsx(x,{c:r,loc:p,t,lang:a},r.id))})]}),e.jsxs("section",{className:"cp-group","aria-labelledby":"cp-g2",children:[e.jsx("h2",{id:"cp-g2",className:"cp-glabel",children:t("compGroupHack")}),e.jsx("div",{className:"cp-grid",children:l.map(r=>e.jsx(x,{c:r,loc:p,t,lang:a},r.id))})]})]})}function x({c:a,loc:t,t:p,lang:s,flagship:l=!1}){const c=s==="tr"&&a.dateTr?a.dateTr:a.date,i=a.rank,n=[a.score&&{k:p("compScore"),v:a.score.value,u:t(a.score.unit)},i&&(i.top?{k:p("compRank"),v:`${p("compTop")} ${i.value}`,u:""}:{k:p("compRank"),v:i.of?i.value:`#${i.value}`,u:i.of?`/ ${i.of}`:t(i.scope)})].filter(Boolean),d=e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cp-top",children:[e.jsx("div",{className:"cp-emb",style:a.logo?void 0:{color:a.accent,borderColor:`${a.accent}66`},children:a.logo?e.jsx("img",{src:a.logo,alt:`${a.org} logo`,loading:"lazy"}):a.initials}),e.jsxs("div",{className:"cp-meta",children:[e.jsx("em",{children:t(a.type)}),e.jsx("br",{}),c,a.duration?` · ${t(a.duration)}`:""]})]}),e.jsx("h3",{className:"cp-name",children:a.name})]}),r=n.length>0&&e.jsx("dl",{className:"cp-board",style:{"--cells":n.length},children:n.map(o=>e.jsxs("div",{className:"cp-cell",children:[e.jsx("dt",{children:o.k}),e.jsxs("dd",{children:[e.jsx("span",{className:"cp-val",children:o.v}),o.u&&e.jsx("span",{className:"cp-unit",children:o.u})]})]},o.k))}),g=a.team&&e.jsxs("div",{className:"cp-team",children:[e.jsx("span",{children:p("compTeam")}),"@",a.team]}),f=e.jsxs(e.Fragment,{children:[a.round&&e.jsxs("div",{className:"cp-team",children:[e.jsx("span",{children:p("compRound")}),t(a.round)]}),a.summary&&e.jsxs("p",{className:"cp-sum",children:[n.length===0&&e.jsx("span",{className:"cp-built",children:p("compBuilt")}),t(a.summary)]})]}),h=e.jsxs("div",{className:"cp-foot",children:[e.jsx("div",{className:"cp-tags",children:(Array.isArray(a.tags)?a.tags:t(a.tags)).map(o=>e.jsx("span",{className:"label",children:o},o))}),e.jsxs("div",{className:"cp-links",children:[a.leaderboard&&e.jsxs("a",{href:a.leaderboard,target:"_blank",rel:"noopener noreferrer",children:[e.jsx(z,{size:12,strokeWidth:1.5})," ",p("compLeaderboard")]}),a.repo&&e.jsxs("a",{href:a.repo,target:"_blank",rel:"noopener noreferrer",children:[e.jsx(w,{size:12,strokeWidth:1.5})," GitHub"]}),a.website&&e.jsxs("a",{href:a.website,target:"_blank",rel:"noopener noreferrer",children:[p("compVisit")," ",e.jsx(N,{size:12,strokeWidth:1.5})]})]})]});return l?e.jsxs("article",{className:"cp-plate cp-flag",style:{"--acc":a.accent},children:[e.jsx("div",{className:"cp-fhead",children:d}),r,g,e.jsx("div",{className:"cp-fdetail",children:f}),h]}):e.jsxs("article",{className:"cp-plate",style:{"--acc":a.accent},children:[d,r,g,f,h]})}export{$ as default};
