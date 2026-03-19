import { useState, useEffect } from 'react';

export default function useStickyCarousel(numCategories) {
  const [activeCards, setActiveCards] = useState(() => new Array(numCategories).fill(0));

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const zones = Array.from(document.querySelectorAll('.work__category-zone'));
    if (!zones.length) return;

    function setupHeights() {
      const h = window.innerHeight + 'px';
      zones.forEach(z => {
        z.style.height = h;
        const panel = z.querySelector('.work__category');
        if (panel) panel.style.height = h;
      });
    }
    setupHeights();

    const offsetCache = [];

    function getOffsets(zi) {
      if (offsetCache[zi]) return offsetCache[zi];
      const zone = zones[zi];
      const trackWrap = zone.querySelector('.work__projects-track');
      const tr = zone.querySelector('.work__projects');
      if (!trackWrap || !tr) return [0];
      const cards = Array.from(tr.querySelectorAll('.project-card'));
      const containerW = trackWrap.clientWidth;
      const maxTx = -(tr.scrollWidth - containerW);
      const result = cards.map(card => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const tx = -(cardCenter - containerW / 2);
        return Math.max(maxTx, Math.min(0, tx));
      });
      offsetCache[zi] = result;
      return result;
    }

    const state = zones.map(() => ({
      card: 0, tx: 0, animating: false, rafId: null, active: false,
    }));

    function getTrack(zi) {
      return zones[zi].querySelector('.work__projects');
    }

    function updateDotsState(zi) {
      setActiveCards(prev => {
        const next = [...prev];
        next[zi] = state[zi].card;
        return next;
      });
    }

    function placeCard(zi, cardIdx, skipTransition = false) {
      const s = state[zi];
      const tr = getTrack(zi);
      if (!tr) return;
      const offsets = getOffsets(zi);
      const tx = offsets[cardIdx] ?? 0;
      s.card = cardIdx;
      s.tx = tx;
      if (skipTransition) {
        tr.style.transition = 'none';
        tr.style.transform = `translateX(${tx}px)`;
        requestAnimationFrame(() => { tr.style.transition = 'none'; });
      } else {
        tr.style.transform = `translateX(${tx}px)`;
      }
      updateDotsState(zi);
    }

    function eio(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    const ANIM_MS = 580;

    function animateTo(zi, targetCard) {
      const s = state[zi];
      const tr = getTrack(zi);
      if (!tr || s.animating) return;

      const offsets = getOffsets(zi);
      const targetTx = offsets[targetCard] ?? 0;
      const startTx = s.tx;
      const dist = targetTx - startTx;

      if (Math.abs(dist) < 1) {
        s.card = targetCard;
        updateDotsState(zi);
        return;
      }

      s.animating = true;
      s.card = targetCard;
      updateDotsState(zi);

      let t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        const t = Math.min((ts - t0) / ANIM_MS, 1);
        const eased = eio(t);
        const tx = startTx + dist * eased;
        tr.style.transform = `translateX(${tx}px)`;
        s.tx = tx;
        if (t < 1) {
          s.rafId = requestAnimationFrame(step);
        } else {
          tr.style.transform = `translateX(${targetTx}px)`;
          s.tx = targetTx;
          s.animating = false;
          s.rafId = null;
        }
      }
      s.rafId = requestAnimationFrame(step);
    }

    requestAnimationFrame(() => {
      zones.forEach((_, zi) => placeCard(zi, 0, true));
    });

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

    function eioQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }

    let sectionSnapping = false;

    function snapToZone(targetZoneIdx, duration = 700) {
      const target = zones[targetZoneIdx];
      if (!target) return;
      sectionSnapping = true;
      const rect = target.getBoundingClientRect();
      const zoneH = rect.height;
      const vpH = window.innerHeight;
      const destY = window.scrollY + rect.top - (vpH - zoneH) / 2;
      const maxY = document.documentElement.scrollHeight - vpH;
      const targetY = Math.max(0, Math.min(destY, maxY));
      const startY = window.scrollY;
      const dist = targetY - startY;

      if (Math.abs(dist) < 2) { sectionSnapping = false; return; }

      let t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        const t = Math.min((ts - t0) / duration, 1);
        window.scrollTo(0, startY + dist * eioQuart(t));
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetY);
          setTimeout(() => { sectionSnapping = false; }, 80);
        }
      }
      requestAnimationFrame(step);
    }

    let heroActive    = false;
    let aboutActive   = false;
    let connectActive = false;
    const heroEl    = document.getElementById('hero');
    const aboutEl   = document.getElementById('about');
    const connectEl = document.getElementById('connect');

    const edgeIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === heroEl)    heroActive    = entry.isIntersecting;
        if (entry.target === aboutEl)   aboutActive   = entry.isIntersecting;
        if (entry.target === connectEl) connectActive = entry.isIntersecting;
      });
    }, { threshold: 0.3 });

    if (heroEl)    edgeIO.observe(heroEl);
    if (aboutEl)   edgeIO.observe(aboutEl);
    if (connectEl) edgeIO.observe(connectEl);

    function snapToElement(el, align = 'top', duration = 700) {
      if (!el) return;
      sectionSnapping = true;
      const rect = el.getBoundingClientRect();
      const vpH = window.innerHeight;
      let destY;
      if (align === 'center') {
        destY = window.scrollY + rect.top - (vpH - rect.height) / 2;
      } else {
        destY = window.scrollY + rect.top;
      }
      const maxY = document.documentElement.scrollHeight - vpH;
      const targetY = Math.max(0, Math.min(destY, maxY));
      const startY = window.scrollY;
      const dist = targetY - startY;

      if (Math.abs(dist) < 2) { sectionSnapping = false; return; }

      let t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        const t = Math.min((ts - t0) / duration, 1);
        window.scrollTo(0, startY + dist * eioQuart(t));
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetY);
          setTimeout(() => { sectionSnapping = false; }, 80);
        }
      }
      requestAnimationFrame(step);
    }

    const onWheel = (e) => {
      if (sectionSnapping) { e.preventDefault(); return; }

      const zi = zones.findIndex((_, i) => state[i].active);

      if (zi < 0) {
        // Hero → first work zone
        if (heroActive && e.deltaY > 0) {
          e.preventDefault(); snapToZone(0); return;
        }

        // ── Inside About: boundary-only snaps, free scroll in between ──
        if (aboutActive) {
          const aRect = aboutEl?.getBoundingClientRect();
          if (!aRect) return;

          if (e.deltaY > 0) {
            // Scrolling DOWN → snap to Connect only when:
            //   1. User has scrolled INTO About (top is above viewport by ≥80px)
            //   2. AND the bottom of About has reached the viewport bottom
            const scrolledIntoAbout = aRect.top < -80;
            const reachedBottom     = aRect.bottom <= window.innerHeight + 30;
            if (scrolledIntoAbout && reachedBottom) {
              e.preventDefault(); snapToElement(connectEl, 'top'); return;
            }
            // Still content to read — free scroll
            return;
          } else {
            // Scrolling UP → snap to last work zone only when at the very top
            if (aRect.top >= -20) {
              e.preventDefault(); snapToZone(zones.length - 1); return;
            }
            // Still content above — free scroll
            return;
          }
        }

        // ── Connect → About top (scroll up from Connect) ──
        if (connectActive && e.deltaY < 0) {
          e.preventDefault(); snapToElement(aboutEl, 'top'); return;
        }

        return;
      }

      const s = state[zi];
      if (s.animating) { e.preventDefault(); return; }

      const n = getOffsets(zi).length;

      if (e.deltaY > 0) {
        if (s.card < n - 1) {
          // Advance carousel card
          e.preventDefault();
          animateTo(zi, s.card + 1);
        } else {
          const nextZi = zi + 1;
          if (nextZi < zones.length) {
            // Snap to next work zone
            e.preventDefault();
            snapToZone(nextZi);
          } else {
            // Last work zone, last card → snap to About (smooth entry)
            e.preventDefault();
            snapToElement(aboutEl, 'top');
          }
        }
      } else {
        if (s.card > 0) {
          // Go back one carousel card
          e.preventDefault();
          animateTo(zi, s.card - 1);
        } else {
          // First card of zone: snap to previous zone or hero
          e.preventDefault();
          const prevZi = zi - 1;
          if (prevZi >= 0) snapToZone(prevZi);
          else snapToElement(heroEl, 'center');
        }
      }
    };

    document.addEventListener('wheel', onWheel, { passive: false });

    // SectionNav dispatches this event when user clicks a category dot directly
    const onNavGoto = (e) => {
      const zi = e.detail?.zoneIndex;
      if (zi == null || zi < 0 || zi >= zones.length) return;
      // Cancel any in-progress rAF animation
      if (state[zi].rafId) cancelAnimationFrame(state[zi].rafId);
      state[zi].animating = false;
      // Reset carousel to first card instantly
      placeCard(zi, 0, true);
    };
    window.addEventListener('sectionnav:goto', onNavGoto);

    // SectionNav dispatches this when navigating to ANY section programmatically.
    // Lock wheel interception for the duration of the smooth scroll (~850ms)
    // so the carousel doesn't fight the programmatic scroll.
    let navLockTimer = null;
    const onNavNavigate = () => {
      sectionSnapping = true;
      if (navLockTimer) clearTimeout(navLockTimer);
      navLockTimer = setTimeout(() => { sectionSnapping = false; }, 900);
    };
    window.addEventListener('sectionnav:navigate', onNavNavigate);

    const onResize = () => {
      setupHeights();
      offsetCache.length = 0;
      zones.forEach((_, zi) => placeCard(zi, state[zi].card, true));
    };
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('sectionnav:goto', onNavGoto);
      window.removeEventListener('sectionnav:navigate', onNavNavigate);
      if (navLockTimer) clearTimeout(navLockTimer);
      io.disconnect();
      edgeIO.disconnect();
      state.forEach(s => { if (s.rafId) cancelAnimationFrame(s.rafId); });
    };
  }, [numCategories]);

  return activeCards;
}
