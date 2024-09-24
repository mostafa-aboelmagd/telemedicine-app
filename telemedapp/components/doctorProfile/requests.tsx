"use client";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Image from "next/image";
import userImage from "@/images/user.png";


const Requests = () => {
  const [requests, setRequests] = useState([{
    appointment_availability_slot : "",
    patient_first_name : "",
    patient_last_name : "",
    doctor_availability_day_hour : "",
    appointment_duration : "",
    appointment_type : "",
    appointment_settings_type : "",
    appointment_complaint : "",
  }]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      window.location.href = "/auth/signin";
    } 

    else if(Math.floor(new Date().getTime() / 1000) > Number(localStorage.getItem("expiryDate"))) {
      localStorage.clear();
      window.location.href = "/auth/signin";
    }
    
    else {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/Doctor/Profile/PendingRequests`, {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((response) => setRequests(() => response))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleResolveRequest = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
        if(buttonName === "accept") {
          throw new Error("Failed To Accept Request");
        }
        else if(buttonName === "decline") {
          throw new Error("Failed To Decline Request");
        }
      }

      window.location.href = "/doctorProfile/requests";
    }
    catch (error) {
      if(buttonName === "accept") {
        console.error("Error While Accepting Request", error);
      }
      else if(buttonName === "decline") {
        console.error("Error While Declining Request", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 min-[830px]:grid-cols-2 min-[1240px]:grid-cols-3 p-3 gap-y-10 justify-items-center">
      {loading ? (
        <CircularProgress className="absolute top-1/2" />
      ) : (
        <>
          {requests.length > 0 ?
            requests.map((request) => {
              return (
                <div
                  className="min-w-80 max-w-[400px] h-fit flex flex-col p-2 gap-2 rounded-lg bg-white border-blue-400 border border-solid hover:scale-105"
                  key={request.appointment_availability_slot}
                >
                  <div className="flex justify-between">
                    <div className="self-center">
                      <Image className="inline-block h-14 w-14 rounded-full" src={userImage} alt="Doctor Image"/>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p>Date: {request.doctor_availability_day_hour.slice(0 , 10)}</p>
                      <p>Time: {request.doctor_availability_day_hour.slice(11 , 16)}</p>
                      <p>Duration: {request.appointment_duration + " mins"}</p>
                      <p>Details: {request.appointment_settings_type} {request.appointment_type === "First_time" ? "First Time" : "Follow Up"}</p>
                    </div>
                  </div>
                  <div className="flex flex-col flex-wrap gap-2">
                    <p className="font-semibold">Patient: {request.patient_first_name} {request.patient_last_name}</p>
                    <p>Complaint: {request.appointment_complaint}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between gap-2">
                      <button
                        name="accept"
                        value={request.appointment_availability_slot}
                        className="rounded-full border-none bg-emerald-600 text-white w-40 px-4 py-2 hover:scale-105 hover:cursor-pointer"
                        onClick={handleResolveRequest}
                      >
                        Accept
                      </button>
                      <button
                        name="decline"
                        value={request.appointment_availability_slot}
                        className="rounded-full border-none bg-red-600 text-white w-40 px-4 py-2 hover:scale-105 hover:cursor-pointer"
                        onClick={handleResolveRequest}
                      >
                        Decline
                      </button>
                    </div>
                    <div className="flex justify-between gap-2">
                      <button 
                        className="rounded-full border-none bg-indigo-400 text-white w-40 px-4 py-2 hover:scale-105 hover:cursor-pointer"
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
              );
            })  : 
            <div>
              <p className="font-semibold text-2xl absolute left-[38%] top-[40%]">
                There Are Currently No Requests
              </p>
            </div>
          }
        </>
      )}
    </div>
  );
};

export default Requests;
