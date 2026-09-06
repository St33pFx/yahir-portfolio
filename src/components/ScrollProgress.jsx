import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const docH = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docH > 0 ? window.scrollY / docH : 0;
          bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="scroll-progress" ref={barRef} />;
}
