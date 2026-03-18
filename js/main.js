history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  initIntroSequence();
  initStickyCarousel();
  initScrollReveal();
  initNavbarScroll();
  initMobileMenu();
  initCustomCursor();
  initScrollProgress();
  initParallaxCards();
  initSmoothScroll();
});

/* ═══════════════════════════════════════════
   INTRO SEQUENCE
   ═══════════════════════════════════════════ */
function initIntroSequence() {
  const heroBg     = document.getElementById('heroBg');
  const navbar     = document.getElementById('navbar');
  const heroEls    = document.getElementById('heroElements');
  const heroTitle  = document.getElementById('heroTitle');
  const heroSub    = document.getElementById('heroSubtitle');

  if (!heroBg || !navbar || !heroEls || !heroTitle) return;

  splitHeroTitle(heroTitle);

  // 60ms timeout: gives the browser time to paint translateY(-100%)
  // before the transition fires. More reliable than double-rAF across browsers.
  setTimeout(() => {
    heroBg.classList.add('animate-in');
  }, 60);

  const BG_DUR = 900; // matches CSS transition duration

  setTimeout(() => {
    navbar.classList.remove('hero-hidden');
    navbar.classList.add('hero-visible');
  }, BG_DUR * 0.6);

  setTimeout(() => {
    heroEls.classList.add('animate-in');
    setTimeout(() => {
      heroTitle.querySelectorAll('.char').forEach((c, i) => {
        setTimeout(() => c.classList.add('animate'), i * 50);
      });
      const totalCharTime = heroTitle.querySelectorAll('.char').length * 50 + 300;
      setTimeout(() => heroSub?.classList.add('animate-in'), totalCharTime);
    }, 100);
  }, BG_DUR * 0.6 + 200);
}

function splitHeroTitle(title) {
  const text = title.textContent.trim();
  title.textContent = '';
  title.setAttribute('aria-label', text);
  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = char === ' ' ? '\u00A0' : char;
    title.appendChild(span);
  });
}

/* ═══════════════════════════════════════════
   STICKY CAROUSEL — scroll-position driven
   No wheel interception. Each zone gets extra height
   so the sticky panel stays pinned while the native
   scroll drives the horizontal carousel via translateX.
   CSS bezier transition on the track handles smoothness.
   ═══════════════════════════════════════════ */
function initStickyCarousel() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  const zones = Array.from(document.querySelectorAll('.work__category-zone'));
  if (!zones.length) return;

  function getZoneData(zone) {
    const panel = zone.querySelector('.work__category');
    const track = zone.querySelector('.work__projects');
    if (!panel || !track) return null;
    return {
      panel,
      track,
      overflow: Math.max(0, track.scrollWidth - panel.clientWidth)
    };
  }

  function setupHeights() {
    zones.forEach(zone => {
      const d = getZoneData(zone);
      if (!d) return;
      zone.style.height = (window.innerHeight + d.overflow) + 'px';
    });
  }
  setupHeights();
  window.addEventListener('resize', setupHeights);

  // Carousel dots
  zones.forEach(zone => {
    const inner = zone.querySelector('.work__category__inner');
    const track = zone.querySelector('.work__projects');
    if (!inner || !track) return;
    const n = track.querySelectorAll('.project-card').length;
    if (n <= 1) return;
    const wrap = document.createElement('div');
    wrap.className = 'work__carousel-dots';
    for (let i = 0; i < n; i++) {
      const dot = document.createElement('span');
      dot.className = 'work__carousel-dot' + (i === 0 ? ' active' : '');
      wrap.appendChild(dot);
    }
    inner.appendChild(wrap);
  });

  function update() {
    const vh = window.innerHeight;
    const sy = window.scrollY;

    zones.forEach(zone => {
      const d = getZoneData(zone);
      if (!d) return;

      const top       = zone.offsetTop;
      const h         = zone.offsetHeight;
      const inZone    = sy - top;
      const maxScroll = h - vh;

      if (inZone < -vh || inZone > h) return;
      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, inZone / maxScroll));

      d.track.style.transform = `translateX(${-d.overflow * progress}px)`;

      // Dots
      const dots = zone.querySelectorAll('.work__carousel-dot');
      if (dots.length > 1) {
        const ai = Math.round(progress * (dots.length - 1));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === ai));
      }

      // Reveal title
      const title = zone.querySelector('.work__category-title');
      if (title && inZone > -vh * 0.5) title.classList.add('visible');
    });
  }

  let raf;
  window.addEventListener('scroll', () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(update);
  }, { passive: true });
  update();
}

/* ═══════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ═══════════════════════════════════════════
   NAVBAR — darken on scroll
   ═══════════════════════════════════════════ */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('navbar--scrolled', window.scrollY > 100);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ═══════════════════════════════════════════
   MOBILE MENU
   ═══════════════════════════════════════════ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-open', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });
}

/* ═══════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════ */
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  if (!cursor || window.matchMedia('(max-width: 768px)').matches) return;

  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function animate() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX - 8}px, ${cursorY - 8}px)`;
    requestAnimationFrame(animate);
  })();

  document.querySelectorAll('a, button, .project-card, .skill-badge, .navbar__hamburger')
    .forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

/* ═══════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (docH > 0 ? (window.scrollY / docH) * 100 : 0) + '%';
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ═══════════════════════════════════════════
   PARALLAX TILT ON PROJECT CARDS
   ═══════════════════════════════════════════ */
function initParallaxCards() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ═══════════════════════════════════════════
   SMOOTH SCROLL FOR ANCHOR LINKS
   ═══════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });
}
