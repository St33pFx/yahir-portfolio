import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import AnimatedLink from './AnimatedLink';

const SECTIONS = ['work', 'about', 'connect'];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
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
  const menuRef = useRef(null);
  const tlRef = useRef(null);
  const isAnimating = useRef(false);
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

  // Build GSAP timeline for mobile menu
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const overlay = menu.querySelector('.mobile-menu__overlay');
    const links = menu.querySelectorAll('.mobile-menu__link');
    const linkLines = menu.querySelectorAll('.mobile-menu__link-line');
    const footer = menu.querySelector('.mobile-menu__footer');
    const footerItems = footer ? footer.children : [];

    const tl = gsap.timeline({ paused: true });

    // 1. Overlay fades in with clip-path from top-right (hamburger area)
    tl.set(menu, { visibility: 'visible' });
    tl.fromTo(overlay,
      { clipPath: 'circle(0% at calc(100% - 36px) 36px)' },
      { clipPath: 'circle(150% at calc(100% - 36px) 36px)', duration: 0.7, ease: 'power3.inOut' },
      0
    );

    // 2. Links slide up with stagger
    tl.fromTo(links,
      { y: 80, opacity: 0, rotateX: 40 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' },
      0.3
    );

    // 3. Separator lines wipe in
    tl.fromTo(linkLines,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
      0.35
    );

    // 4. Footer items fade in
    tl.fromTo([...footerItems],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
      0.55
    );

    tlRef.current = tl;

    return () => tl.kill();
  }, []);

  const openMenu = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setMobileOpen(true);
    document.body.style.overflow = 'hidden';
    tlRef.current?.restart();
    tlRef.current?.play();
    setTimeout(() => { isAnimating.current = false; }, 700);
  }, []);

  const closeMenu = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    tlRef.current?.reverse();
    setTimeout(() => {
      setMobileOpen(false);
      document.body.style.overflow = '';
      isAnimating.current = false;
      if (menuRef.current) {
        menuRef.current.style.visibility = 'hidden';
      }
    }, 700);
  }, []);

  const toggleMobile = () => {
    if (mobileOpen) closeMenu();
    else openMenu();
  };

  const handleNavClick = (e, sectionId) => {
    closeMenu();
    if (isHomePage()) {
      e.preventDefault();
      // Delay scroll until menu closes
      setTimeout(() => scrollToSection(sectionId), 400);
    }
  };

  const toggleLang = () => {
    const next = isES ? 'en' : 'es';
    i18n.changeLanguage(next);
    if (!onCaseStudy) {
      window.location.href = isES ? '/' : '/es/';
    }
  };

  const homeBase = isES ? '/es/' : '/';

  const links = [
    { key: 'work',    label: t('nav.work'),    section: 'work' },
    { key: 'about',   label: t('nav.about'),   section: 'about' },
    { key: 'contact', label: t('nav.contact'), section: 'connect' },
  ];

  return (
    <>
      <nav className="navbar hero-hidden" ref={navRef} id="navbar">
        <a href={homeBase} className="navbar__logo-link">
          <img src="/assets/logos/logo.svg" alt="JozeDzn logo" className="navbar__logo" />
        </a>

        {/* Desktop links */}
        <div className="navbar__links">
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

        <button
          className={`navbar__hamburger${mobileOpen ? ' active' : ''}`}
          onClick={toggleMobile}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* ── Full-screen mobile menu ── */}
      <div className="mobile-menu" ref={menuRef} style={{ visibility: 'hidden' }}>
        <div className="mobile-menu__overlay" />
        <div className="mobile-menu__content">
          <div className="mobile-menu__nav">
            {links.map(({ key, label, section }, i) => (
              <div key={key} className="mobile-menu__link-wrap">
                {i === 0 && <div className="mobile-menu__link-line" />}
                <a
                  className="mobile-menu__link"
                  href={`${isHomePage() ? '' : homeBase}#${section}`}
                  onClick={(e) => handleNavClick(e, section)}
                >
                  <span className="mobile-menu__link-index">0{i + 1}</span>
                  <span className="mobile-menu__link-text">{label}</span>
                </a>
                <div className="mobile-menu__link-line" />
              </div>
            ))}
          </div>

          <div className="mobile-menu__footer">
            <a href="mailto:hello@jozedzn.com" className="mobile-menu__email">
              hello@jozedzn.com
            </a>
            <div className="mobile-menu__socials">
              <a href="https://linkedin.com/in/jozedzn" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span className="mobile-menu__divider">/</span>
              <a href="https://instagram.com/jozemotion" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <button className="mobile-menu__lang" onClick={toggleLang}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {isES ? 'Switch to English' : 'Cambiar a Español'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
