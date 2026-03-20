import CustomCursor from './CustomCursor';
import Navbar from './Navbar';

export default function NotFoundPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="cs-not-found">
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/">← Back to Home</a>
      </div>
    </>
  );
}
