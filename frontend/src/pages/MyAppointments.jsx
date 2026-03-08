import { useEffect, useState } from "react";
import { getMyAppointments } from "../api/appointmentApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      try {
        const res = await getMyAppointments();
        setAppointments(res.data);
      } catch {
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          My Appointments
        </h2>
        <p className="text-gray-600 mb-6">
          Please log in to view your appointments.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    const [y, m, d] = dateStr.split("-");
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    const [h, min] = time.split(":");
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${min} ${ampm}`;
  };

  const statusColor = {
    booked: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Appointments</h1>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            You have no appointments yet.
          </p>
          <button
            onClick={() => navigate("/book")}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Book an Appointment
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div
              key={apt._id}
              className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm"
            >
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(apt.date)}
                </p>
                <p className="text-gray-500">{formatTime(apt.timeSlot)}</p>
              </div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColor[apt.status] || "bg-gray-100 text-gray-600"}`}
              >
                {apt.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
