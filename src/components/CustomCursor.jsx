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
      // Dot — snappy
      dx += (mx - dx) * 0.22;
      dy += (my - dy) * 0.22;
      dot.style.transform = `translate(${dx - 7}px, ${dy - 7}px)`;

      // Glass — smooth lag
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      glass.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);
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
