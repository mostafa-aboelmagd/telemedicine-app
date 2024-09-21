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

  const [userRole, setUserRole] = useState<any>();
  const selectedDate = { date: "2024-09-10" };
  const selectedSlot = "09:00";
  const appointmentData = {
    appointment_date_time: `${selectedDate.date} ${selectedSlot}`,
    appointment_duration: appointment.appointment_duration || "30 minutes",
    appointment_type: appointment.appointment_type ? "Remote" : "Remote",
  };

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, [userRole]);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg flex flex-col space-y-3">
      {/* Doctor Information */}
      {userRole === "Patient" ? (
        <div className="flex items-center space-x-4">
          {userImage}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">
              {` ${appointment.patient_first_name} ${appointment.patient_last_name}`}
            </h2>
            <p className="text-sm text-[#035fe9]">
              {appointment.doctor_specialization || "Specialist"}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          {userImage}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">
              {` ${appointment.patient_first_name} ${appointment.patient_last_name}`}
            </h2>
            <p className="text-sm text-[#035fe9]">
              {appointment.doctor_specialization || "Specialist"}
            </p>
          </div>
        </div>
      )}

      {/* Appointment Details */}
      <div className="flex flex-col space-y-2">
        <div className="text-sm text-gray-600">
          {/* {profileFields && ( */}
          <p>
            {/* <strong>
              Patient:
              {` ${appointment.patient_first_name} ${appointment.patient_last_name}`}
            </strong> */}
            {/* {profileFields} */}
          </p>
          {/* )} */}
          <p className="flex flex-row justify-start gap-4 items-center ">
            <p>
              <strong>Duration:</strong> {appointment.appointment_duration}
            </p>
            <p>
              <strong>Type:</strong> {appointment.appointment_type}
            </p>
          </p>
          <p>
            <strong>Date & Time:</strong>{" "}
            {/* {appointmentData.appointment_date_time} */}
            {appointment.created_at && formatDate(appointment.created_at)}
          </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between space-x-4">
        <Link
          href={`/doctorProfile/documentsList/${appointment.appointment_id}`}
          className="text-blue-500 font-bold ml-7 w-1/2"
        >
          <button
            className={`text-sm font-medium text-white bg-[#60A899] py-2 px-4 rounded-lg hover:bg-[#4b8377] w-full`}
          >
            My Documents
          </button>
        </Link>
        <Link
          href={`/doctorProfile/prescriptions/${appointment.appointment_id}`}
          className="text-blue-500 font-bold ml-7 w-1/2"
        >
          <button
            className={`${stylesButton.gradient_button} text-sm font-medium text-white py-2 px-4 rounded-lg w-full`}
          >
            My Appointments
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AppointmentCard;
