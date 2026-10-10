import { useLang } from '../i18n.jsx';
import PROJECTS from '../data/projects';
import COMPETITIONS from '../data/competitions';
import { useGitHub } from '../hooks/useGitHub';
import { useAlgoStats } from '../hooks/useAlgoStats';
import AnimatedCounter from './AnimatedCounter';

// Six counts on one hairline row. Every number derives from data or a live
// API; nothing here is hardcoded. Rendered inside the home "numbers" section.
export default function FeaturedMetrics() {
  const { t } = useLang();
  const gh = useGitHub();
  const algo = useAlgoStats();

  const metrics = [
    { n: PROJECTS.length, label: t('mProjects') },
    { n: gh.publicRepos, label: t('mRepos'), live: true },
    { n: gh.commits, label: t('mCommits'), live: true },
    { n: algo.total, label: t('mAlgo'), live: true },
    { n: COMPETITIONS.length, label: t('mCompetitions') },
    { n: (t('researchItems') || []).length, label: t('mResearch') },
  ];

  return (
    <div className="fm" aria-label={t('metricsKicker')}>
      <style>{`
        .fm-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); border-top: 1px solid var(--ds-line); border-bottom: 1px solid var(--ds-line); }
        .fm-cell { position: relative; padding: 32px 24px 28px; }
        .fm-cell + .fm-cell { border-left: 1px solid var(--ds-line); }
        .fm-num { font-family: var(--font-display); font-weight: 400; font-size: 48px; line-height: 1; letter-spacing: -0.03em; color: var(--ds-ink); font-variant-numeric: tabular-nums; }
        .fm-label { margin-top: 14px; line-height: 1.5; }
        .fm-live { position: absolute; top: 14px; right: 16px; display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.16em; color: var(--ds-accent); }
        .fm-live i { width: 5px; height: 5px; border-radius: 50%; background: var(--ds-accent); animation: fm-pulse 1.8s ease-in-out infinite; }
        @keyframes fm-pulse { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
        @media (max-width: 1100px) {
          .fm-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .fm-cell:nth-child(4) { border-left: none; }
          .fm-cell:nth-child(n+4) { border-top: 1px solid var(--ds-line); }
        }
        @media (max-width: 600px) {
          .fm-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .fm-cell { padding: 24px 16px 20px; }
          .fm-cell:nth-child(4) { border-left: 1px solid var(--ds-line); }
          .fm-cell:nth-child(odd) { border-left: none; }
          .fm-cell:nth-child(n+3) { border-top: 1px solid var(--ds-line); }
          .fm-num { font-size: 38px; }
        }
      `}</style>
      <div className="fm-grid">
        {metrics.map((m) => (
          <div key={m.label} className="fm-cell">
            {m.live && <span className="fm-live"><i />{t('metricLive')}</span>}
            <div className="fm-num"><AnimatedCounter target={m.n} /></div>
            <div className="fm-label ds-meta">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
