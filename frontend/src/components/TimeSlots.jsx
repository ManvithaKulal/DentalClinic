const TimeSlots = ({ slots, onSelect, selectedSlot }) => {
  if (!slots || slots.length === 0) {
    return (
      <p className="text-gray-500">Select a date to see available slots.</p>
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
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Available Slots
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {slots.map((slot) => (
          <button
            key={slot.time}
            disabled={!slot.available}
            onClick={() => onSelect(slot.time)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                !slot.available
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : selectedSlot === slot.time
                    ? "bg-primary text-white"
                    : "bg-secondary text-primary border border-primary hover:bg-primary hover:text-white"
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
