import { useEffect } from 'react';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import { categories } from '../data/projects';

const webCat = categories.find(c => c.id === 'web');

export default function WebDesignPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const projects = (webCat?.projects ?? [])
    .filter(p => p.caseStudy?.overview)
    .map(p => ({ ...p, category: 'Web', categoryId: 'web' }));

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="cat-page">
        <header className="cat-page__header">
          <nav className="cat-page__breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <a href="/work">Work</a>
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
            <a href="/motion-graphics" className="cat-page__sibling">Motion Graphics →</a>
            <a href="/3d" className="cat-page__sibling">3D Art →</a>
          </div>
        </header>
        <div className="cat-page__grid">
          {projects.map(p => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <footer className="cat-page__footer">
          <a href="/work" className="cat-page__back">← All Work</a>
          <a href="/about" className="cat-page__about-link">About JozeDzn →</a>
        </footer>
      </main>
    </>
  );
}
