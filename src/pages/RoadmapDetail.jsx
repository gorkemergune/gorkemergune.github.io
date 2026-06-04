import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Circle } from 'lucide-react';
import { useLang } from '../i18n.jsx';

export default function BlogDetail() {
  const { slug } = useParams();
  const { t } = useLang();
  const blogPosts = t('blogPosts');
  const blogItems = t('blogItems');
  const post = blogPosts?.[slug];
  const meta = Array.isArray(blogItems) ? blogItems.find(b => b.slug === slug) : null;

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
          <p style={s.desc}>{meta.note}</p>
          {meta.status === 'soon' && (
            <span className="chip" style={{ marginTop: 20, background: '#00d4ff', color: '#0a0a0f', borderColor: '#00d4ff' }}>{t('blogSoon')}</span>
          )}
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
      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('rdBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('rdBadge')}</span>
        <h1 style={s.title}>{post.title}</h1>
        <p style={s.desc}>{post.description}</p>
      </div>

      {post.phases && (
        <div style={s.timeline}>
          {post.phases.map((phase, i) => (
            <div key={i} style={s.phase}>
              <div style={s.phaseLeft}>
                <span style={s.phaseNum}>{String(i + 1).padStart(2, '0')}</span>
                <div style={s.phaseLine} />
              </div>
              <div style={s.phaseContent}>
                <h3 style={s.phaseTitle}>{phase.title}</h3>
                <div style={s.topicList}>
                  {phase.topics.map((topic, j) => (
                    <div key={j} style={s.topic}>
                      <Circle size={7} strokeWidth={2} style={{ color: '#00d4ff', flexShrink: 0, marginTop: 6 }} />
                      <span style={s.topicText}>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={s.bottomNote}>
        <p style={s.bottomText}>{t('rdBottomNote')}</p>
        <Link to="/" className="link-hover" style={s.bottomLink}>
          <ArrowLeft size={14} strokeWidth={1.5} /> {t('rdBottomLink')}
        </Link>
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
  timeline: { display: 'flex', flexDirection: 'column', gap: 0 },
  phase: { display: 'flex', gap: 32, minHeight: 180 },
  phaseLeft: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 },
  phaseNum: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.1em', color: '#4a4a60', background: '#0a0a0f', padding: '6px 0', zIndex: 1 },
  phaseLine: { flex: 1, width: 1, background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)', marginTop: 8 },
  phaseContent: { flex: 1, paddingBottom: 48, borderTop: '1px solid #1a1a2e', paddingTop: 8 },
  phaseTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 28, fontWeight: 400, color: '#e0e0e8', marginBottom: 20, lineHeight: 1.2 },
  topicList: { display: 'flex', flexDirection: 'column', gap: 10 },
  topic: { display: 'flex', alignItems: 'flex-start', gap: 12 },
  topicText: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.6, color: '#8a8aa0' },
  bottomNote: { marginTop: 60, paddingTop: 40, borderTop: '1px solid #1a1a2e' },
  bottomText: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: '#4a4a60', fontStyle: 'italic', marginBottom: 24 },
  bottomLink: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#8a8aa0', cursor: 'pointer' },
};
