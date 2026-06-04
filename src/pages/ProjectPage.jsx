import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n.jsx';

export default function ProjectPage() {
  const { t } = useLang();
  const focusItems = t('focusItems');

  return (
    <div style={s.container}>
      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('projectBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('projectBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('projectLabel')}</h1>
        <p style={s.desc}>{t('projectSub')}</p>
      </div>

      <div className="four-col" style={s.grid}>
        {Array.isArray(focusItems) && focusItems.map((f, i) => (
          <div key={i} style={s.card}>
            <span className="n-large">{String(i + 1).padStart(2, '0')} / {f.label.toUpperCase()}</span>
            <h3 style={s.cardValue}>{f.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 60, cursor: 'pointer' },
  header: { marginBottom: 80 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#8a8aa0', maxWidth: 560 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 },
  card: {
    padding: 28, background: '#0f0f1a', border: '1px solid #1a1a2e', borderRadius: 4,
    minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    transition: 'transform 0.4s, border-color 0.4s',
  },
  cardValue: { fontFamily: "'Instrument Serif', serif", fontSize: 24, fontWeight: 400, lineHeight: 1.2, color: '#e0e0e8', marginTop: 20 },
};
