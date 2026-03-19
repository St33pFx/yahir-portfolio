import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia('(max-width: 768px)').matches) return;

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .project-card, .skill-badge, .navbar__hamburger')) {
        cursor.classList.add('hovering');
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, .project-card, .skill-badge, .navbar__hamburger')) {
        cursor.classList.remove('hovering');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    function animate() {
      cursorX += (mouseX - cursorX) * 0.08;
      cursorY += (mouseY - cursorY) * 0.08;
      cursor.style.transform = `translate(${cursorX - 8}px, ${cursorY - 8}px)`;
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} id="customCursor" />;
}
