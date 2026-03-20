import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const CATEGORY_ROUTES = {
  'motion-graphics': '/motion-graphics',
  '3d-art': '/3d',
  'web': '/web-design',
};

export default function CategoryZone({ category, index, activeCard, isFirst }) {
  const catRoute = CATEGORY_ROUTES[category.id];

  return (
    <div className="work__category-zone" data-index={index}>
      <div className="work__category">
        <div className="work__category__inner">
          {isFirst && (
            <div className="work__header">
              <h2 className="work__heading">Work</h2>
              <p className="work__subheading">Selected projects I&apos;ve worked on</p>
            </div>
          )}
          <div className="work__category-title-row">
            <h3 className="work__category-title">{category.title}</h3>
            {catRoute && (
              <Link to={catRoute} className="work__category-view-all" aria-label={`View all ${category.title} projects`}>
                View all →
              </Link>
            )}
          </div>
          <div className="work__projects-track">
            <div className="work__projects">
              {category.projects.map(project => (
                <ProjectCard key={project.slug} project={{ ...project, category: category.title, categoryId: category.id }} />
              ))}
            </div>
          </div>
          {category.projects.length > 1 && (
            <div className="work__carousel-dots">
              {category.projects.map((_, i) => (
                <span
                  key={i}
                  className={`work__carousel-dot${i === activeCard ? ' active' : ''}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
