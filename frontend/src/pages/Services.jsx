import { Link } from "react-router-dom";
import {
  FaSmileBeam,
  FaSyringe,
  FaTeeth,
  FaTeethOpen,
  FaTooth,
  FaXRay,
} from "react-icons/fa";

const services = [
  {
    icon: <FaTooth />,
    title: "General Dentistry",
    desc: "Comprehensive checkups, professional cleaning, fillings, and prevention for all ages.",
  },
  {
    icon: <FaSmileBeam />,
    title: "Cosmetic Dentistry",
    desc: "Teeth whitening, veneers, and smile enhancement procedures for natural results.",
  },
  {
    icon: <FaTeeth />,
    title: "Orthodontics",
    desc: "Braces and clear aligners designed for better bite alignment and confidence.",
  },
  {
    icon: <FaTeethOpen />,
    title: "Oral Surgery",
    desc: "Safe wisdom tooth extraction, implant planning, and minor surgical procedures.",
  },
  {
    icon: <FaSyringe />,
    title: "Root Canal Therapy",
    desc: "Gentle, precision-led root canal treatment to relieve pain and save natural teeth.",
  },
  {
    icon: <FaXRay />,
    title: "Digital X-Ray",
    desc: "Low-radiation digital imaging for fast, accurate diagnostics and treatment planning.",
  },
];

const Services = () => {
  return (
    <div className="page-container">
      <div className="mb-10 text-center">
        <p className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          Treatment Expertise
        </p>
        <h1 className="section-title">Dental Services Built Around You</h1>
        <p className="section-subtitle mx-auto">
          A complete set of preventive, restorative, and cosmetic treatments,
          delivered with modern tools and patient-first care.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, idx) => (
          <article
            key={service.title}
            className="card-surface fade-up p-7"
            style={{ animationDelay: `${idx * 120}ms` }}
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
            <p className="mt-2 text-slate-600">{service.desc}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-gradient-to-r from-primary to-teal-500 p-8 text-white sm:p-10">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Not sure which treatment you need?
        </h2>
        <p className="mt-3 max-w-2xl text-teal-50">
          Start with a consultation. We will evaluate your oral health and guide
          you to the right treatment plan with transparent recommendations.
        </p>
        <Link to="/book" className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-primary transition hover:bg-slate-100">
          Book a Consultation
        </Link>
      </div>
    </div>
  );
};

export default Services;
