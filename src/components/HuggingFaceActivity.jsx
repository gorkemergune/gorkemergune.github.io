import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Box, Database } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import HF_ARTIFACTS, { HF_PROFILE } from '../data/huggingface';

// Live download counts from the Hub API, seeded with the last-known values in
// huggingface.js so the section still renders if the network/API is unavailable.
// Returns per-id download counts plus `liveIds`: the ids whose count came
// from the Hub just now (the rest show the last-known value from the data).
export function useLiveDownloads() {
  const [liveIds, setLiveIds] = useState(() => new Set());
  const [dls, setDls] = useState(() =>
    Object.fromEntries(HF_ARTIFACTS.map((a) => [a.id, a.downloads ?? 0])),
  );

  useEffect(() => {
    let alive = true;
    Promise.allSettled(
      HF_ARTIFACTS.map(async (a) => {
        const path = a.kind === 'dataset' ? 'datasets' : 'models';
        const res = await fetch(`https://huggingface.co/api/${path}/${a.id}`);
        if (!res.ok) throw new Error(`HF ${res.status}`);
        const json = await res.json();
        return [a.id, typeof json.downloads === 'number' ? json.downloads : a.downloads ?? 0];
      }),
    ).then((results) => {
      if (!alive) return;
      setDls((prev) => {
        const next = { ...prev };
        for (const r of results) if (r.status === 'fulfilled') next[r.value[0]] = r.value[1];
        return next;
      });
      setLiveIds(new Set(results.filter((r) => r.status === 'fulfilled').map((r) => r.value[0])));
    });
    return () => { alive = false; };
  }, []);

  return { dls, liveIds };
}

function HFCell({ a, downloads, lang, t, loc }) {
  const isDataset = a.kind === 'dataset';
  const Icon = isDataset ? Database : Box;
  const dl = downloads[a.id] ?? a.downloads ?? 0;
  return (
    <div className="ds-cell">
      <div className="hf-top ds-meta">
        <span className="hf-type"><Icon size={12} strokeWidth={1.6} />{isDataset ? t('hfDataset') : t('hfModel')}</span>
        <span>{a.task}</span>
      </div>
      <a href={a.url} target="_blank" rel="noopener noreferrer" className="hf-name">
        <span><span style={{ color: 'var(--ds-meta)' }}>gorkemergune/</span>{a.name}</span>
        <ArrowUpRight size={14} strokeWidth={1.5} />
      </a>
      <p className="hf-desc">{loc(a.descEn, a.descTr)}</p>
      <dl className="hf-stats">
        <div>
          <dt className="ds-meta">{loc('Downloads', 'İndirme')}</dt>
          <dd>{dl.toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US')}</dd>
        </div>
        {a.stats.map((st) => (
          <div key={st.label}><dt className="ds-meta">{st.label}</dt><dd>{st.value}</dd></div>
        ))}
      </dl>
      <div className="hf-foot">
        <span className="ds-meta">{a.tags.join(' · ')}</span>
        {a.project && (
          <Link to={`/project/${a.project}`} className="hf-proj ds-meta">
            {t('hfViewProject')} <ArrowUpRight size={11} strokeWidth={1.5} />
          </Link>
        )}
      </div>
    </div>
  );
}

// Models and datasets on the Hub, one hairline grid. Download counts refresh
// live from the Hub API and fall back to the values in huggingface.js.
export default function HuggingFaceActivity() {
  const { lang, t } = useLang();
  const loc = (en, tr) => (lang === 'tr' && tr ? tr : en);
  const { dls: downloads } = useLiveDownloads();
  const ordered = [
    ...HF_ARTIFACTS.filter((a) => a.kind !== 'dataset'),
    ...HF_ARTIFACTS.filter((a) => a.kind === 'dataset'),
  ];

  return (
    <div className="ds-block" aria-label={t('hfKicker')}>
      <style>{`
        .hf-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .hf-top { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .hf-type { display: inline-flex; align-items: center; gap: 7px; color: #c6cdd8; }
        .hf-name { display: flex; justify-content: space-between; gap: 10px; margin-top: 8px; font-family: var(--font-mono); font-size: 13px; line-height: 1.45; color: var(--ds-ink); word-break: break-word; }
        .hf-name svg { flex: none; color: var(--ds-meta); transition: transform 0.35s, color 0.35s; }
        .hf-name:hover svg { color: var(--ds-accent); transform: translate(3px,-3px); }
        .hf-desc { flex: 1; font-family: var(--font-body); font-size: 13.5px; line-height: 1.6; color: var(--ds-body); }
        .hf-stats { display: flex; flex-wrap: wrap; gap: 10px 24px; }
        .hf-stats dd { margin-top: 4px; font-family: var(--font-body); font-size: 15px; color: var(--ds-ink); }
        .hf-foot { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; padding-top: 12px; border-top: 1px solid var(--ds-line-soft); }
        .hf-proj { display: inline-flex; align-items: center; gap: 5px; color: #c6cdd8; transition: color 0.3s; }
        .hf-proj:hover { color: var(--ds-accent); }
        @media (max-width: 1000px) { .hf-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 680px) { .hf-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="ds-subhead">
        <span className="ds-meta">{t('hfKicker')}</span>
        <a href={HF_PROFILE} target="_blank" rel="noopener noreferrer" className="ds-link">
          {t('hfCta')} <ArrowUpRight size={13} strokeWidth={1.5} />
        </a>
      </div>
      <ul className="ds-cells hf-grid">
        {ordered.map((a) => (
          <li key={a.id}><HFCell a={a} downloads={downloads} lang={lang} t={t} loc={loc} /></li>
        ))}
      </ul>
    </div>
  );
}
