import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Trophy, Users, Github, ListOrdered } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import COMPETITIONS from '../data/competitions';

export default function CompetitionsPage() {
  const { lang, t } = useLang();
  const loc = (o) => (o && typeof o === 'object' ? (lang === 'tr' ? o.tr : o.en) : o);
  useSeo({ title: t('compLabel'), description: t('compSub'), path: '/competitions' });

  return (
    <div style={s.container}>
      <style>{`
        .comp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
        .comp-card { position: relative; overflow: hidden; transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        .comp-card:hover { transform: translateY(-4px); }
        @keyframes comp-sweep { 0% { transform: translateX(-130%); } 100% { transform: translateX(360%); } }
        .comp-card::after { content:''; position:absolute; top:0; left:0; width:36%; height:2px; background: linear-gradient(90deg, transparent, var(--acc), transparent); animation: comp-sweep 5s linear infinite; }
        .comp-card:hover .comp-emblem { transform: scale(1.06); }
        @media (max-width: 760px) { .comp-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('compBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('compBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('compLabel')}</h1>
        <p style={s.desc}>{t('compSub')}</p>
      </div>

      <div className="comp-grid">
        {COMPETITIONS.map((c, i) => (
          <article
            key={c.id}
            className="comp-card reveal"
            style={{ ...s.card, '--acc': c.accent, animationDelay: `${i * 0.06}s` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${c.accent}66`; e.currentTarget.style.boxShadow = `0 0 34px ${c.accent}22`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a2e'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={s.cardTop}>
              <div className="comp-emblem" style={{ ...s.emblem, borderColor: `${c.accent}66`, color: c.accent, background: `${c.accent}12`, transition: 'transform 0.4s' }}>
                {c.logo ? <img src={c.logo} alt={c.name} style={{ width: '70%', height: '70%', objectFit: 'contain' }} /> : c.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...s.type, color: c.accent, borderColor: `${c.accent}55`, background: `${c.accent}12` }}>{loc(c.type)}</div>
                <h3 style={s.name}>{c.name}</h3>
                <div style={s.metaLine}>
                  <span>{c.org}</span>
                  <span style={s.metaDot} />
                  <span>{c.date}</span>
                  {c.duration && <><span style={s.metaDot} /><span style={{ color: c.accent }}>{c.duration}</span></>}
                </div>
              </div>
            </div>

            <div style={s.statRow}>
              <Stat icon={<Trophy size={12} strokeWidth={1.8} />} label={t('compRank')} value={c.rank} accent={c.accent} tbd={t('compTBD')} />
              <Stat label={t('compScore')} value={c.score} accent={c.accent} tbd={t('compTBD')} />
              {c.team && <Stat icon={<Users size={12} strokeWidth={1.8} />} label={t('compTeam')} value={`@${c.team}`} accent={c.accent} />}
            </div>

            <p style={s.summary}>{loc(c.summary)}</p>

            <ul style={s.achList}>
              {loc(c.achievements).map((a, j) => (
                <li key={j} style={s.ach}><span style={{ ...s.dot, background: c.accent }} />{a}</li>
              ))}
            </ul>

            <div style={s.bottom}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {c.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                {c.repo && (
                  <a href={c.repo} target="_blank" rel="noopener noreferrer" className="link-hover" style={{ ...s.link, color: c.accent }}>
                    <Github size={13} strokeWidth={1.5} /> GitHub
                  </a>
                )}
                {c.leaderboard && (
                  <a href={c.leaderboard} target="_blank" rel="noopener noreferrer" className="link-hover" style={{ ...s.link, color: c.accent }}>
                    <ListOrdered size={13} strokeWidth={1.5} /> {t('compLeaderboard')}
                  </a>
                )}
                {c.website && (
                  <a href={c.website} target="_blank" rel="noopener noreferrer" className="link-hover" style={{ ...s.link, color: c.accent }}>
                    {t('compVisit')} <ArrowUpRight size={13} strokeWidth={1.5} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Stat({ icon, label, value, accent, tbd }) {
  return (
    <div style={s.stat}>
      <span style={s.statLabel}>{icon}{label}</span>
      <span style={{ ...s.statValue, color: value ? '#eef0f6' : '#5a5a70' }}>{value || (tbd ?? '—')}</span>
    </div>
  );
}

const s = {
  container: { maxWidth: 980, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6a6a82', marginBottom: 56, cursor: 'pointer' },
  header: { marginBottom: 56 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#eef0f6', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#9a9ab0', maxWidth: 620 },
  card: { border: '1px solid #1a1a2e', borderRadius: 14, background: 'linear-gradient(180deg,#0f0f1a,#0b0b13)', padding: '26px 28px' },
  cardTop: { display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 },
  emblem: { width: 52, height: 52, flexShrink: 0, borderRadius: 12, border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 600, letterSpacing: '0.02em' },
  type: { display: 'inline-block', padding: '3px 10px', border: '1px solid', borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 },
  name: { fontFamily: "'Instrument Serif', serif", fontSize: 25, fontWeight: 400, lineHeight: 1.1, color: '#eef0f6' },
  metaLine: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.05em', color: '#7a7a92', marginTop: 6, flexWrap: 'wrap' },
  metaDot: { width: 3, height: 3, borderRadius: '50%', background: '#3a3a50' },
  statRow: { display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' },
  stat: { flex: 1, minWidth: 84, padding: '12px 14px', background: 'rgba(0,0,0,0.22)', border: '1px solid #17172a', borderRadius: 10 },
  statLabel: { display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7a7a92', marginBottom: 8 },
  statValue: { display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 500 },
  summary: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14.5, lineHeight: 1.6, color: '#b4b4c6', marginBottom: 16 },
  achList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, padding: 0, margin: '0 0 20px' },
  ach: { display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: "'Instrument Sans', sans-serif", fontSize: 13.5, lineHeight: 1.5, color: '#a2a2b8' },
  dot: { width: 5, height: 5, borderRadius: '50%', marginTop: 7, flexShrink: 0 },
  bottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap' },
  link: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.06em', cursor: 'pointer', whiteSpace: 'nowrap' },
};
