import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CalendarDays, Sparkles } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';

// Icons for apps that have no real artwork of their own.
const ICONS = { calendar: CalendarDays };

export default function AppsPage() {
  const { t } = useLang();
  const items = t('appsItems');
  useSeo({ title: t('appsLabel'), description: t('appsSub'), path: '/apps' });

  return (
    <div style={s.container}>
      <style>{`
        .ap-card { transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        .ap-card:hover { transform: translateY(-3px); }
        .ap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
        @media (max-width: 760px) { .ap-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('appsBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('appsBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('appsLabel')}</h1>
        <p style={s.desc}>{t('appsSub')}</p>
      </div>

      <div className="ap-grid">
        {Array.isArray(items) && items.map((it, i) => {
          const Icon = ICONS[it.icon];
          return (
            <article
              key={it.name}
              className="ap-card reveal"
              style={{ ...s.card, animationDelay: `${i * 0.08}s` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${it.accent}66`; e.currentTarget.style.boxShadow = `0 0 30px ${it.accent}22`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e222b'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={s.cardTop}>
                {it.image
                  ? <img src={it.image} alt="" width={56} height={56} style={s.appIcon} loading="lazy" />
                  : <span style={{ ...s.appIcon, ...s.iconBox, color: it.accent, borderColor: `${it.accent}55`, background: `${it.accent}14` }}>{Icon && <Icon size={26} strokeWidth={1.5} />}</span>}
                <span style={{ ...s.platform, color: it.accent, borderColor: `${it.accent}4d`, background: `${it.accent}14` }}>{it.platform}</span>
              </div>
              <h2 style={s.name}>{it.name}</h2>
              <p style={s.tagline}>{it.tagline}</p>
              <p style={s.body}>{it.description}</p>
              {Array.isArray(it.stack) && (
                <div style={s.stackRow}>
                  {it.stack.map((x) => <span key={x} className="chip">{x}</span>)}
                </div>
              )}
              <a className="hero-btn" href={it.url} target="_blank" rel="noopener noreferrer" style={s.cta}>
                {it.cta} <ArrowUpRight size={14} strokeWidth={1.6} />
              </a>
            </article>
          );
        })}
      </div>

      <div style={s.more}>
        <Sparkles size={16} strokeWidth={1.6} style={{ color: '#00f0ff', flexShrink: 0, marginTop: 2 }} />
        <span>{t('appsMore')}</span>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 960, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: '0.06em', color: '#6b7280', marginBottom: 56, cursor: 'pointer' },
  header: { marginBottom: 44 },
  title: { fontFamily: "var(--font-display)", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#eef0f6', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.6, color: '#9aa1ad', maxWidth: 600 },
  card: { display: 'flex', flexDirection: 'column', padding: '30px 32px', border: '1px solid #1e222b', borderRadius: 12, background: 'linear-gradient(180deg,#111419,#0d0f14)', minWidth: 0 },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 20 },
  appIcon: { width: 56, height: 56, borderRadius: 14, flexShrink: 0, objectFit: 'cover' },
  iconBox: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', boxSizing: 'border-box' },
  platform: { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 10px', border: '1px solid', borderRadius: 999, whiteSpace: 'nowrap' },
  name: { fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 400, lineHeight: 1.1, color: '#eef0f6', marginBottom: 8 },
  tagline: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.06em', color: '#7b8290', marginBottom: 16 },
  body: { fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.65, color: '#b4b4c6', marginBottom: 20 },
  stackRow: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  cta: { fontSize: 14, alignSelf: 'flex-start', marginTop: 'auto' },
  more: { display: 'flex', gap: 12, marginTop: 36, padding: '16px 20px', border: '1px dashed #2c313c', borderRadius: 8, fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: '#9aa1ad' },
};
