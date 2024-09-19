import React from "react";

interface SlotSelectorProps {
  selectedDate: {
    date: string;
    slots: { time: string; id: number; type: string }[];
  } | null;
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
      <h3 className="text-sm md:text-xl font-semibold">Select time slots:</h3>
      <div className="text-blue-600 font-bold text-xs md:text-base">
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
          <div className="flex flex-col gap-1">
            <button
              key={slot.id}
              onClick={() => handleSlotSelect(slot.time)}
              className={`p-3 rounded-lg border ${
                selectedSlot === slot.time
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              {slot.time}
            </button>
            <p
              className={`text-xs text-center font-semibold italic  ${
                selectedSlot === slot.time ? "text-green-600" : "text-gray-800"
              }`}
            >
              {slot.type && slot.type}
            </p>
          </div>
        ))
      ) : (
        <p className="text-red-500 mt-6 text-xs md:text-base italic">
          No time slots available on this day, Try another day.
        </p>
      )}
    </div>
  </div>
);

export default SlotSelector;
