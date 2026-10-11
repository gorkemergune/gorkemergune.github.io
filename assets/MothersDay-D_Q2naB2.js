import{u as p,r as d,j as e}from"./index-CVdzEOIy.js";import{F as c,b as y}from"./FunFrame-fan-QbRK.js";const f=["🌸","🌺","🌷","💐","🌹","🌻","💮","🪻","🌼"];function x({delay:o,left:n,duration:r,flower:s}){return e.jsx("div",{style:{position:"fixed",top:-60,left:`${n}%`,fontSize:28+Math.random()*16,animation:`flowerFall ${r}s linear ${o}s infinite`,pointerEvents:"none",zIndex:0,opacity:.85},children:s})}function h({top:o,side:n,flower:r,animDelay:s}){return e.jsx("div",{style:{position:"fixed",top:`${o}%`,[n]:-10,fontSize:36,animation:`sideBloom 3s ease-in-out ${s}s infinite alternate`,pointerEvents:"none",zIndex:0,opacity:.7},children:r})}function w(){const{t:o}=p(),[n,r]=d.useState([]);d.useEffect(()=>{const t=setInterval(()=>{r(i=>{const l=[...i,{id:Date.now(),x:Math.random()*100,y:Math.random()*100}];return l.length>12&&l.shift(),l})},800);return()=>clearInterval(t)},[]);const s=Array.from({length:18},(t,i)=>({delay:i*.7,left:Math.random()*100,duration:6+Math.random()*5,flower:f[i%f.length]})),m=[{top:15,side:"left",flower:"🌸",animDelay:0},{top:35,side:"left",flower:"🌷",animDelay:.5},{top:55,side:"left",flower:"🌺",animDelay:1},{top:75,side:"left",flower:"🌹",animDelay:1.5},{top:20,side:"right",flower:"🌻",animDelay:.3},{top:40,side:"right",flower:"💐",animDelay:.8},{top:60,side:"right",flower:"🪻",animDelay:1.3},{top:80,side:"right",flower:"🌼",animDelay:1.8}];return e.jsxs("div",{style:a.container,children:[e.jsx("style",{children:`
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
      `}),s.map((t,i)=>e.jsx(x,{...t},i)),m.map((t,i)=>e.jsx(h,{...t},`side-${i}`)),n.map(t=>e.jsx("div",{style:{position:"fixed",left:`${t.x}%`,top:`${t.y}%`,fontSize:18,animation:"sparkle 1.5s ease-in-out forwards",pointerEvents:"none",zIndex:0},children:"✨"},t.id)),e.jsx("style",{children:c}),e.jsx("div",{style:{position:"relative",zIndex:10,marginBottom:40},children:e.jsx(y,{})}),e.jsxs("div",{style:a.center,children:[e.jsx("div",{style:a.heartWrap,children:e.jsx("span",{style:a.bigHeart,children:"❤️"})}),e.jsx("div",{style:a.bouquet,children:"💐🌸🌷🌹🌺🌸💐"}),e.jsx("h1",{style:a.title,children:o("mothersDayTitle")}),e.jsx("p",{style:a.subtitle,children:o("mothersDaySub")}),e.jsx("div",{style:a.flowerRow,children:["🌸","🌷","🌹","🌺","🌻"].map((t,i)=>e.jsx("span",{style:{...a.flowerItem,animationDelay:`${i*.2}s`},children:t},i))}),e.jsx("div",{style:a.messageCard,children:e.jsx("p",{style:a.message,children:o("mothersDayMessage")})}),e.jsx("div",{style:a.bottomHeart,children:"🩷"})]})]})}const a={container:{maxWidth:900,margin:"0 auto",padding:"60px 48px 120px",position:"relative",zIndex:2,overflow:"hidden"},center:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",marginTop:20,position:"relative",zIndex:5},heartWrap:{marginBottom:24},bigHeart:{fontSize:80,display:"inline-block",animation:"heartPulse 1.5s ease-in-out infinite"},bouquet:{fontSize:32,letterSpacing:8,marginBottom:32},title:{fontFamily:"var(--font-display)",fontSize:52,fontWeight:400,lineHeight:1.1,letterSpacing:"-0.015em",color:"#eef0f4",marginBottom:12,animation:"textGlow 3s ease-in-out infinite"},subtitle:{fontFamily:"var(--font-body)",fontSize:26,color:"#ec4899",marginBottom:40,fontWeight:500,fontStyle:"italic"},flowerRow:{display:"flex",gap:16,marginBottom:40},flowerItem:{fontSize:36,display:"inline-block",animation:"heartPulse 2s ease-in-out infinite"},messageCard:{background:"linear-gradient(135deg, #25151f, #2a1622)",border:"1px solid #f9a8d4",borderRadius:16,padding:"32px 40px",maxWidth:500,boxShadow:"0 8px 32px rgba(236, 72, 153, 0.1)"},message:{fontFamily:"var(--font-body)",fontSize:18,lineHeight:1.7,color:"#f9a8d4",fontWeight:400},bottomHeart:{fontSize:48,marginTop:40}};export{w as default};
