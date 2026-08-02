import{a as c,r as f,j as e,L as p}from"./index-CWNF-EP0.js";import{A as x}from"./arrow-left-Bcccawez.js";const d=["🌸","🌺","🌷","💐","🌹","🌻","💮","🪻","🌼"];function y({delay:n,left:o,duration:r,flower:s}){return e.jsx("div",{style:{position:"fixed",top:-60,left:`${o}%`,fontSize:28+Math.random()*16,animation:`flowerFall ${r}s linear ${n}s infinite`,pointerEvents:"none",zIndex:0,opacity:.85},children:s})}function h({top:n,side:o,flower:r,animDelay:s}){return e.jsx("div",{style:{position:"fixed",top:`${n}%`,[o]:-10,fontSize:36,animation:`sideBloom 3s ease-in-out ${s}s infinite alternate`,pointerEvents:"none",zIndex:0,opacity:.7},children:r})}function w(){const{t:n}=c(),[o,r]=f.useState([]);f.useEffect(()=>{const a=setInterval(()=>{r(i=>{const l=[...i,{id:Date.now(),x:Math.random()*100,y:Math.random()*100}];return l.length>12&&l.shift(),l})},800);return()=>clearInterval(a)},[]);const s=Array.from({length:18},(a,i)=>({delay:i*.7,left:Math.random()*100,duration:6+Math.random()*5,flower:d[i%d.length]})),m=[{top:15,side:"left",flower:"🌸",animDelay:0},{top:35,side:"left",flower:"🌷",animDelay:.5},{top:55,side:"left",flower:"🌺",animDelay:1},{top:75,side:"left",flower:"🌹",animDelay:1.5},{top:20,side:"right",flower:"🌻",animDelay:.3},{top:40,side:"right",flower:"💐",animDelay:.8},{top:60,side:"right",flower:"🪻",animDelay:1.3},{top:80,side:"right",flower:"🌼",animDelay:1.8}];return e.jsxs("div",{style:t.container,children:[e.jsx("style",{children:`
        @keyframes flowerFall {
          0% { transform: translateY(-60px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.85; }
          90% { opacity: 0.85; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes sideBloom {
          0% { transform: translateX(0) scale(0.8); opacity: 0.4; }
          100% { transform: translateX(20px) scale(1.2); opacity: 0.9; }
        }
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
          50% { text-shadow: 0 0 40px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.3); }
        }
      `}),s.map((a,i)=>e.jsx(y,{...a},i)),m.map((a,i)=>e.jsx(h,{...a},`side-${i}`)),o.map(a=>e.jsx("div",{style:{position:"fixed",left:`${a.x}%`,top:`${a.y}%`,fontSize:18,animation:"sparkle 1.5s ease-in-out forwards",pointerEvents:"none",zIndex:0},children:"✨"},a.id)),e.jsxs(p,{to:"/fun",className:"link-hover",style:t.back,children:[e.jsx(x,{size:16,strokeWidth:1.5})," ",n("funBack")]}),e.jsxs("div",{style:t.center,children:[e.jsx("div",{style:t.heartWrap,children:e.jsx("span",{style:t.bigHeart,children:"❤️"})}),e.jsx("div",{style:t.bouquet,children:"💐🌸🌷🌹🌺🌸💐"}),e.jsx("h1",{style:t.title,children:n("mothersDayTitle")}),e.jsx("p",{style:t.subtitle,children:n("mothersDaySub")}),e.jsx("div",{style:t.flowerRow,children:["🌸","🌷","🌹","🌺","🌻"].map((a,i)=>e.jsx("span",{style:{...t.flowerItem,animationDelay:`${i*.2}s`},children:a},i))}),e.jsx("div",{style:t.messageCard,children:e.jsx("p",{style:t.message,children:n("mothersDayMessage")})}),e.jsx("div",{style:t.bottomHeart,children:"🩷"})]})]})}const t={container:{maxWidth:900,margin:"0 auto",padding:"60px 48px 120px",position:"relative",zIndex:2,overflow:"hidden"},back:{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'JetBrains Mono', monospace",fontSize:12,letterSpacing:"0.06em",color:"#6b6a66",marginBottom:60,cursor:"pointer",position:"relative",zIndex:10},center:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",marginTop:20,position:"relative",zIndex:5},heartWrap:{marginBottom:24},bigHeart:{fontSize:80,display:"inline-block",animation:"heartPulse 1.5s ease-in-out infinite"},bouquet:{fontSize:32,letterSpacing:8,marginBottom:32},title:{fontFamily:"'Instrument Serif', serif",fontSize:52,fontWeight:400,lineHeight:1.1,letterSpacing:"-0.015em",color:"#1a1a1a",marginBottom:12,animation:"textGlow 3s ease-in-out infinite"},subtitle:{fontFamily:"'Instrument Sans', sans-serif",fontSize:26,color:"#ec4899",marginBottom:40,fontWeight:500,fontStyle:"italic"},flowerRow:{display:"flex",gap:16,marginBottom:40},flowerItem:{fontSize:36,display:"inline-block",animation:"heartPulse 2s ease-in-out infinite"},messageCard:{background:"linear-gradient(135deg, #fdf2f8, #fce7f3)",border:"1px solid #f9a8d4",borderRadius:16,padding:"32px 40px",maxWidth:500,boxShadow:"0 8px 32px rgba(236, 72, 153, 0.1)"},message:{fontFamily:"'Instrument Sans', sans-serif",fontSize:18,lineHeight:1.7,color:"#831843",fontWeight:400},bottomHeart:{fontSize:48,marginTop:40}};export{w as default};
