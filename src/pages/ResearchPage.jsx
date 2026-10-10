import { useCallback, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import TwoTone from '../components/TwoTone';
import ResearchShelves from '../components/library/ResearchShelves';
import ResearchDossier from '../components/library/ResearchDossier';

// /research — the research library. The bookcase (ResearchShelves) holds one
// dossier per entry of i18n `researchItems`, in their order: shelf 1 = items
// 1–3, shelf 2 = items 4–5 + a reserved compartment. ?r=<n> (1-based) opens a
// dossier, so it can be shared, survives refresh, and closes with Back.
export default function ResearchPage() {
  const { t } = useLang();
  const raw = t('researchItems');
  const items = Array.isArray(raw) ? raw : [];
  const [params, setParams] = useSearchParams();
  const r = Number(params.get('r'));
  const openIndex = Number.isInteger(r) && r >= 1 && r <= items.length ? r - 1 : -1;
  const lastTrigger = useRef(null);
  useSeo({ title: t('researchLabel'), description: t('researchSub'), path: '/research' });

  const open = (i) => { lastTrigger.current = document.activeElement; setParams({ r: String(i + 1) }); };
  const close = useCallback(() => {
    setParams({}, { replace: false });
    // Return focus to the dossier that opened it.
    requestAnimationFrame(() => lastTrigger.current?.focus?.());
  }, [setParams]);

  useEffect(() => { if (params.get('r') && openIndex === -1) setParams({}, { replace: true }); }, [params, openIndex, setParams]);

  return (
    <div className="rl">
      <style>{`
        .rl-wrap { padding-top: 48px; padding-bottom: 120px; }
        .rl-back { display: flex; width: fit-content; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: #aab2bf; }
        .rl-head { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: 24px 56px; align-items: end; margin: 32px 0 40px; }
        .rl-head h1 { font-family: var(--font-display); font-weight: 500; font-size: clamp(42px, 5vw, 76px); line-height: 1; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 18px; }
        .rl-head p { font-family: var(--font-body); font-size: 16px; line-height: 1.65; color: #c3c9d4; }
        .rl-note { display: flex; gap: 10px; margin-top: 16px; padding: 12px 14px; border-left: 2px solid var(--c-tertiary); background: rgba(245,158,11,0.06); font-family: var(--font-body); font-size: 13px; line-height: 1.55; color: #d8c9a8; }
        @media (max-width: 900px) { .rl-head { grid-template-columns: 1fr; } }
      `}</style>

      <div className="ds-wrap rl-wrap">
        <Link to="/" className="link-hover rl-back"><ArrowLeft size={16} strokeWidth={1.5} /> {t('researchBack')}</Link>
        <header className="rl-head">
          <div>
            <div className="ds-kicker">{t('libKicker')} · {String(items.length).padStart(2, '0')}</div>
            <h1><TwoTone text={t('researchLabel')} /></h1>
          </div>
          <div>
            <p>{t('researchSub')}</p>
            <div className="rl-note"><AlertCircle size={15} strokeWidth={1.6} style={{ color: 'var(--c-tertiary)', flexShrink: 0, marginTop: 2 }} /><span>{t('researchDisclaimer')}</span></div>
          </div>
        </header>

        <ResearchShelves items={items} onOpen={open} />
      </div>

      {openIndex >= 0 && <ResearchDossier it={items[openIndex]} onClose={close} />}
    </div>
  );
}
