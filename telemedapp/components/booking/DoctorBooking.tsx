"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DoctorInfo from "@/components/booking/DoctorInfo";
import DetailsSelector from "@/components/booking/DetailsSelector";
import BookingSummary from "@/components/booking/BookingSummary";
import SlotSelector from "@/components/booking/SlotSelector";
import WeekCalendar from "@/components/booking/WeekCalendar";
import { formatDoctorAvailabilities } from "@/utils/formatDoctorAvailabilities";

const DoctorBooking = () => {
  const searchParams = useSearchParams();
  const [doctor, setDoctor] = useState<any>(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("timeSlot test");
  const [availableDates, setAvailableDates] = useState<any[]>([]);
  const [appointmentState, setAppointmentState] = useState("First_time");
  const [appointments, setAppointments] = useState<any[]>([]);

  // Retrieve the doctor data from the query parameters
  useEffect(() => {
    const doctorParam = searchParams.get("doctor");

    if (doctorParam) {
      try {
        const parsedDoctor = JSON.parse(decodeURIComponent(doctorParam));
        setDoctor(parsedDoctor);
      } catch (error) {
        console.error("Error parsing doctor parameter:", error);
      }
    }
  }, [searchParams]);

  // Fetch doctor availability
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    const fetchDoctorAvailability = async () => {
      if (doctor?.id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/appointment/Availabilities/${doctor.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch availability");

          const data = await response.json();
          const formattedDates = formatDoctorAvailabilities(data);
          setAvailableDates(formattedDates);
        } catch (error) {
          console.error("Error fetching availability:", error);
        }
      }
    };

    if (doctor) fetchDoctorAvailability();
  }, [doctor]);

  // Fetch patient appointments
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/profile/appointments`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleDurationChange = (duration: number) =>
    setSelectedDuration(duration);

  const handleDateSelect = (dateObj: {
    date: string;
    slots: { time: string; type: string }[];
  }) => setSelectedDate(dateObj);

  const handleSlotSelect = (slot: string) => setSelectedSlot(slot);

  if (!doctor) {
    return <div className="mx-10 text-xl">Loading doctor data...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-center p-6 bg-gray-50 gap-4 mx-auto max-w-[1200px]">
      <div className="flex flex-col p-6 bg-gray-50 gap-5 min-w-[350px] md:min-w-[450px] md:h-[500px]">
        <DoctorInfo doctor={doctor} />
        <DetailsSelector
          selectedDuration={selectedDuration}
          handleDurationChange={handleDurationChange}
          appointmentState={appointmentState}
          setAppointmentState={setAppointmentState}
          appointments={appointments}
        />
        <BookingSummary
          selectedSlot={selectedSlot}
          selectedDuration={selectedDuration}
          doctor={doctor}
          selectedDate={selectedDate}
          appointmentState={appointmentState}
        />
      </div>

      <div className="flex gap-8 flex-col bg-white rounded-3xl shadow-md p-6 min-w-[350px] lg:min-w-[650px] md:h-[450px]">
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
      </div>
    </div>
  );
};

export default DoctorBooking;
