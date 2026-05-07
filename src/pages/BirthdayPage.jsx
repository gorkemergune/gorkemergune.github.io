import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n.jsx';

const cakeColors = ['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#74c0fc', '#b197fc', '#f783ac'];

export default function BirthdayPage() {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [created, setCreated] = useState(false);
  const cakeRef = useRef(null);

  const ageNum = parseInt(age, 10);
  const valid = name.trim() && ageNum > 0 && ageNum <= 150;

  const handleCreate = () => {
    if (valid) setCreated(true);
  };

  const handleShare = async () => {
    const text = `🎂 ${t('bdayHappy')}, ${name.trim()}! (${ageNum}) — ${t('bdayWish')}`;
    if (navigator.share) {
      try { await navigator.share({ title: t('bdayHappy'), text }); }
      catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      alert('Copied!');
    }
  };

  const handleReset = () => {
    setCreated(false);
    setName('');
    setAge('');
  };

  const candleRows = [];
  if (created) {
    const total = Math.min(ageNum, 30);
    const perRow = Math.min(total, 10);
    let remaining = total;
    const rows = [];
    while (remaining > 0) {
      const count = Math.min(remaining, perRow);
      rows.push(count);
      remaining -= count;
    }
    // Reverse so partial row is on top, full rows on bottom (near cake)
    rows.reverse();
    candleRows.push(...rows);
  }

  if (created) {
    return (
      <div style={s.container}>
        <Link to="/fun" className="link-hover" style={s.back}>
          <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
        </Link>
        <div style={s.center} ref={cakeRef}>
          <p style={s.sparkle}>✨🎉🥳🎊✨</p>
          <h1 style={s.celebTitle}>{t('bdayHappy')},</h1>
          <h1 style={s.celebName}>{name.trim()}!</h1>

          {/* Cake */}
          <div style={s.cake}>
            {/* Candles */}
            <div style={s.candleArea}>
              {candleRows.map((count, ri) => (
                <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                  {Array.from({ length: count }).map((_, ci) => (
                    <div key={ci} style={s.candleWrap}>
                      <div style={s.flame}>🔥</div>
                      <div style={{ ...s.candle, background: cakeColors[(ri * 10 + ci) % cakeColors.length] }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Cake top */}
            <div style={s.cakeTop}>
              <div style={s.icingDrip} />
            </div>
            {/* Cake body */}
            <div style={s.cakeMiddle} />
            <div style={s.cakeBottom} />
            {/* Plate */}
            <div style={s.plate} />
          </div>

          <p style={s.ageLabel}>{ageNum} {t('bdayCandles')} 🎂</p>
          <p style={s.wish}>{t('bdayWish')}</p>

          <div style={s.btnRow}>
            <button onClick={handleShare} style={s.shareBtn}>
              {t('bdayShare')}
            </button>
            <button onClick={handleReset} style={s.resetBtn}>
              {t('bdayReset')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.container}>
      <Link to="/fun" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>
      <div style={s.center}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎂</div>
        <h1 style={s.title}>{t('bdayPageTitle')}</h1>

        <div style={s.form}>
          <div style={s.field}>
            <label style={s.label}>{t('bdayNameLabel')}</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t('bdayNamePlaceholder')}
              style={s.input}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>{t('bdayAgeLabel')}</label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder={t('bdayAgePlaceholder')}
              min="1"
              max="150"
              style={s.input}
            />
          </div>
          <button onClick={handleCreate} disabled={!valid} style={{ ...s.createBtn, opacity: valid ? 1 : 0.4 }}>
            {t('bdayCreate')}
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6b6a66', marginBottom: 60, cursor: 'pointer' },
  center: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: '-0.015em', color: '#1a1a1a', marginBottom: 40 },
  form: { display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 360 },
  field: { display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left' },
  label: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a8a86' },
  input: {
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, padding: '12px 16px',
    border: '1px solid #d6d4cd', borderRadius: 4, background: '#fafaf6', color: '#1a1a1a',
    outline: 'none',
  },
  createBtn: {
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, fontWeight: 600,
    padding: '14px 32px', background: '#1a1a1a', color: '#f4f3ef',
    border: 'none', borderRadius: 6, cursor: 'pointer', marginTop: 8,
    transition: 'opacity 0.3s',
  },
  sparkle: { fontSize: 28, letterSpacing: 8, marginBottom: 12 },
  celebTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 48, fontWeight: 400, color: '#1a1a1a', lineHeight: 1.1 },
  celebName: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 64, fontWeight: 400, color: '#1a1a1a', marginBottom: 32, lineHeight: 1.1 },
  cake: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 },
  candleArea: { display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 },
  candleWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  flame: { fontSize: 14, lineHeight: 1, marginBottom: -2 },
  candle: { width: 6, height: 28, borderRadius: 2 },
  cakeTop: { width: 220, height: 20, background: '#f783ac', borderRadius: '8px 8px 0 0', position: 'relative', overflow: 'hidden' },
  icingDrip: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 8, background: 'rgba(255,255,255,0.35)', borderRadius: '0 0 4px 4px' },
  cakeMiddle: { width: 240, height: 50, background: '#ffa94d', borderLeft: '2px solid #e09040', borderRight: '2px solid #e09040' },
  cakeBottom: { width: 260, height: 50, background: '#ff6b6b', borderRadius: '0 0 12px 12px', borderLeft: '2px solid #e05555', borderRight: '2px solid #e05555', borderBottom: '2px solid #e05555' },
  plate: { width: 300, height: 12, background: '#e2e0da', borderRadius: '0 0 50% 50%', marginTop: 2 },
  ageLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#6b6a66', letterSpacing: '0.06em', marginBottom: 8 },
  wish: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 20, color: '#4a4a48', marginBottom: 32 },
  btnRow: { display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' },
  shareBtn: {
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, fontWeight: 600,
    padding: '12px 32px', background: '#1a1a1a', color: '#f4f3ef',
    border: 'none', borderRadius: 6, cursor: 'pointer',
  },
  resetBtn: {
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, fontWeight: 500,
    padding: '12px 28px', background: 'transparent', color: '#4a4a48',
    border: '1px solid #d6d4cd', borderRadius: 6, cursor: 'pointer',
  },
};
