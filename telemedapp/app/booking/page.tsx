"use client";
import React, { useState } from "react";
import DoctorInfo from "@/components/booking/DoctorInfo";
import DurationSelector from "@/components/booking/DurationSelector";
import BookingSummary from "@/components/booking/BookingSummary";
import DateSelector from "@/components/booking/DateSelector";
import SlotSelector from "@/components/booking/SlotSelector";
import WeekCalendar from "@/components/booking/WeekCalendar";

const DoctorBooking: React.FC = () => {
  const doctor = {
    image: "/assets/doctorM.jpg",
    name: "Fouad Mohamed",
    title: "Psychologist",
    rating: 4.7,
    numReviews: 1144,
    fees60min: 200,
    fees30min: 100,
    availableDates: [
      {
        date: "Sun 01",
        slots: ["02:00 PM", "03:00 PM", "04:00 PM"],
      },
      {
        date: "Mon 02",
        slots: ["01:00 PM", "02:00 PM", "03:00 PM"],
      },
      {
        date: "Tue 03",
        slots: ["01:00 PM", "03:00 PM"],
      },
      {
        date: "Wed 04",
        slots: [],
      },
      {
        date: "Thu 05",
        slots: ["01:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"],
      },
      {
        date: "Fri 06",
        slots: ["10:00 AM", "11:00 AM", "12:00 PM"],
      },
      {
        date: "Sat 07",
        slots: ["02:00 PM", "03:00 PM"],
      },
    ],
  };

  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedDate, setSelectedDate] = useState(doctor.availableDates[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
  };

  const handleDateSelect = (date: string) => {
    const newDate = doctor.availableDates.find((d) => d.date === date);
    setSelectedDate(newDate || doctor.availableDates[0]);
    setSelectedSlot(null); // Reset the selected slot when the date changes
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-center p-6 bg-gray-50 gap-4 mx-auto max-w-[1200px]">
      <div className="flex flex-col p-6 bg-gray-50 gap-10 min-w-[350px] md:min-w-[450px]">
        <DoctorInfo doctor={doctor} />
        <DurationSelector
          selectedDuration={selectedDuration}
          handleDurationChange={handleDurationChange}
        />
        <BookingSummary
          selectedSlot={selectedSlot}
          selectedDuration={selectedDuration}
          doctor={doctor}
          selectedDate={selectedDate}
        />
      </div>
      <div className="flex gap-8 flex-col bg-white rounded-3xl shadow-md p-6 min-w-[350px] md:min-w-[450px]">
        <DateSelector
          selectedDate={selectedDate}
          handleDateSelect={handleDateSelect}
          availableDates={doctor.availableDates}
        />
        <SlotSelector
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          handleSlotSelect={handleSlotSelect}
        />
        <div className="flex items-center justify-center mt-2 space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
            <span>Selected</span>
          </div>
        </div>
        <hr className="my-2 border-gray-200" />
        <p className="flex items-center justify-center text-sm text-gray-500">
          *Note: The available slots are based on your local timezone.
        </p>
      </div>
    </div>
  );
};

export default DoctorBooking;
