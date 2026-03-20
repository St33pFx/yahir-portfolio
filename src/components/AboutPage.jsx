import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollProgress from './ScrollProgress';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import AboutSection from './AboutSection';
import ConnectSection from './ConnectSection';

export default function AboutPage() {
  const { i18n } = useTranslation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <div className="page-wrapper">
        <AboutSection key={i18n.language} />
        <ConnectSection key={`connect-${i18n.language}`} />
      </div>
    </>
  );
}
