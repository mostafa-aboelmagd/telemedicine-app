"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PrescriptionCard from "./prescriptionCard";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import MedicationTable from "./medicationTable";
import { MdDownload } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
const Prescriptions = () => {
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
    if(!token) {
      window.location.href = "/auth/signin";
    }
    else {
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

  const [openModal, setOpenModal] = useState(false);
  const [openPrescription, setOpenPrescription] = useState<any>({});
  const handlePrescriptionModal = (id: number | string) => {
    setOpenModal(!openModal);
    setOpenPrescription(
      prescriptionList.find((prescription) => prescription.id === id)
    );
  };
  const handleDownloadPrescription = () => { };
  const handlePrevPrescription = () => {
    const currentIndex = prescriptionList.findIndex(
      (prescription) => prescription.id === openPrescription.id
    );
    if (currentIndex > 0) {
      setOpenPrescription(prescriptionList[currentIndex - 1]);
    } else {
      console.log("No previous prescription");
    }
  };

  const handleNextPrescription = () => {
    const currentIndex = prescriptionList.findIndex(
      (prescription) => prescription.id === openPrescription.id
    );
    if (currentIndex < prescriptionList.length - 1) {
      setOpenPrescription(prescriptionList[currentIndex + 1]);
    } else {
      console.log("No next prescription");
    }
  };
  const [prescriptionList, setPrescriptionList] = useState<any[]>([]);
  const fetchPrescriptions = async (id: any, headers: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/prescription/view/${id}`, { mode: 'cors', headers });
      // const response = await fetch(`http://localhost:3000/prescriptionList`);
      const data = await response.json();
      const orderedData = data.sort(
        (a: any, b: any) =>
          new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
      );
      setPrescriptionList(orderedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
    const id = localStorage.getItem("userId");
    fetchPrescriptions(id, headers);
  }, []);
  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      <div>
        <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
          {userImage}
          <p className="text-blue-500 mb-1 font-semibold">{`${profileData.firstName} ${profileData.lastName}`}</p>
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
        <div className="flex pt-4 mb-3 justify-between gap-2">
          <Link
            href="/patientProfile/view"
            className="font-bold ml-7"
          >
            Personal Info
          </Link>
          <Link
            href="/patientProfile/paymentInfo"
            className="font-bold"
          >
            Payment Info
          </Link>
          <Link
            href="/patientProfile/prescriptions"
            className="text-blue-500 font-bold"
          >
            Prescriptions
          </Link>
          <Link
            href="/patientProfile/patientDocuments"
            className="font-bold mr-7"
          >
            Documents
          </Link>
        </div>
        <div className="flex">
          <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
          <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
          <hr className="bg-blue-500 border-none h-0.5 w-1/4"></hr>
          <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
          {prescriptionList.length > 0 ? (
            prescriptionList.map((prescription, index) => (
              <PrescriptionCard
                key={index}
                handlePrescriptionModal={handlePrescriptionModal}
                prescription={prescription}
              />
            ))
          ) : (
            <p className="font-semibold">
              You don't have any saved prescriptions
            </p>
          )}
        </div>
      </div>
      {openModal ? (
        <aside className="fixed inset-0 flex justify-center items-center z-10">
          <div
            onClick={() => setOpenModal(false)}
            className="fixed inset-0 bg-black opacity-50"
          ></div>
          <div className="bg-white flex flex-col space-y-6 w-[80%] h-[60%] md:w-[60%] lg:w-[50%] overflow-y-auto rounded-2xl z-20">
            <div className="flex justify-between items-center sticky top-0 bg-white z-2 p-2 border-b-[1px] border-[#035fe9]">
              <div>
                <GrFormPrevious
                  onClick={() => handlePrevPrescription()}
                  className="text-[#035fe9] w-10 h-10 cursor-pointer p-2 rounded-full bg-white hover:bg-gray-100"
                />
              </div>
              <div className="text-[#035fe9] font-bold text-xl">
                Prescription List
              </div>
              <div>
                <MdOutlineNavigateNext
                  onClick={() => handleNextPrescription()}
                  className="text-[#035fe9] w-10 h-10 cursor-pointer p-2 rounded-full bg-white hover:bg-gray-100"
                />
              </div>
            </div>
            <div className="grow space-y-4 px-4 overflow-x-auto">
              <MedicationTable
                medicationList={openPrescription.medicationList}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleDownloadPrescription}
                className="text-white rounded-full px-4 py-2 bg-[#035fe9] flex items-center space-x-4 m-4"
              >
                <span>Download pdf</span> <MdDownload />
              </button>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
};

export default Prescriptions;
