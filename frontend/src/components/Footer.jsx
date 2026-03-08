const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">🦷 DentalCare</h3>
          <p className="text-sm">
            Providing quality dental care with a gentle touch. Your smile is our
            priority.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/about" className="hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-primary">
                Services
              </a>
            </li>
            <li>
              <a href="/gallery" className="hover:text-primary">
                Gallery
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm">
            📍 Car Street, near Sharada Press, Mangaluru, Karnataka 575001
          </p>
          <p className="text-sm">📞 +91 80501 02869</p>
          <p className="text-sm">📧 manvithakulal2005@gmail.com</p>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} DentalCare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
