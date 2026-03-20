import { useEffect } from 'react';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';

export default function GameDevPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="cat-page cat-page--coming-soon">
        <header className="cat-page__header">
          <nav className="cat-page__breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <a href="/work">Work</a>
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
            <a href="/3d" className="cat-page__sibling">Explore 3D Art →</a>
            <a href="/motion-graphics" className="cat-page__sibling">Motion Graphics →</a>
          </div>
        </div>
        <footer className="cat-page__footer">
          <a href="/work" className="cat-page__back">← All Work</a>
        </footer>
      </main>
    </>
  );
}
