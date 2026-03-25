import { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import ScrollReveal from './ScrollReveal';

const CELL_COLORS = ['#b3f381', '#e36085', '#f0fde6', '#b3f381'];

const STATS_BASE = [
  { icon: '◈', rawValue: 1.8, suffix: 'M+', decimals: 1 },
  { icon: '⚡', rawValue: 4,   suffix: '+',  decimals: 0 },
  { icon: '→', isText: true, textValue: 'Motion → Web' },
  { icon: '✦', isText: true, textValue: 'Multi-Disc.' },
];

const STACK = [
  { icon: '◉', cat: 'Design',             tools: ['Figma', 'Photoshop'] },
  { icon: '▶', cat: 'Motion',             tools: ['After Effects', 'DaVinci Resolve', 'Premiere Pro'] },
  { icon: '◆', cat: '3D',                 tools: ['Blender', 'Maya', 'Substance Painter', 'ZBrush', 'Cinema 4D'] },
  { icon: '⌨', cat: 'Web',                tools: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { icon: '◎', cat: 'Animation',          tools: ['GSAP'] },
  { icon: '⟐', cat: 'Workflow',           tools: ['Git', 'GitHub', 'VS Code', 'Cursor'] },
  { icon: '→', cat: 'Currently exploring',tools: ['Astro', 'Interactive web experiences'], explore: true },
];

export default function AboutSection() {
  const { t } = useTranslation();
  const statsI18n = t('about.stats', { returnObjects: true });
  const STATS = STATS_BASE.map((s, i) => ({ ...s, label: statsI18n[i]?.label, desc: statsI18n[i]?.desc }));

  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const taglineRef  = useRef(null);
  const locationRef = useRef(null);
  const bioRef      = useRef(null);
  const cellRefs    = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const titleChars = Array.from(titleRef.current?.querySelectorAll('.char') ?? []);
    const tagline    = taglineRef.current;
    const location   = locationRef.current;
    const bio        = bioRef.current;
    const cells      = cellRefs.current.filter(Boolean);

    const statsEyebrow  = section.querySelector('.about-stats__eyebrow');
    const statsHeading  = section.querySelector('.about-stats__heading');
    const stripDivider  = section.querySelector('.hl-strip__divider');
    const stripHeader   = section.querySelector('.hl-strip__header');
    const rows          = Array.from(section.querySelectorAll('.hl-strip__row'));

    // Initial states — left column
    gsap.set(titleChars, { y: '110%', opacity: 0 });
    gsap.set([tagline, location, bio].filter(Boolean), { opacity: 0, y: 18 });

    // Initial states — right column
    gsap.set([statsEyebrow, statsHeading].filter(Boolean), { opacity: 0, y: 16 });
    cells.forEach(cell => {
      gsap.set(cell.querySelector('.highlights__icon'),   { opacity: 0, scale: 0.7, y: 6 });
      gsap.set(cell.querySelector('.highlights__number'), { opacity: 0, y: 20 });
      gsap.set(cell.querySelector('.highlights__meta'),   { opacity: 0, y: 12 });
    });
    gsap.set([stripDivider, stripHeader].filter(Boolean), { opacity: 0, y: 14 });
    gsap.set(rows, { opacity: 0, x: -14 });

    const counterObjs = STATS.map(() => ({ value: 0 }));

    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Left: title chars
      tl.to(titleChars, { y: '0%', opacity: 1, duration: 0.85, stagger: 0.025 });
      // Left: tagline, location, bio — overlapping
      tl.to([tagline, location].filter(Boolean), { opacity: 1, y: 0, duration: 0.55, stagger: 0.07 }, '-=0.5');
      tl.to(bio, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35');

      // Right: stats header
      tl.to([statsEyebrow, statsHeading].filter(Boolean), { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, '<-0.6');

      // Right: cells stagger
      cells.forEach((cell, i) => {
        const d = 0.06 + i * 0.06;
        tl.to(cell.querySelector('.highlights__icon'),   { opacity: 1, scale: 1, y: 0, duration: 0.3  }, `<${d}`);
        tl.to(cell.querySelector('.highlights__number'), { opacity: 1, y: 0, duration: 0.45 },            `<0.1`);
        tl.to(cell.querySelector('.highlights__meta'),   { opacity: 1, y: 0, duration: 0.38 },            `<0.1`);
      });

      // Counter animation
      STATS.forEach((stat, i) => {
        if (stat.isText) return;
        const numEl = cells[i]?.querySelector('.highlights__number');
        if (!numEl) return;
        tl.to(counterObjs[i], {
          value: stat.rawValue, duration: 1.1, ease: 'power2.out',
          onUpdate: () => {
            const v = counterObjs[i].value;
            numEl.textContent = stat.decimals > 0
              ? v.toFixed(stat.decimals) + stat.suffix
              : Math.round(v) + stat.suffix;
          },
        }, '<-0.35');
      });

      // Tools strip
      tl.to([stripDivider, stripHeader].filter(Boolean), { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, '-=0.2');
      tl.to(rows, { opacity: 1, x: 0, duration: 0.4, stagger: 0.055 }, '-=0.3');

    }, { threshold: 0.15 });

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section className="about-full" id="about" ref={sectionRef}>
      <div className="about-full__inner">

        {/* ════ LEFT: identity + bio ════ */}
        <div className="about-full__left">
          <span className="about__label">{t('about.label')}</span>

          <h2 className="about__title" ref={titleRef} aria-label="Creative Developer">
            {['Creative', 'Developer'].map((word, wi) => (
              <span key={wi} className="about__title-line">
                {word.split('').map((char, ci) => (
                  <span key={ci} className="char">{char}</span>
                ))}
              </span>
            ))}
          </h2>

          <p className="about__tagline" ref={taglineRef}>
            {t('about.tagline')}
          </p>

          <p className="about__location" ref={locationRef}>
            {t('about.location')}
          </p>

          <div className="about__bio" ref={bioRef}>
            <ScrollReveal
              as="p"
              containerClassName="about__para about__para--lead about__para--reveal"
              baseOpacity={0.07}
              enableBlur
              blurStrength={4}
              baseRotation={2}
              wordAnimationEnd="bottom center"
            >
              {t('about.bio')}
            </ScrollReveal>
          </div>
        </div>

        {/* ════ RIGHT: stats + tools ════ */}
        <div className="about-full__right">

          {/* Stats header */}
          <div className="about-stats__header">
            <span className="about-stats__eyebrow">{t('about.highlights_eyebrow')}</span>
            <h3 className="about-stats__heading">{t('about.highlights_heading')}</h3>
          </div>

          {/* 2×2 grid */}
          <div className="highlights__grid about-stats__grid">
            {STATS.map((stat, i) => (
              <div key={i} className="highlights__cell" style={{ '--cell-color': CELL_COLORS[i] }}>
                <div className="highlights__card-face" ref={el => (cellRefs.current[i] = el)}>
                  <span className="highlights__icon" aria-hidden="true">{stat.icon}</span>
                  <p className={`highlights__number${stat.isText ? ' highlights__number--text' : ''}`}>
                    {stat.isText ? stat.textValue : '0' + stat.suffix}
                  </p>
                  <div className="highlights__meta">
                    <span className="highlights__label">{stat.label}</span>
                    <p className="highlights__desc">
                      {stat.desc.split('\n').map((line, li, arr) => (
                        <span key={li}>{line}{li < arr.length - 1 && <br />}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tools strip */}
          <div className="hl-strip">
            <span className="hl-strip__divider" aria-hidden="true" />
            <div className="hl-strip__header">
              <span className="highlights__eyebrow">{t('about.stack_eyebrow')}</span>
              <h4 className="hl-strip__title">{t('about.stack_heading')}</h4>
            </div>
            <div className="hl-strip__rows">
              {STACK.map((g, gi) => (
                <div key={gi} className={`hl-strip__row${g.explore ? ' hl-strip__row--explore' : ''}`}>
                  <div className="hl-strip__cat">
                    <span className="hl-strip__cat-icon" aria-hidden="true">{g.icon}</span>
                    <span className="hl-strip__cat-name">{t(`about.stack_cats.${g.cat}`, g.cat)}</span>
                  </div>
                  <div className="tools__pills">
                    {g.tools.map((tool, ti) => (
                      <span key={ti} className={`tools__pill${g.explore ? ' tools__pill--explore' : ''}`}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
