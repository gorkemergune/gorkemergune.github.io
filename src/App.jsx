import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ArrowUpRight, Sparkles, Globe, Menu, X, Search, Github, Linkedin, Mail } from 'lucide-react';
import { useLang } from './i18n.jsx';
import { FEATURES } from './config';
import CommandPalette from './components/CommandPalette';
import Home from './pages/Home';

// Route-level code-splitting keeps the landing bundle small (better LCP/TBT).
const FunHub = lazy(() => import('./pages/FunHub'));
const GiftBoxPage = lazy(() => import('./pages/GiftBoxPage'));
const ScratchCardPage = lazy(() => import('./pages/ScratchCardPage'));
const ConstellationPage = lazy(() => import('./pages/ConstellationPage'));
const LightsOutPage = lazy(() => import('./pages/LightsOutPage'));
const StopClockPage = lazy(() => import('./pages/StopClockPage'));
const FortuneCookiePage = lazy(() => import('./pages/FortuneCookiePage'));
const OddOneOutPage = lazy(() => import('./pages/OddOneOutPage'));
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
const ComplimentCardsPage = lazy(() => import('./pages/ComplimentCardsPage'));
const LoveMeterPage = lazy(() => import('./pages/LoveMeterPage'));
const SpinWheelPage = lazy(() => import('./pages/SpinWheelPage'));
const MothersDay = lazy(() => import('./pages/MothersDay'));
const GoOutPage = lazy(() => import('./pages/GoOutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const CompetitionsPage = lazy(() => import('./pages/CompetitionsPage'));
const ResearchPage = lazy(() => import('./pages/ResearchPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));
const LearningPathPage = lazy(() => import('./pages/LearningPathPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const AppsPage = lazy(() => import('./pages/AppsPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));

// /blog/<slug> → the same essay as a book in Articles → Writing Library.
function BlogRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/articles?book=write-${slug}`} replace />;
}

export default function App() {
  const [time, setTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
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

  // The nav sits over the hero photograph on the home page and only gains its
  // solid background once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location.pathname]);

  const navCls = (path) => `link-hover${location.pathname === path || location.pathname.startsWith(path + '/') ? ' active' : ''}`;

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        /* ---- Design tokens (Phase 1 design system) ----------------------
           Every colour and font below is the single source; components use
           the variables, not literals. Primary is for links, active states
           and selected accents only; most colour comes from imagery. */
        :root {
          --font-display: 'Space Grotesk', system-ui, sans-serif;
          --font-body: 'Hanken Grotesk', system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', ui-monospace, monospace;
          --c-primary: #00F0FF; --c-primary-hover: #66F6FF; --c-on-primary: #041114;
          --c-secondary: #38BDF8; --c-tertiary: #F59E0B;
          --c-bg: #0A0C10; --c-surface: #111419; --c-surface-2: #161a21;
          --c-line: #1e222b; --c-line-strong: #2c313c;
          --c-ink: #eef0f4; --c-body: #9aa1ad; --c-meta: #6b7280;
          --radius: 2px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #0a0c10; scroll-behavior: smooth; overflow-x: hidden; }

        ::selection { background: #00f0ff; color: #0a0c10; }

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

        .hairline { height: 1px; background: linear-gradient(90deg, transparent, #1e222b 20%, #1e222b 80%, transparent); }

        .link-hover { position: relative; display: inline-flex; align-items: center; gap: 6px; transition: opacity 0.3s; }
        .link-hover:hover { opacity: 0.55; }
        .link-hover svg { transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .link-hover:hover svg { transform: translate(3px, -3px); }

        .row-hover { transition: background 0.4s, padding-left 0.4s; }
        .row-hover:hover { background: #13161c; padding-left: 28px !important; }

        .chip {
          display: inline-block; padding: 4px 10px; border: 1px solid var(--c-line); border-radius: var(--radius);
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em;
          text-transform: uppercase; color: #8b929e; background: #111419;
        }

        .n-large { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em; color: #4b515c; }

        .marquee-wrap { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        .marquee { display: flex; gap: 48px; animation: slide 40s linear infinite; white-space: nowrap; }
        @keyframes slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        a { color: inherit; text-decoration: none; }

        .ball-btn:hover { transform: scale(1.1) !important; }
        .puzzle-btn:hover { background: #13161c !important; border-color: #1e222b !important; }

        .lang-btn { transition: opacity 0.3s; }
        .lang-btn:hover { opacity: 0.6; }

        .hero-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 24px; border: 1px solid var(--c-line-strong); border-radius: var(--radius);
          font-family: var(--font-mono); font-size: 11.5px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--c-ink); background: var(--c-surface-2);
          cursor: pointer; transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          text-decoration: none;
        }
        .hero-btn:hover { border-color: var(--c-primary); }


        .hero-btn-primary { background: var(--c-primary); color: var(--c-on-primary); border-color: var(--c-primary); }
        .hero-btn-primary svg { color: var(--c-on-primary) !important; }
        .hero-btn-primary:hover { background: var(--c-primary-hover); border-color: var(--c-primary-hover); }

        .cmdk-btn {
          display: inline-flex; align-items: center; gap: 7px; padding: 6px 11px;
          border: 1px solid #1e222b; border-radius: 6px; background: rgba(15,15,26,0.6);
          color: #9aa1ad; cursor: pointer; transition: border-color 0.3s, color 0.3s;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
        }
        .cmdk-btn:hover { border-color: #00f0ff; color: #e0e0e8; }

        .page-enter { animation: page-fade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
        @keyframes page-fade { from { opacity: 0; } to { opacity: 1; } }

        .skip-link {
          position: fixed; top: -60px; left: 12px; z-index: 400;
          background: #00f0ff; color: #0a0c10; padding: 10px 18px; border-radius: 6px;
          font-family: var(--font-body); font-size: 14px; font-weight: 600;
          transition: top 0.2s; text-decoration: none;
        }
        .skip-link:focus { top: 12px; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid #00f0ff; outline-offset: 3px; border-radius: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }
        }
        @media (max-width: 520px) { .cmdk-label { display: none; } }

        .hamburger { display: none; align-items: center; justify-content: center; width: 40px; height: 40px; padding: 0; cursor: pointer; color: #f2f4f8; background: rgba(10,12,16,0.55); border: 1px solid rgba(255,255,255,0.2); border-radius: var(--radius); transition: border-color 0.3s, background 0.3s; }
        .hamburger:hover, .hamburger[aria-expanded="true"] { border-color: var(--c-primary); background: rgba(10,12,16,0.85); }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
        /* Home sections fade in once (Home.jsx adds .in via IntersectionObserver). */
        [data-reveal] { opacity: 0; transform: translateY(18px); transition: opacity 0.7s cubic-bezier(0.2,0.8,0.2,1), transform 0.7s cubic-bezier(0.2,0.8,0.2,1); }
        [data-reveal].in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { [data-reveal] { opacity: 1; transform: none; transition: none; } }

        :root { --nav-h: 67px; }
        @media (max-width: 600px) { :root { --nav-h: 59px; } }

        /* Nav: solid charcoal everywhere, transparent while it sits over the
           home photograph. */
        .site-nav { background: rgba(9, 9, 13, 0.9); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #1e222b; transition: background 0.45s, border-color 0.45s; }
        .site-nav.over-photo { background: linear-gradient(180deg, rgba(7,7,11,0.6), rgba(7,7,11,0)) no-repeat; backdrop-filter: none; -webkit-backdrop-filter: none; border-bottom-color: transparent; }
        .brand-name { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #c6cdd8; }
        @media (max-width: 400px) { .site-nav .brand-name { display: none; } }
        /* Nav identity: the illustrated avatar (tasks/source-assets/gorkem-pp-illustrated.png,
           served at 64/128/256 px). The Experience page keeps the real photo. */
        .brand-avatar { display: block; width: 38px; height: 38px; flex: none; border-radius: 50%; overflow: hidden; box-shadow: 0 0 0 1px rgba(0,240,255,0.35); transition: box-shadow 0.3s; }
        .brand-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .brand:hover .brand-avatar, .brand:focus-visible .brand-avatar { box-shadow: 0 0 0 1px rgba(0,240,255,0.8), 0 0 14px rgba(0,240,255,0.35); }
        .brand .brand-name { padding-left: 14px; border-left: 1px solid #2c313c; line-height: 1.2; }
        @media (max-width: 600px) { .brand-avatar { width: 34px; height: 34px; } }

        .page-horizon { position: absolute; top: 0; left: 0; right: 0; height: 520px; z-index: 0; pointer-events: none;
          background: url('/media/hero-workspace-1280.webp') 100% 45% / cover no-repeat; opacity: 0.22;
          -webkit-mask-image: linear-gradient(180deg, #000 0%, rgba(0,0,0,0.5) 45%, transparent 100%);
          mask-image: linear-gradient(180deg, #000 0%, rgba(0,0,0,0.5) 45%, transparent 100%); }
        @media (max-width: 700px) { .page-horizon { height: 380px; background-position: 86% 50%; } }


        /* ---- Home design system (October 2026, second pass) ----------------
           One wrap width, one section rhythm, one kicker, two title sizes, one
           link style, one image treatment. Every home section uses these. */
        :root { --ds-gutter: 48px; --ds-section: 96px; --ds-line: var(--c-line); --ds-line-soft: rgba(44,49,60,0.6);
          --ds-ink: var(--c-ink); --ds-dim: #8a919d; --ds-body: var(--c-body); --ds-meta: var(--c-meta); --ds-accent: var(--c-primary); }
        @media (max-width: 900px) { :root { --ds-gutter: 28px; --ds-section: 80px; } }
        @media (max-width: 600px) { :root { --ds-gutter: 16px; --ds-section: 64px; } }
        .ds-wrap { max-width: 1400px; margin: 0 auto; padding-left: var(--ds-gutter); padding-right: var(--ds-gutter); position: relative; z-index: 2; }
        .ds-section { padding-top: var(--ds-section); padding-bottom: var(--ds-section); border-top: 1px solid var(--ds-line); position: relative; z-index: 2; }
        .ds-kicker { display: inline-flex; align-items: center; gap: 12px; font-family: var(--font-mono); font-size: 11px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ds-dim); }
        .ds-kicker::before { content: ''; width: 1px; height: 12px; background: var(--ds-accent); flex: none; }
        .ds-h2 { font-family: var(--font-display); font-weight: 400; font-size: clamp(32px, 3.1vw, 44px); line-height: 1.1; letter-spacing: -0.02em; color: var(--ds-ink); margin: 20px 0 0; }
        .ds-h2 .dim, .ds-h1 .dim { color: var(--ds-dim); }
        .ds-h3 { font-family: var(--font-display); font-weight: 500; font-size: 18px; line-height: 1.3; letter-spacing: -0.005em; color: var(--ds-ink); }
        .ds-body { font-family: var(--font-body); font-size: 15px; line-height: 1.65; color: var(--ds-body); }
        .ds-meta { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ds-meta); }
        .ds-link { display: inline-flex; align-items: center; gap: 12px; padding-bottom: 6px; border-bottom: 1px solid rgba(0,240,255,0.45); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #dfe5ee; transition: color 0.3s, border-color 0.3s; }
        .ds-link:hover { color: var(--ds-accent); border-color: var(--ds-accent); }
        .ds-link svg { transition: transform 0.35s cubic-bezier(0.2,0.8,0.2,1); }
        .ds-link:hover svg { transform: translateX(4px); }
        .ds-media { position: relative; overflow: hidden; background: #0c0c14; border: 1px solid var(--ds-line); }
        .ds-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: saturate(0.88) brightness(0.9); transition: transform 0.9s cubic-bezier(0.2,0.8,0.2,1), filter 0.6s; }
        a:hover .ds-media img, .ds-media:hover img { transform: scale(1.03); filter: saturate(1) brightness(1); }
        .ds-media img.ds-contain { object-fit: contain; padding: 6%; }
        .ds-head { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 32px 64px; align-items: end; margin-bottom: 56px; }
        @media (max-width: 900px) { .ds-head { grid-template-columns: 1fr; margin-bottom: 40px; } }
        /* Buttons: primary · secondary · inverted · outlined */
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 14px; padding: 14px 22px; border: 1px solid transparent; border-radius: var(--radius); font-family: var(--font-mono); font-size: 11.5px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; line-height: 1; cursor: pointer; transition: background 0.3s, color 0.3s, border-color 0.3s; }
        .btn svg { transition: transform 0.35s cubic-bezier(0.2,0.8,0.2,1); }
        .btn:hover svg { transform: translateX(4px); }
        .btn-primary { background: var(--c-primary); border-color: var(--c-primary); color: var(--c-on-primary); }
        .btn-primary:hover { background: var(--c-primary-hover); border-color: var(--c-primary-hover); }
        .btn-secondary { background: var(--c-surface-2); border-color: var(--c-line-strong); color: var(--c-ink); }
        .btn-secondary:hover { border-color: var(--c-primary); }
        .btn-inverted { background: var(--c-ink); border-color: var(--c-ink); color: var(--c-bg); }
        .btn-inverted:hover { background: var(--c-primary); border-color: var(--c-primary); }
        .btn-outline { background: rgba(10,12,16,0.35); border-color: rgba(238,240,244,0.6); color: var(--c-ink); }
        .btn-outline:hover { background: var(--c-ink); border-color: var(--c-ink); color: var(--c-bg); }
        /* Icon button, search field, compact label, progress */
        .icon-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-width: 34px; height: 34px; padding: 0 10px; border: 1px solid var(--c-line); border-radius: var(--radius); background: rgba(17,20,25,0.6); color: var(--c-body); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; cursor: pointer; transition: border-color 0.3s, color 0.3s; }
        .icon-btn:hover { border-color: var(--c-primary); color: var(--c-ink); }
        .field { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border: 1px solid var(--c-line); border-radius: var(--radius); background: var(--c-surface); transition: border-color 0.3s, box-shadow 0.3s; }
        .field:focus-within { border-color: var(--c-primary); box-shadow: 0 0 0 1px rgba(0,240,255,0.18); }
        .field input { flex: 1; min-width: 0; background: transparent; border: none; outline: none; color: var(--c-ink); font-family: var(--font-body); font-size: 14.5px; }
        .field input::placeholder { color: var(--c-meta); }
        .label { display: inline-flex; align-items: center; gap: 6px; padding: 3px 8px; border: 1px solid var(--c-line-strong); border-radius: var(--radius); font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-body); }
        .label-primary { border-color: rgba(0,240,255,0.4); color: var(--c-primary); }
        .label-secondary { border-color: rgba(56,189,248,0.4); color: var(--c-secondary); }
        .label-tertiary { border-color: rgba(245,158,11,0.4); color: var(--c-tertiary); }
        .progress { height: 2px; background: var(--c-line); overflow: hidden; }
        .progress > span { display: block; height: 100%; background: var(--c-ink); transform-origin: left; }
        .nav-links a.active { color: var(--c-ink); box-shadow: inset 0 -1px 0 var(--c-primary); padding-bottom: 6px; }

        .fun-spark { color: #6b7280; border-color: transparent; background: transparent; min-width: 34px; }
        .fun-spark:hover, .fun-spark:focus-visible, .fun-spark.on { color: var(--c-tertiary); border-color: rgba(245,158,11,0.45); }
        .fun-spark:hover svg, .fun-spark:focus-visible svg { animation: fun-twinkle 0.9s ease-in-out; }
        @keyframes fun-twinkle { 0% { transform: scale(1) rotate(0); } 40% { transform: scale(1.25) rotate(18deg); } 100% { transform: scale(1) rotate(0); } }
        .mobile-fun { display: inline-flex; align-items: center; gap: 8px; color: #8a919d !important; font-size: 13px !important; border-bottom: none !important; }
        .tech-logos { list-style: none; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; }
        .tech-logos li { display: inline-flex; align-items: center; gap: 7px; }
        .tech-logos img { width: 16px; height: 16px; object-fit: contain; flex: none; }
        .tech-logos span { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.02em; color: #a3acbb; white-space: nowrap; }
        .ds-block + .ds-block { margin-top: 72px; }
        .ds-subhead { display: flex; justify-content: space-between; align-items: baseline; gap: 8px 24px; flex-wrap: wrap; margin-bottom: 18px; }
        .ds-subhead p { font-family: var(--font-body); font-size: 14px; color: var(--ds-meta); }
        .ds-cells { list-style: none; display: grid; border-top: 1px solid var(--ds-line); border-left: 1px solid var(--ds-line); }
        .ds-cells > * { border-right: 1px solid var(--ds-line); border-bottom: 1px solid var(--ds-line); min-width: 0; }
        .ds-cell { display: flex; flex-direction: column; gap: 10px; height: 100%; padding: 24px; color: inherit; transition: background 0.35s; }
        a.ds-cell:hover { background: rgba(15,15,26,0.7); }
        @media (max-width: 600px) { .ds-block + .ds-block { margin-top: 56px; } .ds-cell { padding: 20px 16px; } }

        .site-footer .footer-inner { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 24px 40px; align-items: center; padding: 40px 48px 28px; max-width: 1400px; margin: 0 auto; }
        .footer-id { display: flex; flex-direction: column; gap: 6px; }
        .footer-brand .brand-name { padding-left: 0; border-left: none; }
        .footer-role { font-family: var(--font-body); font-size: 13px; color: #8a919d; }
        .footer-social { display: flex; gap: 20px; color: #9aa1ad; }
        .footer-social a { transition: color 0.3s; display: inline-flex; }
        .footer-social a:hover { color: #00f0ff; }
        .site-footer .footer-base { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding: 18px 48px 30px; max-width: 1400px; margin: 0 auto; border-top: 1px solid #14171d; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.12em; color: #5c6370; font-variant-numeric: tabular-nums; }
        @media (max-width: 760px) {
          .site-footer .footer-inner { gap: 20px; padding: 36px 16px 22px; }
          .site-footer .footer-base { padding: 16px 16px 26px; }
        }

        .nav-links { display: flex; gap: 22px; font-size: 11px; font-family: var(--font-mono); letter-spacing: 0.14em; text-transform: uppercase; color: #9aa3b2; white-space: nowrap; }
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

        /* The nav carries ten links; in Turkish they need more room than
           the general tablet breakpoint gives, so the menu collapses earlier. */
        /* Eleven nav items (Experience added in Phase 2): the clock gives way
           first, the links collapse into the menu at 1280px as before. */
        @media (max-width: 1560px) { .nav-right .clock-display { display: none !important; } }
        @media (max-width: 1280px) {
          .nav-links { display: none !important; }
          .nav-right .clock-display { display: none !important; }
          .hamburger { display: inline-flex !important; }
          /* Hamburger mode: the bar always has a surface, even over the hero photo. */
          .site-nav.over-photo { background: rgba(10,12,16,0.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom-color: rgba(255,255,255,0.06); }
          .mobile-menu { display: flex !important; }
        }

        @media (max-width: 900px) {
          .hero-name { font-size: 84px !important; }
          .section-title { font-size: 44px !important; }
          .two-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
          .nav-links { display: none !important; }
          .nav-right .clock-display { display: none !important; }
          .hamburger { display: inline-flex !important; }
          /* Hamburger mode: the bar always has a surface, even over the hero photo. */
          .site-nav.over-photo { background: rgba(10,12,16,0.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom-color: rgba(255,255,255,0.06); }
          .mobile-menu { display: flex !important; }
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

      <div className="grain" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }} />

      {/* NAV */}
      <nav className={`site-nav${isHome && !scrolled && !menuOpen ? ' over-photo' : ''}`} style={styles.nav}>
        <div className="container nav-inner" style={styles.navInner}>
          <Link to="/" style={styles.mark} className="brand" aria-label="Görkem Ergüne — home">
            <picture className="brand-avatar">
              <source srcSet="/media/avatar-64.webp 1x, /media/avatar-128.webp 2x, /media/avatar-256.webp 4x" type="image/webp" />
              <img src="/media/avatar-128.jpg" alt="Görkem Ergüne" width="38" height="38" decoding="async" />
            </picture>
            <span className="brand-name">Görkem Ergüne</span>
          </Link>
          <div className="nav-links" style={styles.navLinks}>
            <Link to="/project" className={navCls('/project')} style={{ cursor: 'pointer' }}>{t('navProject')}</Link>
            <Link to="/experience" className={navCls('/experience')} style={{ cursor: 'pointer' }}>{t('navExperience')}</Link>
            <Link to="/competitions" className={navCls('/competitions')} style={{ cursor: 'pointer' }}>{t('navCompetitions')}</Link>
            <Link to="/research" className={navCls('/research')} style={{ cursor: 'pointer' }}>{t('navResearch')}</Link>
            <Link to="/articles" className={navCls('/articles')} style={{ cursor: 'pointer' }}>{t('navArticles')}</Link>
            <Link to="/learning-path" className={navCls('/learning-path')} style={{ cursor: 'pointer' }}>{t('navLearning')}</Link>
            <Link to="/apps" className={navCls('/apps')} style={{ cursor: 'pointer' }}>{t('navApps')}</Link>
            <Link to="/contact" className={navCls('/contact')} style={{ cursor: 'pointer', color: '#e0e0e8' }}>
              {t('navContact')} <ArrowUpRight size={12} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              className="icon-btn"
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              aria-label="Open command palette"
              style={styles.cmdkBtn}
            >
              <Search size={13} strokeWidth={1.6} />
              <span className="cmdk-label">⌘K</span>
            </button>
            {/* Fun is an easter egg: a small spark, not a nav item (Phase 6.1). */}
            <Link to="/fun" className={`icon-btn fun-spark${location.pathname.startsWith('/fun') ? ' on' : ''}`} aria-label={t('funSpark')} title={t('funSpark')}>
              <Sparkles size={14} strokeWidth={1.6} aria-hidden="true" />
            </Link>
            <button onClick={toggleLang} className="icon-btn" aria-label="Toggle language">
              <Globe size={13} strokeWidth={1.5} />
              {lang === 'en' ? 'TR' : 'EN'}
            </button>
            <div className="clock-display" style={styles.clock}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00f0ff', display: 'inline-block' }} />
              <span>{time} IST</span>
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen} aria-controls="mobile-menu">
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div id="mobile-menu" className="mobile-menu" style={styles.mobileMenu}>
            <Link to="/project" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navProject')}</Link>
            <Link to="/experience" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navExperience')}</Link>
            <Link to="/competitions" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navCompetitions')}</Link>
            <Link to="/research" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navResearch')}</Link>
            <Link to="/articles" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navArticles')}</Link>
            <Link to="/learning-path" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navLearning')}</Link>
            <Link to="/apps" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navApps')}</Link>
            {FEATURES.resume && <Link to="/resume" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navResume')}</Link>}
            <Link to="/fun" onClick={() => setMenuOpen(false)} className="mobile-fun" style={styles.mobileMenuItem}><Sparkles size={13} strokeWidth={1.6} aria-hidden="true" /> {t('funCorner')}</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} style={styles.mobileMenuItem}>{t('navContact')}</Link>
          </div>
        )}
      </nav>

      {/* ROUTES */}
      {/* Inner pages carry a faint strip of the hero photograph behind their
          header, so every page reads as the same place. */}
      {!isHome && <div className="page-horizon" aria-hidden="true" />}

      <main id="main" key={location.pathname} className="page-enter" style={{ paddingTop: isHome ? 0 : 'var(--nav-h)' }}>
        <Suspense fallback={<div style={{ minHeight: '70vh' }} aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* The blog lives in Articles → Writing Library since Phase 6.1; old links redirect. */}
          <Route path="/blog" element={<Navigate to="/articles" replace />} />
          <Route path="/blog/:slug" element={<BlogRedirect />} />
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
          <Route path="/fun/compliments" element={<ComplimentCardsPage />} />
          <Route path="/fun/lovemeter" element={<LoveMeterPage />} />
          <Route path="/fun/wheel" element={<SpinWheelPage />} />
          <Route path="/fun/gift" element={<GiftBoxPage />} />
          <Route path="/fun/scratch" element={<ScratchCardPage />} />
          <Route path="/fun/stars" element={<ConstellationPage />} />
          <Route path="/fun/lights" element={<LightsOutPage />} />
          <Route path="/fun/stopclock" element={<StopClockPage />} />
          <Route path="/fun/fortune" element={<FortuneCookiePage />} />
          <Route path="/fun/odd" element={<OddOneOutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/learning-path" element={<LearningPathPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </main>

      <CommandPalette />

      {/* FOOTER */}
      <footer className="site-footer" style={styles.footer}>
        <div className="container footer-inner">
          <Link to="/" style={styles.mark} className="brand footer-brand" aria-label="Görkem Ergüne — home">
            <picture className="brand-avatar">
              <source srcSet="/media/avatar-64.webp 1x, /media/avatar-128.webp 2x, /media/avatar-256.webp 4x" type="image/webp" />
              <img src="/media/avatar-128.jpg" alt="Görkem Ergüne" width="38" height="38" loading="lazy" decoding="async" />
            </picture>
            <span className="footer-id">
              <span className="brand-name">Görkem Ergüne</span>
              <span className="footer-role">{t('heroTagline')}</span>
            </span>
          </Link>
          <div className="footer-social">
            <a href="https://github.com/gorkemergune" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17} strokeWidth={1.4} /></a>
            <a href="https://www.linkedin.com/in/gorkemergune/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17} strokeWidth={1.4} /></a>
            <a href="mailto:gorkemergune2@gmail.com" aria-label="Email"><Mail size={17} strokeWidth={1.4} /></a>
          </div>
        </div>
        <div className="container footer-base">
          <span>&copy; 2026 &middot; Görkem Ergüne</span>
          <span>v3.0 &middot; {time} IST</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "var(--font-body)",
    background: '#0a0c10', color: '#e0e0e8',
    minHeight: '100vh', position: 'relative', overflowX: 'hidden',
  },
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 },
  navInner: {
    maxWidth: 1400, margin: '0 auto', padding: '18px 48px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
  },
  mark: { display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 },
  dot: { width: 4, height: 4, borderRadius: '50%', background: '#00f0ff', display: 'inline-block' },
  cmdkBtn: {},
  navLinks: { display: 'flex', gap: 22, whiteSpace: 'nowrap' },
  mobileMenu: {
    display: 'flex', flexDirection: 'column', gap: 0,
    padding: '8px 0',
    borderTop: '1px solid #1e222b',
    background: 'rgba(10, 10, 15, 0.98)',
  },
  mobileMenuItem: {
    padding: '14px 48px',
    fontFamily: "var(--font-body)",
    fontSize: 15, color: '#e0e0e8',
    cursor: 'pointer',
    borderBottom: '1px solid #1e222b',
  },
  langBtn: {
    fontFamily: "var(--font-mono)",
    fontSize: 11, letterSpacing: '0.08em',
    padding: '5px 10px', border: '1px solid #1e222b',
    borderRadius: 4, background: 'transparent',
    color: '#8b929e', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center',
  },
  clock: {
    fontFamily: "var(--font-mono)", fontSize: 11,
    letterSpacing: '0.1em', color: '#8b929e',
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
    fontFamily: "var(--font-display)", fontSize: 180, fontWeight: 400,
    lineHeight: 0.88, letterSpacing: '-0.03em', color: '#e0e0e8', margin: 0,
  },
  amp: { color: '#00f0ff', fontStyle: 'italic' },
  heroMeta: { marginTop: 60, display: 'flex', gap: 80, flexWrap: 'wrap' },
  heroMetaItem: { display: 'flex', flexDirection: 'column', gap: 8 },
  heroMetaValue: { fontFamily: "var(--font-body)", fontSize: 15, color: '#e0e0e8' },
  heroTag: {
    marginTop: 72, fontFamily: "var(--font-body)",
    fontSize: 22, lineHeight: 1.5, color: '#8b929e', maxWidth: 680, fontWeight: 400,
  },
  heroButtons: {
    marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap',
  },
  introKicker: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: '0.18em',
    color: '#5c6370',
  },
  introKickerDot: { width: 7, height: 7, borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' },
  introLead: {
    fontFamily: "var(--font-body)", fontSize: 30, lineHeight: 1.4,
    color: '#e0e0e8', fontWeight: 400, marginBottom: 28, letterSpacing: '-0.01em',
  },
  introLeadEm: { fontFamily: "var(--font-display)", fontStyle: 'italic', color: '#00f0ff' },
  introBody: {
    fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.7,
    color: '#9aa1ad', maxWidth: 640,
  },
  introRolesLabel: {
    fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.16em',
    color: '#4b515c', marginBottom: 16,
  },
  introStatsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' },
  statNum: {
    fontFamily: "var(--font-display)", fontSize: 46, lineHeight: 1,
    color: '#e0e0e8', marginBottom: 8, fontVariantNumeric: 'tabular-nums',
  },
  statLabel: {
    fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#5c6370',
  },
  footer: { borderTop: '1px solid #1e222b', marginTop: 120, position: 'relative', zIndex: 2, background: '#08080c' },
};
