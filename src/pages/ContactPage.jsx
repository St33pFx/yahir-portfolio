import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import ConnectSection from '../components/ConnectSection';

export default function ContactPage() {
  const { i18n } = useTranslation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Contact — JozeDzn | Creative Developer</title>
        <meta name="description" content="Get in touch with JozeDzn — Creative Developer based in Mexico. Available for motion graphics, 3D art, web development, and interactive experience projects. hello@jozedzn.com" />
        <link rel="canonical" href="https://jozedzn.com/contact" />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://jozedzn.com/contact" />
        <meta property="og:title"       content="Contact JozeDzn — Creative Developer" />
        <meta property="og:description" content="Available for motion graphics, 3D art, web development, and interactive experience projects. hello@jozedzn.com" />
        <meta property="og:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Contact JozeDzn — Creative Developer" />
        <meta name="twitter:description" content="Available for motion graphics, 3D art, web development, and interactive experience projects." />
        <meta name="twitter:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact JozeDzn',
          url: 'https://jozedzn.com/contact',
          description: 'Contact page for JozeDzn, Creative Developer based in Mexico.',
          mainEntity: {
            '@type': 'Person',
            name: 'JozeDzn',
            email: 'hello@jozedzn.com',
            url: 'https://jozedzn.com',
            sameAs: ['https://linkedin.com/in/jozedzn', 'https://instagram.com/jozedzn'],
          },
        })}</script>
      </Helmet>
      <CustomCursor />
      <Navbar />
      <div className="page-wrapper">
        <ConnectSection key={`connect-${i18n.language}`} />
      </div>
    </>
  );
}
