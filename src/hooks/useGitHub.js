import { useEffect, useState } from 'react';

// Live GitHub stats for the home page. Fetches public profile, repos, and the
// real authored-commit count, caches to localStorage (6h), and falls back to a
// recent real snapshot if the network/API is unavailable or rate-limited.
const USER = 'gorkemergune';
// v3: the home panel lists EVERY public repository the account owns (all
// pages of the API, forks excluded — they are other people's code), sorted by
// pushed_at, newest first. v1/v2 caches held 6 / 20.
const CACHE_KEY = 'gh_stats_v3';
const PER_PAGE = 100;
const MAX_PAGES = 10;
const TTL = 6 * 60 * 60 * 1000;

// Real snapshot (updated at build time) — used only until a live fetch lands.
const SNAPSHOT = { publicRepos: 31, commits: 418, followers: 19, stars: 9, repos: [] };

const readCache = () => {
  try {
    const v = JSON.parse(localStorage.getItem(CACHE_KEY));
    return v && typeof v._ts === 'number' ? v : null;
  } catch { return null; }
};
const writeCache = (v) => { try { localStorage.setItem(CACHE_KEY, JSON.stringify(v)); } catch { /* noop */ } };

// Follows the API's pages until one comes back short, so repositories beyond
// the first 100 are never dropped silently.
async function fetchAllRepos(ok) {
  const all = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const batch = await fetch(`https://api.github.com/users/${USER}/repos?type=owner&sort=pushed&per_page=${PER_PAGE}&page=${page}`).then(ok);
    if (!Array.isArray(batch)) break;
    all.push(...batch);
    if (batch.length < PER_PAGE) break;
  }
  return all;
}

const slim = (r) => ({
  name: r.name,
  description: r.description || '',
  url: r.html_url,
  language: r.language || '',
  stars: r.stargazers_count || 0,
  updated: r.pushed_at || r.updated_at, // last push = the activity the list is sorted by
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
        fetchAllRepos(ok),
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
          ? repos.filter((r) => !r.fork).map(slim).sort((a, b) => String(b.updated).localeCompare(String(a.updated)))
          : base.repos,
        forks: repos ? repos.filter((r) => r.fork).length : base.forks ?? 0,
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
