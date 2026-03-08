/**
 * Generate available time slots for a given date.
 * Working hours: 11:00 AM – 3:00 PM
 * Slot duration: 30 min
 * Lunch break: 1:00 PM – 1:30 PM (excluded)
 */
const generateSlots = () => {
  const allSlots = [
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    // 1:00 is lunch break
    "13:30",
    "14:00",
    "14:30",
  ];
  return allSlots;
};

module.exports = generateSlots;
