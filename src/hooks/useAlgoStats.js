import { useEffect, useState } from 'react';

// The ONE source for algorithm-practice numbers (Learning Path section and
// the home teaser both read this hook, so they cannot disagree).
// Reads the auto-generated README of github.com/gorkemergune/algorithms,
// caches it for 6 h, and falls back to SNAPSHOT when offline/rate-limited.
// `source` says which one the visitor sees: 'live' | 'cache' | 'snapshot'.
const README = 'https://raw.githubusercontent.com/gorkemergune/algorithms/main/readme.md';
const CACHE_KEY = 'algo_stats_v3';
const TTL = 6 * 60 * 60 * 1000;

// Verified against the live README on 11 October 2026 (Total Solutions 173;
// per platform and per language exactly as below).
export const SNAPSHOT_DATE = '2026-10-11';
const SNAPSHOT = {
  leetcode: 111, algoleague: 9, neetcode: 7, hackerrank: 3, competitive: 43, total: 173,
  langs: { python: 166, cpp: 6, c: 1 },
};

const readCache = () => {
  try { const v = JSON.parse(localStorage.getItem(CACHE_KEY)); return v && typeof v._ts === 'number' ? v : null; } catch { return null; }
};
const writeCache = (v) => { try { localStorage.setItem(CACHE_KEY, JSON.stringify(v)); } catch { /* noop */ } };

const num = (s) => parseInt(String(s).replace(/[*,\s]/g, ''), 10);

// Pull the bold **N** total from the table line that mentions `name`.
const lineTotal = (md, name) => {
  const line = md.split('\n').find((l) => l.toLowerCase().includes(name.toLowerCase()) && l.includes('**'));
  if (!line) return null;
  const nums = [...line.matchAll(/\*\*(\d[\d,]*)\*\*/g)].map((m) => num(m[1]));
  return nums.length ? nums[nums.length - 1] : null;
};

// Per-language totals from the "| **Total** | C | C++ | Python | Total |" row,
// mapped through the table's own header so the column order is not assumed.
const langTotals = (md) => {
  const lines = md.split('\n');
  const head = lines.find((l) => /\|\s*Platform\s*\|/i.test(l));
  const total = lines.find((l) => /\|\s*\*\*Total\*\*\s*\|/i.test(l));
  if (!head || !total) return null;
  const cols = head.split('|').map((c) => c.trim().toLowerCase());
  const vals = total.split('|').map((c) => c.trim());
  const pick = (name) => { const i = cols.indexOf(name); return i > 0 ? num(vals[i]) : null; };
  const out = { python: pick('python'), cpp: pick('c++'), c: pick('c') };
  return Object.values(out).every((v) => Number.isFinite(v)) ? out : null;
};

function parse(md) {
  const badge = md.match(/Total%20Solutions-(\d+)/) || md.match(/Total Solutions[^\d]*(\d+)/i);
  return {
    leetcode: lineTotal(md, '[LeetCode]') ?? lineTotal(md, 'LeetCode') ?? SNAPSHOT.leetcode,
    algoleague: lineTotal(md, 'AlgoLeague') ?? SNAPSHOT.algoleague,
    neetcode: lineTotal(md, 'NeetCode') ?? SNAPSHOT.neetcode,
    hackerrank: lineTotal(md, 'HackerRank') ?? SNAPSHOT.hackerrank,
    competitive: lineTotal(md, 'Competitive') ?? SNAPSHOT.competitive,
    total: (badge ? parseInt(badge[1], 10) : null) ?? lineTotal(md, '| **Total**') ?? SNAPSHOT.total,
    langs: langTotals(md) ?? SNAPSHOT.langs,
  };
}

export function useAlgoStats() {
  const cached = typeof window !== 'undefined' ? readCache() : null;
  const [data, setData] = useState(() => (cached
    ? { ...SNAPSHOT, ...cached, source: 'cache', loading: false }
    : { ...SNAPSHOT, source: 'snapshot', loading: true }));

  useEffect(() => {
    if (cached && Date.now() - cached._ts < TTL) return undefined;
    let alive = true;
    fetch(README)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((md) => {
        if (!alive) return;
        const stats = { ...parse(md), _ts: Date.now() };
        setData({ ...stats, source: 'live', loading: false });
        writeCache(stats);
      })
      .catch(() => { if (alive) setData(cached ? { ...SNAPSHOT, ...cached, source: 'cache', loading: false } : { ...SNAPSHOT, source: 'snapshot', loading: false }); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
}
