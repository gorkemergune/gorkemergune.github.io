import { useEffect, useState } from 'react';

// Live GitHub stats for the home page. Fetches public profile, repos, and the
// real authored-commit count, caches to localStorage (6h), and falls back to a
// recent real snapshot if the network/API is unavailable or rate-limited.
const USER = 'gorkemergune';
const CACHE_KEY = 'gh_stats_v1';
const TTL = 6 * 60 * 60 * 1000;

// Real snapshot (updated at build time) — used only until a live fetch lands.
const SNAPSHOT = { publicRepos: 31, commits: 418, followers: 19, stars: 9, repos: [] };
const HIDE = new Set(['gorkemergune', 'gorkemergune.github.io']);

const readCache = () => {
  try {
    const v = JSON.parse(localStorage.getItem(CACHE_KEY));
    return v && typeof v._ts === 'number' ? v : null;
  } catch { return null; }
};
const writeCache = (v) => { try { localStorage.setItem(CACHE_KEY, JSON.stringify(v)); } catch { /* noop */ } };

const slim = (r) => ({
  name: r.name,
  description: r.description || '',
  url: r.html_url,
  language: r.language || '',
  stars: r.stargazers_count || 0,
  updated: r.pushed_at || r.updated_at,
});

export function useGitHub() {
  const cached = typeof window !== 'undefined' ? readCache() : null;
  const [data, setData] = useState(() => ({ ...SNAPSHOT, ...(cached || {}), loading: !cached }));

  useEffect(() => {
    const fresh = cached && Date.now() - cached._ts < TTL;
    if (fresh) { setData({ ...cached, loading: false }); return; }

    let alive = true;
    const ok = (r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status))));
    (async () => {
      const [userR, reposR, commitsR] = await Promise.allSettled([
        fetch(`https://api.github.com/users/${USER}`).then(ok),
        fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=100`).then(ok),
        fetch(`https://api.github.com/search/commits?q=author:${USER}&per_page=1`, {
          headers: { Accept: 'application/vnd.github.cloak-preview+json' },
        }).then(ok),
      ]);
      if (!alive) return;

      const user = userR.status === 'fulfilled' ? userR.value : null;
      const repos = reposR.status === 'fulfilled' && Array.isArray(reposR.value) ? reposR.value : null;
      const commits = commitsR.status === 'fulfilled' ? commitsR.value?.total_count : null;
      const base = cached || SNAPSHOT;

      const result = {
        publicRepos: user?.public_repos ?? base.publicRepos,
        followers: user?.followers ?? base.followers,
        commits: commits ?? base.commits,
        stars: repos ? repos.reduce((a, r) => a + (r.stargazers_count || 0), 0) : base.stars,
        repos: repos
          ? repos.filter((r) => !r.fork && !HIDE.has(r.name)).slice(0, 6).map(slim)
          : base.repos,
        _ts: Date.now(),
      };
      setData({ ...result, loading: false });
      // Only persist when we actually got fresh network data.
      if (user || repos || commits != null) writeCache(result);
    })();

    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
}
