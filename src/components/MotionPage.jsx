import { useEffect } from 'react';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import { categories } from '../data/projects';

const motionCat = categories.find(c => c.id === 'motion-graphics');

export default function MotionPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const projects = (motionCat?.projects ?? [])
    .filter(p => p.caseStudy?.overview)
    .map(p => ({ ...p, category: 'Motion Graphics', categoryId: 'motion-graphics' }));

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
            <a href="/3d" className="cat-page__sibling">3D Art →</a>
            <a href="/web-design" className="cat-page__sibling">Web Design →</a>
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
