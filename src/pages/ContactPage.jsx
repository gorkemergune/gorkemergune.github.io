import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n.jsx';

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
          {t('contactLine1')} {t('contactLine1') ? ' ' : ''}<em className="metallic" style={{ fontStyle: 'italic' }}>{t('contactLine1Em')}</em>.<br />
          {t('contactLine2')}
        </h1>
      </div>

      <div style={s.links}>
        <a href="mailto:gorkemergune2@gmail.com" className="link-hover" style={s.link}>
          <Mail size={18} strokeWidth={1.3} /> gorkemergune2@gmail.com
          <ArrowUpRight size={14} strokeWidth={1.2} style={{ color: '#9a9994', marginLeft: 'auto' }} />
        </a>
        <a href="https://github.com/gorkemergune" target="_blank" rel="noopener noreferrer" className="link-hover" style={s.link}>
          <Github size={18} strokeWidth={1.3} /> github/gorkemergune
          <ArrowUpRight size={14} strokeWidth={1.2} style={{ color: '#9a9994', marginLeft: 'auto' }} />
        </a>
        <a href="https://www.linkedin.com/in/gorkemergune/" target="_blank" rel="noopener noreferrer" className="link-hover" style={s.link}>
          <Linkedin size={18} strokeWidth={1.3} /> linkedin/gorkemergune
          <ArrowUpRight size={14} strokeWidth={1.2} style={{ color: '#9a9994', marginLeft: 'auto' }} />
        </a>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6b6a66', marginBottom: 60, cursor: 'pointer' },
  header: { marginBottom: 80 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#1a1a1a', marginTop: 20, marginBottom: 20 },
  links: { display: 'flex', flexDirection: 'column', gap: 0 },
  link: {
    display: 'flex', alignItems: 'center', gap: 14, padding: '24px 16px',
    borderTop: '1px solid #e2e0da',
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, color: '#2a2a28',
  },
};
