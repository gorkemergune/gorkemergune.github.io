import { useEffect, useState } from 'react';
import { Activity, Cake } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { BIRTHDAY } from '../config';

const birthDate = new Date(BIRTHDAY.year, BIRTHDAY.month - 1, BIRTHDAY.day, 0, 0, 0);
const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000; // average Gregorian year

// Live fractional age in years, e.g. 20.934384
const decimalAge = (now) => ((now.getTime() - birthDate.getTime()) / YEAR_MS).toFixed(6);

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
    const id = setInterval(() => setNow(new Date()), 60);
    return () => clearInterval(id);
  }, []);

  const cd = countdown(now);
  const pad = (n) => String(n).padStart(2, '0');
  const age = decimalAge(now);

  const cdUnits = [
    { v: cd.d, label: t('unitDays') },
    { v: pad(cd.h), label: t('unitHours') },
    { v: pad(cd.mi), label: t('unitMinutes') },
    { v: pad(cd.s), label: t('unitSeconds') },
  ];

  return (
    <div className="ds-block" aria-label={t('lifeKicker')}>
      <style>{`
        .ls-grid { grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); }
        .ls-head { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .ls-head span:first-child { display: inline-flex; align-items: center; gap: 8px; color: #c6cdd8; }
        .ls-age { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; margin-top: 18px; }
        .ls-age-n { font-family: var(--font-mono); font-size: 40px; line-height: 1; color: var(--ds-ink); font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
        .ls-units { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 18px; }
        .ls-units div + div { border-left: 1px solid var(--ds-line-soft); }
        .ls-units div { padding: 0 10px; }
        .ls-units div:first-child { padding-left: 0; }
        .ls-num { font-family: var(--font-mono); font-size: 28px; line-height: 1; color: var(--ds-ink); font-variant-numeric: tabular-nums; }
        .ls-units .ds-meta { display: block; margin-top: 8px; font-size: 9px; }
        @media (max-width: 820px) { .ls-grid { grid-template-columns: 1fr; } }
        @media (max-width: 400px) { .ls-age-n { font-size: 32px; } .ls-num { font-size: 22px; } }
      `}</style>
      <div className="ds-subhead"><span className="ds-meta">{t('lifeKicker')}</span></div>
      <div className="ds-cells ls-grid">
        <div className="ds-cell">
          <div className="ls-head ds-meta">
            <span><Activity size={12} strokeWidth={1.6} /> {t('ageLabel')}</span>
            <span>{t('ageCaption')}</span>
          </div>
          <div className="ls-age">
            <span className="ls-age-n">{age}</span>
            <span className="ds-meta">{t('unitYears')}</span>
          </div>
        </div>
        <div className="ds-cell">
          <div className="ls-head ds-meta">
            <span><Cake size={12} strokeWidth={1.6} /> {t('countdownLabel')}</span>
            <span>{t('countdownCaption')}</span>
          </div>
          <div className="ls-units">
            {cdUnits.map((u) => (
              <div key={u.label}>
                <span className="ls-num">{u.v}</span>
                <span className="ds-meta">{u.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
