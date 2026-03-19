import { useEffect } from 'react';
import ScrollProgress from '../components/ScrollProgress';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WorkSection from '../components/WorkSection';
import AboutSection from '../components/AboutSection';
import ConnectSection from '../components/ConnectSection';
import SectionNav from '../components/SectionNav';

export default function HomePage() {
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
        <AboutSection />
        <ConnectSection />
      </div>
    </>
  );
}
