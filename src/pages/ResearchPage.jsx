import { Link } from 'react-router-dom';
import { ArrowLeft, Beaker, AlertCircle, FileText, Check, Loader } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';

export default function ResearchPage() {
  const { t } = useLang();
  const items = t('researchItems');
  useSeo({ title: t('researchLabel'), description: t('researchSub'), path: '/research' });

  return (
    <div style={s.container}>
      <style>{`
        .rs-card { transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        .rs-card:hover { transform: translateY(-3px); }
        .rs-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 720px) { .rs-cols { grid-template-columns: 1fr !important; } }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('researchBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('researchBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('researchLabel')}</h1>
        <p style={s.desc}>{t('researchSub')}</p>
      </div>

      <div style={s.disclaimer}>
        <AlertCircle size={16} strokeWidth={1.6} style={{ color: '#ffd166', flexShrink: 0, marginTop: 2 }} />
        <span>{t('researchDisclaimer')}</span>
      </div>

      <div style={s.list}>
        {Array.isArray(items) && items.map((it, i) => (
          <article
            key={i}
            className="rs-card reveal"
            style={{ ...s.card, animationDelay: `${i * 0.08}s` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${it.accent}66`; e.currentTarget.style.boxShadow = `0 0 30px ${it.accent}22`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a2e'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={s.cardTop}>
              <span style={{ ...s.field, color: it.accent }}><Beaker size={12} strokeWidth={1.6} /> {it.field}</span>
              {(() => {
                const done = it.status === 'completed';
                const c = done ? '#00e5a0' : '#ffb454';
                return (
                  <span style={{ ...s.status, color: c, borderColor: `${c}4d`, background: `${c}14` }}>
                    {done ? <Check size={10} strokeWidth={2.6} /> : <Loader size={10} strokeWidth={2} />}
                    {done ? t('researchCompleted') : t('researchStatus')}
                  </span>
                );
              })()}
            </div>
            <h3 style={s.rtitle}>{it.title}</h3>
            {it.abstract && <p style={s.abstract}>{it.abstract}</p>}

            {Array.isArray(it.methods) && it.methods.length > 0 && (
              <div className="rs-cols" style={{ marginTop: 22 }}>
                <div>
                  <div style={{ ...s.subLabel, color: it.accent }}>{t('researchMethods')}</div>
                  <ul style={s.ul}>
                    {it.methods.map((m, j) => <li key={j} style={s.li}><span style={{ ...s.bullet, background: it.accent }} />{m}</li>)}
                  </ul>
                </div>
                <div>
                  <div style={{ ...s.subLabel, color: it.accent }}>{it.status === 'completed' ? t('researchOutcomes') : t('researchExpected')}</div>
                  <p style={s.expected}>{it.expected}</p>
                </div>
              </div>
            )}

            {it.pdf && (
              <a href={it.pdf} target="_blank" rel="noopener noreferrer" className="link-hover" style={{ ...s.pdf, color: it.accent }}>
                <FileText size={13} strokeWidth={1.5} /> {t('researchPdf')}
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6a6a82', marginBottom: 56, cursor: 'pointer' },
  header: { marginBottom: 28 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#eef0f6', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#9a9ab0', maxWidth: 600 },
  disclaimer: { display: 'flex', gap: 12, padding: '16px 20px', background: 'rgba(255,209,102,0.05)', border: '1px solid rgba(255,209,102,0.2)', borderRadius: 8, marginBottom: 44, fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, lineHeight: 1.6, color: '#c8c0a0' },
  list: { display: 'flex', flexDirection: 'column', gap: 22 },
  card: { padding: '30px 32px', border: '1px solid #1a1a2e', borderRadius: 12, background: 'linear-gradient(180deg,#0f0f1a,#0b0b13)' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' },
  field: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em' },
  status: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#00e5a0', padding: '4px 10px', border: '1px solid rgba(0,229,160,0.3)', borderRadius: 999, background: 'rgba(0,229,160,0.08)' },
  statusDot: { width: 5, height: 5, borderRadius: '50%', background: '#00e5a0' },
  rtitle: { fontFamily: "'Instrument Serif', serif", fontSize: 27, fontWeight: 400, lineHeight: 1.2, color: '#eef0f6', marginBottom: 14 },
  abstract: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15.5, lineHeight: 1.65, color: '#b4b4c6' },
  subLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 },
  ul: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, padding: 0, margin: 0 },
  li: { display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, lineHeight: 1.5, color: '#a2a2b8' },
  bullet: { width: 5, height: 5, borderRadius: '50%', marginTop: 7, flexShrink: 0 },
  expected: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, lineHeight: 1.6, color: '#a2a2b8' },
  pdf: { display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 22, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em' },
};
