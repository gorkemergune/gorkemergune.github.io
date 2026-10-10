import { ArrowRight } from 'lucide-react';
import { useLang } from '../../i18n.jsx';

// The research library: one architectural bookcase, shelves of TWO
// compartments built from the data (so a new entry just adds a compartment).
// Each research entry sits in its compartment as a framed dossier — the image
// is the dominant element, a brass label plate below it. When the count is
// odd, the last compartment is a "reserved" one holding only books.
// Every dossier is a real <button>; the shelves themselves are pure CSS.
const PER_SHELF = 2;

// Book spines are decoration; a fixed pattern per compartment keeps them
// stable between renders.
const SPINES = [
  [[70, '#2a2f38'], [86, '#3b2f22'], [62, '#22303a'], [78, '#2f2a35']],
  [[82, '#2c3540'], [66, '#3a3226'], [90, '#25282f']],
  [[74, '#34291f'], [88, '#232c36'], [60, '#2d3038'], [80, '#3a2f24']],
  [[86, '#272b33'], [70, '#3b3024'], [64, '#22303a']],
  [[78, '#2f2a35'], [90, '#283039'], [68, '#3a2f24'], [84, '#2a2f38']],
  [[92, '#3b2f22'], [72, '#25282f'], [86, '#2c3540'], [66, '#34291f'], [80, '#2a2f38'], [74, '#3a3226']],
];

function Spines({ set, wide }) {
  return (
    <span className={`lib-spines${wide ? ' wide' : ''}`} aria-hidden="true">
      {SPINES[set].map(([h, c], i) => <span key={i} style={{ height: `${h}%`, background: `linear-gradient(90deg, ${c}, #15181e 140%)` }} />)}
    </span>
  );
}

export default function ResearchShelves({ items, onOpen }) {
  const { t } = useLang();
  const kinds = t('researchCoverKinds') || {};
  const total = Math.ceil(items.length / PER_SHELF) * PER_SHELF;
  const slots = Array.from({ length: total }, (_, i) => items[i] || null);
  const shelves = Array.from({ length: total / PER_SHELF }, (_, i) => slots.slice(i * PER_SHELF, (i + 1) * PER_SHELF));

  return (
    <div className="lib-case" aria-label={t('libKicker')}>
      <style>{`
        .lib-case { position: relative; padding: 34px 40px 30px; background:
            linear-gradient(180deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0) 18%),
            linear-gradient(180deg, #14171d 0%, #0c0e12 100%);
          border: 1px solid #262b34; box-shadow: 0 40px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05); }
        .lib-case::before, .lib-case::after { content: ''; position: absolute; top: 0; bottom: 0; width: 14px; background: linear-gradient(90deg, #1d2128, #2a2f38 50%, #1a1d23); border-left: 1px solid #30353f; border-right: 1px solid #0b0d11; }
        .lib-case::before { left: 0; } .lib-case::after { right: 0; }
        .lib-cornice { position: absolute; left: 0; right: 0; top: 0; height: 12px; background: linear-gradient(180deg, #2a2f38, #15181e); border-bottom: 1px solid #0b0d11; }
        .lib-cornice::after { content: ''; position: absolute; left: 6%; right: 6%; bottom: -2px; height: 2px; background: linear-gradient(90deg, transparent, rgba(245,158,11,0.75), transparent); filter: blur(0.5px); }
        .lib-strip { position: absolute; top: 24px; bottom: 24px; width: 2px; background: linear-gradient(180deg, transparent, rgba(0,240,255,0.55), transparent); z-index: 1; }
        .lib-strip.l { left: 6px; } .lib-strip.r { right: 6px; }

        .lib-shelf + .lib-shelf { margin-top: 30px; }
        .lib-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }
        .lib-plank { position: relative; height: 18px; margin: 0 -26px; background: linear-gradient(180deg, #3a3f48 0%, #23272e 40%, #15181e 100%); border-top: 1px solid #4a505a; box-shadow: 0 16px 34px rgba(245,158,11,0.16), 0 6px 10px rgba(0,0,0,0.6); }
        .lib-plank::after { content: ''; position: absolute; left: 4%; right: 4%; bottom: -1px; height: 1px; background: linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent); }
        .lib-plank-label { position: absolute; left: 30px; top: 50%; transform: translateY(-50%); font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: #8a7a5c; }

        .lib-bay { position: relative; display: flex; flex-direction: column; padding: 22px 16px 16px; text-align: left; color: inherit; font: inherit; cursor: pointer; border: 1px solid #1c2027; background:
            radial-gradient(70% 55% at 50% 0%, rgba(245,158,11,0.16), rgba(245,158,11,0) 70%),
            linear-gradient(180deg, #0f1116 0%, #0a0b0f 100%);
          box-shadow: inset 0 18px 30px rgba(0,0,0,0.65), inset 0 -10px 20px rgba(0,0,0,0.5), inset 12px 0 18px rgba(0,0,0,0.45), inset -12px 0 18px rgba(0,0,0,0.45);
          transition: border-color 0.35s, background 0.35s, box-shadow 0.35s; }
        .lib-bay::before { content: ''; position: absolute; left: 14%; right: 14%; top: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(245,158,11,0.85), transparent); box-shadow: 0 0 14px rgba(245,158,11,0.55); transition: opacity 0.35s; opacity: 0.75; }
        .lib-bay:hover, .lib-bay:focus-visible { border-color: rgba(0,240,255,0.45); background:
            radial-gradient(75% 60% at 50% 0%, rgba(245,158,11,0.28), rgba(245,158,11,0) 72%),
            linear-gradient(180deg, #12151b 0%, #0b0d11 100%); }
        .lib-bay:hover::before, .lib-bay:focus-visible::before { opacity: 1; }
        .lib-bay:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 3px; }

        .lib-spines { position: absolute; left: 10px; bottom: 0; height: 112px; display: flex; align-items: flex-end; gap: 2px; pointer-events: none; }
        .lib-spines span { width: 9px; border-top: 1px solid rgba(255,255,255,0.12); border-left: 1px solid rgba(255,255,255,0.05); box-shadow: inset -2px 0 3px rgba(0,0,0,0.4); }
        .lib-spines.wide { position: static; height: 150px; gap: 3px; }
        .lib-spines.wide span { width: 18px; }

        .lib-dossier { position: relative; z-index: 1; display: flex; flex-direction: column; flex: 1; }
        .lib-frame { position: relative; padding: 6px; background: linear-gradient(180deg, #1c2027, #111318); border: 1px solid #2c313c; box-shadow: 0 14px 26px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.6); transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s; }
        .lib-frame-in { aspect-ratio: 16 / 9; background: #07080b; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .lib-frame-in img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .lib-stand { height: 8px; margin: 0 30%; background: linear-gradient(180deg, #2c313c, #15181e); border-radius: 0 0 4px 4px; }
        .lib-bay:hover .lib-frame, .lib-bay:focus-visible .lib-frame { transform: translateY(-4px); box-shadow: 0 20px 34px rgba(0,0,0,0.7), 0 0 22px rgba(0,240,255,0.14); }

        .lib-plate { margin-top: 12px; padding: 12px 16px; background: linear-gradient(180deg, rgba(36,31,24,0.9), rgba(20,18,15,0.95)); border: 1px solid rgba(245,158,11,0.28); box-shadow: inset 0 1px 0 rgba(255,220,160,0.08); display: flex; flex-direction: column; gap: 6px; flex: 1; }
        .lib-field { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #c9a86a; }
        .lib-title { font-family: var(--font-display); font-weight: 500; font-size: 19px; line-height: 1.25; color: var(--c-ink); transition: color 0.3s; }
        .lib-bay:hover .lib-title, .lib-bay:focus-visible .lib-title { color: var(--c-primary); }
        .lib-meta { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-top: auto; padding-top: 6px; }
        .lib-status { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #aab2bf; }
        .lib-status i { width: 7px; height: 7px; border-radius: 50%; background: #8a919d; box-shadow: 0 0 6px rgba(138,145,157,0.6); }
        .lib-status.live i { background: var(--c-primary); box-shadow: 0 0 8px rgba(0,240,255,0.8); animation: lib-blink 2s ease-in-out infinite; }
        .lib-status.live { color: var(--c-primary); }
        @keyframes lib-blink { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .lib-go { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #c6cdd8; opacity: 0.7; transition: opacity 0.3s, color 0.3s, transform 0.3s; }
        .lib-bay:hover .lib-go, .lib-bay:focus-visible .lib-go { opacity: 1; color: var(--c-primary); transform: translateX(3px); }
        .lib-kind { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.08em; color: #6b7280; line-height: 1.4; margin-top: 8px; }

        .lib-empty { cursor: default; display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-start; gap: 16px; min-height: 260px; }
        .lib-empty:hover { border-color: #1c2027; }
        .lib-empty .lib-plate { flex: none; align-self: stretch; border-style: dashed; border-color: rgba(245,158,11,0.22); background: rgba(20,18,15,0.6); }

        @media (prefers-reduced-motion: reduce) { .lib-status.live i { animation: none; } .lib-frame { transition: none; } }
        @media (max-width: 1100px) { .lib-case { padding: 30px 26px 26px; } .lib-row { gap: 18px; } }
        @media (max-width: 760px) {
          .lib-row { grid-template-columns: 1fr; gap: 0; }
          .lib-row > * + * { margin-top: 18px; }
          .lib-plank { margin: 0 -26px; }
          .lib-empty { min-height: 180px; }
        }
        @media (max-width: 600px) {
          .lib-case { padding: 20px 8px 16px; }
          .lib-case::before, .lib-case::after { width: 4px; }
          .lib-strip { display: none; }
          .lib-plank { margin: 0 -8px; }
          .lib-bay { padding: 16px 6px 10px; }
          .lib-title { font-size: 17px; }
        }
      `}</style>

      <span className="lib-cornice" aria-hidden="true" />
      <span className="lib-strip l" aria-hidden="true" />
      <span className="lib-strip r" aria-hidden="true" />

      {shelves.map((row, si) => (
        <section key={si} className="lib-shelf" aria-label={`${t('libShelf')} ${si + 1}`}>
          <div className="lib-row">
            {row.map((it, ci) => {
              const n = si * PER_SHELF + ci;
              if (!it) {
                return (
                  <div key={`empty-${n}`} className="lib-bay lib-empty">
                    <Spines set={n % SPINES.length} wide />
                    <div className="lib-plate"><span className="lib-field">{t('libReserved')}</span></div>
                  </div>
                );
              }
              const live = it.status !== 'completed';
              return (
                <button key={it.title} type="button" className="lib-bay" onClick={() => onOpen(n)}
                  aria-label={`${it.title} — ${live ? t('researchStatus') : t('researchCompleted')}. ${t('libOpen')}`}>
                  <span className="lib-dossier">
                    <span className="lib-frame">
                      <span className="lib-frame-in">
                        {it.cover && <img src={it.cover} alt={`${it.title} — ${kinds[it.coverKind] || ''}`} loading={si < 2 ? 'eager' : 'lazy'} decoding="async" />}
                      </span>
                    </span>
                    <span className="lib-stand" aria-hidden="true" />
                    <span className="lib-plate">
                      <span className="lib-field">{it.field}</span>
                      <span className="lib-title">{it.title}</span>
                      <span className="lib-meta">
                        <span className={`lib-status${live ? ' live' : ''}`}>
                          <i aria-hidden="true" />
                          {live ? t('researchStatus') : t('researchCompleted')}
                        </span>
                        <span className="lib-go" aria-hidden="true">{t('libOpen')} <ArrowRight size={12} strokeWidth={1.6} /></span>
                      </span>
                      {kinds[it.coverKind] && <span className="lib-kind">{kinds[it.coverKind]}</span>}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="lib-plank" aria-hidden="true"><span className="lib-plank-label">{t('libShelf')} {String(si + 1).padStart(2, '0')}</span></div>
        </section>
      ))}
    </div>
  );
}
