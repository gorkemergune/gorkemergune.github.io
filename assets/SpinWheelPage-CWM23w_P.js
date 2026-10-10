import{r as n,j as e,u as $,S as M,L as H}from"./index-Ba8y5e9c.js";import{p as P,C as _,R as K}from"./Confetti-RnUsoTJP.js";import{A as O}from"./arrow-left-D8Am7ypV.js";const E={en:["Smile for 10 seconds 😊","Compliment someone today.","Send ❤️ to your favorite person.","Drink a glass of water.","Listen to your favorite song.","Take a selfie.",'Tell someone "You made my day."',"Dance for 5 seconds.","Think about your happiest memory.","Hug yourself 🤗","Call someone you miss.",'Text "Good morning" tomorrow.',"Smile at yourself in the mirror.","Watch the sunset.","Buy yourself a snack.","Laugh out loud.","Give someone a high five.","Put your phone away for 5 minutes.","Take a deep breath.",`Say "I'm awesome."`,"Share your favorite emoji.","Tell a joke.","Make someone smile.","Do one random act of kindness.","Stretch for one minute.","Look outside for a moment.","Say thank you to someone.","If you're smiling right now, challenge completed.","You deserve something nice today.","You're awesome. Never forget that."],tr:["10 saniye gülümse 😊","Bugün birine iltifat et.","Favori insanına ❤️ gönder.","Bir bardak su iç.","En sevdiğin şarkıyı dinle.","Bir selfie çek.",'Birine "Günümü güzelleştirdin" de.',"5 saniye dans et.","En mutlu anını düşün.","Kendine sarıl 🤗","Özlediğin birini ara.",'Yarın "Günaydın" mesajı at.',"Aynada kendine gülümse.","Gün batımını izle.","Kendine bir atıştırmalık al.","Kahkaha at.","Birine beşlik çak.","Telefonu 5 dakika kenara koy.","Derin bir nefes al.",'"Ben harikayım" de.',"En sevdiğin emojiyi paylaş.","Bir şaka yap.","Birini gülümset.","Bir iyilik yap.","Bir dakika esne.","Bir an dışarıya bak.","Birine teşekkür et.","Şu an gülümsüyorsan, görev tamamlandı.","Bugün güzel bir şeyi hak ediyorsun.","Sen harikasın. Bunu asla unutma."]},y=30,B=400,l=B/2,w=192,Z=148,o=360/y,N=["#ff4d6d","#f472b6","#00f0ff","#9d6bff","#ffd166","#00e5a0","#4d96ff","#ff9f1c"];function C(s,a=w){const i=s*Math.PI/180;return[l+a*Math.sin(i),l-a*Math.cos(i)]}function X(s){const[a,i]=C(s*o),[d,c]=C((s+1)*o);return`M ${l} ${l} L ${a.toFixed(2)} ${i.toFixed(2)} A ${w} ${w} 0 0 1 ${d.toFixed(2)} ${c.toFixed(2)} Z`}const q=n.forwardRef(function({onSpinStart:a,onLanded:i},d){const[c,m]=n.useState(0),[k,h]=n.useState(!1),[v,x]=n.useState(null),[g,f]=n.useState(!1),[L,A]=n.useState(0),b=n.useRef(0),u=n.useRef(!1),R=n.useRef(null);n.useEffect(()=>()=>clearTimeout(R.current),[]);const F=n.useMemo(()=>Array.from({length:y},(t,r)=>({i:r,d:X(r),color:N[r%N.length],mid:r*o+o/2,label:C(r*o+o/2,Z)})),[]),T=n.useCallback(()=>{if(u.current)return;const t=P(),r=Math.floor(Math.random()*y),S=r*o+o/2,z=(Math.random()-.5)*(o-4),Y=5+Math.floor(Math.random()*4),D=b.current-b.current%360,G=((360-S-z)%360+360)%360,W=D+Y*360+G;u.current=!0,h(!0),x(null),f(!1),A(t?.35:5+Math.random()*3),b.current=W,m(W),a==null||a(),t&&(R.current=window.setTimeout(()=>j(r),380))},[a]),j=n.useCallback(t=>{u.current&&(u.current=!1,h(!1),x(t),f(!0),i==null||i(t))},[i]);n.useImperativeHandle(d,()=>({spin:T,spinning:()=>u.current}),[T]);const I=n.useCallback(t=>{if(t.target!==t.currentTarget||t.propertyName!=="transform"||!u.current)return;const S=(360-(b.current%360+360)%360)%360,z=Math.floor(S/o)%y;j(z)},[j]);return e.jsxs("div",{className:"wh-wrap",children:[e.jsx("style",{children:J}),g&&e.jsx(_,{count:120,onDone:()=>f(!1)}),e.jsxs("div",{className:"wh-stage",children:[e.jsx("div",{className:"wh-pointer","aria-hidden":"true"}),e.jsx("div",{className:"wh-glow","aria-hidden":"true"}),e.jsxs("svg",{className:"wh-svg",viewBox:`0 0 ${B} ${B}`,role:"img","aria-label":"Spin the wheel",style:{transform:`rotate(${c}deg)`,transition:k?`transform ${L}s cubic-bezier(0.16, 0.84, 0.24, 1)`:"none"},onTransitionEnd:I,children:[e.jsx("circle",{cx:l,cy:l,r:w+4,fill:"#0b0b14",stroke:"#241c30",strokeWidth:"4"}),F.map(t=>{const r=v===t.i;return e.jsxs("g",{children:[e.jsx("path",{d:t.d,fill:t.color,fillOpacity:r?.95:.32,stroke:r?"#ffffff":"#0b0b14",strokeWidth:r?2:1,style:{transition:"fill-opacity 0.4s, stroke 0.4s"}}),e.jsx("text",{x:t.label[0],y:t.label[1],fill:r?"#0b0b14":"#e8e8f0",fontSize:"13",style:{fontFamily:"var(--font-mono)"},fontWeight:r?700:500,textAnchor:"middle",dominantBaseline:"central",transform:`rotate(${t.mid} ${t.label[0]} ${t.label[1]})`,children:t.i+1})]},t.i)}),e.jsx("circle",{cx:l,cy:l,r:26,fill:"#13161c",stroke:"#2a2238",strokeWidth:"2"}),e.jsx("circle",{cx:l,cy:l,r:7,fill:"#ff4d6d"})]})]})]})}),J=`
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
`;function Q({index:s,challenge:a,onSpinAgain:i,disabled:d}){const{t:c}=$();return e.jsxs("div",{className:"wr-card",role:"status","aria-live":"polite",children:[e.jsx("style",{children:U}),e.jsxs("div",{className:"wr-badge",children:[e.jsx(M,{size:14,strokeWidth:1.7,style:{color:"#9d6bff"}}),c("wheelChallengeLabel"),typeof s=="number"&&e.jsxs("span",{className:"wr-num",children:["#",s+1]})]}),e.jsx("p",{className:"wr-text",children:a}),e.jsxs("button",{type:"button",className:"wr-again",onClick:i,disabled:d,children:[e.jsx(K,{size:16,strokeWidth:1.8})," ",c("wheelAgain")]})]})}const U=`
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
`;function ne(){const{lang:s,t:a}=$(),i=n.useRef(null),[d,c]=n.useState(!1),[m,k]=n.useState(null),h=E[s]||E.en,v=n.useCallback(()=>c(!0),[]),x=n.useCallback(f=>{c(!1),k(f)},[]),g=n.useCallback(()=>{var f;return(f=i.current)==null?void 0:f.spin()},[]);return e.jsxs("div",{style:p.container,children:[e.jsxs(H,{to:"/fun",className:"link-hover",style:p.back,children:[e.jsx(O,{size:16,strokeWidth:1.5})," ",a("funBack")]}),e.jsxs("div",{style:p.header,children:[e.jsx("span",{className:"chip",children:a("funBadge")}),e.jsx("h1",{className:"section-title",style:p.title,children:a("funWheelTitle")}),e.jsx("p",{style:p.desc,children:a("wheelSub")})]}),e.jsx(q,{ref:i,onSpinStart:v,onLanded:x}),m===null?e.jsxs("div",{style:p.spinRow,children:[e.jsxs("button",{type:"button",className:"sw-spin",onClick:g,disabled:d,children:[e.jsx(M,{size:18,strokeWidth:1.8}),a(d?"wheelSpinning":"wheelSpin")]}),e.jsx("p",{style:p.hint,children:a("wheelHint")})]}):e.jsx(Q,{index:m,challenge:h[m],onSpinAgain:g,disabled:d}),e.jsx("style",{children:`
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
      `})]})}const p={container:{maxWidth:620,margin:"0 auto",padding:"60px 48px 120px",position:"relative",zIndex:2},back:{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--font-mono)",fontSize:12,letterSpacing:"0.06em",color:"#5c6370",marginBottom:48,cursor:"pointer"},header:{marginBottom:40,textAlign:"center"},title:{fontFamily:"var(--font-display)",fontSize:60,fontWeight:400,lineHeight:.95,letterSpacing:"-0.015em",color:"#e0e0e8",marginTop:20,marginBottom:16},desc:{fontFamily:"var(--font-body)",fontSize:17,lineHeight:1.6,color:"#8b929e",maxWidth:460,margin:"0 auto"},spinRow:{display:"flex",flexDirection:"column",alignItems:"center",gap:16,marginTop:36},hint:{fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.06em",color:"#6b7280"}};export{ne as default};
