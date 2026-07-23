import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, FileText } from 'lucide-react';
import useAudioFX from './useAudioFX';
import { useLang } from '../i18n.jsx';
import { FEATURES } from '../config';
import PROJECTS from '../data/projects';

const ARMORS = PROJECTS.map((p) => ({
  mark: p.mark,
  name: p.codename,
  descEn: p.oneLiner,
  descTr: p.oneLinerTr,
  color: p.color,
  glow: p.glow,
  tags: [p.language, ...p.tags.filter((t) => t !== p.language)].slice(0, 4),
  href: `/project/${p.slug}`,
}));

const BOOT_LINES = ['bootLine1', 'bootLine2', 'bootLine3', 'bootLine4', 'bootLine5'];

export default function HallOfArmor() {
  const { lang, t } = useLang();
  const navigate = useNavigate();
  const { playClick, playBootSound, playHover } = useAudioFX();
  const [hoveredCapsule, setHoveredCapsule] = useState(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [bootPhase, setBootPhase] = useState(() => {
    try { return sessionStorage.getItem('hall_booted') ? 3 : 0; } catch { return 0; }
  });
  const [visibleLines, setVisibleLines] = useState(0);
  const bootDone = bootPhase === 3;

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

  const marquee = t('marquee');

  return (
    <div style={s.wrap}>
      <style>{`
        @keyframes led-breathe {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        @keyframes platform-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes platform-rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes platform-pulse {
          0%, 100% { box-shadow: 0 0 12px rgba(0,212,255,0.4), 0 0 24px rgba(0,212,255,0.2); }
          50% { box-shadow: 0 0 24px rgba(0,212,255,0.7), 0 0 48px rgba(0,212,255,0.35); }
        }
        @keyframes capsule-rise {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hud-scan {
          0% { top: 0%; opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes boot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scanline-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200vh); }
        }
        @keyframes boot-fade-out {
          from { opacity: 1; pointer-events: all; }
          to { opacity: 0; pointer-events: none; }
        }
        @keyframes holo-spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes holo-floor {
          0%, 100% { opacity: 0.35; transform: translateX(-50%) scaleX(1); }
          50% { opacity: 0.7; transform: translateX(-50%) scaleX(1.25); }
        }
        @media (prefers-reduced-motion: reduce) {
          .holo-stage { animation: none !important; }
        }
        @media (max-width: 900px) {
          .hall-capsules { flex-wrap: wrap !important; justify-content: center !important; }
          .capsule-item { width: calc(33.333% - 10px) !important; min-width: 130px !important; max-width: none !important; }
          .hall-platform { width: 180px !important; height: 180px !important; }
          .hall-name { font-size: 64px !important; }
        }
        @media (max-width: 600px) {
          .hall-capsules { flex-direction: column !important; align-items: stretch !important; gap: 8px !important; }
          .capsule-item { width: 100% !important; min-width: unset !important; flex-direction: row !important; }
          .capsule-body-inner { flex-direction: row !important; min-height: 72px !important; padding: 10px 14px !important; align-items: center !important; gap: 12px !important; }
          .capsule-silhouette { display: none !important; }
          .capsule-led-bar { height: 3px !important; width: 100% !important; }
          .hall-platform { width: 140px !important; height: 140px !important; }
          .hall-name { font-size: 36px !important; letter-spacing: 0.04em !important; }
          .hall-status-bar { flex-direction: column !important; gap: 6px !important; align-items: flex-start !important; }
          .hall-wrap { padding: 40px 16px 32px !important; }
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
          {/* Résumé CTA temporarily disabled via FEATURES.resume — flip in src/config.js to restore */}
          {FEATURES.resume && (
            <Link to="/resume" className="hero-btn" onClick={playClick}>
              <FileText size={15} strokeWidth={1.5} /> {t('ctaResume')}
            </Link>
          )}
        </div>
      </div>

      {/* PLATFORM */}
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

      {/* CAPSULES */}
      <div className="hall-capsules" style={s.capsules}>
        {ARMORS.map((armor, i) => (
          <div
            key={armor.mark}
            className="capsule-item"
            style={{
              ...s.capsuleItem,
              animation: bootDone ? `capsule-rise 0.7s cubic-bezier(0.2,0.8,0.2,1) ${i * 0.1}s both` : 'none',
            }}
            onMouseEnter={() => { setHoveredCapsule(i); playHover(); }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              setTilt({ rx: -py * 14, ry: px * 14 });
            }}
            onMouseLeave={() => { setHoveredCapsule(null); setTilt({ rx: 0, ry: 0 }); }}
            onClick={() => { playClick(); navigate(armor.href); }}
          >
            {/* LED strip */}
            <div className="capsule-led-bar" style={{
              height: 2, width: '100%', borderRadius: 1,
              background: `linear-gradient(90deg, transparent 0%, ${armor.color} 30%, ${armor.color} 70%, transparent 100%)`,
              boxShadow: `0 0 8px ${armor.glow}`,
              animation: `led-breathe ${2.2 + i * 0.35}s ease-in-out ${i * 0.28}s infinite`,
              marginBottom: 2,
            }} />

            {/* Glass panel */}
            <div className="capsule-body-inner" style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', padding: '14px 10px 12px',
              background: 'linear-gradient(180deg, #0f0f1a 0%, #080810 100%)',
              border: `1px solid ${hoveredCapsule === i ? armor.color : '#1a1a2e'}`,
              borderRadius: 4,
              minHeight: 290,
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.25s cubic-bezier(0.2,0.8,0.2,1)',
              transform: hoveredCapsule === i
                ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(22px) scale(1.05)`
                : 'rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)',
              boxShadow: hoveredCapsule === i
                ? `0 18px 40px rgba(0,0,0,0.55), 0 0 24px ${armor.glow}, inset 0 0 24px rgba(0,0,0,0.4)`
                : 'inset 0 0 20px rgba(0,0,0,0.3)',
            }}>
              {/* Mark badge */}
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: armor.color, alignSelf: 'flex-start', opacity: 0.85 }}>
                {armor.mark}
              </div>

              {/* Armor silhouette — holographic 3D turntable (solid box prism, always spinning) */}
              <div className="capsule-silhouette" style={{ margin: '16px 0 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', perspective: 480, transform: 'translateZ(30px)' }}>
                <div className="holo-stage" style={{
                  position: 'relative', width: 58, height: 116,
                  transformStyle: 'preserve-3d',
                  animation: `holo-spin ${16 + i * 0.6}s linear infinite`,
                }}>
                  {[
                    { deg: 0, z: 22, op: 1 },
                    { deg: 90, z: 22, op: 0.62 },
                    { deg: 180, z: 22, op: 0.85 },
                    { deg: 270, z: 22, op: 0.62 },
                  ].map(({ deg, z, op }) => (
                    <svg key={deg} viewBox="0 0 40 80" width="58" height="116" style={{
                      position: 'absolute', inset: 0,
                      transform: `rotateY(${deg}deg) translateZ(${z}px)`,
                      backfaceVisibility: 'hidden',
                      opacity: (hoveredCapsule === i ? Math.min(1, op + 0.15) : op),
                      transition: 'opacity 0.3s',
                      filter: hoveredCapsule === i
                        ? `drop-shadow(0 0 8px ${armor.glow})`
                        : `drop-shadow(0 0 3px ${armor.glow})`,
                    }}>
                      <defs>
                        <linearGradient id={`armorFill-${armor.mark.replace(/\s/g, '')}-${deg}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor={armor.color} stopOpacity="0.95" />
                          <stop offset="1" stopColor={armor.color} stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                      {(() => {
                        const fill = `url(#armorFill-${armor.mark.replace(/\s/g, '')}-${deg})`;
                        return (
                          <>
                            <rect x="14" y="1" width="12" height="10" rx="2" fill={fill} />
                            <rect x="10" y="11" width="20" height="26" rx="3" fill={fill} />
                            <rect x="2" y="13" width="8" height="16" rx="2" fill={armor.color} opacity="0.7" />
                            <rect x="30" y="13" width="8" height="16" rx="2" fill={armor.color} opacity="0.7" />
                            <rect x="12" y="37" width="7" height="28" rx="2" fill={armor.color} opacity="0.85" />
                            <rect x="21" y="37" width="7" height="28" rx="2" fill={armor.color} opacity="0.85" />
                            <ellipse cx="20" cy="23" rx="4.4" ry="4.4" fill="rgba(10,10,15,0.7)" />
                            <ellipse cx="20" cy="23" rx="2.2" ry="2.2" fill="#eafcff" opacity="0.95" />
                          </>
                        );
                      })()}
                    </svg>
                  ))}
                </div>
                {/* hologram floor */}
                <div style={{
                  position: 'relative', width: 64, height: 12, marginTop: 8,
                }}>
                  <div style={{
                    position: 'absolute', left: '50%', top: 0, width: 64, height: 12,
                    transform: 'translateX(-50%)',
                    borderRadius: '50%',
                    background: `radial-gradient(ellipse, ${armor.color}66 0%, transparent 70%)`,
                    animation: `holo-floor ${2.4 + i * 0.2}s ease-in-out infinite`,
                  }} />
                </div>
              </div>

              {/* Armor name */}
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.08em', color: '#c0c0d0', textAlign: 'center', lineHeight: 1.4, marginTop: 'auto' }}>
                {armor.name}
              </div>

              {/* HUD overlay on hover */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(8,8,16,0.93)',
                border: `1px solid ${armor.color}`,
                borderRadius: 4, padding: '10px 10px 8px',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
                opacity: hoveredCapsule === i ? 1 : 0,
                transform: hoveredCapsule === i ? 'translateY(0) translateZ(34px)' : 'translateY(6px) translateZ(0)',
                transition: 'opacity 0.25s, transform 0.25s',
                pointerEvents: hoveredCapsule === i ? 'auto' : 'none',
              }}>
                {/* Scan line */}
                <div style={{
                  position: 'absolute', left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${armor.color}88, transparent)`,
                  animation: 'hud-scan 2s linear infinite',
                  pointerEvents: 'none',
                }} />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: armor.color, letterSpacing: '0.14em', marginBottom: 6 }}>
                  {armor.mark} // {lang === 'tr' ? 'ÇEVRİMİÇİ' : 'ONLINE'}
                </div>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 10, color: '#b0b0c0', lineHeight: 1.45, marginBottom: 8, flex: 1, overflow: 'hidden' }}>
                  {lang === 'tr' && armor.descTr ? armor.descTr : armor.descEn}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 8 }}>
                  {armor.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 7,
                      padding: '2px 5px',
                      border: `1px solid ${armor.color}44`,
                      borderRadius: 2, color: armor.color,
                      background: `${armor.color}0e`,
                      letterSpacing: '0.06em',
                    }}>{tag}</span>
                  ))}
                </div>
                <Link to={armor.href} style={{
                  display: 'block', textAlign: 'center',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
                  color: armor.color, letterSpacing: '0.12em',
                  padding: '5px 0',
                  borderTop: `1px solid ${armor.color}33`,
                  textDecoration: 'none',
                }}>
                  {t('hallDeploy')} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MARQUEE */}
      <div style={{ marginTop: 64 }}>
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
  nameWrap: { textAlign: 'center', marginBottom: 48, display: 'flex', flexDirection: 'column', alignItems: 'center' },
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
    marginBottom: 72, paddingBottom: 36,
  },
  platform: {
    width: 240, height: 240,
    position: 'relative',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  capsules: {
    display: 'flex', gap: 12, justifyContent: 'center',
    alignItems: 'stretch', flexWrap: 'wrap',
    perspective: 1400,
  },
  capsuleItem: {
    display: 'flex', flexDirection: 'column',
    width: 'calc(20% - 13px)', maxWidth: 250, minWidth: 150,
    cursor: 'pointer',
    flexShrink: 0,
    perspective: 900,
    transformStyle: 'preserve-3d',
  },
};
