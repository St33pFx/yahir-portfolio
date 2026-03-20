import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollProgress from '../components/ScrollProgress';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { categories } from '../data/projects';

export default function WorkPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const publishedCategories = categories.map(cat => ({
    ...cat,
    projects: cat.projects
      .filter(p => p.caseStudy?.overview)
      .map(p => ({ ...p, category: cat.title, categoryId: cat.id })),
  })).filter(cat => cat.projects.length > 0);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Work — Selected Projects | JozeDzn</title>
        <meta name="description" content="Selected projects by JozeDzn: motion graphics, 3D art, and web development. Browse case studies covering kinetic typography, 3D rendering, and interactive web experiences built with React and GSAP." />
        <link rel="canonical" href="https://jozedzn.com/work" />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://jozedzn.com/work" />
        <meta property="og:title"       content="Work — Selected Projects | JozeDzn" />
        <meta property="og:description" content="Selected projects in Motion Graphics, 3D Art, and Web Development by JozeDzn." />
        <meta property="og:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Work — Selected Projects | JozeDzn" />
        <meta name="twitter:description" content="Selected projects in Motion Graphics, 3D Art, and Web Development by JozeDzn." />
        <meta name="twitter:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Work — JozeDzn',
          url: 'https://jozedzn.com/work',
          description: 'Selected projects in Motion Graphics, 3D Art, and Web Development.',
          author: { '@type': 'Person', name: 'JozeDzn', url: 'https://jozedzn.com' },
        })}</script>
      </Helmet>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="work-page">
        <header className="work-page__header">
          <span className="work-page__eyebrow">Portfolio</span>
          <h1 className="work-page__h1">Work</h1>
          <p className="work-page__desc">
            Selected projects spanning motion graphics, 3D art, and web development.
            Each piece explores a different intersection of design and code.
          </p>
          <nav className="work-page__cats" aria-label="Work categories">
            <Link to="/motion-graphics" className="work-page__cat-link">Motion Graphics</Link>
            <Link to="/3d" className="work-page__cat-link">3D Art</Link>
            <Link to="/web-design" className="work-page__cat-link">Web Design</Link>
          </nav>
        </header>

        {publishedCategories.map(cat => (
          <section key={cat.id} className="work-page__category" aria-labelledby={`cat-${cat.id}`}>
            <div className="work-page__cat-header">
              <h2 id={`cat-${cat.id}`} className="work-page__cat-title">{cat.title}</h2>
              <Link to={`/${cat.id === '3d-art' ? '3d' : cat.id === 'web' ? 'web-design' : cat.id}`} className="work-page__cat-link-all">
                View all {cat.title} →
              </Link>
            </div>
            <div className="work-page__grid">
              {cat.projects.map(project => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
