import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/gallery", label: "Gallery" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          🦷 DentalCare
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-gray-700 hover:text-primary transition"
            >
              {l.label}
            </Link>
          ))}
          {user && user.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="text-gray-700 hover:text-primary transition"
            >
              Admin
            </Link>
          )}
          <Link
            to="/book"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Book Appointment
          </Link>
          {!user ? (
            <Link to="/login" className="text-primary font-medium">
              Login
            </Link>
          ) : (
            <span className="text-sm text-gray-500">
              Hi, {user.name || "User"}
            </span>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 pb-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block text-gray-700 hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {user && user.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="block text-gray-700 hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          )}
          <Link
            to="/book"
            className="block bg-primary text-white text-center px-4 py-2 rounded-lg"
            onClick={() => setOpen(false)}
          >
            Book Appointment
          </Link>
          {!user && (
            <Link
              to="/login"
              className="block text-primary font-medium"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
