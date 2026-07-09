import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Lock, Cpu } from 'lucide-react';
import { useLang } from '../i18n.jsx';

const isLocked = (body) => /coming soon|yakında/i.test(body || '');

export default function JourneyPage() {
  const { t } = useLang();
  const journeyItems = t('journeyItems');
  const items = Array.isArray(journeyItems) ? journeyItems : [];

  // Classify each phase: complete / active / locked
  const lockedFlags = items.map((j) => isLocked(j.body));
  const lastActiveIdx = lockedFlags.lastIndexOf(false);
  const statusOf = (i) => (lockedFlags[i] ? 'locked' : i === lastActiveIdx ? 'active' : 'done');

  return (
    <div style={s.container}>
      <style>{`
        @keyframes jv-pulse-down {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 105%; opacity: 0; }
        }
        @keyframes jv-node-breathe {
          0%, 100% { box-shadow: 0 0 0 0 var(--gc), 0 0 12px var(--gc); }
          50% { box-shadow: 0 0 0 6px transparent, 0 0 22px var(--gc); }
        }
        @keyframes jv-ring-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes jv-scan { 0% { transform: translateY(-100%); opacity: 0; } 50% { opacity: 0.6; } 100% { transform: translateY(400%); opacity: 0; } }
        .jv-card { position: relative; opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.2,0.8,0.2,1), transform 0.7s cubic-bezier(0.2,0.8,0.2,1), border-color 0.4s, box-shadow 0.4s; }
        .jv-card.in { opacity: 1; transform: translateY(0); }
        .jv-card:hover { border-color: var(--ac) !important; box-shadow: 0 0 30px var(--gc), inset 0 0 24px rgba(0,0,0,0.4) !important; }
        .jv-card:hover .jv-scan-line { opacity: 1; }
        .jv-row { display: grid; grid-template-columns: 1fr 64px 1fr; align-items: start; }
        .jv-row.left .jv-card-wrap { grid-column: 1; text-align: right; }
        .jv-row.left .jv-card { text-align: left; }
        .jv-row.right .jv-card-wrap { grid-column: 3; }
        .jv-spine-cell { grid-column: 2; }
        @media (max-width: 760px) {
          .jv-row { grid-template-columns: 44px 1fr !important; }
          .jv-spine-cell { grid-column: 1 !important; }
          .jv-row.left .jv-card-wrap, .jv-row.right .jv-card-wrap { grid-column: 2 !important; text-align: left !important; }
          .jv-row.left .jv-card { text-align: left !important; }
          .jv-spine { left: 21px !important; }
          .jv-hero-name { font-size: 40px !important; }
        }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('journeyBack')}
      </Link>

      <div style={s.header}>
        <div style={s.hudBadge}>
          <span style={s.hudDot} />
          <Cpu size={12} strokeWidth={1.6} style={{ color: '#00d4ff' }} />
          <span>{t('journeyTimeline')}</span>
        </div>
        <h1 className="section-title jv-hero-name" style={s.title}>{t('journeyLabel')}</h1>
        <p style={s.desc}>{t('journeySub')}</p>
        <ProgressBar done={lockedFlags.filter((x) => !x).length} total={items.length} />
      </div>

      <div style={s.timeline}>
        {/* Central glowing spine */}
        <div className="jv-spine" style={s.spine}>
          <div style={s.spineGlow} />
          <div style={s.spinePulse} />
        </div>

        {items.map((j, i) => (
          <Phase
            key={i}
            index={i}
            item={j}
            status={statusOf(i)}
            side={i % 2 === 0 ? 'left' : 'right'}
            phaseLabel={t('journeyPhase')}
            statusLabel={t(
              statusOf(i) === 'done' ? 'journeyStatusDone' : statusOf(i) === 'active' ? 'journeyStatusActive' : 'journeyStatusLocked'
            )}
            lockedBody={t('journeySoon')}
          />
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div style={s.progressWrap}>
      <div style={s.progressLabel}>
        <span>{String(done).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <span style={{ color: '#00d4ff' }}>{pct}%</span>
      </div>
      <div style={s.progressTrack}>
        <div style={{ ...s.progressFill, width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Phase({ index, item, status, side, phaseLabel, statusLabel, lockedBody }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const accent = status === 'locked' ? '#3a3a50' : status === 'active' ? '#ff6b35' : '#00d4ff';
  const glow = status === 'locked' ? 'rgba(58,58,80,0.25)' : status === 'active' ? 'rgba(255,107,53,0.4)' : 'rgba(0,212,255,0.35)';
  const locked = status === 'locked';

  return (
    <div className={`jv-row ${side}`} style={{ marginBottom: 8 }}>
      <div className="jv-card-wrap">
        <div
          ref={ref}
          className={`jv-card${seen ? ' in' : ''}`}
          style={{ ...s.card, '--ac': accent, '--gc': glow, transitionDelay: `${index * 0.05}s`, borderColor: status === 'active' ? '#ff6b3555' : '#1a1a2e' }}
        >
          <div className="jv-scan-line" style={s.scanLine} />
          <div style={s.cardHead}>
            <span style={{ ...s.phaseTag, color: accent }}>{phaseLabel} {String(index + 1).padStart(2, '0')}</span>
            <span style={{ ...s.statusTag, color: accent, borderColor: `${accent}55`, background: `${accent}12` }}>
              {status === 'done' && <Check size={9} strokeWidth={3} style={{ verticalAlign: -1, marginRight: 3 }} />}
              {status === 'locked' && <Lock size={9} strokeWidth={2.5} style={{ verticalAlign: -1, marginRight: 3 }} />}
              {statusLabel}
            </span>
          </div>
          <div style={s.year}>{item.year}</div>
          <h3 style={{ ...s.phaseTitle, color: locked ? '#6a6a82' : '#e0e0e8' }}>{item.title}</h3>
          <p style={{ ...s.body, fontStyle: locked ? 'italic' : 'normal' }}>
            {locked ? lockedBody : item.body}
          </p>
        </div>
      </div>

      {/* Spine node */}
      <div className="jv-spine-cell" style={s.spineCell}>
        <div style={{ ...s.node, borderColor: accent, background: '#0a0a0f' }}>
          {status === 'active' ? (
            <>
              <div style={{ ...s.nodeRing, borderTopColor: accent }} />
              <span style={{ ...s.nodeCore, background: accent, boxShadow: `0 0 12px ${accent}`, animation: 'jv-node-breathe 2s ease-in-out infinite', ['--gc']: glow }} />
            </>
          ) : (
            <span style={{ ...s.nodeCore, background: locked ? '#2a2a40' : accent, boxShadow: locked ? 'none' : `0 0 10px ${accent}` }} />
          )}
        </div>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 960, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 56, cursor: 'pointer' },
  header: { marginBottom: 72, maxWidth: 620 },
  hudBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px',
    border: '1px solid rgba(0,212,255,0.2)', borderRadius: 999, background: 'rgba(0,212,255,0.05)',
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.16em', color: '#8a8aa0',
  },
  hudDot: { width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 68, fontWeight: 400, lineHeight: 0.98, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 22, marginBottom: 18 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#8a8aa0' },
  progressWrap: { marginTop: 34 },
  progressLabel: { display: 'flex', justifyContent: 'space-between', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: '#5a5a70', marginBottom: 8 },
  progressTrack: { height: 3, background: '#12121f', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #00d4ff, #ff6b35)', borderRadius: 3, boxShadow: '0 0 12px rgba(0,212,255,0.5)', transition: 'width 1s ease' },
  timeline: { position: 'relative', marginTop: 20 },
  spine: { position: 'absolute', left: 'calc(50% - 1px)', top: 0, bottom: 0, width: 2, pointerEvents: 'none' },
  spineGlow: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, #1a2a3a 8%, #1a2a3a 92%, transparent)' },
  spinePulse: {
    position: 'absolute', left: -1, width: 4, height: '18%', borderRadius: 4,
    background: 'linear-gradient(180deg, transparent, #00d4ff, transparent)',
    boxShadow: '0 0 16px rgba(0,212,255,0.7)', animation: 'jv-pulse-down 5s ease-in-out infinite',
  },
  spineCell: { display: 'flex', justifyContent: 'center', paddingTop: 26 },
  node: {
    position: 'relative', width: 26, height: 26, borderRadius: '50%',
    border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
  },
  nodeRing: { position: 'absolute', inset: -5, borderRadius: '50%', border: '1.5px solid transparent', animation: 'jv-ring-spin 3s linear infinite' },
  nodeCore: { width: 8, height: 8, borderRadius: '50%' },
  card: {
    position: 'relative', overflow: 'hidden',
    background: 'linear-gradient(180deg, #0f0f1a 0%, #0b0b13 100%)',
    border: '1px solid #1a1a2e', borderRadius: 8, padding: '22px 24px', margin: '0 8px',
  },
  scanLine: { position: 'absolute', left: 0, right: 0, top: 0, height: '40%', background: 'linear-gradient(180deg, rgba(0,212,255,0.06), transparent)', opacity: 0, transition: 'opacity 0.4s', animation: 'jv-scan 3.5s ease-in-out infinite', pointerEvents: 'none' },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' },
  phaseTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.16em' },
  statusTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, letterSpacing: '0.12em', padding: '3px 8px', border: '1px solid', borderRadius: 999 },
  year: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', color: '#5a5a70', marginBottom: 10 },
  phaseTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 25, fontWeight: 400, lineHeight: 1.15, marginBottom: 12 },
  body: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14.5, lineHeight: 1.65, color: '#9a9ab0' },
};
