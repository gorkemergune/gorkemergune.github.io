import { useState, useCallback } from 'react';
import { useLang } from '../i18n.jsx';
import { FunHeader, FUN_CSS } from '../components/fun/FunFrame';

const WORDS = [
  { word: 'ALGORITHM', hint: { en: 'Step-by-step problem solving', tr: 'Adım adım problem çözme' } },
  { word: 'PYTHON', hint: { en: 'A popular programming language', tr: 'Popüler bir programlama dili' } },
  { word: 'DATABASE', hint: { en: 'Organized data storage', tr: 'Düzenli veri depolama' } },
  { word: 'FUNCTION', hint: { en: 'Reusable block of code', tr: 'Yeniden kullanılabilir kod bloğu' } },
  { word: 'VARIABLE', hint: { en: 'Stores a value in memory', tr: 'Bellekte değer saklar' } },
  { word: 'BINARY', hint: { en: 'Base-2 number system', tr: 'İkilik sayı sistemi' } },
  { word: 'STACK', hint: { en: 'LIFO data structure', tr: 'LIFO veri yapısı' } },
  { word: 'ARRAY', hint: { en: 'Ordered collection of elements', tr: 'Sıralı eleman koleksiyonu' } },
  { word: 'LINUX', hint: { en: 'Open-source operating system', tr: 'Açık kaynaklı işletim sistemi' } },
  { word: 'LOOP', hint: { en: 'Repeating code execution', tr: 'Kodu tekrar tekrar çalıştırır' } },
  { word: 'POINTER', hint: { en: 'Memory address reference', tr: 'Bellek adresi referansı' } },
  { word: 'REACT', hint: { en: 'UI library by Meta', tr: 'Meta’nın geliştirdiği arayüz kütüphanesi' } },
  { word: 'CACHE', hint: { en: 'Fast temporary storage', tr: 'Hızlı geçici depolama' } },
  { word: 'SERVER', hint: { en: 'Handles client requests', tr: 'İstemci isteklerini karşılar' } },
  { word: 'DEBUG', hint: { en: 'Finding and fixing errors', tr: 'Hataları bulup düzeltme' } },
  { word: 'QUEUE', hint: { en: 'FIFO data structure', tr: 'FIFO veri yapısı' } },
  { word: 'BOOLEAN', hint: { en: 'True or false value', tr: 'Doğru ya da yanlış değeri' } },
  { word: 'GITHUB', hint: { en: 'Code hosting platform', tr: 'Kod barındırma platformu' } },
  { word: 'PIXEL', hint: { en: 'Smallest screen element', tr: 'Ekranın en küçük birimi' } },
  { word: 'CLASS', hint: { en: 'Blueprint for objects', tr: 'Nesneler için şablon' } },
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
    <div className="fun-page" style={{ maxWidth: s.container.maxWidth, '--fun-acc': '#ffd166' }}>
      <style>{FUN_CSS}</style>
      <FunHeader kind="game" accent="#ffd166" title={t('hangmanPageTitle')} sub={t('hangmanPageSub')}></FunHeader>

      <div style={s.game}>
        {/* Hangman figure */}
        <div style={s.figureWrap}>
          <svg width="160" height="200" viewBox="0 0 160 200" style={{ display: 'block' }}>
            {/* Base */}
            <line x1="20" y1="190" x2="100" y2="190" stroke="#7b8290" strokeWidth="2" />
            {/* Pole */}
            <line x1="40" y1="190" x2="40" y2="20" stroke="#7b8290" strokeWidth="2" />
            {/* Top */}
            <line x1="40" y1="20" x2="110" y2="20" stroke="#7b8290" strokeWidth="2" />
            {/* Rope */}
            <line x1="110" y1="20" x2="110" y2="45" stroke="#7b8290" strokeWidth="2" />
            {/* Head */}
            {wrong.length >= 1 && <circle cx="110" cy="58" r="13" stroke="#eef0f4" strokeWidth="2" fill="none" />}
            {/* Body */}
            {wrong.length >= 2 && <line x1="110" y1="71" x2="110" y2="120" stroke="#eef0f4" strokeWidth="2" />}
            {/* Left arm */}
            {wrong.length >= 3 && <line x1="110" y1="85" x2="85" y2="105" stroke="#eef0f4" strokeWidth="2" />}
            {/* Right arm */}
            {wrong.length >= 4 && <line x1="110" y1="85" x2="135" y2="105" stroke="#eef0f4" strokeWidth="2" />}
            {/* Left leg */}
            {wrong.length >= 5 && <line x1="110" y1="120" x2="88" y2="150" stroke="#eef0f4" strokeWidth="2" />}
            {/* Right leg */}
            {wrong.length >= 6 && <line x1="110" y1="120" x2="132" y2="150" stroke="#eef0f4" strokeWidth="2" />}
            {/* Face */}
            {wrong.length >= 7 && (
              <>
                <line x1="104" y1="54" x2="108" y2="58" stroke="#eef0f4" strokeWidth="1.5" />
                <line x1="108" y1="54" x2="104" y2="58" stroke="#eef0f4" strokeWidth="1.5" />
                <line x1="112" y1="54" x2="116" y2="58" stroke="#eef0f4" strokeWidth="1.5" />
                <line x1="116" y1="54" x2="112" y2="58" stroke="#eef0f4" strokeWidth="1.5" />
                <path d="M103 65 Q110 61 117 65" stroke="#eef0f4" strokeWidth="1.5" fill="none" />
              </>
            )}
          </svg>
        </div>

        {/* Stats */}
        <div style={s.stats}>
          <span style={s.statItem}>
            <span style={s.statLabel}>{t('hangmanRemaining')}</span>
            <span style={{ ...s.statValue, color: remaining <= 2 ? '#ef4444' : '#eef0f4' }}>{remaining}</span>
          </span>
        </div>

        {/* Word display */}
        <div style={s.wordRow}>
          {word.split('').map((letter, i) => (
            <div key={i} style={s.letterBox}>
              <span style={{ ...s.letter, color: lost && !guessed.has(letter) ? '#ef4444' : '#eef0f4' }}>
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
                    background: isCorrect ? '#eef0f4' : isWrong ? '#111419' : '#111419',
                    color: isCorrect ? '#14171d' : isWrong ? '#3a404c' : '#eef0f4',
                    borderColor: isCorrect ? '#eef0f4' : isWrong ? '#1e222b' : '#2c313c',
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
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: '0.06em', color: '#8a919d', marginBottom: 60, cursor: 'pointer' },
  header: { marginBottom: 60 },
  title: { fontFamily: "var(--font-display)", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#eef0f4', marginTop: 20, marginBottom: 12 },
  desc: { fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.6, color: '#b4bac5' },
  game: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  figureWrap: { marginBottom: 32, padding: 20, background: '#111419', border: '1px solid #1e222b', borderRadius: 8 },
  stats: { marginBottom: 28 },
  statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  statLabel: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7b8290' },
  statValue: { fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400 },
  wordRow: { display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' },
  letterBox: {
    width: 40, height: 48, borderBottom: '2px solid #eef0f4',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  letter: { fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 500 },
  hintArea: { marginBottom: 24, minHeight: 36 },
  hintBtn: {
    fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.06em',
    padding: '8px 20px', border: '1px solid #2c313c', borderRadius: 4,
    background: 'transparent', color: '#8a919d', cursor: 'pointer',
  },
  hintText: { fontFamily: "var(--font-body)", fontSize: 15, color: '#8a919d', fontStyle: 'italic' },
  result: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 24 },
  resultText: { fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 400 },
  revealWord: { fontFamily: "var(--font-body)", fontSize: 16, color: '#b4bac5' },
  newGameBtn: {
    fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600,
    padding: '12px 32px', background: '#eef0f4', color: '#14171d',
    border: 'none', borderRadius: 6, cursor: 'pointer', marginTop: 8,
  },
  keyboard: { display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 460, marginBottom: 24 },
  key: {
    width: 38, height: 42, borderRadius: 4, border: '1px solid #2c313c',
    fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 500,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  },
  usedArea: { marginTop: 8 },
  usedLabel: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7b8290' },
  usedLetters: { fontFamily: "var(--font-mono)", fontSize: 13, color: '#ef4444', letterSpacing: '0.1em' },
};
