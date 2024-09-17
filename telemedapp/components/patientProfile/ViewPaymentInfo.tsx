"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import userImage from "@/images/user.png";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { FaUserCircle } from "react-icons/fa";

function ViewPaymentInfo() {
  const userImage = <FaUserCircle className="h-32 w-32 text-[#035fe9]" />;

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if(!token) {
      window.location.href = "/auth/signin";
    }
    else {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/profile/info`, {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((response) => setProfileData(() => response.formattedPatient))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      {loading ? (
        <CircularProgress className="absolute top-1/2" />
      ) : (
        <>
          <div>
            <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
              {userImage}
              <p className="text-blue-500 mb-1 font-semibold">
                {profileData.firstName} {profileData.lastName}
              </p>
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
              onClick={() =>
                (window.location.href = "/patientProfile/appointments")
              }
            >
              My Appointments
            </button>
          </div>

          <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
            <div className="flex pt-4 mb-3">
              <Link
                href="/patientProfile/view"
                className="font-bold ml-7 w-1/4"
              >
                Personal Information
              </Link>
              <Link
                href="/patientProfile/paymentInfo"
                className="text-blue-500 font-bold ml-7 mr-7 md:mr-0 w-1/4"
              >
                Payment Information
              </Link>
              <Link
                href="/patientProfile/prescriptions"
                className="font-bold ml-7 w-1/4"
              >
                Prescriptions
              </Link>
              <Link
                href="/patientProfile/patientDocuments"
                className="font-bold ml-7 mr-7 md:mr-0 w-1/4"
              >
                Documents
              </Link>
            </div>
            <div className="flex">
              <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
              <hr className="bg-blue-500 border-none h-0.5 w-1/4"></hr>
              <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
              <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
            </div>
            <div className="p-7">
              <p className="font-semibold">
                You don't have any saved payment information
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewPaymentInfo;
