import { useLayoutEffect, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import HeroEye from './HeroEye';

const TITLE_TEXT = 'JozeDzn';

const HOVER_FONTS = [
  '"Inter", sans-serif',
  '"Georgia", serif',
  '"Courier New", monospace',
  'system-ui, sans-serif',
  '"Times New Roman", serif',
  '"Arial Black", sans-serif',
  '"Palatino", serif',
];

const HOVER_COLORS = [
  '#e36085',
  '#ff6b6b',
  '#ffd93d',
  '#6bcb77',
  '#4d96ff',
  '#ff8e53',
  '#c084fc',
];

function SubtitleChars({ text }) {
  return text.split('').map((c, i) => (
    <span key={i} style={{ display: 'inline-block' }}>
      {c === ' ' ? '\u00A0' : c}
    </span>
  ));
}

export default function Hero() {
  const { t } = useTranslation();
  const bgRef = useRef(null);
  const elementsRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useLayoutEffect(() => {
    const heroBg = bgRef.current;
    const heroEls = elementsRef.current;
    const heroTitle = titleRef.current;
    const heroSub = subtitleRef.current;
    const navbar = document.getElementById('navbar');

    if (!heroBg || !heroEls || !heroTitle || !navbar) return;

    let bgTween, tl;

    // Wait for fonts so GSAP animates already-measured text (no layout shift)
    document.fonts.ready.then(() => {
      const chars = heroTitle.querySelectorAll('.char');

      // bg-top: slides down from top
      bgTween = gsap.fromTo(
        heroBg,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 2, ease: 'power3.out', delay: 0.3 },
      );

      // Eye: enters from below after bg-top is mostly visible (~1.1s in)
      gsap.fromTo(
        '#heroEye',
        { opacity: 0, y: 55 },
        {
          opacity: 0.72,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          delay: 1.1,
        },
      );

      tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.7,
      });

      tl.to(heroEls, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
        onStart: () => heroEls.classList.add('animate-in'),
      });

      tl.fromTo(
        chars,
        { y: '110%', opacity: 0, filter: 'blur(22px)' },
        {
          y: '0%',
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.045,
          ease: 'power4.out',
          onComplete: () => {
            heroTitle.style.height = heroTitle.offsetHeight + 'px';
            chars.forEach((c) => c.classList.add('revealed'));
          },
        },
        '-=0.2',
      );

      const subSpans = heroSub.querySelectorAll(':scope > span');
      subSpans.forEach((span, spanIdx) => {
        const subChars = span.querySelectorAll('span');
        const position = spanIdx === 0 ? '>-0.6' : '>-0.4';
        tl.fromTo(
          subChars,
          { y: '-100%', opacity: 0, filter: 'blur(12px)' },
          {
            y: '0%',
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            stagger: 0.015,
            ease: 'power3.out',
          },
          position,
        );
      });

      heroSub.style.opacity = '1';

      gsap.set(navbar, { y: -80, opacity: 0 });
      tl.to(
        navbar,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          onStart: () => {
            navbar.classList.remove('hero-hidden');
            navbar.classList.add('hero-visible');
          },
        },
        '>-0.3',
      );
    }); // end document.fonts.ready

    return () => {
      if (bgTween) bgTween.kill();
      if (tl) tl.kill();
    };
  }, []);

  useEffect(() => {
    const chars = titleRef.current?.querySelectorAll('.char');
    if (!chars?.length) return;

    const cleanups = [];

    chars.forEach((span) => {
      let originalColor = null;
      let hoverTween = null;

      const onEnter = () => {
        if (!span.classList.contains('revealed')) return;
        if (!originalColor) originalColor = getComputedStyle(span).color;
        if (hoverTween) hoverTween.kill();

        const randFont =
          HOVER_FONTS[Math.floor(Math.random() * HOVER_FONTS.length)];
        const randColor =
          HOVER_COLORS[Math.floor(Math.random() * HOVER_COLORS.length)];
        const randRot = (Math.random() - 0.5) * 24;
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
      };

      const onLeave = () => {
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
      };

      span.addEventListener('mouseenter', onEnter);
      span.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        span.removeEventListener('mouseenter', onEnter);
        span.removeEventListener('mouseleave', onLeave);
        if (hoverTween) hoverTween.kill();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="hero" id="hero">
      <HeroEye />
      <div className="hero__bg" ref={bgRef}>
        <img src="/assets/images/bg-top.png" alt="" aria-hidden="true" />
      </div>
      <div className="hero__elements" ref={elementsRef} id="heroElements">
        {/* Title — centered by parent flexbox */}
        <div className="hero__content">
          <h1 className="hero__title" ref={titleRef} aria-label={TITLE_TEXT}>
            {TITLE_TEXT.split('').map((char, i) => (
              <span key={i} className="char">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle — absolute, pinned to bottom of the hero */}
        <div className="hero__subtitle" ref={subtitleRef}>
          <span style={{ display: 'inline-block', overflow: 'hidden' }}>
            <SubtitleChars text={t('hero.based')} />
          </span>
          <span style={{ display: 'inline-block', overflow: 'hidden' }}>
            <SubtitleChars text={t('hero.disciplines')} />
          </span>
        </div>
      </div>
    </section>
  );
}
