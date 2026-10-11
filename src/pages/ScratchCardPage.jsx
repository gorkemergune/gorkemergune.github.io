import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { FunHeader, FUN_CSS, decodeShare } from '../components/fun/FunFrame';
import Composer from '../components/fun/Composer';
import Confetti from '../components/fun/Confetti';

// Scratch Card — a surprise to send. The recipient scratches a silver canvas
// layer (mouse, pen or finger) off the message; past ~55 % cleared it falls
// away by itself. "Reveal without scratching" is the keyboard / no-pointer
// path. The message stays hidden from screen readers until it is revealed.
const ACC = '#c0c7d4';
const DONE_AT = 0.55;
const C = {
  en: { sub: 'Hide a short message under a silver layer and send the link.', ph: 'Guess who’s buying coffee tomorrow? Me.', for: 'For', scratch: 'Scratch here', alt: 'Reveal without scratching', from: 'from', own: 'Make your own', bad: 'This card link is incomplete. You can write a new one below.', left: 'Keep scratching…' },
  tr: { sub: 'Kısa bir mesajı gümüş bir katmanın altına sakla ve linki gönder.', ph: 'Bil bakalım yarın kahveler kimden? Benden.', for: 'Kime:', scratch: 'Burayı kazı', alt: 'Kazımadan göster', from: 'gönderen:', own: 'Kendininkini oluştur', bad: 'Bu kart linki eksik. Aşağıdan yenisini yazabilirsin.', left: 'Kazımaya devam…' },
};

export default function ScratchCardPage() {
  const { lang, t } = useLang();
  const c = C[lang] || C.en;
  const [params] = useSearchParams();
  const raw = params.get('d');
  const data = raw ? decodeShare(raw) : null;
  const valid = data && typeof data.m === 'string' && data.m.trim();
  return (
    <div className="fun-page narrow" style={{ '--fun-acc': ACC }}>
      <style>{FUN_CSS}{SC_CSS}</style>
      <FunHeader kind="send" accent={ACC} title={t('funScratchTitle')} sub={valid ? null : c.sub} />
      {valid ? <Scratch data={data} c={c} /> : (
        <>
          {raw && <p className="fun-msg bad" role="alert" style={{ marginBottom: 16 }}>{c.bad}</p>}
          <Composer path="/fun/scratch" title={t('funScratchTitle')} placeholder={c.ph} />
        </>
      )}
    </div>
  );
}

function Scratch({ data, c }) {
  const wrap = useRef(null);
  const cv = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const moves = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [party, setParty] = useState(false);
  const [started, setStarted] = useState(false);

  const paint = useCallback(() => {
    const canvas = cv.current; const box = wrap.current; if (!canvas || !box) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = box.clientWidth; const h = box.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    const g = canvas.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const grd = g.createLinearGradient(0, 0, w, h);
    grd.addColorStop(0, '#8d939e'); grd.addColorStop(0.45, '#d9dde4'); grd.addColorStop(0.55, '#b5bac4'); grd.addColorStop(1, '#7c828d');
    g.globalCompositeOperation = 'source-over'; g.fillStyle = grd; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(20,23,29,0.55)'; g.font = '600 15px "JetBrains Mono", monospace'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(c.scratch.toUpperCase(), w / 2, h / 2);
  }, [c.scratch]);

  useEffect(() => {
    paint();
    const ro = new ResizeObserver(() => { if (!revealed) paint(); });
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [paint, revealed]);

  const reveal = () => { if (revealed) return; setRevealed(true); setParty(true); };

  const cleared = () => {
    const canvas = cv.current; const g = canvas.getContext('2d');
    const { width, height } = canvas; const img = g.getImageData(0, 0, width, height).data;
    let clear = 0; let n = 0;
    for (let i = 3; i < img.length; i += 4 * 40) { n += 1; if (img[i] === 0) clear += 1; }
    return n ? clear / n : 0;
  };
  const point = (e) => { const r = cv.current.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const scratchTo = (p) => {
    const g = cv.current.getContext('2d');
    g.globalCompositeOperation = 'destination-out'; g.lineCap = 'round'; g.lineJoin = 'round'; g.lineWidth = 38;
    g.beginPath(); const a = last.current || p; g.moveTo(a.x, a.y); g.lineTo(p.x, p.y); g.stroke();
    last.current = p;
    moves.current += 1;
    if (moves.current % 8 === 0 && cleared() > DONE_AT) reveal();
  };
  const down = (e) => { if (revealed) return; drawing.current = true; setStarted(true); last.current = null; try { cv.current.setPointerCapture(e.pointerId); } catch { /* noop */ } scratchTo(point(e)); };
  const move = (e) => { if (drawing.current) scratchTo(point(e)); };
  const up = () => { drawing.current = false; last.current = null; if (!revealed && cleared() > DONE_AT) reveal(); };

  return (
    <div className="sc2">
      {data.to && <p className="sc2-for">{c.for} <b>{data.to}</b></p>}
      <div ref={wrap} className="sc2-card">
        <div className="sc2-msg" aria-hidden={!revealed}>
          <p className="sc2-text">{data.m}</p>
          {data.f && <p className="sc2-sign">— {c.from} {data.f}</p>}
        </div>
        <canvas ref={cv} className={`sc2-layer${revealed ? ' gone' : ''}`} aria-hidden="true"
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} />
      </div>
      <div role="status" className="fun-hint">{revealed ? '' : started ? c.left : ''}</div>
      {!revealed
        ? <button type="button" className="fun-btn ghost small" onClick={reveal}>{c.alt}</button>
        : <Link to="/fun/scratch" className="fun-btn small">{c.own}</Link>}
      {party && <Confetti count={90} onDone={() => setParty(false)} />}
    </div>
  );
}

const SC_CSS = `
  .sc2 { display: flex; flex-direction: column; align-items: center; gap: 16px; }
  .sc2-for { font-family: var(--font-body); font-size: 18px; color: #c6cdd8; }
  .sc2-for b { color: var(--c-ink); }
  .sc2-card { position: relative; width: 100%; max-width: 460px; aspect-ratio: 16 / 10; border-radius: 18px; overflow: hidden; background: radial-gradient(80% 80% at 50% 40%, rgba(255,209,102,0.16), transparent 70%), linear-gradient(160deg, #1b1f27, #0e1015); border: 1px solid #2c313c; box-shadow: 0 30px 60px rgba(0,0,0,0.45); }
  .sc2-msg { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; }
  .sc2-text { font-family: var(--font-display); font-weight: 500; font-size: clamp(20px, 4vw, 26px); line-height: 1.35; color: var(--c-ink); overflow-wrap: anywhere; }
  .sc2-sign { margin-top: 10px; font-family: var(--font-mono); font-size: 12.5px; color: #aab2bf; }
  .sc2-layer { position: absolute; inset: 0; width: 100%; height: 100%; touch-action: none; cursor: crosshair; transition: opacity 0.6s; }
  .sc2-layer.gone { opacity: 0; pointer-events: none; }
  @media (prefers-reduced-motion: reduce) { .sc2-layer { transition: none; } }
`;
