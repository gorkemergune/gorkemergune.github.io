import{r as c,j as e,a as A,L as R}from"./index-BxN_GMSb.js";import{p as z,C as E,R as $}from"./Confetti-DVUCmklH.js";import{H as w}from"./heart-Dh10LkG5.js";import{A as F}from"./arrow-left-qkgSAJuC.js";const H=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],g=(a,t)=>a>>>t|a<<32-t,T=a=>(a>>>0).toString(16).padStart(8,"0");function B(a){if(typeof TextEncoder<"u")return Array.from(new TextEncoder().encode(a));const t=[];for(const i of unescape(encodeURIComponent(a)))t.push(i.charCodeAt(0));return t}function D(a){const t=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],i=B(a),n=i.length*8;for(i.push(128);i.length%64!==56;)i.push(0);for(let l=0;l<4;l++)i.push(0);i.push(n>>>24&255,n>>>16&255,n>>>8&255,n&255);const r=new Array(64);for(let l=0;l<i.length;l+=64){for(let s=0;s<16;s++){const u=l+s*4;r[s]=i[u]<<24|i[u+1]<<16|i[u+2]<<8|i[u+3]|0}for(let s=16;s<64;s++){const u=g(r[s-15],7)^g(r[s-15],18)^r[s-15]>>>3,v=g(r[s-2],17)^g(r[s-2],19)^r[s-2]>>>10;r[s]=r[s-16]+u+r[s-7]+v|0}let[o,d,m,x,f,p,b,k]=t;for(let s=0;s<64;s++){const u=g(f,6)^g(f,11)^g(f,25),v=f&p^~f&b,y=k+u+v+H[s]+r[s]|0,h=g(o,2)^g(o,13)^g(o,22),I=o&d^o&m^d&m,L=h+I|0;k=b,b=p,p=f,f=x+y|0,x=m,m=d,d=o,o=y+L|0}t[0]=t[0]+o|0,t[1]=t[1]+d|0,t[2]=t[2]+m|0,t[3]=t[3]+x|0,t[4]=t[4]+f|0,t[5]=t[5]+p|0,t[6]=t[6]+b|0,t[7]=t[7]+k|0}return t.map(T).join("")}const S=60,O=100;function W(a,t){const i=String(a??"").trim().toLowerCase(),n=String(t??"").trim().toLowerCase(),[r,l]=[i,n].sort(),o=`${r}|${l}`,d=D(o),m=parseInt(d.slice(0,8),16),x=O-S+1;return S+m%x}const M={en:["❤️ Reading the stars...","✨ Measuring chemistry...","💫 Looking for butterflies...","🌸 Almost done..."],tr:["❤️ Yıldızlar okunuyor...","✨ Kimya ölçülüyor...","💫 Kelebekler aranıyor...","🌸 Neredeyse bitti..."]},N=[{min:95,max:100,en:"Soulmate energy. The universe might know something.",tr:"Ruh eşi enerjisi. Evren bir şeyler biliyor olabilir."},{min:90,max:94,en:"Someone should definitely grab a coffee together.",tr:"Biriniz mutlaka bir kahve teklif etmeli."},{min:85,max:89,en:"Looking pretty promising.",tr:"Oldukça umut verici görünüyor."},{min:80,max:84,en:"There's definitely a spark.",tr:"Ortada kesinlikle bir kıvılcım var."},{min:75,max:79,en:"You two seem to have good vibes.",tr:"İkinizin arası gayet iyi görünüyor."},{min:70,max:74,en:"Could become a great friendship.",tr:"Harika bir dostluğa dönüşebilir."},{min:60,max:69,en:"Every great story has to start somewhere.",tr:"Her güzel hikâye bir yerden başlamak zorunda."}];function Y(a){return N.find(t=>a>=t.min&&a<=t.max)||N[N.length-1]}const P=95;function _({messages:a=[],duration:t=3e3,onComplete:i}){const r=z()?600:t,[l,o]=c.useState(0),[d,m]=c.useState(0),x=c.useRef(!1),f=c.useRef(i);return f.current=i,c.useEffect(()=>{let p;const b=performance.now(),k=Math.max(1,a.length),s=u=>{var h;const v=u-b,y=Math.min(1,v/r);o(y*100),m(Math.min(k-1,Math.floor(y*k))),y<1?p=requestAnimationFrame(s):x.current||(x.current=!0,(h=f.current)==null||h.call(f))};return p=requestAnimationFrame(s),()=>cancelAnimationFrame(p)},[r,a.length]),e.jsxs("div",{className:"pa-root",role:"status","aria-live":"polite",children:[e.jsx("style",{children:J}),e.jsx("div",{className:"pa-msg",children:a[d]||""},d),e.jsx("div",{className:"pa-track",children:e.jsx("div",{className:"pa-fill",style:{width:`${l}%`},children:e.jsx("span",{className:"pa-shine"})})}),e.jsxs("div",{className:"pa-pct",children:[Math.round(l),"%"]})]})}const J=`
  .pa-root {
    display: flex; flex-direction: column; align-items: center; gap: 20px;
    padding: 20px 0;
  }
  .pa-msg {
    font-family: 'Instrument Serif', serif;
    font-size: 26px; line-height: 1.3; color: #f0e0e6; text-align: center;
    min-height: 34px;
    animation: pa-msg-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @keyframes pa-msg-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pa-track {
    width: 100%; max-width: 380px; height: 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid #1f1f34; border-radius: 999px; overflow: hidden;
  }
  .pa-fill {
    height: 100%; border-radius: 999px; position: relative; overflow: hidden;
    background: linear-gradient(90deg, #ff4d6d, #f472b6, #9d6bff);
    box-shadow: 0 0 16px rgba(255,77,109,0.5);
    transition: width 0.12s linear;
  }
  .pa-shine {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
    animation: pa-shine 1.1s ease-in-out infinite;
  }
  @keyframes pa-shine {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .pa-pct {
    font-family: 'JetBrains Mono', monospace; font-size: 12px;
    letter-spacing: 0.12em; color: #8a8aa0; font-variant-numeric: tabular-nums;
  }
`,q=3e3;function K(a,t,i=1400){const[n,r]=c.useState(0),l=z();return c.useEffect(()=>{if(l){r(a);return}let o;const d=performance.now(),m=x=>{const f=Math.min(1,(x-d)/i),p=1-Math.pow(1-f,3);r(Math.round(p*a)),f<1&&(o=requestAnimationFrame(m))};return o=requestAnimationFrame(m),()=>cancelAnimationFrame(o)},[a,t,i,l]),n}function U({score:a,lang:t,onReset:i,t:n}){const r=K(a,!0),l=Y(a),o=a>=P,[d,m]=c.useState(o);return e.jsxs("div",{className:"lm-result",role:"status","aria-live":"polite",children:[d&&e.jsx(E,{onDone:()=>m(!1)}),e.jsxs("div",{className:"lm-result-badge",children:[e.jsx(w,{size:15,strokeWidth:1.8,fill:"#ff4d6d",style:{color:"#ff4d6d"}}),n("loveCompatibility")]}),e.jsxs("div",{className:"lm-score","aria-label":`${a}%`,children:[r,e.jsx("span",{className:"lm-score-pct",children:"%"})]}),e.jsx("div",{className:"lm-heart-row","aria-hidden":"true",children:e.jsx(w,{className:"lm-big-heart",size:44,strokeWidth:1.4,fill:"#ff4d6d",style:{color:"#ff4d6d"}})}),e.jsx("p",{className:"lm-message",children:l[t]||l.en}),e.jsxs("button",{type:"button",className:"lm-again",onClick:i,children:[e.jsx($,{size:15,strokeWidth:1.8})," ",n("loveAgain")]})]})}function X(){const{lang:a,t}=A(),[i,n]=c.useState(""),[r,l]=c.useState(""),[o,d]=c.useState("idle"),[m,x]=c.useState(0),[f,p]=c.useState(!1),b=c.useRef(0),k=M[a]||M.en,s=c.useCallback(()=>{if(!i.trim()||!r.trim()){p(!0);return}p(!1),b.current=W(i,r),d("calculating")},[i,r]),u=c.useCallback(()=>{x(b.current),d("result")},[]),v=c.useCallback(()=>{d("idle"),x(0)},[]),y=h=>{h.key==="Enter"&&s()};return e.jsxs("div",{className:"lm-card",children:[e.jsx("style",{children:V}),o==="idle"&&e.jsxs("div",{className:"lm-form",children:[e.jsxs("label",{className:"lm-field",children:[e.jsx("span",{className:"lm-label",children:t("loveName1Label")}),e.jsx("input",{type:"text",className:"lm-input",value:i,onChange:h=>n(h.target.value),onKeyDown:y,placeholder:t("loveName1Placeholder"),"aria-label":t("loveName1Label"),autoComplete:"off",maxLength:40})]}),e.jsx("div",{className:"lm-amp","aria-hidden":"true",children:e.jsx(w,{size:22,strokeWidth:1.6,fill:"#ff4d6d",style:{color:"#ff4d6d"}})}),e.jsxs("label",{className:"lm-field",children:[e.jsx("span",{className:"lm-label",children:t("loveName2Label")}),e.jsx("input",{type:"text",className:"lm-input",value:r,onChange:h=>l(h.target.value),onKeyDown:y,placeholder:t("loveName2Placeholder"),"aria-label":t("loveName2Label"),autoComplete:"off",maxLength:40})]}),e.jsxs("button",{type:"button",className:"lm-calc",onClick:s,children:[e.jsx(w,{size:18,strokeWidth:1.8,fill:"currentColor"}),t("loveCalculate")]}),e.jsx("p",{className:"lm-error",role:"alert",style:{visibility:f?"visible":"hidden"},children:t("loveEmptyError")})]}),o==="calculating"&&e.jsx(_,{messages:k,duration:q,onComplete:u}),o==="result"&&e.jsx(U,{score:m,lang:a,onReset:v,t})]})}const V=`
  .lm-card {
    position: relative; z-index: 2;
    background:
      radial-gradient(120% 90% at 50% 0%, rgba(255,77,109,0.07), transparent 60%),
      linear-gradient(160deg, rgba(20,16,26,0.86), rgba(12,12,22,0.86));
    border: 1px solid #241c30;
    border-radius: 22px;
    padding: 40px;
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.35), inset 0 0 40px rgba(255,77,109,0.04);
    min-height: 320px;
    display: flex; flex-direction: column; justify-content: center;
  }
  @media (max-width: 560px) { .lm-card { padding: 28px 22px; border-radius: 18px; } }

  /* ---- Form ---- */
  .lm-form { display: flex; flex-direction: column; gap: 18px; }
  .lm-field { display: flex; flex-direction: column; gap: 8px; }
  .lm-label {
    font-family: 'JetBrains Mono', monospace; font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #8a7a86;
  }
  .lm-input {
    width: 100%; padding: 14px 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid #2a2238; border-radius: 12px;
    font-family: 'Instrument Sans', sans-serif; font-size: 16px; color: #ececf4;
    transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
  }
  .lm-input::placeholder { color: #5a5a70; }
  .lm-input:focus {
    outline: none; border-color: #ff4d6d88;
    box-shadow: 0 0 0 3px rgba(255,77,109,0.14);
    background: rgba(255,255,255,0.05);
  }
  .lm-amp { display: flex; justify-content: center; margin: -4px 0; }

  .lm-calc {
    margin-top: 8px;
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    padding: 16px 24px; width: 100%;
    border: none; border-radius: 14px; cursor: pointer;
    font-family: 'Instrument Sans', sans-serif; font-size: 17px; font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #ff4d6d, #f472b6);
    box-shadow: 0 10px 30px rgba(255,77,109,0.32);
    transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.3s, filter 0.3s;
  }
  .lm-calc:hover { transform: translateY(-2px); box-shadow: 0 14px 38px rgba(255,77,109,0.42); filter: brightness(1.06); }
  .lm-calc:active { transform: translateY(0); }

  .lm-error {
    font-family: 'Instrument Sans', sans-serif; font-size: 13px;
    color: #ff8095; text-align: center; margin-top: 2px; min-height: 18px;
  }

  /* ---- Result ---- */
  .lm-result {
    display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px;
    animation: lm-in 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @keyframes lm-in { from { opacity: 0; transform: translateY(14px) scale(0.98); } to { opacity: 1; transform: none; } }

  .lm-result-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #d8b8c2;
  }
  .lm-score {
    font-family: 'Instrument Serif', serif; font-weight: 400;
    font-size: 104px; line-height: 1; letter-spacing: -0.02em;
    background: linear-gradient(135deg, #ff4d6d 0%, #f472b6 50%, #9d6bff 100%);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    font-variant-numeric: tabular-nums;
  }
  @media (max-width: 560px) { .lm-score { font-size: 76px; } }
  .lm-score-pct { font-size: 0.5em; -webkit-text-fill-color: #f472b6; }

  .lm-heart-row { margin: -2px 0 2px; }
  .lm-big-heart { animation: lm-beat 1.1s ease-in-out infinite; }
  @keyframes lm-beat {
    0%, 100% { transform: scale(1); }
    15% { transform: scale(1.18); }
    30% { transform: scale(1); }
    45% { transform: scale(1.1); }
  }

  .lm-message {
    font-family: 'Instrument Serif', serif; font-size: 24px; line-height: 1.35;
    color: #ececf4; max-width: 420px;
  }
  @media (max-width: 560px) { .lm-message { font-size: 20px; } }

  .lm-again {
    margin-top: 10px;
    display: inline-flex; align-items: center; gap: 9px;
    padding: 11px 20px; border-radius: 999px; cursor: pointer;
    border: 1px solid #ff4d6d44;
    background: linear-gradient(160deg, rgba(255,77,109,0.12), rgba(157,107,255,0.08));
    color: #f0dfe4; font-family: 'Instrument Sans', sans-serif; font-size: 14px; font-weight: 500;
    transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), border-color 0.3s, box-shadow 0.3s;
  }
  .lm-again:hover { transform: translateY(-2px); border-color: #ff4d6daa; box-shadow: 0 0 26px rgba(255,77,109,0.22); }
  .lm-again svg { transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1); }
  .lm-again:hover svg { transform: rotate(-180deg); }
`,C=["❤️","💗","💓","💞","💕"];function G(){const a=z(),t=c.useMemo(()=>Array.from({length:14},(n,r)=>({id:r,char:C[r%C.length],left:Math.random()*100,size:14+Math.random()*20,delay:Math.random()*9,dur:9+Math.random()*8,drift:(Math.random()-.5)*60,opacity:.25+Math.random()*.35})),[]),i=c.useMemo(()=>Array.from({length:20},(n,r)=>({id:r,left:Math.random()*100,top:Math.random()*100,size:2+Math.random()*3,delay:Math.random()*4,dur:2.4+Math.random()*2.6})),[]);return e.jsxs("div",{className:"fh-root","aria-hidden":"true",children:[e.jsx("style",{children:Q}),e.jsx("span",{className:"fh-glow fh-glow-1"}),e.jsx("span",{className:"fh-glow fh-glow-2"}),!a&&e.jsxs(e.Fragment,{children:[t.map(n=>e.jsx("span",{className:"fh-heart",style:{left:`${n.left}%`,fontSize:n.size,opacity:n.opacity,animationDelay:`${n.delay}s`,animationDuration:`${n.dur}s`,"--drift":`${n.drift}px`},children:n.char},`h${n.id}`)),i.map(n=>e.jsx("span",{className:"fh-spark",style:{left:`${n.left}%`,top:`${n.top}%`,width:n.size,height:n.size,animationDelay:`${n.delay}s`,animationDuration:`${n.dur}s`}},`s${n.id}`))]})]})}const Q=`
  .fh-root {
    position: absolute; inset: 0; overflow: hidden;
    pointer-events: none; z-index: 0;
  }
  .fh-glow {
    position: absolute; border-radius: 50%; filter: blur(70px);
  }
  .fh-glow-1 {
    width: 420px; height: 420px; top: -120px; left: -80px;
    background: radial-gradient(circle, rgba(255,77,109,0.16), transparent 70%);
  }
  .fh-glow-2 {
    width: 480px; height: 480px; bottom: -160px; right: -120px;
    background: radial-gradient(circle, rgba(157,107,255,0.14), transparent 70%);
  }
  .fh-heart {
    position: absolute; bottom: -40px;
    animation-name: fh-rise; animation-timing-function: ease-in-out;
    animation-iteration-count: infinite; will-change: transform, opacity;
  }
  @keyframes fh-rise {
    0%   { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    12%  { opacity: 1; }
    88%  { opacity: 1; }
    100% { transform: translate(var(--drift), -108vh) rotate(18deg); opacity: 0; }
  }
  .fh-spark {
    position: absolute; border-radius: 50%;
    background: #fff; box-shadow: 0 0 6px #fff, 0 0 10px rgba(255,77,109,0.6);
    animation-name: fh-twinkle; animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
  @keyframes fh-twinkle {
    0%, 100% { opacity: 0; transform: scale(0.4); }
    50%      { opacity: 0.9; transform: scale(1); }
  }
`;function ne(){const{t:a}=A();return e.jsxs("div",{style:j.container,children:[e.jsx(G,{}),e.jsxs(R,{to:"/fun",className:"link-hover",style:j.back,children:[e.jsx(F,{size:16,strokeWidth:1.5})," ",a("funBack")]}),e.jsxs("div",{style:j.header,children:[e.jsx("span",{className:"chip",children:a("funBadge")}),e.jsx("h1",{className:"section-title",style:j.title,children:a("funLoveTitle")}),e.jsx("p",{style:j.desc,children:a("loveSub")}),e.jsx("p",{style:j.disclaimer,children:a("loveDisclaimer")})]}),e.jsx(X,{})]})}const j={container:{maxWidth:540,margin:"0 auto",padding:"60px 48px 120px",position:"relative",zIndex:2},back:{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'JetBrains Mono', monospace",fontSize:12,letterSpacing:"0.06em",color:"#5a5a70",marginBottom:48,cursor:"pointer",position:"relative",zIndex:2},header:{marginBottom:32,position:"relative",zIndex:2},title:{fontFamily:"'Instrument Serif', serif",fontSize:60,fontWeight:400,lineHeight:.95,letterSpacing:"-0.015em",color:"#e0e0e8",marginTop:20,marginBottom:16},desc:{fontFamily:"'Instrument Sans', sans-serif",fontSize:17,lineHeight:1.6,color:"#8a8aa0",maxWidth:460},disclaimer:{fontFamily:"'JetBrains Mono', monospace",fontSize:11,letterSpacing:"0.04em",color:"#6a6a82",marginTop:12}};export{ne as default};
