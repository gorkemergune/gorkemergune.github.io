import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, Cake, Gamepad2, Puzzle, Layers, Flower2, Sun, Zap, Grid3x3, Hash, Grid2x2, Radio, Sparkles, HeartHandshake, Disc3, Gift, Eraser, Stars, Lightbulb, Timer, Cookie, Palette, Shuffle } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { FUN_CSS } from '../components/fun/FunFrame';

// The Fun corner (Phase 8 redesign). Three shelves — mini-games, "surprise
// me" (quick delights) and surprises to send (pages you share) — each card in
// its own colour, one CTA verb per shelf, "New" on the Phase 8 additions.
// Reached only through the nav's sparkle easter egg, the mobile menu's "Fun
// corner" and ⌘K. Every experience is a lazy route.
const GAMES = [
  { key: 'reaction', path: '/fun/reaction', icon: Zap, color: '#00e5a0', t: 'funReactionTitle', d: 'funReactionDesc' },
  { key: 'memory', path: '/fun/memory', icon: Grid3x3, color: '#00f0ff', t: 'funMemoryTitle', d: 'funMemoryDesc' },
  { key: 'tictactoe', path: '/fun/tictactoe', icon: Hash, color: '#ff6b35', t: 'funTttTitle', d: 'funTttDesc' },
  { key: 'game2048', path: '/fun/2048', icon: Grid2x2, color: '#9d6bff', t: 'funGame2048Title', d: 'funGame2048Desc' },
  { key: 'simon', path: '/fun/simon', icon: Radio, color: '#2ee6b6', t: 'funSimonTitle', d: 'funSimonDesc' },
  { key: 'hangman', path: '/fun/hangman', icon: Gamepad2, color: '#ffd166', t: 'funHangmanTitle', d: 'funHangmanDesc' },
  { key: 'puzzle', path: '/fun/puzzle', icon: Puzzle, color: '#4d96ff', t: 'funPuzzleTitle', d: 'funPuzzleDesc' },
  { key: 'hanoi', path: '/fun/hanoi', icon: Layers, color: '#f472b6', t: 'funHanoiTitle', d: 'funHanoiDesc' },
];
const SURPRISE_ME = [
  { key: 'lovemeter', path: '/fun/lovemeter', icon: HeartHandshake, color: '#ff4d6d', t: 'funLoveTitle', d: 'funLoveDesc' },
  { key: 'wheel', path: '/fun/wheel', icon: Disc3, color: '#9d6bff', t: 'funWheelTitle', d: 'funWheelDesc' },
  { key: 'compliments', path: '/fun/compliments', icon: Sparkles, color: '#ffd166', t: 'funComplimentsTitle', d: 'funComplimentsDesc' },
  { key: 'lights', path: '/fun/lights', icon: Lightbulb, color: '#ffd166', t: 'funLightsTitle', d: 'funLightsDesc', isNew: true },
  { key: 'stopclock', path: '/fun/stopclock', icon: Timer, color: '#00e5a0', t: 'funStopTitle', d: 'funStopDesc', isNew: true },
  { key: 'fortune', path: '/fun/fortune', icon: Cookie, color: '#ff9f1c', t: 'funFortuneTitle', d: 'funFortuneDesc', isNew: true },
  { key: 'odd', path: '/fun/odd', icon: Palette, color: '#4d96ff', t: 'funOddTitle', d: 'funOddDesc', isNew: true },
];
const SURPRISES = [
  { key: 'sorry', path: '/fun/sorry', icon: Heart, color: '#ff4d6d', t: 'funSorryTitle', d: 'funSorryDesc' },
  { key: 'mothersday', path: '/fun/mothersday', icon: Flower2, color: '#f472b6', t: 'funMothersDayTitle', d: 'funMothersDayDesc' },
  { key: 'goout', path: '/fun/goout', icon: Sun, color: '#ffd166', t: 'funGoOutTitle', d: 'funGoOutDesc' },
  { key: 'birthday', path: '/fun/birthday', icon: Cake, color: '#00f0ff', t: 'funBirthdayTitle', d: 'funBirthdayDesc' },
  { key: 'gift', path: '/fun/gift', icon: Gift, color: '#ff9f1c', t: 'funGiftTitle', d: 'funGiftDesc', isNew: true },
  { key: 'scratch', path: '/fun/scratch', icon: Eraser, color: '#c0c7d4', t: 'funScratchTitle', d: 'funScratchDesc', isNew: true },
  { key: 'stars', path: '/fun/stars', icon: Stars, color: '#9d6bff', t: 'funStarsTitle', d: 'funStarsDesc', isNew: true },
];
const SHELVES = [
  { id: 'games', label: 'funGamesLabel', cta: 'funOpenGame', icon: Gamepad2, color: '#00f0ff', items: GAMES },
  { id: 'me', label: 'funSurpriseMeLabel', cta: 'funOpenMe', icon: Sparkles, color: '#ffd166', items: SURPRISE_ME },
  { id: 'send', label: 'funSurprisesLabel', cta: 'funOpenSend', icon: Heart, color: '#ff4d6d', items: SURPRISES },
];
const ALL = SHELVES.flatMap((s) => s.items);

export default function FunHub() {
  const { t } = useLang();
  const navigate = useNavigate();
  const random = () => navigate(ALL[Math.floor(Math.random() * ALL.length)].path);

  return (
    <div className="fun-page wide fh" style={{ '--fun-acc': '#ffd166' }}>
      <style>{FUN_CSS}{HUB_CSS}</style>
      <Link to="/" className="fun-back"><ArrowLeft size={15} strokeWidth={1.5} /> {t('funBack')}</Link>

      <header className="fh-head">
        <div className="fh-dots" aria-hidden="true">{['#00f0ff', '#ffd166', '#ff4d6d', '#9d6bff', '#00e5a0'].map((c) => <i key={c} style={{ background: c }} />)}</div>
        <h1 className="fun-title">{t('funLabel')}</h1>
        <p className="fun-sub">{t('funHubIntro')}</p>
        <div className="fun-row fh-actions">
          <button type="button" className="fun-btn" onClick={random}><Shuffle size={16} strokeWidth={1.8} /> {t('funRandom')}</button>
          <span className="fh-count"><b>{ALL.length}</b> {t('funCount')}</span>
        </div>
      </header>

      {SHELVES.map((sh) => {
        const Icon = sh.icon;
        return (
          <section key={sh.id} className="fh-shelf" aria-labelledby={`fh-${sh.id}`} style={{ '--sh': sh.color }}>
            <h2 id={`fh-${sh.id}`} className="fh-label"><Icon size={14} strokeWidth={1.7} aria-hidden="true" /> {t(sh.label)} <span>{String(sh.items.length).padStart(2, '0')}</span></h2>
            <ul className="fh-grid">
              {sh.items.map((c) => {
                const CIcon = c.icon;
                return (
                  <li key={c.key}>
                    <Link to={c.path} className="fh-card" style={{ '--c': c.color }}>
                      <span className="fh-ic" aria-hidden="true"><CIcon size={22} strokeWidth={1.5} /></span>
                      <span className="fh-txt">
                        <span className="fh-t">{t(c.t)}{c.isNew && <em className="fh-new">{t('funNew')}</em>}</span>
                        <span className="fh-d">{t(c.d)}</span>
                        <span className="fh-go">{t(sh.cta)} <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" /></span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

const HUB_CSS = `
  .fh-head { position: relative; margin-top: 36px; padding: 34px 34px 30px; border-radius: 24px; overflow: hidden; border: 1px solid #22262e;
    background: radial-gradient(50% 90% at 0% 0%, rgba(0,240,255,0.12), transparent 70%), radial-gradient(45% 90% at 100% 0%, rgba(255,77,109,0.12), transparent 70%), radial-gradient(60% 90% at 60% 120%, rgba(255,209,102,0.12), transparent 70%), linear-gradient(180deg, #13161c, #0d0f13); }
  .fh-dots { display: flex; gap: 8px; }
  .fh-dots i { width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 10px currentColor; }
  .fh-head .fun-title { margin-top: 18px; font-size: clamp(48px, 9vw, 84px); }
  .fh-actions { margin-top: 24px; gap: 16px 22px; }
  .fh-count { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #8a919d; }
  .fh-count b { font-size: 18px; color: var(--c-ink); font-weight: 500; margin-right: 4px; }
  .fh-shelf { margin-top: 56px; }
  .fh-label { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-weight: 400; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sh); margin-bottom: 18px; }
  .fh-label span { color: #5c6370; }
  .fh-label::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, color-mix(in srgb, var(--sh) 40%, transparent), transparent); }
  .fh-grid { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
  .fh-grid li { display: flex; }
  .fh-card { position: relative; display: flex; flex-direction: column; gap: 14px; width: 100%; padding: 20px 20px 18px; border-radius: 18px; color: inherit; background: linear-gradient(180deg, #13161c, #0e1015); border: 1px solid #22262e; transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s cubic-bezier(0.2,0.8,0.2,1); }
  .fh-card:hover, .fh-card:focus-visible { border-color: color-mix(in srgb, var(--c) 55%, transparent); box-shadow: 0 14px 40px color-mix(in srgb, var(--c) 14%, transparent); transform: translateY(-3px); }
  .fh-card:focus-visible { outline: 2px solid var(--c-ink); outline-offset: 3px; }
  .fh-ic { width: 46px; height: 46px; flex: none; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--c); background: color-mix(in srgb, var(--c) 12%, transparent); border: 1px solid color-mix(in srgb, var(--c) 30%, transparent); transition: transform 0.25s; }
  .fh-card:hover .fh-ic { transform: rotate(-6deg) scale(1.06); }
  .fh-txt { display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 0; }
  .fh-t { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-family: var(--font-display); font-weight: 500; font-size: 20px; color: var(--c-ink); }
  .fh-new { font-style: normal; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: #0a0c10; background: var(--c); padding: 3px 7px; border-radius: 999px; }
  .fh-d { font-family: var(--font-body); font-size: 13.5px; line-height: 1.55; color: #8f96a3; }
  .fh-go { display: inline-flex; align-items: center; gap: 6px; margin-top: auto; padding-top: 6px; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c); }
  .fh-go svg { transition: transform 0.25s; }
  .fh-card:hover .fh-go svg { transform: translateX(3px); }
  @media (prefers-reduced-motion: reduce) { .fh-card, .fh-ic, .fh-go svg { transition: none; } .fh-card:hover, .fh-card:focus-visible { transform: none; } .fh-card:hover .fh-ic { transform: none; } }
  @media (max-width: 900px) { .fh-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 600px) {
    .fh-head { padding: 24px 20px 22px; border-radius: 18px; }
    .fh-shelf { margin-top: 40px; }
    .fh-grid { grid-template-columns: 1fr; gap: 10px; }
    .fh-card { flex-direction: row; align-items: flex-start; gap: 14px; padding: 16px; border-radius: 14px; }
    .fh-ic { width: 40px; height: 40px; border-radius: 12px; }
    .fh-t { font-size: 18px; }
  }
`;
