import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const CELL_COLORS = ['#b3f381', '#e36085', '#f0fde6', '#b3f381'];

const STATS = [
  {
    icon: '◈', rawValue: 1.8, suffix: 'M+', decimals: 1,
    label: 'Content Reach',
    desc: 'Content reaching hundreds of thousands\nto millions of views',
  },
  {
    icon: '⚡', rawValue: 4, suffix: '+', decimals: 0,
    label: 'Years Experience',
    desc: 'Working across digital content,\nmotion, and web',
  },
  {
    icon: '→', isText: true, textValue: 'Motion → Web',
    label: 'Evolution',
    desc: 'Background in motion graphics\nevolving into web development',
  },
  {
    icon: '✦', isText: true, textValue: 'Multi-Disc.',
    label: 'Skillset',
    desc: 'Experience across motion,\nweb & interactive media',
  },
];

const STACK = [
  { icon: '◉', category: 'Design',             tools: ['Figma', 'Photoshop'] },
  { icon: '▶', category: 'Motion',             tools: ['After Effects', 'DaVinci Resolve', 'Premiere Pro'] },
  { icon: '◆', category: '3D',                 tools: ['Blender', 'Maya', 'Substance Painter', 'ZBrush', 'Cinema 4D'] },
  { icon: '⌨', category: 'Web',                tools: ['HTML', 'CSS', 'JavaScript'] },
  { icon: '◎', category: 'Animation',          tools: ['GSAP'] },
  { icon: '⟐', category: 'Workflow',           tools: ['Git', 'GitHub', 'VS Code', 'Cursor'] },
  { icon: '→', category: 'Currently exploring',tools: ['React', 'Interactive web experiences'], explore: true },
];

export default function HighlightsSection() {
  const sectionRef = useRef(null);
  const cellRefs   = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cells      = cellRefs.current.filter(Boolean);
    const eyebrow    = section.querySelector('.highlights__eyebrow');
    const heading    = section.querySelector('.highlights__heading');
    const divider    = section.querySelector('.hl-strip__divider');
    const stripHead  = section.querySelector('.hl-strip__header');
    const rows       = Array.from(section.querySelectorAll('.hl-strip__row'));

    // Initial states
    gsap.set([eyebrow, heading], { opacity: 0, y: 20 });
    cells.forEach(cell => {
      gsap.set(cell.querySelector('.highlights__icon'), { opacity: 0, scale: 0.7, y: 6 });
      gsap.set(cell.querySelector('.highlights__number'), { opacity: 0, y: 24 });
      gsap.set(cell.querySelector('.highlights__meta'),   { opacity: 0, y: 14 });
    });
    gsap.set([divider, stripHead], { opacity: 0, y: 16 });
    gsap.set(rows, { opacity: 0, x: -16 });

    const counterObjs = STATS.map(() => ({ value: 0 }));

    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // ── Part 1: Highlights header
      tl.to([eyebrow, heading], { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 });

      // ── Part 2: Cards stagger (icon → number → meta)
      cells.forEach((cell, i) => {
        const d = i * 0.07;
        tl.to(cell.querySelector('.highlights__icon'),   { opacity: 1, scale: 1, y: 0, duration: 0.32 }, `<${d}`);
        tl.to(cell.querySelector('.highlights__number'), { opacity: 1, y: 0, duration: 0.5 },             `<0.1`);
        tl.to(cell.querySelector('.highlights__meta'),   { opacity: 1, y: 0, duration: 0.4 },             `<0.12`);
      });

      // ── Counter animation
      STATS.forEach((stat, i) => {
        if (stat.isText) return;
        const numEl = cells[i]?.querySelector('.highlights__number');
        if (!numEl) return;
        tl.to(counterObjs[i], {
          value: stat.rawValue, duration: 1.2, ease: 'power2.out',
          onUpdate: () => {
            const v = counterObjs[i].value;
            numEl.textContent = stat.decimals > 0
              ? v.toFixed(stat.decimals) + stat.suffix
              : Math.round(v) + stat.suffix;
          },
        }, '<-0.4');
      });

      // ── Part 3: Tools strip
      tl.to([divider, stripHead], { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, '-=0.2');
      tl.to(rows, { opacity: 1, x: 0, duration: 0.45, stagger: 0.06 }, '-=0.3');

    }, { threshold: 0.2 });

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section className="highlights" id="highlights" ref={sectionRef}>
      <div className="highlights__inner">

        {/* ── Stats header ── */}
        <div className="highlights__top">
          <span className="highlights__eyebrow">Selected Highlights</span>
          <h2 className="highlights__heading">By the numbers.</h2>
        </div>

        {/* ── 2×2 grid ── */}
        <div className="highlights__grid">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="highlights__cell"
              style={{ '--cell-color': CELL_COLORS[i] }}
            >
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

        {/* ── Tools strip ── */}
        <div className="hl-strip">
          <span className="hl-strip__divider" aria-hidden="true" />

          <div className="hl-strip__header">
            <span className="highlights__eyebrow">Stack</span>
            <h3 className="hl-strip__title">Tools &amp; Workflow.</h3>
          </div>

          <div className="hl-strip__rows">
            {STACK.map((group, gi) => (
              <div key={gi} className={`hl-strip__row${group.explore ? ' hl-strip__row--explore' : ''}`}>
                <div className="hl-strip__cat">
                  <span className="hl-strip__cat-icon" aria-hidden="true">{group.icon}</span>
                  <span className="hl-strip__cat-name">{group.category}</span>
                </div>
                <div className="tools__pills">
                  {group.tools.map((tool, ti) => (
                    <span key={ti} className={`tools__pill${group.explore ? ' tools__pill--explore' : ''}`}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
