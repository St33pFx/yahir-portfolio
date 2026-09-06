export function shouldReduceMotion() {
  if (typeof document === 'undefined') return false;

  const preference = document.documentElement.dataset.motion;
  if (preference === 'full') return false;
  if (preference === 'reduce') return true;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
