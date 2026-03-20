import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ScrollProgress from '../components/ScrollProgress';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WorkSection from '../components/WorkSection';
import AboutSection from '../components/AboutSection';
import ConnectSection from '../components/ConnectSection';
import SectionNav from '../components/SectionNav';

export default function HomePage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>JozeDzn — Motion · 3D · Web · Games</title>
        <meta name="description" content="JozeDzn — Creative Developer based in Mexico. Motion Graphics, 3D Art, Web Design, and Game Development." />
        <link rel="canonical" href="https://jozedzn.com/" />
        <meta property="og:url"   content="https://jozedzn.com/" />
        <meta property="og:title" content="JozeDzn — Motion · 3D · Web · Games" />
      </Helmet>
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
