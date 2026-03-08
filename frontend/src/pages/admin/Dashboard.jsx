import { Link } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaImages } from "react-icons/fa";

const Dashboard = () => {
  const cards = [
    {
      to: "/admin/patients",
      icon: <FaUsers />,
      title: "Patients",
      desc: "View all registered patients",
      color: "bg-blue-50 text-blue-600",
    },
    {
      to: "/admin/appointments",
      icon: <FaCalendarAlt />,
      title: "Appointments",
      desc: "Manage all appointments",
      color: "bg-green-50 text-green-600",
    },
    {
      to: "/admin/upload-gallery",
      icon: <FaImages />,
      title: "Gallery",
      desc: "Upload gallery images",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-10">
        Manage your dental clinic from here.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="block bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div
              className={`text-4xl mb-4 p-3 rounded-xl inline-block ${c.color}`}
            >
              {c.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {c.title}
            </h3>
            <p className="text-gray-500">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
