import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { ArrowUpRight, Globe, Menu, X, Search } from 'lucide-react';
import { useLang } from './i18n.jsx';
import { FEATURES } from './config';
import HallOfArmor from './components/HallOfArmor';
import IronManBackdrop from './components/IronManBackdrop';
import CommandPalette from './components/CommandPalette';
import Home from './pages/Home';

// Route-level code-splitting keeps the landing bundle small (better LCP/TBT).
const BlogDetail = lazy(() => import('./pages/RoadmapDetail'));
const BlogHub = lazy(() => import('./pages/BlogHub'));
const FunHub = lazy(() => import('./pages/FunHub'));
const SorryPage = lazy(() => import('./pages/SorryPage'));
const BirthdayPage = lazy(() => import('./pages/BirthdayPage'));
const HangmanPage = lazy(() => import('./pages/HangmanPage'));
const PuzzlePage = lazy(() => import('./pages/PuzzlePage'));
const HanoiPage = lazy(() => import('./pages/HanoiPage'));
const ReactionPage = lazy(() => import('./pages/ReactionPage'));
const MemoryPage = lazy(() => import('./pages/MemoryPage'));
const TicTacToePage = lazy(() => import('./pages/TicTacToePage'));
const Game2048Page = lazy(() => import('./pages/Game2048Page'));
const SimonPage = lazy(() => import('./pages/SimonPage'));
const MothersDay = lazy(() => import('./pages/MothersDay'));
const GoOutPage = lazy(() => import('./pages/GoOutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const CompetitionsPage = lazy(() => import('./pages/CompetitionsPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));

export default function App() {
  const [time, setTime] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const location = useLocation();
  const { lang, toggleLang, t } = useLang();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const istanbul = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Istanbul',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      }).format(now);
      setTime(istanbul);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #0a0a0f; scroll-behavior: smooth; overflow-x: hidden; }

        ::selection { background: #00d4ff; color: #0a0a0f; }

        .metallic {
          background: linear-gradient(135deg, #8a8a8a 0%, #d8d8d8 18%, #6e6e6e 32%, #e8e8e8 48%, #7a7a7a 62%, #c8c8c8 78%, #5e5e5e 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: shimmer 12s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .grain::before {
          content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 100;
          opacity: 0.03; mix-blend-mode: screen;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .reveal { opacity: 0; transform: translateY(18px); animation: reveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .reveal-1 { animation-delay: 0.05s; }
        .reveal-2 { animation-delay: 0.15s; }
        .reveal-3 { animation-delay: 0.28s; }
        .reveal-4 { animation-delay: 0.42s; }
        .reveal-5 { animation-delay: 0.58s; }
        .reveal-6 { animation-delay: 0.74s; }
        .reveal-7 { animation-delay: 0.88s; }
        @keyframes reveal { to { opacity: 1; transform: translateY(0); } }

        .hairline { height: 1px; background: linear-gradient(90deg, transparent, #1a1a2e 20%, #1a1a2e 80%, transparent); }

        .link-hover { position: relative; display: inline-flex; align-items: center; gap: 6px; transition: opacity 0.3s; }
        .link-hover:hover { opacity: 0.55; }
        .link-hover svg { transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .link-hover:hover svg { transform: translate(3px, -3px); }

        .row-hover { transition: background 0.4s, padding-left 0.4s; }
        .row-hover:hover { background: #12121f; padding-left: 28px !important; }

        .chip {
          display: inline-block; padding: 4px 10px; border: 1px solid #1a1a2e; border-radius: 999px;
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.08em;
          text-transform: uppercase; color: #8a8aa0; background: #0f0f1a;
        }

        .n-large { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.12em; color: #4a4a60; }

        .marquee-wrap { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        .marquee { display: flex; gap: 48px; animation: slide 40s linear infinite; white-space: nowrap; }
        @keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        a { color: inherit; text-decoration: none; }

        .ball-btn:hover { transform: scale(1.1) !important; }
        .puzzle-btn:hover { background: #12121f !important; border-color: #1a1a2e !important; }

        .lang-btn { transition: opacity 0.3s; }
        .lang-btn:hover { opacity: 0.6; }

        .hero-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px; border: 1px solid #1a1a2e; border-radius: 4px;
          font-family: 'Instrument Sans', sans-serif; font-size: 15px; font-weight: 500;
          color: #e0e0e8; background: rgba(15, 15, 26, 0.7);
          cursor: pointer; transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          text-decoration: none;
        }
        .hero-btn:hover {
          background: #00d4ff; color: #0a0a0f; border-color: #00d4ff;
          transform: translateY(-2px);
        }
        .hero-btn:hover svg { color: #0a0a0f !important; }

        .hero-btn-primary { background: #00d4ff; color: #0a0a0f; border-color: #00d4ff; }
        .hero-btn-primary svg { color: #0a0a0f !important; }
        .hero-btn-primary:hover { background: #2ee2ff; border-color: #2ee2ff; }

        .cmdk-btn {
          display: inline-flex; align-items: center; gap: 7px; padding: 6px 11px;
          border: 1px solid #1a1a2e; border-radius: 6px; background: rgba(15,15,26,0.6);
          color: #9a9ab0; cursor: pointer; transition: border-color 0.3s, color 0.3s;
          font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em;
        }
        .cmdk-btn:hover { border-color: #00d4ff; color: #e0e0e8; }

        .page-enter { animation: page-fade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
        @keyframes page-fade { from { opacity: 0; } to { opacity: 1; } }

        .skip-link {
          position: fixed; top: -60px; left: 12px; z-index: 400;
          background: #00d4ff; color: #0a0a0f; padding: 10px 18px; border-radius: 6px;
          font-family: 'Instrument Sans', sans-serif; font-size: 14px; font-weight: 600;
          transition: top 0.2s; text-decoration: none;
        }
        .skip-link:focus { top: 12px; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid #00d4ff; outline-offset: 3px; border-radius: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }
        }
        @media (max-width: 520px) { .cmdk-label { display: none; } }

        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; color: #e0e0e8; }

        .nav-links { display: flex; gap: 28; font-size: 13px; font-family: 'Instrument Sans', sans-serif; color: #8a8aa0; }
        .nav-right { display: flex; align-items: center; gap: 16px; }

        @keyframes geo-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes geo-float-reverse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(12px) rotate(-2deg); }
        }

        .geo-shape { position: absolute; pointer-events: none; z-index: 0; }
        .geo-float { animation: geo-float 8s ease-in-out infinite; }
        .geo-float-reverse { animation: geo-float-reverse 10s ease-in-out infinite; }
        .geo-float-slow { animation: geo-float 14s ease-in-out infinite; }

        @media (max-width: 900px) {
          .hero-name { font-size: 84px !important; }
          .section-title { font-size: 44px !important; }
          .two-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
          .nav-links { display: none !important; }
          .nav-right .clock-display { display: none !important; }
          .hamburger { display: block !important; }
          .mobile-menu { display: flex !important; }
          .journey-row { flex-direction: column !important; gap: 8px !important; }
          .journey-row .journey-title { width: auto !important; }
          .journey-row .journey-year { width: auto !important; }
          .journey-row .journey-num { width: auto !important; }
          .roadmap-row { flex-wrap: wrap !important; gap: 12px !important; }
          .roadmap-row .roadmap-title { width: auto !important; flex: 1 1 100% !important; }
          .big-contact { font-size: 56px !important; }
          .hero-meta { gap: 32px !important; }
          .hero-buttons { flex-wrap: wrap !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .hero-name { font-size: 48px !important; letter-spacing: -0.02em !important; }
          .section-title { font-size: 32px !important; }
          .four-col { grid-template-columns: 1fr !important; }
          .container { padding: 24px 16px !important; }
          .big-contact { font-size: 36px !important; }
          .hero-meta { gap: 24px !important; flex-direction: column !important; }
          .hero-buttons { gap: 10px !important; }
          .hero-btn { padding: 12px 20px !important; font-size: 14px !important; flex: 1; justify-content: center; min-width: calc(50% - 5px); }
          .nav-inner { padding: 14px 16px !important; }
        }
      `}</style>

      <a href="#main" className="skip-link">Skip to content</a>
      <IronManBackdrop />

      <div className="grain" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }} />

      <div style={{
        position: 'fixed', left: mousePos.x - 300, top: mousePos.y - 300,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, rgba(0,212,255,0) 60%)',
        pointerEvents: 'none', zIndex: 1,
        transition: 'left 0.3s ease-out, top 0.3s ease-out', filter: 'blur(20px)',
      }} />

      {/* NAV */}
      <nav style={styles.nav}>
        <div className="container nav-inner" style={styles.navInner}>
          <Link to="/" style={styles.mark}>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 22 }}>Gorkem</span>
            <span style={styles.dot} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: '#6a6a82' }}>EST. 2025</span>
          </Link>
          <div className="nav-links" style={styles.navLinks}>
            <Link to="/project" className="link-hover" style={{ cursor: 'pointer' }}>{t('navProject')}</Link>
            <Link to="/competitions" className="link-hover" style={{ cursor: 'pointer' }}>{t('navCompetitions')}</Link>
            <Link to="/research" className="link-hover" style={{ cursor: 'pointer' }}>{t('navResearch')}</Link>
            <Link to="/journey" className="link-hover" style={{ cursor: 'pointer' }}>{t('navLifeFlow')}</Link>
            <Link to="/blog" className="link-hover" style={{ cursor: 'pointer' }}>{t('navBlog')}</Link>
            <Link to="/fun" className="link-hover" style={{ cursor: 'pointer' }}>{t('navFun')}</Link>
            <Link to="/contact" className="link-hover" style={{ cursor: 'pointer', color: '#e0e0e8', fontWeight: 500 }}>
              {t('navContact')} <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              className="cmdk-btn"
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              aria-label="Open command palette"
              style={styles.cmdkBtn}
            >
              <Search size={13} strokeWidth={1.6} />
              <span className="cmdk-label">⌘K</span>
            </button>
            <button onClick={toggleLang} className="lang-btn" style={styles.langBtn} aria-label="Toggle language">
              <Globe size={13} strokeWidth={1.5} style={{ marginRight: 5, verticalAlign: -2 }} />
              {lang === 'en' ? 'TR' : 'EN'}
            </button>
            <div className="clock-display" style={styles.clock}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', display: 'inline-block' }} />
              <span>{time} IST</span>
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobile-menu" style={styles.mobileMenu}>
            <Link to="/project" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navProject')}</Link>
            <Link to="/competitions" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navCompetitions')}</Link>
            <Link to="/research" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navResearch')}</Link>
            <Link to="/journey" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navLifeFlow')}</Link>
            <Link to="/blog" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navBlog')}</Link>
            {FEATURES.resume && <Link to="/resume" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navResume')}</Link>}
            <Link to="/fun" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navFun')}</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navContact')}</Link>
          </div>
        )}
      </nav>

      {/* ROUTES */}
      <main id="main" key={location.pathname} className="page-enter">
        <Suspense fallback={<div style={{ minHeight: '70vh' }} aria-busy="true" />}>
        <Routes>
          <Route path="/" element={
            <>
              <section id="top" ref={heroRef} style={{ position: 'relative', overflow: 'hidden' }}>
                <HallOfArmor />
              </section>
              <Home />
            </>
          } />
          <Route path="/blog" element={<BlogHub />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/fun" element={<FunHub />} />
          <Route path="/fun/sorry" element={<SorryPage />} />
          <Route path="/fun/mothersday" element={<MothersDay />} />
          <Route path="/fun/goout" element={<GoOutPage />} />
          <Route path="/fun/birthday" element={<BirthdayPage />} />
          <Route path="/fun/hangman" element={<HangmanPage />} />
          <Route path="/fun/puzzle" element={<PuzzlePage />} />
          <Route path="/fun/hanoi" element={<HanoiPage />} />
          <Route path="/fun/reaction" element={<ReactionPage />} />
          <Route path="/fun/memory" element={<MemoryPage />} />
          <Route path="/fun/tictactoe" element={<TicTacToePage />} />
          <Route path="/fun/2048" element={<Game2048Page />} />
          <Route path="/fun/simon" element={<SimonPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/project/:slug/case-study" element={<CaseStudyPage />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </main>

      <CommandPalette />

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div className="container" style={{ padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: '#6a6a82' }}>
            &copy; 2026 &middot; Görkem Ergüne
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: '#6a6a82' }}>
            v2.30 &middot; {time}
          </span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'Instrument Sans', system-ui, sans-serif",
    background: '#0a0a0f', color: '#e0e0e8',
    minHeight: '100vh', position: 'relative', overflowX: 'hidden',
  },
  nav: {
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(10, 10, 15, 0.88)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid #1a1a2e',
  },
  navInner: {
    maxWidth: 1400, margin: '0 auto', padding: '18px 48px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
  },
  mark: { display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 },
  dot: { width: 4, height: 4, borderRadius: '50%', background: '#00d4ff', display: 'inline-block' },
  cmdkBtn: {},
  navLinks: {
    display: 'flex', gap: 28, fontSize: 13,
    fontFamily: "'Instrument Sans', sans-serif", color: '#8a8aa0',
  },
  mobileMenu: {
    display: 'flex', flexDirection: 'column', gap: 0,
    padding: '8px 0',
    borderTop: '1px solid #1a1a2e',
    background: 'rgba(10, 10, 15, 0.98)',
  },
  mobileMenuItem: {
    padding: '14px 48px',
    fontFamily: "'Instrument Sans', sans-serif",
    fontSize: 15, color: '#e0e0e8',
    cursor: 'pointer',
    borderBottom: '1px solid #1a1a2e',
  },
  langBtn: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11, letterSpacing: '0.08em',
    padding: '5px 10px', border: '1px solid #1a1a2e',
    borderRadius: 4, background: 'transparent',
    color: '#8a8aa0', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center',
  },
  clock: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
    letterSpacing: '0.1em', color: '#8a8aa0',
    display: 'flex', alignItems: 'center', gap: 8,
    fontVariantNumeric: 'tabular-nums',
  },
  container: {
    maxWidth: 1400, margin: '0 auto', padding: '120px 48px',
    position: 'relative', zIndex: 2,
  },
  hero: { paddingTop: 80, paddingBottom: 60 },
  heroTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 80, flexWrap: 'wrap', gap: 16 },
  heroName: {
    fontFamily: "'Instrument Serif', serif", fontSize: 180, fontWeight: 400,
    lineHeight: 0.88, letterSpacing: '-0.03em', color: '#e0e0e8', margin: 0,
  },
  amp: { color: '#00d4ff', fontStyle: 'italic' },
  heroMeta: { marginTop: 60, display: 'flex', gap: 80, flexWrap: 'wrap' },
  heroMetaItem: { display: 'flex', flexDirection: 'column', gap: 8 },
  heroMetaValue: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, color: '#e0e0e8' },
  heroTag: {
    marginTop: 72, fontFamily: "'Instrument Sans', sans-serif",
    fontSize: 22, lineHeight: 1.5, color: '#8a8aa0', maxWidth: 680, fontWeight: 400,
  },
  heroButtons: {
    marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap',
  },
  introKicker: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em',
    color: '#5a5a70',
  },
  introKickerDot: { width: 7, height: 7, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' },
  introLead: {
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 30, lineHeight: 1.4,
    color: '#e0e0e8', fontWeight: 400, marginBottom: 28, letterSpacing: '-0.01em',
  },
  introLeadEm: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#00d4ff' },
  introBody: {
    fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, lineHeight: 1.7,
    color: '#9a9ab0', maxWidth: 640,
  },
  introRolesLabel: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.16em',
    color: '#4a4a60', marginBottom: 16,
  },
  introStatsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' },
  statNum: {
    fontFamily: "'Instrument Serif', serif", fontSize: 46, lineHeight: 1,
    color: '#e0e0e8', marginBottom: 8, fontVariantNumeric: 'tabular-nums',
  },
  statLabel: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#5a5a70',
  },
  footer: { borderTop: '1px solid #1a1a2e', marginTop: 80 },
};
