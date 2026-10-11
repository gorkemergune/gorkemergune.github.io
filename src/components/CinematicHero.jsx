import { Link } from 'react-router-dom';
import { ArrowDown, FileText, Github, Linkedin } from 'lucide-react';
import { guidedScrollTo } from '../hooks/guidedScroll';
import { useLang } from '../i18n.jsx';
import { FEATURES } from '../config';

// Full-bleed workspace hero. The source image is 1976×796 (≈2.5:1), so the
// section height follows the width (50vw, capped by the viewport) and the
// image is anchored right: the helmet, the energy core and the monitors stay
// whole, the text sits on the dark interior on the left. Overlays only add
// contrast where the text is.
// The motto breaks after its comma, by design: "Focus on improving yourself, /
// not proving yourself" — and "Kendini kanıtlamaya değil, / geliştirmeye
// odaklan" in Turkish. Each half is a block that never wraps internally.
function MottoLines({ text }) {
  const i = String(text).indexOf(', ');
  if (i === -1) return text;
  return (
    <>
      <span className="ln">{text.slice(0, i + 1)}</span>
      <span className="ln">{text.slice(i + 2)}</span>
    </>
  );
}

export default function CinematicHero() {
  const { t } = useLang();
  // HashRouter owns the URL hash, so the anchor's default jump is replaced by
  // the guided glide; focus then lands on the profile heading for keyboards.
  const viewWork = (e) => {
    e.preventDefault();
    const el = document.getElementById('profile');
    el?.classList.add('in'); // reveal it now so it is in place when the glide arrives
    guidedScrollTo(el, { onDone: () => el?.querySelector('h2')?.focus({ preventScroll: true }) });
  };

  return (
    <section className="ch-hero" aria-label={t('heroTagline')}>
      <style>{`
        .ch-hero { position: relative; height: clamp(600px, 50vw, 100svh); display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; background: #07070b; isolation: isolate; border-bottom: 1px solid var(--ds-line); }
        .ch-photo, .ch-photo img { position: absolute; inset: 0; width: 100%; height: 100%; }
        .ch-photo img { object-fit: cover; object-position: 100% 50%; transform: scale(1.03); animation: ch-settle 2.4s cubic-bezier(0.2,0.8,0.2,1) forwards; }
        @keyframes ch-settle { to { transform: scale(1); } }
        .ch-shade { position: absolute; inset: 0; pointer-events: none;
          background:
            linear-gradient(90deg, rgba(10,12,16,0.86) 0%, rgba(10,12,16,0.66) 30%, rgba(10,12,16,0.2) 46%, rgba(10,12,16,0) 58%),
            linear-gradient(180deg, rgba(10,12,16,0.5) 0%, rgba(10,12,16,0) 16%, rgba(10,12,16,0) 78%, rgba(10,12,16,0.75) 100%); }
        .ch-inner { width: 100%; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); align-items: end; gap: 48px; padding-top: 120px; padding-bottom: 56px; }
        .ch-kicker { display: flex; gap: 12px; flex-wrap: wrap; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #a9b4c4; }
        .ch-kicker span + span::before { content: '/'; margin-right: 12px; color: #4a5566; }
        .ch-h1 { font-family: var(--font-display); font-weight: 400; color: #f2f4f8; margin: 28px 0 0; letter-spacing: -0.03em; }
        .ch-hello { display: block; font-size: clamp(34px, 3.4vw, 48px); line-height: 1.1; color: #aeb6c3; letter-spacing: -0.02em; }
        .ch-name { display: block; font-size: clamp(56px, 6.4vw, 96px); line-height: 1; }
        .ch-name .dim { color: #8f98a8; }
        .ch-intro { font-family: var(--font-body); font-size: 17px; line-height: 1.65; color: #c3c9d4; max-width: 480px; margin-top: 28px; }
        .ch-ctas { display: flex; gap: 20px 32px; align-items: center; flex-wrap: wrap; margin-top: 36px; }
        .ch-socials { display: inline-flex; gap: 24px; flex-wrap: wrap; }
        .ch-aside { justify-self: end; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; text-align: right; padding: 16px 20px; background: rgba(10,12,16,0.62); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.06); }
        .ch-motto { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; line-height: 1.8; text-transform: uppercase; color: #cfd6e0; padding-bottom: 12px; border-bottom: 1px solid rgba(0,240,255,0.45); }
        .ch-motto .ln { display: block; white-space: nowrap; }
        .ch-coord { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em; color: #9aa1ad; }
        .ch-scroll { position: absolute; left: var(--ds-gutter); bottom: 22px; display: none; }
        @media (prefers-reduced-motion: reduce) { .ch-photo img { animation: none; transform: none; } }
        @media (max-width: 1000px) {
          .ch-hero { height: auto; min-height: 100svh; max-height: none; }
          .ch-inner { grid-template-columns: 1fr; gap: 40px; padding-top: 120px; padding-bottom: 48px; }
          .ch-aside { justify-self: start; align-items: flex-start; text-align: left; }
          .ch-photo img { object-position: 86% 50%; }
          .ch-shade { background:
            linear-gradient(180deg, rgba(10,12,16,0.5) 0%, rgba(10,12,16,0) 22%, rgba(10,12,16,0.55) 52%, rgba(10,12,16,0.92) 100%); }
        }
        @media (max-width: 600px) {
          .ch-hero { min-height: 0; height: auto; }
          .ch-shade { background:
            linear-gradient(180deg, rgba(10,12,16,0.45) 0%, rgba(10,12,16,0) 16%, rgba(10,12,16,0.15) 28%, rgba(10,12,16,0.82) 44%, rgba(10,12,16,0.94) 100%); }
          .ch-inner { padding-top: 300px; padding-bottom: 40px; gap: 32px; }
          .ch-kicker { flex-direction: column; gap: 6px; font-size: 10px; letter-spacing: 0.16em; }
          .ch-kicker span + span::before { content: none; }
          .ch-h1 { margin-top: 22px; }
          .ch-intro { font-size: 15.5px; margin-top: 20px; }
          .ch-ctas { gap: 24px; margin-top: 28px; }
        }
      `}</style>

      <picture className="ch-photo">
        <source srcSet="/media/hero-workspace-1280.webp 1280w, /media/hero-workspace.webp 1976w" sizes="(max-width: 1000px) 260vw, 125vw" type="image/webp" />
        <img src="/media/hero-workspace-1280.jpg" alt="" fetchpriority="high" decoding="async" />
      </picture>
      <div className="ch-shade" />

      <div className="ds-wrap" style={{ width: '100%' }}>
        <div className="ch-inner">
          <div>
            <div className="ch-kicker reveal reveal-1"><span>{t('heroTagline')}</span><span>{t('heroDiscipline')}</span></div>
            <h1 className="ch-h1 reveal reveal-2">
              <span className="ch-hello">{t('heroHello')}</span>
              <span className="ch-name">Görkem <span className="dim">Ergüne</span></span>
            </h1>
            <p className="ch-intro reveal reveal-3">{t('heroSubtext')}</p>
            <div className="ch-ctas reveal reveal-4">
              {/* "View Work" starts the presentation: a gentle glide to the
                  profile summary (#profile), interruptible at any time; the
                  eight doors follow directly below it. */}
              <a href="#profile" className="btn btn-outline" onClick={viewWork}>{t('ctaViewWork')} <ArrowDown size={16} strokeWidth={1.5} /></a>
              <span className="ch-socials">
                <a href="https://github.com/gorkemergune" target="_blank" rel="noopener noreferrer" className="ds-link">
                  <Github size={13} strokeWidth={1.5} /> {t('heroGithub')}
                </a>
                <a href="https://www.linkedin.com/in/gorkemergune/" target="_blank" rel="noopener noreferrer" className="ds-link">
                  <Linkedin size={13} strokeWidth={1.5} /> {t('heroLinkedIn')}
                </a>
                {FEATURES.resume && <Link to="/resume" className="ds-link"><FileText size={13} strokeWidth={1.5} /> {t('ctaResume')}</Link>}
              </span>
            </div>
          </div>
          <div className="ch-aside reveal reveal-5">
            <p className="ch-motto"><MottoLines text={t('heroTagline1')} /></p>
            <span className="ch-coord">{t('hallStatusCenter')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
