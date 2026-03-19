import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/style.css';

history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

function dismissLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  loader.classList.add('out');
  // Remove from DOM after transition so it doesn't block interactions
  setTimeout(() => loader.remove(), 750);
}

async function boot() {
  // Mount React first so the component tree is ready
  const root = createRoot(document.getElementById('root'));
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Wait for fonts to be fully loaded before dismissing loader.
  // This guarantees GSAP animates already-rendered text — no layout shift.
  try {
    await document.fonts.ready;
  } catch (_) { /* fonts.ready not supported — proceed anyway */ }

  // Small buffer so the first React paint has flushed
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      dismissLoader();
    });
  });
}

boot();
