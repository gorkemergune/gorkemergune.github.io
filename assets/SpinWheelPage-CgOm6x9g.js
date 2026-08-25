import{r as a,p as G,j as e,a as N,L as H}from"./index-CAdYY87m.js";import{C as P,R as J}from"./Confetti-WJZR9coh.js";import{S as T}from"./sparkles-BzNU48aL.js";import{A as _}from"./arrow-left-BCOKRcKR.js";const W={en:["Smile for 10 seconds 😊","Compliment someone today.","Send ❤️ to your favorite person.","Drink a glass of water.","Listen to your favorite song.","Take a selfie.",'Tell someone "You made my day."',"Dance for 5 seconds.","Think about your happiest memory.","Hug yourself 🤗","Call someone you miss.",'Text "Good morning" tomorrow.',"Smile at yourself in the mirror.","Watch the sunset.","Buy yourself a snack.","Laugh out loud.","Give someone a high five.","Put your phone away for 5 minutes.","Take a deep breath.",`Say "I'm awesome."`,"Share your favorite emoji.","Tell a joke.","Make someone smile.","Do one random act of kindness.","Stretch for one minute.","Look outside for a moment.","Say thank you to someone.","If you're smiling right now, challenge completed.","You deserve something nice today.","You're awesome. Never forget that."],tr:["10 saniye gülümse 😊","Bugün birine iltifat et.","Favori insanına ❤️ gönder.","Bir bardak su iç.","En sevdiğin şarkıyı dinle.","Bir selfie çek.",'Birine "Günümü güzelleştirdin" de.',"5 saniye dans et.","En mutlu anını düşün.","Kendine sarıl 🤗","Özlediğin birini ara.",'Yarın "Günaydın" mesajı at.',"Aynada kendine gülümse.","Gün batımını izle.","Kendine bir atıştırmalık al.","Kahkaha at.","Birine beşlik çak.","Telefonu 5 dakika kenara koy.","Derin bir nefes al.",'"Ben harikayım" de.',"En sevdiğin emojiyi paylaş.","Bir şaka yap.","Birini gülümset.","Bir iyilik yap.","Bir dakika esne.","Bir an dışarıya bak.","Birine teşekkür et.","Şu an gülümsüyorsan, görev tamamlandı.","Bugün güzel bir şeyi hak ediyorsun.","Sen harikasın. Bunu asla unutma."]},y=30,B=400,l=B/2,w=192,K=148,o=360/y,E=["#ff4d6d","#f472b6","#00d4ff","#9d6bff","#ffd166","#00e5a0","#4d96ff","#ff9f1c"];function C(s,t=w){const r=s*Math.PI/180;return[l+t*Math.sin(r),l-t*Math.cos(r)]}function O(s){const[t,r]=C(s*o),[d,c]=C((s+1)*o);return`M ${l} ${l} L ${t.toFixed(2)} ${r.toFixed(2)} A ${w} ${w} 0 0 1 ${d.toFixed(2)} ${c.toFixed(2)} Z`}const Z=a.forwardRef(function({onSpinStart:t,onLanded:r},d){const[c,u]=a.useState(0),[k,h]=a.useState(!1),[j,x]=a.useState(null),[g,f]=a.useState(!1),[$,I]=a.useState(0),b=a.useRef(0),m=a.useRef(!1),L=a.useMemo(()=>Array.from({length:y},(n,i)=>({i,d:O(i),color:E[i%E.length],mid:i*o+o/2,label:C(i*o+o/2,K)})),[]),M=a.useCallback(()=>{if(m.current)return;const n=G(),i=Math.floor(Math.random()*y),S=i*o+o/2,z=(Math.random()-.5)*(o-4),F=5+Math.floor(Math.random()*4),Y=b.current-b.current%360,D=((360-S-z)%360+360)%360,R=Y+F*360+D;m.current=!0,h(!0),x(null),f(!1),I(n?.35:5+Math.random()*3),b.current=R,u(R),t==null||t(),n&&window.setTimeout(()=>v(i),380)},[t]),v=a.useCallback(n=>{m.current&&(m.current=!1,h(!1),x(n),f(!0),r==null||r(n))},[r]);a.useImperativeHandle(d,()=>({spin:M,spinning:()=>m.current}),[M]);const A=a.useCallback(n=>{if(n.target!==n.currentTarget||n.propertyName!=="transform"||!m.current)return;const S=(360-(b.current%360+360)%360)%360,z=Math.floor(S/o)%y;v(z)},[v]);return e.jsxs("div",{className:"wh-wrap",children:[e.jsx("style",{children:X}),g&&e.jsx(P,{count:120,onDone:()=>f(!1)}),e.jsxs("div",{className:"wh-stage",children:[e.jsx("div",{className:"wh-pointer","aria-hidden":"true"}),e.jsx("div",{className:"wh-glow","aria-hidden":"true"}),e.jsxs("svg",{className:"wh-svg",viewBox:`0 0 ${B} ${B}`,role:"img","aria-label":"Spin the wheel",style:{transform:`rotate(${c}deg)`,transition:k?`transform ${$}s cubic-bezier(0.16, 0.84, 0.24, 1)`:"none"},onTransitionEnd:A,children:[e.jsx("circle",{cx:l,cy:l,r:w+4,fill:"#0b0b14",stroke:"#241c30",strokeWidth:"4"}),L.map(n=>{const i=j===n.i;return e.jsxs("g",{children:[e.jsx("path",{d:n.d,fill:n.color,fillOpacity:i?.95:.32,stroke:i?"#ffffff":"#0b0b14",strokeWidth:i?2:1,style:{transition:"fill-opacity 0.4s, stroke 0.4s"}}),e.jsx("text",{x:n.label[0],y:n.label[1],fill:i?"#0b0b14":"#e8e8f0",fontSize:"13",fontFamily:"'JetBrains Mono', monospace",fontWeight:i?700:500,textAnchor:"middle",dominantBaseline:"central",transform:`rotate(${n.mid} ${n.label[0]} ${n.label[1]})`,children:n.i+1})]},n.i)}),e.jsx("circle",{cx:l,cy:l,r:26,fill:"#12121f",stroke:"#2a2238",strokeWidth:"2"}),e.jsx("circle",{cx:l,cy:l,r:7,fill:"#ff4d6d"})]})]})]})}),X=`
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
`;function q({index:s,challenge:t,onSpinAgain:r,disabled:d}){const{t:c}=N();return e.jsxs("div",{className:"wr-card",role:"status","aria-live":"polite",children:[e.jsx("style",{children:Q}),e.jsxs("div",{className:"wr-badge",children:[e.jsx(T,{size:14,strokeWidth:1.7,style:{color:"#9d6bff"}}),c("wheelChallengeLabel"),typeof s=="number"&&e.jsxs("span",{className:"wr-num",children:["#",s+1]})]}),e.jsx("p",{className:"wr-text",children:t}),e.jsxs("button",{type:"button",className:"wr-again",onClick:r,disabled:d,children:[e.jsx(J,{size:16,strokeWidth:1.8})," ",c("wheelAgain")]})]})}const Q=`
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
    font-family: 'JetBrains Mono', monospace; font-size: 10px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #a596c4;
    margin-bottom: 16px;
  }
  .wr-num { color: #6a6a82; }

  .wr-text {
    font-family: 'Instrument Serif', serif;
    font-size: 30px; line-height: 1.3; color: #f0f0f6;
    letter-spacing: -0.01em; max-width: 460px; margin: 0 auto;
  }
  @media (max-width: 560px) { .wr-text { font-size: 24px; } }

  .wr-again {
    margin-top: 26px;
    display: inline-flex; align-items: center; gap: 10px;
    padding: 13px 26px; border-radius: 999px; cursor: pointer;
    border: none; color: #fff;
    font-family: 'Instrument Sans', sans-serif; font-size: 15px; font-weight: 600;
    background: linear-gradient(135deg, #9d6bff, #4d96ff);
    box-shadow: 0 10px 30px rgba(157,107,255,0.34);
    transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.3s, filter 0.3s;
  }
  .wr-again:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 38px rgba(157,107,255,0.44); filter: brightness(1.06); }
  .wr-again:active:not(:disabled) { transform: translateY(0); }
  .wr-again:disabled { opacity: 0.55; cursor: default; }
  .wr-again svg { transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1); }
  .wr-again:hover:not(:disabled) svg { transform: rotate(180deg); }
`;function te(){const{lang:s,t}=N(),r=a.useRef(null),[d,c]=a.useState(!1),[u,k]=a.useState(null),h=W[s]||W.en,j=a.useCallback(()=>c(!0),[]),x=a.useCallback(f=>{c(!1),k(f)},[]),g=a.useCallback(()=>{var f;return(f=r.current)==null?void 0:f.spin()},[]);return e.jsxs("div",{style:p.container,children:[e.jsxs(H,{to:"/fun",className:"link-hover",style:p.back,children:[e.jsx(_,{size:16,strokeWidth:1.5})," ",t("funBack")]}),e.jsxs("div",{style:p.header,children:[e.jsx("span",{className:"chip",children:t("funBadge")}),e.jsx("h1",{className:"section-title",style:p.title,children:t("funWheelTitle")}),e.jsx("p",{style:p.desc,children:t("wheelSub")})]}),e.jsx(Z,{ref:r,onSpinStart:j,onLanded:x}),u===null?e.jsxs("div",{style:p.spinRow,children:[e.jsxs("button",{type:"button",className:"sw-spin",onClick:g,disabled:d,children:[e.jsx(T,{size:18,strokeWidth:1.8}),t(d?"wheelSpinning":"wheelSpin")]}),e.jsx("p",{style:p.hint,children:t("wheelHint")})]}):e.jsx(q,{index:u,challenge:h[u],onSpinAgain:g,disabled:d}),e.jsx("style",{children:`
        .sw-spin {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 16px 40px; border: none; border-radius: 14px; cursor: pointer;
          font-family: 'Instrument Sans', sans-serif; font-size: 17px; font-weight: 600; color: #fff;
          background: linear-gradient(135deg, #9d6bff, #4d96ff);
          box-shadow: 0 12px 34px rgba(157,107,255,0.36);
          transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.3s, filter 0.3s;
        }
        .sw-spin:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 16px 42px rgba(157,107,255,0.46); filter: brightness(1.06); }
        .sw-spin:active:not(:disabled) { transform: translateY(0); }
        .sw-spin:disabled { opacity: 0.6; cursor: default; }
      `})]})}const p={container:{maxWidth:620,margin:"0 auto",padding:"60px 48px 120px",position:"relative",zIndex:2},back:{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'JetBrains Mono', monospace",fontSize:12,letterSpacing:"0.06em",color:"#5a5a70",marginBottom:48,cursor:"pointer"},header:{marginBottom:40,textAlign:"center"},title:{fontFamily:"'Instrument Serif', serif",fontSize:60,fontWeight:400,lineHeight:.95,letterSpacing:"-0.015em",color:"#e0e0e8",marginTop:20,marginBottom:16},desc:{fontFamily:"'Instrument Sans', sans-serif",fontSize:17,lineHeight:1.6,color:"#8a8aa0",maxWidth:460,margin:"0 auto"},spinRow:{display:"flex",flexDirection:"column",alignItems:"center",gap:16,marginTop:36},hint:{fontFamily:"'JetBrains Mono', monospace",fontSize:11,letterSpacing:"0.06em",color:"#6a6a82"}};export{te as default};
