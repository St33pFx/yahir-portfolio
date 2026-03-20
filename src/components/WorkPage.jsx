import { useEffect } from 'react';
import ScrollProgress from './ScrollProgress';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
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
            <a href="/motion-graphics" className="work-page__cat-link">Motion Graphics</a>
            <a href="/3d" className="work-page__cat-link">3D Art</a>
            <a href="/web-design" className="work-page__cat-link">Web Design</a>
          </nav>
        </header>

        {publishedCategories.map(cat => (
          <section key={cat.id} className="work-page__category" aria-labelledby={`cat-${cat.id}`}>
            <div className="work-page__cat-header">
              <h2 id={`cat-${cat.id}`} className="work-page__cat-title">{cat.title}</h2>
              <a href={`/${cat.id === '3d-art' ? '3d' : cat.id === 'web' ? 'web-design' : cat.id}`} className="work-page__cat-link-all">
                View all {cat.title} →
              </a>
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
