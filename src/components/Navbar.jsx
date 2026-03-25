import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedLink from './AnimatedLink';

const SECTIONS = ['work', 'about', 'connect'];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth' });
}

function isHomePage() {
  if (typeof window === 'undefined') return false;
  const p = window.location.pathname;
  return p === '/' || p === '/es/' || p === '/es';
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const navRef = useRef(null);
  const { t, i18n } = useTranslation();

  const isES = i18n.language.startsWith('es');
  const onCaseStudy = typeof window !== 'undefined' && window.location.pathname.includes('/work/');

  // Scroll-based navbar background
  useEffect(() => {
    const navbar = navRef.current;
    if (!navbar) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        navbar.classList.toggle('navbar--scrolled', window.scrollY > 100);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver (only on home page)
  useEffect(() => {
    if (onCaseStudy) return;
    const observers = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [onCaseStudy]);

  const handleNavClick = (e, sectionId) => {
    closeMobile();
    if (isHomePage()) {
      e.preventDefault();
      scrollToSection(sectionId);
    }
    // else: let the href="/#section" navigate normally
  };

  const toggleLang = () => {
    const next = isES ? 'en' : 'es';
    i18n.changeLanguage(next);
    if (!onCaseStudy) {
      window.location.href = isES ? '/' : '/es/';
    }
  };

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  const homeBase = isES ? '/es/' : '/';

  const links = [
    { key: 'work',    label: t('nav.work'),    section: 'work' },
    { key: 'about',   label: t('nav.about'),   section: 'about' },
    { key: 'contact', label: t('nav.contact'), section: 'connect' },
  ];

  return (
    <nav className="navbar hero-hidden" ref={navRef} id="navbar">
      <a href={homeBase} className="navbar__logo-link">
        <img src="/assets/logos/logo.svg" alt="JozeDzn logo" className="navbar__logo" />
      </a>

      <div className={`navbar__links${mobileOpen ? ' mobile-open' : ''}`}>
        {links.map(({ key, label, section }) => (
          <AnimatedLink
            key={key}
            text={label}
            href={`${isHomePage() ? '' : homeBase}#${section}`}
            onClick={(e) => handleNavClick(e, section)}
            className={activeSection === section ? 'nav-active' : ''}
          />
        ))}
      </div>

      <button
        className="navbar__lang"
        onClick={toggleLang}
        aria-label="Switch language"
        title={isES ? 'Switch to English' : 'Cambiar a Español'}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {isES ? 'EN' : 'ES'}
      </button>

      <div
        className={`navbar__hamburger${mobileOpen ? ' active' : ''}`}
        onClick={toggleMobile}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
