import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarPicker = ({ onDateSelect, selectedDate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    if (date < today) return;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    onDateSelect(`${yyyy}-${mm}-${dd}`);
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    const yyyy = currentYear;
    const mm = String(currentMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return selectedDate === `${yyyy}-${mm}-${dd}`;
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isPast = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < today;
  };

  const isPrevDisabled =
    currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  // Build calendar grid
  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return (
    <div className="mb-8 lg:mb-0">
      <label className="block text-lg font-semibold text-gray-700 mb-3">
        Select a Date
      </label>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            disabled={isPrevDisabled}
            className={`p-2 rounded-lg transition ${
              isPrevDisabled
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            aria-label="Previous month"
          >
            <FaChevronLeft />
          </button>
          <h3 className="text-lg font-semibold text-gray-900">
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            aria-label="Next month"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-center text-xs font-semibold text-gray-400 py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) =>
            day === null ? (
              <div key={`empty-${i}`} />
            ) : (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                disabled={isPast(day)}
                className={`relative h-10 w-full rounded-xl text-sm font-medium transition
                  ${
                    isPast(day)
                      ? "text-gray-300 cursor-not-allowed"
                      : isSelected(day)
                        ? "bg-primary text-white shadow-md"
                        : isToday(day)
                          ? "bg-teal-50 text-primary font-bold ring-2 ring-primary/30"
                          : "text-gray-700 hover:bg-teal-50 hover:text-primary"
                  }`}
              >
                {day}
                {isToday(day) && !isSelected(day) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" />
                )}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;
