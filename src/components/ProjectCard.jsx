import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      to={`/work/${project.slug}`}
      className="project-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media: video preferred, image fallback */}
      {project.video ? (
        <video
          ref={videoRef}
          className="project-card__media"
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={project.image}
          alt={project.name}
          className="project-card__media"
          loading="lazy"
        />
      )}

      {/* Dark overlay on hover */}
      <div className="project-card__hover-overlay" />

      {/* Bottom info bar */}
      <div className="project-card__info">
        <div className="project-card__meta">
          <p className="project-card__name">{project.name}</p>
          <p className="project-card__category">{project.category}</p>
        </div>
        <span className="project-card__cta">→ View Project</span>
      </div>
    </Link>
  );
}
