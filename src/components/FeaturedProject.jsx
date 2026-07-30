import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText, Trophy } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { getProject } from '../data/projects';

const FEATURED_SLUG = 'mihenk-benchmark';

// Compact leaderboard shown on the featured card. Mirrors mihenk-benchmark's
// full-set table; `mine` flags the two models that are my own fine-tunes.
const BOARD = [
  { rank: '🥇', model: 'gemma4:12b', note: 'Ollama · 12B', score: '97.6%' },
  { rank: '🥈', model: 'claude-haiku-4.5', note: 'OpenRouter', score: '92.1%' },
  { rank: '🥉', model: 'gemma-4-E4B-it', note: 'base · local', score: '76.6%' },
  { rank: '5', model: 'ayarlicazhocam', note: 'my Gemma-4 finetune · v2', score: '73.4%', mine: true },
  { rank: '11', model: 'ayarlicazhocam', note: 'my Llama-3.2 finetune · v1', score: '43.2%', mine: true },
];

export default function FeaturedProject() {
  const { lang, t } = useLang();
  const p = getProject(FEATURED_SLUG);
  if (!p) return null;
  const loc = (en, tr) => (lang === 'tr' && tr ? tr : en);

  return (
    <section className="container" style={s.section} aria-label="Featured project">
      <style>{`
        .fp-card { display: grid; grid-template-columns: 1fr 1.15fr; gap: 0; border: 1px solid #1a1a2e; border-radius: 14px; overflow: hidden; background: linear-gradient(180deg,#0f0f1a,#0b0b13); transition: border-color 0.4s, box-shadow 0.4s; }
        .fp-card:hover { border-color: ${p.color}66; box-shadow: 0 0 40px ${p.glow}; }
        .fp-media { position: relative; overflow: hidden; background: #080810; min-height: 300px; }
        .fp-media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.2,0.8,0.2,1); }
        .fp-card:hover .fp-media img { transform: scale(1.04); }
        .fp-lb-row { transition: background 0.3s, border-color 0.3s; }
        .fp-lb-row:hover { background: ${p.color}12; }
        @media (max-width: 820px) { .fp-card { grid-template-columns: 1fr !important; } .fp-media { min-height: 200px; } }
      `}</style>

      <div style={s.kicker}><span style={{ ...s.kickerDot, background: p.color, boxShadow: `0 0 8px ${p.glow}` }} />{t('featuredKicker')}</div>

      <div className="fp-card" style={{ marginTop: 24 }}>
        <div className="fp-media">
          <img src={p.cover || p.images[0].src} alt={p.title} loading="lazy" />
        </div>
        <div style={s.body}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ ...s.markChip, color: p.color, borderColor: `${p.color}55` }}>{p.mark}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.16em', color: '#8a8aa0' }}>{p.codename.toUpperCase()}</span>
          </div>
          <h3 style={s.title}>{p.title}</h3>
          <p style={s.desc}>{loc(p.oneLiner, p.oneLinerTr)}</p>

          {/* mini leaderboard */}
          <div style={s.lbWrap}>
            <div style={s.lbHead}>
              <Trophy size={11} strokeWidth={1.8} style={{ color: p.color }} />
              <span>{t('featuredLbTitle')}</span>
              <span style={{ marginLeft: 'auto', color: '#5a5a70' }}>{t('featuredLbNote')}</span>
            </div>
            <div style={s.lbTable}>
              {BOARD.map((r, i) => (
                <div
                  key={i}
                  className="fp-lb-row"
                  style={{
                    ...s.lbRow,
                    borderColor: r.mine ? `${p.color}44` : 'transparent',
                    background: r.mine ? `${p.color}0d` : 'transparent',
                  }}
                >
                  <span style={s.lbRank}>{r.rank}</span>
                  <span style={{ ...s.lbModel, color: r.mine ? p.color : '#e4e4f0', fontWeight: r.mine ? 600 : 400 }}>
                    {r.model}
                    {r.mine && <span style={s.lbMine}>{loc('mine', 'benim')}</span>}
                  </span>
                  <span style={s.lbNote}>{r.note}</span>
                  <span style={{ ...s.lbScore, color: r.mine ? p.color : '#c4c4d4' }}>{r.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={s.ctaRow}>
            <Link to={`/project/${p.slug}/case-study`} className="hero-btn" style={{ borderColor: `${p.color}66` }}>
              <FileText size={15} strokeWidth={1.5} /> {t('featuredCta')}
            </Link>
            <Link to={`/project/${p.slug}`} className="hero-btn">
              {t('projectOpen')} <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const s = {
  section: { maxWidth: 1400, margin: '0 auto', padding: '40px 48px 80px', position: 'relative', zIndex: 2 },
  kicker: { display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', color: '#6a6a82' },
  kickerDot: { width: 7, height: 7, borderRadius: '50%' },
  body: { padding: '34px 34px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  markChip: { display: 'inline-block', padding: '3px 11px', border: '1px solid', borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em' },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 40, fontWeight: 400, lineHeight: 1.05, color: '#eef0f6', marginBottom: 14 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, lineHeight: 1.6, color: '#a8a8be', marginBottom: 22 },
  lbWrap: { border: '1px solid #1a1a2e', borderRadius: 10, padding: '12px 14px', marginBottom: 26, background: 'rgba(8,8,16,0.4)' },
  lbHead: { display: 'flex', alignItems: 'center', gap: 7, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a8aa0', marginBottom: 8 },
  lbTable: { display: 'flex', flexDirection: 'column', gap: 2 },
  lbRow: { display: 'grid', gridTemplateColumns: '24px 1fr auto auto', alignItems: 'center', gap: 10, padding: '6px 8px', borderRadius: 6, border: '1px solid transparent' },
  lbRank: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8a8aa0', textAlign: 'center' },
  lbModel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  lbMine: { fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '1px 6px', borderRadius: 999, border: '1px solid currentColor', opacity: 0.85 },
  lbNote: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, color: '#6a6a82', whiteSpace: 'nowrap' },
  lbScore: { fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' },
  ctaRow: { display: 'flex', gap: 12, flexWrap: 'wrap' },
};
