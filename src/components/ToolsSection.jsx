import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const STACK = [
  {
    category: 'Design',
    icon: '◉',
    tools: ['Figma', 'Photoshop'],
  },
  {
    category: 'Motion',
    icon: '▶',
    tools: ['After Effects', 'DaVinci Resolve', 'Premiere Pro'],
  },
  {
    category: '3D',
    icon: '◆',
    tools: ['Blender', 'Maya', 'Substance Painter', 'ZBrush', 'Cinema 4D'],
  },
  {
    category: 'Web',
    icon: '⌨',
    tools: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    category: 'Animation',
    icon: '◎',
    tools: ['GSAP'],
  },
  {
    category: 'Workflow',
    icon: '⟐',
    tools: ['Git', 'GitHub', 'VS Code', 'Cursor'],
  },
  {
    category: 'Currently exploring',
    icon: '→',
    tools: ['Astro', 'Interactive web experiences'],
    highlight: true,
  },
];

export default function ToolsSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const eyebrow = section.querySelector('.tools__eyebrow');
    const heading = section.querySelector('.tools__heading');
    const rows = Array.from(section.querySelectorAll('.tools__row'));

    gsap.set([eyebrow, heading], { opacity: 0, y: 20 });
    gsap.set(rows, { opacity: 0, x: -20 });

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to([eyebrow, heading], {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
        });
        tl.to(
          rows,
          { opacity: 1, x: 0, duration: 0.55, stagger: 0.07 },
          '-=0.25',
        );
      },
      { threshold: 0.25 },
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section className="tools" id="tools" ref={sectionRef}>
      <div className="tools__inner">
        <div className="tools__left">
          <span className="tools__eyebrow">Stack</span>
          <h2 className="tools__heading">
            Tools &amp;
            <br />
            Workflow.
          </h2>
          <p className="tools__sub">
            The tools I use to design, animate, and build digital experiences.
          </p>
        </div>

        <div className="tools__right">
          {STACK.map((group, gi) => (
            <div
              key={gi}
              className={`tools__row${group.highlight ? ' tools__row--explore' : ''}`}
            >
              <div className="tools__row-header">
                <span className="tools__cat-icon" aria-hidden="true">
                  {group.icon}
                </span>
                <span className="tools__cat-name">{group.category}</span>
              </div>
              <div className="tools__pills">
                {group.tools.map((tool, ti) => (
                  <span
                    key={ti}
                    className={`tools__pill${group.highlight ? ' tools__pill--explore' : ''}`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
