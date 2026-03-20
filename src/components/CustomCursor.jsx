import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef    = useRef(null);
  const glassRef  = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const dot   = dotRef.current;
    const glass = glassRef.current;
    if (!dot || !glass) return;

    let mx = 0, my = 0;
    let dx = 0, dy = 0;
    let gx = 0, gy = 0;
    let rafId;
    let mode = 'default';
    let frameCount = 0;

    /** Walk up the DOM and return true if the nearest visible background is light */
    function isOverLightBg(el) {
      let node = el;
      while (node && node !== document.documentElement) {
        const bg = getComputedStyle(node).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const m = bg.match(/\d+/g);
          if (m) {
            const [r, g, b] = m.map(Number);
            // Relative luminance (simplified sRGB)
            const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            return lum > 0.6;
          }
        }
        node = node.parentElement;
      }
      return false;
    }

    const INTERACTIVE = 'a, button, .project-card, .skill-badge, .navbar__hamburger, .cs__hero-media, [role="button"]';

    const detectMode = (e) => {
      if (e.target.closest('.project-card'))                    return 'click';
      if (e.target.closest('.cs__hero-media, .cs__hero-video')) return 'play';
      return 'default';
    };

    const setMode = (m) => {
      mode = m;
      dot.dataset.mode   = m;
      glass.dataset.mode = m;
      /* CLICK/PLAY: pegar el glass al cursor sin lag */
      if (m === 'click' || m === 'play') {
        gx = mx;
        gy = my;
        glass.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      }
    };

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const onOver = (e) => {
      setMode(detectMode(e));
      if (e.target.closest(INTERACTIVE)) dot.classList.add('hovering');
    };

    const onOut = (e) => {
      const to = e.relatedTarget;
      if (!to?.closest?.(INTERACTIVE)) dot.classList.remove('hovering');
      if (!to?.closest?.('.project-card, .cs__hero-media, .cs__hero-video')) {
        setMode('default');
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);

    function animate() {
      const onCard = mode === 'click' || mode === 'play';
      const dotLerp  = onCard ? 0.55 : 0.28;
      const glassLerp = onCard ? 0.72 : 0.16;

      dx += (mx - dx) * dotLerp;
      dy += (my - dy) * dotLerp;
      dot.style.transform = `translate(${dx - 7}px, ${dy - 7}px)`;

      gx += (mx - gx) * glassLerp;
      gy += (my - gy) * glassLerp;
      glass.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);

      // Every ~10 frames, sample background luminance under cursor
      if (++frameCount % 10 === 0) {
        const el = document.elementFromPoint(mx, my);
        const isLight = el ? isOverLightBg(el) : false;
        dot.classList.toggle('cc-dot--light', isLight);
        glass.classList.toggle('cc-glass--light', isLight);
      }
    }
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Green stroke dot */}
      <div className="cc-dot" ref={dotRef} data-mode="default" />

      {/* Glass bubble with chromatic aberration */}
      <div className="cc-glass" ref={glassRef} data-mode="default">
        <span className="cc-glass__label cc-glass__label--click">CLICK</span>
        <span className="cc-glass__label cc-glass__label--play">PLAY</span>
        {/* Chromatic aberration layers */}
        <div className="cc-glass__ca cc-glass__ca--r" />
        <div className="cc-glass__ca cc-glass__ca--b" />
      </div>
    </>
  );
}
