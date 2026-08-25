import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, FileText } from 'lucide-react';
import useAudioFX from './useAudioFX';
import { useLang } from '../i18n.jsx';
import { FEATURES } from '../config';
import PROJECTS from '../data/projects';
import { prefersReducedMotion } from '../utils/prefersReducedMotion';

const ARMORS = PROJECTS.map((p) => ({
  mark: p.mark,
  name: p.codename,
  title: p.title,
  descEn: p.oneLiner,
  descTr: p.oneLinerTr,
  color: p.color,
  glow: p.glow,
  language: p.language,
  tags: [p.language, ...p.tags.filter((t) => t !== p.language)].slice(0, 4),
  href: `/project/${p.slug}`,
}));

const BOOT_LINES = ['bootLine1', 'bootLine2', 'bootLine3', 'bootLine4', 'bootLine5'];

// Front-facing armor figure. The body carries each project's identity colour;
// the arc reactor is always the same cyan so the whole rack reads as one system.
function ArmorFigure({ armor, uid }) {
  const id = `${armor.mark}-${uid}`.replace(/[^a-zA-Z0-9]/g, '');
  const body = `url(#body-${id})`;
  return (
    <svg viewBox="0 0 64 132" width="100%" height="100%" style={{ display: 'block' }} aria-hidden="true">
      <defs>
        <linearGradient id={`body-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={armor.color} stopOpacity="0.96" />
          <stop offset="1" stopColor={armor.color} stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id={`reactor-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#7fe9ff" />
          <stop offset="1" stopColor="#00d4ff" />
        </radialGradient>
      </defs>
      {/* legs */}
      <rect x="24" y="80" width="7.4" height="46" rx="3" fill={body} opacity="0.9" />
      <rect x="32.6" y="80" width="7.4" height="46" rx="3" fill={body} opacity="0.9" />
      {/* pelvis */}
      <path d="M23 72 L41 72 L39.5 82 L24.5 82 Z" fill={body} />
      {/* arms */}
      <path d="M18 30 L11 35 L10 62 L16 64 L19.5 42 Z" fill={body} opacity="0.82" />
      <path d="M46 30 L53 35 L54 62 L48 64 L44.5 42 Z" fill={body} opacity="0.82" />
      {/* torso */}
      <path d="M22 27 L42 27 L46 40 L41.5 73 L22.5 73 L18 40 Z" fill={body} />
      {/* chest plate seams */}
      <path d="M32 30 L32 40" stroke="#0a0a12" strokeWidth="0.8" opacity="0.35" />
      <path d="M24 34 L40 34" stroke="#0a0a12" strokeWidth="0.7" opacity="0.28" />
      {/* helmet */}
      <path d="M24 11 Q24 4 32 4 Q40 4 40 11 L40 20 Q40 25 32 26 Q24 25 24 20 Z" fill={body} />
      {/* eye slits */}
      <rect x="26.5" y="14.5" width="4" height="2.3" rx="1" fill="#eafcff" opacity="0.92" />
      <rect x="33.5" y="14.5" width="4" height="2.3" rx="1" fill="#eafcff" opacity="0.92" />
      {/* arc reactor */}
      <circle cx="32" cy="45" r="6.4" fill="#06060c" opacity="0.85" />
      <circle cx="32" cy="45" r="6.4" fill="none" stroke="#00d4ff" strokeWidth="0.8" opacity="0.55" />
      <circle cx="32" cy="45" r="3.4" fill={`url(#reactor-${id})`} />
    </svg>
  );
}

export default function HallOfArmor() {
  const { lang, t } = useLang();
  const navigate = useNavigate();
  const { playClick, playBootSound, playHover } = useAudioFX();

  const [bootPhase, setBootPhase] = useState(() => {
    try { return sessionStorage.getItem('hall_booted') ? 3 : 0; } catch { return 0; }
  });
  const [visibleLines, setVisibleLines] = useState(0);
  const bootDone = bootPhase === 3;

  // ---- Carousel state ----
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [dims, setDims] = useState({ cardW: 208, cardH: 300 });

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const offsetRef = useRef(0);
  const velRef = useRef(0);
  const hoverRef = useRef(false);
  const activeRef = useRef(0);
  const dragRef = useRef({ active: false, lastX: 0, lastT: 0, moved: 0 });
  const metricsRef = useRef({ cardW: 208, step: 224, setW: 1, vw: 1200, N: ARMORS.length });

  const DOUBLE = useMemo(() => [...ARMORS, ...ARMORS], []);

  useEffect(() => {
    if (bootPhase !== 0) return;
    playBootSound();
    const tid = setTimeout(() => setBootPhase(1), 800);
    return () => clearTimeout(tid);
  }, []);

  useEffect(() => {
    if (bootPhase !== 1) return;
    let count = 0;
    const id = setInterval(() => {
      count++;
      setVisibleLines(count);
      if (count >= BOOT_LINES.length) {
        clearInterval(id);
        setTimeout(() => setBootPhase(2), 300);
      }
    }, 240);
    return () => clearInterval(id);
  }, [bootPhase]);

  useEffect(() => {
    if (bootPhase !== 2) return;
    const tid = setTimeout(() => {
      setBootPhase(3);
      try { sessionStorage.setItem('hall_booted', '1'); } catch { /* noop */ }
    }, 800);
    return () => clearTimeout(tid);
  }, [bootPhase]);

  // ---- Carousel engine: single rAF loop, direct DOM writes (no per-frame re-render) ----
  useEffect(() => {
    const reduce = prefersReducedMotion();
    const N = ARMORS.length;
    const AUTO = reduce ? 0 : 24; // px/s, right -> left

    const measure = () => {
      const w = window.innerWidth;
      const cardW = w <= 600 ? 158 : w <= 900 ? 178 : 208;
      const cardH = w <= 600 ? 232 : w <= 900 ? 262 : 300;
      const step = cardW + 16;
      const vw = viewportRef.current?.clientWidth || w;
      metricsRef.current = { cardW, step, setW: N * step, vw, N };
      setDims({ cardW, cardH });
    };
    measure();
    window.addEventListener('resize', measure);

    const apply = () => {
      const m = metricsRef.current;
      const off = offsetRef.current;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${-off}px,0,0)`;
      const half = m.vw / 2;
      const F = Math.max(260, m.vw * 0.5);
      const cards = cardsRef.current;
      for (let j = 0; j < cards.length; j++) {
        const el = cards[j];
        if (!el) continue;
        const cx = j * m.step + m.cardW / 2 - off;
        const t = Math.min(1, Math.abs(cx - half) / F);
        el.style.transform = `scale(${(1 - t * 0.2).toFixed(4)})`;
        el.style.opacity = (1 - t * 0.5).toFixed(3);
        el.style.zIndex = String(100 - Math.round(t * 100));
      }
      const centerIdx = Math.round((off + half - m.cardW / 2) / m.step);
      const a = ((centerIdx % m.N) + m.N) % m.N;
      if (a !== activeRef.current) { activeRef.current = a; setActive(a); }
    };

    let raf;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const m = metricsRef.current;
      if (!dragRef.current.active) {
        const target = hoverRef.current ? 0 : AUTO;
        velRef.current += (target - velRef.current) * (1 - Math.exp(-dt / 0.9));
        offsetRef.current += velRef.current * dt;
      }
      if (m.setW > 0) {
        let o = offsetRef.current % m.setW;
        if (o < 0) o += m.setW;
        offsetRef.current = o;
      }
      apply();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', measure); };
  }, []);

  // ---- Pointer (mouse + touch unified) ----
  const onPointerDown = (e) => {
    dragRef.current = { active: true, lastX: e.clientX, lastT: performance.now(), moved: 0 };
    velRef.current = 0;
    setDragging(true);
    setInteracted(true);
    try { viewportRef.current.setPointerCapture(e.pointerId); } catch { /* noop */ }
  };
  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const now = performance.now();
    const dx = e.clientX - d.lastX;
    const dtt = Math.max(0.001, (now - d.lastT) / 1000);
    offsetRef.current -= dx;
    d.moved += Math.abs(dx);
    velRef.current = Math.max(-2400, Math.min(2400, -dx / dtt));
    d.lastX = e.clientX;
    d.lastT = now;
  };
  const endDrag = (e) => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;
    setDragging(false);
    try { viewportRef.current.releasePointerCapture(e.pointerId); } catch { /* noop */ }
  };
  const onEnter = (e) => { if (e.pointerType === 'mouse') hoverRef.current = true; };
  const onLeave = (e) => { if (e.pointerType === 'mouse') hoverRef.current = false; endDrag(e); };
  const onCardClick = (armor) => {
    if (dragRef.current.moved > 6) return; // it was a drag, not a click
    playClick();
    navigate(armor.href);
  };

  const marquee = t('marquee');
  const act = ARMORS[active] || ARMORS[0];

  return (
    <div className="hall-wrap" style={s.wrap}>
      <style>{`
        @keyframes led-breathe { 0%,100%{opacity:0.35;} 50%{opacity:1;} }
        @keyframes platform-rotate { from{transform:rotate(0);} to{transform:rotate(360deg);} }
        @keyframes platform-rotate-reverse { from{transform:rotate(360deg);} to{transform:rotate(0);} }
        @keyframes platform-pulse {
          0%,100%{ box-shadow:0 0 12px rgba(0,212,255,0.4),0 0 24px rgba(0,212,255,0.2); }
          50%{ box-shadow:0 0 24px rgba(0,212,255,0.7),0 0 48px rgba(0,212,255,0.35); }
        }
        @keyframes boot-blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        @keyframes scanline-move { 0%{transform:translateY(-100%);} 100%{transform:translateY(200vh);} }
        @keyframes boot-fade-out { from{opacity:1;pointer-events:all;} to{opacity:0;pointer-events:none;} }
        @keyframes floor-pulse { 0%,100%{opacity:0.4;transform:translateX(-50%) scaleX(1);} 50%{opacity:0.7;transform:translateX(-50%) scaleX(1.2);} }
        @keyframes hint-pulse { 0%,100%{opacity:0.55;} 50%{opacity:1;} }

        .armory-frame {
          position: relative; margin-top: 4px; padding: 14px 0 18px;
          border-top: 1px solid rgba(0,212,255,0.10);
          border-bottom: 1px solid rgba(0,212,255,0.10);
        }
        .armory-viewport {
          position: relative; overflow: hidden; touch-action: pan-y;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
        }
        .armory-track { display: flex; gap: 16px; align-items: center; will-change: transform; padding: 8px 0; }
        .armor-pod { flex: 0 0 auto; cursor: pointer; will-change: transform, opacity; }
        .pod-inner {
          position: relative; height: 100%;
          display: flex; flex-direction: column; align-items: center;
          padding: 12px 12px 14px; border-radius: 6px;
          background: linear-gradient(180deg, #10101d 0%, #08080f 100%);
          border: 1px solid #1a1a2e;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.2,0.8,0.2,1);
          box-shadow: inset 0 0 24px rgba(0,0,0,0.4);
        }
        .armor-pod:hover .pod-inner { transform: translateY(-6px); }
        .pod-top {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.2em;
        }
        .pod-figure { flex: 1; width: 62%; max-width: 96px; display: flex; align-items: center; justify-content: center; margin: 8px 0 4px; filter: drop-shadow(0 6px 10px rgba(0,0,0,0.5)); }
        .pod-floor { width: 66%; height: 12px; border-radius: 50%; margin-bottom: 8px; animation: floor-pulse 3s ease-in-out infinite; }
        .pod-name { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.06em; color: #d2d2e0; text-align: center; line-height: 1.35; }
        .pod-lang { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.14em; margin-top: 5px; }

        .armory-readout { max-width: 720px; margin: 26px auto 0; text-align: center; min-height: 116px; }
        .ro-line { display: flex; align-items: baseline; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .ro-mark { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.16em; }
        .ro-name { font-family: 'JetBrains Mono', monospace; font-size: 16px; letter-spacing: 0.03em; color: #e6e6f0; }
        .ro-name em { font-style: normal; color: #7a7a92; font-size: 13px; }
        .ro-desc { font-family: 'Instrument Sans', sans-serif; font-size: 14px; line-height: 1.55; color: #a6a6bc; margin: 12px auto 0; max-width: 620px; }
        .ro-bottom { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 14px; flex-wrap: wrap; }
        .ro-tags { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
        .ro-tag { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.08em; padding: 3px 7px; border-radius: 3px; }
        .ro-deploy { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.12em; padding: 6px 14px; border-radius: 4px; border: 1px solid; text-decoration: none; transition: all 0.25s; }
        .ro-deploy:hover { background: rgba(255,255,255,0.04); }

        .armory-head { text-align: center; margin-bottom: 10px; }
        .armory-kicker { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.28em; color: #00d4ff; }
        .armory-sub { font-family: 'Instrument Sans', sans-serif; font-size: 13px; color: #7a7a92; margin-top: 8px; }
        .drag-hint {
          position: absolute; left: 50%; bottom: -6px; transform: translateX(-50%);
          font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.3em; color: #4a4a60;
          pointer-events: none; transition: opacity 0.6s; z-index: 7; animation: hint-pulse 2.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .pod-floor, .drag-hint, .marquee, .holo-stage { animation: none !important; }
        }
        @media (max-width: 900px) {
          .hall-platform { width: 180px !important; height: 180px !important; }
          .hall-name { font-size: 64px !important; }
        }
        @media (max-width: 600px) {
          .hall-platform { width: 140px !important; height: 140px !important; }
          .hall-name { font-size: 36px !important; letter-spacing: 0.04em !important; }
          .hall-status-bar { flex-direction: column !important; gap: 6px !important; align-items: flex-start !important; }
          .hall-wrap { padding: 40px 16px 32px !important; }
          .ro-name { font-size: 14px !important; }
          .armory-readout { min-height: 132px !important; }
        }
      `}</style>

      {/* BOOT OVERLAY */}
      {!bootDone && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: '#000',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          animation: bootPhase === 2 ? 'boot-fade-out 0.8s ease forwards' : 'none',
        }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)',
            animation: 'scanline-move 2s linear infinite',
            pointerEvents: 'none',
          }} />
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: '#00d4ff', fontSize: 13, letterSpacing: '0.15em', textAlign: 'left', maxWidth: 440, width: '100%', padding: '0 24px' }}>
            {bootPhase === 0 && (
              <span style={{ animation: 'boot-blink 1s step-end infinite' }}>
                {t('hallInit')}
              </span>
            )}
            {bootPhase >= 1 && BOOT_LINES.slice(0, visibleLines).map((key, i) => (
              <div key={i} style={{ marginBottom: 10, color: i === visibleLines - 1 ? '#00d4ff' : '#3a3a50' }}>
                <span style={{ color: '#ff6b35', marginRight: 8 }}>&gt;</span>
                {t(key)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STATUS BAR */}
      <div className="hall-status-bar" style={s.statusBar}>
        <span style={s.statusLeft}>
          STARK INDUSTRIES <span style={{ color: '#2a2a40', margin: '0 6px' }}>//</span>
          {t('hallStatusLeft')}
        </span>
        <span style={s.statusCenter}>{t('hallStatusCenter')}</span>
        <span style={{
          display: 'inline-block', padding: '3px 10px',
          border: '1px solid rgba(0,212,255,0.2)', borderRadius: 999,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em',
          color: '#00d4ff', background: 'rgba(0,212,255,0.06)',
        }}>
          {t('sysOnline')}
        </span>
      </div>

      {/* NAME */}
      <div style={s.nameWrap}>
        <h1 className="hall-name" style={s.name}>
          GORKEM <span style={{ color: '#00d4ff', textShadow: '0 0 30px rgba(0,212,255,0.4)' }}>ERGUNE</span>
        </h1>
        <div className="hall-tagline" style={s.taglineChip}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
          {t('heroTagline')}
        </div>
        <p className="hall-subtext" style={s.heroSub}>{t('heroSubtext')}</p>
        <div className="hall-ctas" style={s.heroCtas}>
          <Link to="/project" className="hero-btn hero-btn-primary" onClick={playClick}>
            {t('ctaViewWork')} <ArrowUpRight size={15} strokeWidth={1.5} />
          </Link>
          {FEATURES.resume && (
            <Link to="/resume" className="hero-btn" onClick={playClick}>
              <FileText size={15} strokeWidth={1.5} /> {t('ctaResume')}
            </Link>
          )}
        </div>
      </div>

      {/* PLATFORM — arc reactor */}
      <div style={s.platformWrap}>
        <div className="hall-platform" style={s.platform}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '1px solid rgba(0,212,255,0.18)',
            animation: 'platform-rotate 20s linear infinite',
          }}>
            <div style={{ position: 'absolute', top: -4, left: '50%', width: 8, height: 8, borderRadius: '50%', background: '#00d4ff', transform: 'translateX(-50%)', boxShadow: '0 0 10px #00d4ff' }} />
          </div>
          <div style={{
            position: 'absolute', inset: 22, borderRadius: '50%',
            border: '1px solid rgba(255,107,53,0.22)',
            animation: 'platform-rotate-reverse 13s linear infinite',
          }}>
            <div style={{ position: 'absolute', top: -3, left: '50%', width: 6, height: 6, borderRadius: '50%', background: '#ff6b35', transform: 'translateX(-50%)', boxShadow: '0 0 8px #ff6b35' }} />
          </div>
          <div style={{
            position: 'absolute', inset: 48, borderRadius: '50%',
            border: '1px solid rgba(0,212,255,0.10)',
            animation: 'platform-rotate 8s linear infinite',
          }} />
          <div style={{
            position: 'absolute', inset: 72, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.18) 0%, rgba(0,212,255,0.04) 60%, transparent 100%)',
            animation: 'platform-pulse 3s ease-in-out infinite',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 16px #00d4ff, 0 0 32px rgba(0,212,255,0.4)' }} />
          </div>
          <div style={{ position: 'absolute', bottom: -32, left: '50%', transform: 'translateX(-50%)', fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '0.22em', color: '#3a3a50', whiteSpace: 'nowrap' }}>
            {t('hallPlatformLabel')}
          </div>
        </div>
      </div>

      {/* ARMOR COLLECTION — infinite carousel */}
      <div className="armory-head">
        <div className="armory-kicker">{t('hallCollection')} <span style={{ color: '#2a2a40' }}>//</span> {String(ARMORS.length).padStart(2, '0')} {t('hallBuilds')}</div>
        <div className="armory-sub">{t('hallCollectionSub')}</div>
      </div>

      <div className="armory-frame">
        {/* center spotlight in the active armor's colour */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: '50%', width: 260,
          transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(ellipse 60% 70% at 50% 45%, ${act.color}14 0%, transparent 70%)`,
          transition: 'background 0.6s ease',
        }} />
        {/* edge fades over the frame border */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 40, zIndex: 6, pointerEvents: 'none', background: 'linear-gradient(90deg, #0a0a0f, transparent)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 40, zIndex: 6, pointerEvents: 'none', background: 'linear-gradient(270deg, #0a0a0f, transparent)' }} />

        <div
          ref={viewportRef}
          className="armory-viewport"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerEnter={onEnter}
          onPointerLeave={onLeave}
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        >
          <div ref={trackRef} className="armory-track">
            {DOUBLE.map((armor, j) => (
              <div
                key={j}
                ref={(el) => { cardsRef.current[j] = el; }}
                className="armor-pod"
                style={{ width: dims.cardW, height: dims.cardH }}
                onClick={() => onCardClick(armor)}
                onPointerEnter={() => { if (!dragRef.current.active) playHover(); }}
              >
                <div className="pod-inner">
                  {/* top LED + mark */}
                  <div className="pod-top">
                    <span style={{ color: armor.color, opacity: 0.9 }}>{armor.mark}</span>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%', background: armor.color,
                      boxShadow: `0 0 6px ${armor.glow}`, animation: `led-breathe ${2.4 + (j % 6) * 0.3}s ease-in-out infinite`,
                    }} />
                  </div>
                  <div className="pod-figure">
                    <ArmorFigure armor={armor} uid={j} />
                  </div>
                  <div className="pod-floor" style={{ background: `radial-gradient(ellipse, ${armor.color}66 0%, transparent 70%)` }} />
                  <div className="pod-name">{armor.name}</div>
                  <div className="pod-lang" style={{ color: armor.color, opacity: 0.85 }}>{armor.language}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="drag-hint" style={{ opacity: interacted ? 0 : 1 }}>
          &larr;&nbsp;&nbsp;{t('hallDrag')}&nbsp;&nbsp;&rarr;
        </div>
      </div>

      {/* ACTIVE ARMOR READOUT */}
      <div className="armory-readout">
        <div className="ro-line">
          <span className="ro-mark" style={{ color: act.color }}>{act.mark}</span>
          <span className="ro-name">{act.name} <em>— {act.title}</em></span>
        </div>
        <p className="ro-desc">{lang === 'tr' && act.descTr ? act.descTr : act.descEn}</p>
        <div className="ro-bottom">
          <div className="ro-tags">
            {act.tags.map((tag) => (
              <span key={tag} className="ro-tag" style={{ color: act.color, border: `1px solid ${act.color}44`, background: `${act.color}0e` }}>{tag}</span>
            ))}
          </div>
          <Link to={act.href} className="ro-deploy" style={{ color: act.color, borderColor: `${act.color}66` }} onClick={playClick}>
            {t('hallDeploy')} &rarr;
          </Link>
        </div>
      </div>

      {/* MARQUEE */}
      <div style={{ marginTop: 56 }}>
        <div className="hairline" style={{ marginBottom: 40 }} />
        <div className="marquee-wrap">
          <div className="marquee">
            {[...Array(2)].map((_, k) => (
              <div key={k} style={{ display: 'flex', gap: 48, fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#4a4a60' }}>
                {Array.isArray(marquee) && marquee.map((item, i) => (
                  <span key={i}>
                    <span style={i % 2 === 1 ? { fontStyle: 'italic' } : {}}>{item}</span>
                    {i < marquee.length - 1 && <span style={{ margin: '0 0 0 48px' }}>&middot;</span>}
                  </span>
                ))}
                <span>&middot;</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrap: {
    padding: '60px 48px 40px',
    maxWidth: 1400, margin: '0 auto',
    position: 'relative',
  },
  statusBar: {
    display: 'flex', alignItems: 'center', gap: 16,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
    letterSpacing: '0.14em', color: '#4a4a60',
    marginBottom: 48, flexWrap: 'wrap',
  },
  statusLeft: { color: '#6a6a80', letterSpacing: '0.12em' },
  statusCenter: { flex: 1, textAlign: 'center', color: '#3a3a50' },
  nameWrap: { textAlign: 'center', marginBottom: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' },
  name: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 88, fontWeight: 500,
    letterSpacing: '0.08em', color: '#e0e0e8',
    lineHeight: 1, margin: 0,
  },
  taglineChip: {
    display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 24,
    padding: '7px 16px', border: '1px solid rgba(0,212,255,0.25)', borderRadius: 999,
    background: 'rgba(0,212,255,0.05)', fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12, letterSpacing: '0.18em', color: '#bfe9ff',
  },
  heroSub: {
    marginTop: 22, maxWidth: 620, fontFamily: "'Instrument Sans', sans-serif",
    fontSize: 18, lineHeight: 1.6, color: '#a8a8be',
  },
  heroCtas: { marginTop: 30, display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' },
  platformWrap: {
    display: 'flex', justifyContent: 'center',
    marginBottom: 52, paddingBottom: 30,
  },
  platform: {
    width: 200, height: 200,
    position: 'relative',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
};
