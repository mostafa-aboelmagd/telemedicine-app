"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import userImage from "@/images/user.png";
import ReadMore from "@/components/common/ReadMore";
const Requests = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
  });

  const [requests, setRequests] = useState([
    {
      appointment_id: "",
      appointment_patient_id: "",
      patient_first_name: "",
      patient_last_name: "",
      doctor_availability_day_hour: "",
      appointment_duration: "",
      appointment_type: "",
      appointment_settings_type: "",
      appointment_complaint: "",
    },
  ]);

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
    const token = localStorage.getItem("jwt");
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/Doctor/Profile/PendingRequests`,
      {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => setRequests(() => response))
      .finally(() => setLoading(false));
  }, [profileData]);

  const userProfileImage = (
    <FaUserCircle className="h-32 w-32 text-[#035fe9]" />
  );

  const handleResolveRequest = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const buttonName = e.currentTarget.name;
    const appointmentID = e.currentTarget.value;

    try {
      const token = localStorage.getItem("jwt");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/AppointmentResponse/${appointmentID}/${buttonName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          mode: "cors",
        }
      );

      if (!response.ok) {
        if (buttonName === "accept") {
          throw new Error("Failed To Accept Request");
        } else if (buttonName === "decline") {
          throw new Error("Failed To Decline Request");
        }
      }

      window.location.href = "/doctorProfile/requests";
    } catch (error) {
      if (buttonName === "accept") {
        console.error("Error While Accepting Request", error);
      } else if (buttonName === "decline") {
        console.error("Error While Declining Request", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 min-[880px]:flex-row min-[880px]:items-start">
      {loading ? (
        <CircularProgress className="absolute top-1/2" />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
              {userProfileImage}
              <p className="text-blue-500 mb-1 font-semibold">
                Dr. {profileData.firstName} {profileData.lastName}
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              onClick={() =>
                (window.location.href = "/doctorProfile/appointments")
              }
            >
              My Appointments
            </button>
          </div>
          <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 min-[880px]:basis-7/12 min-[880px]:max-w-full">
            <div className="flex pt-4 mb-3 justify-between gap-2">
              <Link href="/doctorProfile/view" className="font-bold ml-7">
                Personal Info
              </Link>
              <Link href="/doctorProfile/timeSlots" className="font-bold">
                Time Slots
              </Link>
              <Link
                href="/doctorProfile/requests"
                className="text-blue-500 font-bold mr-7"
              >
                Pending Requests
              </Link>
            </div>
            <div className="flex">
              <hr className="bg-neutral-800 border-none h-0.5 w-1/3"></hr>
              <hr className="bg-neutral-800 border-none h-0.5 w-1/3"></hr>
              <hr className="bg-blue-500 border-none h-0.5 w-1/3"></hr>
            </div>
            <div className="p-7">
              <div className="grid grid-cols-1 min-[1350px]:grid-cols-2 p-3 gap-y-10 justify-items-center">
                {requests.length > 0 ? (
                  requests.map((request) => {
                    return (
                      <>
                        <div
                          className="min-w-80 max-w-[400px] h-fit flex flex-col p-2 gap-2 rounded-lg bg-neutral-50 shadow-lg"
                          key={request.appointment_id}
                        >
                          <div className="flex gap-3">
                            <Image
                              className="inline-block h-20 w-20 rounded-full"
                              src={userImage}
                              alt="Doctor Image"
                            />
                            <p className="font-bold pt-1 self-center">
                              {request.patient_first_name}{" "}
                              {request.patient_last_name}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p>
                              <span className="font-semibold text-gray-600">
                                Date:
                              </span>
                              {" " +
                                request.doctor_availability_day_hour.slice(
                                  0,
                                  10
                                )}
                            </p>
                            <p>
                              <span className="font-semibold text-gray-600">
                                Time & Duration:
                              </span>
                              {" " +
                                request.doctor_availability_day_hour.slice(
                                  11,
                                  16
                                )}{" "}
                              | {request.appointment_duration + " mins"}
                            </p>
                            <p>
                              <span className="font-semibold text-gray-600">
                                Details:
                              </span>
                              {" " + request.appointment_settings_type}{" "}
                              {request.appointment_type === "First_time"
                                ? "First Time"
                                : "Follow Up"}
                            </p>
                          </div>
                          <div className="max-w-[400px] whitespace-break-spaces break-words">
                            <div>
                              <strong>Complaint:</strong>{" "}
                              {request.appointment_complaint ? (
                                <ReadMore
                                  text={request.appointment_complaint}
                                />
                              ) : (
                                "N/A"
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="flex justify-between gap-2">
                              <button
                                name="accept"
                                value={request.appointment_id}
                                className="rounded-full border-none bg-emerald-600 text-white w-40 px-4 py-2 hover:scale-105 hover:cursor-pointer"
                                onClick={handleResolveRequest}
                              >
                                Accept
                              </button>
                              <button
                                name="decline"
                                value={request.appointment_id}
                                className="rounded-full border-none bg-red-600 text-white w-40 px-4 py-2 hover:scale-105 hover:cursor-pointer"
                                onClick={handleResolveRequest}
                              >
                                Decline
                              </button>
                            </div>
                            <div className="flex justify-between gap-2">
                              <button 
                                className="rounded-full border-none bg-indigo-400 text-white w-40 px-4 py-2 hover:scale-105 hover:cursor-pointer"
                                onClick={() =>
                                  (window.location.href = `/doctorProfile/patientHistory/${request.appointment_patient_id}`)
                                }
                              >
                                Medical History
                              </button>
                              <button
                                className="rounded-full border-none bg-blue-500 text-white w-40 px-4 py-2 hover:scale-105 hover:cursor-pointer"
                                onClick={() =>
                                  (window.location.href = "/doctorProfile/chat")
                                }
                              >
                                Ask For Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div>
                    <p className="font-semibold text-2xl absolute left-[30%] top-[50%]">
                      There Are Currently No Requests
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Requests;