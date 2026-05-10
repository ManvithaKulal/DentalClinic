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
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
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

  const isToday = (day) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const isPast = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < today;
  };

  const isPrevDisabled =
    currentMonth === today.getMonth() && currentYear === today.getFullYear();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="fade-up">
      <label className="label-text text-base">Select Appointment Date</label>
      <div className="card-surface p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={prevMonth}
            disabled={isPrevDisabled}
            className={`rounded-xl p-2 transition ${
              isPrevDisabled
                ? "cursor-not-allowed text-slate-300"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            aria-label="Previous month"
          >
            <FaChevronLeft />
          </button>
          <h3 className="text-lg font-bold text-slate-900">
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          <button
            type="button"
            onClick={nextMonth}
            className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100"
            aria-label="Next month"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="mb-2 grid grid-cols-7">
          {DAYS.map((d) => (
            <div
              key={d}
              className="py-1 text-center text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((day, i) =>
            day === null ? (
              <div key={`empty-${i}`} />
            ) : (
              <button
                key={day}
                type="button"
                onClick={() => handleDayClick(day)}
                disabled={isPast(day)}
                className={`relative h-10 rounded-xl text-sm font-semibold transition ${
                  isPast(day)
                    ? "cursor-not-allowed text-slate-300"
                    : isSelected(day)
                      ? "bg-primary text-white shadow-md"
                      : isToday(day)
                        ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                        : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {day}
                {isToday(day) && !isSelected(day) && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
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
