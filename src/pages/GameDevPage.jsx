import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';

export default function GameDevPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Game Development — JozeDzn | Unity, Level Design</title>
        <meta name="description" content="Game development work by JozeDzn: level design, game-ready 3D assets, Unity integration, and interactive experiences. Projects combining 3D art with real-time game engine pipelines." />
        <link rel="canonical" href="https://jozedzn.com/game-dev" />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://jozedzn.com/game-dev" />
        <meta property="og:title"       content="Game Development — JozeDzn | Unity, Level Design" />
        <meta property="og:description" content="Level design, game-ready 3D assets, and Unity pipelines by JozeDzn." />
        <meta property="og:image"       content="https://jozedzn.com/assets/images/og-image.png" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Game Development — JozeDzn" />
        <meta name="twitter:description" content="Level design, game-ready 3D assets, and Unity pipelines." />
        <meta name="twitter:image"       content="https://jozedzn.com/assets/images/og-image.png" />
      </Helmet>
      <CustomCursor />
      <Navbar />
      <main className="cat-page cat-page--coming-soon">
        <header className="cat-page__header">
          <nav className="cat-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link to="/work">Work</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Game Dev</span>
          </nav>
          <h1 className="cat-page__h1">Game Dev</h1>
          <p className="cat-page__desc">
            Level design, game-ready 3D asset pipelines, and Unity integration.
            This section bridges the 3D art workflow with real-time game engine environments —
            combining Blender, Substance Painter, and Unity for production-ready interactive experiences.
          </p>
          <div className="cat-page__tools">
            <span>Unity</span><span>Blender</span><span>Substance Painter</span><span>Maya</span><span>ZBrush</span>
          </div>
        </header>
        <div className="cat-page__coming-soon">
          <p className="cat-page__coming-text">Projects coming soon.</p>
          <p className="cat-page__coming-sub">In the meantime, explore the 3D Art section — many of those assets were built with game pipelines in mind.</p>
          <div className="cat-page__siblings">
            <Link to="/3d" className="cat-page__sibling">Explore 3D Art →</Link>
            <Link to="/motion-graphics" className="cat-page__sibling">Motion Graphics →</Link>
          </div>
        </div>
        <footer className="cat-page__footer">
          <Link to="/work" className="cat-page__back">← All Work</Link>
        </footer>
      </main>
    </>
  );
}
