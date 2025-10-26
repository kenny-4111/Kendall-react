import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="relative w-full bg-white shadow-md px-6 py-4 flex items-center justify-between z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Kendall
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-blue-600 font-medium">
          Dashboard
        </Link>
        <Link
          to="/tickets"
          className="text-gray-700 hover:text-blue-600 font-medium">
          Manage Tickets
        </Link>
      </div>

      {/* CTA Button */}
      <div>
        <Link
          to="/auth/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition">
          Login
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setMobileOpen(!mobileOpen)}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center md:hidden py-3 border-t z-40">
          <Link
            to="/dashboard"
            className="w-full text-center py-2 text-gray-700 hover:text-blue-600 border-b"
            onClick={() => setMobileOpen(false)}>
            Dashboard
          </Link>
          <Link
            to="/tickets"
            className="w-full text-center py-2 text-gray-700 hover:text-blue-600"
            onClick={() => setMobileOpen(false)}>
            Manage Tickets
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
