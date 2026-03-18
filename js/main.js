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
        setTimeout(() => c.classList.add('animate'), i * 70);
      });
      const totalCharTime = heroTitle.querySelectorAll('.char').length * 70 + 400;
      setTimeout(() => heroSub?.classList.add('animate-in'), totalCharTime);
    }, 100);
  }, BG_DUR * 0.6 + 200);
}

function splitHeroTitle(title) {
  const text = title.textContent.trim();
  title.textContent = '';
  title.setAttribute('aria-label', text);

  // Hover fonts pool — mix of contrasting styles
  const hoverFonts = [
    '"Inter", sans-serif',
    '"Georgia", serif',
    '"Courier New", monospace',
    'system-ui, sans-serif',
    '"Times New Roman", serif',
    '"Arial Black", sans-serif',
    '"Palatino", serif',
  ];

  // Hover colors pool
  const hoverColors = [
    '#e36085',   // pink
    '#ff6b6b',   // coral
    '#ffd93d',   // yellow
    '#6bcb77',   // green
    '#4d96ff',   // blue
    '#ff8e53',   // orange
    '#c084fc',   // purple
  ];

  const originalFont  = 'Bulevar';
  const originalColor = '';  // let CSS handle it

  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = char === ' ' ? '\u00A0' : char;

    // ── Hover enter ──
    span.addEventListener('mouseenter', () => {
      const randFont  = hoverFonts[Math.floor(Math.random() * hoverFonts.length)];
      const randColor = hoverColors[Math.floor(Math.random() * hoverColors.length)];
      const randRot   = (Math.random() - 0.5) * 24;  // -12° to +12°
      const randScale = 1.05 + Math.random() * 0.2;   // 1.05 to 1.25

      span.style.fontFamily = randFont;
      span.style.color      = randColor;
      span.style.transform  = `translateY(0) scale(${randScale}) rotate(${randRot}deg)`;
    });

    // ── Hover leave ──
    span.addEventListener('mouseleave', () => {
      span.style.fontFamily = '';
      span.style.color      = '';
      span.style.transform  = '';
    });

    title.appendChild(span);
  });
}

/* ═══════════════════════════════════════════
   STICKY CAROUSEL
   Technique: wheel events are intercepted only when
   IntersectionObserver confirms the zone is fully
   centered in the viewport (≥50% of zone visible).
   Each card-to-card move is animated in JS using an
   easeInOutCubic rAF loop — no CSS transition involved.
   When the last card is reached, scroll is released so
   the page naturally advances to the next section.
   ═══════════════════════════════════════════ */
function initStickyCarousel() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  const zones = Array.from(document.querySelectorAll('.work__category-zone'));
  if (!zones.length) return;

  // Zone and its panel share the same exact pixel height
  function setupHeights() {
    const h = window.innerHeight + 'px';
    zones.forEach(z => {
      z.style.height = h;
      const panel = z.querySelector('.work__category');
      if (panel) panel.style.height = h;
    });
  }
  setupHeights();
  window.addEventListener('resize', () => {
    setupHeights();
    offsetCache.length = 0;
    zones.forEach((_, zi) => placeCard(zi, state[zi].card, true));
  });

  // ── Offsets cache ──
  // For each zone, pre-compute the translateX that centers every card.
  const offsetCache = [];

  function getOffsets(zi) {
    if (offsetCache[zi]) return offsetCache[zi];
    const zone  = zones[zi];
    const panel = zone.querySelector('.work__category');
    const trackWrap = zone.querySelector('.work__projects-track');
    const tr    = zone.querySelector('.work__projects');
    if (!panel || !trackWrap || !tr) return [0];
    const cards      = Array.from(tr.querySelectorAll('.project-card'));
    // Use the visible clip container width, not the full panel
    const containerW = trackWrap.clientWidth;
    const maxTx      = -(tr.scrollWidth - containerW);
    const result = cards.map(card => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const tx = -(cardCenter - containerW / 2);
      return Math.max(maxTx, Math.min(0, tx));
    });
    offsetCache[zi] = result;
    return result;
  }

  // ── Per-zone state ──
  const state = zones.map(() => ({
    card:      0,     // currently shown card index
    tx:        0,     // current translateX (kept in sync with rAF)
    animating: false,
    rafId:     null,
    active:    false, // set by IntersectionObserver
  }));

  // ── Helpers ──
  function track(zi) {
    return zones[zi].querySelector('.work__projects');
  }

  function updateDots(zi) {
    const dots = zones[zi].querySelectorAll('.work__carousel-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === state[zi].card));
  }

  // Place a card instantly (no animation), used on init and resize
  function placeCard(zi, cardIdx, skipTransition = false) {
    const s  = state[zi];
    const tr = track(zi);
    if (!tr) return;
    const offsets = getOffsets(zi);
    const tx = offsets[cardIdx] ?? 0;
    s.card = cardIdx;
    s.tx   = tx;
    if (skipTransition) {
      tr.style.transition = 'none';
      tr.style.transform  = `translateX(${tx}px)`;
      requestAnimationFrame(() => { tr.style.transition = 'none'; });
    } else {
      tr.style.transform = `translateX(${tx}px)`;
    }
    updateDots(zi);
  }

  // ── easeInOutCubic ──
  function eio(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  const ANIM_MS = 580;

  function animateTo(zi, targetCard) {
    const s  = state[zi];
    const tr = track(zi);
    if (!tr || s.animating) return;

    const offsets  = getOffsets(zi);
    const targetTx = offsets[targetCard] ?? 0;
    const startTx  = s.tx;
    const dist     = targetTx - startTx;

    if (Math.abs(dist) < 1) {
      s.card = targetCard;
      updateDots(zi);
      return;
    }

    s.animating = true;
    s.card      = targetCard;
    updateDots(zi);

    let t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      const t     = Math.min((ts - t0) / ANIM_MS, 1);
      const eased = eio(t);
      const tx    = startTx + dist * eased;
      tr.style.transform = `translateX(${tx}px)`;
      s.tx = tx;
      if (t < 1) {
        s.rafId = requestAnimationFrame(step);
      } else {
        tr.style.transform = `translateX(${targetTx}px)`;
        s.tx        = targetTx;
        s.animating = false;
        s.rafId     = null;
      }
    }
    s.rafId = requestAnimationFrame(step);
  }

  // ── Dots ──
  zones.forEach(zone => {
    const inner = zone.querySelector('.work__category__inner');
    const tr    = zone.querySelector('.work__projects');
    if (!inner || !tr) return;
    const n = tr.querySelectorAll('.project-card').length;
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

  // ── Initial card placement (after first paint so offsets are available) ──
  requestAnimationFrame(() => {
    zones.forEach((_, zi) => placeCard(zi, 0, true));
  });

  // ── IntersectionObserver ──
  // Threshold 0.5 on the zone (100vh) → fires when ≥50vh of it is visible.
  // At any scroll position only ONE zone can be ≥50% visible, so this acts
  // as a clean "this zone is the active one" signal.
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const zi = zones.indexOf(entry.target);
      if (zi < 0) return;
      state[zi].active = entry.isIntersecting;
      if (entry.isIntersecting) {
        zones[zi].querySelector('.work__category-title')?.classList.add('visible');
      }
    });
  }, { threshold: 0.5 });

  zones.forEach(zone => io.observe(zone));

  // ── easeInOutQuart for section snapping ──
  function eioQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  }

  // Global flag: true while a section-snap scroll animation is running
  let sectionSnapping = false;

  /**
   * Smoothly scroll the page so that `targetZone` is vertically centered
   * in the viewport (or as close as scroll bounds allow).
   * Uses rAF + easeInOutQuart for a polished feel.
   */
  function snapToZone(targetZoneIdx, duration = 700) {
    const target = zones[targetZoneIdx];
    if (!target) return;

    sectionSnapping = true;

    const rect    = target.getBoundingClientRect();
    const zoneH   = rect.height;
    const vpH     = window.innerHeight;
    // Scroll so the zone is centered vertically
    const destY   = window.scrollY + rect.top - (vpH - zoneH) / 2;
    // Clamp to document bounds
    const maxY    = document.documentElement.scrollHeight - vpH;
    const targetY = Math.max(0, Math.min(destY, maxY));
    const startY  = window.scrollY;
    const dist    = targetY - startY;

    if (Math.abs(dist) < 2) {
      sectionSnapping = false;
      return;
    }

    let t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      const t     = Math.min((ts - t0) / duration, 1);
      const eased = eioQuart(t);
      window.scrollTo(0, startY + dist * eased);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        // Small cooldown so IO can settle before we accept wheel events again
        setTimeout(() => { sectionSnapping = false; }, 80);
      }
    }
    requestAnimationFrame(step);
  }

  // ── Track hero & connect visibility for edge snapping ──
  let heroActive    = false;
  let connectActive = false;

  const heroEl    = document.getElementById('hero');
  const connectEl = document.getElementById('connect');

  const edgeIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target === heroEl)    heroActive    = entry.isIntersecting;
      if (entry.target === connectEl) connectActive = entry.isIntersecting;
    });
  }, { threshold: 0.3 });

  if (heroEl)    edgeIO.observe(heroEl);
  if (connectEl) edgeIO.observe(connectEl);

  /**
   * Animate scroll to an arbitrary element's top edge (for connect/hero).
   * `alignTop`: scroll so element's top = viewport top.
   * `alignCenter`: scroll so element is vertically centered.
   */
  function snapToElement(el, align = 'top', duration = 700) {
    if (!el) return;
    sectionSnapping = true;
    const rect    = el.getBoundingClientRect();
    const vpH     = window.innerHeight;
    let destY;
    if (align === 'center') {
      destY = window.scrollY + rect.top - (vpH - rect.height) / 2;
    } else {
      destY = window.scrollY + rect.top;
    }
    const maxY    = document.documentElement.scrollHeight - vpH;
    const targetY = Math.max(0, Math.min(destY, maxY));
    const startY  = window.scrollY;
    const dist    = targetY - startY;

    if (Math.abs(dist) < 2) { sectionSnapping = false; return; }

    let t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      const t     = Math.min((ts - t0) / duration, 1);
      const eased = eioQuart(t);
      window.scrollTo(0, startY + dist * eased);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        setTimeout(() => { sectionSnapping = false; }, 80);
      }
    }
    requestAnimationFrame(step);
  }

  // ── Wheel handler ──
  document.addEventListener('wheel', e => {
    // Block all wheel events while a section snap is in progress
    if (sectionSnapping) {
      e.preventDefault();
      return;
    }

    const zi = zones.findIndex((_, i) => state[i].active);

    // ── Edge case: no zone active ──
    if (zi < 0) {
      // From hero scrolling down → snap to first zone
      if (heroActive && e.deltaY > 0) {
        e.preventDefault();
        snapToZone(0);
        return;
      }
      // From connect scrolling up → snap to last zone
      if (connectActive && e.deltaY < 0) {
        e.preventDefault();
        snapToZone(zones.length - 1);
        return;
      }
      return;
    }

    const s = state[zi];

    // Block page-scroll while a card animation is in progress
    if (s.animating) {
      e.preventDefault();
      return;
    }

    const n = getOffsets(zi).length;

    if (e.deltaY > 0) {
      if (s.card < n - 1) {
        // More cards → advance, block page scroll
        e.preventDefault();
        animateTo(zi, s.card + 1);
      } else {
        // Last card reached → snap to next zone or connect
        e.preventDefault();
        const nextZi = zi + 1;
        if (nextZi < zones.length) {
          snapToZone(nextZi);
        } else {
          snapToElement(connectEl, 'top');
        }
      }
    } else {
      if (s.card > 0) {
        // Cards behind → go back, block page scroll
        e.preventDefault();
        animateTo(zi, s.card - 1);
      } else {
        // First card → snap to previous zone or hero
        e.preventDefault();
        const prevZi = zi - 1;
        if (prevZi >= 0) {
          snapToZone(prevZi);
        } else {
          snapToElement(heroEl, 'center');
        }
      }
    }
  }, { passive: false });
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
