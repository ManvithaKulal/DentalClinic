const TimeSlots = ({ slots, onSelect, selectedSlot }) => {
  if (!slots || slots.length === 0) {
    return (
      <div className="card-surface p-6 text-center">
        <p className="font-semibold text-slate-700">
          Select a date to view available slots.
        </p>
      </div>
    );
  }

  const formatTime = (time) => {
    const [h, m] = time.split(":");
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${m} ${ampm}`;
  };

  return (
    <div className="card-surface fade-up p-6">
      <h3 className="text-lg font-bold text-slate-900">Available Time Slots</h3>
      <p className="mt-1 text-sm text-slate-500">
        Pick a convenient time for your visit.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {slots.map((slot) => (
          <button
            key={slot.time}
            type="button"
            disabled={!slot.available}
            onClick={() => onSelect(slot.time)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              !slot.available
                ? "cursor-not-allowed bg-slate-200 text-slate-400"
                : selectedSlot === slot.time
                  ? "bg-primary text-white shadow"
                  : "border border-primary/25 bg-primary/5 text-primary hover:bg-primary hover:text-white"
            }`}
          >
            {formatTime(slot.time)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlots;
