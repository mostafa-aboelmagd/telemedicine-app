"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import DocumentComponent from "./DocumentComponent";
import SearchBar from "../SearchBar/searchbar";
import { FaUserCircle } from "react-icons/fa";
const PatientDocuments = () => {
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

  const [tempData, setTempData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    birthYear: "",
    languages: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("jwt");
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
        .then((response) => setTempData(() => response.formattedPatient))
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    let languagesString = tempData?.languages.join(" ");
    const tempObj = { ...tempData, languages: languagesString };
    setProfileData(() => tempObj);
  }, [tempData]);

  const profileFields = [
    { name: "firstName", title: "First Name" },
    { name: "lastName", title: "Last Name" },
    { name: "phone", title: "Phone Number" },
    { name: "email", title: "Email" },
    { name: "languages", title: "Languages" },
    { name: "birthYear", title: "Year Of Birth" },
    { name: "gender", title: "Gender" },
  ];

  const [documents, setDocuments] = React.useState<any[]>([]);
  const getIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FaRegFilePdf className="w-10 h-10 text-neutral-600 p-2" />;
      case "image":
        return <FaRegImage className="w-10 h-10 text-neutral-600 p-2" />;
      case "link":
        return <FaLink className="w-10 h-10 text-neutral-600 p-2" />;
      default:
        return <FaRegFilePdf className="w-10 h-10 text-neutral-600 p-2" />;
    }
  };
  const fetchDocuments = async () => {
    try {
      const response = await fetch("http://localhost:3000/documents");
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDocuments();
  }, []);
  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      <div>
        <FaPlus className="z-10 fixed bottom-[3%] right-[3%] rounded-full w-14 h-14 bg-[#035fe9] p-4 cursor-pointer text-white shadow-md shadow-gray-600 hover:scale-110 transition" />
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
            (window.location.href = "/patientProfile/upcoming_appointments")
          }
        >
          My Appointments
        </button>
      </div>

      <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
        <div className="flex pt-4 mb-3 justify-between gap-2">
          <Link href="/patientProfile/view" className="font-bold ml-7">
            Personal Info
          </Link>
          <Link href="/patientProfile/paymentInfo" className="font-bold">
            Payment Info
          </Link>
          <Link href="/patientProfile/prescriptions" className="font-bold">
            Prescriptions
          </Link>
          <Link
            href="/patientProfile/patientDocuments"
            className="text-blue-500 font-bold mr-7"
          >
            Documents
          </Link>
        </div>
        <div className="flex">
          <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
          <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
          <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
          <hr className="bg-blue-500 border-none h-0.5 w-1/4"></hr>
        </div>
        <div className="p-7">
          {documents.length > 0 ? (
            <div className="flex flex-col space-y-4 overflow-y-auto">
              <SearchBar placeholder="Document name" />
              {documents.map((document, index) => (
                <DocumentComponent
                  key={index}
                  document={document}
                  icon={getIcon(document.type)}
                />
              ))}
            </div>
          ) : (
            <p className="font-semibold">You don't have any saved documents</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDocuments;
