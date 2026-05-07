import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../i18n.jsx';

const WORDS = [
  { word: 'ALGORITHM', hint: { en: 'Step-by-step problem solving', tr: 'Adim adim problem cozme' } },
  { word: 'PYTHON', hint: { en: 'A popular programming language', tr: 'Populer bir programlama dili' } },
  { word: 'DATABASE', hint: { en: 'Organized data storage', tr: 'Organize veri depolama' } },
  { word: 'FUNCTION', hint: { en: 'Reusable block of code', tr: 'Tekrar kullanilabilir kod blogu' } },
  { word: 'VARIABLE', hint: { en: 'Stores a value in memory', tr: 'Bellekte deger saklar' } },
  { word: 'BINARY', hint: { en: 'Base-2 number system', tr: 'Taban-2 sayi sistemi' } },
  { word: 'STACK', hint: { en: 'LIFO data structure', tr: 'LIFO veri yapisi' } },
  { word: 'ARRAY', hint: { en: 'Ordered collection of elements', tr: 'Siralanmis eleman koleksiyonu' } },
  { word: 'LINUX', hint: { en: 'Open-source operating system', tr: 'Acik kaynak isletim sistemi' } },
  { word: 'LOOP', hint: { en: 'Repeating code execution', tr: 'Tekrarlayan kod calistirma' } },
  { word: 'POINTER', hint: { en: 'Memory address reference', tr: 'Bellek adresi referansi' } },
  { word: 'REACT', hint: { en: 'UI library by Meta', tr: 'Meta tarafindan yapilan UI kutuphanesi' } },
  { word: 'CACHE', hint: { en: 'Fast temporary storage', tr: 'Hizli gecici depolama' } },
  { word: 'SERVER', hint: { en: 'Handles client requests', tr: 'Istemci isteklerini karsilar' } },
  { word: 'DEBUG', hint: { en: 'Finding and fixing errors', tr: 'Hatalari bulma ve duzeltme' } },
  { word: 'QUEUE', hint: { en: 'FIFO data structure', tr: 'FIFO veri yapisi' } },
  { word: 'BOOLEAN', hint: { en: 'True or false value', tr: 'Dogru veya yanlis degeri' } },
  { word: 'GITHUB', hint: { en: 'Code hosting platform', tr: 'Kod barindirma platformu' } },
  { word: 'PIXEL', hint: { en: 'Smallest screen element', tr: 'Ekranin en kucuk birimi' } },
  { word: 'CLASS', hint: { en: 'Blueprint for objects', tr: 'Nesneler icin sablon' } },
];

const MAX_WRONG = 7;

function pickRandom() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export default function HangmanPage() {
  const { t, lang } = useLang();
  const [wordObj, setWordObj] = useState(() => pickRandom());
  const [guessed, setGuessed] = useState(new Set());
  const [showHint, setShowHint] = useState(false);

  const word = wordObj.word;
  const wrong = [...guessed].filter(l => !word.includes(l));
  const remaining = MAX_WRONG - wrong.length;
  const won = word.split('').every(l => guessed.has(l));
  const lost = remaining <= 0;
  const gameOver = won || lost;

  const guess = useCallback((letter) => {
    if (gameOver || guessed.has(letter)) return;
    setGuessed(prev => new Set(prev).add(letter));
  }, [gameOver, guessed]);

  const reset = () => {
    setWordObj(pickRandom());
    setGuessed(new Set());
    setShowHint(false);
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div style={s.container}>
      <Link to="/fun" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('funBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('funBadge')}</span>
        <h1 style={s.title}>{t('hangmanPageTitle')}</h1>
        <p style={s.desc}>{t('hangmanPageSub')}</p>
      </div>

      <div style={s.game}>
        {/* Hangman figure */}
        <div style={s.figureWrap}>
          <svg width="160" height="200" viewBox="0 0 160 200" style={{ display: 'block' }}>
            {/* Base */}
            <line x1="20" y1="190" x2="100" y2="190" stroke="#8a8a86" strokeWidth="2" />
            {/* Pole */}
            <line x1="40" y1="190" x2="40" y2="20" stroke="#8a8a86" strokeWidth="2" />
            {/* Top */}
            <line x1="40" y1="20" x2="110" y2="20" stroke="#8a8a86" strokeWidth="2" />
            {/* Rope */}
            <line x1="110" y1="20" x2="110" y2="45" stroke="#8a8a86" strokeWidth="2" />
            {/* Head */}
            {wrong.length >= 1 && <circle cx="110" cy="58" r="13" stroke="#1a1a1a" strokeWidth="2" fill="none" />}
            {/* Body */}
            {wrong.length >= 2 && <line x1="110" y1="71" x2="110" y2="120" stroke="#1a1a1a" strokeWidth="2" />}
            {/* Left arm */}
            {wrong.length >= 3 && <line x1="110" y1="85" x2="85" y2="105" stroke="#1a1a1a" strokeWidth="2" />}
            {/* Right arm */}
            {wrong.length >= 4 && <line x1="110" y1="85" x2="135" y2="105" stroke="#1a1a1a" strokeWidth="2" />}
            {/* Left leg */}
            {wrong.length >= 5 && <line x1="110" y1="120" x2="88" y2="150" stroke="#1a1a1a" strokeWidth="2" />}
            {/* Right leg */}
            {wrong.length >= 6 && <line x1="110" y1="120" x2="132" y2="150" stroke="#1a1a1a" strokeWidth="2" />}
            {/* Face */}
            {wrong.length >= 7 && (
              <>
                <line x1="104" y1="54" x2="108" y2="58" stroke="#1a1a1a" strokeWidth="1.5" />
                <line x1="108" y1="54" x2="104" y2="58" stroke="#1a1a1a" strokeWidth="1.5" />
                <line x1="112" y1="54" x2="116" y2="58" stroke="#1a1a1a" strokeWidth="1.5" />
                <line x1="116" y1="54" x2="112" y2="58" stroke="#1a1a1a" strokeWidth="1.5" />
                <path d="M103 65 Q110 61 117 65" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
              </>
            )}
          </svg>
        </div>

        {/* Stats */}
        <div style={s.stats}>
          <span style={s.statItem}>
            <span style={s.statLabel}>{t('hangmanRemaining')}</span>
            <span style={{ ...s.statValue, color: remaining <= 2 ? '#ef4444' : '#1a1a1a' }}>{remaining}</span>
          </span>
        </div>

        {/* Word display */}
        <div style={s.wordRow}>
          {word.split('').map((letter, i) => (
            <div key={i} style={s.letterBox}>
              <span style={{ ...s.letter, color: lost && !guessed.has(letter) ? '#ef4444' : '#1a1a1a' }}>
                {guessed.has(letter) || gameOver ? letter : ''}
              </span>
            </div>
          ))}
        </div>

        {/* Hint */}
        <div style={s.hintArea}>
          {!showHint && !gameOver && (
            <button onClick={() => setShowHint(true)} style={s.hintBtn}>
              {t('hangmanHint')}
            </button>
          )}
          {showHint && !gameOver && (
            <p style={s.hintText}>{wordObj.hint[lang] || wordObj.hint.en}</p>
          )}
        </div>

        {/* Game over message */}
        {gameOver && (
          <div style={s.result}>
            <p style={{ ...s.resultText, color: won ? '#16a34a' : '#ef4444' }}>
              {won ? t('hangmanWon') : t('hangmanLost')}
            </p>
            {lost && (
              <p style={s.revealWord}>{t('hangmanTheWord')}: <strong>{word}</strong></p>
            )}
            <button onClick={reset} style={s.newGameBtn}>{t('hangmanNewGame')}</button>
          </div>
        )}

        {/* Keyboard */}
        {!gameOver && (
          <div style={s.keyboard}>
            {alphabet.map(letter => {
              const isGuessed = guessed.has(letter);
              const isWrong = isGuessed && !word.includes(letter);
              const isCorrect = isGuessed && word.includes(letter);
              return (
                <button
                  key={letter}
                  onClick={() => guess(letter)}
                  disabled={isGuessed}
                  style={{
                    ...s.key,
                    background: isCorrect ? '#1a1a1a' : isWrong ? '#fafaf6' : '#fafaf6',
                    color: isCorrect ? '#f4f3ef' : isWrong ? '#c9c7c0' : '#1a1a1a',
                    borderColor: isCorrect ? '#1a1a1a' : isWrong ? '#e2e0da' : '#d6d4cd',
                    cursor: isGuessed ? 'default' : 'pointer',
                    textDecoration: isWrong ? 'line-through' : 'none',
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        )}

        {/* Used letters */}
        {wrong.length > 0 && !gameOver && (
          <div style={s.usedArea}>
            <span style={s.usedLabel}>{t('hangmanUsed')}: </span>
            <span style={s.usedLetters}>{wrong.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6b6a66', marginBottom: 60, cursor: 'pointer' },
  header: { marginBottom: 60 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#1a1a1a', marginTop: 20, marginBottom: 12 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#4a4a48' },
  game: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  figureWrap: { marginBottom: 32, padding: 20, background: '#fafaf6', border: '1px solid #e2e0da', borderRadius: 8 },
  stats: { marginBottom: 28 },
  statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  statLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a8a86' },
  statValue: { fontFamily: "'Instrument Serif', serif", fontSize: 28, fontWeight: 400 },
  wordRow: { display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' },
  letterBox: {
    width: 40, height: 48, borderBottom: '2px solid #1a1a1a',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  letter: { fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 500 },
  hintArea: { marginBottom: 24, minHeight: 36 },
  hintBtn: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.06em',
    padding: '8px 20px', border: '1px solid #d6d4cd', borderRadius: 4,
    background: 'transparent', color: '#6b6a66', cursor: 'pointer',
  },
  hintText: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, color: '#6b6a66', fontStyle: 'italic' },
  result: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 24 },
  resultText: { fontFamily: "'Instrument Serif', serif", fontSize: 36, fontWeight: 400 },
  revealWord: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, color: '#4a4a48' },
  newGameBtn: {
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, fontWeight: 600,
    padding: '12px 32px', background: '#1a1a1a', color: '#f4f3ef',
    border: 'none', borderRadius: 6, cursor: 'pointer', marginTop: 8,
  },
  keyboard: { display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 460, marginBottom: 24 },
  key: {
    width: 38, height: 42, borderRadius: 4, border: '1px solid #d6d4cd',
    fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 500,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  },
  usedArea: { marginTop: 8 },
  usedLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a8a86' },
  usedLetters: { fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#ef4444', letterSpacing: '0.1em' },
};
