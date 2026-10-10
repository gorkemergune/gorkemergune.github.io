import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useAlgoStats } from '../hooks/useAlgoStats';
import AnimatedCounter from './AnimatedCounter';
import { PLATFORM_LOGOS } from '../data/techLogos';

// Solved-problem counts per platform, live from the algorithms repo. Thin
// neutral bars; each platform carries its own logo (a dot where none exists).
// A platform with no recorded count is not shown at all.
export default function AlgorithmJourney() {
  const { t } = useLang();
  const a = useAlgoStats();

  const platforms = [
    { key: 'leetcode', label: 'LeetCode', value: a.leetcode, color: '#ffa116' },
    { key: 'algoleague', label: 'AlgoLeague', value: a.algoleague, color: '#00f0ff' },
    { key: 'competitive', label: 'Competitive', value: a.competitive, color: '#00e5a0' },
    { key: 'neetcode', label: 'NeetCode', value: a.neetcode, color: '#7c5cff' },
    { key: 'hackerrank', label: 'HackerRank', value: a.hackerrank, color: '#ffd166' },
  ];
  const shown = platforms.filter((p) => p.value > 0);
  const max = Math.max(1, ...shown.map((p) => p.value || 0));

  return (
    <div className="aj" aria-label={t('algoKicker')}>
      <style>{`
        .aj { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; margin-top: 64px; align-items: start; }
        .aj-total { font-family: var(--font-display); font-weight: 400; font-size: 88px; line-height: 0.95; letter-spacing: -0.04em; color: var(--ds-ink); font-variant-numeric: tabular-nums; margin-top: 20px; }
        .aj-sub { margin-top: 16px; max-width: 380px; }
        .aj .ds-link { margin-top: 28px; }
        .aj-bars { list-style: none; border-top: 1px solid var(--ds-line); }
        .aj-bars li { display: grid; grid-template-columns: 140px minmax(0, 1fr) 56px; gap: 24px; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--ds-line); }
        .aj-name { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-body); font-size: 14px; color: #c6cdd8; }
        .aj-name i { width: 6px; height: 6px; border-radius: 50%; margin: 0 6px; }
        .aj-name img { width: 18px; height: 18px; object-fit: contain; flex: none; }
        .aj-fill { animation: aj-grow 1.1s cubic-bezier(0.2,0.8,0.2,1) both; }
        @keyframes aj-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .aj-val { text-align: right; font-family: var(--font-mono); font-size: 14px; color: var(--ds-ink); font-variant-numeric: tabular-nums; }
        @media (max-width: 1000px) { .aj { grid-template-columns: 1fr; gap: 32px; } }
        @media (max-width: 600px) { .aj { margin-top: 48px; } .aj-total { font-size: 64px; } .aj-bars li { grid-template-columns: 110px minmax(0, 1fr) 44px; gap: 14px; } }
      `}</style>
      <div>
        <div className="ds-meta">{t('algoTotalLabel')}</div>
        <div className="aj-total"><AnimatedCounter target={a.total} /></div>
        <p className="ds-body aj-sub">{t('algoSub')}</p>
        <a href="https://github.com/gorkemergune/algorithms" target="_blank" rel="noopener noreferrer" className="ds-link">
          /algorithms <ArrowUpRight size={13} strokeWidth={1.5} />
        </a>
      </div>
      <ul className="aj-bars">
        {shown.map((p, i) => (
          <li key={p.key}>
            <span className="aj-name">
              {PLATFORM_LOGOS[p.key]
                ? <img src={PLATFORM_LOGOS[p.key].src} alt="" width="18" height="18" />
                : <i style={{ background: p.color }} />}
              {p.label}
            </span>
            <span className="aj-track progress"><span className="aj-fill" style={{ width: `${((p.value || 0) / max) * 100}%`, animationDelay: `${i * 0.08}s` }} /></span>
            <span className="aj-val"><AnimatedCounter target={p.value} /></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
