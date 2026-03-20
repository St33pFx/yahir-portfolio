import { useEffect } from 'react';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import { categories } from '../data/projects';

const threeDCat = categories.find(c => c.id === '3d-art');

export default function ThreeDPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const projects = (threeDCat?.projects ?? [])
    .filter(p => p.caseStudy?.overview)
    .map(p => ({ ...p, category: '3D Art', categoryId: '3d-art' }));

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
            <a href="/motion-graphics" className="cat-page__sibling">Motion Graphics →</a>
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
