import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const [videoVisible, setVideoVisible] = useState(false);

  // When both image + video exist: show image as thumbnail, crossfade to video on hover
  // When only video: show video always (first frame = thumbnail via preload)
  // When only image: show image
  const hasImage = Boolean(project.image);
  const hasVideo = Boolean(project.video);

  const handleMouseEnter = () => {
    if (!hasVideo) return;
    if (hasImage) setVideoVisible(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (!hasVideo) return;
    if (videoRef.current) {
      videoRef.current.pause();
      // Return to mid-video thumbnail (only for video-only cards)
      videoRef.current.currentTime = 0;
    }
    if (hasImage) setVideoVisible(false);
  };

  return (
    <Link
      to={`/work/${project.slug}`}
      className="project-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card__media-wrap">
        {/* Static thumbnail — always visible when image is present */}
        {hasImage && (
          <img
            src={project.image}
            alt={project.name}
            className="project-card__media project-card__media--img"
            loading="lazy"
            style={{ opacity: videoVisible ? 0 : 1 }}
          />
        )}

        {/* Video — crossfades over thumbnail on hover; or acts as sole media */}
        {hasVideo && (
          <video
            ref={videoRef}
            className="project-card__media project-card__media--vid"
            src={project.video}
            muted
            loop
            playsInline
            preload={hasImage ? 'none' : 'auto'}
            style={{ opacity: hasImage ? (videoVisible ? 1 : 0) : 1 }}
            onLoadedMetadata={(e) => {
              if (!hasImage) e.target.currentTime = 0;
            }}
          />
        )}

        {/* Fallback when both null */}
        {!hasImage && !hasVideo && (
          <div className="project-card__media project-card__media--empty" />
        )}
      </div>

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
