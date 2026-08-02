import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import LoveMeter from '../components/fun/LoveMeter.jsx';
import FloatingHearts from '../components/fun/FloatingHearts.jsx';

// FEATURE 1 — Love Meter ❤️ page. Standard Fun-page chrome (back link + header)
// wrapping the self-contained LoveMeter widget, over an ambient hearts backdrop.
export default function LoveMeterPage() {
  const { t } = useLang();

  return (
    <div style={s.container}>
      <FloatingHearts />

      <Link to="/fun" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('funBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('funLoveTitle')}</h1>
        <p style={s.desc}>{t('loveSub')}</p>
        <p style={s.disclaimer}>{t('loveDisclaimer')}</p>
      </div>

      <LoveMeter />
    </div>
  );
}

const s = {
  container: { maxWidth: 540, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 48, cursor: 'pointer', position: 'relative', zIndex: 2 },
  header: { marginBottom: 32, position: 'relative', zIndex: 2 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 60, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 16 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, lineHeight: 1.6, color: '#8a8aa0', maxWidth: 460 },
  disclaimer: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.04em', color: '#6a6a82', marginTop: 12 },
};
