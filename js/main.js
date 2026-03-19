history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  initIntroSequence();
  initConnectBg();
  initTextPressure();
  initHeroSubtitleScroll();
  initWorkMarquee();
  initStickyCarousel();
  initScrollReveal();
  initNavbarScroll();
  initMobileMenu();
  initCustomCursor();
  initScrollProgress();
  initParallaxCards();
  initSmoothScroll();
  initLinkHover();
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

  const chars = heroTitle.querySelectorAll('.char');

  // bg reveals from top — standalone, exactly like the working test
  gsap.fromTo(heroBg,
    { scaleY: 0, transformOrigin: 'top center' },
    { scaleY: 1, duration: 2, ease: 'power3.out', delay: 0.3 }
  );

  // ── Master timeline — starts when bg is ~20% in (0.7s) ──
  const tl = gsap.timeline({
    defaults: { ease: 'power4.out' },
    delay: 0.7,
  });

  // 1) Hero elements container fades in
  tl.to(heroEls, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: 'power3.out',
    onStart: () => {
      heroEls.classList.add('animate-in');
    },
  });

  // 2) Title chars: staggered bottom→up, blur→sharp
  tl.fromTo(chars,
    {
      y: '110%',
      opacity: 0,
      filter: 'blur(22px)',
    },
    {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      stagger: 0.045,
      ease: 'power4.out',
      onComplete: () => {
        heroTitle.style.height = heroTitle.offsetHeight + 'px';
        chars.forEach(c => c.classList.add('revealed'));
      },
    },
    '-=0.2'
  );

  // 3) Subtitle — split each span into chars and animate staggered
  const subSpans = heroSub.querySelectorAll('span');
  subSpans.forEach((span, spanIdx) => {
    const text = span.textContent.trim();
    span.textContent = '';
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';

    text.split('').forEach(char => {
      const el = document.createElement('span');
      el.style.display = 'inline-block';
      el.textContent = char === ' ' ? '\u00A0' : char;
      span.appendChild(el);
    });

    const subChars = span.querySelectorAll('span');

    // Both spans start while previous is still animating
    const position = spanIdx === 0 ? '>-0.6' : '>-0.4';

    tl.fromTo(subChars,
      {
        y: '-100%',
        opacity: 0,
        filter: 'blur(12px)',
      },
      {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.5,
        stagger: 0.015,
        ease: 'power3.out',
      },
      position
    );
  });

  heroSub.style.opacity = '1';
  heroSub.style.transform = 'translateY(0)';

  // 4) Navbar enters from above
  gsap.set(navbar, { y: -80, opacity: 0 });
  tl.to(navbar, {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: 'power3.out',
    onStart: () => {
      navbar.classList.remove('hero-hidden');
      navbar.classList.add('hero-visible');
    },
  }, '>-0.3');
}

function splitHeroTitle(title) {
  const text = title.textContent.trim();
  title.textContent = '';
  title.setAttribute('aria-label', text);

  // Hover fonts pool
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
    '#e36085',
    '#ff6b6b',
    '#ffd93d',
    '#6bcb77',
    '#4d96ff',
    '#ff8e53',
    '#c084fc',
  ];

  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = char === ' ' ? '\u00A0' : char;

    // Store original color once revealed (grabbed after GSAP reveal completes)
    let originalColor = null;
    let hoverTween = null;

    span.addEventListener('mouseenter', () => {
      if (!span.classList.contains('revealed')) return;

      // Capture original color on first hover
      if (!originalColor) {
        originalColor = getComputedStyle(span).color;
      }

      if (hoverTween) hoverTween.kill();

      const randFont  = hoverFonts[Math.floor(Math.random() * hoverFonts.length)];
      const randColor = hoverColors[Math.floor(Math.random() * hoverColors.length)];
      const randRot   = (Math.random() - 0.5) * 24;
      const randScale = 1.05 + Math.random() * 0.2;

      span.style.fontFamily = randFont;

      hoverTween = gsap.to(span, {
        color: randColor,
        scale: randScale,
        rotation: randRot,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    span.addEventListener('mouseleave', () => {
      if (!span.classList.contains('revealed')) return;

      if (hoverTween) hoverTween.kill();

      hoverTween = gsap.to(span, {
        color: originalColor || '#b3f381',
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        overwrite: 'auto',
        onComplete: () => {
          span.style.fontFamily = '';
        },
      });
    });

    title.appendChild(span);
  });
}

/* ═══════════════════════════════════════════
   HERO SUBTITLE — hides on scroll, shows on return
   ═══════════════════════════════════════════ */
function initHeroSubtitleScroll() {
  const subtitle = document.getElementById('heroSubtitle');
  if (!subtitle) return;

  let lastY = 0;
  let hidden = false;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const threshold = 5;

    if (y > threshold && !hidden) {
      hidden = true;
      gsap.to(subtitle, {
        y: -40,
        opacity: 0,
        duration: 0.15,
        ease: 'power2.in',
      });
    } else if (y <= threshold && hidden) {
      hidden = false;
      gsap.to(subtitle, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    }

    lastY = y;
  }, { passive: true });
}

/* ═══════════════════════════════════════════
   WORK MARQUEE — scroll-speed ticker
   ═══════════════════════════════════════════ */
function initWorkMarquee() {
  // Collect all marquees: the header one + all category ones
  const headerMarquee = document.getElementById('workMarquee');
  const catMarquees = document.querySelectorAll('[data-marquee]');
  
  const allMarquees = [];
  
  if (headerMarquee) {
    allMarquees.push({
      tracks: headerMarquee.querySelectorAll('.work__marquee-track'),
      x: 0,
    });
  }
  
  catMarquees.forEach(m => {
    allMarquees.push({
      tracks: m.querySelectorAll('.cat-marquee__track'),
      x: 0,
    });
  });

  if (!allMarquees.length) return;

  let baseSpeed = 0.5;
  let scrollSpeed = 0;
  let lastScroll = window.scrollY;

  window.addEventListener('scroll', () => {
    const delta = Math.abs(window.scrollY - lastScroll);
    scrollSpeed = Math.min(delta * 0.3, 8);
    lastScroll = window.scrollY;
  }, { passive: true });

  function animate() {
    scrollSpeed *= 0.95;
    const speed = baseSpeed + scrollSpeed;

    allMarquees.forEach(m => {
      m.x -= speed;
      
      const trackWidth = m.tracks[0].offsetWidth;
      if (trackWidth > 0 && Math.abs(m.x) >= trackWidth) {
        m.x += trackWidth;
      }

      m.tracks.forEach(track => {
        track.style.transform = `translateX(${m.x}px)`;
      });
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* ═══════════════════════════════════════════
   CONNECT BG — scaleY reveal from bottom on scroll
   ═══════════════════════════════════════════ */
function initConnectBg() {
  const connectBg = document.getElementById('connectBg');
  const connectSection = document.getElementById('connect');
  if (!connectBg || !connectSection) return;

  // ── Gather all text elements to animate ──
  const heading = connectSection.querySelector('.connect__heading');
  const emailTop = connectSection.querySelector('.connect__email-top');
  const emailBottom = connectSection.querySelector('.connect__email-bottom');

  // Split text into chars for each element
  function splitIntoChars(el) {
    if (!el) return [];
    const nodes = Array.from(el.childNodes);
    el.textContent = '';

    const allChars = [];
    nodes.forEach(node => {
      if (node.nodeType === 3) {
        // Text node — split into chars
        node.textContent.split('').forEach(char => {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.textContent = char === ' ' ? '\u00A0' : char;
          el.appendChild(span);
          allChars.push(span);
        });
      } else {
        // Element node (like <span class="text">) — split its text, keep its styles
        const text = node.textContent;
        const wrapper = node.cloneNode(false);
        wrapper.textContent = '';
        text.split('').forEach(char => {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.textContent = char === ' ' ? '\u00A0' : char;
          wrapper.appendChild(span);
          allChars.push(span);
        });
        el.appendChild(wrapper);
      }
    });
    return allChars;
  }

  // Split heading divs
  const headingDivs = heading ? heading.querySelectorAll('div') : [];
  const letsChars = headingDivs[0] ? splitIntoChars(headingDivs[0]) : [];
  const connectChars = headingDivs[1] ? splitIntoChars(headingDivs[1]) : [];

  // Split email parts
  const emailTopChars = emailTop ? splitIntoChars(emailTop) : [];
  const emailBottomChars = emailBottom ? splitIntoChars(emailBottom) : [];

  // Hide all initially
  const allChars = [...letsChars, ...connectChars, ...emailTopChars, ...emailBottomChars];
  gsap.set(allChars, { y: '110%', opacity: 0, filter: 'blur(16px)' });

  // Hide connect__content reveal class so GSAP controls it
  const content = connectSection.querySelector('.connect__content');
  if (content) content.classList.remove('reveal');

  // Start bg hidden
  gsap.set(connectBg, { scaleY: 0, transformOrigin: 'bottom center' });

  // Trigger on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // bg reveal
        gsap.fromTo(connectBg,
          { scaleY: 0, transformOrigin: 'bottom center' },
          { scaleY: 1, duration: 1.8, ease: 'power3.out' }
        );

        // Text timeline — starts almost immediately
        const tl = gsap.timeline({ delay: 0.1 });

        // "LET'S"
        if (letsChars.length) {
          tl.to(letsChars, {
            y: '0%', opacity: 1, filter: 'blur(0px)',
            duration: 0.6, stagger: 0.03, ease: 'power4.out',
          });
        }

        // "CONNECT"
        if (connectChars.length) {
          tl.to(connectChars, {
            y: '0%', opacity: 1, filter: 'blur(0px)',
            duration: 0.6, stagger: 0.02, ease: 'power4.out',
          }, '>-0.5');
        }

        // "hello@" — starts while CONNECT is still going
        if (emailTopChars.length) {
          tl.to(emailTopChars, {
            y: '0%', opacity: 1, filter: 'blur(0px)',
            duration: 0.5, stagger: 0.02, ease: 'power3.out',
          }, '>-0.55');
        }

        // "jozedzn.com"
        if (emailBottomChars.length) {
          tl.to(emailBottomChars, {
            y: '0%', opacity: 1, filter: 'blur(0px)',
            duration: 0.5, stagger: 0.02, ease: 'power3.out',
          }, '>-0.4');
        }

        observer.unobserve(connectSection);
      }
    });
  }, { threshold: 0.05 });

  observer.observe(connectSection);
}

/* ═══════════════════════════════════════════
   TEXT PRESSURE — font-weight reacts to mouse
   Port of ReactBits TextPressure component
   Only changes weight, no position shifting
   ═══════════════════════════════════════════ */
function initTextPressure() {
  const emailEl = document.querySelector('.connect__email');
  if (!emailEl) return;

  // Smoothed mouse position (lerp like the React version)
  const mouse = { x: 0, y: 0 };
  const cursor = { x: 0, y: 0 };

  window.addEventListener('mousemove', e => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  });

  window.addEventListener('touchmove', e => {
    const t = e.touches[0];
    cursor.x = t.clientX;
    cursor.y = t.clientY;
  }, { passive: true });

  // Initialize cursor to center of email
  const initRect = emailEl.getBoundingClientRect();
  mouse.x = cursor.x = initRect.left + initRect.width / 2;
  mouse.y = cursor.y = initRect.top + initRect.height / 2;

  function dist(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function getAttr(distance, maxDist, minVal, maxVal) {
    const val = maxVal - Math.abs((maxVal * distance) / maxDist);
    return Math.max(minVal, val + minVal);
  }

  function animate() {
    // Lerp factor 15 = same as React version
    mouse.x += (cursor.x - mouse.x) / 15;
    mouse.y += (cursor.y - mouse.y) / 15;

    const charEls = emailEl.querySelectorAll('span[style*="inline-block"]');
    if (!charEls.length) {
      requestAnimationFrame(animate);
      return;
    }

    const emailRect = emailEl.getBoundingClientRect();
    const maxDist = emailRect.width / 2;

    charEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      const center = {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      };

      const d = dist(mouse, center);

      // Font weight: 100 (thin, far) → 700 (bold, close)
      const wght = Math.floor(getAttr(d, maxDist, 100, 600));

      el.style.fontWeight = wght;
    });

    requestAnimationFrame(animate);
  }
  animate();
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
    const destY   = window.scrollY + rect.top - (vpH - zoneH) / 2;
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
    if (sectionSnapping) {
      e.preventDefault();
      return;
    }

    const zi = zones.findIndex((_, i) => state[i].active);

    if (zi < 0) {
      if (heroActive && e.deltaY > 0) {
        e.preventDefault();
        snapToZone(0);
        return;
      }
      if (connectActive && e.deltaY < 0) {
        e.preventDefault();
        snapToZone(zones.length - 1);
        return;
      }
      return;
    }

    const s = state[zi];

    if (s.animating) {
      e.preventDefault();
      return;
    }

    const n = getOffsets(zi).length;

    if (e.deltaY > 0) {
      if (s.card < n - 1) {
        e.preventDefault();
        animateTo(zi, s.card + 1);
      } else {
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
        e.preventDefault();
        animateTo(zi, s.card - 1);
      } else {
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
    // Slower lerp = more delay, feels floaty and premium
    cursorX += (mouseX - cursorX) * 0.08;
    cursorY += (mouseY - cursorY) * 0.08;
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

  const customCursor = document.getElementById('customCursor');

  document.querySelectorAll('.project-card').forEach((card) => {
    // Create glass cursor element
    const glass = document.createElement('div');
    glass.className = 'card-glass-cursor';
    glass.innerHTML = '<span>View</span>';
    card.appendChild(glass);
    gsap.set(glass, { scale: 0.5 });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;

      // Move glass cursor with lerp via GSAP
      gsap.to(glass, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseenter', () => {
      if (customCursor) customCursor.style.opacity = '0';
      gsap.to(glass, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out',
        overwrite: true,
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      if (customCursor) customCursor.style.opacity = '1';
      // Kill ALL active tweens on this glass, then reset
      gsap.killTweensOf(glass);
      gsap.set(glass, { scale: 0.5, opacity: 0 });
    });
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

/* ═══════════════════════════════════════════
   LINK HOVER — staggered letter roll
   ═══════════════════════════════════════════ */
function initLinkHover() {
  const links = document.querySelectorAll(
    '.navbar__links a, .footer__links a'
  );

  // Wait for fonts and layout
  requestAnimationFrame(() => { requestAnimationFrame(() => {
    links.forEach(link => {
      const text = link.textContent.trim();
      if (!text) return;

      link.textContent = '';
      link.style.display = 'inline-block';
      link.style.overflow = 'hidden';
      link.style.verticalAlign = 'bottom';
      link.style.lineHeight = '1.2';

      // Top row
      const top = document.createElement('span');
      top.style.display = 'flex';

      // Bottom row
      const bot = document.createElement('span');
      bot.style.display = 'flex';

      text.split('').forEach(char => {
        const t = document.createElement('span');
        t.style.display = 'inline-block';
        t.textContent = char === ' ' ? '\u00A0' : char;
        top.appendChild(t);

        const b = document.createElement('span');
        b.style.display = 'inline-block';
        b.textContent = char === ' ' ? '\u00A0' : char;
        bot.appendChild(b);
      });

      link.appendChild(top);
      link.appendChild(bot);

      // Measure after inserting into DOM
      const h = top.offsetHeight;
      link.style.height = h + 'px';

      const topChars = top.querySelectorAll('span');
      const botChars = bot.querySelectorAll('span');

      let tween = null;

      link.addEventListener('mouseenter', () => {
        if (tween) tween.kill();
        tween = gsap.timeline();
        tween.to(topChars, {
          y: -h,
          duration: 0.3,
          stagger: 0.02,
          ease: 'power2.inOut',
        }, 0);
        tween.to(botChars, {
          y: -h,
          duration: 0.3,
          stagger: 0.02,
          ease: 'power2.inOut',
        }, 0);
      });

      link.addEventListener('mouseleave', () => {
        if (tween) tween.kill();
        tween = gsap.timeline();
        tween.to(topChars, {
          y: 0,
          duration: 0.3,
          stagger: 0.02,
          ease: 'power2.inOut',
        }, 0);
        tween.to(botChars, {
          y: 0,
          duration: 0.3,
          stagger: 0.02,
          ease: 'power2.inOut',
        }, 0);
      });
    });
  }); });
}
