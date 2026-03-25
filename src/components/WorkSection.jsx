import { useState, useRef, useEffect } from 'react';
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

export default function WorkSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [mobilePage, setMobilePage] = useState(0);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
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

  useGSAP(() => {
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

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (!isMobile) {
      // ── Parallax del contenedor en Lastpay (0) y Valleyhub (3) ──
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

      // ── Parallax imagen interna en todas las cards ──
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
    }

  }, { scope: gridRef, dependencies: [activeFilter] });

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

        <div className="work__bento-clip">
          <div className="work__bento" ref={gridRef}>
            {visibleProjects.map((project) => (
              <div key={project.slug} className="work__bento-cell">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {isMobileLayout && totalPages > 1 && (
          <div className="work__pagination">
            <button
              className="work__pagination-btn"
              onClick={() => setMobilePage((p) => Math.max(0, p - 1))}
              disabled={mobilePage === 0}
              aria-label="Página anterior"
            >←</button>
            <span className="work__pagination-count">{mobilePage + 1} / {totalPages}</span>
            <button
              className="work__pagination-btn"
              onClick={() => setMobilePage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={mobilePage === totalPages - 1}
              aria-label="Página siguiente"
            >→</button>
          </div>
        )}

      </div>
    </section>
  );
}
