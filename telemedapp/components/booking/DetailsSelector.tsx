import React from "react";

interface DetailsSelectorProps {
  selectedDuration: number;
  handleDurationChange: (duration: number) => void;
  appointmentType: string;
  setAppointmentType: (type: string) => void;
}

const DetailsSelector: React.FC<DetailsSelectorProps> = ({
  selectedDuration,
  handleDurationChange,
  appointmentType,
  setAppointmentType,
}) => (
  <div className="bg-white rounded-3xl shadow-md p-6 w-full">
    <h3 className="text-xl font-semibold mb-4">Select session duration:</h3>
    <div className="flex items-center space-x-4">
      <label className="flex items-center">
        <input
          type="radio"
          name="duration"
          value={60}
          checked={selectedDuration === 60}
          onChange={() => handleDurationChange(60)}
          className="mr-2"
        />
        60 Min
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="duration"
          value={30}
          checked={selectedDuration === 30}
          onChange={() => handleDurationChange(30)}
          className="mr-2"
        />
        30 Min
      </label>
    </div>
    <div className="flex items-center space-x-4">
      <label className="flex items-center">
        <input
          type="radio"
          name="type"
          value="Remote"
          checked={appointmentType === "Remote"}
          onChange={() => setAppointmentType("Remote")}
          className="mr-2"
        />
        Onsite
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="type"
          value="Onsite"
          checked={appointmentType === "Onsite"}
          onChange={() => setAppointmentType("Onsite")}
          className="mr-2"
        />
        Remote
      </label>
    </div>
  </div>
);

export default DetailsSelector;
