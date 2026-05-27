import CountUp from "react-countup";
import { useRef, useState, useEffect } from "react";
import { FaHospitalAlt } from "react-icons/fa";

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
    <div ref={ref} className="card-surface text-center p-6">
      <p className="text-3xl font-extrabold text-primary">
        {inView ? <CountUp end={end} duration={2.5} suffix={suffix} /> : "0"}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
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
      "https://t3.ftcdn.net/jpg/00/96/01/26/360_F_96012689_u6TDoM1XHJ4mBAa6CM3HjL2eEngpn6eX.jpg",
  },
  {
    name: "Dr. Nisha Rao",
    specialty: "Preventive & Family Dentist",
    education: "BDS, Fellowship in Preventive Dentistry, AIIMS Delhi",
    experience: "8+ years",
    focus: "Child-friendly checkups, scaling, and preventive oral care.",
    image:
      "https://www.shutterstock.com/image-photo/confident-smiling-dentist-posing-arms-600nw-2627081013.jpg",
  },
];

const About = () => {
  return (
    <div className="page-container">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="fade-up">
          <p className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            About DentalCare
          </p>
          <h1 className="section-title">Trusted Care for Every Smile</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            For over 15 years, DentalCare has provided affordable, high-quality
            dentistry with a patient-first approach. We blend advanced
            technology with compassionate care to keep your visits smooth,
            efficient, and stress-free.
          </p>
          <p className="mt-4 text-slate-600">
            Whether it is preventive care, cosmetic dentistry, or urgent
            treatment, our team is committed to clinical excellence and
            long-term oral health.
          </p>
        </div>

        <div className="card-surface fade-up p-8 sm:p-10">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
            <FaHospitalAlt />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">15+ Years</h3>
          <p className="mt-1 text-slate-600">of trusted dental excellence</p>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p className="rounded-xl bg-slate-50 px-4 py-2">
              Evidence-based treatment protocols
            </p>
            <p className="rounded-xl bg-slate-50 px-4 py-2">
              Clear communication and transparent care plans
            </p>
            <p className="rounded-xl bg-slate-50 px-4 py-2">
              Personalized solutions for every age group
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
        <StatCard end={5000} suffix="+" label="Happy Patients" />
        <StatCard end={15} suffix="+" label="Years Experience" />
        <StatCard end={10} suffix="+" label="Expert Dentists" />
        <StatCard end={20} suffix="+" label="Services" />
      </div>

      <section className="mt-20">
        <div className="mb-10 text-center">
          <h2 className="section-title">Meet Our Doctors</h2>
          <p className="section-subtitle mx-auto">
            A multidisciplinary team with deep training, modern techniques, and
            a strong focus on comfortable patient experiences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {doctorProfiles.map((doctor, idx) => (
            <article
              key={doctor.name}
              className="card-surface fade-up overflow-hidden"
              style={{ animationDelay: `${idx * 130}ms` }}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-72 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  {doctor.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-primary">
                  {doctor.specialty}
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">
                    Education:
                  </span>{" "}
                  {doctor.education}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">
                    Experience:
                  </span>{" "}
                  {doctor.experience}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">Focus:</span>{" "}
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
