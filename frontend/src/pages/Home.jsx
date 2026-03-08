import { Link } from "react-router-dom";
import { FaCalendarCheck, FaTooth, FaSmile } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Your Smile, <br />
              <span className="text-primary">Our Priority</span>
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Experience world-class dental care with our expert team. We make
              dental visits comfortable and stress-free.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                to="/book"
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition"
              >
                Our Services
              </Link>
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-9xl">🦷</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-teal-50">
              <FaTooth className="text-primary text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Dentists</h3>
              <p className="text-gray-600">
                Our team of experienced dentists provide top-notch care.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-teal-50">
              <FaCalendarCheck className="text-primary text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book your appointment online in just a few clicks.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-teal-50">
              <FaSmile className="text-primary text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Happy Patients</h3>
              <p className="text-gray-600">
                Thousands of satisfied patients trust us with their smiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for a Brighter Smile?</h2>
        <p className="mb-6 text-teal-100">
          Schedule your visit today and take the first step.
        </p>
        <Link
          to="/book"
          className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
