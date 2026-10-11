import { useLang } from '../i18n.jsx';
import { FunHeader, FUN_CSS } from '../components/fun/FunFrame';
import TowerOfHanoi from '../components/TowerOfHanoi';

export default function HanoiPage() {
  const { t } = useLang();

  return (
    <div className="fun-page" style={{ maxWidth: s.container.maxWidth, '--fun-acc': '#f472b6' }}>
      <style>{FUN_CSS}</style>
      <FunHeader kind="game" accent="#f472b6" title={t('hanoiLabel')} sub={t('hanoiSub')}></FunHeader>

      <TowerOfHanoi />
    </div>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: '0.06em', color: '#8a919d', marginBottom: 60, cursor: 'pointer' },
  header: { marginBottom: 80 },
  title: { fontFamily: "var(--font-display)", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#eef0f4', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.6, color: '#b4bac5', maxWidth: 560 },
};
