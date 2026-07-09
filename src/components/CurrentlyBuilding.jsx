import { useLang } from '../i18n.jsx';

export default function CurrentlyBuilding() {
  const { t } = useLang();
  const items = t('buildingItems');

  return (
    <section className="container" style={s.section} aria-label="Currently building">
      <style>{`
        .cb-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .cb-card { position: relative; overflow: hidden; padding: 26px; border: 1px solid #1a1a2e; border-radius: 12px; background: linear-gradient(180deg,#0f0f1a,#0b0b13); transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1), border-color 0.4s; }
        .cb-card:hover { transform: translateY(-4px); border-color: #2a2a45; }
        @keyframes cb-sweep { 0% { transform: translateX(-120%); } 100% { transform: translateX(320%); } }
        .cb-card::after { content:''; position:absolute; top:0; left:0; width:40%; height:2px; background: linear-gradient(90deg, transparent, #00d4ff, transparent); animation: cb-sweep 4s linear infinite; }
        @media (max-width: 820px) { .cb-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={s.head}>
        <div style={s.kicker}><span style={s.pulse} />{t('buildingKicker')}</div>
        <p style={s.sub}>{t('buildingSub')}</p>
      </div>

      <div className="cb-grid" style={{ marginTop: 26 }}>
        {Array.isArray(items) && items.map((it, i) => (
          <div key={i} className="cb-card">
            <div style={s.status}><span style={s.statusDot} />{it.status}</div>
            <h3 style={s.title}>{it.title}</h3>
            <p style={s.desc}>{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const s = {
  section: { maxWidth: 1400, margin: '0 auto', padding: '40px 48px 80px', position: 'relative', zIndex: 2 },
  head: { marginBottom: 6 },
  kicker: { display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', color: '#6a6a82' },
  pulse: { width: 7, height: 7, borderRadius: '50%', background: '#ff6b35', boxShadow: '0 0 8px #ff6b35' },
  sub: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 16, color: '#8a8aa0', marginTop: 10 },
  status: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ff6b35', marginBottom: 16 },
  statusDot: { width: 5, height: 5, borderRadius: '50%', background: '#ff6b35' },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 24, fontWeight: 400, color: '#eef0f6', marginBottom: 10 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, lineHeight: 1.6, color: '#9a9ab0' },
};
