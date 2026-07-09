import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen, Clock, Search } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';

export default function BlogHub() {
  const { lang, t } = useLang();
  const blogItems = t('blogItems');
  const [q, setQ] = useState('');
  useSeo({ title: t('blogLabel'), description: t('blogSub'), path: '/blog' });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!Array.isArray(blogItems)) return [];
    if (!s) return blogItems;
    return blogItems.filter((b) => (b.title + ' ' + b.category + ' ' + b.excerpt).toLowerCase().includes(s));
  }, [q, blogItems]);

  return (
    <div style={s.container}>
      <style>{`
        .blog-card { transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1), border-color 0.4s, box-shadow 0.4s; }
        .blog-card:hover { transform: translateY(-4px); border-color: #2a2a45 !important; box-shadow: 0 0 26px rgba(0,212,255,0.08); }
        .blog-card:hover .blog-arrow { transform: translate(3px,-3px); color: #00d4ff; }
        .blog-card:hover .blog-title { color: #fff; }
        .blog-arrow { transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1), color 0.4s; }
        .blog-title { transition: color 0.35s; }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('blogHubBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('rdBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('blogLabel')}</h1>
        <p style={s.desc}>{t('blogSub')}</p>

        <div className="proj-search" style={s.search}>
          <Search size={16} strokeWidth={1.6} style={{ color: '#6a6a82', flexShrink: 0 }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={lang === 'tr' ? 'Yazı ara…' : 'Search posts…'}
            style={s.searchInput}
            aria-label={lang === 'tr' ? 'Yazılarda ara' : 'Search posts'}
          />
          {q && <span style={s.count}>{filtered.length}</span>}
        </div>
      </div>

      <div className="blog-grid" style={s.grid}>
        {filtered.map((r, i) => (
          <Link
            key={i}
            to={`/blog/${r.slug}`}
            style={{ ...s.card, animationDelay: `${Math.min(i * 0.05, 0.5)}s` }}
            className="blog-card reveal"
          >
            <div style={s.cardTop}>
              <BookOpen size={22} strokeWidth={1.3} style={{ color: '#00d4ff' }} />
              <ArrowUpRight className="blog-arrow" size={16} strokeWidth={1.4} style={{ color: '#4a4a60' }} />
            </div>
            <div style={s.metaRow}>
              <span className="chip">{r.category}</span>
              <span style={s.metaText}><Clock size={11} strokeWidth={1.6} style={{ verticalAlign: -2, marginRight: 4 }} />{r.readTime}</span>
            </div>
            <h3 className="blog-title" style={s.cardTitle}>{r.title}</h3>
            <p style={s.cardDesc}>{r.excerpt}</p>
            <span style={s.dateText}>{r.date}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 960, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 60, cursor: 'pointer' },
  header: { marginBottom: 48 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#9a9ab0', maxWidth: 560 },
  search: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 28, maxWidth: 440, padding: '11px 16px', border: '1px solid #1a1a2e', borderRadius: 8, background: 'rgba(15,15,26,0.6)', transition: 'border-color 0.3s' },
  searchInput: { flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#e6e6f0', fontFamily: "'Instrument Sans', sans-serif", fontSize: 14.5 },
  count: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#00d4ff', flexShrink: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 },
  card: {
    padding: 26, background: 'linear-gradient(180deg, #0f0f1a 0%, #0b0b14 100%)', border: '1px solid #1a1a2e', borderRadius: 6,
    display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer', textDecoration: 'none',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  metaRow: { display: 'flex', alignItems: 'center', gap: 12 },
  metaText: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.08em', color: '#5a5a70' },
  cardTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 24, fontWeight: 400, color: '#e0e0e8', lineHeight: 1.18 },
  cardDesc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, lineHeight: 1.6, color: '#8a8aa0', flex: 1 },
  dateText: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: '#4a4a60', textTransform: 'uppercase', marginTop: 4 },
};
