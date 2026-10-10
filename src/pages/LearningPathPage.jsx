import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import TwoTone from '../components/TwoTone';

// The learning path as a walk into a forest: a CC0 photograph of a road into
// sunlit trees, with a drawn trail climbing from the foreground (where the
// path started) toward the light (what comes next). Milestones keep the order
// of `learningItems`; they carry no dates in the data, so none are shown.
// Points are in the SVG's 1200×1000 space and reused as % for the markers.
const POINTS = [
  [456, 860],
  [744, 700],
  [480, 540],
  [624, 400],
];
const TRAIL = 'M360 1000 C 420 950, 330 900, 456 860 S 780 770, 744 700 S 400 610, 480 540 S 650 450, 624 400';
const TRAIL_AHEAD = 'M624 400 S 560 330, 576 280';

export default function LearningPathPage() {
  const { t } = useLang();
  const items = t('learningItems');
  useSeo({ title: t('learningLabel'), description: t('learningSub'), path: '/learning-path' });
  const list = Array.isArray(items) ? items : [];

  const statusOf = (it) => (it.status === 'completed' ? t('learningCompleted') : it.status === 'upcoming' ? t('learningUpcoming') : t('learningStatus'));

  return (
    <div className="lp">
      <style>{`
        .lp-forest { position: relative; margin-top: calc(-1 * var(--nav-h)); height: clamp(860px, 112vh, 1080px); overflow: hidden; background: #07080a; isolation: isolate; border-bottom: 1px solid var(--c-line); }
        .lp-forest picture, .lp-forest picture img { position: absolute; inset: 0; width: 100%; height: 100%; }
        .lp-forest picture img { object-fit: cover; object-position: 44% 40%; }
        .lp-shade { position: absolute; inset: 0; z-index: 0; pointer-events: none; background:
          linear-gradient(180deg, rgba(10,12,16,0.92) 0%, rgba(10,12,16,0.55) 22%, rgba(10,12,16,0.1) 42%, rgba(10,12,16,0.25) 70%, rgba(10,12,16,0.95) 100%),
          radial-gradient(120% 90% at 50% 45%, rgba(10,12,16,0) 40%, rgba(10,12,16,0.65) 100%); }
        .lp-head { position: relative; z-index: 2; padding-top: calc(var(--nav-h) + 40px); }
        .lp-head h1 { font-family: var(--font-display); font-weight: 400; font-size: clamp(44px, 5.4vw, 80px); line-height: 1; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 22px; }
        .lp-head p { font-family: var(--font-body); font-size: 17px; line-height: 1.65; color: #c9cfd8; max-width: 520px; margin-top: 18px; }
        .lp-trail { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
        .lp-trail path { fill: none; vector-effect: non-scaling-stroke; }
        .lp-stop { position: absolute; z-index: 2; transform: translate(-50%, -50%); }
        .lp-dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--c-ink); background: #0a0c10; box-shadow: 0 0 0 6px rgba(10,12,16,0.45); }
        .completed > .lp-dot { background: var(--c-ink); }
        .in-progress > .lp-dot { border-color: var(--c-primary); background: var(--c-primary); box-shadow: 0 0 0 6px rgba(0,240,255,0.16); }
        .upcoming > .lp-dot { border-style: dashed; opacity: 0.85; }
        .lp-card { position: absolute; top: 50%; width: 290px; transform: translateY(-50%); padding: 16px 18px; background: rgba(10,12,16,0.72); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08); }
        .lp-stop.right .lp-card { left: 30px; }
        .lp-stop.left .lp-card { right: 30px; }
        .lp-card .n { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.16em; color: var(--c-meta); }
        .lp-card h2 { font-family: var(--font-display); font-weight: 500; font-size: 20px; letter-spacing: -0.01em; color: var(--c-ink); margin-top: 8px; }
        .lp-card .f { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.08em; color: #aab2bf; margin-top: 6px; }
        .lp-card .row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 12px; }
        .upcoming > .lp-card { opacity: 0.85; }

        .lp-notes { padding-top: 88px; padding-bottom: 120px; }
        .lp-notes-grid { list-style: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: 1px solid var(--c-line); border-left: 1px solid var(--c-line); margin-top: 40px; }
        .lp-notes-grid > li { border-right: 1px solid var(--c-line); border-bottom: 1px solid var(--c-line); padding: 28px; }
        .lp-notes-grid h3 { font-family: var(--font-display); font-weight: 500; font-size: 20px; color: var(--c-ink); margin-top: 10px; }
        .lp-notes-grid p { font-family: var(--font-body); font-size: 14.5px; line-height: 1.65; color: var(--c-body); margin-top: 10px; }
        .lp-topics { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }

        .lp-mobile { display: none; }
        @media (max-width: 900px) {
          .lp-forest { height: auto; min-height: 0; padding-bottom: 48px; }
          .lp-forest picture img { object-position: 40% 40%; }
          .lp-shade { background: linear-gradient(180deg, rgba(10,12,16,0.9) 0%, rgba(10,12,16,0.45) 30%, rgba(10,12,16,0.55) 60%, rgba(10,12,16,0.96) 100%); }
          .lp-trail, .lp-stop { display: none; }
          .lp-mobile { display: block; position: relative; z-index: 2; list-style: none; margin-top: 260px; padding-left: calc(var(--ds-gutter) + 28px); }
          .lp-mobile::before { content: ''; position: absolute; top: 18px; bottom: 18px; left: calc(var(--ds-gutter) + 6px); border-left: 2px dashed rgba(238,240,244,0.45); }
          .lp-mobile li { position: relative; padding-bottom: 22px; }
          .lp-mobile li:last-child { padding-bottom: 0; }
          .lp-mobile .lp-dot { position: absolute; left: -28px; top: 18px; }
          .lp-mobile .lp-card { position: static; transform: none; width: auto; }
          .lp-notes-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) { .lp-notes-grid > li { padding: 22px 18px; } .lp-mobile { margin-top: 200px; } }
      `}</style>

      <section className="lp-forest" aria-labelledby="lp-title">
        <picture aria-hidden="true">
          <source srcSet="/media/forest-trail-1280.webp 1280w, /media/forest-trail-2400.webp 2400w" sizes="100vw" type="image/webp" />
          <img src="/media/forest-trail-1280.jpg" alt="" />
        </picture>
        <div className="lp-shade" />

        <svg className="lp-trail" viewBox="0 0 1200 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d={TRAIL} stroke="rgba(10,12,16,0.55)" strokeWidth="7" />
          <path d={TRAIL} stroke="rgba(238,240,244,0.85)" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
          <path d={TRAIL_AHEAD} stroke="rgba(238,240,244,0.45)" strokeWidth="2" strokeDasharray="1 10" strokeLinecap="round" />
        </svg>

        <div className="ds-wrap lp-head">
          <Link to="/" className="link-hover" style={s.back}>
            <ArrowLeft size={16} strokeWidth={1.5} /> {t('learningBack')}
          </Link>
          <div className="ds-kicker" style={{ marginTop: 28 }}>{t('learningBadge')}</div>
          <h1 id="lp-title">{t('learningLabel')}</h1>
          <p>{t('learningSub')}</p>
        </div>

        {list.slice(0, POINTS.length).map((it, i) => (
          <div
            key={it.title}
            className={`lp-stop ${it.status} ${i % 2 ? 'right' : 'left'}`}
            style={{ left: `${(POINTS[i][0] / 1200) * 100}%`, top: `${(POINTS[i][1] / 1000) * 100}%` }}
          >
            <div className="lp-dot" />
            <Milestone it={it} i={i} total={list.length} status={statusOf(it)} />
          </div>
        ))}

        <ol className="ds-wrap lp-mobile">
          {list.map((it, i) => (
            <li key={it.title} className={it.status}>
              <span className="lp-dot" />
              <Milestone it={it} i={i} total={list.length} status={statusOf(it)} />
            </li>
          ))}
        </ol>
      </section>

      <section className="ds-wrap lp-notes" aria-labelledby="lp-notes">
        <div className="ds-kicker">{t('learningNotesKicker')}</div>
        <h2 id="lp-notes" className="ds-h2"><TwoTone text={t('learningNotesTitle')} /></h2>
        <ol className="lp-notes-grid">
          {list.map((it, i) => (
            <li key={it.title}>
              <div className="ds-meta">{String(i + 1).padStart(2, '0')} · {it.field} · {statusOf(it)}</div>
              <h3>{it.title}</h3>
              {it.abstract && <p>{it.abstract}</p>}
              {Array.isArray(it.topics) && it.topics.length > 0 && (
                <div className="lp-topics" aria-label={t('learningTopics')}>
                  {it.topics.map((tp) => <span key={tp} className="label">{tp}</span>)}
                </div>
              )}
              {it.repo && (
                <a href={it.repo} target="_blank" rel="noopener noreferrer" className="ds-link" style={{ marginTop: 20 }}>
                  <Github size={13} strokeWidth={1.5} /> {t('learningRepo')} <ArrowUpRight size={12} strokeWidth={1.5} />
                </a>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Milestone({ it, i, total, status }) {
  const { t } = useLang();
  return (
    <div className="lp-card">
      <div className="n">{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
      <h2>{it.title}</h2>
      <div className="f">{it.field}</div>
      <div className="row">
        <span className="label" style={it.status === 'in-progress' ? { color: 'var(--c-primary)', borderColor: 'rgba(0,240,255,0.4)' } : undefined}>{status}</span>
        {it.repo && (
          <a href={it.repo} target="_blank" rel="noopener noreferrer" className="ds-meta" style={{ color: '#c6cdd8', display: 'inline-flex', gap: 5, alignItems: 'center' }} aria-label={`${it.title} — ${t('learningRepo')}`}>
            <Github size={12} strokeWidth={1.5} /> repo
          </a>
        )}
      </div>
    </div>
  );
}

const s = {
  back: { display: 'flex', width: 'fit-content', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: '#aab2bf', cursor: 'pointer' },
};
