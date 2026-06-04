import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react';
import { useLang } from '../i18n.jsx';

export default function BlogHub() {
  const { t } = useLang();
  const blogItems = t('blogItems');

  return (
    <div style={s.container}>
      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('blogHubBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('rdBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('blogLabel')}</h1>
        <p style={s.desc}>{t('blogSub')}</p>
      </div>

      <div className="blog-grid" style={s.grid}>
        {Array.isArray(blogItems) && blogItems.map((r, i) => (
          <Link key={i} to={`/blog/${r.slug}`} style={s.card} className="row-hover">
            <div style={s.cardTop}>
              <BookOpen size={24} strokeWidth={1.3} style={{ color: '#5a5a70' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {r.status === 'soon' && (
                  <span className="chip" style={{ background: '#00d4ff', color: '#0a0a0f', borderColor: '#00d4ff', fontSize: 9 }}>{t('blogSoon')}</span>
                )}
                <ArrowUpRight size={16} strokeWidth={1.2} style={{ color: '#4a4a60' }} />
              </div>
            </div>
            <span className="chip" style={{ alignSelf: 'flex-start' }}>{r.tag}</span>
            <h3 style={s.cardTitle}>{r.title}</h3>
            <p style={s.cardDesc}>{r.note}</p>
          </Link>
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
    display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer',
    transition: 'transform 0.4s, border-color 0.4s',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400, color: '#e0e0e8', lineHeight: 1.2 },
  cardDesc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, lineHeight: 1.6, color: '#5a5a70' },
};
