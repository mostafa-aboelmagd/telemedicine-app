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
      const dateStr = format(day, "yyyy-MM-dd");
      const existingDate = availableDates.find((d) => d.date === dateStr);
      return {
        date: dateStr,
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
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex flex-row  items-center  mb-4">
        <h3 className="text-lg font-bold">Select date:</h3>

        <div className="mx-auto">
          <button
            onClick={handlePreviousWeek}
            className=" px-3 py-1 bg-gray-200 rounded-full text-gray-700"
          >
            {"<"}
          </button>
          <span className="mx-2 text-xl font-semibold">
            {format(startOfWeek(currentDate, { weekStartsOn: 0 }), "MMM d")} -{" "}
            {format(endOfWeek(currentDate, { weekStartsOn: 0 }), "MMM d")}
          </span>
          <button
            onClick={handleNextWeek}
            className=" px-3 py-1 bg-gray-200 rounded-full text-gray-700"
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-7 grid-cols-4 gap-2 lg:text-[14px] text-sm">
        {datesWithSlots.map(({ date, slots }) => (
          <button
            key={date}
            onClick={() => handleDateSelect({ date, slots })}
            className={`px-4 py-2 rounded-lg ${
              selectedDate?.date === date
                ? "bg-green-500 text-white"
                : slots.length > 0
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {format(new Date(date), "EEE d")} {/* Display the day and number */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
