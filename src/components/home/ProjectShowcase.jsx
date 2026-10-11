import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLang } from '../../i18n.jsx';
import { getProject, CATEGORY_TR } from '../../data/projects';
import TwoTone from '../TwoTone';

// A curated, visually strong selection from the Hall of Armor. The full
// archive stays on /project ("Open the Full Armory").
const PICKS = [
  'mihenk-benchmark', 'yolo-custom-detector', 'turkish-medical-rag', 'algorithm-mentor-mcp',
  'llm-lora-finetuning', 'pose-invariant-face-id', 'face-detection-pipeline', 'build-your-target-body',
  'gorkem-os', 're-mind',
];

const SPEED = 36; // px per second, right → left
const DRAG_SLOP = 6; // px of movement before a press counts as a drag

// A seamless right-to-left showcase with no dependency: the list is rendered
// twice and the track's translateX wraps by exactly one set width, so the loop
// has no visible jump. Drag (mouse) / swipe (touch) move it; the arrows and
// keyboard focus bring a card into view. Motion pauses while hovered,
// focused, dragged, off-screen or in a background tab, and never starts for
// visitors who prefer reduced motion. A drag never turns into a click.
export default function ProjectShowcase() {
  const { lang, t } = useLang();
  const items = PICKS.map(getProject).filter(Boolean);

  const viewport = useRef(null);
  const track = useRef(null);
  const st = useRef({ x: 0, setW: 0, cardW: 0, hover: false, focus: false, drag: null, visible: true, target: null, suppress: false });

  const apply = () => { if (track.current) track.current.style.transform = `translate3d(${st.current.x}px,0,0)`; };
  const wrap = (x) => { const w = st.current.setW; if (!w) return x; while (x <= -w) x += w; while (x > 0) x -= w; return x; };

  const measure = useCallback(() => {
    const tr = track.current; if (!tr) return;
    const half = tr.children.length / 2;
    const first = tr.children[0]; const mirror = tr.children[half];
    if (first && mirror) {
      st.current.setW = mirror.offsetLeft - first.offsetLeft;
      st.current.cardW = (tr.children[1]?.offsetLeft ?? first.offsetWidth) - first.offsetLeft;
    }
    st.current.x = wrap(st.current.x); apply();
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure); if (track.current) ro.observe(track.current);
    const io = new IntersectionObserver(([e]) => { st.current.visible = e.isIntersecting; }, { threshold: 0.05 });
    if (viewport.current) io.observe(viewport.current);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0; let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const s = st.current;
      if (s.target !== null && !s.drag) {
        // Eased glide toward a target set by the arrows / keyboard focus.
        const d = s.target - s.x;
        if (Math.abs(d) < 0.5) { s.x = s.target; s.target = null; } else s.x += d * Math.min(1, dt * 9);
        // Wrapping moves x by exactly one set width; move the target with it
        // so the glide continues instead of jumping.
        const before = s.x; s.x = wrap(s.x);
        if (s.target !== null) s.target += s.x - before;
        apply();
      } else if (!s.drag && !s.hover && !s.focus && s.visible && !document.hidden && !reduce.matches) {
        s.x = wrap(s.x - SPEED * dt); apply();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [measure]);

  const nudge = (dir) => {
    const s = st.current; const step = s.cardW || 320;
    // Snap to card boundaries so the arrows always land on a whole card.
    const base = Math.round(s.x / step) * step;
    s.target = base - dir * step;
  };

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    st.current.drag = { id: e.pointerId, x0: e.clientX, start: st.current.x, moved: false };
    st.current.target = null;
  };
  const onPointerMove = (e) => {
    const d = st.current.drag; if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x0;
    if (!d.moved && Math.abs(dx) > DRAG_SLOP) {
      d.moved = true;
      try { viewport.current?.setPointerCapture?.(e.pointerId); } catch { /* pointer already gone */ }
      viewport.current?.classList.add('dragging');
    }
    if (d.moved) { st.current.x = wrap(d.start + dx); apply(); }
  };
  const endDrag = (e) => {
    const d = st.current.drag; if (!d || (e && d.id !== e.pointerId)) return;
    if (d.moved) st.current.suppress = true;
    st.current.drag = null; viewport.current?.classList.remove('dragging');
  };
  // Swallow the click that follows a drag so it does not open a project.
  const onClickCapture = (e) => { if (st.current.suppress) { e.preventDefault(); e.stopPropagation(); st.current.suppress = false; } };

  // Keyboard: when a card gets focus, bring it fully into view.
  const onFocus = (e) => {
    st.current.focus = true;
    const card = e.target.closest('.sc-card'); const vp = viewport.current; if (!card || !vp) return;
    const left = card.offsetLeft + st.current.x; const right = left + card.offsetWidth;
    if (left < 0 || right > vp.clientWidth) st.current.target = -card.offsetLeft + 24;
  };

  const Card = ({ p, hidden }) => {
    const cat = lang === 'tr' ? CATEGORY_TR[p.category] || p.category : p.category;
    return (
      <li className="sc-card" aria-hidden={hidden || undefined}>
        <Link to={`/project/${p.slug}`} tabIndex={hidden ? -1 : undefined} draggable={false}>
          <span className="sc-media">
            <img src={p.cover} alt={hidden ? '' : `${p.title} — ${t('pdCoverAlt')}`} loading="lazy" decoding="async" draggable={false} />
            <span className="label sc-mark" style={{ color: p.color, borderColor: `${p.color}88` }}>{p.mark}</span>
          </span>
          <span className="sc-meta">{cat}</span>
          <span className="sc-title">{p.title} <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" /></span>
          <span className="sc-code">{p.codename}</span>
        </Link>
      </li>
    );
  };

  return (
    <section className="ds-section sc" aria-labelledby="sc-title" data-reveal>
      <style>{`
        .sc-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px 40px; flex-wrap: wrap; margin-bottom: 28px; }
        .sc-ctrl { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .sc-hint { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-meta); margin-right: 6px; }
        .sc-vp { position: relative; overflow: hidden; touch-action: pan-y; cursor: grab; user-select: none; -webkit-user-select: none;
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 4%, #000 92%, transparent 100%); mask-image: linear-gradient(90deg, transparent 0, #000 4%, #000 92%, transparent 100%); }
        .sc-vp.dragging { cursor: grabbing; }
        .sc-track { list-style: none; display: flex; gap: 20px; width: max-content; padding: 6px 0 10px var(--ds-gutter); will-change: transform; }
        .sc-card { flex: none; width: 340px; }
        .sc-card a { display: flex; flex-direction: column; color: inherit; -webkit-user-drag: none; }
        .sc-media { position: relative; display: block; aspect-ratio: 16 / 10; overflow: hidden; border: 1px solid var(--c-line); background: #08090c; }
        .sc-media img { width: 100%; height: 100%; object-fit: cover; display: block; filter: saturate(0.9) brightness(0.92); transition: transform 0.6s cubic-bezier(0.2,0.8,0.2,1), filter 0.4s; pointer-events: none; }
        .sc-card a:hover .sc-media img, .sc-card a:focus-visible .sc-media img { transform: scale(1.03); filter: none; }
        .sc-card a:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 3px; }
        .sc-mark { position: absolute; left: 10px; top: 10px; background: rgba(10,12,16,0.8); }
        .sc-meta { margin-top: 14px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-meta); }
        .sc-title { margin-top: 6px; font-family: var(--font-display); font-weight: 500; font-size: 19px; color: var(--c-ink); transition: color 0.3s; }
        .sc-title svg { vertical-align: -1px; color: var(--c-meta); }
        .sc-card a:hover .sc-title { color: var(--c-primary); }
        .sc-code { margin-top: 2px; font-family: var(--font-body); font-size: 13px; color: var(--c-meta); }
        .sc-foot { display: flex; justify-content: flex-start; margin-top: 30px; }
        @media (prefers-reduced-motion: reduce) { .sc-media img { transition: none; } }
        @media (max-width: 600px) {
          .sc-card { width: min(78vw, 300px); }
          .sc-track { gap: 14px; }
          .sc-title { font-size: 17px; }
          .sc-hint { display: none; }
        }
      `}</style>

      <div className="ds-wrap sc-head">
        <div>
          <div className="ds-kicker">{t('showKicker')}</div>
          <h2 id="sc-title" className="ds-h2"><TwoTone text={t('showTitle')} /></h2>
        </div>
        <div className="sc-ctrl">
          <span className="sc-hint">{t('showHint')}</span>
          <button type="button" className="icon-btn" onClick={() => nudge(-1)} aria-label={t('showPrev')}><ArrowLeft size={15} strokeWidth={1.6} /></button>
          <button type="button" className="icon-btn" onClick={() => nudge(1)} aria-label={t('showNext')}><ArrowRight size={15} strokeWidth={1.6} /></button>
        </div>
      </div>

      <div
        ref={viewport}
        className="sc-vp"
        // The track moves by transform only. Focusing an off-screen link makes the
        // browser scroll this overflow box natively; pin it at 0 so the loop's
        // wrap maths (and the glide in onFocus) stay true.
        onScroll={(e) => { if (e.currentTarget.scrollLeft) e.currentTarget.scrollLeft = 0; }}
        role="region"
        aria-roledescription="carousel"
        aria-label={t('showKicker')}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') st.current.hover = true; }}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse') st.current.hover = false; endDrag(e); }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onFocus={onFocus}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) st.current.focus = false; }}
        onDragStart={(e) => e.preventDefault()}
      >
        <ul ref={track} className="sc-track">
          {items.map((p) => <Card key={p.slug} p={p} />)}
          {items.map((p) => <Card key={`m-${p.slug}`} p={p} hidden />)}
        </ul>
      </div>

      <div className="ds-wrap sc-foot">
        <Link to="/project" className="btn btn-outline">{t('showAll')} <ArrowRight size={15} strokeWidth={1.5} /></Link>
      </div>
    </section>
  );
}
