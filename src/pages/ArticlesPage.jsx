import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronDown, FileText, Sparkles } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import ARTICLES from '../data/articles';

export default function ArticlesPage() {
  const { lang, t } = useLang();
  const [tab, setTab] = useState('read');
  useSeo({ title: t('articlesLabel'), description: t('articlesSub'), path: '/articles' });

  const loc = (en, tr) => (lang === 'tr' && tr ? tr : en);
  const tabs = [
    { id: 'read', label: t('articlesTabRead'), count: ARTICLES.read.length },
    { id: 'written', label: t('articlesTabWritten'), count: ARTICLES.written.length },
  ];

  return (
    <div style={s.container}>
      <style>{`
        .art-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 30px; }
        .art-tab { display: inline-flex; align-items: center; gap: 8px; padding: 9px 18px; border: 1px solid #1a1a2e; border-radius: 999px; background: rgba(15,15,26,0.5); font-family: 'Instrument Sans', sans-serif; font-size: 13.5px; color: #9a9ab0; cursor: pointer; transition: all 0.3s cubic-bezier(0.2,0.8,0.2,1); white-space: nowrap; }
        .art-tab:hover { color: #e0e0e8; border-color: #2a2a45; }
        .art-tab.active { background: #00d4ff; color: #0a0a0f; border-color: #00d4ff; font-weight: 500; }
        .art-tab .art-tab-n { font-family: 'JetBrains Mono', monospace; font-size: 10px; opacity: 0.7; }

        .art-card { transition: border-color 0.4s, box-shadow 0.4s; }
        .art-note-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border: 1px solid #1a1a2e; border-radius: 4px; background: rgba(15,15,26,0.7); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #9a9ab0; cursor: pointer; transition: border-color 0.3s, color 0.3s; }
        .art-note-btn:hover { color: #e0e0e8; }
        .art-chev { transition: transform 0.35s cubic-bezier(0.2,0.8,0.2,1); }
        .art-chev.open { transform: rotate(180deg); }

        .art-row { display: grid; grid-template-columns: 150px repeat(3, minmax(96px, 1fr)); gap: 14px; align-items: baseline; padding: 13px 0; border-top: 1px solid #15152a; }
        .art-row-head { border-top: none; padding-bottom: 8px; }
        .art-cell-label { display: none; }
        @media (max-width: 760px) {
          .art-row-head { display: none; }
          .art-row { grid-template-columns: 1fr; gap: 7px; padding: 18px 0; }
          .art-cell { display: flex; align-items: baseline; justify-content: space-between; gap: 14px; }
          .art-cell-label { display: inline; flex: 1 1 auto; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #5a5a70; }
        }
        @media (max-width: 600px) {
          .art-actions { flex-direction: column !important; align-items: stretch !important; }
          .art-actions > * { justify-content: center; }
        }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('articlesBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('articlesBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('articlesLabel')}</h1>
        <p style={s.desc}>{t('articlesSub')}</p>

        <div className="art-tabs" role="tablist">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              role="tab"
              aria-selected={tab === tb.id}
              className={`art-tab${tab === tb.id ? ' active' : ''}`}
              onClick={() => setTab(tb.id)}
            >
              {tb.label}<span className="art-tab-n">{tb.count}</span>
            </button>
          ))}
        </div>
      </div>

      {tab === 'read' ? (
        <div style={s.list} key="read">
          <p style={s.tabNote}>{t('articlesReadNote')}</p>
          {ARTICLES.read.map((a, i) => <PaperCard key={a.slug} paper={a} index={i} loc={loc} />)}
        </div>
      ) : (
        <div style={s.list} key="written">
          <p style={s.tabNote}>{t('articlesWrittenNote')}</p>
          {ARTICLES.written.map((w, i) => <SoonCard key={w.slug} item={w} index={i} loc={loc} />)}
        </div>
      )}
    </div>
  );
}

function PaperCard({ paper, index, loc }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const accent = paper.accent;
  const tags = loc(paper.tags, paper.tagsTr);

  return (
    <article
      className="art-card reveal"
      style={{ ...s.card, animationDelay: `${index * 0.08}s` }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}55`; e.currentTarget.style.boxShadow = `0 0 30px ${accent}1a`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a2e'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={s.cardTop}>
        <span style={{ ...s.field, color: accent }}>
          <FileText size={12} strokeWidth={1.6} /> {loc(paper.category, paper.categoryTr)}
        </span>
        <span style={{ ...s.venue, color: accent, borderColor: `${accent}4d`, background: `${accent}14` }}>{paper.venue}</span>
      </div>

      <h2 style={s.paperTitle}>{paper.title}</h2>
      <p style={s.authors}>{paper.authors.join(' · ')}</p>
      <p style={s.affil}>{paper.affiliations}</p>

      <p style={s.summary}>{loc(paper.summary, paper.summaryTr)}</p>

      <div style={s.tagRow}>
        {tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
      </div>

      <div style={s.metaRow}>
        <span>{paper.arxiv}</span>
        <span style={s.metaDot} />
        <span>{t('articlesReadOn')} {loc(paper.readOn, paper.readOnTr)}</span>
      </div>

      <div className="art-actions" style={s.actions}>
        <a className="hero-btn" href={paper.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14 }}>
          {t('articlesOpenPaper')} <ArrowUpRight size={14} strokeWidth={1.6} />
        </a>
        {paper.pdf && (
          <a className="hero-btn" href={paper.pdf} download style={{ fontSize: 14 }}>
            {t('articlesAnnotated')} <FileText size={14} strokeWidth={1.6} />
          </a>
        )}
        <button className="art-note-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? t('articlesHideNotes') : t('articlesShowNotes')}
          <ChevronDown className={`art-chev${open ? ' open' : ''}`} size={13} strokeWidth={1.8} />
        </button>
      </div>

      {open && (
        <div style={s.notes}>
          <div style={{ ...s.notesKicker, color: accent }}>{t('articlesNotesKicker')}</div>

          {paper.notes.map((n, i) => (
            <section key={i} style={{ marginBottom: 26 }}>
              <h3 style={s.noteHeading}>{loc(n.heading, n.headingTr)}</h3>
              <ul style={s.ul}>
                {loc(n.points, n.pointsTr).map((p, j) => (
                  <li key={j} style={s.li}><span style={{ ...s.bullet, background: accent }} />{p}</li>
                ))}
              </ul>
            </section>
          ))}

          {paper.board && <ModelBoard board={paper.board} accent={accent} loc={loc} />}
        </div>
      )}
    </article>
  );
}

function ModelBoard({ board, accent, loc }) {
  const { t } = useLang();
  const columns = loc(board.columns, board.columnsTr);

  return (
    <section>
      <h3 style={s.noteHeading}>{t('articlesBoardTitle')}</h3>
      <div>
        <div className="art-row art-row-head">
          <span style={{ ...s.colHead, color: accent }}>Model</span>
          {columns.map((c) => <span key={c} style={s.colHead}>{c}</span>)}
        </div>
        {board.rows.map((r) => (
          <div key={r.name} className="art-row">
            <span style={{ ...s.modelName, color: accent }}>{r.name}</span>
            {r.scores.map((sc, i) => (
              <span key={i} className="art-cell">
                <span className="art-cell-label">{columns[i]}</span>
                <span style={{ ...s.score, color: sc === 'n/a' ? '#4a4a60' : '#d6d6e4' }}>{sc}</span>
              </span>
            ))}
            <p style={s.verdict}>{loc(r.verdict, r.verdictTr)}</p>
          </div>
        ))}
      </div>
      <p style={s.caption}>{loc(board.caption, board.captionTr)}</p>
    </section>
  );
}

function SoonCard({ item, index, loc }) {
  const { t } = useLang();
  return (
    <article className="reveal" style={{ ...s.soonCard, animationDelay: `${index * 0.08}s` }}>
      <Sparkles size={22} strokeWidth={1.4} style={{ color: '#00d4ff' }} />
      <div>
        <span style={s.soonBadge}>{t('articlesSoonBadge')}</span>
        <h2 style={s.soonTitle}>{loc(item.title, item.titleTr)}</h2>
        <p style={s.soonDesc}>{loc(item.summary, item.summaryTr)}</p>
      </div>
    </article>
  );
}

const s = {
  container: { maxWidth: 900, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6a6a82', marginBottom: 56, cursor: 'pointer' },
  header: { marginBottom: 40 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#eef0f6', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#9a9ab0', maxWidth: 600 },
  tabNote: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14.5, lineHeight: 1.6, color: '#7a7a92', marginBottom: 4 },
  list: { display: 'flex', flexDirection: 'column', gap: 22 },
  card: { padding: '30px 32px', border: '1px solid #1a1a2e', borderRadius: 12, background: 'linear-gradient(180deg,#0f0f1a,#0b0b13)' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' },
  field: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em' },
  venue: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 10px', border: '1px solid', borderRadius: 999 },
  paperTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 29, fontWeight: 400, lineHeight: 1.2, color: '#eef0f6', marginBottom: 12 },
  authors: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 13.5, lineHeight: 1.6, color: '#8a8aa0' },
  affil: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.08em', color: '#5a5a70', marginTop: 6 },
  summary: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15.5, lineHeight: 1.65, color: '#b4b4c6', marginTop: 18 },
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 18 },
  metaRow: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.08em', color: '#5a5a70', flexWrap: 'wrap' },
  metaDot: { width: 3, height: 3, borderRadius: '50%', background: '#3a3a52' },
  actions: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, flexWrap: 'wrap' },
  notes: { marginTop: 30, paddingTop: 26, borderTop: '1px solid #15152a' },
  notesKicker: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 22 },
  noteHeading: { fontFamily: "'Instrument Serif', serif", fontSize: 21, fontWeight: 400, color: '#e6e6f0', marginBottom: 12 },
  ul: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, padding: 0, margin: 0 },
  li: { display: 'flex', alignItems: 'flex-start', gap: 11, fontFamily: "'Instrument Sans', sans-serif", fontSize: 14.5, lineHeight: 1.65, color: '#a2a2b8' },
  bullet: { width: 5, height: 5, borderRadius: '50%', marginTop: 9, flexShrink: 0 },
  colHead: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5a5a70', lineHeight: 1.4 },
  modelName: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.04em' },
  score: { fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', flexShrink: 0 },
  verdict: { gridColumn: '1 / -1', fontFamily: "'Instrument Sans', sans-serif", fontSize: 13.5, lineHeight: 1.6, color: '#8a8aa0', marginTop: 4 },
  caption: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 12.5, lineHeight: 1.6, color: '#5a5a70', marginTop: 16, fontStyle: 'italic' },
  soonCard: { display: 'flex', gap: 20, padding: '34px 32px', border: '1px dashed #22223a', borderRadius: 12, background: 'rgba(15,15,26,0.35)' },
  soonBadge: { display: 'inline-block', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.08)', borderRadius: 999, padding: '4px 10px', marginBottom: 14 },
  soonTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 27, fontWeight: 400, color: '#e6e6f0', marginBottom: 10 },
  soonDesc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.65, color: '#8a8aa0', maxWidth: 520 },
};
