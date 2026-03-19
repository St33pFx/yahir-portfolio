import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';

// CaseStudyPage is only needed when the user navigates to /work/:slug
// Lazy-load it so the initial bundle is smaller
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

// Minimal fallback shown while the case-study chunk is loading
function PageSpinner() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0c0c0c',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '120px',
        height: '1px',
        background: 'rgba(179,243,129,0.15)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: '#b3f381',
          animation: 'loader-grow 1.2s cubic-bezier(0.16,1,0.3,1) forwards',
        }} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/work/:slug"
          element={
            <Suspense fallback={<PageSpinner />}>
              <CaseStudyPage />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
