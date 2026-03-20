import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import ConnectSection from './ConnectSection';

export default function ContactPage() {
  const { i18n } = useTranslation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="page-wrapper">
        <ConnectSection key={`connect-${i18n.language}`} />
      </div>
    </>
  );
}
