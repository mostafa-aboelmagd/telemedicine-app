"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import AppointmentsGrid from "../AppointmentsGrid";

const Appointments: React.FC = () => {
  const userImage = <FaUserCircle className="h-32 w-32 text-[#035fe9]" />;

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    birthYear: "",
    languages: "",
  });

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      window.location.href = "/auth/signin";
    } else if (
      Math.floor(new Date().getTime() / 1000) >
      Number(localStorage.getItem("expiryDate"))
    ) {
      localStorage.clear();
      window.location.href = "/auth/signin";
    } else {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/profile/info`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => setProfileData(response.formattedPatient))
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/appointment/appointmentsHistory`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) =>
        setAppointments(response?.appointments || ["No Appointment History"])
      );
  }, []);
  console.log("Appointments: ", appointments);

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      <div>
        <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
          {userImage}
          <p className="text-blue-500 mb-1 font-semibold">{`${
            profileData.firstName ? profileData.firstName : "Loading..."
          } ${profileData.lastName && profileData.lastName}`}</p>
          <div className="flex gap-1">
            <p>Wallet</p>
            <p className="text-green-500">(0)</p>
          </div>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          onClick={() => (window.location.href = "/patientProfile/view")}
        >
          Profile Information
        </button>
      </div>

      <div className="flex flex-col max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
        <div className="flex-initial m-5 bg-white rounded-xl relative ">
          <div className="flex pt-4 mb-3">
            <Link
              href="/patientProfile/upcoming_appointments"
              className="font-bold ml-7 w-1/2"
            >
              Upcoming Appointments
            </Link>
            <Link
              href="/patientProfile/appointments_history"
              className="font-bold ml-7 mr-7 md:mr-0 w-1/2"
            >
              Appointments History
            </Link>
          </div>
          <div className="flex">
            <hr className="bg-neutral-800 border-none h-0.5 w-1/2"></hr>
            <hr className="bg-blue-500 border-none h-0.5 w-1/2"></hr>
          </div>
        </div>
        <div className="flex flex-col m-4">
          {appointments?.length > 0 ? (
            <AppointmentsGrid
              appointments={appointments}
              profileData={profileData}
            />
          ) : (
            <div className="mx-10 text-xl">
              {loading ? "Loading..." : "No Upcoming Appointments Available"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
