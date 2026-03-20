import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollProgress from './ScrollProgress';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import Hero from './Hero';
import WorkSection from './WorkSection';
import AboutSection from './AboutSection';
import ConnectSection from './ConnectSection';
import SectionNav from './SectionNav';

export default function HomePage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <SectionNav />
      <div className="page-wrapper">
        <Hero />
        <WorkSection />
        <AboutSection key={i18n.language} />
        <ConnectSection key={`connect-${i18n.language}`} />
      </div>
    </>
  );
}
