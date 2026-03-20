import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { categories } from '../data/projects';

const webCat = categories.find(c => c.id === 'web');

export default function WebDesignPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const projects = (webCat?.projects ?? [])
    .filter(p => p.caseStudy?.overview)
    .map(p => ({ ...p, category: 'Web', categoryId: 'web' }));

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Web Design & Development — JozeDzn | React, GSAP, Interactive</title>
        <meta name="description" content="Web design and development projects by JozeDzn: interactive portfolios, motion-driven interfaces, and creative web experiences built with React, GSAP, and modern web technologies." />
        <link rel="canonical" href="https://jozedzn.com/web-design" />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://jozedzn.com/web-design" />
        <meta property="og:title"       content="Web Design & Development — JozeDzn | React, GSAP" />
        <meta property="og:description" content="Interactive web experiences and creative interfaces built with React and GSAP." />
        <meta property="og:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Web Design & Development — JozeDzn" />
        <meta name="twitter:description" content="Interactive web experiences and creative interfaces built with React and GSAP." />
        <meta name="twitter:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Web Design & Development — JozeDzn',
          url: 'https://jozedzn.com/web-design',
          description: 'Interactive web experiences and creative interfaces built with React, GSAP, and modern web technologies.',
          author: { '@type': 'Person', name: 'JozeDzn', url: 'https://jozedzn.com' },
          about: { '@type': 'Thing', name: 'Web Development' },
        })}</script>
      </Helmet>
      <CustomCursor />
      <Navbar />
      <main className="cat-page">
        <header className="cat-page__header">
          <nav className="cat-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link to="/work">Work</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Web Design</span>
          </nav>
          <h1 className="cat-page__h1">Web Design</h1>
          <p className="cat-page__desc">
            Motion-driven interfaces, interactive portfolios, and creative web experiences
            where animation and code meet. Built with React, GSAP, and a strong focus on
            interaction design and performance.
          </p>
          <div className="cat-page__tools">
            <span>React</span><span>GSAP</span><span>HTML</span><span>CSS</span><span>JavaScript</span><span>Vite</span>
          </div>
          <div className="cat-page__siblings">
            <Link to="/motion-graphics" className="cat-page__sibling">Motion Graphics →</Link>
            <Link to="/3d" className="cat-page__sibling">3D Art →</Link>
          </div>
        </header>
        <div className="cat-page__grid">
          {projects.map(p => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <footer className="cat-page__footer">
          <Link to="/work" className="cat-page__back">← All Work</Link>
          <Link to="/about" className="cat-page__about-link">About JozeDzn →</Link>
        </footer>
      </main>
    </>
  );
}
