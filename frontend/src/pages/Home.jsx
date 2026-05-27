import { Link } from "react-router-dom";
import {
  FaAward,
  FaCalendarCheck,
  FaRegSmileBeam,
  FaShieldAlt,
  FaTooth,
} from "react-icons/fa";

const highlights = [
  { label: "Patients Treated", value: "5,000+" },
  { label: "Years of Experience", value: "15+" },
  { label: "Expert Dentists", value: "10+" },
];

const features = [
  {
    icon: <FaTooth />,
    title: "Precision-First Dentistry",
    desc: "Digital diagnostics and modern protocols that reduce pain and improve outcomes.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Safe, Sterile, Trusted",
    desc: "Strict sterilization standards and transparent care plans for your peace of mind.",
  },
  {
    icon: <FaRegSmileBeam />,
    title: "Comfort-Led Experience",
    desc: "Warm staff, gentle treatment, and flexible options for anxiety-free visits.",
  },
];

const steps = [
  {
    title: "Book in Minutes",
    desc: "Pick your date and time slot with instant availability.",
  },
  {
    title: "Meet Your Dentist",
    desc: "Get a focused exam, clear explanation, and personalized treatment plan.",
  },
  {
    title: "Smile Confidently",
    desc: "Receive follow-up support and prevention guidance for long-term oral health.",
  },
];

const Home = () => {
  return (
    <div>
      <section className="relative overflow-hidden pb-20 pt-14 sm:pt-20">
        <div className="page-container !py-0">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="fade-up">
              <p className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                Modern Dental Care in Mangaluru
              </p>
              <h1 className="section-title text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Better Dental Care.
                <br />
                Better Everyday Smile.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
                From routine cleanings to advanced procedures, we combine
                compassionate care with modern technology to make every visit
                smoother and more comfortable.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/book" className="btn-primary">
                  <FaCalendarCheck />
                  <span className="ml-2">Book Appointment</span>
                </Link>
                <Link to="/services" className="btn-outline">
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="fade-up">
              <div className="card-surface relative overflow-hidden p-3">
                <img
                  src="https://images.pexels.com/photos/31043313/pexels-photo-31043313.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Smiling dental professional"
                  className="h-[430px] w-full rounded-xl object-cover object-center lg:object-[center_-130px]"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 rounded-xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Open Today
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    11:00 AM to 3:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((item, idx) => (
              <div
                key={item.label}
                className="card-surface fade-up p-5"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <p className="text-2xl font-extrabold text-slate-900">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-container pt-0">
        <div className="mb-10 text-center">
          <h2 className="section-title">Why Patients Choose Us</h2>
          <p className="section-subtitle mx-auto">
            Built on trust, precision, and a patient experience that feels human
            from your first call to your follow-up visit.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <article
              key={feature.title}
              className="card-surface fade-up p-7"
              style={{ animationDelay: `${idx * 140}ms` }}
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-slate-600">{feature.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-container pt-0">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-teal-500 px-6 py-10 text-white sm:px-10">
          <div className="mb-6 flex items-center gap-2">
            <FaAward />
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-100">
              Simple 3-Step Journey
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div key={step.title} className="rounded-2xl bg-white/10 p-5">
                <p className="mb-2 text-sm font-semibold text-teal-100">
                  Step {idx + 1}
                </p>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-teal-50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
