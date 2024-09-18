import React from "react";
import AppointmentCard from "./AppointmentCard";

const AppointmentsGrid = ({
  doctors,
  profileFields,
}: {
  doctors: any[];
  profileFields: any;
}) => {
  let doctorList = doctors.map((doctor) => {
    return (
      <AppointmentCard
        doctor={doctor}
        key={doctor.id}
        profileFields={profileFields}
      />
    );
  });
  return (
    <div className="col-span-2 overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">{doctorList}</div>
    </div>
  );
};

export default AppointmentsGrid;
