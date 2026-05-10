import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/authApi";
import { getSlots, bookAppointment } from "../api/appointmentApi";
import CalendarPicker from "../components/CalendarPicker";
import TimeSlots from "../components/TimeSlots";
import { toast } from "sonner";
import { FaCalendarCheck, FaUserCheck } from "react-icons/fa";

const BookAppointment = () => {
  const { user, fetchUser } = useAuth();
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profileStep, setProfileStep] = useState(false);

  const needsProfile = user && (!user.name || !user.phone);

  if (!user) {
    return (
      <div className="page-container max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-slate-900">Book an Appointment</h2>
        <p className="mt-3 text-slate-600">
          Please sign in to select your date and time slot.
        </p>
        <button onClick={() => navigate("/login")} className="btn-primary mt-6">
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
        toast.success("Profile updated successfully.");
      } catch {
        toast.error("Failed to update profile.");
      }
    };

    return (
      <div className="page-container max-w-xl">
        <div className="card-surface p-7 sm:p-8">
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FaUserCheck />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Complete Your Profile</h2>
          <p className="mt-2 text-slate-600">
            Add your details once to continue booking appointments faster.
          </p>
          <form onSubmit={handleProfileSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="label-text">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="field"
              />
            </div>
            <div>
              <label htmlFor="phone" className="label-text">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="field"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Save & Continue
            </button>
          </form>
        </div>
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
      const res = await getSlots(selectedDate);
      setSlots(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="section-title">Book an Appointment</h1>
          <p className="mt-2 text-slate-600">
            Choose your preferred date and time in a few simple steps.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <CalendarPicker
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />

        <div className="space-y-4">
          <TimeSlots
            slots={slots}
            onSelect={setSelectedSlot}
            selectedSlot={selectedSlot}
          />

          {selectedDate && selectedSlot && (
            <div className="card-surface fade-up p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Selected Slot
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {selectedDate} at {selectedSlot}
              </p>
              <button
                onClick={handleBook}
                disabled={loading}
                className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaCalendarCheck />
                <span className="ml-2">
                  {loading ? "Booking..." : "Confirm Booking"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
