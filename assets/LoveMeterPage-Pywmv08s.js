import{r as c,j as e,u as R}from"./index-f0qu5WmO.js";import{F as L,a as $}from"./FunFrame-C1Il2Tb9.js";import{p as N,C as F}from"./Confetti-qtyk9LfP.js";import{H as w}from"./heart-3HQ2Hpey.js";import{R as H}from"./refresh-cw-iufvdc6v.js";const T=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],b=(t,a)=>t>>>a|t<<32-a,D=t=>(t>>>0).toString(16).padStart(8,"0");function O(t){if(typeof TextEncoder<"u")return Array.from(new TextEncoder().encode(t));const a=[];for(const o of unescape(encodeURIComponent(t)))a.push(o.charCodeAt(0));return a}function W(t){const a=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],o=O(t),n=o.length*8;for(o.push(128);o.length%64!==56;)o.push(0);for(let l=0;l<4;l++)o.push(0);o.push(n>>>24&255,n>>>16&255,n>>>8&255,n&255);const r=new Array(64);for(let l=0;l<o.length;l+=64){for(let i=0;i<16;i++){const u=l+i*4;r[i]=o[u]<<24|o[u+1]<<16|o[u+2]<<8|o[u+3]|0}for(let i=16;i<64;i++){const u=b(r[i-15],7)^b(r[i-15],18)^r[i-15]>>>3,k=b(r[i-2],17)^b(r[i-2],19)^r[i-2]>>>10;r[i]=r[i-16]+u+r[i-7]+k|0}let[s,d,m,x,f,p,g,v]=a;for(let i=0;i<64;i++){const u=b(f,6)^b(f,11)^b(f,25),k=f&p^~f&g,y=v+u+k+T[i]+r[i]|0,h=b(s,2)^b(s,13)^b(s,22),A=s&d^s&m^d&m,E=h+A|0;v=g,g=p,p=f,f=x+y|0,x=m,m=d,d=s,s=y+E|0}a[0]=a[0]+s|0,a[1]=a[1]+d|0,a[2]=a[2]+m|0,a[3]=a[3]+x|0,a[4]=a[4]+f|0,a[5]=a[5]+p|0,a[6]=a[6]+g|0,a[7]=a[7]+v|0}return a.map(D).join("")}const z=60,Y=100;function I(t,a){const o=String(t??"").trim().toLowerCase(),n=String(a??"").trim().toLowerCase(),[r,l]=[o,n].sort(),s=`${r}|${l}`,d=W(s),m=parseInt(d.slice(0,8),16),x=Y-z+1;return z+m%x}const C={en:["❤️ Reading the stars...","✨ Measuring chemistry...","💫 Looking for butterflies...","🌸 Almost done..."],tr:["❤️ Yıldızlar okunuyor...","✨ Kimya ölçülüyor...","💫 Kelebekler aranıyor...","🌸 Neredeyse bitti..."]},j=[{min:95,max:100,en:"Soulmate energy. The universe might know something.",tr:"Ruh eşi enerjisi. Evren bir şeyler biliyor olabilir."},{min:90,max:94,en:"Someone should definitely grab a coffee together.",tr:"Biriniz mutlaka bir kahve teklif etmeli."},{min:85,max:89,en:"Looking pretty promising.",tr:"Oldukça umut verici görünüyor."},{min:80,max:84,en:"There's definitely a spark.",tr:"Ortada kesinlikle bir kıvılcım var."},{min:75,max:79,en:"You two seem to have good vibes.",tr:"İkinizin arası gayet iyi görünüyor."},{min:70,max:74,en:"Could become a great friendship.",tr:"Harika bir dostluğa dönüşebilir."},{min:60,max:69,en:"Every great story has to start somewhere.",tr:"Her güzel hikâye bir yerden başlamak zorunda."}];function _(t){return j.find(a=>t>=a.min&&t<=a.max)||j[j.length-1]}const P=95;function q({messages:t=[],duration:a=3e3,onComplete:o}){const r=N()?600:a,[l,s]=c.useState(0),[d,m]=c.useState(0),x=c.useRef(!1),f=c.useRef(o);return f.current=o,c.useEffect(()=>{let p;const g=performance.now(),v=Math.max(1,t.length),i=u=>{var h;const k=u-g,y=Math.min(1,k/r);s(y*100),m(Math.min(v-1,Math.floor(y*v))),y<1?p=requestAnimationFrame(i):x.current||(x.current=!0,(h=f.current)==null||h.call(f))};return p=requestAnimationFrame(i),()=>cancelAnimationFrame(p)},[r,t.length]),e.jsxs("div",{className:"pa-root",role:"status","aria-live":"polite",children:[e.jsx("style",{children:K}),e.jsx("div",{className:"pa-msg",children:t[d]||""},d),e.jsx("div",{className:"pa-track",children:e.jsx("div",{className:"pa-fill",style:{width:`${l}%`},children:e.jsx("span",{className:"pa-shine"})})}),e.jsxs("div",{className:"pa-pct",children:[Math.round(l),"%"]})]})}const K=`
  .pa-root {
    display: flex; flex-direction: column; align-items: center; gap: 20px;
    padding: 20px 0;
  }
  .pa-msg {
    font-family: var(--font-display);
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
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 0.12em; color: #8b929e; font-variant-numeric: tabular-nums;
  }
`,U=3e3;function X(t,a,o=1400){const[n,r]=c.useState(0),l=N();return c.useEffect(()=>{if(l){r(t);return}let s;const d=performance.now(),m=x=>{const f=Math.min(1,(x-d)/o),p=1-Math.pow(1-f,3);r(Math.round(p*t)),f<1&&(s=requestAnimationFrame(m))};return s=requestAnimationFrame(m),()=>cancelAnimationFrame(s)},[t,a,o,l]),n}function B({score:t,lang:a,onReset:o,t:n}){const r=X(t,!0),l=_(t),s=t>=P,[d,m]=c.useState(s);return e.jsxs("div",{className:"lm-result",role:"status","aria-live":"polite",children:[d&&e.jsx(F,{onDone:()=>m(!1)}),e.jsxs("div",{className:"lm-result-badge",children:[e.jsx(w,{size:15,strokeWidth:1.8,fill:"#ff4d6d",style:{color:"#ff4d6d"}}),n("loveCompatibility")]}),e.jsxs("div",{className:"lm-score","aria-label":`${t}%`,children:[r,e.jsx("span",{className:"lm-score-pct",children:"%"})]}),e.jsx("div",{className:"lm-heart-row","aria-hidden":"true",children:e.jsx(w,{className:"lm-big-heart",size:44,strokeWidth:1.4,fill:"#ff4d6d",style:{color:"#ff4d6d"}})}),e.jsx("p",{className:"lm-message",children:l[a]||l.en}),e.jsxs("button",{type:"button",className:"lm-again",onClick:o,children:[e.jsx(H,{size:15,strokeWidth:1.8})," ",n("loveAgain")]})]})}function V(){const{lang:t,t:a}=R(),[o,n]=c.useState(""),[r,l]=c.useState(""),[s,d]=c.useState("idle"),[m,x]=c.useState(0),[f,p]=c.useState(!1),g=c.useRef(0),v=C[t]||C.en,i=c.useCallback(()=>{if(!o.trim()||!r.trim()){p(!0);return}p(!1),g.current=I(o,r),d("calculating")},[o,r]),u=c.useCallback(()=>{x(g.current),d("result")},[]),k=c.useCallback(()=>{d("idle"),x(0)},[]),y=h=>{h.key==="Enter"&&i()};return e.jsxs("div",{className:"lm-card",children:[e.jsx("style",{children:G}),s==="idle"&&e.jsxs("div",{className:"lm-form",children:[e.jsxs("label",{className:"lm-field",children:[e.jsx("span",{className:"lm-label",children:a("loveName1Label")}),e.jsx("input",{type:"text",className:"lm-input",value:o,onChange:h=>n(h.target.value),onKeyDown:y,placeholder:a("loveName1Placeholder"),"aria-label":a("loveName1Label"),autoComplete:"off",maxLength:40})]}),e.jsx("div",{className:"lm-amp","aria-hidden":"true",children:e.jsx(w,{size:22,strokeWidth:1.6,fill:"#ff4d6d",style:{color:"#ff4d6d"}})}),e.jsxs("label",{className:"lm-field",children:[e.jsx("span",{className:"lm-label",children:a("loveName2Label")}),e.jsx("input",{type:"text",className:"lm-input",value:r,onChange:h=>l(h.target.value),onKeyDown:y,placeholder:a("loveName2Placeholder"),"aria-label":a("loveName2Label"),autoComplete:"off",maxLength:40})]}),e.jsxs("button",{type:"button",className:"lm-calc",onClick:i,children:[e.jsx(w,{size:18,strokeWidth:1.8,fill:"currentColor"}),a("loveCalculate")]}),e.jsx("p",{className:"lm-error",role:"alert",style:{visibility:f?"visible":"hidden"},children:a("loveEmptyError")})]}),s==="calculating"&&e.jsx(q,{messages:v,duration:U,onComplete:u}),s==="result"&&e.jsx(B,{score:m,lang:t,onReset:k,t:a})]})}const G=`
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
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #8a7a86;
  }
  .lm-input {
    width: 100%; padding: 14px 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid #2a2238; border-radius: 12px;
    font-family: var(--font-body); font-size: 16px; color: #ececf4;
    transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
  }
  .lm-input::placeholder { color: #5c6370; }
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
    font-family: var(--font-body); font-size: 17px; font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #ff4d6d, #f472b6);
    box-shadow: 0 10px 30px rgba(255,77,109,0.32);
    transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.3s, filter 0.3s;
  }
  .lm-calc:hover { transform: translateY(-2px); box-shadow: 0 14px 38px rgba(255,77,109,0.42); filter: brightness(1.06); }
  .lm-calc:active { transform: translateY(0); }

  .lm-error {
    font-family: var(--font-body); font-size: 13px;
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
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #d8b8c2;
  }
  .lm-score {
    font-family: var(--font-display); font-weight: 400;
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
    font-family: var(--font-display); font-size: 24px; line-height: 1.35;
    color: #ececf4; max-width: 420px;
  }
  @media (max-width: 560px) { .lm-message { font-size: 20px; } }

  .lm-again {
    margin-top: 10px;
    display: inline-flex; align-items: center; gap: 9px;
    padding: 11px 20px; border-radius: 999px; cursor: pointer;
    border: 1px solid #ff4d6d44;
    background: linear-gradient(160deg, rgba(255,77,109,0.12), rgba(157,107,255,0.08));
    color: #f0dfe4; font-family: var(--font-body); font-size: 14px; font-weight: 500;
    transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), border-color 0.3s, box-shadow 0.3s;
  }
  .lm-again:hover { transform: translateY(-2px); border-color: #ff4d6daa; box-shadow: 0 0 26px rgba(255,77,109,0.22); }
  .lm-again svg { transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1); }
  .lm-again:hover svg { transform: rotate(-180deg); }
`,M=["❤️","💗","💓","💞","💕"];function J(){const t=N(),a=c.useMemo(()=>Array.from({length:14},(n,r)=>({id:r,char:M[r%M.length],left:Math.random()*100,size:14+Math.random()*20,delay:Math.random()*9,dur:9+Math.random()*8,drift:(Math.random()-.5)*60,opacity:.25+Math.random()*.35})),[]),o=c.useMemo(()=>Array.from({length:20},(n,r)=>({id:r,left:Math.random()*100,top:Math.random()*100,size:2+Math.random()*3,delay:Math.random()*4,dur:2.4+Math.random()*2.6})),[]);return e.jsxs("div",{className:"fh-root","aria-hidden":"true",children:[e.jsx("style",{children:Q}),e.jsx("span",{className:"fh-glow fh-glow-1"}),e.jsx("span",{className:"fh-glow fh-glow-2"}),!t&&e.jsxs(e.Fragment,{children:[a.map(n=>e.jsx("span",{className:"fh-heart",style:{left:`${n.left}%`,fontSize:n.size,opacity:n.opacity,animationDelay:`${n.delay}s`,animationDuration:`${n.dur}s`,"--drift":`${n.drift}px`},children:n.char},`h${n.id}`)),o.map(n=>e.jsx("span",{className:"fh-spark",style:{left:`${n.left}%`,top:`${n.top}%`,width:n.size,height:n.size,animationDelay:`${n.delay}s`,animationDuration:`${n.dur}s`}},`s${n.id}`))]})]})}const Q=`
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
`;function re(){const{t}=R();return e.jsxs("div",{className:"fun-page",style:{maxWidth:S.container.maxWidth,"--fun-acc":"#ff4d6d"},children:[e.jsx(J,{}),e.jsx("style",{children:L}),e.jsx($,{kind:"me",accent:"#ff4d6d",title:t("funLoveTitle"),sub:t("loveSub"),children:e.jsx("p",{style:S.disclaimer,children:t("loveDisclaimer")})}),e.jsx(V,{})]})}const S={container:{maxWidth:540},disclaimer:{fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.04em",color:"#6b7280",marginTop:12}};export{re as default};
