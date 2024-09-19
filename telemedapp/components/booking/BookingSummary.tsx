import React, { useState, useRef } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { Toast } from "primereact/toast";
interface BookingSummaryProps {
  selectedSlot: string | null;
  selectedDuration: number;
  doctor: {
    id: number;
    fees60min: number;
    fees30min: number;
  };
  selectedDate: {
    date: string;
    slots: { id: number; time: string }[];
  };
  appointmentType: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedSlot,
  selectedDuration,
  doctor,
  selectedDate,
  appointmentType,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const patientId = localStorage.getItem("userId");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  // Reference for Toast
  const toast = useRef<any>(null);

  const cancelCreate = () => {
    setShowConfirmDialog(false);
  };

  const bookAppointment = () => {
    if (!selectedSlot || !selectedDate) return;
    setLoading(true);
    setTimeout(() => {
      setShowConfirmDialog(true);
      setLoading(false);
    }, 1000);
  };
  const confirmCreate = async () => {
    if (!selectedSlot || !selectedDate) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const token = localStorage.getItem("jwt");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/appointment/book`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointmentDuration: selectedDuration,
            availabilityId: selectedDate.slots.find(
              (slot) => slot.time === selectedSlot
            )?.id,
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

  return (
    <div className="flex flex-col gap-4 bg-white rounded-3xl shadow-md p-6 w-full">
      <Toast ref={toast} />
      <div className="flex items-center justify-center">
        <div className="my-4 text-blue-600 font-bold ">
          {selectedSlot ? (
            <>
              <span className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white">
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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        disabled={!selectedSlot || loading}
        onClick={() => bookAppointment()}
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
            } `}
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <ConfirmDialog
        visible={showConfirmDialog}
        onConfirm={confirmCreate}
        onCancel={cancelCreate}
        loading={loading}
      />
    </div>
  );
};

export default BookingSummary;
