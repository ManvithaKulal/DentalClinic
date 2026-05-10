import { useEffect, useState } from "react";
import { getMyAppointments } from "../api/appointmentApi";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const statusMap = {
  booked: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const MyAppointments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      try {
        const res = await getMyAppointments();
        setAppointments(res.data);
      } catch {
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (!user) {
    return (
      <div className="page-container max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-slate-900">My Appointments</h2>
        <p className="mt-3 text-slate-600">
          Please sign in to view your appointments.
        </p>
        <button onClick={() => navigate("/login")} className="btn-primary mt-6">
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

  return (
    <div className="page-container max-w-4xl">
      <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="section-title">My Appointments</h1>
          <p className="mt-2 text-slate-600">
            Track your upcoming and past visits in one place.
          </p>
        </div>
        <Link to="/book" className="btn-outline !px-5 !py-2.5">
          Book New Appointment
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-primary"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="card-surface py-14 text-center">
          <p className="text-lg font-semibold text-slate-700">
            You have no appointments yet.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Start by choosing a date and time that works for you.
          </p>
          <button
            onClick={() => navigate("/book")}
            className="btn-primary mt-6"
          >
            Book an Appointment
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt, idx) => (
            <article
              key={apt._id}
              className="card-surface fade-up flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              style={{ animationDelay: `${idx * 90}ms` }}
            >
              <div>
                <p className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <FaCalendarAlt className="text-primary" />
                  {formatDate(apt.date)}
                </p>
                <p className="mt-1 flex items-center gap-2 text-slate-600">
                  <FaClock className="text-primary" />
                  {formatTime(apt.timeSlot)}
                </p>
              </div>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold capitalize ${
                  statusMap[apt.status] || "bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                {apt.status}
              </span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
