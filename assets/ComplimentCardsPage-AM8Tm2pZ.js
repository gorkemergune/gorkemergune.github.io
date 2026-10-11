import{u as z,r as d,j as e,S as h}from"./index-f0qu5WmO.js";import{F as j,a as S}from"./FunFrame-C1Il2Tb9.js";import{S as Y}from"./shuffle-CQJtGEmL.js";import{H as v}from"./heart-3HQ2Hpey.js";const g={tr:["Gülüşün bulunduğun yeri aydınlatıyor.","Gözlerin gerçekten çok etkileyici.","Saçların sana çok yakışıyor.","Tarzın gerçekten çok hoş.","Pozitif enerjin bulaşıcı.","Seninle konuşmak çok keyifli.","Kahkahan insanı mutlu ediyor.","Çok zarif görünüyorsun.","Etrafına mutluluk yayıyorsun.","Samimiyetin hemen hissediliyor.","Bakışların çok anlamlı.","Gülümsemen günümü güzelleştirdi.","Sesin huzur veriyor.","Auran gerçekten çok güzel.","İyi ki böyle birisin.","Işığın herkesten farklı."],en:["Your smile lights up every room.","Your eyes are truly captivating.","Your hair looks amazing.","You have an incredible sense of style.","Your positive energy is contagious.","Talking with you is always enjoyable.","Your laugh is wonderful.","You look incredibly elegant.","You spread happiness wherever you go.","Your kindness stands out instantly.","Your eyes tell a beautiful story.","Your smile made my day brighter.","Your voice is so calming.","You have a beautiful aura.","The world is better with you in it.","You shine in your own unique way."]},l=16,y=["#ff4d6d","#f472b6","#00f0ff","#9d6bff","#ffd166","#00e5a0","#4d96ff","#ff9f1c"];function k(n){const a=Array.from({length:n},(r,t)=>t);for(let r=a.length-1;r>0;r--){const t=Math.floor(Math.random()*(r+1));[a[r],a[t]]=[a[t],a[r]]}return a}const N=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function C({accent:n}){const a=d.useMemo(()=>Array.from({length:8},(r,t)=>{const s=Math.PI*2*t/8+Math.random()*.6,c=28+Math.random()*26;return{id:t,x:`${Math.cos(s)*c}px`,y:`${Math.sin(s)*c}px`,delay:`${Math.random()*.08}s`,size:4+Math.random()*4}}),[]);return e.jsx("span",{className:"cc-burst","aria-hidden":"true",children:a.map(r=>e.jsx("span",{className:"cc-spark",style:{"--dx":r.x,"--dy":r.y,animationDelay:r.delay,width:r.size,height:r.size,background:n,boxShadow:`0 0 6px ${n}`}},r.id))})}function M({index:n,text:a,accent:r,open:t,allOpened:s,reduced:c,onOpen:f,t:u}){const i=n%2===0?v:h,p=t||s;return e.jsx("button",{type:"button",className:`cc-card${t?" cc-open":""}${p?" cc-locked":""}`,style:{"--accent":r},onClick:()=>f(n),disabled:p,"aria-pressed":t,"aria-label":t?a:u("complimentsCardLabel"),children:e.jsxs("span",{className:"cc-inner",children:[e.jsxs("span",{className:"cc-face cc-front","aria-hidden":t,children:[e.jsx("span",{className:"cc-front-glow"}),e.jsx(i,{size:26,strokeWidth:1.4,className:"cc-front-icon"}),e.jsx("span",{className:"cc-front-index",children:String(n+1).padStart(2,"0")})]}),e.jsxs("span",{className:"cc-face cc-back","aria-hidden":!t,children:[e.jsx(h,{size:16,strokeWidth:1.5,className:"cc-back-icon"}),e.jsx("span",{className:"cc-text",children:a}),t&&!c&&e.jsx(C,{accent:r})]})]})})}function $(){const{lang:n,t:a}=z(),r=g[n]||g.en,[t,s]=d.useState(()=>k(l)),[c,f]=d.useState(()=>new Set),u=N(),i=c.size===l,p=d.useCallback(m=>{f(o=>{if(o.has(m)||o.size===l)return o;const x=new Set(o);return x.add(m),x})},[]),w=d.useCallback(()=>{s(k(l)),f(new Set)},[]);return e.jsxs("div",{className:"fun-page",style:{maxWidth:b.container.maxWidth,"--fun-acc":"#ffd166"},children:[e.jsx("style",{children:W}),e.jsx("style",{children:j}),e.jsx(S,{kind:"me",accent:"#ffd166",title:a("funComplimentsTitle"),sub:a("complimentsSub")}),e.jsxs("div",{style:b.bar,children:[e.jsxs("span",{style:b.stat,children:[a("complimentsProgress"),":"," ",e.jsx("b",{style:{color:"#00f0ff"},children:c.size})," / ",l]}),i&&e.jsxs("button",{onClick:w,className:"cc-shuffle",type:"button",children:[e.jsx(Y,{size:14,strokeWidth:1.7})," ",a("complimentsShuffle")]})]}),e.jsx("div",{className:"cc-grid",role:"group","aria-label":a("funComplimentsTitle"),children:t.map((m,o)=>e.jsx(M,{index:o,text:r[m],accent:y[o%y.length],open:c.has(o),allOpened:i,reduced:u,onOpen:p,t:a},o))}),i&&e.jsxs("div",{className:"cc-done",role:"status",children:[e.jsx(v,{size:15,strokeWidth:1.6,style:{color:"#ff4d6d"}}),a("complimentsAllOpened")]})]})}const W=`
  .cc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    perspective: 1400px;
  }
  @media (max-width: 820px) { .cc-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 560px) { .cc-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }

  .cc-card {
    position: relative;
    aspect-ratio: 3 / 4;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 16px;
    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .cc-card:not(.cc-locked):hover { transform: translateY(-6px); }
  .cc-card.cc-locked:not(.cc-open) { cursor: default; }
  .cc-card.cc-open { animation: cc-pop 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }

  @keyframes cc-pop {
    0% { transform: scale(1); }
    45% { transform: scale(1.045); }
    100% { transform: scale(1); }
  }

  .cc-inner {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(0.2, 0.85, 0.25, 1);
  }
  .cc-card.cc-open .cc-inner { transform: rotateY(180deg); }

  .cc-face {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px;
    border-radius: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    overflow: hidden;
  }

  /* ---- Face-down front ---- */
  .cc-front {
    background:
      radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.04), transparent 60%),
      linear-gradient(160deg, #13161c 0%, #0c0c16 100%);
    border: 1px solid #1c1c30;
    transition: border-color 0.35s, box-shadow 0.35s;
  }
  .cc-card:not(.cc-locked):hover .cc-front {
    border-color: color-mix(in srgb, var(--accent) 55%, transparent);
    box-shadow: 0 0 30px color-mix(in srgb, var(--accent) 22%, transparent);
  }
  .cc-front-glow {
    position: absolute;
    width: 60px; height: 60px;
    border-radius: 50%;
    background: radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%);
    filter: blur(6px);
    opacity: 0.55;
    transition: opacity 0.35s, transform 0.5s cubic-bezier(0.2,0.8,0.2,1);
  }
  .cc-card:not(.cc-locked):hover .cc-front-glow { opacity: 1; transform: scale(1.25); }
  .cc-front-icon {
    position: relative;
    color: color-mix(in srgb, var(--accent) 82%, #ffffff);
    transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1);
  }
  .cc-card:not(.cc-locked):hover .cc-front-icon { transform: scale(1.12) rotate(-6deg); }
  .cc-front-index {
    position: absolute;
    bottom: 12px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    color: #3a3a52;
  }

  /* ---- Revealed back ---- */
  .cc-back {
    transform: rotateY(180deg);
    background:
      radial-gradient(130% 100% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 62%),
      linear-gradient(160deg, #14171d 0%, #0e0e18 100%);
    border: 1px solid color-mix(in srgb, var(--accent) 42%, #1e222b);
    box-shadow: inset 0 0 30px color-mix(in srgb, var(--accent) 10%, transparent);
  }
  .cc-back-icon { color: color-mix(in srgb, var(--accent) 85%, #ffffff); flex-shrink: 0; }
  .cc-text {
    font-family: var(--font-display);
    font-size: 16px;
    line-height: 1.32;
    color: #e6e6ee;
    text-align: center;
    letter-spacing: 0.005em;
  }
  @media (max-width: 560px) { .cc-text { font-size: 14.5px; } }

  /* ---- Sparkle burst ---- */
  .cc-burst {
    position: absolute;
    top: 22px; left: 50%;
    width: 0; height: 0;
    pointer-events: none;
  }
  .cc-spark {
    position: absolute;
    top: 0; left: 0;
    border-radius: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    animation: cc-spark 0.75s ease-out forwards;
  }
  @keyframes cc-spark {
    0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
    30%  { opacity: 1; }
    100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.7); }
  }

  .cc-shuffle {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px;
    border: 1px solid #ff4d6d55;
    border-radius: 999px;
    background: linear-gradient(160deg, rgba(255,77,109,0.12), rgba(244,114,182,0.08));
    color: #f0dfe4;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), border-color 0.3s, box-shadow 0.3s;
    animation: cc-fade-up 0.5s cubic-bezier(0.2,0.8,0.2,1);
  }
  .cc-shuffle:hover {
    transform: translateY(-2px);
    border-color: #ff4d6daa;
    box-shadow: 0 0 26px rgba(255,77,109,0.22);
  }
  .cc-shuffle svg { transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1); }
  .cc-shuffle:hover svg { transform: rotate(180deg); }

  .cc-done {
    margin-top: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 14px 20px;
    border: 1px solid #ff4d6d33;
    border-radius: 12px;
    background: rgba(255,77,109,0.06);
    font-family: var(--font-body);
    font-size: 15px;
    color: #d8d8e2;
    text-align: center;
    animation: cc-fade-up 0.5s cubic-bezier(0.2,0.8,0.2,1);
  }
  @keyframes cc-fade-up {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`,b={container:{maxWidth:760},bar:{display:"flex",alignItems:"center",gap:20,marginBottom:22,minHeight:40,flexWrap:"wrap"},stat:{fontFamily:"var(--font-mono)",fontSize:12,color:"#8b929e"}};export{$ as default};
