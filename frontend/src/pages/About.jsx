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

const doctorProfiles = [
  {
    name: "Dr. Aanya Sharma",
    specialty: "Cosmetic Dentist & Smile Design",
    education: "BDS, MDS (Prosthodontics), Manipal College of Dental Sciences",
    experience: "12+ years",
    focus: "Veneers, smile makeovers, and digital smile planning.",
    image:
      "https://images.pexels.com/photos/31017709/pexels-photo-31017709.jpeg?cs=srgb&dl=pexels-the-row-dental-2150209255-31017709.jpg&fm=jpg",
  },
  {
    name: "Dr. Meera Patel",
    specialty: "Orthodontist",
    education: "BDS, MDS (Orthodontics), Saveetha Dental College",
    experience: "9+ years",
    focus: "Clear aligners, braces, and bite correction for all ages.",
    image:
      "https://images.pexels.com/photos/31043313/pexels-photo-31043313.jpeg?cs=srgb&dl=pexels-manuel-toledo-434387434-31043313.jpg&fm=jpg",
  },
  {
    name: "Dr. Arjun Mehta",
    specialty: "Oral & Maxillofacial Surgeon",
    education: "BDS, MDS (Oral Surgery), King George's Medical University",
    experience: "14+ years",
    focus: "Wisdom tooth surgery, implants, and trauma care.",
    image:
      "https://images.pexels.com/photos/19438561/pexels-photo-19438561.jpeg?cs=srgb&dl=pexels-oys-photography-838143052-19438561.jpg&fm=jpg",
  },
  {
    name: "Dr. Nisha Rao",
    specialty: "Preventive & Family Dentist",
    education: "BDS, Fellowship in Preventive Dentistry, AIIMS Delhi",
    experience: "8+ years",
    focus: "Child-friendly checkups, scaling, and preventive oral care.",
    image:
      "https://images.pexels.com/photos/5234467/pexels-photo-5234467.jpeg?cs=srgb&dl=pexels-polina-tankilevitch-5234467.jpg&fm=jpg",
  },
];

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

      {/* Doctor Information */}
      <section className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Doctors</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Our doctors combine strong clinical training with modern treatment
            methods to provide safe, comfortable, and personalized dental care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctorProfiles.map((doctor) => (
            <article
              key={doctor.name}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-72 object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium mt-1">{doctor.specialty}</p>
                <p className="text-gray-600 text-sm mt-3">
                  <span className="font-semibold text-gray-800">Education:</span>{" "}
                  {doctor.education}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  <span className="font-semibold text-gray-800">Experience:</span>{" "}
                  {doctor.experience}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  <span className="font-semibold text-gray-800">Focus:</span>{" "}
                  {doctor.focus}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
