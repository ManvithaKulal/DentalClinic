import { Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaTooth } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200/70 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-teal-400 text-white">
              <FaTooth />
            </span>
            <h3 className="text-xl font-bold text-white">DentalCare</h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-300">
            Gentle dentistry, modern technology, and friendly care for every
            smile in your family.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-100">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="transition hover:text-teal-300">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="transition hover:text-teal-300">
                Services
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="transition hover:text-teal-300">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-teal-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-100">
            Contact
          </h4>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-0.5 text-teal-300" />
              <span>
                Car Street, near Sharada Press, Mangaluru, Karnataka 575001
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FaPhone className="text-teal-300" />
              <span>+91 80501 02869</span>
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-teal-300" />
              <span>manvithakulal2005@gmail.com</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} DentalCare. Crafted for brighter
        smiles.
      </div>
    </footer>
  );
};

export default Footer;
