import{r as n,j as e,u as M,S as N}from"./index-f0qu5WmO.js";import{F as H,a as P}from"./FunFrame-C1Il2Tb9.js";import{p as _,C as K}from"./Confetti-qtyk9LfP.js";import{R as O}from"./refresh-cw-iufvdc6v.js";const W={en:["Smile for 10 seconds 😊","Compliment someone today.","Send ❤️ to your favorite person.","Drink a glass of water.","Listen to your favorite song.","Take a selfie.",'Tell someone "You made my day."',"Dance for 5 seconds.","Think about your happiest memory.","Hug yourself 🤗","Call someone you miss.",'Text "Good morning" tomorrow.',"Smile at yourself in the mirror.","Watch the sunset.","Buy yourself a snack.","Laugh out loud.","Give someone a high five.","Put your phone away for 5 minutes.","Take a deep breath.",`Say "I'm awesome."`,"Share your favorite emoji.","Tell a joke.","Make someone smile.","Do one random act of kindness.","Stretch for one minute.","Look outside for a moment.","Say thank you to someone.","If you're smiling right now, challenge completed.","You deserve something nice today.","You're awesome. Never forget that."],tr:["10 saniye gülümse 😊","Bugün birine iltifat et.","Favori insanına ❤️ gönder.","Bir bardak su iç.","En sevdiğin şarkıyı dinle.","Bir selfie çek.",'Birine "Günümü güzelleştirdin" de.',"5 saniye dans et.","En mutlu anını düşün.","Kendine sarıl 🤗","Özlediğin birini ara.",'Yarın "Günaydın" mesajı at.',"Aynada kendine gülümse.","Gün batımını izle.","Kendine bir atıştırmalık al.","Kahkaha at.","Birine beşlik çak.","Telefonu 5 dakika kenara koy.","Derin bir nefes al.",'"Ben harikayım" de.',"En sevdiğin emojiyi paylaş.","Bir şaka yap.","Birini gülümset.","Bir iyilik yap.","Bir dakika esne.","Bir an dışarıya bak.","Birine teşekkür et.","Şu an gülümsüyorsan, görev tamamlandı.","Bugün güzel bir şeyi hak ediyorsun.","Sen harikasın. Bunu asla unutma."]},b=30,C=400,l=C/2,y=192,Z=148,o=360/b,$=["#ff4d6d","#f472b6","#00f0ff","#9d6bff","#ffd166","#00e5a0","#4d96ff","#ff9f1c"];function R(s,a=y){const i=s*Math.PI/180;return[l+a*Math.sin(i),l-a*Math.cos(i)]}function U(s){const[a,i]=R(s*o),[d,c]=R((s+1)*o);return`M ${l} ${l} L ${a.toFixed(2)} ${i.toFixed(2)} A ${y} ${y} 0 0 1 ${d.toFixed(2)} ${c.toFixed(2)} Z`}const X=n.forwardRef(function({onSpinStart:a,onLanded:i},d){const[c,p]=n.useState(0),[w,m]=n.useState(!1),[k,h]=n.useState(null),[x,f]=n.useState(!1),[L,F]=n.useState(0),g=n.useRef(0),u=n.useRef(!1),B=n.useRef(null);n.useEffect(()=>()=>clearTimeout(B.current),[]);const A=n.useMemo(()=>Array.from({length:b},(t,r)=>({i:r,d:U(r),color:$[r%$.length],mid:r*o+o/2,label:R(r*o+o/2,Z)})),[]),E=n.useCallback(()=>{if(u.current)return;const t=_(),r=Math.floor(Math.random()*b),j=r*o+o/2,S=(Math.random()-.5)*(o-4),D=5+Math.floor(Math.random()*4),I=g.current-g.current%360,G=((360-j-S)%360+360)%360,T=I+D*360+G;u.current=!0,m(!0),h(null),f(!1),F(t?.35:5+Math.random()*3),g.current=T,p(T),a==null||a(),t&&(B.current=window.setTimeout(()=>v(r),380))},[a]),v=n.useCallback(t=>{u.current&&(u.current=!1,m(!1),h(t),f(!0),i==null||i(t))},[i]);n.useImperativeHandle(d,()=>({spin:E,spinning:()=>u.current}),[E]);const Y=n.useCallback(t=>{if(t.target!==t.currentTarget||t.propertyName!=="transform"||!u.current)return;const j=(360-(g.current%360+360)%360)%360,S=Math.floor(j/o)%b;v(S)},[v]);return e.jsxs("div",{className:"wh-wrap",children:[e.jsx("style",{children:q}),x&&e.jsx(K,{count:120,onDone:()=>f(!1)}),e.jsxs("div",{className:"wh-stage",children:[e.jsx("div",{className:"wh-pointer","aria-hidden":"true"}),e.jsx("div",{className:"wh-glow","aria-hidden":"true"}),e.jsxs("svg",{className:"wh-svg",viewBox:`0 0 ${C} ${C}`,role:"img","aria-label":"Spin the wheel",style:{transform:`rotate(${c}deg)`,transition:w?`transform ${L}s cubic-bezier(0.16, 0.84, 0.24, 1)`:"none"},onTransitionEnd:Y,children:[e.jsx("circle",{cx:l,cy:l,r:y+4,fill:"#0b0b14",stroke:"#241c30",strokeWidth:"4"}),A.map(t=>{const r=k===t.i;return e.jsxs("g",{children:[e.jsx("path",{d:t.d,fill:t.color,fillOpacity:r?.95:.32,stroke:r?"#ffffff":"#0b0b14",strokeWidth:r?2:1,style:{transition:"fill-opacity 0.4s, stroke 0.4s"}}),e.jsx("text",{x:t.label[0],y:t.label[1],fill:r?"#0b0b14":"#e8e8f0",fontSize:"13",style:{fontFamily:"var(--font-mono)"},fontWeight:r?700:500,textAnchor:"middle",dominantBaseline:"central",transform:`rotate(${t.mid} ${t.label[0]} ${t.label[1]})`,children:t.i+1})]},t.i)}),e.jsx("circle",{cx:l,cy:l,r:26,fill:"#13161c",stroke:"#2a2238",strokeWidth:"2"}),e.jsx("circle",{cx:l,cy:l,r:7,fill:"#ff4d6d"})]})]})]})}),q=`
  .wh-wrap { position: relative; z-index: 2; display: flex; justify-content: center; }
  .wh-stage {
    position: relative;
    width: min(78vw, 420px); height: min(78vw, 420px);
  }
  .wh-glow {
    position: absolute; inset: -8%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(157,107,255,0.18), transparent 68%);
    filter: blur(24px); pointer-events: none; z-index: 0;
  }
  .wh-svg {
    position: relative; z-index: 1;
    width: 100%; height: 100%;
    filter: drop-shadow(0 20px 50px rgba(0,0,0,0.45));
    transform-origin: 50% 50%;
  }
  .wh-pointer {
    position: absolute; top: -4px; left: 50%;
    transform: translateX(-50%);
    width: 0; height: 0; z-index: 3;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 26px solid #ff4d6d;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.5));
  }
`;function J({index:s,challenge:a,onSpinAgain:i,disabled:d}){const{t:c}=M();return e.jsxs("div",{className:"wr-card",role:"status","aria-live":"polite",children:[e.jsx("style",{children:Q}),e.jsxs("div",{className:"wr-badge",children:[e.jsx(N,{size:14,strokeWidth:1.7,style:{color:"#9d6bff"}}),c("wheelChallengeLabel"),typeof s=="number"&&e.jsxs("span",{className:"wr-num",children:["#",s+1]})]}),e.jsx("p",{className:"wr-text",children:a}),e.jsxs("button",{type:"button",className:"wr-again",onClick:i,disabled:d,children:[e.jsx(O,{size:16,strokeWidth:1.8})," ",c("wheelAgain")]})]})}const Q=`
  .wr-card {
    position: relative; z-index: 2;
    margin-top: 32px;
    background:
      radial-gradient(120% 90% at 50% 0%, rgba(157,107,255,0.09), transparent 62%),
      linear-gradient(160deg, rgba(18,16,28,0.88), rgba(12,12,22,0.88));
    border: 1px solid #2a2340;
    border-radius: 20px;
    padding: 32px 30px;
    text-align: center;
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 18px 50px rgba(0,0,0,0.35), inset 0 0 40px rgba(157,107,255,0.05);
    animation: wr-in 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @keyframes wr-in { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: none; } }

  .wr-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #a596c4;
    margin-bottom: 16px;
  }
  .wr-num { color: #6b7280; }

  .wr-text {
    font-family: var(--font-display);
    font-size: 30px; line-height: 1.3; color: #f0f0f6;
    letter-spacing: -0.01em; max-width: 460px; margin: 0 auto;
  }
  @media (max-width: 560px) { .wr-text { font-size: 24px; } }

  .wr-again {
    margin-top: 26px;
    display: inline-flex; align-items: center; gap: 10px;
    padding: 13px 26px; border-radius: 999px; cursor: pointer;
    border: none; color: #fff;
    font-family: var(--font-body); font-size: 15px; font-weight: 600;
    background: linear-gradient(135deg, #9d6bff, #4d96ff);
    box-shadow: 0 10px 30px rgba(157,107,255,0.34);
    transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.3s, filter 0.3s;
  }
  .wr-again:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 38px rgba(157,107,255,0.44); filter: brightness(1.06); }
  .wr-again:active:not(:disabled) { transform: translateY(0); }
  .wr-again:disabled { opacity: 0.55; cursor: default; }
  .wr-again svg { transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1); }
  .wr-again:hover:not(:disabled) svg { transform: rotate(180deg); }
`;function ae(){const{lang:s,t:a}=M(),i=n.useRef(null),[d,c]=n.useState(!1),[p,w]=n.useState(null),m=W[s]||W.en,k=n.useCallback(()=>c(!0),[]),h=n.useCallback(f=>{c(!1),w(f)},[]),x=n.useCallback(()=>{var f;return(f=i.current)==null?void 0:f.spin()},[]);return e.jsxs("div",{className:"fun-page",style:{maxWidth:z.container.maxWidth,"--fun-acc":"#9d6bff"},children:[e.jsx("style",{children:H}),e.jsx(P,{kind:"me",accent:"#9d6bff",title:a("funWheelTitle"),sub:a("wheelSub")}),e.jsx(X,{ref:i,onSpinStart:k,onLanded:h}),p===null?e.jsxs("div",{style:z.spinRow,children:[e.jsxs("button",{type:"button",className:"sw-spin",onClick:x,disabled:d,children:[e.jsx(N,{size:18,strokeWidth:1.8}),a(d?"wheelSpinning":"wheelSpin")]}),e.jsx("p",{style:z.hint,children:a("wheelHint")})]}):e.jsx(J,{index:p,challenge:m[p],onSpinAgain:x,disabled:d}),e.jsx("style",{children:`
        .sw-spin {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 16px 40px; border: none; border-radius: 14px; cursor: pointer;
          font-family: var(--font-body); font-size: 17px; font-weight: 600; color: #fff;
          background: linear-gradient(135deg, #9d6bff, #4d96ff);
          box-shadow: 0 12px 34px rgba(157,107,255,0.36);
          transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.3s, filter 0.3s;
        }
        .sw-spin:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 16px 42px rgba(157,107,255,0.46); filter: brightness(1.06); }
        .sw-spin:active:not(:disabled) { transform: translateY(0); }
        .sw-spin:disabled { opacity: 0.6; cursor: default; }
      `})]})}const z={container:{maxWidth:620},spinRow:{display:"flex",flexDirection:"column",alignItems:"center",gap:16,marginTop:36},hint:{fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.06em",color:"#6b7280"}};export{ae as default};
