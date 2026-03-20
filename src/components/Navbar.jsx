import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnimatedLink from './AnimatedLink';

// Map nav link keys to the section IDs they correspond to
const LINK_SECTIONS = {
  work:    ['work'],
  connect: ['connect'],
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeLink, setActiveLink]   = useState(null); // 'work' | 'connect' | null
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(next);
  };

  // Scroll-based: dark background + active link detection
  useEffect(() => {
    const navbar = navRef.current;
    if (!navbar) return;

    const workEl    = document.getElementById('work');
    const connectEl = document.getElementById('connect');

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        navbar.classList.toggle('navbar--scrolled', window.scrollY > 100);

        const sy = window.scrollY;
        const vh = window.innerHeight;
        const aboutEl = document.getElementById('about');

        if (connectEl && sy >= connectEl.offsetTop - vh * 0.4) {
          setActiveLink('connect');
        } else if (aboutEl && sy >= aboutEl.offsetTop - vh * 0.4) {
          setActiveLink('about');
        } else if (workEl && sy >= workEl.offsetTop - vh * 0.4) {
          setActiveLink('work');
        } else {
          setActiveLink(null);
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchorClick = (e, hash) => {
    e.preventDefault();
    setMobileOpen(false);
    document.body.style.overflow = '';

    if (location.pathname !== '/') {
      navigate('/' + hash);
      return;
    }

    const id = hash.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  return (
    <nav className="navbar hero-hidden" ref={navRef} id="navbar">
      <a href="#hero" className="navbar__logo-link" onClick={(e) => handleAnchorClick(e, '#hero')}>
        <img src="/assets/logos/logo.svg" alt="JozeDzn logo" className="navbar__logo" />
      </a>

      <div className={`navbar__links${mobileOpen ? ' mobile-open' : ''}`}>
        <AnimatedLink
          text={t('nav.work')}
          href="#work"
          onClick={(e) => handleAnchorClick(e, '#work')}
          className={activeLink === 'work' ? 'nav-active' : ''}
        />
        <AnimatedLink
          text={t('nav.about')}
          href="#about"
          onClick={(e) => handleAnchorClick(e, '#about')}
          className={activeLink === 'about' ? 'nav-active' : ''}
        />
        <AnimatedLink
          text={t('nav.contact')}
          href="#connect"
          onClick={(e) => handleAnchorClick(e, '#connect')}
          className={activeLink === 'connect' ? 'nav-active' : ''}
        />
      </div>

      <button
        className="navbar__lang"
        onClick={toggleLang}
        aria-label="Switch language"
        title={i18n.language.startsWith('es') ? 'Switch to English' : 'Cambiar a Español'}
      >
        {i18n.language.startsWith('es') ? 'EN' : 'ES'}
      </button>

      <div
        className={`navbar__hamburger${mobileOpen ? ' active' : ''}`}
        onClick={toggleMobile}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
