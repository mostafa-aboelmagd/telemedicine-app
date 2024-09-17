"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DoctorInfo from "@/components/booking/DoctorInfo";
import DurationSelector from "@/components/booking/DurationSelector";
import BookingSummary from "@/components/booking/BookingSummary";
import SlotSelector from "@/components/booking/SlotSelector";
import WeekCalendar from "@/components/booking/WeekCalendar";
import { FaUserCircle } from "react-icons/fa";

const userImage = <FaUserCircle className="h-10 w-10 text-[#035fe9]" />;

const DoctorBooking = () => {
  const searchParams = useSearchParams();
  const [doctor, setDoctor] = useState<any>(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<any[]>([]);

  // Retrieve the doctor data from the query parameters
  useEffect(() => {
    const doctorParam = searchParams.get("doctor");

    if (doctorParam) {
      try {
        const parsedDoctor = JSON.parse(decodeURIComponent(doctorParam)); // Decode and parse doctor object
        console.log("Parsed Doctor: ", parsedDoctor);

        setDoctor(parsedDoctor);
      } catch (error) {
        console.error("Error parsing doctor parameter:", error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    let token = localStorage.getItem("jwt");

    const fetchDoctorAvailability = async () => {
      if (doctor && doctor.id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/appointment/Availabilities/${doctor.id}
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch doctor availability");
          }

          const data = await response.json();
          console.log(data);
          setAvailableDates(data.availableDates);
        } catch (error) {
          console.error("Error fetching doctor availability", error);
        }
      }
    };

    if (doctor) {
      fetchDoctorAvailability();
    }
  }, [doctor]);

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
    return <div>Loading doctor data...</div>;
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
          availableDates={availableDates}
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
