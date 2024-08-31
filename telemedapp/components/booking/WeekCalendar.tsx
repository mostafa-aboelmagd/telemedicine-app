// WeekCalendar.tsx

import React, { useState, useEffect } from "react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

interface WeekCalendarProps {
  availableDates: { date: string; slots: string[] }[];
  handleDateSelect: (date: { date: string; slots: string[] }) => void;
  selectedDate: { date: string; slots: string[] } | null;
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({
  availableDates,
  handleDateSelect,
  selectedDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [datesWithSlots, setDatesWithSlots] = useState<
    { date: string; slots: string[] }[]
  >([]);

  useEffect(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 });
    const end = endOfWeek(currentDate, { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start, end });

    const updatedDatesWithSlots = days.map((day) => {
      const dayNumber = format(day, "d");
      const existingDate = availableDates.find((d) => d.date === dayNumber);
      return {
        date: dayNumber,
        slots: existingDate ? existingDate.slots : [], // Use empty slots if none exist
      };
    });

    setDatesWithSlots(updatedDatesWithSlots);
  }, [currentDate, availableDates]);

  const handlePreviousWeek = () => {
    setCurrentDate((prev) => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => addDays(prev, 7));
  };

  return (
    <div className="flex flex-col items-start gap-2 mb-4">
      <div className="flex flex-row gap-4 lg:gap-8 mb-4">
        <h3 className="text-lg font-bold">Select date:</h3>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handlePreviousWeek}
            className="px-3 py-1 bg-gray-200 rounded-full text-gray-700"
          >
            {"<"}
          </button>
          <span className="text-xl font-semibold">
            {format(startOfWeek(currentDate, { weekStartsOn: 0 }), "MMM d")} -{" "}
            {format(endOfWeek(currentDate, { weekStartsOn: 0 }), "MMM d")}
          </span>
          <button
            onClick={handleNextWeek}
            className="px-3 py-1 bg-gray-200 rounded-full text-gray-700"
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {datesWithSlots.map(({ date, slots }) => (
          <button
            key={date}
            onClick={() => handleDateSelect({ date, slots })}
            className={`px-4 py-2 rounded-lg ${
              selectedDate?.date === date
                ? "bg-green-500 text-white"
                : slots.length > 0
                ? "bg-gray-300 text-gray-800"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {date} {/* Display the day number */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
