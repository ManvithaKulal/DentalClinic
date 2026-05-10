import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { FaBars, FaCalendarCheck, FaTimes, FaTooth } from "react-icons/fa";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const navLinkClass = (active) =>
  `rounded-full px-3 py-2 text-sm font-semibold transition ${
    active
      ? "bg-primary/10 text-primary"
      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
  }`;

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isAdminPath = location.pathname.startsWith("/admin");

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-slate-100"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-teal-400 text-white shadow">
            <FaTooth />
          </span>
          <span className="text-lg font-bold text-slate-900">DentalCare</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={navLinkClass(isActive(l.to))}>
              {l.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className={navLinkClass(isAdminPath)}
            >
              Admin
            </Link>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/my-appointments"
                className={navLinkClass(isActive("/my-appointments"))}
              >
                My Appointments
              </Link>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600">
                Hi, {user.name || "User"}
              </span>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold text-primary transition hover:text-primary-dark"
            >
              Login
            </Link>
          )}
          <Link to="/book" className="btn-primary !px-4 !py-2.5 !text-sm">
            <FaCalendarCheck />
            <span className="ml-2">Book Appointment</span>
          </Link>
        </div>

        <button
          type="button"
          className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="mx-4 mb-4 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-lg backdrop-blur">
            <div className="space-y-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`block rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    isActive(l.to)
                      ? "bg-primary/10 text-primary"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {l.label}
                </Link>
              ))}

              {user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className={`block rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    isAdminPath
                      ? "bg-primary/10 text-primary"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Admin
                </Link>
              )}

              {user && (
                <Link
                  to="/my-appointments"
                  className={`block rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    isActive("/my-appointments")
                      ? "bg-primary/10 text-primary"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  My Appointments
                </Link>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Link to="/book" className="btn-primary w-full !py-2.5 !text-sm">
                Book Appointment
              </Link>
              {!user && (
                <Link
                  to="/login"
                  className="btn-outline w-full !py-2.5 !text-sm text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
