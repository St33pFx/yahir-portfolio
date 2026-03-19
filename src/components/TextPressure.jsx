import { useEffect, useRef, useCallback } from 'react';

const dist = (a, b) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

export default function TextPressure({
  text = 'hello@jozedzn.com',
  fontFamily = 'N27',
  weight = true,
  width = false,
  italic = false,
  alpha = false,
  textColor = '#f0fde6',
  charColors = [],   // optional per-char color overrides
  minFontSize = 24,
  className = '',
}) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const chars = text.split('');

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;
    const { width: containerW } = containerRef.current.getBoundingClientRect();
    let fontSize = containerW / (chars.length / 2);
    fontSize = Math.max(fontSize, minFontSize);
    titleRef.current.style.fontSize = fontSize + 'px';
  }, [chars.length, minFontSize]);

  useEffect(() => {
    const onMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const onTouchMove = (e) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    if (containerRef.current) {
      const {
        left,
        top,
        width: w,
        height: h,
      } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = cursorRef.current.x = left + w / 2;
      mouseRef.current.y = cursorRef.current.y = top + h / 2;
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  useEffect(() => {
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, [setSize]);

  useEffect(() => {
    let rafId;

    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };
          const d = dist(mouseRef.current, charCenter);

          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 700)) : 400;
          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const ital = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : 1;

          span.style.fontWeight = wght;

          if (width || italic) {
            span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
          }

          if (alpha) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [weight, width, italic, alpha]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width: '100%', background: 'transparent' }}
    >
      <span
        ref={titleRef}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          lineHeight: 1,
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 100,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => (spansRef.current[i] = el)}
            style={{ display: 'inline-block', color: charColors[i] ?? textColor }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </div>
  );
}
