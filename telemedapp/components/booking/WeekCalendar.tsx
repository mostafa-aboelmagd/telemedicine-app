import React, { useState, useEffect } from "react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

interface WeekCalendarProps {
  availableDates: { date: string; slots: { time: string; type: string }[] }[];
  handleDateSelect: (date: {
    date: string;
    slots: { time: string; type: string }[];
  }) => void;
  selectedDate: {
    date: string;
    slots: { time: string; type: string }[];
  } | null;
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({
  availableDates,
  handleDateSelect,
  selectedDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [datesWithSlots, setDatesWithSlots] = useState<
    { date: string; slots: { time: string; type: string }[] }[]
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
        slots: existingDate
          ? existingDate.slots.map((slot) => ({ ...slot, id: slot.time }))
          : [],
      };
    });

    setDatesWithSlots(updatedDatesWithSlots);
  }, [currentDate, availableDates]);

  const handlePreviousWeek = () => setCurrentDate((prev) => addDays(prev, -7));
  const handleNextWeek = () => setCurrentDate((prev) => addDays(prev, 7));

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex flex-row items-center mb-4">
        <h3 className="text-sm md:text-lg font-bold">Select date:</h3>
        <div className="mx-auto flex justify-evenly items-center">
          <button
            onClick={handlePreviousWeek}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700"
          >
            {"<"}
          </button>
          <span className="mx-2 text-center font-semibold">
            {format(startOfWeek(currentDate, { weekStartsOn: 0 }), "MMM d")} -{" "}
            {format(endOfWeek(currentDate, { weekStartsOn: 0 }), "MMM d")}
          </span>
          <button
            onClick={handleNextWeek}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700"
          >
            {">"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 text-center">
        {datesWithSlots.map((dateObj) => (
          <button
            key={dateObj.date}
            className={`p-3 rounded-lg ${
              selectedDate?.date === dateObj.date
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-blue-100"
            }`}
            onClick={() => handleDateSelect(dateObj)}
          >
            {format(new Date(dateObj.date), "EEE d")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
