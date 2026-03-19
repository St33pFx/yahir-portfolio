import AnimatedLink from './AnimatedLink';

export default function Footer() {
  return (
    <footer className="footer">
      <span>Designed By JozeDzn</span>
      <span>&copy; 2026 All rights reserved.</span>
      <div className="footer__links">
        <AnimatedLink text="LinkedIn" href="https://linkedin.com" target="_blank" rel="noopener noreferrer" />
        <AnimatedLink text="Instagram" href="https://instagram.com" target="_blank" rel="noopener noreferrer" />
      </div>
    </footer>
  );
}
