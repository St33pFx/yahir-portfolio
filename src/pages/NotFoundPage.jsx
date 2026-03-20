import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>404 — Page Not Found | JozeDzn</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <CustomCursor />
      <Navbar />
      <div className="cs-not-found">
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/">← Back to Home</Link>
      </div>
    </>
  );
}
