import { useLang } from '../../i18n.jsx';

// One line stating where the algorithm numbers came from: cyan dot = read
// live from the repository, hollow dot = browser cache or the verified
// snapshot. Shared by the Learning Path section and the home strip.
export default function AlgoSource({ source, className = '' }) {
  const { t } = useLang();
  const text = source === 'live' ? t('alSrcLive') : source === 'cache' ? t('alSrcCache') : t('alSrcSnap');
  return (
    <span className={`al-src${source === 'live' ? ' live' : ''} ${className}`}>
      <i aria-hidden="true" />{text}
    </span>
  );
}

export const ALGO_SOURCE_CSS = `
  .al-src { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-meta); }
  .al-src i { width: 6px; height: 6px; border-radius: 50%; border: 1px solid #5c6370; flex: none; }
  .al-src.live { color: #9fdbe6; }
  .al-src.live i { background: var(--c-primary); border-color: var(--c-primary); box-shadow: 0 0 6px rgba(0,240,255,0.7); }
`;

// Platforms that have a name/logo; "competitive" is contest practice, not a platform.
export const PLATFORMS = ['leetcode', 'algoleague', 'neetcode', 'hackerrank'];
export const PLATFORM_NAMES = { leetcode: 'LeetCode', algoleague: 'AlgoLeague', neetcode: 'NeetCode', hackerrank: 'HackerRank' };
export const LANG_NAMES = { python: 'Python', cpp: 'C++', c: 'C' };
