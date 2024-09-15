"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DoctorInfo from "@/components/booking/DoctorInfo";
import DurationSelector from "@/components/booking/DurationSelector";
import BookingSummary from "@/components/booking/BookingSummary";
import SlotSelector from "@/components/booking/SlotSelector";
import WeekCalendar from "@/components/booking/WeekCalendar";

const initialDoctor = {
  image: "/assets/doctorM.jpg",
  name: "Mahmoud Mansy",
  title: "Psychologist",
  rating: 4.7,
  numReviews: 1144,
  fees60min: 200,
  fees30min: 100,
  availableDates: [
    { date: "2024-09-01", slots: ["02:00 PM", "03:00 PM", "04:00 PM"] },
    { date: "2024-09-02", slots: ["01:00 PM", "02:00 PM", "03:00 PM"] },
    { date: "2024-09-03", slots: ["02:00 PM", "03:00 PM", "04:00 PM"] },
    { date: "2024-09-04", slots: ["01:00 PM", "02:00 PM", "03:00 PM"] },
    { date: "2024-09-05", slots: ["02:00 PM", "03:00 PM", "04:00 PM"] },
    { date: "2024-09-06", slots: ["01:00 PM", "02:00 PM", "03:00 PM"] },
    { date: "2024-09-07", slots: ["02:00 PM", "03:00 PM", "04:00 PM"] },
    { date: "2024-09-08", slots: ["01:00 PM", "02:00 PM", "03:00 PM"] },
    { date: "2024-09-09", slots: ["02:00 PM", "03:00 PM", "04:00 PM"] },
    { date: "2024-09-10", slots: ["01:00 PM", "02:00 PM", "03:00 PM"] },
    {
      date: "2024-09-11",
      slots: ["02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"],
    },
  ],
};

const DoctorBooking = () => {
  const searchParams = useSearchParams();
  const [doctor, setDoctor] = useState<any>(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Retrieve the doctor data from the query parameters
  useEffect(() => {
    const doctorParam = searchParams.get("doctor");
    if (doctorParam) {
      // const doctorData = JSON.parse(decodeURIComponent(doctorParam));
      const doctorData = JSON.parse(doctorParam) || initialDoctor;

      // Ensure that availableDates exists and is an array before setting selectedDate
      if (doctorData.availableDates && doctorData.availableDates.length > 0) {
        setSelectedDate(doctorData.availableDates[0]); // Set initial selected date
      } else {
        setSelectedDate(null); // Handle case where there are no available dates
      }

      setDoctor(doctorData);
      console.log("Doctor: ", doctor);
    }
  }, [searchParams]);

  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
  };

  const handleDateSelect = (dateObj: { date: string; slots: string[] }) => {
    setSelectedDate(dateObj);
    setSelectedSlot(null); // Reset the selected slot when the date changes
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

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
      <div className="flex gap-8 flex-col bg-white rounded-3xl shadow-md p-6 min-w-[350px] lg:min-w-[650px]">
        <WeekCalendar
          selectedDate={selectedDate}
          handleDateSelect={handleDateSelect}
          availableDates={doctor.availableDates || initialDoctor.availableDates}
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
