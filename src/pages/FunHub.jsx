import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Heart, Cake, Gamepad2, Puzzle, Layers } from 'lucide-react';
import { useLang } from '../i18n.jsx';

const cards = [
  { key: 'sorry', path: '/fun/sorry', icon: Heart },
  { key: 'birthday', path: '/fun/birthday', icon: Cake },
  { key: 'hangman', path: '/fun/hangman', icon: Gamepad2 },
  { key: 'puzzle', path: '/fun/puzzle', icon: Puzzle },
  { key: 'hanoi', path: '/fun/hanoi', icon: Layers },
];

export default function FunHub() {
  const { t } = useLang();

  const titles = {
    sorry: t('funSorryTitle'),
    birthday: t('funBirthdayTitle'),
    hangman: t('funHangmanTitle'),
    puzzle: t('funPuzzleTitle'),
    hanoi: t('funHanoiTitle'),
  };
  const descs = {
    sorry: t('funSorryDesc'),
    birthday: t('funBirthdayDesc'),
    hangman: t('funHangmanDesc'),
    puzzle: t('funPuzzleDesc'),
    hanoi: t('funHanoiDesc'),
  };

  return (
    <div style={s.container}>
      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('funBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('funLabel')}</h1>
        <p style={s.desc}>{t('funSub')}</p>
      </div>

      <div className="blog-grid" style={s.grid}>
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.key} to={c.path} style={s.card} className="row-hover">
              <div style={s.cardTop}>
                <Icon size={28} strokeWidth={1.3} style={{ color: '#6b6a66' }} />
                <ArrowUpRight size={16} strokeWidth={1.2} style={{ color: '#9a9994' }} />
              </div>
              <h3 style={s.cardTitle}>{titles[c.key]}</h3>
              <p style={s.cardDesc}>{descs[c.key]}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6b6a66', marginBottom: 60, cursor: 'pointer' },
  header: { marginBottom: 80 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#1a1a1a', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#4a4a48', maxWidth: 560 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 },
  card: {
    padding: 28, background: '#fafaf6', border: '1px solid #e2e0da', borderRadius: 4,
    display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer',
    transition: 'transform 0.4s, border-color 0.4s',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 24, fontWeight: 400, color: '#1a1a1a', lineHeight: 1.2 },
  cardDesc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, lineHeight: 1.6, color: '#6b6a66' },
};
