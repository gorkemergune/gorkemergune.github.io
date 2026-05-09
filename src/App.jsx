import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Mail, Github, Linkedin, MapPin, Globe, Menu, X, BookOpen, Gamepad2, FolderOpen, Clock } from 'lucide-react';
import { useLang } from './i18n.jsx';
import BlogDetail from './pages/RoadmapDetail';
import BlogHub from './pages/BlogHub';
import FunHub from './pages/FunHub';
import SorryPage from './pages/SorryPage';
import BirthdayPage from './pages/BirthdayPage';
import HangmanPage from './pages/HangmanPage';
import PuzzlePage from './pages/PuzzlePage';
import HanoiPage from './pages/HanoiPage';
import ContactPage from './pages/ContactPage';
import JourneyPage from './pages/JourneyPage';
import ProjectPage from './pages/ProjectPage';

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

  const marquee = t('marquee');

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #f4f3ef; scroll-behavior: smooth; overflow-x: hidden; }

        ::selection { background: #1a1a1a; color: #f4f3ef; }

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
          opacity: 0.06; mix-blend-mode: multiply;
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

        .hairline { height: 1px; background: linear-gradient(90deg, transparent, #c9c7c0 20%, #c9c7c0 80%, transparent); }

        .link-hover { position: relative; display: inline-flex; align-items: center; gap: 6px; transition: opacity 0.3s; }
        .link-hover:hover { opacity: 0.55; }
        .link-hover svg { transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .link-hover:hover svg { transform: translate(3px, -3px); }

        .row-hover { transition: background 0.4s, padding-left 0.4s; }
        .row-hover:hover { background: #ecebe6; padding-left: 28px !important; }

        .chip {
          display: inline-block; padding: 4px 10px; border: 1px solid #d6d4cd; border-radius: 999px;
          font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.08em;
          text-transform: uppercase; color: #4a4a48; background: #f9f8f4;
        }

        .n-large { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.12em; color: #8a8a86; }

        .marquee-wrap { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        .marquee { display: flex; gap: 48px; animation: slide 40s linear infinite; white-space: nowrap; }
        @keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        a { color: inherit; text-decoration: none; }

        .ball-btn:hover { transform: scale(1.1) !important; }
        .puzzle-btn:hover { background: #ecebe6 !important; border-color: #c9c7c0 !important; }

        .lang-btn { transition: opacity 0.3s; }
        .lang-btn:hover { opacity: 0.6; }

        .hero-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px; border: 1px solid #d6d4cd; border-radius: 4px;
          font-family: 'Instrument Sans', sans-serif; font-size: 15px; font-weight: 500;
          color: #1a1a1a; background: rgba(250, 250, 246, 0.7);
          cursor: pointer; transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          text-decoration: none;
        }
        .hero-btn:hover {
          background: #1a1a1a; color: #f4f3ef; border-color: #1a1a1a;
          transform: translateY(-2px);
        }
        .hero-btn:hover svg { color: #f4f3ef !important; }

        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; color: #1a1a1a; }

        .nav-links { display: flex; gap: 28; font-size: 13px; font-family: 'Instrument Sans', sans-serif; color: #4a4a48; }
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

      <div className="grain" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }} />

      <div style={{
        position: 'fixed', left: mousePos.x - 300, top: mousePos.y - 300,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,180,175,0.18) 0%, rgba(180,180,175,0) 60%)',
        pointerEvents: 'none', zIndex: 1,
        transition: 'left 0.3s ease-out, top 0.3s ease-out', filter: 'blur(20px)',
      }} />

      {/* NAV */}
      <nav style={styles.nav}>
        <div className="container nav-inner" style={styles.navInner}>
          <Link to="/" style={styles.mark}>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 22 }}>Gorkem</span>
            <span style={styles.dot} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: '#6b6a66' }}>EST. 20XX</span>
          </Link>
          <div className="nav-links" style={styles.navLinks}>
            <Link to="/blog" className="link-hover" style={{ cursor: 'pointer' }}>{t('navBlog')}</Link>
            <Link to="/fun" className="link-hover" style={{ cursor: 'pointer' }}>{t('navFun')}</Link>
            <Link to="/project" className="link-hover" style={{ cursor: 'pointer' }}>{t('navProject')}</Link>
            <Link to="/journey" className="link-hover" style={{ cursor: 'pointer' }}>{t('navLifeFlow')}</Link>
            <Link to="/contact" className="link-hover" style={{ cursor: 'pointer', color: '#1a1a1a', fontWeight: 500 }}>
              {t('navContact')} <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={toggleLang} className="lang-btn" style={styles.langBtn}>
              <Globe size={13} strokeWidth={1.5} style={{ marginRight: 5, verticalAlign: -2 }} />
              {lang === 'en' ? 'TR' : 'EN'}
            </button>
            <div className="clock-display" style={styles.clock}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6a6a66', display: 'inline-block' }} />
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
            <Link to="/blog" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navBlog')}</Link>
            <Link to="/fun" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navFun')}</Link>
            <Link to="/project" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navProject')}</Link>
            <Link to="/journey" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navLifeFlow')}</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navContact')}</Link>
          </div>
        )}
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={
          <>
            {/* HERO */}
            <section id="top" ref={heroRef} style={{ ...styles.container, ...styles.hero, position: 'relative', overflow: 'hidden' }} className="container">
              {/* Geometric background shapes */}
              <div className="geo-shape geo-float" style={{
                top: '8%', right: '5%', width: 120, height: 120,
                border: '1px solid rgba(40,40,40,0.08)',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, rgba(60,60,60,0.06), rgba(30,30,30,0.02))',
              }} />
              <div className="geo-shape geo-float-reverse" style={{
                top: '35%', right: '12%', width: 60, height: 60,
                background: 'linear-gradient(135deg, rgba(50,50,50,0.07), rgba(80,80,80,0.03))',
                transform: 'rotate(45deg)',
              }} />
              <div className="geo-shape geo-float-slow" style={{
                top: '15%', left: '2%', width: 80, height: 80,
                border: '1px solid rgba(40,40,40,0.06)',
                borderRadius: 4,
                transform: 'rotate(15deg)',
              }} />
              <div className="geo-shape geo-float" style={{
                bottom: '25%', left: '8%', width: 140, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(40,40,40,0.12), transparent)',
              }} />
              <div className="geo-shape geo-float-reverse" style={{
                bottom: '35%', right: '8%', width: 1, height: 100,
                background: 'linear-gradient(180deg, transparent, rgba(40,40,40,0.10), transparent)',
              }} />
              <div className="geo-shape geo-float-slow" style={{
                top: '55%', right: '3%', width: 40, height: 40,
                border: '1px solid rgba(40,40,40,0.06)',
                borderRadius: '50%',
              }} />
              <div className="geo-shape geo-float" style={{
                top: '70%', left: '15%', width: 0, height: 0,
                borderLeft: '20px solid transparent',
                borderRight: '20px solid transparent',
                borderBottom: '35px solid rgba(40,40,40,0.04)',
              }} />
              <div className="geo-shape geo-float-reverse" style={{
                top: '5%', left: '40%', width: 200, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(50,50,50,0.08), transparent)',
              }} />
              <div className="geo-shape geo-float-slow" style={{
                top: '45%', left: '45%', width: 6, height: 6,
                borderRadius: '50%',
                background: 'rgba(40,40,40,0.10)',
              }} />
              <div className="geo-shape geo-float" style={{
                bottom: '15%', right: '25%', width: 90, height: 90,
                border: '1px solid rgba(40,40,40,0.05)',
                borderRadius: 4,
                transform: 'rotate(30deg)',
              }} />
              <svg className="geo-shape geo-float-reverse" style={{ top: '25%', left: '25%', width: 50, height: 50, opacity: 0.06 }} viewBox="0 0 50 50">
                <polygon points="25,2 48,38 2,38" fill="none" stroke="#1a1a1a" strokeWidth="1" />
              </svg>
              <svg className="geo-shape geo-float-slow" style={{ bottom: '20%', left: '35%', width: 30, height: 30, opacity: 0.08 }} viewBox="0 0 30 30">
                <rect x="2" y="2" width="26" height="26" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="0.8" transform="rotate(20 15 15)" />
              </svg>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="reveal reveal-1" style={styles.heroTop}>
                  <span className="chip">{t('heroChip')}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: '#6b6a66' }}>
                    41.0082° N &nbsp;&middot;&nbsp; 28.9784° E
                  </span>
                </div>

                <h1 className="hero-name reveal reveal-2" style={styles.heroName}>
                  Gorkem<br />
                  <span className="metallic" style={{ fontStyle: 'italic', fontWeight: 400 }}>Ergune</span>
                  <span style={styles.amp}>.</span>
                </h1>

                <div className="reveal reveal-3 hero-meta" style={styles.heroMeta}>
                  <div style={styles.heroMetaItem}>
                    <span className="n-large">{t('heroRole')}</span>
                    <span style={styles.heroMetaValue}>{t('heroRoleValue')}</span>
                  </div>
                  <div style={styles.heroMetaItem}>
                    <span className="n-large">{t('heroBasedIn')}</span>
                    <span style={styles.heroMetaValue}>
                      <MapPin size={13} strokeWidth={1.5} style={{ marginRight: 4, verticalAlign: -1 }} />
                      {t('heroBasedInValue')}
                    </span>
                  </div>
                  <div style={styles.heroMetaItem}>
                    <span className="n-large">{t('heroStatus')}</span>
                    <span style={styles.heroMetaValue}>{t('heroStatusValue')}</span>
                  </div>
                </div>

                <p className="reveal reveal-4" style={styles.heroTag}>
                  {t('heroTagline1')} <br/>
                  {t('heroTagline2')}<em style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>{t('heroUnhurried')}</em>.
                </p>

                {/* Hero navigation buttons */}
                <div className="reveal reveal-5 hero-buttons" style={styles.heroButtons}>
                  <Link to="/blog" className="hero-btn">
                    <BookOpen size={16} strokeWidth={1.5} style={{ color: '#6b6a66' }} />
                    {t('heroBtnBlog')}
                  </Link>
                  <Link to="/fun" className="hero-btn">
                    <Gamepad2 size={16} strokeWidth={1.5} style={{ color: '#6b6a66' }} />
                    {t('heroBtnFun')}
                  </Link>
                  <Link to="/contact" className="hero-btn">
                    <Mail size={16} strokeWidth={1.5} style={{ color: '#6b6a66' }} />
                    {t('heroBtnContact')}
                  </Link>
                  <Link to="/project" className="hero-btn">
                    <FolderOpen size={16} strokeWidth={1.5} style={{ color: '#6b6a66' }} />
                    {t('heroBtnProject')}
                  </Link>
                  <Link to="/journey" className="hero-btn">
                    <Clock size={16} strokeWidth={1.5} style={{ color: '#6b6a66' }} />
                    {t('heroBtnLifeFlow')}
                  </Link>
                </div>

                <div className="reveal reveal-6 hairline" style={{ marginTop: 60 }} />

                <div className="reveal reveal-7 marquee-wrap" style={{ marginTop: 40 }}>
                  <div className="marquee">
                    {[...Array(2)].map((_, k) => (
                      <div key={k} style={{ display: 'flex', gap: 48, fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#8a8a86' }}>
                        {Array.isArray(marquee) && marquee.map((item, i) => (
                          <span key={i}>
                            <span style={i % 2 === 1 ? { fontStyle: 'italic' } : {}}>{item}</span>
                            {i < marquee.length - 1 && <span style={{ margin: '0 0 0 48px' }}>&middot;</span>}
                          </span>
                        ))}
                        <span>&middot;</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="container" style={styles.container}>
              <SectionHeader number="01" label={t('aboutLabel')} />
              <div className="two-col" style={styles.twoCol}>
                <div>
                  <p style={styles.lead}>
                    <em style={styles.leadAccent}>{t('aboutLead')}</em>
                  </p>
                </div>
                <aside style={styles.aside}>
                  <StatRow label={t('statCurrently')} value={t('statCurrentlyVal')} />
                  <StatRow label={t('statPreviously')} value={t('statPreviouslyVal')} />
                  <StatRow label={t('statTools')} value={t('statToolsVal')} />
                  <StatRow label={t('statLanguages')} value={t('statLanguagesVal')} />
                  <StatRow label={t('statMail')} value="gorkemergune2@gmail.com" />
                </aside>
              </div>
            </section>
          </>
        } />
        <Route path="/blog" element={<BlogHub />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/fun" element={<FunHub />} />
        <Route path="/fun/sorry" element={<SorryPage />} />
        <Route path="/fun/birthday" element={<BirthdayPage />} />
        <Route path="/fun/hangman" element={<HangmanPage />} />
        <Route path="/fun/puzzle" element={<PuzzlePage />} />
        <Route path="/fun/hanoi" element={<HanoiPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/project" element={<ProjectPage />} />
      </Routes>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div className="container" style={{ padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: '#8a8a86' }}>
            &copy; 2026 &middot; Gorkem Ergune
          </span>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 14, color: '#6b6a66' }}>
            {t('footerBuilt')}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: '#8a8a86' }}>
            v0.1 &middot; {time}
          </span>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ number, label, sub }) {
  return (
    <div style={{ marginBottom: 48, display: 'flex', alignItems: 'baseline', gap: 24, flexWrap: 'wrap' }}>
      <span className="n-large" style={{ fontSize: 12 }}>&sect; {number}</span>
      <h2 className="section-title" style={{
        fontFamily: "'Instrument Serif', serif", fontSize: 72, fontWeight: 400,
        lineHeight: 0.95, letterSpacing: '-0.015em', color: '#1a1a1a',
      }}>{label}</h2>
      {sub && (
        <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 18, color: '#6b6a66' }}>
          &mdash; {sub}
        </span>
      )}
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 0', borderBottom: '1px solid #e2e0da', gap: 16, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a8a86' }}>{label}</span>
      <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: '#2a2a28', wordBreak: 'break-word' }}>{value}</span>
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'Instrument Sans', system-ui, sans-serif",
    background: '#f4f3ef', color: '#1a1a1a',
    minHeight: '100vh', position: 'relative', overflowX: 'hidden',
  },
  nav: {
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(244, 243, 239, 0.85)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid #e2e0da',
  },
  navInner: {
    maxWidth: 1400, margin: '0 auto', padding: '18px 48px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
  },
  mark: { display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 },
  dot: { width: 4, height: 4, borderRadius: '50%', background: '#9a9994', display: 'inline-block' },
  navLinks: {
    display: 'flex', gap: 28, fontSize: 13,
    fontFamily: "'Instrument Sans', sans-serif", color: '#4a4a48',
  },
  mobileMenu: {
    display: 'flex', flexDirection: 'column', gap: 0,
    padding: '8px 0',
    borderTop: '1px solid #e2e0da',
    background: 'rgba(244, 243, 239, 0.98)',
  },
  mobileMenuItem: {
    padding: '14px 48px',
    fontFamily: "'Instrument Sans', sans-serif",
    fontSize: 15, color: '#1a1a1a',
    cursor: 'pointer',
    borderBottom: '1px solid #e2e0da',
  },
  langBtn: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11, letterSpacing: '0.08em',
    padding: '5px 10px', border: '1px solid #d6d4cd',
    borderRadius: 4, background: 'transparent',
    color: '#4a4a48', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center',
  },
  clock: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
    letterSpacing: '0.1em', color: '#4a4a48',
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
    lineHeight: 0.88, letterSpacing: '-0.03em', color: '#1a1a1a', margin: 0,
  },
  amp: { color: '#9a9994', fontStyle: 'italic' },
  heroMeta: { marginTop: 60, display: 'flex', gap: 80, flexWrap: 'wrap' },
  heroMetaItem: { display: 'flex', flexDirection: 'column', gap: 8 },
  heroMetaValue: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, color: '#1a1a1a' },
  heroTag: {
    marginTop: 72, fontFamily: "'Instrument Sans', sans-serif",
    fontSize: 22, lineHeight: 1.5, color: '#3a3a38', maxWidth: 680, fontWeight: 400,
  },
  heroButtons: {
    marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap',
  },
  twoCol: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 100, alignItems: 'start' },
  lead: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 26, lineHeight: 1.4, color: '#1a1a1a', marginBottom: 28, fontWeight: 400 },
  leadAccent: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#1a1a1a' },
  aside: { padding: 24, background: '#fafaf6', border: '1px solid #e2e0da', borderRadius: 4 },
  footer: { borderTop: '1px solid #e2e0da', marginTop: 80 },
};
