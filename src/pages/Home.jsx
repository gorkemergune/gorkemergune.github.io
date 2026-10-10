import { useLang } from '../i18n.jsx';
import { useSeo } from '../hooks/useSeo';
import CinematicHero from '../components/CinematicHero';
import SelectedWork from '../components/SelectedWork';
import { ExperienceSection, ResearchSection } from '../components/ProfileSections';
import ArmoryIndex from '../components/ArmoryIndex';
import FeaturedMetrics from '../components/FeaturedMetrics';
import AlgorithmJourney from '../components/AlgorithmJourney';
import CurrentlyBuilding from '../components/CurrentlyBuilding';
import GitHubActivity from '../components/GitHubActivity';
import HuggingFaceActivity from '../components/HuggingFaceActivity';
import LiveStatus from '../components/LiveStatus';
import TwoTone from '../components/TwoTone';

// Page order: the workspace and the name, the selected work, who is behind it
// (experience, research), every build, the numbers, live activity.
// Every section is a .ds-section on the .ds-wrap grid defined in App.jsx.
export default function Home() {
  const { t } = useLang();
  useSeo({ description: t('heroSubtext'), path: '/' });

  return (
    <>
      <CinematicHero />
      <SelectedWork />
      <ExperienceSection />
      <ResearchSection />
      <ArmoryIndex />

      <section className="ds-section" aria-labelledby="home-numbers">
        <div className="ds-wrap">
          <div className="ds-head">
            <div>
              <div className="ds-kicker">{t('numbersKicker')}</div>
              <h2 id="home-numbers" className="ds-h2"><TwoTone text={t('numbersTitle')} /></h2>
            </div>
          </div>
          <FeaturedMetrics />
          <AlgorithmJourney />
        </div>
      </section>

      <section className="ds-section" aria-labelledby="home-live">
        <div className="ds-wrap">
          <div className="ds-head">
            <div>
              <div className="ds-kicker">{t('liveKicker')}</div>
              <h2 id="home-live" className="ds-h2"><TwoTone text={t('liveTitle')} /></h2>
            </div>
          </div>
          <CurrentlyBuilding />
          <GitHubActivity />
          <HuggingFaceActivity />
          <LiveStatus />
        </div>
      </section>
    </>
  );
}
