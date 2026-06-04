import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n.jsx';

export default function JourneyPage() {
  const { t } = useLang();
  const journeyItems = t('journeyItems');

  return (
    <div style={s.container}>
      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('journeyBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('journeyBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('journeyLabel')}</h1>
        <p style={s.desc}>{t('journeySub')}</p>
      </div>

      <div style={s.list}>
        {Array.isArray(journeyItems) && journeyItems.map((j, i) => (
          <div key={i} className="row-hover journey-row" style={s.row}>
            <span className="n-large journey-num" style={{ width: 40, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            <span className="journey-year" style={s.year}>{j.year}</span>
            <span className="journey-title" style={s.rowTitle}>{j.title}</span>
            <span style={s.body}>{j.body}</span>
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
  list: { marginTop: 20 },
  row: { display: 'flex', gap: 24, padding: '24px 16px', borderTop: '1px solid #1a1a2e', alignItems: 'baseline', cursor: 'default', flexWrap: 'wrap' },
  year: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.08em', color: '#5a5a70', width: 80, flexShrink: 0 },
  rowTitle: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 24, color: '#e0e0e8', width: 260, flexShrink: 0 },
  body: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.6, color: '#8a8aa0', flex: 1, minWidth: 0 },
};
