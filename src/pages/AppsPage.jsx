import { useCallback, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, X } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';

// /apps — the engineering laboratory (Phase 8). Each app from i18n `appsItems`
// stands at its own workstation: a holographic screen on an arm above a lit
// workbench with its station plate. The room (ceiling strips, wall seams, the
// floor grid) is pure CSS — no images, no 3D library. Clicking a station
// opens the inspection panel (?app=<id>: shareable, survives refresh, closes
// with Esc, backdrop, the close button or Back; focus is kept inside and
// returns to the station). A dimmed "bench reserved" station says more apps
// are coming — it is not an app.
// Screens show only real artwork: the app's own icon, or `screens: [...]`
// (real product captures in public/apps/) when they exist. Never a mock UI.
const ICONS = { calendar: CalendarDays };

export default function AppsPage() {
  const { t } = useLang();
  const raw = t('appsItems');
  const items = Array.isArray(raw) ? raw : [];
  const [params, setParams] = useSearchParams();
  const openId = params.get('app');
  const openIndex = items.findIndex((it) => it.id === openId);
  const lastTrigger = useRef(null);
  useSeo({ title: t('appsLabel'), description: t('appsSub'), path: '/apps' });

  const open = (it) => { lastTrigger.current = document.activeElement; setParams({ app: it.id }); };
  const close = useCallback(() => {
    setParams({}, { replace: false });
    requestAnimationFrame(() => lastTrigger.current?.focus?.());
  }, [setParams]);
  useEffect(() => { if (openId && openIndex === -1) setParams({}, { replace: true }); }, [openId, openIndex, setParams]);

  return (
    <div className="lab-page">
      <style>{LAB_CSS}</style>
      <div className="ds-wrap lab-wrap">
        <Link to="/" className="lab-back"><ArrowLeft size={16} strokeWidth={1.5} /> {t('appsBack')}</Link>
        <header className="lab-head">
          <div>
            <div className="ds-kicker">{t('appsLabKicker')} · {String(items.length).padStart(2, '0')}</div>
            <h1>{t('appsLabel')}</h1>
          </div>
          <p>{t('appsSub')}</p>
        </header>
      </div>

      <section className="lab" aria-label={t('appsLabKicker')}>
        <div className="lab-ceiling" aria-hidden="true"><i /><i /><i /></div>
        <div className="lab-floor" aria-hidden="true" />
        <ul className="ds-wrap lab-row">
          {items.map((it, i) => (
            <li key={it.id}>
              <Station it={it} n={i + 1} t={t} onOpen={() => open(it)} />
            </li>
          ))}
          <li aria-label={t('appsReserved')}>
            <div className="st st-reserved">
              <div className="st-screen"><div className="st-glass"><span className="st-res-mark" aria-hidden="true">+</span></div></div>
              <div className="st-arm" aria-hidden="true" />
              <div className="st-bench">
                <div className="st-plate">
                  <span className="st-no">{t('appsStation')} {String(items.length + 1).padStart(2, '0')}</span>
                  <span className="st-name">{t('appsReserved')}</span>
                  <span className="st-res-text">{t('appsMore')}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>

      {openIndex >= 0 && <Inspector it={items[openIndex]} n={openIndex + 1} t={t} onClose={close} />}
    </div>
  );
}

function Artwork({ it, size }) {
  const Icon = ICONS[it.icon];
  if (it.image) return <img className="st-icon" src={it.image} alt="" width={size} height={size} style={{ width: size, height: size }} />;
  return <span className="st-icon st-iconbox" style={{ width: size, height: size, color: it.accent }}>{Icon && <Icon size={size * 0.45} strokeWidth={1.4} />}</span>;
}

function Station({ it, n, t, onOpen }) {
  const shot = Array.isArray(it.screens) && it.screens[0];
  return (
    <button type="button" className="st" style={{ '--acc': it.accent }} onClick={onOpen} aria-haspopup="dialog">
      <span className="st-screen">
        <span className="st-glass">
          <span className="st-bar">
            <span className="st-led" aria-hidden="true" />{it.status === 'live' ? t('appsLive') : ''}
            <span className="st-plat">{it.platform}</span>
          </span>
          {shot ? <img className="st-shot" src={shot} alt="" loading="lazy" /> : <Artwork it={it} size={112} />}
          <span className="st-tag">{it.tagline}</span>
        </span>
      </span>
      <span className="st-arm" aria-hidden="true" />
      <span className="st-bench">
        <span className="st-plate">
          <span className="st-no">{t('appsStation')} {String(n).padStart(2, '0')}</span>
          <span className="st-name">{it.name}</span>
          <span className="st-go">{t('appsInspect')} <ArrowRight size={13} strokeWidth={1.6} aria-hidden="true" /></span>
        </span>
      </span>
    </button>
  );
}

function Inspector({ it, n, t, onClose }) {
  const panel = useRef(null);
  const closeBtn = useRef(null);
  const shots = Array.isArray(it.screens) ? it.screens : [];

  useEffect(() => {
    closeBtn.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key !== 'Tab' || !panel.current) return;
      const f = panel.current.querySelectorAll('a[href], button:not([disabled])');
      if (!f.length) return;
      const first = f[0]; const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div className="in-back" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={panel} className="in" role="dialog" aria-modal="true" aria-labelledby="in-title" style={{ '--acc': it.accent }}>
        <button ref={closeBtn} type="button" className="icon-btn in-close" onClick={onClose} aria-label={t('appsClose')}><X size={16} strokeWidth={1.6} /></button>
        <div className="in-view">
          <div className="in-screen">
            {shots.length
              ? <div className="in-shots">{shots.map((src) => <img key={src} src={src} alt={`${it.name} screenshot`} />)}</div>
              : <Artwork it={it} size={168} />}
          </div>
          {!shots.length && <p className="in-note">{t('appsNoShots')}</p>}
        </div>
        <div className="in-body">
          <div className="in-k">{t('appsStation')} {String(n).padStart(2, '0')} · {it.platform}</div>
          <h2 id="in-title">{it.name}</h2>
          <p className="in-tag">{it.tagline}</p>
          <p className="in-desc">{it.description}</p>
          <dl className="in-spec">
            <div><dt>{t('appsPlatform')}</dt><dd>{it.platform}</dd></div>
            <div><dt>{t('appsStatus')}</dt><dd><span className="st-led" aria-hidden="true" /> {it.status === 'live' ? t('appsLive') : '—'}</dd></div>
            {Array.isArray(it.stack) && <div className="wide"><dt>{t('appsStack')}</dt><dd className="in-stack">{it.stack.map((x) => <span key={x} className="label">{x}</span>)}</dd></div>}
          </dl>
          <a className="btn btn-primary in-cta" href={it.url} target="_blank" rel="noopener noreferrer">
            {it.cta} <ArrowUpRight size={15} strokeWidth={1.6} />
          </a>
        </div>
      </div>
    </div>
  );
}

const LAB_CSS = `
  .lab-wrap { padding-top: 60px; }
  .lab-back { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: #8a919d; }
  .lab-back:hover { color: var(--c-ink); }
  .lab-head { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: 16px 56px; align-items: end; margin-top: 40px; }
  .lab-head h1 { font-family: var(--font-display); font-weight: 400; font-size: clamp(44px, 6vw, 80px); line-height: 0.98; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 18px; }
  .lab-head p { font-family: var(--font-body); font-size: 17px; line-height: 1.6; color: var(--c-body); }

  /* The room */
  .lab { position: relative; overflow: hidden; margin-top: 48px; padding: 96px 0 88px; isolation: isolate;
    background:
      radial-gradient(60% 50% at 50% 38%, rgba(0,240,255,0.07), transparent 70%),
      radial-gradient(30% 40% at 85% 30%, rgba(245,158,11,0.05), transparent 70%),
      repeating-linear-gradient(90deg, transparent 0 239px, rgba(255,255,255,0.025) 239px 240px),
      linear-gradient(180deg, #07080b 0%, #0b0d11 55%, #090a0d 100%);
    border-top: 1px solid var(--c-line); border-bottom: 1px solid var(--c-line); }
  .lab-ceiling { position: absolute; inset: 0 0 auto 0; height: 60px; display: flex; justify-content: space-around; pointer-events: none; z-index: -1; }
  .lab-ceiling i { width: 18%; height: 3px; margin-top: 22px; background: linear-gradient(90deg, transparent, rgba(190,240,255,0.55), transparent); box-shadow: 0 0 24px 4px rgba(0,240,255,0.12); }
  .lab-floor { position: absolute; left: -30%; right: -30%; bottom: 0; height: 52%; z-index: -1; pointer-events: none;
    background:
      repeating-linear-gradient(90deg, rgba(0,240,255,0.08) 0 1px, transparent 1px 90px),
      repeating-linear-gradient(0deg, rgba(0,240,255,0.06) 0 1px, transparent 1px 70px);
    transform: perspective(700px) rotateX(64deg); transform-origin: 50% 100%;
    -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.9), transparent 85%); mask-image: linear-gradient(to top, rgba(0,0,0,0.9), transparent 85%); }
  .lab-row { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px; align-items: end; }

  /* A workstation */
  .st { all: unset; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; width: 100%; cursor: pointer; }
  .st:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 10px; }
  .st-screen { position: relative; width: 100%; padding: 8px; background: linear-gradient(180deg, #1a1e26, #0f1116); border: 1px solid #2a2f38; box-shadow: 0 30px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.6); transition: transform 0.45s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.45s; }
  .st-glass { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; aspect-ratio: 16 / 11; overflow: hidden;
    background: radial-gradient(70% 70% at 50% 45%, color-mix(in srgb, var(--acc, #00F0FF) 22%, transparent), transparent 70%), linear-gradient(180deg, #0c1219, #070a0e);
    border: 1px solid rgba(0,240,255,0.18); }
  .st-glass::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px); pointer-events: none; }
  .st-glass::after { content: ''; position: absolute; inset: 0; background: linear-gradient(115deg, rgba(255,255,255,0.07), transparent 35%); pointer-events: none; }
  .st-bar { position: absolute; top: 0; left: 0; right: 0; display: flex; align-items: center; gap: 8px; padding: 9px 12px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #9fdbe6; border-bottom: 1px solid rgba(0,240,255,0.1); background: rgba(0,0,0,0.25); }
  .st-plat { margin-left: auto; color: var(--c-meta); }
  .st-led { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--c-tertiary); box-shadow: 0 0 8px rgba(245,158,11,0.9); }
  .st-icon { display: block; border-radius: 26%; object-fit: cover; box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 0 50px color-mix(in srgb, var(--acc, #00F0FF) 35%, transparent), 0 18px 40px rgba(0,0,0,0.6); }
  .st-iconbox { display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(180deg, #1c2029, #0e1015); }
  .st-shot { max-width: 92%; max-height: 80%; object-fit: contain; margin-top: 18px; }
  .st-tag { position: relative; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: #aab2bf; text-align: center; padding: 0 16px; }
  .st-arm { width: 14px; height: 34px; background: linear-gradient(90deg, #14171d, #262b34, #14171d); border-left: 1px solid #2a2f38; border-right: 1px solid #2a2f38; }
  .st-bench { position: relative; width: 112%; max-width: calc(100% + 40px); padding: 18px 22px 20px; background: linear-gradient(180deg, #1b1f27 0%, #111419 40%, #0b0d11 100%); border: 1px solid #2a2f38; border-top: 1px solid #3a404c; clip-path: polygon(4% 0, 96% 0, 100% 100%, 0 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06); }
  .st-bench::before { content: ''; position: absolute; left: 20%; right: 20%; top: 0; height: 26px; background: radial-gradient(50% 100% at 50% 0%, color-mix(in srgb, var(--acc, #00F0FF) 30%, transparent), transparent); pointer-events: none; }
  .st-plate { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; text-align: center; min-height: 92px; }
  .st-no { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--c-tertiary); }
  .st-name { font-family: var(--font-display); font-weight: 500; font-size: 26px; letter-spacing: -0.01em; color: var(--c-ink); }
  .st-go { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #c6cdd8; border-bottom: 1px solid rgba(0,240,255,0.4); padding-bottom: 3px; transition: color 0.3s, border-color 0.3s; }
  .st:hover .st-screen, .st:focus-visible .st-screen { transform: translateY(-6px); box-shadow: 0 40px 70px rgba(0,0,0,0.6), 0 0 40px color-mix(in srgb, var(--acc, #00F0FF) 18%, transparent); }
  .st:hover .st-go, .st:focus-visible .st-go { color: var(--c-primary); border-color: var(--c-primary); }
  .st-reserved { opacity: 0.5; cursor: default; }
  .st-reserved .st-glass { border-style: dashed; background: linear-gradient(180deg, #0b0e12, #07090c); }
  .st-res-mark { font-family: var(--font-display); font-size: 48px; color: #3a404c; }
  .st-res-text { font-family: var(--font-body); font-size: 12.5px; line-height: 1.5; color: var(--c-meta); max-width: 240px; }

  /* Inspection panel */
  .in-back { position: fixed; inset: 0; z-index: 300; background: rgba(5,6,9,0.84); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: flex; justify-content: center; align-items: flex-start; overflow-y: auto; padding: 56px 24px; animation: in-fade 0.25s ease-out; }
  .in { position: relative; width: 100%; max-width: 1040px; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); background: linear-gradient(180deg, #13161c, #0d0f13); border: 1px solid #2a2f38; box-shadow: 0 40px 90px rgba(0,0,0,0.7); animation: in-rise 0.35s cubic-bezier(0.2,0.8,0.2,1); }
  .in::before { content: ''; position: absolute; left: 8%; right: 8%; top: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--acc), transparent); }
  @keyframes in-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes in-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
  .in-close { position: absolute; right: 14px; top: 14px; z-index: 2; }
  .in-view { padding: 28px; border-right: 1px solid #1e222b; }
  .in-screen { display: flex; align-items: center; justify-content: center; aspect-ratio: 1; background: radial-gradient(60% 60% at 50% 45%, color-mix(in srgb, var(--acc) 22%, transparent), transparent 70%), repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 3px), #080a0e; border: 1px solid rgba(0,240,255,0.18); }
  .in-shots { display: flex; gap: 10px; overflow-x: auto; padding: 12px; max-height: 100%; }
  .in-shots img { height: 100%; max-height: 420px; width: auto; border: 1px solid #22262e; }
  .in-note { margin-top: 12px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.08em; line-height: 1.6; color: var(--c-meta); }
  .in-body { padding: 36px 36px 32px; }
  .in-k { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-tertiary); }
  .in h2 { font-family: var(--font-display); font-weight: 500; font-size: clamp(30px, 3.4vw, 44px); line-height: 1.05; letter-spacing: -0.02em; color: var(--c-ink); margin-top: 12px; }
  .in-tag { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 0.08em; color: #9fdbe6; margin-top: 10px; }
  .in-desc { font-family: var(--font-body); font-size: 15.5px; line-height: 1.7; color: #c3c9d4; margin-top: 18px; }
  .in-spec { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-top: 24px; border-top: 1px solid #1e222b; border-left: 1px solid #1e222b; }
  .in-spec > div { padding: 12px 14px; border-right: 1px solid #1e222b; border-bottom: 1px solid #1e222b; }
  .in-spec > .wide { grid-column: 1 / -1; }
  .in-spec dt { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-meta); }
  .in-spec dd { display: flex; align-items: center; gap: 8px; margin-top: 6px; font-family: var(--font-body); font-size: 14px; color: var(--c-ink); }
  .in-stack { flex-wrap: wrap; gap: 6px !important; }
  .in-cta { margin-top: 26px; }

  @media (prefers-reduced-motion: reduce) {
    .st-screen, .st-go { transition: none; }
    .st:hover .st-screen, .st:focus-visible .st-screen { transform: none; }
    .in-back, .in { animation: none; }
  }
  @media (max-width: 1100px) { .lab-row { gap: 28px; } .st-name { font-size: 22px; } }
  @media (max-width: 900px) {
    .lab-head { grid-template-columns: 1fr; }
    .lab-row { grid-template-columns: minmax(0, 1fr); max-width: 520px; margin: 0 auto; gap: 56px; }
    .lab { padding: 72px 0 80px; }
    .in { grid-template-columns: 1fr; }
    .in-view { border-right: none; border-bottom: 1px solid #1e222b; }
    .in-screen { aspect-ratio: 16 / 10; }
    .st-reserved .st-screen, .st-reserved .st-arm { display: none; }
    .st-plate { min-height: 0; }
  }
  @media (max-width: 600px) {
    .lab-wrap { padding-top: 40px; }
    .lab { margin-top: 32px; padding: 56px 0 64px; }
    .st-bench { width: 100%; max-width: 100%; clip-path: polygon(3% 0, 97% 0, 100% 100%, 0 100%); }
    .in-back { padding: 0; }
    .in { min-height: 100%; border: none; }
    .in-view { padding: 56px 16px 16px; }
    .in-body { padding: 22px 16px 32px; }
    .in-spec { grid-template-columns: 1fr; }
  }
`;
