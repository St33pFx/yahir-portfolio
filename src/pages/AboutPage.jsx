import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ScrollProgress from '../components/ScrollProgress';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import ConnectSection from '../components/ConnectSection';

export default function AboutPage() {
  const { i18n } = useTranslation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>About — JozeDzn | Creative Developer in Mexico</title>
        <meta name="description" content="JozeDzn is a Creative Developer based in Mexico specializing in Motion Graphics, 3D Art, Web Development, and interactive experiences — 4+ years building digital content that reaches millions." />
        <link rel="canonical" href="https://jozedzn.com/about" />
        <meta property="og:type"        content="profile" />
        <meta property="og:url"         content="https://jozedzn.com/about" />
        <meta property="og:title"       content="About — JozeDzn | Creative Developer in Mexico" />
        <meta property="og:description" content="Creative Developer based in Mexico. Motion Graphics, 3D Art, Web Development, and interactive experiences." />
        <meta property="og:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="About — JozeDzn | Creative Developer in Mexico" />
        <meta name="twitter:description" content="Creative Developer based in Mexico. Motion Graphics, 3D Art, Web Development, and interactive experiences." />
        <meta name="twitter:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: 'https://jozedzn.com/about',
          name: 'About JozeDzn',
          mainEntity: {
            '@type': 'Person',
            name: 'JozeDzn',
            url: 'https://jozedzn.com',
            jobTitle: 'Creative Developer',
            description: 'Creative Developer based in Mexico specializing in Motion Graphics, 3D Art, Web Development, and interactive experiences.',
            sameAs: ['https://linkedin.com/in/jozedzn', 'https://instagram.com/jozedzn'],
            knowsAbout: ['Motion Graphics', '3D Art', 'Web Development', 'After Effects', 'Blender', 'Cinema 4D', 'React', 'GSAP'],
          },
        })}</script>
      </Helmet>
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
