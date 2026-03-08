import CountUp from "react-countup";
import { useRef, useState, useEffect } from "react";

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

const StatCard = ({ end, suffix, label }) => {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-xl shadow">
      <p className="text-3xl font-bold text-primary">
        {inView ? <CountUp end={end} duration={2.5} suffix={suffix} /> : "0"}
      </p>
      <p className="text-gray-500 mt-1">{label}</p>
    </div>
  );
};

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            At <span className="text-primary font-semibold">DentalCare</span>,
            we've been providing exceptional dental services for over 15 years.
            Our mission is to deliver comfortable, affordable, and high-quality
            dental care to every patient.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Our team consists of highly trained dentists, hygienists, and
            support staff who are passionate about oral health. We use the
            latest technology and techniques to ensure the best outcomes.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Whether it's a routine check-up, cosmetic dentistry, or emergency
            care, we're here for you every step of the way.
          </p>
        </div>
        <div className="bg-teal-50 rounded-2xl p-10 text-center">
          <div className="text-8xl mb-4">🏥</div>
          <h3 className="text-2xl font-bold text-gray-900">15+ Years</h3>
          <p className="text-gray-500">of Trusted Dental Care</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        <StatCard end={5000} suffix="+" label="Happy Patients" />
        <StatCard end={15} suffix="+" label="Years Experience" />
        <StatCard end={10} suffix="+" label="Expert Dentists" />
        <StatCard end={20} suffix="+" label="Services" />
      </div>
    </div>
  );
};

export default About;
