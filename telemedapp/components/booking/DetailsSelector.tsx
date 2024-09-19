import React from "react";

interface DetailsSelectorProps {
  selectedDuration: number;
  handleDurationChange: (duration: number) => void;
  appointmentState: string;
  setAppointmentState: (state: string) => void;
}

const DetailsSelector: React.FC<DetailsSelectorProps> = ({
  selectedDuration,
  handleDurationChange,
  appointmentState,
  setAppointmentState,
}) => (
  <div className="bg-white rounded-3xl shadow-md p-6 w-full">
    <h3 className="text-xl font-semibold mb-4">Select session details:</h3>

    <div className="flex flex-row items-center  gap-6">
      <div className="flex flex-col items-center">
        <label className="flex items-center">
          <input
            type="radio"
            name="duration"
            value={60}
            checked={selectedDuration === 60}
            onChange={() => handleDurationChange(60)}
          />

          <span className="ml-2">60 Min</span>
        </label>
        <label className=" flex items-center">
          <input
            type="radio"
            name="duration"
            value={30}
            checked={selectedDuration === 30}
            onChange={() => handleDurationChange(30)}
          />
          <span className="ml-2">30 Min</span>
        </label>
      </div>
      <div className="flex items-center flex-col">
        <label className="flex items-center">
          <input
            type="radio"
            name="type"
            value="first-time"
            checked={appointmentState === "first-time"}
            onChange={() => setAppointmentState("first-time")}
          />

          <span className="ml-2">First time</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="type"
            value="follow-up"
            checked={appointmentState === "follow-up"}
            onChange={() => setAppointmentState("follow-up")}
          />

          <span className="ml-2">Follow up</span>
        </label>
      </div>
    </div>
  </div>
);

export default DetailsSelector;
