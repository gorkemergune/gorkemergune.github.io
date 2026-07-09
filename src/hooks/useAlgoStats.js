import { useEffect, useState } from 'react';

// Reads the auto-updated stats from the `algorithms` repo README (regenerated
// on every push) so the Algorithm Journey stays current. Caches for 6h and
// falls back to a recent real snapshot when offline / rate-limited.
const README = 'https://raw.githubusercontent.com/gorkemergune/algorithms/main/readme.md';
const CACHE_KEY = 'algo_stats_v1';
const TTL = 6 * 60 * 60 * 1000;

const SNAPSHOT = { leetcode: 103, algoleague: 9, neetcode: 6, competitive: 36, total: 154 };

const readCache = () => {
  try { const v = JSON.parse(localStorage.getItem(CACHE_KEY)); return v && typeof v._ts === 'number' ? v : null; } catch { return null; }
};
const writeCache = (v) => { try { localStorage.setItem(CACHE_KEY, JSON.stringify(v)); } catch { /* noop */ } };

// Pull the bold **N** total from the table line that mentions `name`.
const lineTotal = (md, name) => {
  const line = md.split('\n').find((l) => l.toLowerCase().includes(name.toLowerCase()) && l.includes('**'));
  if (!line) return null;
  const nums = [...line.matchAll(/\*\*(\d[\d,]*)\*\*/g)].map((m) => parseInt(m[1].replace(/,/g, ''), 10));
  return nums.length ? nums[nums.length - 1] : null;
};

function parse(md) {
  const badge = md.match(/Total%20Solutions-(\d+)/) || md.match(/Total Solutions[^\d]*(\d+)/i);
  return {
    leetcode: lineTotal(md, '[LeetCode]') ?? lineTotal(md, 'LeetCode') ?? SNAPSHOT.leetcode,
    algoleague: lineTotal(md, 'AlgoLeague') ?? SNAPSHOT.algoleague,
    neetcode: lineTotal(md, 'NeetCode') ?? SNAPSHOT.neetcode,
    competitive: lineTotal(md, 'Competitive') ?? SNAPSHOT.competitive,
    total: (badge ? parseInt(badge[1], 10) : null) ?? lineTotal(md, '| **Total**') ?? SNAPSHOT.total,
  };
}

export function useAlgoStats() {
  const cached = typeof window !== 'undefined' ? readCache() : null;
  const [data, setData] = useState(() => ({ ...SNAPSHOT, ...(cached || {}), loading: !cached }));

  useEffect(() => {
    if (cached && Date.now() - cached._ts < TTL) { setData({ ...cached, loading: false }); return; }
    let alive = true;
    fetch(README)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((md) => {
        if (!alive) return;
        const stats = { ...parse(md), _ts: Date.now() };
        setData({ ...stats, loading: false });
        writeCache(stats);
      })
      .catch(() => { if (alive) setData((d) => ({ ...(cached || SNAPSHOT), loading: false })); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
}
