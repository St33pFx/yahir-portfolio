import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchVimeoThumbnail, vimeoPreviewSrc } from '../utils/vimeo';
import { shouldReduceMotion } from '../utils/motion';

/**
 * Comportamiento:
 * 1. Sin hover → siempre thumbnail (imagen local o poster Vimeo).
 * 2. Hover → preview en autoplay (MP4 local o iframe Vimeo).
 * 3. Click en la card → navega al case study (react-router Link).
 */
const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

function initialPoster(project) {
  if (project.image) return project.image;
  if (project.vimeoId) return `https://vumbnail.com/${project.vimeoId}.jpg`;
  return null;
}

export default function ProjectCard({ project }) {
  const { t, i18n } = useTranslation();
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [localReady, setLocalReady] = useState(false);
  const [vimeoActive, setVimeoActive] = useState(false);
  const [vimeoReady, setVimeoReady] = useState(false);
  const [posterSrc, setPosterSrc] = useState(() => initialPoster(project));

  const hasVimeo = Boolean(project.vimeoId);
  const hasLocalVideo = Boolean(project.video);
  const vimeoOnlyPreview = hasVimeo && !hasLocalVideo;

  /* Thumbnail inmediato + upgrade a HD (oEmbed) si aplica */
  useEffect(() => {
    setPosterSrc(initialPoster(project));

    if (project.image) return;
    if (!project.vimeoId) return;

    let cancelled = false;
    (async () => {
      const hd = await fetchVimeoThumbnail(project.vimeoId);
      if (cancelled || !hd) return;
      setPosterSrc(hd);
    })();

    return () => { cancelled = true; };
  }, [project.slug, project.image, project.vimeoId]);

  useEffect(() => {
    setLocalReady(false);
  }, [project.video, project.slug]);

  useEffect(() => {
    if (!hasLocalVideo) return;
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const v = videoRef.current;
        if (v) {
          v.preload = 'auto';
          v.load();
        }
      },
      { rootMargin: '240px 0px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasLocalVideo, project.slug]);

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    if (shouldReduceMotion()) return;
    setHover(true);
    if (hasLocalVideo) {
      videoRef.current?.play().catch(() => {});
      return;
    }
    if (vimeoOnlyPreview) setVimeoActive(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setHover(false);
    setVimeoActive(false);
    setVimeoReady(false);
    if (hasLocalVideo) {
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    }
  };

  const showPoster = Boolean(posterSrc);

  const hidePoster =
    (hasLocalVideo && hover && localReady) ||
    (vimeoOnlyPreview && vimeoActive && vimeoReady);

  const localizedHref = `${i18n.language.startsWith('es') ? '/es' : ''}/work/${project.slug}`;
  const categoryLabel = t(`work.categories.${project.categoryId}`, project.category);

  return (
    <a
      href={localizedHref}
      className={`project-card${hover ? ' project-card--hover' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`${t('work.view_project')}: ${project.name}`}
    >
      <span ref={rootRef} className="project-card__io-target" aria-hidden />

      <div className="project-card__media-wrap">
        {vimeoOnlyPreview && vimeoActive && (
          <iframe
            className="project-card__vimeo-iframe project-card__vimeo-iframe--stack"
            src={vimeoPreviewSrc(project.vimeoId)}
            title=""
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            onLoad={() => setVimeoReady(true)}
          />
        )}

        {hasLocalVideo && (
          <video
            ref={videoRef}
            className="project-card__media project-card__media--vid"
            src={project.video}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setLocalReady(true)}
            onError={() => setLocalReady(false)}
          />
        )}

        {showPoster && (
          <img
            src={posterSrc}
            alt={project.name}
            className="project-card__media project-card__media--img project-card__media--poster"
            loading="lazy"
            decoding="async"
            style={{ opacity: hidePoster ? 0 : 1 }}
          />
        )}

        {!showPoster && !hasLocalVideo && !vimeoOnlyPreview && (
          <div className="project-card__media project-card__media--empty" />
        )}
      </div>

      <div className="project-card__hover-overlay" aria-hidden />

      {project.wip && <span className="project-card__status">WIP</span>}

      <div className="project-card__info">
        <div className="project-card__meta">
          <p className="project-card__name">{project.name}</p>
          <p className="project-card__category">{categoryLabel}{project.wip ? ` · ${t('work.wip')}` : ''}</p>
        </div>
        <span className="project-card__cta">→ {t('work.view_project')}</span>
      </div>
    </a>
  );
}
