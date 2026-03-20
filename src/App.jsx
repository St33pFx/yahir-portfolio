import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import MotionPage from './pages/MotionPage';
import ThreeDPage from './pages/ThreeDPage';
import WebDesignPage from './pages/WebDesignPage';
import GameDevPage from './pages/GameDevPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function PageSpinner() {
  return (
    <div style={{ minHeight: '100vh', background: '#0c0c0c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '120px', height: '1px', background: 'rgba(179,243,129,0.15)', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: '#b3f381', animation: 'loader-grow 1.2s cubic-bezier(0.16,1,0.3,1) forwards' }} />
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/motion-graphics" element={<MotionPage />} />
        <Route path="/3d" element={<ThreeDPage />} />
        <Route path="/web-design" element={<WebDesignPage />} />
        <Route path="/game-dev" element={<GameDevPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/work/:slug"
          element={
            <Suspense fallback={<PageSpinner />}>
              <CaseStudyPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
