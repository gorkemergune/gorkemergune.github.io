import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Check, Loader, Clock, Github, ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';

export default function LearningPathPage() {
  const { t } = useLang();
  const items = t('learningItems');
  useSeo({ title: t('learningLabel'), description: t('learningSub'), path: '/learning-path' });

  return (
    <div style={s.container}>
      <style>{`
        .lp-card { transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        .lp-card:hover { transform: translateY(-3px); }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('learningBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('learningBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('learningLabel')}</h1>
        <p style={s.desc}>{t('learningSub')}</p>
      </div>

      <div style={s.list}>
        {Array.isArray(items) && items.map((it, i) => {
          const done = it.status === 'completed';
          const upcoming = it.status === 'upcoming';
          const statusColor = done ? '#00e5a0' : upcoming ? '#8a8aa0' : '#ffb454';
          const StatusIcon = done ? Check : upcoming ? Clock : Loader;
          const statusLabel = done ? t('learningCompleted') : upcoming ? t('learningUpcoming') : t('learningStatus');
          return (
            <article
              key={i}
              className="lp-card reveal"
              style={{ ...s.card, animationDelay: `${i * 0.08}s`, opacity: upcoming ? 0.82 : 1 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${it.accent}66`; e.currentTarget.style.boxShadow = `0 0 30px ${it.accent}22`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a2e'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={s.cardTop}>
                <span style={{ ...s.field, color: it.accent }}><GraduationCap size={13} strokeWidth={1.6} /> {it.field}</span>
                <span style={{ ...s.status, color: statusColor, borderColor: `${statusColor}4d`, background: `${statusColor}14` }}>
                  <StatusIcon size={10} strokeWidth={done ? 2.6 : 2} />
                  {statusLabel}
                </span>
              </div>

              <h3 style={s.rtitle}>{it.title}</h3>
              {it.abstract && <p style={s.abstract}>{it.abstract}</p>}

              {Array.isArray(it.topics) && it.topics.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ ...s.subLabel, color: it.accent }}>{t('learningTopics')}</div>
                  <div style={s.topicRow}>
                    {it.topics.map((tp, j) => (
                      <span key={j} style={{ ...s.topic, borderColor: `${it.accent}33` }}>{tp}</span>
                    ))}
                  </div>
                </div>
              )}

              {it.repo && (
                <a href={it.repo} target="_blank" rel="noopener noreferrer" className="link-hover" style={{ ...s.repo, color: it.accent }}>
                  <Github size={13} strokeWidth={1.5} /> {t('learningRepo')} <ArrowUpRight size={12} strokeWidth={1.5} />
                </a>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6a6a82', marginBottom: 56, cursor: 'pointer' },
  header: { marginBottom: 44 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#eef0f6', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#9a9ab0', maxWidth: 600 },
  list: { display: 'flex', flexDirection: 'column', gap: 22 },
  card: { padding: '30px 32px', border: '1px solid #1a1a2e', borderRadius: 12, background: 'linear-gradient(180deg,#0f0f1a,#0b0b13)' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' },
  field: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em' },
  status: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 10px', border: '1px solid', borderRadius: 999 },
  rtitle: { fontFamily: "'Instrument Serif', serif", fontSize: 27, fontWeight: 400, lineHeight: 1.2, color: '#eef0f6', marginBottom: 14 },
  abstract: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15.5, lineHeight: 1.65, color: '#b4b4c6' },
  subLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 },
  topicRow: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  topic: { padding: '5px 11px', border: '1px solid', borderRadius: 6, background: 'rgba(255,255,255,0.03)', fontFamily: "'Instrument Sans', sans-serif", fontSize: 12.5, color: '#c4c4d4' },
  repo: { display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 22, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em' },
};
