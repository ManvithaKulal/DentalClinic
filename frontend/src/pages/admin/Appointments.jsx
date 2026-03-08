import { useEffect, useState } from "react";
import { getAllAppointments, cancelAppointment } from "../../api/galleryApi";
import { toast } from "sonner";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await getAllAppointments();
      setAppointments(res.data);
    } catch {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    toast("Cancel this appointment?", {
      action: {
        label: "Confirm",
        onClick: async () => {
          try {
            await cancelAppointment(id);
            toast.success("Appointment cancelled successfully.");
            fetchAppointments();
          } catch {
            toast.error("Failed to cancel appointment.");
          }
        },
      },
    });
  };

  const formatTime = (time) => {
    const [h, m] = time.split(":");
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${m} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        All Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                  #
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                  Patient
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                  Time
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, i) => (
                <tr
                  key={a._id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-3 text-sm text-gray-700">{i + 1}</td>
                  <td className="px-6 py-3 text-sm text-gray-900 font-medium">
                    {a.userId?.name || "—"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {a.userId?.email || "—"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{a.date}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {formatTime(a.timeSlot)}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        a.status === "booked"
                          ? "bg-green-100 text-green-700"
                          : a.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    {a.status === "booked" && (
                      <button
                        onClick={() => handleCancel(a._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Appointments;
