import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollProgress from './ScrollProgress';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import Hero from './Hero';
import WorkSection from './WorkSection';
import AboutSection from './AboutSection';
import ConnectSection from './ConnectSection';
import SectionNav from './SectionNav';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Conectar Lenis con GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;

    return () => {
      window.__lenis = null;
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
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
