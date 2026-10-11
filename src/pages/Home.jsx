import { useEffect } from 'react';
import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import CinematicHero from '../components/CinematicHero';
import ProfileSummary from '../components/home/ProfileSummary';
import ExploreConsole from '../components/home/ExploreConsole';
import ProjectShowcase from '../components/home/ProjectShowcase';
import RepoShowcase from '../components/home/RepoShowcase';
import ClosingContact from '../components/home/ClosingContact';

// Phase 7: the home page is an introduction, not a directory. A short,
// cinematic sequence — hero → who I am (profile summary) → the eight doors →
// selected projects → code and models → contact — and
// every detail lives on its own page.
// Sections marked [data-reveal] fade in once as they enter the viewport;
// without IntersectionObserver or with reduced motion they are simply shown.
export default function Home() {
  const { t } = useLang();
  useSeo({ description: t('heroSubtext'), path: '/' });

  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]')];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return undefined; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <CinematicHero />
      <ProfileSummary />
      <ExploreConsole />
      <ProjectShowcase />
      <RepoShowcase />
      <ClosingContact />
    </>
  );
}
