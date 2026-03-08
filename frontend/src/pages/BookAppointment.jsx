import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/authApi";
import { getSlots, bookAppointment } from "../api/appointmentApi";
import CalendarPicker from "../components/CalendarPicker";
import TimeSlots from "../components/TimeSlots";
import { toast } from "sonner";

const BookAppointment = () => {
  const { user, fetchUser } = useAuth();
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);

  // Profile completion state
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profileStep, setProfileStep] = useState(false);

  // Check if user needs to complete profile
  const needsProfile = user && (!user.name || !user.phone);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Book an Appointment
        </h2>
        <p className="text-gray-600 mb-6">
          Please log in to book an appointment.
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

  if (needsProfile || profileStep) {
    const handleProfileSubmit = async (e) => {
      e.preventDefault();
      try {
        await updateProfile({ name, phone });
        await fetchUser();
        setProfileStep(false);
      } catch {
        toast.error("Failed to update profile.");
      }
    };

    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Complete Your Profile
        </h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition w-full"
          >
            Save & Continue
          </button>
        </form>
      </div>
    );
  }

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setSelectedSlot("");
    try {
      const res = await getSlots(date);
      setSlots(res.data);
    } catch {
      setSlots([]);
    }
  };

  const handleBook = async () => {
    if (!selectedSlot) return;
    setLoading(true);
    try {
      await bookAppointment({ date: selectedDate, timeSlot: selectedSlot });
      toast.success("Appointment booked successfully!");
      setSelectedSlot("");
      // Refresh slots
      const res = await getSlots(selectedDate);
      setSlots(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Book an Appointment
      </h1>

      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Left: Calendar */}
        <div className="lg:w-1/2">
          <CalendarPicker
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
        </div>

        {/* Right: Time Slots + Confirm */}
        {selectedDate && (
          <div className="lg:w-1/2 lg:pt-0">
            <TimeSlots
              slots={slots}
              onSelect={setSelectedSlot}
              selectedSlot={selectedSlot}
            />

            {selectedSlot && (
              <button
                onClick={handleBook}
                disabled={loading}
                className="mt-6 w-full bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition disabled:opacity-50"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
