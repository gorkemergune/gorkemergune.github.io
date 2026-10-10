import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText, Github, X } from 'lucide-react';
import { useLang } from '../../i18n.jsx';

// One research entry opened from the shelf: a modal dossier with the image,
// the full abstract, methods, outcomes, results table, findings, the repo's
// illustrations and every verified link. Esc / backdrop / close button
// dismiss it; focus moves into it and is kept there while it is open.
export default function ResearchDossier({ it, onClose }) {
  const { t } = useLang();
  const kinds = t('researchCoverKinds') || {};
  const panel = useRef(null);
  const closeBtn = useRef(null);
  const done = it.status === 'completed';

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
    <div className="dz-back" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <style>{`
        .dz-back { position: fixed; inset: 0; z-index: 300; background: rgba(5,6,9,0.82); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: flex; justify-content: center; align-items: flex-start; overflow-y: auto; padding: 48px 24px; animation: dz-fade 0.25s ease-out; }
        .dz { position: relative; width: 100%; max-width: 980px; background: linear-gradient(180deg, #13161c, #0d0f13); border: 1px solid #2a2f38; box-shadow: 0 40px 90px rgba(0,0,0,0.7); animation: dz-rise 0.35s cubic-bezier(0.2,0.8,0.2,1); }
        .dz::before { content: ''; position: absolute; left: 10%; right: 10%; top: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(245,158,11,0.85), transparent); }
        @keyframes dz-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dz-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .dz-close { position: absolute; right: 14px; top: 14px; z-index: 2; }
        .dz-fig { margin: 0; padding: 22px 22px 0; }
        .dz-fig .in { background: #07080b; border: 1px solid #22262e; display: flex; justify-content: center; }
        .dz-fig img { max-width: 100%; max-height: 440px; object-fit: contain; display: block; }
        .dz-fig figcaption { margin-top: 8px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-meta); }
        .dz-body { padding: 24px 32px 32px; }
        .dz-top { display: flex; flex-wrap: wrap; gap: 10px 16px; align-items: center; }
        .dz-field { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #c9a86a; }
        .dz h2 { font-family: var(--font-display); font-weight: 500; font-size: clamp(24px, 3vw, 34px); line-height: 1.15; letter-spacing: -0.015em; color: var(--c-ink); margin-top: 12px; }
        .dz-abs { font-family: var(--font-body); font-size: 16px; line-height: 1.65; color: #c6cdd8; margin-top: 14px; }
        .dz-sec { margin-top: 28px; }
        .dz-h { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: #c6cdd8; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
        .dz-h::before { content: ''; width: 1px; height: 12px; background: var(--c-tertiary); }
        .dz-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .dz ul { list-style: none; display: flex; flex-direction: column; gap: 9px; }
        .dz li { display: flex; gap: 10px; font-family: var(--font-body); font-size: 14px; line-height: 1.55; color: #a7aebb; }
        .dz li::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--c-tertiary); margin-top: 8px; flex: none; }
        .dz p.txt { font-family: var(--font-body); font-size: 14px; line-height: 1.6; color: #a7aebb; }
        .dz-table { overflow-x: auto; }
        .dz table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 12.5px; }
        .dz th { padding: 8px 10px; border-bottom: 1px solid #2c313c; color: #7b8290; font-weight: 400; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; }
        .dz td { padding: 10px; border-bottom: 1px solid #1e222b; font-variant-numeric: tabular-nums; }
        .dz-cap { font-family: var(--font-body); font-size: 12.5px; line-height: 1.55; color: #6b7280; margin-top: 10px; }
        .dz-gal { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .dz-gal figure { margin: 0; border: 1px solid #1e222b; background: #0d0f14; }
        .dz-gal img { display: block; width: 100%; height: auto; }
        .dz-gal figcaption { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.08em; text-transform: uppercase; color: #7b8290; padding: 6px 8px; }
        .dz-links { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #1e222b; }
        @media (prefers-reduced-motion: reduce) { .dz-back, .dz { animation: none; } }
        @media (max-width: 720px) {
          .dz-back { padding: 0; }
          .dz { min-height: 100%; border: none; }
          .dz-fig { padding: 56px 14px 0; }
          .dz-body { padding: 20px 16px 28px; }
          .dz-cols { grid-template-columns: 1fr; }
          .dz-gal { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
      <div ref={panel} className="dz" role="dialog" aria-modal="true" aria-labelledby="dz-title">
        <button ref={closeBtn} type="button" className="icon-btn dz-close" onClick={onClose} aria-label={t('libClose')}>
          <X size={16} strokeWidth={1.6} />
        </button>

        {it.cover && (
          <figure className="dz-fig">
            <div className="in"><img src={it.cover} alt={`${it.title} — ${kinds[it.coverKind] || ''}`} /></div>
            {kinds[it.coverKind] && <figcaption>{kinds[it.coverKind]}</figcaption>}
          </figure>
        )}

        <div className="dz-body">
          <div className="dz-top">
            <span className="dz-field">{it.field}</span>
            <span className={`label${done ? '' : ' label-primary'}`}>{done ? t('researchCompleted') : t('researchStatus')}</span>
          </div>
          <h2 id="dz-title">{it.title}</h2>
          {it.abstract && <p className="dz-abs">{it.abstract}</p>}

          {(Array.isArray(it.methods) && it.methods.length > 0) && (
            <div className="dz-sec dz-cols">
              <div>
                <div className="dz-h">{t('researchMethods')}</div>
                <ul>{it.methods.map((m) => <li key={m}>{m}</li>)}</ul>
              </div>
              {it.expected && (
                <div>
                  <div className="dz-h">{done ? t('researchOutcomes') : t('researchExpected')}</div>
                  <p className="txt">{it.expected}</p>
                </div>
              )}
            </div>
          )}

          {it.results && (
            <div className="dz-sec">
              <div className="dz-h">{t('researchResults')}</div>
              <div className="dz-table">
                <table>
                  <thead><tr>{it.results.columns.map((c, j) => <th key={c} style={{ textAlign: j ? 'right' : 'left' }}>{c}</th>)}</tr></thead>
                  <tbody>
                    {it.results.rows.map((r) => (
                      <tr key={r[0]}>{r.map((cell, k) => <td key={k} style={{ textAlign: k ? 'right' : 'left', color: k ? '#e0e0e8' : '#a2a2b8' }}>{cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {it.results.caption && <p className="dz-cap">{it.results.caption}</p>}
            </div>
          )}

          {Array.isArray(it.findings) && it.findings.length > 0 && (
            <div className="dz-sec">
              <div className="dz-h">{t('libFindings')}</div>
              <ul>{it.findings.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
          )}

          {Array.isArray(it.images) && it.images.length > 0 && (
            <div className="dz-sec">
              <div className="dz-gal">
                {it.images.map((im) => (
                  <figure key={im.src}><img src={im.src} alt={im.caption} loading="lazy" /><figcaption>{im.caption}</figcaption></figure>
                ))}
              </div>
              {it.imagesNote && <p className="dz-cap">{it.imagesNote}</p>}
            </div>
          )}

          {(it.repo || it.project || it.pdf) && (
            <div className="dz-links">
              {it.repo && (
                <a href={it.repo} target="_blank" rel="noopener noreferrer" className="ds-link">
                  <Github size={13} strokeWidth={1.5} /> {t('researchRepo')} <ArrowUpRight size={12} strokeWidth={1.5} />
                </a>
              )}
              {it.project && (
                <Link to={`/project/${it.project}`} className="ds-link" onClick={onClose}>
                  {t('hfViewProject')} <ArrowUpRight size={12} strokeWidth={1.5} />
                </Link>
              )}
              {it.pdf && (
                <a href={it.pdf} target="_blank" rel="noopener noreferrer" className="ds-link">
                  <FileText size={13} strokeWidth={1.5} /> {t('researchPdf')}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
