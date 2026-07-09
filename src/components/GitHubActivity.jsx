import { ArrowUpRight, Star, GitBranch } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useGitHub } from '../hooks/useGitHub';

const timeAgo = (iso, lang) => {
  if (!iso) return '';
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return lang === 'tr' ? 'bugün' : 'today';
  if (days === 1) return lang === 'tr' ? 'dün' : '1d ago';
  if (days < 30) return lang === 'tr' ? `${days} gün önce` : `${days}d ago`;
  const mo = Math.floor(days / 30);
  return lang === 'tr' ? `${mo} ay önce` : `${mo}mo ago`;
};

export default function GitHubActivity() {
  const { lang, t } = useLang();
  const gh = useGitHub();
  const repos = gh.repos || [];

  return (
    <section className="container" style={s.section} aria-label="GitHub activity">
      <style>{`
        .gh-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .gh-repo { display: flex; flex-direction: column; gap: 10px; padding: 22px; border: 1px solid #1a1a2e; border-radius: 12px; background: linear-gradient(180deg,#0f0f1a,#0b0b13); text-decoration: none; transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1), border-color 0.4s, box-shadow 0.4s; }
        .gh-repo:hover { transform: translateY(-4px); border-color: #00d4ff55; box-shadow: 0 0 24px rgba(0,212,255,0.08); }
        .gh-repo:hover .gh-arrow { transform: translate(3px,-3px); color: #00d4ff; }
        .gh-arrow { transition: transform 0.4s, color 0.4s; }
        .gh-skel { height: 132px; border: 1px solid #1a1a2e; border-radius: 12px; background: linear-gradient(100deg,#0f0f1a 30%,#14141f 50%,#0f0f1a 70%); background-size: 200% 100%; animation: gh-shimmer 1.4s linear infinite; }
        @keyframes gh-shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
        @media (max-width: 900px) { .gh-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .gh-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={s.head}>
        <div style={s.kicker}><span style={s.dot} />{t('activityKicker')}</div>
        <p style={s.sub}>{t('activitySub')}</p>
      </div>

      <div className="gh-grid" style={{ marginTop: 26 }}>
        {gh.loading && repos.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="gh-skel" />)
          : repos.map((r) => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="gh-repo">
                <div style={s.repoTop}>
                  <GitBranch size={16} strokeWidth={1.5} style={{ color: '#00d4ff' }} />
                  <ArrowUpRight className="gh-arrow" size={15} strokeWidth={1.5} style={{ color: '#5a5a70' }} />
                </div>
                <div style={s.repoName}>{r.name}</div>
                <div style={s.repoDesc}>{r.description || '—'}</div>
                <div style={s.repoMeta}>
                  {r.language && <span style={s.metaItem}><span style={s.langDot} />{r.language}</span>}
                  {r.stars > 0 && <span style={s.metaItem}><Star size={11} strokeWidth={1.6} /> {r.stars}</span>}
                  <span style={{ ...s.metaItem, marginLeft: 'auto', color: '#5a5a70' }}>{t('activityUpdated')} {timeAgo(r.updated, lang)}</span>
                </div>
              </a>
            ))}
      </div>

      <a href="https://github.com/gorkemergune" target="_blank" rel="noopener noreferrer" className="link-hover" style={s.cta}>
        {t('activityCta')} <ArrowUpRight size={14} strokeWidth={1.5} />
      </a>
    </section>
  );
}

const s = {
  section: { maxWidth: 1400, margin: '0 auto', padding: '40px 48px 90px', position: 'relative', zIndex: 2 },
  head: { marginBottom: 6 },
  kicker: { display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', color: '#6a6a82' },
  dot: { width: 7, height: 7, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' },
  sub: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 16, color: '#8a8aa0', marginTop: 10 },
  repoTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  repoName: { fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#e6e6f0', fontWeight: 500, wordBreak: 'break-word' },
  repoDesc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, lineHeight: 1.55, color: '#8a8aa0', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  repoMeta: { display: 'flex', alignItems: 'center', gap: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8a8aa0' },
  metaItem: { display: 'inline-flex', alignItems: 'center', gap: 5 },
  langDot: { width: 8, height: 8, borderRadius: '50%', background: '#00d4ff' },
  cta: { display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 32, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.08em', color: '#c0c0d4' },
};
