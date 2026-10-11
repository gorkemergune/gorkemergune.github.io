import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Link2, Share2 } from 'lucide-react';
import { useLang } from '../../i18n.jsx';

// The Fun corner's shared frame (Phase 8). Loaded only by Fun pages (all lazy),
// never by the professional site. One header, one set of buttons and panels,
// one share helper — so 22 experiences read as one designed place.
//
//   <FunHeader kind="game" accent="#00e5a0" title=… sub=…>{optional extra}</FunHeader>
//   kind: 'game' | 'me' (Surprise me) | 'send' (Surprises to send)
//   FUN_CSS: .fun-page (+ .narrow/.mid), .fun-btn (+ .ghost/.small), .fun-panel,
//            .fun-stats / .fun-stat, .fun-field, .fun-msg (+ .ok/.bad)

export function FunBack() {
  const { t } = useLang();
  return <Link to="/fun" className="fun-back"><ArrowLeft size={15} strokeWidth={1.5} /> {t('funCorner')}</Link>;
}

export function FunHeader({ kind = 'game', accent = '#00f0ff', title, sub, children }) {
  const { t } = useLang();
  const label = kind === 'send' ? t('funSurprisesLabel') : kind === 'me' ? t('funSurpriseMeLabel') : t('funGamesLabel');
  return (
    <header className="fun-head" style={{ '--fun-acc': accent }}>
      <FunBack />
      <div className="fun-kicker"><i aria-hidden="true" />{label}</div>
      <h1 className="fun-title">{title}</h1>
      {sub && <p className="fun-sub">{sub}</p>}
      {children}
    </header>
  );
}

// Share payloads ride in the URL (?d=…): UTF-8 JSON → base64url. Nothing is
// stored on a server; the link is the message.
export function encodeShare(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let bin = ''; bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export function decodeShare(str) {
  try {
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(b64 + '==='.slice((b64.length + 3) % 4));
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
  } catch { return null; }
}
export const shareUrl = (path, data) => `${window.location.origin}${window.location.pathname}#${path}?d=${encodeShare(data)}`;

export function ShareButton({ url, title }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); clearTimeout(timer.current); timer.current = setTimeout(() => setCopied(false), 2000); }
    catch { window.prompt(t('funCopyPrompt'), url); }
  };
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
  const share = async () => { try { await navigator.share({ title, url }); } catch { /* cancelled */ } };
  return (
    <>
      <button type="button" className="fun-btn" onClick={copy} aria-live="polite">
        {copied ? <Check size={15} strokeWidth={1.8} /> : <Link2 size={15} strokeWidth={1.8} />}
        {copied ? t('funCopied') : t('funShareLink')}
      </button>
      {canShare && <button type="button" className="fun-btn ghost" onClick={share}><Share2 size={15} strokeWidth={1.8} /> {t('funShare')}</button>}
    </>
  );
}

export const FUN_CSS = `
  .fun-page { position: relative; z-index: 2; max-width: 760px; margin: 0 auto; padding: 56px 24px 120px; }
  .fun-page.narrow { max-width: 560px; }
  .fun-page.wide { max-width: 960px; }
  .fun-back { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; color: #8a919d; transition: color 0.2s; }
  .fun-back:hover, .fun-back:focus-visible { color: var(--c-ink); }
  .fun-head { position: relative; z-index: 2; margin-bottom: 36px; }
  .fun-kicker { display: flex; align-items: center; gap: 10px; margin-top: 36px; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #aab2bf; }
  .fun-kicker i { width: 8px; height: 8px; border-radius: 50%; background: var(--fun-acc); box-shadow: 0 0 10px var(--fun-acc); }
  .fun-title { font-family: var(--font-display); font-weight: 500; font-size: clamp(40px, 7vw, 64px); line-height: 1; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 14px; }
  .fun-sub { font-family: var(--font-body); font-size: 17px; line-height: 1.6; color: #a4abb7; max-width: 560px; margin-top: 14px; }
  .fun-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 0 20px; border-radius: 999px; border: 1px solid transparent; background: var(--fun-acc, var(--c-primary)); color: #0a0c10; font-family: var(--font-body); font-weight: 600; font-size: 15px; cursor: pointer; transition: transform 0.15s, filter 0.2s, background 0.2s; }
  .fun-btn:hover { filter: brightness(1.1); }
  .fun-btn:active { transform: scale(0.97); }
  .fun-btn:focus-visible { outline: 2px solid var(--c-ink); outline-offset: 3px; }
  .fun-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .fun-btn.ghost { background: transparent; color: var(--c-ink); border-color: #2c313c; }
  .fun-btn.ghost:hover { border-color: #4b515c; filter: none; }
  .fun-btn.small { min-height: 36px; padding: 0 14px; font-size: 13.5px; }
  .fun-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
  .fun-panel { position: relative; background: linear-gradient(180deg, #13161c, #0e1015); border: 1px solid #22262e; border-radius: 18px; padding: 24px; }
  .fun-stats { display: flex; justify-content: center; gap: 36px; flex-wrap: wrap; }
  .fun-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .fun-stat b { font-family: var(--font-mono); font-weight: 500; font-size: 26px; color: var(--c-ink); font-variant-numeric: tabular-nums; }
  .fun-stat span { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #7b8290; }
  .fun-field { display: flex; flex-direction: column; gap: 6px; }
  .fun-field label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #8a919d; }
  .fun-field input, .fun-field textarea { width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 12px; border: 1px solid #2c313c; background: #0c0e12; color: var(--c-ink); font-family: var(--font-body); font-size: 15px; resize: vertical; }
  .fun-field input:focus, .fun-field textarea:focus { outline: none; border-color: var(--fun-acc, var(--c-primary)); box-shadow: 0 0 0 3px color-mix(in srgb, var(--fun-acc, #00f0ff) 22%, transparent); }
  .fun-msg { font-family: var(--font-body); font-size: 15px; text-align: center; color: #c6cdd8; min-height: 24px; }
  .fun-msg.ok { color: #00e5a0; }
  .fun-msg.bad { color: #ff6b81; }
  .fun-hint { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; color: #7b8290; text-align: center; }
  @media (prefers-reduced-motion: reduce) { .fun-btn, .fun-back { transition: none; } .fun-btn:active { transform: none; } }
  @media (max-width: 600px) { .fun-page { padding: 36px 16px 96px; } .fun-sub { font-size: 15.5px; } .fun-panel { padding: 18px; border-radius: 14px; } }
`;
