"use client";
import React, { useEffect, useState } from "react";
import { useProfile } from "@/context/ProfileContext"; // Ensure correct import path
import AppointmentsGrid from "./AppointmentsGrid";

const Appointments = () => {
  const { profileData, loading } = useProfile();
  const [appointments, setAppointments] = useState<any[]>([]);

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
    <div className="flex flex-col m-4">
      {appointments?.length > 0 ? (
        <AppointmentsGrid
          appointments={appointments}
          profileData={profileData}
        />
      ) : (
        <p className="font-semibold">
          {loading ? "Loading..." : "No appointments available"}
        </p>
      )}
    </div>
  );
};

export default Appointments;
