import React from "react";

interface BookingSummaryProps {
  selectedSlot: string | null;
  selectedDuration: number;
  doctor: {
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
}) => (
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
      disabled={!selectedSlot}
      onClick={() =>
        alert(`Booked ${selectedDuration} min session at ${selectedSlot}`)
      }
    >
      Book Now {selectedDuration === 60 ? doctor.fees60min : doctor.fees30min}{" "}
      EGP
    </button>
  </div>
);

export default BookingSummary;
