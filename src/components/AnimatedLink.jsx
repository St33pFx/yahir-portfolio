import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedLink({ text, href, onClick, className, ...rest }) {
  const linkRef = useRef(null);

  useLayoutEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    const topRow = link.querySelector('[data-row="top"]');
    const botRow = link.querySelector('[data-row="bot"]');
    if (!topRow || !botRow) return;

    const h = topRow.offsetHeight;
    link.style.height = h + 'px';

    const topChars = [...topRow.querySelectorAll('span')];
    const botChars = [...botRow.querySelectorAll('span')];

    let tween = null;

    const onEnter = () => {
      if (tween) tween.kill();
      tween = gsap.timeline();
      tween.to(topChars, { y: -h, duration: 0.3, stagger: 0.02, ease: 'power2.inOut' }, 0);
      tween.to(botChars, { y: -h, duration: 0.3, stagger: 0.02, ease: 'power2.inOut' }, 0);
    };

    const onLeave = () => {
      if (tween) tween.kill();
      tween = gsap.timeline();
      tween.to(topChars, { y: 0, duration: 0.3, stagger: 0.02, ease: 'power2.inOut' }, 0);
      tween.to(botChars, { y: 0, duration: 0.3, stagger: 0.02, ease: 'power2.inOut' }, 0);
    };

    link.addEventListener('mouseenter', onEnter);
    link.addEventListener('mouseleave', onLeave);

    return () => {
      link.removeEventListener('mouseenter', onEnter);
      link.removeEventListener('mouseleave', onLeave);
      if (tween) tween.kill();
    };
  }, [text]);

  const chars = text.split('');

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={onClick}
      className={className}
      {...rest}
      style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', lineHeight: '1.2' }}
    >
      <span data-row="top" style={{ display: 'flex' }}>
        {chars.map((c, i) => (
          <span key={i} style={{ display: 'inline-block' }}>
            {c === ' ' ? '\u00A0' : c}
          </span>
        ))}
      </span>
      <span data-row="bot" style={{ display: 'flex' }}>
        {chars.map((c, i) => (
          <span key={`b${i}`} style={{ display: 'inline-block' }}>
            {c === ' ' ? '\u00A0' : c}
          </span>
        ))}
      </span>
    </a>
  );
}
