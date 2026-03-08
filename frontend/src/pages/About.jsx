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
        {[
          { num: "5000+", label: "Happy Patients" },
          { num: "15+", label: "Years Experience" },
          { num: "10+", label: "Expert Dentists" },
          { num: "20+", label: "Services" },
        ].map((s) => (
          <div
            key={s.label}
            className="text-center p-6 bg-white rounded-xl shadow"
          >
            <p className="text-3xl font-bold text-primary">{s.num}</p>
            <p className="text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
