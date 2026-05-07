import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter, MapPin, Globe } from 'lucide-react';
import { useLang } from './i18n.jsx';
import BlogDetail from './pages/RoadmapDetail';
import FunHub from './pages/FunHub';
import SorryPage from './pages/SorryPage';
import BirthdayPage from './pages/BirthdayPage';
import HangmanPage from './pages/HangmanPage';
import PuzzlePage from './pages/PuzzlePage';
import HanoiPage from './pages/HanoiPage';

export default function App() {
  const [time, setTime] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
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
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const journeyItems = t('journeyItems');
  const focusItems = t('focusItems');
  const blogItems = t('blogItems');
  const marquee = t('marquee');

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #f4f3ef; scroll-behavior: smooth; }

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

        @media (max-width: 900px) {
          .hero-name { font-size: 84px !important; }
          .section-title { font-size: 44px !important; }
          .two-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .hero-name { font-size: 56px !important; letter-spacing: -0.02em !important; }
          .section-title { font-size: 32px !important; }
          .four-col { grid-template-columns: 1fr !important; }
          .container { padding: 24px !important; }
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
        <div className="container" style={styles.navInner}>
          <Link to="/" style={styles.mark}>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 22 }}>Gorkem</span>
            <span style={styles.dot} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: '#6b6a66' }}>EST. 20XX</span>
          </Link>
          <div style={styles.navLinks}>
            <a onClick={() => scrollToSection('about')} className="link-hover" style={{ cursor: 'pointer' }}>{t('navAbout')}</a>
            <a onClick={() => scrollToSection('journey')} className="link-hover" style={{ cursor: 'pointer' }}>{t('navJourney')}</a>
            <a onClick={() => scrollToSection('focus')} className="link-hover" style={{ cursor: 'pointer' }}>{t('navFocus')}</a>
            <a onClick={() => scrollToSection('blog')} className="link-hover" style={{ cursor: 'pointer' }}>{t('navBlog')}</a>
            <Link to="/fun" className="link-hover" style={{ cursor: 'pointer' }}>{t('navFun')}</Link>
            <a onClick={() => scrollToSection('contact')} className="link-hover" style={{ cursor: 'pointer', color: '#1a1a1a', fontWeight: 500 }}>
              {t('navContact')} <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={toggleLang} className="lang-btn" style={styles.langBtn}>
              <Globe size={13} strokeWidth={1.5} style={{ marginRight: 5, verticalAlign: -2 }} />
              {lang === 'en' ? 'TR' : 'EN'}
            </button>
            <div style={styles.clock}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6a6a66', display: 'inline-block' }} />
              <span>{time} IST</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={
          <>
            {/* HERO */}
            <section id="top" ref={heroRef} style={{ ...styles.container, ...styles.hero }} className="container">
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

              <div className="reveal reveal-3" style={styles.heroMeta}>
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

              <div className="reveal reveal-5 hairline" style={{ marginTop: 80 }} />

              <div className="reveal reveal-6 marquee-wrap" style={{ marginTop: 40 }}>
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

            {/* JOURNEY */}
            <section id="journey" className="container" style={styles.container}>
              <SectionHeader number="02" label={t('journeyLabel')} sub={t('journeySub')} />
              <div style={{ marginTop: 20 }}>
                {Array.isArray(journeyItems) && journeyItems.map((j, i) => (
                  <div key={i} className="row-hover" style={styles.journeyRow}>
                    <span className="n-large" style={{ width: 60, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={styles.journeyYear}>{j.year}</span>
                    <span style={styles.journeyTitle}>{j.title}</span>
                    <span style={styles.journeyBody}>{j.body}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FOCUS */}
            <section id="focus" className="container" style={styles.container}>
              <SectionHeader number="03" label={t('focusLabel')} sub={t('focusSub')} />
              <div className="four-col" style={styles.fourCol}>
                {Array.isArray(focusItems) && focusItems.map((f, i) => (
                  <div key={i} style={styles.focusCard}>
                    <span className="n-large">{String(i + 1).padStart(2, '0')} / {f.label.toUpperCase()}</span>
                    <h3 style={styles.focusValue}>{f.value}</h3>
                  </div>
                ))}
              </div>
            </section>

            {/* BLOG */}
            <section id="blog" className="container" style={styles.container}>
              <SectionHeader number="04" label={t('blogLabel')} sub={t('blogSub')} />
              <div style={{ marginTop: 28 }}>
                {Array.isArray(blogItems) && blogItems.map((r, i) => (
                  <Link key={i} to={`/blog/${r.slug}`} className="row-hover" style={styles.roadmapRow}>
                    <span className="chip" style={{ flexShrink: 0 }}>{r.tag}</span>
                    <span style={styles.roadmapTitle}>{r.title}</span>
                    <span style={styles.roadmapNote}>{r.note}</span>
                    {r.status === 'soon' && (
                      <span className="chip" style={{ flexShrink: 0, background: '#1a1a1a', color: '#f4f3ef', borderColor: '#1a1a1a' }}>{t('blogSoon')}</span>
                    )}
                    <ArrowUpRight size={16} strokeWidth={1.2} style={{ color: '#9a9994', flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="container" style={{ ...styles.container, paddingTop: 140, paddingBottom: 80 }}>
              <SectionHeader number="05" label={t('contactLabel')} />
              <h2 style={styles.bigContact}>
                {t('contactLine1')} {t('contactLine1') ? ' ' : ''}<em className="metallic" style={{ fontStyle: 'italic' }}>{t('contactLine1Em')}</em>.<br />
                {t('contactLine2')}
              </h2>
              <div style={styles.contactLinks}>
                <a href="mailto:gorkemergune2@gmail.com" className="link-hover" style={styles.contactLink}>
                  <Mail size={16} strokeWidth={1.3} /> gorkemergune2@gmail.com
                </a>
                <a href="https://github.com/gorkemergune" className="link-hover" style={styles.contactLink}>
                  <Github size={16} strokeWidth={1.3} /> github/gorkemergune
                </a>
                <a href="https://www.linkedin.com/in/gorkemergune/" className="link-hover" style={styles.contactLink}>
                  <Linkedin size={16} strokeWidth={1.3} /> linkedin/gorkemergune
                </a>
              </div>
            </section>
          </>
        } />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/fun" element={<FunHub />} />
        <Route path="/fun/sorry" element={<SorryPage />} />
        <Route path="/fun/birthday" element={<BirthdayPage />} />
        <Route path="/fun/hangman" element={<HangmanPage />} />
        <Route path="/fun/puzzle" element={<PuzzlePage />} />
        <Route path="/fun/hanoi" element={<HanoiPage />} />
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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 0', borderBottom: '1px solid #e2e0da' }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a8a86' }}>{label}</span>
      <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: '#2a2a28' }}>{value}</span>
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'Instrument Sans', system-ui, sans-serif",
    background: '#f4f3ef', color: '#1a1a1a',
    minHeight: '100vh', position: 'relative', overflow: 'hidden',
  },
  nav: {
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(244, 243, 239, 0.85)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid #e2e0da',
  },
  navInner: {
    maxWidth: 1400, margin: '0 auto', padding: '18px 48px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40,
  },
  mark: { display: 'flex', alignItems: 'center', gap: 10 },
  dot: { width: 4, height: 4, borderRadius: '50%', background: '#9a9994', display: 'inline-block' },
  navLinks: {
    display: 'flex', gap: 28, fontSize: 13,
    fontFamily: "'Instrument Sans', sans-serif", color: '#4a4a48',
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
  twoCol: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 100, alignItems: 'start' },
  lead: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 26, lineHeight: 1.4, color: '#1a1a1a', marginBottom: 28, fontWeight: 400 },
  leadAccent: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#1a1a1a' },
  body: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.75, color: '#4a4a48', marginBottom: 18, maxWidth: 560 },
  aside: { padding: 24, background: '#fafaf6', border: '1px solid #e2e0da', borderRadius: 4 },
  journeyRow: { display: 'flex', gap: 24, padding: '24px 16px', borderTop: '1px solid #e2e0da', alignItems: 'baseline', cursor: 'default' },
  journeyYear: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.08em', color: '#6b6a66', width: 80, flexShrink: 0 },
  journeyTitle: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 24, color: '#1a1a1a', width: 260, flexShrink: 0 },
  journeyBody: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.6, color: '#4a4a48', flex: 1 },
  fourCol: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 },
  focusCard: { padding: 28, background: '#fafaf6', border: '1px solid #e2e0da', borderRadius: 4, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.4s, border-color 0.4s' },
  focusValue: { fontFamily: "'Instrument Serif', serif", fontSize: 24, fontWeight: 400, lineHeight: 1.2, color: '#1a1a1a', marginTop: 20 },
  roadmapRow: { display: 'flex', alignItems: 'center', gap: 28, padding: '24px 16px', borderTop: '1px solid #e2e0da', cursor: 'pointer' },
  roadmapTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#1a1a1a', width: 280, flexShrink: 0 },
  roadmapNote: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: '#6b6a66', flex: 1 },
  noteRow: { display: 'flex', alignItems: 'baseline', gap: 20, padding: '22px 16px', borderTop: '1px solid #e2e0da' },
  noteTitle: { fontFamily: "'Instrument Serif', serif", fontSize: 24, color: '#1a1a1a' },
  noteDate: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8a8a86', letterSpacing: '0.06em' },
  bigContact: { fontFamily: "'Instrument Serif', serif", fontSize: 120, fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.02em', color: '#1a1a1a', margin: '40px 0 60px' },
  contactLinks: { display: 'flex', flexDirection: 'column', gap: 18, fontSize: 18, fontFamily: "'Instrument Sans', sans-serif", color: '#2a2a28' },
  contactLink: { display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid transparent' },
  footer: { borderTop: '1px solid #e2e0da', marginTop: 80 },
};
