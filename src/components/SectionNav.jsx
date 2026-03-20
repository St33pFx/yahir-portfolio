import { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  { label: 'Home',       id: 'hero' },
  { label: 'Motion',     zone: 0 },
  { label: '3D Art',     zone: 1 },
  { label: 'Web',        zone: 2 },
  { label: 'About',   id: 'about' },
  { label: 'Connect', id: 'connect' },
];

function eioQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

function smoothScrollTo(el, duration = 750) {
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.scrollY;
  const startY = window.scrollY;
  const dist = targetY - startY;
  if (Math.abs(dist) < 2) return;

  let t0 = null;
  const step = (ts) => {
    if (!t0) t0 = ts;
    const t = Math.min((ts - t0) / duration, 1);
    window.scrollTo(0, startY + dist * eioQuart(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function getEl(section) {
  if (section.id) return document.getElementById(section.id);
  if (section.zone != null)
    return document.querySelector(
      `.work__category-zone[data-index="${section.zone}"]`,
    );
  return null;
}

export default function SectionNav() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ioRef = useRef(null);

  // Fade nav in after hero intro settles
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2200);
    return () => clearTimeout(t);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = [];

    SECTIONS.forEach((sec, i) => {
      const el = getEl(sec);
      if (!el) return;

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.5 },
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  const handleClick = (i) => {
    const sec = SECTIONS[i];
    const el = getEl(sec);
    if (!el) return;

    // For work zones: reset carousel to card 0
    if (sec.zone != null) {
      window.dispatchEvent(
        new CustomEvent('sectionnav:goto', { detail: { zoneIndex: sec.zone } }),
      );
    }

    // Lock the carousel's wheel handler for the duration of the smooth scroll
    // so it doesn't snap-fight with the programmatic navigation
    window.dispatchEvent(new CustomEvent('sectionnav:navigate'));

    smoothScrollTo(el);
  };

  // Work zones (indices 1–3) have a light background → pink palette
  // Hero (0), About (4), Connect (5) are dark → green palette
  const theme = active >= 1 && active <= 3 ? 'light' : 'dark';

  return (
    <nav
      className="section-nav"
      data-theme={theme}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(12px)',
        transition:
          'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
      aria-label="Section navigation"
    >
      {SECTIONS.map((sec, i) => (
        <button
          key={i}
          className={`section-nav__item${active === i ? ' active' : ''}`}
          onClick={() => handleClick(i)}
          aria-label={`Go to ${sec.label}`}
          title={sec.label}
        >
          <span className="section-nav__dot" />
          <span className="section-nav__label">{sec.label}</span>
        </button>
      ))}
    </nav>
  );
}
