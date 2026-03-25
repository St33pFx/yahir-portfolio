import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories } from '../data/projects';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

// All published projects (have a case study) with category info
const allProjects = categories.flatMap(cat =>
  cat.projects
    .filter(p => p.caseStudy?.en?.overview || p.caseStudy?.es?.overview)
    .map(p => ({ ...p, category: cat.title, categoryId: cat.id }))
);

/*
 * Mobile grid layout pattern (repeats every 4 items):
 * ┌─────────────────────────┐
 * │  FULL-WIDTH HERO        │  ← item 0: big cinematic
 * └─────────────────────────┘
 * ┌──────────┐ ┌────────────┐
 * │ PORTRAIT │ │  LANDSCAPE │  ← items 1 & 2: asymmetric pair
 * │          │ │            │
 * └──────────┘ └────────────┘
 * ┌─────────────────────────┐
 * │  EDITORIAL WIDE         │  ← item 3: cinematic letterbox
 * └─────────────────────────┘
 */
const MOBILE_PATTERN = ['hero', 'portrait', 'landscape', 'cinematic'];

function getMobileVariant(indexInPage) {
  return MOBILE_PATTERN[indexInPage % MOBILE_PATTERN.length];
}

export default function WorkSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [mobilePage, setMobilePage] = useState(0);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const gridRef = useRef(null);
  const mobileGridRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobileLayout(mq.matches);
    const handler = (e) => setIsMobileLayout(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Reset page when filter or layout changes
  useEffect(() => { setMobilePage(0); }, [activeFilter, isMobileLayout]);

  // Scroll to top of work section after page change (after render)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const workEl = document.getElementById('work');
    if (!workEl) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(workEl, { offset: 0, duration: 1, immediate: false });
    } else {
      workEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mobilePage]);

  // ── Desktop GSAP animations ──
  useGSAP(() => {
    if (isMobileLayout) return;
    const bento = gridRef.current;
    if (!bento) return;
    const cells = Array.from(bento.querySelectorAll('.work__bento-cell'));
    if (!cells.length) return;

    cells.forEach((cell, i) => {
      gsap.set(cell, { yPercent: i % 2 === 0 ? -30 : 30, opacity: 0, filter: 'blur(12px)' });
    });

    ScrollTrigger.batch(cells, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => {
        batch.forEach((cell) => {
          const i = cells.indexOf(cell);
          gsap.to(cell, {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            delay: i * 0.06,
            ease: 'power3.out',
          });
        });
      },
    });

    // Parallax (desktop only)
    [cells[0], cells[3]].forEach((cell) => {
      if (!cell) return;
      const travel = cell.offsetHeight * 0.25;
      gsap.set(cell, { y: 0 });
      ScrollTrigger.create({
        trigger: cell,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(cell, { y: self.progress * travel });
        },
      });
    });

    // Image parallax
    const travel = 80;
    cells.forEach((cell) => {
      const img = cell.querySelector('.project-card__media');
      if (!img) return;
      gsap.set(img, {
        height: `calc(100% + ${travel}px)`,
        top: -(travel / 2),
        position: 'absolute',
        width: '100%',
        objectFit: 'cover',
      });
      gsap.fromTo(img,
        { y: -(travel / 2) },
        {
          y: travel / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: cell,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

  }, { scope: gridRef, dependencies: [activeFilter, isMobileLayout] });

  // ── Mobile GSAP animations ──
  useGSAP(() => {
    if (!isMobileLayout) return;
    const grid = mobileGridRef.current;
    if (!grid) return;

    const items = Array.from(grid.querySelectorAll('.mobile-work__item'));
    if (!items.length) return;

    items.forEach((item) => {
      const card = item.querySelector('.project-card');
      const index = item.querySelector('.mobile-work__index');
      const label = item.querySelector('.mobile-work__label');

      // Card: scale up + opacity + clip-path reveal
      gsap.set(item, { opacity: 0 });

      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          // Card reveal: clip from bottom
          tl.fromTo(item,
            { opacity: 0, y: 60, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
            0
          );

          // Index number slides in
          if (index) {
            tl.fromTo(index,
              { x: -20, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
              0.2
            );
          }

          // Label text fades in
          if (label) {
            tl.fromTo(label,
              { y: 10, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
              0.3
            );
          }
        },
      });
    });

  }, { scope: mobileGridRef, dependencies: [activeFilter, mobilePage, isMobileLayout] });

  const filterOptions = [
    { id: 'all', label: t('work.filter_all', 'All') },
    ...categories
      .filter(cat => allProjects.some(p => p.categoryId === cat.id))
      .map(cat => ({ id: cat.id, label: cat.title })),
  ];

  const filtered = activeFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.categoryId === activeFilter);

  const MOBILE_PER_PAGE = 4;
  const totalPages = Math.ceil(filtered.length / MOBILE_PER_PAGE);
  const visibleProjects = isMobileLayout
    ? filtered.slice(mobilePage * MOBILE_PER_PAGE, (mobilePage + 1) * MOBILE_PER_PAGE)
    : filtered.slice(0, 8);

  return (
    <section className="work" id="work">
      <div className="work__inner">

        <div className="work__header">
          <h2 className="work__heading">{t('work.heading')}</h2>
          <span className="work__subheading">{t('work.subheading')}</span>
        </div>

        <div className="work__filters" role="group" aria-label="Filter by category">
          {filterOptions.map(f => (
            <button
              key={f.id}
              className={`work__filter${activeFilter === f.id ? ' work__filter--active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
              aria-pressed={activeFilter === f.id}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Desktop Bento Grid ── */}
        {!isMobileLayout && (
          <div className="work__bento-clip">
            <div className="work__bento" ref={gridRef}>
              {visibleProjects.map((project) => (
                <div key={project.slug} className="work__bento-cell">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Mobile Editorial Grid ── */}
        {isMobileLayout && (
          <>
            <div className="mobile-work" ref={mobileGridRef}>
              {visibleProjects.map((project, i) => {
                const variant = getMobileVariant(i);
                const globalIdx = mobilePage * MOBILE_PER_PAGE + i + 1;
                return (
                  <div
                    key={project.slug}
                    className={`mobile-work__item mobile-work__item--${variant}`}
                  >
                    <div className="mobile-work__card-wrap">
                      <ProjectCard project={project} />
                    </div>
                    <div className="mobile-work__meta">
                      <span className="mobile-work__index">
                        {String(globalIdx).padStart(2, '0')}
                      </span>
                      <div className="mobile-work__label">
                        <span className="mobile-work__name">{project.name}</span>
                        <span className="mobile-work__cat">{project.category}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="work__pagination">
                <button
                  className="work__pagination-btn"
                  onClick={() => setMobilePage((p) => Math.max(0, p - 1))}
                  disabled={mobilePage === 0}
                  aria-label={t('work.prev_page', 'Previous page')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <span className="work__pagination-count">
                  <span className="work__pagination-current">{String(mobilePage + 1).padStart(2, '0')}</span>
                  <span className="work__pagination-sep">/</span>
                  <span className="work__pagination-total">{String(totalPages).padStart(2, '0')}</span>
                </span>
                <button
                  className="work__pagination-btn"
                  onClick={() => setMobilePage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={mobilePage === totalPages - 1}
                  aria-label={t('work.next_page', 'Next page')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
