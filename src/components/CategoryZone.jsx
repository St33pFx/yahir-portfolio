import ProjectCard from './ProjectCard';

export default function CategoryZone({ category, index, activeCard, isFirst }) {
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
          <h3 className="work__category-title">{category.title}</h3>
          <div className="work__projects-track">
            <div className="work__projects">
              {category.projects.map(project => (
                <ProjectCard key={project.slug} project={project} />
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
