import React, { useState } from "react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

interface WeekCalendarProps {
  availableDates: { date: string; slots: string[] }[];
  handleDateSelect: (date: string) => void;
  selectedDate: { date: string; slots: string[] } | null;
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({
  availableDates,
  handleDateSelect,
  selectedDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const start = startOfWeek(currentDate, { weekStartsOn: 0 }); // Week starts on Sunday
  const end = endOfWeek(currentDate, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start, end });

  const handlePreviousWeek = () => {
    setCurrentDate((prev) => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => addDays(prev, 7));
  };

  return (
    <div className="flex flex-col items-start gap-2 mb-4">
      <div className="flex flex-row gap-4 lg:gap-8 mb-4">
        <h3 className=" text-lg font-bold">Select date:</h3>

        <div className="flex items-center  gap-2">
          <button
            onClick={handlePreviousWeek}
            className="px-3 py-1 bg-gray-200 rounded-full text-gray-700"
          >
            {"<"}
          </button>
          <span className="text-xl font-semibold">
            {format(start, "MMM d")} - {format(end, "MMM d")}
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
        {days.map((day) => {
          const dateStr = format(day, "EEE d");
          const isAvailable = availableDates.some((d) => d.date === dateStr);
          return (
            <button
              key={dateStr}
              onClick={() => handleDateSelect(dateStr)}
              // onClick={() => isAvailable && handleDateSelect(dateStr)}
              className={`px-4 py-2 rounded-lg ${
                selectedDate?.date === dateStr
                  ? "bg-green-500 text-white"
                  : isAvailable
                  ? "bg-gray-200 text-gray-800"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendar;
