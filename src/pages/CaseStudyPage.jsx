import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjectBySlug, getAdjacentProjects } from '../data/projects';
import { vimeoModalPlayerSrc, fetchVimeoThumbnail } from '../utils/vimeo';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import SplitText from '../components/SplitText';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyPage() {
  const { slug } = useParams();
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

  // Fetch HD thumbnail from Vimeo oEmbed (1920px) — start with low-res vumbnail as instant placeholder
  useEffect(() => {
    if (!project?.vimeoId) { setHeroThumb(null); return; }
    // Instant low-res placeholder
    setHeroThumb(`https://vumbnail.com/${project.vimeoId}.jpg`);
    // Upgrade to HD
    let cancelled = false;
    fetchVimeoThumbnail(project.vimeoId).then((hdUrl) => {
      if (!cancelled && hdUrl) setHeroThumb(hdUrl);
    });
    return () => { cancelled = true; };
  }, [project?.vimeoId]);

  // Reset the overlay and listen for Vimeo's real play event via postMessage
  useEffect(() => {
    setHeroVimeoReady(false);

    if (!project?.vimeoId) return;

    // When the Vimeo player posts a message that the video has started playing,
    // we know the first frame is visible and we can fade the thumbnail overlay.
    const handleVimeoMessage = (e) => {
      if (!e.origin.includes('vimeo.com')) return;
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        // Vimeo fires 'playProgress' on each timeupdate while playing.
        // We only need the very first one to know the video is live.
        if (data?.event === 'playProgress' || data?.event === 'play') {
          setHeroVimeoReady(true);
        }
      } catch { /* ignore non-JSON messages */ }
    };

    window.addEventListener('message', handleVimeoMessage);
    return () => window.removeEventListener('message', handleVimeoMessage);
  }, [slug, project?.vimeoId]);

  const openModal = useCallback(() => {
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

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeModal]);

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
      // Hero: title and meta slide up + fade in
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

      // Scroll reveal for each content section
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
          <Link to="/">← Back to Home</Link>
        </div>
      </>
    );
  }

  const cs = project.caseStudy || {};

  const addSection = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

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
              /* Vimeo background=1 mode — autoplay, muted, loop, no UI.
                 api=1 enables postMessage events so we know when it actually plays. */
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
                    // Fallback: hide overlay when iframe DOM loads (covers the case
                    // where postMessage events don't fire, e.g. privacy settings).
                    // Add a small delay so the video has a moment to render its first frame.
                    setTimeout(() => setHeroVimeoReady(true), 800);
                  }}
                />
                {/* Thumbnail shown instantly while the iframe loads, then fades out */}
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

          <Link to="/" className="cs__back-nav">← All Work</Link>

          {/* Overview */}
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

          {/* Goal */}
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

          {/* Process */}
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

          {/* Visual Break / Gallery */}
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
                  <div key={i} className="cs__gallery-item">
                    <img src={src} alt={`${project.name} visual ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Takeaway */}
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
          <Link to={`/work/${next.slug}`} className="cs__next">
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
          </Link>
        ) : (
          <div className="cs__next cs__next--end">
            <Link to="/" className="cs__back-home">← Back to Home</Link>
          </div>
        )}

      </main>

      {/* ── Video Modal — Vimeo with audio, or local HD ── */}
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
