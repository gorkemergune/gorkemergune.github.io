import { useLang } from '../i18n.jsx';

export default function CurrentlyBuilding() {
  const { t } = useLang();
  const items = t('buildingItems');

  return (
    <div className="ds-block" aria-label={t('buildingKicker')}>
      <style>{`
        .cbd-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .cbd-st { display: inline-flex; align-items: center; gap: 8px; }
        .cbd-st i { width: 6px; height: 6px; border-radius: 50%; background: var(--ds-accent); }
        @media (max-width: 820px) { .cbd-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="ds-subhead"><span className="ds-meta">{t('buildingKicker')}</span><p>{t('buildingSub')}</p></div>
      <ul className="ds-cells cbd-grid">
        {Array.isArray(items) && items.map((it) => (
          <li key={it.title}>
            <div className="ds-cell">
              <span className="cbd-st ds-meta"><i />{it.status}</span>
              <h3 className="ds-h3" style={{ marginTop: 14 }}>{it.title}</h3>
              <p className="ds-body" style={{ fontSize: 14 }}>{it.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
