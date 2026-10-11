import { useEffect, useState } from 'react';
import HF_ARTIFACTS from '../data/huggingface';

// Every public model and dataset under @gorkemergune, straight from the Hub
// (two list calls), newest change first. Curated fields from data/huggingface.js
// (task label, description) are merged in by id; repos without a curated entry
// show only what the Hub returns. If the Hub cannot be reached, the curated
// list with its last-known download counts is used and `source` says so.
// No filler: the list is exactly what exists on the account.
const AUTHOR = 'gorkemergune';
const CACHE_KEY = 'hf_repos_v2';
const TTL = 6 * 60 * 60 * 1000;
const PIPELINE = { 'text-generation': 'Text Generation', 'sentence-similarity': 'Sentence Similarity', 'text-classification': 'Text Classification' };

const readCache = () => { try { const v = JSON.parse(localStorage.getItem(CACHE_KEY)); return v && typeof v._ts === 'number' && Array.isArray(v.items) ? v : null; } catch { return null; } };
const writeCache = (v) => { try { localStorage.setItem(CACHE_KEY, JSON.stringify(v)); } catch { /* noop */ } };

const CURATED = new Map(HF_ARTIFACTS.map((a) => [a.id, a]));
const fallback = () => HF_ARTIFACTS.map((a) => ({ id: a.id, name: a.name, kind: a.kind, url: a.url, task: a.task, descEn: a.descEn, descTr: a.descTr, downloads: a.downloads ?? 0, updated: null }));

const fromHub = (r, kind) => {
  const c = CURATED.get(r.id);
  const name = r.id.split('/').pop();
  return {
    id: r.id, name, kind,
    url: `https://huggingface.co/${kind === 'dataset' ? 'datasets/' : ''}${r.id}`,
    task: c?.task || PIPELINE[r.pipeline_tag] || '',
    descEn: c?.descEn || '', descTr: c?.descTr || '',
    downloads: typeof r.downloads === 'number' ? r.downloads : 0,
    updated: r.lastModified || r.createdAt || null,
  };
};

export function useHFRepos() {
  const cached = typeof window !== 'undefined' ? readCache() : null;
  const [data, setData] = useState(() => (cached ? { items: cached.items, source: 'cache', _ts: cached._ts } : { items: fallback(), source: 'fallback', loading: true }));

  useEffect(() => {
    if (cached && Date.now() - cached._ts < TTL) return undefined;
    let alive = true;
    // The Hub pages with a Link: <…>; rel="next" header; follow it (bounded).
    const get = async (path) => {
      const out = []; let url = `https://huggingface.co/api/${path}?author=${AUTHOR}&limit=1000&full=true`;
      for (let i = 0; url && i < 5; i += 1) {
        const r = await fetch(url);
        if (!r.ok) throw new Error(String(r.status));
        out.push(...(await r.json()));
        const next = /<([^>]+)>;\s*rel="next"/.exec(r.headers.get('Link') || '');
        url = next ? next[1] : null;
      }
      return out;
    };
    Promise.all([get('models'), get('datasets')])
      .then(([models, datasets]) => {
        if (!alive) return;
        const items = [...models.map((r) => fromHub(r, 'model')), ...datasets.map((r) => fromHub(r, 'dataset'))]
          .sort((a, b) => String(b.updated).localeCompare(String(a.updated)));
        const v = { items, _ts: Date.now() };
        setData({ ...v, source: 'live' });
        writeCache(v);
      })
      .catch(() => { if (alive) setData(cached ? { items: cached.items, source: 'cache', _ts: cached._ts } : { items: fallback(), source: 'fallback' }); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
}
