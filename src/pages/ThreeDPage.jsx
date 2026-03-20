import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { categories } from '../data/projects';

const threeDCat = categories.find(c => c.id === '3d-art');

export default function ThreeDPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const projects = (threeDCat?.projects ?? [])
    .filter(p => p.caseStudy?.overview)
    .map(p => ({ ...p, category: '3D Art', categoryId: '3d-art' }));

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>3D Art — JozeDzn | Blender, Cinema 4D, Substance Painter</title>
        <meta name="description" content="3D art and rendering projects by JozeDzn: product visualization, character props, architectural renders, and PBR material studies — built in Blender, Cinema 4D, Substance Painter, and ZBrush." />
        <link rel="canonical" href="https://jozedzn.com/3d" />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://jozedzn.com/3d" />
        <meta property="og:title"       content="3D Art — JozeDzn | Blender, Cinema 4D, Substance Painter" />
        <meta property="og:description" content="3D art: product visualization, architectural renders, and PBR material studies in Blender and Cinema 4D." />
        <meta property="og:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="3D Art — JozeDzn | Blender, Cinema 4D" />
        <meta name="twitter:description" content="Product visualization, architectural renders, and PBR material studies." />
        <meta name="twitter:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: '3D Art — JozeDzn',
          url: 'https://jozedzn.com/3d',
          description: '3D art projects: product visualization, architectural renders, and PBR material studies by JozeDzn.',
          author: { '@type': 'Person', name: 'JozeDzn', url: 'https://jozedzn.com' },
          about: { '@type': 'Thing', name: '3D Art' },
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
            <span aria-current="page">3D Art</span>
          </nav>
          <h1 className="cat-page__h1">3D Art</h1>
          <p className="cat-page__desc">
            Product visualization, character prop art, architectural renders, and PBR material studies.
            Every piece is an exploration of how light, form, and texture define perception.
          </p>
          <div className="cat-page__tools">
            <span>Blender</span><span>Cinema 4D</span><span>Substance Painter</span><span>ZBrush</span><span>Maya</span><span>Redshift</span><span>Cycles</span>
          </div>
          <div className="cat-page__siblings">
            <Link to="/motion-graphics" className="cat-page__sibling">Motion Graphics →</Link>
            <Link to="/web-design" className="cat-page__sibling">Web Design →</Link>
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
