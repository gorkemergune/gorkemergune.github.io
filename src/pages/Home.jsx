import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import GooeyNav from '../components/GooeyNav';
import ScrambledText from '../components/ScrambledText';
import FeaturedMetrics from '../components/FeaturedMetrics';
import LiveStatus from '../components/LiveStatus';
import AlgorithmJourney from '../components/AlgorithmJourney';
import FeaturedProject from '../components/FeaturedProject';
import CurrentlyBuilding from '../components/CurrentlyBuilding';
import GitHubActivity from '../components/GitHubActivity';
import HuggingFaceActivity from '../components/HuggingFaceActivity';

export default function Home() {
  const { t } = useLang();
  const roles = t('introRoles');
  useSeo({ description: t('heroSubtext'), path: '/' });

  return (
    <>
      {/* IDENTITY / STORY */}
      <section id="identity" className="container" style={s.section}>
        <style>{`
          .home-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 72px; align-items: start; }
          .role-pill { display: inline-flex; align-items: center; gap: 7px; padding: 8px 14px; border: 1px solid #1a1a2e; border-radius: 999px; background: rgba(15,15,26,0.5); font-family: 'Instrument Sans', sans-serif; font-size: 13px; color: #b6b6ca; transition: all 0.35s cubic-bezier(0.2,0.8,0.2,1); cursor: default; }
          .role-pill:hover { border-color: #00d4ff; color: #fff; box-shadow: 0 0 18px rgba(0,212,255,0.16); transform: translateY(-2px); }
          .role-pill .rp-dot { width: 5px; height: 5px; border-radius: 50%; background: #00d4ff; box-shadow: 0 0 6px #00d4ff; }
          @media (max-width: 900px) { .home-grid { grid-template-columns: 1fr !important; gap: 44px !important; } .home-lead { font-size: 26px !important; } }
          @media (max-width: 600px) { .home-lead { font-size: 22px !important; } }
        `}</style>

        <div style={s.kicker}><span style={s.kickerDot} />{t('introKicker')}</div>

        <div className="home-grid" style={{ marginTop: 40 }}>
          <div>
            <p className="home-lead" style={s.lead}>
              {t('introLeadPre')}
              <em style={s.leadEm}>{t('introLeadEm')}</em>
              {t('introLeadPost')}
            </p>
            <ScrambledText style={s.body} radius={90} duration={1.1} speed={0.5} scrambleChars=".:">
              {t('introBody')}
            </ScrambledText>
            <div style={s.ctaRow}>
              <GooeyNav
                items={[
                  { label: t('introCtaProjects'), href: '/project' },
                  { label: t('navResearch'), href: '/research' },
                  { label: t('navFun'), href: '/fun' },
                  { label: t('introCtaContact'), href: '/contact' },
                ]}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={0}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              />
            </div>
          </div>
          <div>
            <div style={s.rolesLabel}>{t('introRolesLabel')}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {Array.isArray(roles) && roles.map((r) => (
                <span key={r} className="role-pill"><span className="rp-dot" />{r}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturedMetrics />
      <LiveStatus />
      <AlgorithmJourney />
      <FeaturedProject />
      <CurrentlyBuilding />
      <GitHubActivity />
      <HuggingFaceActivity />
    </>
  );
}

const s = {
  section: { maxWidth: 1400, margin: '0 auto', padding: '110px 48px 40px', position: 'relative', zIndex: 2 },
  kicker: { display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', color: '#6a6a82' },
  kickerDot: { width: 7, height: 7, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' },
  lead: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 30, lineHeight: 1.4, color: '#eef0f6', fontWeight: 400, marginBottom: 28, letterSpacing: '-0.01em' },
  leadEm: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#00d4ff' },
  body: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 17, lineHeight: 1.7, color: '#a2a2b8', maxWidth: 640 },
  ctaRow: { display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 40 },
  rolesLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.16em', color: '#5a5a70', marginBottom: 16 },
};
