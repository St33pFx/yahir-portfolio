import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjectBySlug, getAdjacentProjects } from '../data/projects';
import { vimeoModalPlayerSrc, fetchVimeoThumbnail } from '../utils/vimeo';
import Navbar from './Navbar';
import CustomCursor from './CustomCursor';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyPage({ slug }) {
  const { i18n } = useTranslation();
  const project = getProjectBySlug(slug);
  const { next } = getAdjacentProjects(slug);

  const heroRef     = useRef(null);
  const titleRef    = useRef(null);
  const metaRef     = useRef(null);
  const videoRef    = useRef(null);
  const heroIframeRef = useRef(null);
  const modalRef    = useRef(null);
  const modalVidRef = useRef(null);
  const sectionsRef = useRef([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [heroVimeoReady, setHeroVimeoReady] = useState(false);
  const [heroThumb, setHeroThumb] = useState(null);
  const [tapHintDismissed, setTapHintDismissed] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Fetch HD thumbnail from Vimeo oEmbed (1920px) — start with low-res vumbnail as instant placeholder
  useEffect(() => {
    if (!project?.vimeoId) { setHeroThumb(null); return; }
    setHeroThumb(`https://vumbnail.com/${project.vimeoId}.jpg`);
    let cancelled = false;
    fetchVimeoThumbnail(project.vimeoId).then((hdUrl) => {
      if (!cancelled && hdUrl) setHeroThumb(hdUrl);
    });
    return () => { cancelled = true; };
  }, [project?.vimeoId]);

  useEffect(() => {
    setHeroVimeoReady(false);
    if (!project?.vimeoId) return;
    const handleVimeoMessage = (e) => {
      if (!e.origin.includes('vimeo.com')) return;
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data?.event === 'playProgress' || data?.event === 'play') {
          setHeroVimeoReady(true);
        }
      } catch { /* ignore non-JSON messages */ }
    };
    window.addEventListener('message', handleVimeoMessage);
    return () => window.removeEventListener('message', handleVimeoMessage);
  }, [slug, project?.vimeoId]);

  const openModal = useCallback(() => {
    setTapHintDismissed(true);
    setModalOpen(true);
    setTimeout(() => {
      if (modalVidRef.current) {
        modalVidRef.current.currentTime = 0;
        modalVidRef.current.play().catch(() => {});
      }
    }, 80);
  }, []);

  const closeModal = useCallback(() => {
    if (modalVidRef.current) {
      modalVidRef.current.pause();
      modalVidRef.current.currentTime = 0;
    }
    setModalOpen(false);
  }, []);

  useEffect(() => {
    const gallery = project?.caseStudy?.gallery || [];
    const onKey = (e) => {
      if (e.key === 'Escape') { closeModal(); setLightboxIndex(null); }
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % gallery.length);
      if (e.key === 'ArrowLeft')  setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeModal, lightboxIndex, project]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.remove('hero-hidden');
      navbar.classList.add('hero-visible');
      navbar.style.opacity = '1';
      navbar.style.transform = 'translateX(-50%)';
    }

    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        metaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.5 }
      );

      sectionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [slug, project]);

  if (!project) {
    return (
      <>
        <CustomCursor />
        <Navbar />
        <div className="cs-not-found">
          <h1>Project not found</h1>
          <a href="/">← Back to Home</a>
        </div>
      </>
    );
  }

  const addSection = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  const lang = i18n.language?.startsWith('es') ? 'es' : 'en';
  const csData = project.caseStudy || {};
  const cs = { ...(csData[lang] || csData.en || csData), gallery: csData.gallery || [] };

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="cs">

        {/* ── Hero ── */}
        <section className="cs__hero" ref={heroRef}>
          <div
            className="cs__hero-media"
            onClick={project.vimeoId ? openModal : project.video ? openModal : undefined}
            style={(project.vimeoId || project.video) ? { cursor: 'none' } : undefined}
          >
            {project.vimeoId ? (
              <>
                <iframe
                  ref={heroIframeRef}
                  className="cs__hero-video cs__hero-iframe"
                  src={`https://player.vimeo.com/video/${project.vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&api=1`}
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={project.name}
                  onLoad={() => {
                    setTimeout(() => setHeroVimeoReady(true), 800);
                  }}
                />
                <div
                  className="cs__hero-thumb-overlay"
                  style={{
                    backgroundImage: heroThumb ? `url(${heroThumb})` : 'none',
                    opacity: heroVimeoReady ? 0 : 1,
                  }}
                  aria-hidden
                />
              </>
            ) : project.video ? (
              <video
                ref={videoRef}
                className="cs__hero-video"
                src={project.video}
                autoPlay muted loop playsInline
              />
            ) : (
              <img
                src={project.image}
                alt={project.name}
                className="cs__hero-img"
              />
            )}
            <div className="cs__hero-vignette" />

            {(project.vimeoId || project.video) && !tapHintDismissed && (
              <div className="cs__tap-hint" aria-hidden="true">
                <div className="cs__tap-hint__ring" />
                <div className="cs__tap-hint__circle">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
                    <path d="M1 1.5L17 10L1 18.5V1.5Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="cs__tap-hint__label">Tap to watch with sound</span>
              </div>
            )}
          </div>

          <div className="cs__hero-content">
            <div ref={titleRef}>
              <p className="cs__category-label">{project.category} / {project.year}</p>
              <h1 className="cs__title">{project.name}</h1>
            </div>
            <div className="cs__hero-tags" ref={metaRef}>
              {project.tags.map(tag => (
                <span key={tag} className="cs__tag">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Content wrapper ── */}
        <div className="cs__body">

          <a href={i18n.language?.startsWith('es') ? '/es/#work' : '/#work'} className="cs__back-nav">← All Work</a>

          {cs.overview && (
            <section className="cs__section cs__overview">
              <SplitText
                text="Overview"
                tag="span"
                className="cs__section-label"
                splitType="chars"
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                delay={30}
                duration={0.7}
                ease="power3.out"
                threshold={0.15}
                rootMargin="0px"
                textAlign="left"
              />
              <SplitText
                text={cs.overview}
                tag="p"
                className="cs__overview-text"
                splitType="words"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                delay={18}
                duration={1.0}
                ease="power3.out"
                threshold={0.1}
                rootMargin="0px"
                textAlign="left"
              />
            </section>
          )}

          {cs.goal && (
            <section className="cs__section cs__goal">
              <SplitText
                text="Goal"
                tag="span"
                className="cs__section-label"
                splitType="chars"
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                delay={30}
                duration={0.7}
                ease="power3.out"
                threshold={0.15}
                rootMargin="0px"
                textAlign="left"
              />
              <SplitText
                text={cs.goal}
                tag="p"
                className="cs__goal-text"
                splitType="words"
                from={{ opacity: 0, y: 24 }}
                to={{ opacity: 1, y: 0 }}
                delay={20}
                duration={0.9}
                ease="power3.out"
                threshold={0.1}
                rootMargin="0px"
                textAlign="left"
              />
            </section>
          )}

          {cs.process && (
            <section className="cs__section cs__process" ref={addSection}>
              <SplitText
                text="Process"
                tag="span"
                className="cs__section-label"
                splitType="chars"
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                delay={30}
                duration={0.7}
                ease="power3.out"
                threshold={0.15}
                rootMargin="0px"
                textAlign="left"
              />
              <div className="cs__process-grid">
                <div className="cs__process-block">
                  <h3 className="cs__process-heading">Concept</h3>
                  <p>{cs.process.concept}</p>
                </div>
                <div className="cs__process-block">
                  <h3 className="cs__process-heading">Execution</h3>
                  <p>{cs.process.execution}</p>
                </div>
                <div className="cs__process-block cs__process-block--full">
                  <h3 className="cs__process-heading">Motion &amp; Timing</h3>
                  <p>{cs.process.motion}</p>
                </div>
              </div>
            </section>
          )}

          {cs.gallery && cs.gallery.length > 0 && (
            <section className="cs__section cs__gallery" ref={addSection}>
              <SplitText
                text="Visuals"
                tag="span"
                className="cs__section-label"
                splitType="chars"
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                delay={30}
                duration={0.7}
                ease="power3.out"
                threshold={0.15}
                rootMargin="0px"
                textAlign="left"
              />
              <div className="cs__gallery-grid">
                {cs.gallery.map((src, i) => (
                  <div key={i} className="cs__gallery-item" onClick={() => setLightboxIndex(i)}>
                    <img src={src} alt={`${project.name} visual ${i + 1}`} loading="lazy" />
                    <div className="cs__gallery-item__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                      <span>Ver imagen</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cs.takeaway && (
            <section className="cs__section cs__takeaway">
              <SplitText
                text="Takeaway"
                tag="span"
                className="cs__section-label"
                splitType="chars"
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                delay={30}
                duration={0.7}
                ease="power3.out"
                threshold={0.15}
                rootMargin="0px"
                textAlign="left"
              />
              <SplitText
                text={cs.takeaway}
                tag="blockquote"
                className="cs__takeaway-quote"
                splitType="words"
                from={{ opacity: 0, y: 32 }}
                to={{ opacity: 1, y: 0 }}
                delay={22}
                duration={1.1}
                ease="power3.out"
                threshold={0.08}
                rootMargin="0px"
                textAlign="left"
              />
            </section>
          )}

        </div>

        {/* ── Next Project ── */}
        {next ? (
          <a href={`/work/${next.slug}`} className="cs__next">
            <div className="cs__next-inner">
              <span className="cs__next-label">Next Project</span>
              <div className="cs__next-media">
                {next.video ? (
                  <video
                    src={next.video}
                    poster={next.image || (next.vimeoId ? `https://vumbnail.com/${next.vimeoId}_large.jpg` : undefined)}
                    muted loop playsInline autoPlay
                    className="cs__next-img"
                  />
                ) : next.image ? (
                  <img src={next.image} alt={next.name} className="cs__next-img" loading="lazy" />
                ) : next.vimeoId ? (
                  <img src={`https://vumbnail.com/${next.vimeoId}_large.jpg`} alt={next.name} className="cs__next-img" loading="lazy" />
                ) : null}
                <div className="cs__next-overlay" />
              </div>
              <div className="cs__next-info">
                <h2 className="cs__next-name">{next.name}</h2>
                <span className="cs__next-arrow">→</span>
              </div>
            </div>
          </a>
        ) : (
          <div className="cs__next cs__next--end">
            <a href="/" className="cs__back-home">← Back to Home</a>
          </div>
        )}

      </main>

      {/* ── Image Lightbox ── */}
      {lightboxIndex !== null && cs.gallery?.length > 0 && (
        <div className="cs__lightbox" onClick={() => setLightboxIndex(null)}>
          <button className="cs__lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close">✕</button>
          <button
            className="cs__lightbox-nav cs__lightbox-nav--prev"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + cs.gallery.length) % cs.gallery.length); }}
            aria-label="Previous"
          >‹</button>
          <div className="cs__lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <img
              src={cs.gallery[lightboxIndex]}
              alt={`${project.name} visual ${lightboxIndex + 1}`}
              className="cs__lightbox-img"
            />
          </div>
          <button
            className="cs__lightbox-nav cs__lightbox-nav--next"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % cs.gallery.length); }}
            aria-label="Next"
          >›</button>
          <span className="cs__lightbox-counter">{lightboxIndex + 1} / {cs.gallery.length}</span>
        </div>
      )}

      {/* ── Video Modal ── */}
      {modalOpen && (project.vimeoId || project.video) && (
        <div
          className="cs__modal"
          ref={modalRef}
          onClick={(e) => { if (e.target === modalRef.current) closeModal(); }}
        >
          <button className="cs__modal-close" onClick={closeModal} aria-label="Close">✕</button>

          {project.vimeoId ? (
            <div
              className="cs__modal-vimeo-frame"
              onClick={(e) => e.stopPropagation()}
              role="presentation"
            >
              <iframe
                className="cs__modal-vimeo-iframe"
                src={vimeoModalPlayerSrc(project.vimeoId)}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                title={project.name}
              />
            </div>
          ) : (
            <video
              ref={modalVidRef}
              className="cs__modal-video"
              src={project.videoHD || project.video}
              controls
              playsInline
              loop
            />
          )}
        </div>
      )}
    </>
  );
}
