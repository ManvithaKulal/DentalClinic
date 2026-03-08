import {
  FaTooth,
  FaTeeth,
  FaTeethOpen,
  FaSyringe,
  FaXRay,
  FaSmileBeam,
} from "react-icons/fa";

const services = [
  {
    icon: <FaTooth />,
    title: "General Dentistry",
    desc: "Comprehensive exams, cleanings, fillings, and preventive care for the whole family.",
  },
  {
    icon: <FaSmileBeam />,
    title: "Cosmetic Dentistry",
    desc: "Teeth whitening, veneers, and smile makeovers to boost your confidence.",
  },
  {
    icon: <FaTeeth />,
    title: "Orthodontics",
    desc: "Braces and aligners to straighten your teeth and improve your bite.",
  },
  {
    icon: <FaTeethOpen />,
    title: "Oral Surgery",
    desc: "Wisdom tooth removal, implants, and other surgical procedures.",
  },
  {
    icon: <FaSyringe />,
    title: "Root Canal",
    desc: "Pain-free root canal treatment to save your natural teeth.",
  },
  {
    icon: <FaXRay />,
    title: "Dental X-Ray",
    desc: "Digital X-rays for accurate diagnosis with minimal radiation.",
  },
];

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Our Services
      </h1>
      <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
        We offer a full range of dental services to keep your smile healthy and
        bright.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s) => (
          <div
            key={s.title}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="text-primary text-3xl mb-4">{s.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {s.title}
            </h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
