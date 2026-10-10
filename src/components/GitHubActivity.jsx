import { ArrowUpRight, Star } from 'lucide-react';
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
    <div className="ds-block" aria-label={t('activityKicker')}>
      <style>{`
        .gh-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .gh-name { font-family: var(--font-mono); font-size: 13.5px; color: var(--ds-ink); word-break: break-word; display: flex; justify-content: space-between; gap: 12px; }
        .gh-name svg { flex: none; color: var(--ds-meta); transition: transform 0.35s, color 0.35s; }
        a.ds-cell:hover .gh-name svg { color: var(--ds-accent); transform: translate(3px,-3px); }
        .gh-desc { font-family: var(--font-body); font-size: 13.5px; line-height: 1.55; color: var(--ds-body); flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .gh-meta { display: flex; gap: 14px; align-items: center; }
        .gh-meta span { display: inline-flex; align-items: center; gap: 5px; }
        .gh-skel { height: 132px; background: linear-gradient(100deg,#0c0c14 30%,#12121c 50%,#0c0c14 70%); background-size: 200% 100%; animation: gh-shimmer 1.4s linear infinite; }
        @keyframes gh-shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
        @media (max-width: 900px) { .gh-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 600px) { .gh-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="ds-subhead">
        <span className="ds-meta">{t('activityKicker')}</span>
        <a href="https://github.com/gorkemergune" target="_blank" rel="noopener noreferrer" className="ds-link">
          {t('activityCta')} <ArrowUpRight size={13} strokeWidth={1.5} />
        </a>
      </div>
      <ul className="ds-cells gh-grid">
        {gh.loading && repos.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <li key={i}><div className="gh-skel" /></li>)
          : repos.map((r) => (
              <li key={r.name}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="ds-cell">
                  <span className="gh-name">{r.name}<ArrowUpRight size={14} strokeWidth={1.5} /></span>
                  <span className="gh-desc">{r.description || '—'}</span>
                  <span className="gh-meta ds-meta">
                    {r.language && <span>{r.language}</span>}
                    {r.stars > 0 && <span><Star size={10} strokeWidth={1.6} /> {r.stars}</span>}
                    <span style={{ marginLeft: 'auto' }}>{t('activityUpdated')} {timeAgo(r.updated, lang)}</span>
                  </span>
                </a>
              </li>
            ))}
      </ul>
    </div>
  );
}
