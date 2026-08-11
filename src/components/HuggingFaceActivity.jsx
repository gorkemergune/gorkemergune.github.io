import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Box, Database, Download } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import HF_ARTIFACTS, { HF_PROFILE } from '../data/huggingface';

const HF = '#ffd21e';

// Live download counts from the Hub API, seeded with the last-known values in
// huggingface.js so the section still renders if the network/API is unavailable.
function useLiveDownloads() {
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
    });
    return () => { alive = false; };
  }, []);

  return dls;
}

export default function HuggingFaceActivity() {
  const { lang, t } = useLang();
  const loc = (en, tr) => (lang === 'tr' && tr ? tr : en);
  const downloads = useLiveDownloads();

  return (
    <section className="container" style={s.section} aria-label="Hugging Face activity">
      <style>{`
        .hf-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .hf-card { display: flex; flex-direction: column; gap: 12px; padding: 22px; border: 1px solid #24240f; border-radius: 12px; background: linear-gradient(180deg,#12120a,#0b0b06); transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1), border-color 0.4s, box-shadow 0.4s; }
        .hf-card:hover { transform: translateY(-4px); border-color: ${HF}55; box-shadow: 0 0 26px rgba(255,210,30,0.10); }
        .hf-card:hover .hf-arrow { transform: translate(3px,-3px); color: ${HF}; }
        .hf-arrow { transition: transform 0.4s, color 0.4s; }
        @media (max-width: 720px) { .hf-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={s.head}>
        <div style={s.kicker}><span style={s.dot} />{t('hfKicker')}</div>
        <p style={s.sub}>{t('hfSub')}</p>
      </div>

      <div className="hf-grid" style={{ marginTop: 26 }}>
        {HF_ARTIFACTS.map((a) => {
          const isDataset = a.kind === 'dataset';
          const Icon = isDataset ? Database : Box;
          const dl = downloads[a.id] ?? a.downloads ?? 0;
          return (
            <div key={a.id} className="hf-card">
              <div style={s.cardTop}>
                <span style={s.typeBadge}>
                  <Icon size={12} strokeWidth={1.7} style={{ color: HF }} />
                  {isDataset ? t('hfDataset') : t('hfModel')}
                </span>
                <span style={s.task}>{a.task}</span>
                <span style={s.dlBadge} title={loc('Downloads (live from the Hub)', 'İndirme (Hub’dan canlı)')}>
                  <Download size={11} strokeWidth={1.7} style={{ color: HF }} />
                  {dl.toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US')}
                </span>
                <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ lineHeight: 0 }} aria-label={a.name}>
                  <ArrowUpRight className="hf-arrow" size={16} strokeWidth={1.5} style={{ color: '#6a6a58' }} />
                </a>
              </div>

              <a href={a.url} target="_blank" rel="noopener noreferrer" style={s.name}>
                <span style={{ color: '#6a6a58' }}>gorkemergune/</span>{a.name}
              </a>

              <p style={s.desc}>{loc(a.descEn, a.descTr)}</p>

              <div style={s.statRow}>
                <span style={s.stat}>
                  <span style={s.statLabel}>{loc('Downloads', 'İndirme')}</span>
                  <span style={s.statVal}>{dl.toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US')}</span>
                </span>
                {a.stats.map((st) => (
                  <span key={st.label} style={s.stat}>
                    <span style={s.statLabel}>{st.label}</span>
                    <span style={s.statVal}>{st.value}</span>
                  </span>
                ))}
              </div>

              <div style={s.footer}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {a.tags.map((tg) => (
                    <span key={tg} style={s.tag}>{tg}</span>
                  ))}
                </div>
                {a.project && (
                  <Link to={`/project/${a.project}`} className="link-hover" style={s.projectLink}>
                    {t('hfViewProject')} <ArrowUpRight size={12} strokeWidth={1.5} />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <a href={HF_PROFILE} target="_blank" rel="noopener noreferrer" className="link-hover" style={s.cta}>
        {t('hfCta')} <ArrowUpRight size={14} strokeWidth={1.5} />
      </a>
    </section>
  );
}

const s = {
  section: { maxWidth: 1400, margin: '0 auto', padding: '10px 48px 96px', position: 'relative', zIndex: 2 },
  head: { marginBottom: 6 },
  kicker: { display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', color: '#8a8258' },
  dot: { width: 7, height: 7, borderRadius: '50%', background: HF, boxShadow: `0 0 8px ${HF}` },
  sub: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 16, color: '#8a8aa0', marginTop: 10 },
  cardTop: { display: 'flex', alignItems: 'center', gap: 10 },
  typeBadge: { display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', color: HF, padding: '3px 8px', border: `1px solid ${HF}44`, borderRadius: 999, background: 'rgba(255,210,30,0.06)' },
  task: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.06em', color: '#7a7a68' },
  dlBadge: { display: 'inline-flex', alignItems: 'center', gap: 5, marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.04em', color: '#d8d0a0', padding: '3px 8px', border: `1px solid ${HF}33`, borderRadius: 999, background: 'rgba(255,210,30,0.05)' },
  name: { fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#ededdf', fontWeight: 500, wordBreak: 'break-word', textDecoration: 'none', lineHeight: 1.4 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, lineHeight: 1.6, color: '#9a9a86', flex: 1 },
  statRow: { display: 'flex', gap: 22, flexWrap: 'wrap' },
  stat: { display: 'flex', flexDirection: 'column', gap: 3 },
  statLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6a6a58' },
  statVal: { fontFamily: "'Instrument Serif', serif", fontSize: 17, color: '#e8e8d8', lineHeight: 1 },
  footer: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginTop: 2, paddingTop: 12, borderTop: '1px solid #24240f' },
  tag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 8, padding: '2px 6px', border: `1px solid ${HF}33`, borderRadius: 3, color: '#b6b085', background: 'rgba(255,210,30,0.05)', letterSpacing: '0.04em' },
  projectLink: { display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.06em', color: '#c0c0a8', whiteSpace: 'nowrap' },
  cta: { display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 32, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.08em', color: '#c8c8b0' },
};
