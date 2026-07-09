import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { useLang } from '../i18n.jsx';

export default function BlogDetail() {
  const { slug } = useParams();
  const { t } = useLang();
  const blogPosts = t('blogPosts');
  const blogItems = t('blogItems');
  const post = blogPosts?.[slug];
  const meta = Array.isArray(blogItems) ? blogItems.find(b => b.slug === slug) : null;

  // Ordered list for prev/next navigation
  const idx = Array.isArray(blogItems) ? blogItems.findIndex(b => b.slug === slug) : -1;
  const next = idx >= 0 && Array.isArray(blogItems) ? blogItems[(idx + 1) % blogItems.length] : null;

  if (!post && !meta) {
    return (
      <div style={s.container}>
        <Link to="/blog" className="link-hover" style={s.back}>
          <ArrowLeft size={16} strokeWidth={1.5} /> {t('rdBack')}
        </Link>
        <h1 style={s.title}>{t('rdNotFoundTitle')}</h1>
        <p style={s.desc}>{t('rdNotFoundDesc')}</p>
      </div>
    );
  }

  // Coming soon state — meta exists but no full post content yet
  if (!post && meta) {
    return (
      <div style={s.container}>
        <Link to="/blog" className="link-hover" style={s.back}>
          <ArrowLeft size={16} strokeWidth={1.5} /> {t('rdBack')}
        </Link>
        <div style={s.header}>
          <span className="chip">{t('rdBadge')}</span>
          <h1 style={s.title}>{meta.title}</h1>
          <p style={s.desc}>{meta.excerpt || meta.note}</p>
        </div>
        <div style={s.bottomNote}>
          <p style={s.bottomText}>{t('rdBottomNote')}</p>
          <Link to="/blog" className="link-hover" style={s.bottomLink}>
            <ArrowLeft size={14} strokeWidth={1.5} /> {t('rdBottomLink')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={s.container}>
      <style>{`
        .article-body p { animation: reveal 0.9s cubic-bezier(0.2,0.8,0.2,1) both; }
        .next-card { transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s; }
        .next-card:hover { border-color: #00d4ff !important; transform: translateY(-3px); box-shadow: 0 0 24px rgba(0,212,255,0.1); }
        .next-card:hover .next-arrow { transform: translateX(4px); color: #00d4ff; }
        .next-arrow { transition: transform 0.4s, color 0.4s; }
      `}</style>

      <Link to="/blog" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('rdBack')}
      </Link>

      <div style={s.header} className="reveal reveal-1">
        <div style={s.metaRow}>
          <span className="chip">{post.category}</span>
          <span style={s.metaText}>{post.date}</span>
          <span style={s.metaDot} />
          <span style={s.metaText}><Clock size={11} strokeWidth={1.6} style={{ verticalAlign: -2, marginRight: 4 }} />{post.readTime}</span>
        </div>
        <h1 style={s.title}>{post.title}</h1>
        <p style={s.desc}>{post.description}</p>
      </div>

      <div style={s.rule} className="reveal reveal-2" />

      {Array.isArray(post.body) && (
        <article className="article-body" style={s.article}>
          {post.body.map((para, i) => (
            <p key={i} style={{ ...s.para, animationDelay: `${0.1 + i * 0.08}s` }}>{para}</p>
          ))}
        </article>
      )}

      <div style={s.placeholderNote}>{t('rdBottomNote')}</div>

      {next && next.slug !== slug && (
        <Link to={`/blog/${next.slug}`} className="next-card" style={s.nextCard}>
          <div>
            <div style={s.nextLabel}>{t('rdNextUp')}</div>
            <div style={s.nextTitle}>{next.title}</div>
          </div>
          <ArrowRight className="next-arrow" size={22} strokeWidth={1.5} style={{ color: '#5a5a70', flexShrink: 0 }} />
        </Link>
      )}

      <div style={s.bottomNote}>
        <Link to="/blog" className="link-hover" style={s.bottomLink}>
          <ArrowLeft size={14} strokeWidth={1.5} /> {t('rdBottomLink')}
        </Link>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 760, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 56, cursor: 'pointer' },
  header: { marginBottom: 40 },
  metaRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' },
  metaText: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', color: '#5a5a70' },
  metaDot: { width: 3, height: 3, borderRadius: '50%', background: '#3a3a50' },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 56, fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.015em', color: '#e0e0e8', marginBottom: 22 },
  desc: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 21, lineHeight: 1.5, color: '#9a9ab0', maxWidth: 620 },
  rule: { height: 1, background: 'linear-gradient(90deg, #00d4ff44, #1a1a2e 40%, transparent)', marginBottom: 44 },
  article: { display: 'flex', flexDirection: 'column', gap: 26 },
  para: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 17.5, lineHeight: 1.75, color: '#c0c0ce', letterSpacing: '0.002em' },
  placeholderNote: { marginTop: 48, padding: '14px 18px', background: 'rgba(0,212,255,0.04)', border: '1px solid #1a1a2e', borderLeft: '2px solid #00d4ff', borderRadius: 4, fontFamily: "'Instrument Sans', sans-serif", fontStyle: 'italic', fontSize: 13.5, color: '#6a6a82' },
  nextCard: { marginTop: 40, padding: '22px 26px', background: '#0f0f1a', border: '1px solid #1a1a2e', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, textDecoration: 'none', cursor: 'pointer' },
  nextLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4a4a60', marginBottom: 8 },
  nextTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#e0e0e8', lineHeight: 1.2 },
  bottomNote: { marginTop: 44, paddingTop: 36, borderTop: '1px solid #1a1a2e' },
  bottomLink: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#8a8aa0', cursor: 'pointer' },
};
