import React, { useEffect, useState } from "react";
import stylesButton from "../navbarComp/navbar.module.css";
import { FaUserCircle } from "react-icons/fa";
import { formatDate } from "../../utils/date";
import Link from "next/link";

const AppointmentCard = ({
  appointment,
  profileData,
}: {
  appointment: any;
  profileData: any;
}) => {
  const userImage = <FaUserCircle className="h-20 w-20 text-[#035fe9]" />;
  const [confirmed, setConfirmed] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const [userRole, setUserRole] = useState<any>();
  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, []);

  if (deleted) {
    // Don't render the component if it's deleted
    return null;
  }

  return (
    <div className="bg-white rounded-3xl md:p-6 p-4 shadow-lg flex flex-col md:space-y-3 space-y-2">
      {/* Doctor/Patient Information */}
      <div className="flex items-center md:space-x-4 space-x-2">
        {userImage}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">
            {`${appointment.patient_first_name} ${appointment.patient_last_name}`}
          </h2>
          <p className="text-sm text-[#035fe9]">
            {appointment.doctor_specialization || "Specialist"}
          </p>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="flex flex-col space-y-2">
        <div className="text-sm text-gray-600">
          <p>
            <strong>Duration:</strong> {appointment.appointment_duration} mins
          </p>
          <p>
            <strong>Type:</strong> {appointment.appointment_type || "N/A"}
          </p>
          <p>
            <strong>Date & Time:</strong>{" "}
            {appointment.created_at && formatDate(appointment.created_at)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row justify-between gap-4">
        {!confirmed ? (
          <>
            {/* Confirm Button */}
            <button
              className="md:text-sm text-xs font-medium text-white bg-[#60A899] py-2 px-4 rounded-lg hover:bg-[#4b8377] w-full"
              onClick={() => setConfirmed(true)}
            >
              Confirm
            </button>
            {/* Cancel Button */}
            <button
              className="md:text-sm text-xs font-medium text-white py-2 px-4 rounded-lg bg-red-600 hover:bg-red-800 w-full"
              onClick={() => setDeleted(true)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {/* My Documents Button */}
            <Link
              href={`/doctorProfile/documentsList/${appointment.appointment_id}`}
              className="md:w-1/2"
            >
              <button className="md:text-sm text-xs font-medium text-white bg-[#60A899] py-2 px-4 rounded-lg hover:bg-[#4b8377] w-full">
                My Documents
              </button>
            </Link>
            {/* My Appointments Button */}
            <Link
              href={`/doctorProfile/prescriptions/${appointment.appointment_id}`}
              className="md:w-1/2"
            >
              <button
                className={`${stylesButton.gradient_button} md:text-sm text-xs font-medium text-white py-2 px-4 rounded-lg w-full`}
              >
                My Appointments
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
