import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Lock, ChevronDown, Trophy, Rocket, Beaker, Folder, Sparkles } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';

const CAT = [
  { key: 'competitions', label: 'semCompetitions', icon: Trophy },
  { key: 'hackathons', label: 'semHackathons', icon: Rocket },
  { key: 'research', label: 'semResearch', icon: Beaker },
  { key: 'projects', label: 'semProjects', icon: Folder },
  { key: 'achievements', label: 'semAchievements', icon: Sparkles },
];

// Timeline chips that exist elsewhere on the site link straight to that page.
// Both the English and Turkish labels map to the same destination.
const CHIP_LINKS = {
  'Synonym Master': '/project/synonym-master',
  'Sorting Visualizer': '/project/sorting-visualizer',
  'Space Shooter': '/project/raylib-space-shooter',
  'GorkemOS': '/project/gorkem-os',
  'Face Detection': '/project/face-detection-pipeline',
  'Yüz Tespiti': '/project/face-detection-pipeline',
  'NEXA Website': '/project/nexa-website',
  'NEXA Web Sitesi': '/project/nexa-website',
  'YOLO Custom Detector': '/project/yolo-custom-detector',
  'YOLO Özel Dedektör': '/project/yolo-custom-detector',
  'Re-Minder': '/project/re-mind',
  'FaceLock': '/project/facelock',
  'WorldCup BPE Tokenizer': '/project/worldcup-bpe-tokenizer',
  'wiki2bpe': '/project/wiki2bpe',
  'MIHENK Benchmark': '/project/mihenk-benchmark',
  'MIHENK Benchmark’ı': '/project/mihenk-benchmark',
  'ayarlicazhocam-training': '/project/llm-lora-finetuning',
  'Tool Agent': '/project/ayarlicazhocam-tool-agent',
  'Araç Ajanı': '/project/ayarlicazhocam-tool-agent',
  'Pose-Invariant Face ID': '/project/pose-invariant-face-id',
  'Poz-Değişmez Yüz Kimliği': '/project/pose-invariant-face-id',
  'PHQ-9 Depression Analysis': '/project/depression-phq9-analysis',
  'PHQ-9 Depresyon Analizi': '/project/depression-phq9-analysis',
  'Email Phishing Detection': '/project/email-phishing-detection',
  'E-posta Oltalama Tespiti': '/project/email-phishing-detection',
  'Find The Best': '/competitions',
  'BTK E-Commerce Hackathon': '/competitions',
  'BTK E-Ticaret Hackathon': '/competitions',
  'Tıkla Gelsin Foodathon': '/competitions',
  'Med-Health Early Warning': '/competitions',
  'Med-Health Erken Uyarı': '/competitions',
  'IEEEXtreme': '/competitions',
  'AlgoLeague Winter Camp': '/competitions',
  'AlgoLeague Kış Kampı': '/competitions',
  'AlgoLeague Spring Camp': '/competitions',
  'AlgoLeague Bahar Kampı': '/competitions',
  'AlgoLeague Summer Camp': '/competitions',
  'AlgoLeague Yaz Kampı': '/competitions',
};

export default function JourneyPage() {
  const { t } = useLang();
  const items = t('journeySemesters');
  const list = Array.isArray(items) ? items : [];
  const currentIdx = list.findIndex((x) => x.status === 'current');
  const [open, setOpen] = useState(currentIdx >= 0 ? currentIdx : 0);
  useSeo({ title: t('journeyLabel'), description: t('journeySub'), path: '/journey' });

  return (
    <div style={s.container}>
      <style>{`
        @keyframes jr-pulse-down { 0% { top: -8%; opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { top: 104%; opacity: 0; } }
        @keyframes jr-ring { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes jr-expand { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .jr-row { position: relative; opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.2,0.8,0.2,1), transform 0.7s cubic-bezier(0.2,0.8,0.2,1); }
        .jr-row.in { opacity: 1; transform: none; }
        .jr-card { transition: border-color 0.4s, box-shadow 0.4s, transform 0.35s cubic-bezier(0.2,0.8,0.2,1); }
        .jr-card:hover { transform: translateY(-2px); }
        .jr-grid { display: grid; grid-template-columns: 52px 1fr; align-items: start; }
        .jr-grid .jr-wrap { grid-column: 2; }
        .jr-mid { grid-column: 1; grid-row: 1; }
        .jr-chev { transition: transform 0.35s; }
        .jr-chev.open { transform: rotate(180deg); }
        .jr-chip-link { transition: border-color 0.3s, color 0.3s, background 0.3s, transform 0.25s; }
        .jr-chip-link:hover { transform: translateY(-1px); }
        @media (max-width: 780px) {
          .jr-grid { grid-template-columns: 40px 1fr !important; }
          .jr-spine { left: 19px !important; }
        }
      `}</style>

      <Link to="/" className="link-hover" style={s.back}>
        <ArrowLeft size={16} strokeWidth={1.5} /> {t('journeyBack')}
      </Link>

      <div style={s.header}>
        <span className="chip">{t('journeyBadge')}</span>
        <h1 className="section-title" style={s.title}>{t('journeyLabel')}</h1>
        <p style={s.desc}>{t('journeySub')}</p>
      </div>

      <div style={s.timeline}>
        <div className="jr-spine" style={s.spine}>
          <div style={s.spineGlow} />
          <div style={s.spinePulse} />
        </div>
        {list.map((item, i) => (
          <Semester
            key={i}
            item={item}
            index={i}
            expanded={open === i}
            onToggle={() => setOpen(open === i ? -1 : i)}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}

function Semester({ item, index, expanded, onToggle, t }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const locked = item.status === 'locked';
  const current = item.status === 'current';
  const accent = locked ? '#3a3a50' : current ? '#ff6b35' : '#00d4ff';
  const glow = locked ? 'rgba(58,58,80,0.2)' : current ? 'rgba(255,107,53,0.4)' : 'rgba(0,212,255,0.35)';
  const statusLabel = current ? t('journeyStatusActive') : locked ? t('journeyStatusLocked') : t('journeyStatusDone');
  const hasContent = !locked && CAT.some((c) => (item[c.key] || []).length);

  return (
    <div ref={ref} className={`jr-grid jr-row${seen ? ' in' : ''}`} style={{ marginBottom: 14, transitionDelay: `${index * 0.05}s` }}>
      <div className="jr-wrap">
        {current && <div style={s.youHere}>{t('journeyNow')}</div>}
        <div
          className="jr-card"
          style={{ ...s.card, borderColor: current ? '#ff6b3555' : '#1a1a2e', cursor: locked ? 'default' : 'pointer' }}
          onClick={() => !locked && onToggle()}
          onMouseEnter={(e) => { if (!locked) { e.currentTarget.style.borderColor = `${accent}66`; e.currentTarget.style.boxShadow = `0 0 26px ${glow}`; } }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = current ? '#ff6b3555' : '#1a1a2e'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <div style={s.cardHead}>
            <span style={s.termWrap}>
              <span style={s.term}>{item.term}</span>
              {item.sub && <span style={s.termSub}>{item.sub}</span>}
            </span>
            <span style={{ ...s.statusTag, color: accent, borderColor: `${accent}55`, background: `${accent}12` }}>
              {item.status === 'completed' && <Check size={9} strokeWidth={3} style={{ verticalAlign: -1, marginRight: 3 }} />}
              {locked && <Lock size={9} strokeWidth={2.5} style={{ verticalAlign: -1, marginRight: 3 }} />}
              {statusLabel}
            </span>
          </div>
          <div style={s.titleRow}>
            <h3 style={{ ...s.phaseTitle, color: locked ? '#6a6a82' : '#eef0f6', fontStyle: locked ? 'normal' : 'italic' }}>
              {locked ? t('journeyLockedNote') : item.title}
            </h3>
            {hasContent && <ChevronDown className={`jr-chev${expanded ? ' open' : ''}`} size={16} strokeWidth={1.6} style={{ color: accent, flexShrink: 0 }} />}
          </div>

          {expanded && hasContent && (
            <div style={{ ...s.summary, animation: 'jr-expand 0.35s ease' }}>
              {CAT.map((c) => {
                const vals = item[c.key] || [];
                if (!vals.length) return null;
                const Icon = c.icon;
                return (
                  <div key={c.key} style={s.catRow}>
                    <span style={{ ...s.catLabel, color: accent }}><Icon size={11} strokeWidth={1.8} /> {t(c.label)}</span>
                    <div style={s.chips}>
                      {vals.map((v, k) => {
                        const to = CHIP_LINKS[v];
                        if (!to) return <span key={k} style={s.chip}>{v}</span>;
                        return (
                          <Link
                            key={k}
                            to={to}
                            className="jr-chip-link"
                            onClick={(e) => e.stopPropagation()}
                            style={{ ...s.chip, borderColor: `${accent}44`, color: '#e4e4f0', background: `${accent}10`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}
                          >
                            {v}
                            <ArrowUpRight size={11} strokeWidth={2} style={{ color: accent }} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {current && (
                <div style={s.catRow}>
                  <span style={{ ...s.catLabel, color: accent }}><Sparkles size={11} strokeWidth={1.8} /> {t('journeyFocusLabel')}</span>
                  <div style={s.chips}>
                    {(t('journeyFocus') || []).map((f, k) => (
                      <span key={k} style={{ ...s.chip, borderColor: '#ff6b3544', color: '#ffb494', background: 'rgba(255,107,53,0.08)' }}>{f}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* node */}
      <div className="jr-mid" style={s.mid}>
        <div style={{ ...s.node, borderColor: accent }}>
          {current ? (
            <>
              <div style={{ ...s.nodeRing, borderTopColor: accent }} />
              <span style={{ ...s.core, background: accent, boxShadow: `0 0 12px ${accent}` }} />
            </>
          ) : (
            <span style={{ ...s.core, background: locked ? '#2a2a40' : accent, boxShadow: locked ? 'none' : `0 0 10px ${accent}` }} />
          )}
        </div>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 960, margin: '0 auto', padding: '60px 48px 120px', position: 'relative', zIndex: 2 },
  back: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.06em', color: '#6a6a82', marginBottom: 56, cursor: 'pointer' },
  header: { marginBottom: 64, maxWidth: 620 },
  title: { fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.015em', color: '#eef0f6', marginTop: 20, marginBottom: 20 },
  desc: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: '#9a9ab0' },
  timeline: { position: 'relative' },
  spine: { position: 'absolute', left: 25, top: 0, bottom: 0, width: 2, pointerEvents: 'none' },
  spineGlow: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, #1a2a3a 6%, #1a2a3a 94%, transparent)' },
  spinePulse: { position: 'absolute', left: -1, width: 4, height: '16%', borderRadius: 4, background: 'linear-gradient(180deg, transparent, #00d4ff, transparent)', boxShadow: '0 0 16px rgba(0,212,255,0.7)', animation: 'jr-pulse-down 6s ease-in-out infinite' },
  mid: { display: 'flex', justifyContent: 'center', paddingTop: 26 },
  node: { position: 'relative', width: 26, height: 26, borderRadius: '50%', border: '2px solid', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  nodeRing: { position: 'absolute', inset: -5, borderRadius: '50%', border: '1.5px solid transparent', animation: 'jr-ring 3s linear infinite' },
  core: { width: 8, height: 8, borderRadius: '50%' },
  youHere: { display: 'inline-block', marginBottom: 8, padding: '4px 11px', borderRadius: 999, background: 'rgba(255,107,53,0.14)', border: '1px solid rgba(255,107,53,0.4)', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.16em', color: '#ff8a5c' },
  card: { position: 'relative', background: 'linear-gradient(180deg,#0f0f1a,#0b0b13)', border: '1px solid #1a1a2e', borderRadius: 12, padding: '22px 26px', margin: 0 },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' },
  termWrap: { display: 'inline-flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' },
  term: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.1em', color: '#c0c0d4' },
  termSub: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.04em', color: '#6a6a82' },
  statusTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '0.12em', padding: '3px 8px', border: '1px solid', borderRadius: 999 },
  titleRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  phaseTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400, lineHeight: 1.15 },
  summary: { marginTop: 16, paddingTop: 16, borderTop: '1px solid #1a1a2e', display: 'flex', flexDirection: 'column', gap: 14 },
  catRow: { display: 'flex', flexDirection: 'column', gap: 8 },
  catLabel: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' },
  chips: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  chip: { padding: '5px 11px', border: '1px solid #22223400', borderRadius: 6, background: 'rgba(255,255,255,0.03)', fontFamily: "'Instrument Sans', sans-serif", fontSize: 12.5, color: '#c4c4d4' },
};
