import { ArrowUpRight, Github } from 'lucide-react';
import { useLang } from '../../i18n.jsx';
import { useAlgoStats } from '../../hooks/useAlgoStats';
import { PLATFORM_LOGOS } from '../../data/techLogos';
import TwoTone from '../TwoTone';
import AlgoSource, { ALGO_SOURCE_CSS, PLATFORMS, PLATFORM_NAMES, LANG_NAMES } from './AlgoSource';

// Learning Path → "Algorithms & Problem Solving" (#algorithms). Everything is
// read from the algorithms repository README via useAlgoStats — the same
// source as the home strip. Only what the README states is shown: totals per
// platform and per language. No topics, streaks or rankings (not recorded).
export default function AlgorithmsSection() {
  const { t } = useLang();
  const a = useAlgoStats();
  const platforms = PLATFORMS.filter((k) => a[k] > 0).map((k) => ({ k, n: a[k] }));
  const rows = [...platforms, ...(a.competitive > 0 ? [{ k: 'competitive', n: a.competitive }] : [])];
  const max = Math.max(1, ...rows.map((r) => r.n));
  const langs = Object.entries(a.langs || {}).filter(([, n]) => n > 0).sort((x, y) => y[1] - x[1]);
  const langTotal = langs.reduce((s, [, n]) => s + n, 0) || 1;

  return (
    <section id="algorithms" className="ds-wrap al" aria-labelledby="al-title">
      <style>{`
        ${ALGO_SOURCE_CSS}
        .al { padding-top: 88px; scroll-margin-top: calc(var(--nav-h) + 12px); }
        .al-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px 48px; flex-wrap: wrap; }
        .al-head p { font-family: var(--font-body); font-size: 15px; line-height: 1.6; color: var(--c-body); max-width: 520px; }
        .al-grid { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 5fr) minmax(0, 4fr); border-top: 1px solid var(--c-line); border-left: 1px solid var(--c-line); margin-top: 36px; }
        .al-cell { border-right: 1px solid var(--c-line); border-bottom: 1px solid var(--c-line); padding: 26px 28px; }
        .al-total { font-family: var(--font-display); font-weight: 500; font-size: clamp(56px, 6vw, 84px); line-height: 0.95; letter-spacing: -0.04em; color: var(--c-ink); font-variant-numeric: tabular-nums; }
        .al-total-l { margin-top: 8px; }
        .al-sum { margin-top: 18px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; color: #aab2bf; line-height: 1.8; }
        .al-h { margin-bottom: 14px; }
        .al-rows { list-style: none; }
        .al-rows li { display: grid; grid-template-columns: 150px minmax(0, 1fr) 40px; gap: 14px; align-items: center; padding: 9px 0; }
        .al-rows li + li { border-top: 1px solid #181b22; }
        .al-name { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-body); font-size: 14px; color: #d3d8e0; }
        .al-name img { width: 18px; height: 18px; object-fit: contain; }
        .al-name .ph { width: 18px; height: 18px; border-radius: 50%; border: 1px dashed #5c6370; }
        .al-n { text-align: right; font-family: var(--font-mono); font-size: 13px; color: var(--c-ink); font-variant-numeric: tabular-nums; }
        .al-cell .progress > span { width: 100%; }
        .al-foot { display: flex; justify-content: space-between; align-items: center; gap: 12px 24px; flex-wrap: wrap; margin-top: 18px; }
        @media (max-width: 1000px) { .al-grid { grid-template-columns: 1fr 1fr; } .al-cell:first-child { grid-column: 1 / -1; } }
        @media (max-width: 640px) { .al { padding-top: 64px; } .al-grid { grid-template-columns: 1fr; } .al-cell { padding: 20px 16px; } .al-rows li { grid-template-columns: 140px minmax(0, 1fr) 36px; gap: 10px; } }
      `}</style>
      <div className="al-head">
        <div>
          <div className="ds-kicker">{t('alKicker')}</div>
          <h2 id="al-title" className="ds-h2"><TwoTone text={t('alTitle')} /></h2>
        </div>
        <p>{t('alSub')}</p>
      </div>
      <div className="al-grid">
        <div className="al-cell">
          <div className="al-total">{a.total}</div>
          <div className="ds-meta al-total-l">{t('alTotal')}</div>
          <div className="al-sum">
            {platforms.length} {t('alPlatforms')} {a.competitive > 0 ? t('alContests') : ''}<br />
            {langs.length} {t('alLanguages')}: {langs.map(([k]) => LANG_NAMES[k] || k).join(' · ')}
          </div>
        </div>
        <div className="al-cell">
          <div className="ds-meta al-h">{t('alByPlatform')}</div>
          <ul className="al-rows">
            {rows.map(({ k, n }) => (
              <li key={k}>
                <span className="al-name">
                  {PLATFORM_LOGOS[k] ? <img src={PLATFORM_LOGOS[k].src} alt="" /> : <span className="ph" aria-hidden="true" />}
                  {PLATFORM_NAMES[k] || t('alCompetitive')}
                </span>
                <span className="progress" aria-hidden="true"><span style={{ transform: `scaleX(${n / max})` }} /></span>
                <span className="al-n">{n}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="al-cell">
          <div className="ds-meta al-h">{t('alByLang')}</div>
          <ul className="al-rows">
            {langs.map(([k, n]) => (
              <li key={k}>
                <span className="al-name">{LANG_NAMES[k] || k}</span>
                <span className="progress" aria-hidden="true"><span style={{ transform: `scaleX(${n / langTotal})` }} /></span>
                <span className="al-n">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="al-foot">
        <AlgoSource source={a.source} />
        <a href="https://github.com/gorkemergune/algorithms" target="_blank" rel="noopener noreferrer" className="ds-link">
          <Github size={13} strokeWidth={1.5} /> {t('alRepo')} <ArrowUpRight size={12} strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}
