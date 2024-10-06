"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { FaUserCircle } from "react-icons/fa";
import AppointmentsGrid from "./AppointmentsGrid";

const Appointments = () => {
  const userImage = <FaUserCircle className="h-32 w-32 text-[#035fe9]" />;
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
  });

  const [loading, setLoading] = useState(true);
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
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/Doctor/profile/appointments`,
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
      })
      .finally(() => setLoading(false));
  }, [profileData]);

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 min-[880px]:flex-row min-[880px]:items-start">
      {loading ? (
        <CircularProgress className="absolute top-1/2" />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
              {userImage}
              <p className="text-blue-500 mb-1 font-semibold">
                Dr. {profileData.firstName} {profileData.lastName}
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              onClick={() => (window.location.href = "/doctorProfile/appointments")}
            >
              My Appointments
            </button>
          </div>
          <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 min-[880px]:basis-7/12 min-[880px]:max-w-full">
            <div className="flex pt-4 mb-3 justify-between gap-2">
              <Link href="/doctorProfile/view" className="text-blue-500 font-bold ml-7">
                Personal Info
              </Link>
              <Link
                href="/doctorProfile/timeSlots"
                className="font-bold"
              >
                Time Slots
              </Link>
              <Link
                href="/doctorProfile/requests"
                className="font-bold mr-7"
              >
                Pending Requests
              </Link>
            </div>
            <div className="flex">
              <hr className="bg-blue-500 border-none h-0.5 w-1/3"></hr>
              <hr className="bg-neutral-800 border-none h-0.5 w-1/3"></hr>
              <hr className="bg-neutral-800 border-none h-0.5 w-1/3"></hr>
            </div>
            <div className="flex flex-col m-4 p-7">
              {appointments?.length > 0 ? (
                <AppointmentsGrid
                  appointments={appointments}
                />
              ) : (
                <div className="mx-10 text-xl mt-3">No appointments available</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Appointments;
