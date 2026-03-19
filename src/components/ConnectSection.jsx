import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import TextPressure from './TextPressure';
import SplitText from './SplitText';

// Per-character color maps — matching Figma exactly:
// "hello@"  → "hello" = cream, "@" = pink (#e36085)
const HELLO_COLORS  = [null, null, null, null, null, 'var(--color-text-email-symbols)'];
// "jozedzn.com" → "jozedzn" = cream, "." = pink, "com" = green
const DOMAIN_COLORS = [null, null, null, null, null, null, null, 'var(--color-text-email-symbols)', 'var(--color-text-email-com)', 'var(--color-text-email-com)', 'var(--color-text-email-com)'];

function makeChars(text) {
  return text.split('').map((c, i) => (
    <span key={i} className="connect__char" style={{ display: 'inline-block' }}>
      {c === ' ' ? '\u00A0' : c}
    </span>
  ));
}

export default function ConnectSection() {
  const sectionRef  = useRef(null);
  const bgRef       = useRef(null);
  const headingRef  = useRef(null);
  const rightRef    = useRef(null);
  const footerRef   = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg      = bgRef.current;
    const heading = headingRef.current;
    const right   = rightRef.current;
    const footer  = footerRef.current;
    if (!section || !bg || !heading) return;

    const lines    = heading.querySelectorAll('.connect__line');
    const allChars = [...lines].flatMap(l => [...l.querySelectorAll('.connect__char')]);

    gsap.set(allChars, { y: '110%', opacity: 0 });
    if (right)  gsap.set([...right.children], { opacity: 0, y: 24 });
    gsap.set(bg, { scaleY: 0, transformOrigin: 'bottom center' });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        gsap.to(bg, { scaleY: 1, duration: 1.8, ease: 'power3.out' });

        const tl = gsap.timeline({ delay: 0.25 });

        lines.forEach((line, li) => {
          const chars = [...line.querySelectorAll('.connect__char')];
          tl.to(chars, {
            y: '0%', opacity: 1,
            duration: 0.65, stagger: 0.02, ease: 'power4.out',
          }, li === 0 ? '>' : '>-0.45');
        });

        if (right) {
          tl.to([...right.children], {
            opacity: 1, y: 0,
            duration: 0.7, stagger: 0.15, ease: 'power3.out',
          }, '>-0.4');
        }

        observer.unobserve(section);
      });
    }, { threshold: 0.55 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="connect" id="connect" ref={sectionRef}>

      <div className="connect__bg" ref={bgRef}>
        <img src="/assets/icons/bg-bottom.svg" alt="" aria-hidden="true" />
      </div>

      <div className="connect__inner">

        <div className="connect__layout">

          {/* ── Left: big heading ── */}
          <div className="connect__left">
            <h2 className="connect__heading" ref={headingRef}>
              <span className="connect__line">{makeChars('Have a project')}</span>
              <span className="connect__line">{makeChars('in mind?')}</span>
              <span className="connect__line connect__line--green">{makeChars("Let's build it.")}</span>
            </h2>
          </div>

          {/* ── Right: contact + social ── */}
          <div className="connect__right" ref={rightRef}>

            <div className="connect__group">
              <span className="connect__group-label">Contact</span>
              <a href="mailto:hello@jozedzn.com" className="connect__email-link">
                <TextPressure
                  text="hello@"
                  fontFamily="N27"
                  weight={true}
                  textColor="#f0fde6"
                  charColors={HELLO_COLORS}
                  minFontSize={16}
                  className="connect__email-top"
                />
                <TextPressure
                  text="jozedzn.com"
                  fontFamily="N27"
                  weight={true}
                  textColor="#f0fde6"
                  charColors={DOMAIN_COLORS}
                  minFontSize={16}
                  className="connect__email-bottom"
                />
              </a>
            </div>

            <div className="connect__group">
              <span className="connect__group-label">Social</span>
              <div className="connect__socials">
                <a
                  href="https://linkedin.com/in/jozedzn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connect__social-link"
                >LinkedIn</a>
                <span className="connect__divider">/</span>
                <a
                  href="https://instagram.com/jozedzn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connect__social-link"
                >Instagram</a>
              </div>
            </div>

          </div>
        </div>

        {/* ── Footer ── */}
        <div className="connect__footer" ref={footerRef}>
          <SplitText
            text="© 2026 All rights reserved."
            tag="span"
            className="connect__footer-text"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            delay={25}
            duration={0.8}
            ease="power3.out"
            threshold={0.2}
            rootMargin="0px"
            textAlign="left"
          />
        </div>

      </div>
    </section>
  );
}
