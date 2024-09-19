"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import DoctorInfo from "@/components/booking/DoctorInfo";
import DetailsSelector from "@/components/booking/DetailsSelector";
import BookingSummary from "@/components/booking/BookingSummary";
import SlotSelector from "@/components/booking/SlotSelector";
import WeekCalendar from "@/components/booking/WeekCalendar";
import { FaUserCircle } from "react-icons/fa";
import { formatDoctorAvailabilities } from "@/utils/formatDoctorAvailabilities";
import { Toast } from "primereact/toast";
import ConfirmDialog from "./ConfirmDialog"; // Import the external component

const userImage = <FaUserCircle className="h-10 w-10 text-[#035fe9]" />;

const DoctorBooking = () => {
  const searchParams = useSearchParams();
  const [doctor, setDoctor] = useState<any>(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<any[]>([]);
  const [appointmentType, setAppointmentType] = useState("Remote");
  const [appointmentState, setAppointmentState] = useState("first-time");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  // Reference for Toast
  const toast = useRef<any>(null);

  const cancelCreate = () => {
    setShowConfirmDialog(false);
  };

  const confirmCreate = async () => {
    setLoading(true); // Show loading state when confirming
    try {
      // Simulate the appointment creation process (replace with actual logic)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/appointment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({
            doctorId: doctor?.id,
            date: selectedDate,
            slot: selectedSlot,
            type: appointmentType,
            duration: selectedDuration,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }

      // Close the dialog and show success message
      setShowConfirmDialog(false);
      toast.current.show({
        severity: "success",
        detail: `Appointment booked successfully!`,
        life: 3000,
        className:
          "bg-green-600 ml-2 text-white font-semibold rounded-lg shadow-lg p-3",
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        detail: `Failed to book appointment: ${error}`,
        life: 3000,
        className:
          "bg-red-600 ml-2 text-white font-semibold rounded-lg shadow-lg p-3",
      });
    } finally {
      setLoading(false); // Stop loading state
    }
  };

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

  useEffect(() => {
    let token = localStorage.getItem("jwt");

    const fetchDoctorAvailability = async () => {
      if (doctor && doctor.id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/appointment/Availabilities/${doctor.id}`,
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
          const formattedDates = formatDoctorAvailabilities(data);
          setAvailableDates(formattedDates);
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

  const handleDateSelect = (dateObj: {
    date: string;
    slots: { time: string; id: number; type: string }[];
  }) => {
    setSelectedDate(dateObj);
    setSelectedSlot(null); // Reset the selected slot when the date changes
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

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
        />
        <BookingSummary
          selectedSlot={selectedSlot}
          selectedDuration={selectedDuration}
          doctor={doctor}
          selectedDate={selectedDate}
          appointmentType={appointmentType}
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
