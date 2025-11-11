import { Link } from "react-router-dom"; 
// Import Link to handle internal navigation without reloading the page

// Define the Navbar component
export default function Navbar() {
  return (
    // Navigation wrapper with background and shadow
    <nav className="bg-white shadow-sm">
      {/* Centered container with padding and flexbox for layout */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo / Title that links to the homepage */}
        <Link to="/" className="font-semibold text-lg">
          CV Generator
        </Link>

        {/* Right-side navigation links */}
        <div className="flex gap-3">
          {/* Link to Builder page */}
          <Link to="/builder" className="text-sm">
            Builder
          </Link>
          {/* Link to Preview page */}
          <Link to="/preview" className="text-sm">
            Preview
          </Link>
        </div>
      </div>
    </nav>
  );
}
