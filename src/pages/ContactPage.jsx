import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n.jsx';

// Content-creator handle — placeholder, easy to update once the name is decided.
const CREATOR_HANDLE = 'gorkemergune';

function TikTokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3c.5 2.2 2 3.6 4 3.9v2.8c-1.5 0-3-.5-4-1.3v6.1a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.8a2.7 2.7 0 1 0 1.9 2.6V3H15z" />
    </svg>
  );
}

export default function ContactPage() {
  const { t } = useLang();

  return (
    <div style={s.container}>
      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('contactBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('contactBadge')}</span>
        <h1 className="section-title big-contact" style={s.title}>
          {t('contactLine1')} <em className="metallic" style={{ fontStyle: 'italic' }}>{t('contactLine1Em')}</em>.<br />
          {t('contactLine2')}
        </h1>
      </div>

      <div style={s.links}>
        <a href="mailto:gorkemergune2@gmail.com" className="link-hover" style={s.link}>
          <Mail size={18} strokeWidth={1.3} /> gorkemergune2@gmail.com
          <ArrowUpRight size={14} strokeWidth={1.2} style={{ color: '#4a4a60', marginLeft: 'auto' }} />
        </a>
        <a href="https://github.com/gorkemergune" target="_blank" rel="noopener noreferrer" className="link-hover" style={s.link}>
          <Github size={18} strokeWidth={1.3} /> github/gorkemergune
          <ArrowUpRight size={14} strokeWidth={1.2} style={{ color: '#4a4a60', marginLeft: 'auto' }} />
        </a>
        <a href="https://www.linkedin.com/in/gorkemergune/" target="_blank" rel="noopener noreferrer" className="link-hover" style={s.link}>
          <Linkedin size={18} strokeWidth={1.3} /> linkedin/gorkemergune
          <ArrowUpRight size={14} strokeWidth={1.2} style={{ color: '#4a4a60', marginLeft: 'auto' }} />
        </a>
      </div>

      <div style={s.creatorLabel}>
        <span style={s.creatorDot} />
        {t('contactCreator')}
      </div>

      <div style={s.links}>
        <a href={`https://www.tiktok.com/@${CREATOR_HANDLE}`} target="_blank" rel="noopener noreferrer" className="link-hover" style={s.link}>
          <TikTokIcon size={18} /> tiktok/@{CREATOR_HANDLE}
          <ArrowUpRight size={14} strokeWidth={1.2} style={{ color: '#4a4a60', marginLeft: 'auto' }} />
        </a>
        <a href={`https://www.instagram.com/${CREATOR_HANDLE}/`} target="_blank" rel="noopener noreferrer" className="link-hover" style={s.link}>
          <Instagram size={18} strokeWidth={1.3} /> instagram/{CREATOR_HANDLE}
          <ArrowUpRight size={14} strokeWidth={1.2} style={{ color: '#4a4a60', marginLeft: 'auto' }} />
        </a>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 60, cursor: 'pointer' },
  header: { marginBottom: 80 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 20 },
  links: { display: 'flex', flexDirection: 'column', gap: 0 },
  creatorLabel: {
    display: 'flex', alignItems: 'center', gap: 10, marginTop: 44, marginBottom: 4, paddingLeft: 16,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', color: '#5a5a70',
  },
  creatorDot: { width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' },
  link: {
    display: 'flex', alignItems: 'center', gap: 14, padding: '24px 16px',
    borderTop: '1px solid #1a1a2e',
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, color: '#e0e0e8',
  },
};
