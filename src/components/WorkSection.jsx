import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories } from '../data/projects';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const allProjects = categories.flatMap(cat =>
  cat.projects
    .filter(p => p.caseStudy?.en?.overview || p.caseStudy?.es?.overview)
    .map(p => ({ ...p, category: cat.title, categoryId: cat.id }))
);

/*
 * Desktop grid layout — dramatic asymmetric bento:
 *
 * ROW 1:  [──── HERO 2col ────] [TALL 3:4]
 * ROW 2:  [SQ 1:1][── WIDE ──] [TALL cont]
 * ROW 3:  [SQ cont][── CINEMA 2col ───────]
 * ROW 4:  [────── FULL-WIDTH SHOWCASE ─────]
 * ROW 5:  [PORTRAIT][LANDSCAPE] [SQUARE]
 *
 * 9 cells, each with unique aspect + position
 */
const DESKTOP_LAYOUT = [
  { id: 'a', col: '1 / 3', row: '1 / 2', ar: '16 / 7'  },    // hero wide
  { id: 'b', col: '3 / 4', row: '1 / 3', ar: '3 / 4'   },    // tall portrait
  { id: 'c', col: '1 / 2', row: '2 / 4', ar: '4 / 5'   },    // tall left
  { id: 'd', col: '2 / 3', row: '2 / 3', ar: '16 / 9'  },    // landscape
  { id: 'e', col: '2 / 4', row: '3 / 4', ar: '21 / 9'  },    // cinematic wide
  { id: 'f', col: '1 / 4', row: '4 / 5', ar: '3 / 1'   },    // full-width showcase
  { id: 'g', col: '1 / 2', row: '5 / 6', ar: '3 / 4'   },    // portrait
  { id: 'h', col: '2 / 3', row: '5 / 6', ar: '16 / 10' },    // landscape
  { id: 'i', col: '3 / 4', row: '5 / 6', ar: '1 / 1'   },    // square
];

const MOBILE_PATTERN = ['hero', 'portrait', 'landscape', 'cinematic'];
function getMobileVariant(i) { return MOBILE_PATTERN[i % MOBILE_PATTERN.length]; }

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

  useEffect(() => { setMobilePage(0); }, [activeFilter, isMobileLayout]);

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

  // ── Desktop premium GSAP animations ──
  useGSAP(() => {
    if (isMobileLayout) return;
    const grid = gridRef.current;
    if (!grid) return;
    const cells = Array.from(grid.querySelectorAll('.bento__cell'));
    if (!cells.length) return;

    // Initial state: each cell hidden with unique transform
    cells.forEach((cell, i) => {
      const direction = i % 3; // 0=left, 1=bottom, 2=right
      gsap.set(cell, {
        opacity: 0,
        scale: 0.88,
        y: direction === 1 ? 80 : 40,
        x: direction === 0 ? -40 : direction === 2 ? 40 : 0,
        filter: 'blur(8px)',
      });
    });

    // Staggered reveal on scroll
    ScrollTrigger.batch(cells, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        batch.forEach((cell, bi) => {
          gsap.to(cell, {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            delay: bi * 0.08,
            ease: 'power3.out',
          });
        });
      },
    });

    // Image parallax inside each cell
    cells.forEach((cell) => {
      const media = cell.querySelector('.project-card__media-wrap');
      if (!media) return;

      const travel = 60;
      gsap.set(media, { yPercent: -3 });

      gsap.to(media, {
        yPercent: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: cell,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    });

    // Subtle scale on the full-width showcase cell
    const showcase = grid.querySelector('.bento__cell--f');
    if (showcase) {
      gsap.fromTo(showcase, { scale: 0.96 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: showcase,
          start: 'top bottom',
          end: 'center center',
          scrub: 0.8,
        },
      });
    }

  }, { scope: gridRef, dependencies: [activeFilter, isMobileLayout] });

  // ── Mobile GSAP animations ──
  useGSAP(() => {
    if (!isMobileLayout) return;
    const grid = mobileGridRef.current;
    if (!grid) return;
    const items = Array.from(grid.querySelectorAll('.mobile-work__item'));
    if (!items.length) return;

    items.forEach((item) => {
      const index = item.querySelector('.mobile-work__index');
      const label = item.querySelector('.mobile-work__label');
      gsap.set(item, { opacity: 0 });

      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.fromTo(item,
            { opacity: 0, y: 60, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
            0
          );
          if (index) {
            tl.fromTo(index, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.2);
          }
          if (label) {
            tl.fromTo(label, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.3);
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
  const desktopProjects = filtered.slice(0, 9);
  const visibleMobile = isMobileLayout
    ? filtered.slice(mobilePage * MOBILE_PER_PAGE, (mobilePage + 1) * MOBILE_PER_PAGE)
    : [];

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

        {/* ── Desktop Dramatic Bento ── */}
        {!isMobileLayout && (
          <div className="work__bento-clip">
            <div className="bento" ref={gridRef}>
              {desktopProjects.map((project, i) => {
                const layout = DESKTOP_LAYOUT[i];
                if (!layout) return null;
                const globalIdx = i + 1;
                return (
                  <div
                    key={project.slug}
                    className={`bento__cell bento__cell--${layout.id}`}
                    style={{
                      gridColumn: layout.col,
                      gridRow: layout.row,
                      aspectRatio: layout.ar,
                    }}
                  >
                    <div className="bento__card-wrap">
                      <ProjectCard project={project} />
                    </div>
                    <span className="bento__index">{String(globalIdx).padStart(2, '0')}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Mobile Editorial Grid ── */}
        {isMobileLayout && (
          <>
            <div className="mobile-work" ref={mobileGridRef}>
              {visibleMobile.map((project, i) => {
                const variant = getMobileVariant(i);
                const globalIdx = mobilePage * MOBILE_PER_PAGE + i + 1;
                return (
                  <div key={project.slug} className={`mobile-work__item mobile-work__item--${variant}`}>
                    <div className="mobile-work__card-wrap">
                      <ProjectCard project={project} />
                    </div>
                    <div className="mobile-work__meta">
                      <span className="mobile-work__index">{String(globalIdx).padStart(2, '0')}</span>
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
