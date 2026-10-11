import { useLang } from '../i18n.jsx';
import { FunHeader, FUN_CSS } from '../components/fun/FunFrame';
import LoveMeter from '../components/fun/LoveMeter.jsx';
import FloatingHearts from '../components/fun/FloatingHearts.jsx';

// FEATURE 1 — Love Meter ❤️ page. Standard Fun-page chrome (back link + header)
// wrapping the self-contained LoveMeter widget, over an ambient hearts backdrop.
export default function LoveMeterPage() {
  const { t } = useLang();

  return (
    <div className="fun-page" style={{ maxWidth: s.container.maxWidth, '--fun-acc': '#ff4d6d' }}>
      <FloatingHearts />

      <style>{FUN_CSS}</style>
      <FunHeader kind="me" accent="#ff4d6d" title={t('funLoveTitle')} sub={t('loveSub')}>
        <p style={s.disclaimer}>{t('loveDisclaimer')}</p>
      </FunHeader>

      <LoveMeter />
    </div>
  );
}

const s = {
  container: { maxWidth: 540, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: '0.06em', color: '#5c6370', marginBottom: 48, cursor: 'pointer', position: 'relative', zIndex: 2 },
  header: { marginBottom: 32, position: 'relative', zIndex: 2 },
  title: { fontFamily: "var(--font-display)", fontSize: 60, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 16 },
  desc: { fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6, color: '#8b929e', maxWidth: 460 },
  disclaimer: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.04em', color: '#6b7280', marginTop: 12 },
};
