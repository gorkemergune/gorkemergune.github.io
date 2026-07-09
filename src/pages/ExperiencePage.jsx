import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';

export default function ExperiencePage() {
  const { t } = useLang();
  const items = t('expItems');
  useSeo({ title: t('expLabel'), description: t('expSub'), path: '/experience' });

  return (
    <div style={s.container}>
      <style>{`
        .xp-card { transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        .xp-card:hover { transform: translateY(-3px); }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('expBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('expBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('expLabel')}</h1>
        <p style={s.desc}>{t('expSub')}</p>
      </div>

      <div style={s.list}>
        {Array.isArray(items) && items.map((it, i) => (
          <div
            key={i}
            className="xp-card reveal"
            style={{ ...s.card, animationDelay: `${i * 0.08}s`, borderColor: '#1a1a2e' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${it.accent}66`; e.currentTarget.style.boxShadow = `0 0 30px ${it.accent}22`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a2e'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ ...s.rail, background: it.accent, boxShadow: `0 0 14px ${it.accent}` }} />
            <div style={s.cardInner}>
              <div style={s.topRow}>
                <div>
                  <div style={{ ...s.type, color: it.accent, borderColor: `${it.accent}55`, background: `${it.accent}12` }}>{it.type}</div>
                  <h3 style={s.org}>{it.org}</h3>
                  <div style={s.role}>{it.role}</div>
                </div>
                <div style={s.period}>{it.period}</div>
              </div>

              <p style={s.summary}>{it.summary}</p>

              <ul style={s.points}>
                {it.points.map((p, j) => (
                  <li key={j} style={s.point}>
                    <span style={{ ...s.bullet, background: it.accent }} />{p}
                  </li>
                ))}
              </ul>

              <div style={s.bottom}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {it.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
                </div>
                {it.link && (
                  <Link to={it.link} className="link-hover" style={{ ...s.link, color: it.accent }}>
                    Details <ArrowUpRight size={13} strokeWidth={1.5} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6a6a82', marginBottom: 56, cursor: 'pointer' },
  header: { marginBottom: 64 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#eef0f6', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#9a9ab0', maxWidth: 600 },
  list: { display: 'flex', flexDirection: 'column', gap: 22 },
  card: { position: 'relative', display: 'flex', border: '1px solid #1a1a2e', borderRadius: 12, overflow: 'hidden', background: 'linear-gradient(180deg,#0f0f1a,#0b0b13)' },
  rail: { width: 3, flexShrink: 0 },
  cardInner: { padding: '28px 30px', flex: 1 },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 16 },
  type: { display: 'inline-block', padding: '3px 10px', border: '1px solid', borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 },
  org: { fontFamily: "'Instrument Serif', serif", fontSize: 27, fontWeight: 400, color: '#eef0f6', lineHeight: 1.15 },
  role: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, color: '#a8a8be', marginTop: 4 },
  period: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', color: '#7a7a92', whiteSpace: 'nowrap', paddingTop: 4 },
  summary: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15.5, lineHeight: 1.6, color: '#c0c0d0', marginBottom: 18 },
  points: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22, padding: 0 },
  point: { display: 'flex', alignItems: 'flex-start', gap: 12, fontFamily: "'Instrument Sans', sans-serif", fontSize: 14.5, lineHeight: 1.55, color: '#a2a2b8' },
  bullet: { width: 6, height: 6, borderRadius: '50%', marginTop: 8, flexShrink: 0 },
  bottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' },
  link: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer' },
};
