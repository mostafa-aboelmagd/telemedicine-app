import React from "react";
import AppointmentCard from "./AppointmentCard";

const AppointmentsGrid = ({ doctors }: { doctors: any[] }) => {
  let doctorList = doctors.map((doctor) => {
    return <AppointmentCard doctor={doctor} key={doctor.id} />;
  });
  return (
    <div className="col-span-2 overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">{doctorList}</div>
    </div>
  );
};

export default AppointmentsGrid;
