import { useEffect, useState } from 'react';
import { Activity, Cake } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { BIRTHDAY } from '../config';

const birthDate = new Date(BIRTHDAY.year, BIRTHDAY.month - 1, BIRTHDAY.day, 0, 0, 0);

function ageBreakdown(now) {
  let y = now.getFullYear() - birthDate.getFullYear();
  let mo = now.getMonth() - birthDate.getMonth();
  let d = now.getDate() - birthDate.getDate();
  let h = now.getHours() - birthDate.getHours();
  let mi = now.getMinutes() - birthDate.getMinutes();
  let s = now.getSeconds() - birthDate.getSeconds();
  if (s < 0) { s += 60; mi--; }
  if (mi < 0) { mi += 60; h--; }
  if (h < 0) { h += 24; d--; }
  if (d < 0) { d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); mo--; }
  if (mo < 0) { mo += 12; y--; }
  return { y, mo, d, h, mi, s };
}

function countdown(now) {
  let next = new Date(now.getFullYear(), BIRTHDAY.month - 1, BIRTHDAY.day, 0, 0, 0);
  if (next.getTime() <= now.getTime()) next = new Date(now.getFullYear() + 1, BIRTHDAY.month - 1, BIRTHDAY.day, 0, 0, 0);
  const ms = next - now;
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor(ms / 3600000) % 24,
    mi: Math.floor(ms / 60000) % 60,
    s: Math.floor(ms / 1000) % 60,
  };
}

export default function LiveStatus() {
  const { t } = useLang();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const age = ageBreakdown(now);
  const cd = countdown(now);
  const pad = (n) => String(n).padStart(2, '0');

  const ageUnits = [
    { v: age.y, label: t('unitYears') },
    { v: age.mo, label: t('unitMonths') },
    { v: age.d, label: t('unitDays') },
    { v: pad(age.h), label: t('unitHours') },
    { v: pad(age.mi), label: t('unitMinutes') },
    { v: pad(age.s), label: t('unitSeconds') },
  ];
  const cdUnits = [
    { v: cd.d, label: t('unitDays') },
    { v: pad(cd.h), label: t('unitHours') },
    { v: pad(cd.mi), label: t('unitMinutes') },
    { v: pad(cd.s), label: t('unitSeconds') },
  ];

  return (
    <section className="container" style={s.section} aria-label="Live status">
      <style>{`
        .ls-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; }
        .ls-card { position: relative; overflow: hidden; border: 1px solid #1a1a2e; border-radius: 14px; background: linear-gradient(180deg,#0f0f1a,#0b0b13); padding: 26px 28px; }
        @keyframes ls-sweep { 0% { transform: translateX(-120%); } 100% { transform: translateX(360%); } }
        .ls-card::after { content:''; position:absolute; top:0; left:0; width:30%; height:2px; background: linear-gradient(90deg, transparent, var(--acc), transparent); animation: ls-sweep 5s linear infinite; }
        @keyframes ls-blink { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
        .ls-live { animation: ls-blink 1.6s ease-in-out infinite; }
        .ls-units { display: flex; flex-wrap: wrap; gap: 10px; }
        .ls-seg { flex: 1; min-width: 62px; text-align: center; padding: 14px 6px; background: rgba(0,0,0,0.25); border: 1px solid #17172400; border-radius: 10px; }
        @media (max-width: 820px) { .ls-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={s.kicker}><span className="ls-live" style={s.kickerDot} />{t('lifeKicker')}</div>

      <div className="ls-grid" style={{ marginTop: 24 }}>
        {/* AGE */}
        <div className="ls-card" style={{ '--acc': '#00d4ff' }}>
          <div style={s.head}>
            <span style={{ ...s.headLabel, color: '#00d4ff' }}><Activity size={13} strokeWidth={1.8} /> {t('ageLabel')}</span>
            <span style={s.caption}>{t('ageCaption')}</span>
          </div>
          <div className="ls-units">
            {ageUnits.map((u, i) => (
              <div key={i} className="ls-seg">
                <div style={{ ...s.num, color: '#eaf6ff' }}>{u.v}</div>
                <div style={s.unit}>{u.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* COUNTDOWN */}
        <div className="ls-card" style={{ '--acc': '#ff6b35' }}>
          <div style={s.head}>
            <span style={{ ...s.headLabel, color: '#ff6b35' }}><Cake size={13} strokeWidth={1.8} /> {t('countdownLabel')}</span>
            <span style={s.caption}>{t('countdownCaption')}</span>
          </div>
          <div className="ls-units">
            {cdUnits.map((u, i) => (
              <div key={i} className="ls-seg">
                <div style={{ ...s.num, color: '#ffd9c7' }}>{u.v}</div>
                <div style={s.unit}>{u.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const s = {
  section: { maxWidth: 1400, margin: '0 auto', padding: '20px 48px 80px', position: 'relative', zIndex: 2 },
  kicker: { display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', color: '#6a6a82' },
  kickerDot: { width: 7, height: 7, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' },
  headLabel: { display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.14em' },
  caption: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.06em', color: '#6a6a82' },
  num: { fontFamily: "'JetBrains Mono', monospace", fontSize: 30, fontWeight: 500, lineHeight: 1, fontVariantNumeric: 'tabular-nums' },
  unit: { fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7a7a92', marginTop: 8 },
};
