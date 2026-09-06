import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { shouldReduceMotion } from '../utils/motion';

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) return;

  const reducedMotion = shouldReduceMotion();
  if (window.__lenis && !reducedMotion) {
    window.__lenis.scrollTo(element, { duration: 1 });
    return;
  }

  element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
}
export default function SectionNav() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  const sections = [
    { label: t('nav.home'), id: 'hero' },
    { label: t('nav.work'), id: 'work' },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.contact'), id: 'connect' },
  ];

  useEffect(() => {
    const reducedMotion = shouldReduceMotion();
    const timeout = setTimeout(() => setVisible(true), reducedMotion ? 0 : 2200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const observers = sections.map((section, index) => {
      const element = document.getElementById(section.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index);
        },
        { rootMargin: '-35% 0px -55%', threshold: 0 },
      );
      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  const theme = active === 1 ? 'light' : 'dark';

  return (
    <nav
      className="section-nav"
      data-theme={theme}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(12px)',
      }}
      aria-label={t('nav.sections')}
    >
      {sections.map((section, index) => (
        <button
          key={section.id}
          className={`section-nav__item${active === index ? ' active' : ''}`}
          onClick={() => scrollToSection(section.id)}
          aria-label={t('nav.go_to', { section: section.label })}
          aria-current={active === index ? 'location' : undefined}
          title={section.label}
        >
          <span className="section-nav__dot" aria-hidden="true" />
          <span className="section-nav__label">{section.label}</span>
        </button>
      ))}
    </nav>
  );
}
