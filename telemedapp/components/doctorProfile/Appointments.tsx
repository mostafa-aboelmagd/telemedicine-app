"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import AppointmentsGrid from "./AppointmentsGrid";

const Appointments = () => {
  const userImage = <FaUserCircle className="h-32 w-32 text-[#035fe9]" />;
  const [profileData, setProfileData] = useState({
    firstName: "D",
    lastName: "r",
    phone: "",
    email: "",
    gender: "",
    birthYear: "",
    residenceCountry: "",
    specialization: "",
    languages: "",
    thirtyMinPrice: "",
    sixtyMinPrice: "",
  });

  const [appointments, setAppointments] = useState([]);

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
      fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/profile/info`, {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((response) => setProfileData(() => response.formattedDoctor));
    }
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("jwt");
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/profile/appointments`,
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
      .then((response) => {
        if (response.length > 0) {
          setAppointments(response);
        } else {
          setAppointments([]); // Set to an empty array if there are no appointments
        }
      })
      .catch((error) => {
        console.error("Error fetching appointments: ", error);
        setAppointments([]); // Handle error by setting an empty array
      });
  }, []);

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      <div className="flex flex-col gap-4">
        <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
          {userImage}
          <p className="text-blue-500 mb-1 font-semibold">{`${
            profileData && profileData?.firstName && profileData.firstName
          } ${profileData?.lastName || ""}`}</p>
          <div className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 fill-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
              />
            </svg>
            <p>Wallet</p>
            <p className="text-green-500">(0)</p>
          </div>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          onClick={() => (window.location.href = "/doctorProfile/appointments")}
        >
          My Appointments
        </button>
      </div>

      <div className="flex flex-col max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
        <div className="flex-initial m-5 bg-white rounded-xl relative ">
          <div className="flex pt-4 mb-3 justify-between gap-2">
            <Link href="/" className="font-bold ml-7">
              Personal Info
            </Link>
            <Link href="/doctorProfile/timeSlots" className="font-bold">
              Time Slots
            </Link>
            <Link href="/doctorProfile/requests" className="font-bold mr-7">
              Pending Requests
            </Link>
          </div>
          <div className="flex">
            <hr className="bg-neutral-800 border-none h-0.5 w-1/3"></hr>
            <hr className="bg-neutral-800 border-none h-0.5 w-1/3"></hr>
            <hr className="bg-neutral-800 border-none h-0.5 w-1/3"></hr>
          </div>
        </div>
        <div className="flex flex-col m-4">
          {appointments?.length > 0 ? (
            <AppointmentsGrid
              appointments={appointments}
              profileData={profileData}
            />
          ) : (
            <div className="mx-10 text-xl">No appointments available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
