import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';

export default function JourneyPage() {
  const { t } = useLang();
  const journeyItems = t('journeyItems');
  useSeo({ title: t('journeyLabel'), description: t('journeySub'), path: '/journey' });

  return (
    <div style={s.container}>
      <style>{`
        .lf-item { position: relative; opacity: 0; transform: translateY(22px); transition: opacity 0.7s cubic-bezier(0.2,0.8,0.2,1), transform 0.7s cubic-bezier(0.2,0.8,0.2,1); }
        .lf-item.in { opacity: 1; transform: none; }
        .lf-card { transition: border-color 0.45s, box-shadow 0.45s, transform 0.45s cubic-bezier(0.2,0.8,0.2,1); }
        .lf-card:hover { transform: translateY(-3px); border-color: #2a2a45 !important; box-shadow: 0 0 30px rgba(0,212,255,0.08); }
        .lf-card:hover .lf-dot { box-shadow: 0 0 0 5px rgba(0,212,255,0.12), 0 0 14px #00d4ff; }
        .lf-dot { transition: box-shadow 0.45s; }
        @media (max-width: 640px) {
          .lf-rail { left: 18px !important; }
          .lf-item { padding-left: 46px !important; }
          .lf-node { left: 18px !important; }
          .lf-title { font-size: 22px !important; }
        }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('journeyBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('journeyBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('journeyLabel')}</h1>
        <p style={s.desc}>{t('journeySub')}</p>
      </div>

      <div style={s.timeline}>
        {/* subtle continuous rail */}
        <div className="lf-rail" style={s.rail} />
        {Array.isArray(journeyItems) && journeyItems.map((j, i) => (
          <Phase key={i} item={j} index={i} />
        ))}
      </div>
    </div>
  );
}

function Phase({ item, index }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`lf-item${seen ? ' in' : ''}`} style={{ ...s.item, transitionDelay: `${index * 0.06}s` }}>
      {/* node on the rail */}
      <span className="lf-node" style={s.node}>
        <span className="lf-dot" style={s.dot} />
      </span>

      <div className="lf-card" style={s.card}>
        <div style={s.metaRow}>
          <span style={s.num}>{String(index + 1).padStart(2, '0')}</span>
          <span style={s.year}>{item.year}</span>
        </div>
        <h3 className="lf-title" style={s.phaseTitle}>{item.title}</h3>
        <p style={s.body}>{item.body}</p>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 820, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6a6a82', marginBottom: 56, cursor: 'pointer' },
  header: { marginBottom: 64 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#eef0f6', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#9a9ab0', maxWidth: 560 },
  timeline: { position: 'relative' },
  rail: { position: 'absolute', left: 27, top: 12, bottom: 12, width: 1, background: 'linear-gradient(180deg, transparent, #1e1e30 8%, #1e1e30 92%, transparent)' },
  item: { position: 'relative', paddingLeft: 66, marginBottom: 20 },
  node: { position: 'absolute', left: 27, top: 30, transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14, borderRadius: '50%', background: '#0a0a0f', border: '1px solid #2a2a40', zIndex: 1 },
  dot: { width: 6, height: 6, borderRadius: '50%', background: '#00d4ff' },
  card: { background: 'linear-gradient(180deg,#0f0f1a,#0b0b13)', border: '1px solid #1a1a2e', borderRadius: 12, padding: '24px 28px' },
  metaRow: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 },
  num: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.14em', color: '#00d4ff' },
  year: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', color: '#7a7a92' },
  phaseTitle: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 27, fontWeight: 400, lineHeight: 1.15, color: '#eef0f6', marginBottom: 12 },
  body: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15.5, lineHeight: 1.7, color: '#a2a2b8' },
};
