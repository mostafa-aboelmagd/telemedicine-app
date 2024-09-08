import React from "react";

interface SlotSelectorProps {
  selectedDate: { date: string; slots: string[] } | null;
  selectedSlot: string | null;
  handleSlotSelect: (slot: string) => void;
}

const SlotSelector: React.FC<SlotSelectorProps> = ({
  selectedDate,
  selectedSlot,
  handleSlotSelect,
}) => (
  <div className="flex gap-4 flex-col">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold">Select time slots:</h3>
      <div className="text-blue-600 font-bold">
        {selectedDate?.slots.length} available time slots
      </div>
    </div>
    <div
      className={`${
        selectedDate && selectedDate.slots?.length > 0
          ? "grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
          : "mx-auto text-center"
      }max-w-[450px]`}
    >
      {selectedDate && selectedDate.slots?.length > 0 ? (
        selectedDate?.slots.map((slot) => (
          <button
            key={slot}
            onClick={() => handleSlotSelect(slot)}
            className={`p-3 rounded-lg border ${
              slot === selectedSlot
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {slot}
          </button>
        ))
      ) : (
        <p className="text-red-500 mt-6">
          No time slots available on this day, Try another day.
        </p>
      )}
    </div>
  </div>
);

export default SlotSelector;
