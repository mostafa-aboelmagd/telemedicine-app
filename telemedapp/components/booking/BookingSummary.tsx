import React, { useState } from "react";

interface BookingSummaryProps {
  selectedSlot: string | null;
  selectedDuration: number;
  doctor: {
    id: number;
    fees60min: number;
    fees30min: number;
  };
  selectedDate: { date: string; slots: string[] } | null;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedSlot,
  selectedDuration,
  doctor,
  selectedDate,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const patientId = localStorage.getItem("userId");

  // Handle booking API call
  const handleBooking = async () => {
    if (!selectedSlot || !selectedDate) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const token = localStorage.getItem("jwt");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/appointment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            doctor_id: doctor.id,
            patient_id: patientId,
            appointment_date_time: `${selectedDate.date} ${selectedSlot}`,
            appointment_duration: selectedDuration,
            appointment_type: selectedDuration === 60 ? "60min" : "30min",
            appointment_status: "pending", // You can change based on requirements
            appointment_location: "Online", // Assuming it's online, modify if needed
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }

      const data = await response.json();
      alert(
        `Appointment booked successfully with ID: ${data.appointment.appointment_id}`
      );
    } catch (error) {
      setErrorMessage("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-3xl shadow-md p-6 w-full">
      <div className="flex items-center justify-center">
        <div className="my-4 text-blue-600 font-bold ">
          {selectedSlot ? (
            <>
              <span className="px-4 py-2 rounded-lg bg-green-600 text-white">
                {selectedDate?.date} {selectedSlot}
              </span>{" "}
              Slot is selected
            </>
          ) : (
            "No slot selected"
          )}
        </div>
      </div>
      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        disabled={!selectedSlot || loading}
        onClick={handleBooking}
      >
        {loading
          ? "Booking..."
          : `Book Now ${
              doctor?.fees60min && doctor?.fees30min
                ? `for ${
                    selectedDuration === 60
                      ? `${doctor.fees60min} EGP`
                      : `${doctor.fees30min} EGP`
                  }`
                : ""
            } EGP`}
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default BookingSummary;
