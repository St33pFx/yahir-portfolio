import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { categories } from '../data/projects';

const motionCat = categories.find(c => c.id === 'motion-graphics');

export default function MotionPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const projects = (motionCat?.projects ?? [])
    .filter(p => p.caseStudy?.overview)
    .map(p => ({ ...p, category: 'Motion Graphics', categoryId: 'motion-graphics' }));

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Motion Graphics — JozeDzn | After Effects, Cinema 4D, DaVinci Resolve</title>
        <meta name="description" content="Motion graphics projects by JozeDzn: kinetic typography, audio-reactive animation, 3D compositing, and motion design for social and digital media — built in After Effects, Cinema 4D, Blender, and DaVinci Resolve." />
        <link rel="canonical" href="https://jozedzn.com/motion-graphics" />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://jozedzn.com/motion-graphics" />
        <meta property="og:title"       content="Motion Graphics — JozeDzn | After Effects, Cinema 4D" />
        <meta property="og:description" content="Motion graphics: kinetic typography, audio-reactive animation, and 3D compositing for digital media." />
        <meta property="og:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Motion Graphics — JozeDzn" />
        <meta name="twitter:description" content="Kinetic typography, audio-reactive animation, and 3D compositing." />
        <meta name="twitter:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Motion Graphics — JozeDzn',
          url: 'https://jozedzn.com/motion-graphics',
          description: 'Motion graphics projects: kinetic typography, audio-reactive animation, and 3D compositing by JozeDzn.',
          author: { '@type': 'Person', name: 'JozeDzn', url: 'https://jozedzn.com' },
          about: { '@type': 'Thing', name: 'Motion Graphics' },
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
            <span aria-current="page">Motion Graphics</span>
          </nav>
          <h1 className="cat-page__h1">Motion Graphics</h1>
          <p className="cat-page__desc">
            Audio-reactive animations, kinetic typography, and composited sequences
            built in After Effects, Cinema&nbsp;4D, Blender, and DaVinci Resolve.
            Projects range from social-ready motion pieces to high-impact brand reveals.
          </p>
          <div className="cat-page__tools">
            <span>After Effects</span><span>Cinema 4D</span><span>Blender</span><span>DaVinci Resolve</span><span>Photoshop</span><span>Redshift</span>
          </div>
          <div className="cat-page__siblings">
            <Link to="/3d" className="cat-page__sibling">3D Art →</Link>
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
