import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Heart, Cake, Gamepad2, Puzzle, Layers, Flower2, Sun, Zap, Grid3x3, Hash, Grid2x2, Radio, Sparkles, HeartHandshake, Disc3 } from 'lucide-react';
import { useLang } from '../i18n.jsx';

// Three groups: mini-games (self-contained, playable now), "surprise me"
// (playful little delights — a compatibility score, a wheel, a compliment) and
// surprises to send (heartfelt pages you share with a friend). Each card
// carries an accent color.
const GAMES = [
  { key: 'reaction', path: '/fun/reaction', icon: Zap, color: '#00e5a0' },
  { key: 'memory', path: '/fun/memory', icon: Grid3x3, color: '#00d4ff' },
  { key: 'tictactoe', path: '/fun/tictactoe', icon: Hash, color: '#ff6b35' },
  { key: 'game2048', path: '/fun/2048', icon: Grid2x2, color: '#9d6bff' },
  { key: 'simon', path: '/fun/simon', icon: Radio, color: '#2ee6b6' },
  { key: 'hangman', path: '/fun/hangman', icon: Gamepad2, color: '#ffd166' },
  { key: 'puzzle', path: '/fun/puzzle', icon: Puzzle, color: '#4d96ff' },
  { key: 'hanoi', path: '/fun/hanoi', icon: Layers, color: '#f472b6' },
];
const SURPRISE_ME = [
  { key: 'lovemeter', path: '/fun/lovemeter', icon: HeartHandshake, color: '#ff4d6d' },
  { key: 'wheel', path: '/fun/wheel', icon: Disc3, color: '#9d6bff' },
  { key: 'compliments', path: '/fun/compliments', icon: Sparkles, color: '#ffd166' },
];
const SURPRISES = [
  { key: 'sorry', path: '/fun/sorry', icon: Heart, color: '#ff4d6d' },
  { key: 'mothersday', path: '/fun/mothersday', icon: Flower2, color: '#f472b6' },
  { key: 'goout', path: '/fun/goout', icon: Sun, color: '#ffd166' },
  { key: 'birthday', path: '/fun/birthday', icon: Cake, color: '#00d4ff' },
];

const TITLES = {
  lovemeter: 'funLoveTitle', wheel: 'funWheelTitle',
  reaction: 'funReactionTitle', memory: 'funMemoryTitle', tictactoe: 'funTttTitle',
  game2048: 'funGame2048Title', simon: 'funSimonTitle', hangman: 'funHangmanTitle',
  puzzle: 'funPuzzleTitle', hanoi: 'funHanoiTitle', sorry: 'funSorryTitle',
  mothersday: 'funMothersDayTitle', goout: 'funGoOutTitle', birthday: 'funBirthdayTitle',
  compliments: 'funComplimentsTitle',
};
const DESCS = {
  lovemeter: 'funLoveDesc', wheel: 'funWheelDesc',
  reaction: 'funReactionDesc', memory: 'funMemoryDesc', tictactoe: 'funTttDesc',
  game2048: 'funGame2048Desc', simon: 'funSimonDesc', hangman: 'funHangmanDesc',
  puzzle: 'funPuzzleDesc', hanoi: 'funHanoiDesc', sorry: 'funSorryDesc',
  mothersday: 'funMothersDayDesc', goout: 'funGoOutDesc', birthday: 'funBirthdayDesc',
  compliments: 'funComplimentsDesc',
};

function Card({ c, t }) {
  const Icon = c.icon;
  return (
    <Link
      to={c.path}
      style={s.card}
      className="fun-card"
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${c.color}66`; e.currentTarget.style.boxShadow = `0 0 26px ${c.color}22`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a2e'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
    >
      <div style={s.cardTop}>
        <span style={{ ...s.iconWrap, borderColor: `${c.color}33`, background: `${c.color}12` }}>
          <Icon size={22} strokeWidth={1.4} style={{ color: c.color }} />
        </span>
        <ArrowUpRight size={16} strokeWidth={1.2} style={{ color: '#4a4a60' }} />
      </div>
      <h3 style={s.cardTitle}>{t(TITLES[c.key])}</h3>
      <p style={s.cardDesc}>{t(DESCS[c.key])}</p>
    </Link>
  );
}

export default function FunHub() {
  const { t } = useLang();

  return (
    <div style={s.container}>
      <style>{`
        .fun-card { transition: transform 0.35s cubic-bezier(0.2,0.8,0.2,1), border-color 0.35s, box-shadow 0.35s; }
        .fun-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 780px) { .fun-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 520px) { .fun-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('funBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('funLabel')}</h1>
        <p style={s.desc}>{t('funSub')}</p>
      </div>

      <div style={s.sectionLabel}><Gamepad2 size={13} strokeWidth={1.6} style={{ color: '#00d4ff' }} /> {t('funGamesLabel')}</div>
      <div className="fun-grid" style={s.grid}>
        {GAMES.map((c) => <Card key={c.key} c={c} t={t} />)}
      </div>

      <div style={{ ...s.sectionLabel, marginTop: 56 }}><Sparkles size={13} strokeWidth={1.6} style={{ color: '#9d6bff' }} /> {t('funSurpriseMeLabel')}</div>
      <div className="fun-grid" style={s.grid}>
        {SURPRISE_ME.map((c) => <Card key={c.key} c={c} t={t} />)}
      </div>

      <div style={{ ...s.sectionLabel, marginTop: 56 }}><Heart size={13} strokeWidth={1.6} style={{ color: '#ff4d6d' }} /> {t('funSurprisesLabel')}</div>
      <div className="fun-grid" style={s.grid}>
        {SURPRISES.map((c) => <Card key={c.key} c={c} t={t} />)}
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 960, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#5a5a70', marginBottom: 60, cursor: 'pointer' },
  header: { marginBottom: 56 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#e0e0e8', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#8a8aa0', maxWidth: 560 },
  sectionLabel: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6a6a82', marginBottom: 22 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 },
  card: { padding: 24, background: '#0f0f1a', border: '1px solid #1a1a2e', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  iconWrap: { width: 42, height: 42, borderRadius: 10, border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 23, fontWeight: 400, color: '#e0e0e8', lineHeight: 1.2 },
  cardDesc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 13.5, lineHeight: 1.55, color: '#7a7a92' },
};
