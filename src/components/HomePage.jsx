import { useEffect, useMemo } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { createI18nInstance } from '../i18n';
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
import { shouldReduceMotion } from '../utils/motion';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage({ initialLang = 'en' }) {
  const pageI18n = useMemo(() => createI18nInstance(initialLang), [initialLang]);

  return (
    <I18nextProvider i18n={pageI18n}>
      <HomePageContent />
    </I18nextProvider>
  );
}

function HomePageContent() {
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (shouldReduceMotion()) {
      window.__lenis = null;
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Conectar Lenis con GSAP ScrollTrigger
    const updateLenis = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;

    return () => {
      window.__lenis = null;
      lenis.off?.('scroll', ScrollTrigger.update);
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <SectionNav />
      <main className="page-wrapper" id="main-content">
        <Hero />
        <WorkSection />
        <AboutSection key={i18n.language} />
        <ConnectSection key={`connect-${i18n.language}`} />
      </main>
    </>
  );
}
