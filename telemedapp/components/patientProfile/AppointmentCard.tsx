import React, { useEffect, useState } from "react";
import stylesButton from "../navbarComp/navbar.module.css";
import { FaUserCircle } from "react-icons/fa";
import { formatDate } from "../../utils/date";
const AppointmentCard = ({
  appointment,
  profileData,
}: {
  appointment: any;
  profileData: any;
}) => {
  const userImage = <FaUserCircle className="h-20 w-20 text-[#035fe9]" />;

  const [userRole, setUserRole] = useState<any>();

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, [userRole]);

  // Buffer to Base64 conversion for the doctor's image
  const bufferToBase64 = (buffer: number[]) => {
    const binary = String.fromCharCode.apply(null, buffer);
    return window.btoa(binary);
  };

  const base64Image = appointment.image
    ? `data:image/jpeg;base64,${bufferToBase64(appointment.image.data)}`
    : ""; // Placeholder for missing image

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg flex flex-col space-y-3">
      {/* Doctor Information */}
      {userRole === "Patient" ? (
        <div className="flex items-center space-x-4">
          {base64Image ? (
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={base64Image}
              alt="Doctor"
            />
          ) : (
            userImage
          )}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{` ${appointment.doctor_first_name} ${appointment.doctor_last_name}`}</h2>
            <p className="text-sm text-[#035fe9]">
              {appointment.doctor_specialization || "Specialist"}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          {userImage}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{` ${appointment.doctor_first_name} ${appointment.doctor_last_name}`}</h2>
            <p className="text-sm text-[#035fe9]">
              {appointment.doctor_specialization &&
                appointment.doctor_specialization}
            </p>
          </div>
        </div>
      )}

      {/* Appointment Details */}
      <div className="flex flex-col space-y-2">
        <div className="text-sm text-gray-600">
          {/* <strong>
            Dr:
            {` ${appointment.doctor_first_name} ${appointment.doctor_last_name}`}
          </strong> */}
          <p className="flex flex-row justify-start gap-4 items-center ">
            <p>
              <strong>Duration:</strong>{" "}
              {appointment.appointment_duration &&
                appointment.appointment_duration}
            </p>
            <p>
              <strong>Type:</strong>{" "}
              {appointment.appointment_type && appointment.appointment_type}
            </p>
          </p>
          <p>
            <strong>Date & Time:</strong>{" "}
            {appointment.appointment_date_time &&
              formatDate(appointment.appointment_date_time)}
          </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between space-x-4">
        <button
          className={`text-sm font-medium text-white bg-[#60A899] py-2 px-4 rounded-lg hover:bg-[#4b8377] w-full`}
        >
          My Documents
        </button>
        <button
          className={`${stylesButton.gradient_button} text-sm font-medium text-white py-2 px-4 rounded-lg w-full`}
        >
          My Appointments
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
