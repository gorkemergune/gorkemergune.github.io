import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useLang } from '../../i18n.jsx';

// The closing frame of the home presentation: the contact page's own words
// ("Reach out anytime · Open to collaboration") and the real channels.
export default function ClosingContact() {
  const { t } = useLang();
  return (
    <section className="ds-section end" aria-labelledby="end-title" data-reveal>
      <style>{`
        .end-box { position: relative; overflow: hidden; padding: 56px 48px; border: 1px solid var(--c-line); background:
            radial-gradient(70% 120% at 100% 0%, rgba(0,240,255,0.08), transparent 60%),
            radial-gradient(60% 120% at 0% 100%, rgba(245,158,11,0.07), transparent 60%),
            linear-gradient(180deg, #12151b, #0c0e12); }
        .end-box h2 { font-family: var(--font-display); font-weight: 500; font-size: clamp(34px, 4.6vw, 64px); line-height: 1.02; letter-spacing: -0.03em; color: var(--c-ink); margin-top: 16px; }
        .end-box h2 em { font-style: normal; color: var(--c-primary); }
        .end-box p { font-family: var(--font-body); font-size: 17px; color: #c3c9d4; margin-top: 14px; }
        .end-actions { display: flex; flex-wrap: wrap; gap: 14px 24px; align-items: center; margin-top: 30px; }
        @media (max-width: 600px) { .end-box { padding: 34px 20px; } .end-box p { font-size: 15.5px; } }
      `}</style>
      <div className="ds-wrap">
        <div className="end-box">
          <div className="ds-kicker">{t('endKicker')}</div>
          <h2 id="end-title">{t('contactLine1')} <em>{t('contactLine1Em')}</em>.</h2>
          <p>{t('contactLine2')}.</p>
          <div className="end-actions">
            <Link to="/contact" className="btn btn-primary">{t('exContact')} <ArrowRight size={15} strokeWidth={1.6} /></Link>
            <a href="mailto:gorkemergune2@gmail.com" className="ds-link"><Mail size={13} strokeWidth={1.5} /> gorkemergune2@gmail.com</a>
            <a href="https://www.linkedin.com/in/gorkemergune/" target="_blank" rel="noopener noreferrer" className="ds-link"><Linkedin size={13} strokeWidth={1.5} /> LinkedIn</a>
            <a href="https://github.com/gorkemergune" target="_blank" rel="noopener noreferrer" className="ds-link"><Github size={13} strokeWidth={1.5} /> GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}
