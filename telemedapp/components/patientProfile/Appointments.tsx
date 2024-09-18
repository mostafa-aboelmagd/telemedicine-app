"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import DoctorGrid from "@/components/DoctorGrid/grid";
const Appointments = () => {
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

  const [minMaxFees, setMinMaxFees] = useState({ min: 0, max: 1000 });

  const [doctors, setDoctors] = useState<any>([]);

  const [specializationOptions, setSpecializationOptions] = useState<any>([]);
  const [countryOptions, setCountryOptions] = useState<any>([]);
  const [languageOptions, setLanguageOptions] = useState<any>([]);

  const handleFillOptions = (doctors: any[]) => {
    let speciality: any = [];
    let country: any = [];
    let language: any = [];
    doctors.forEach((doctor: any) => {
      if (!speciality.includes(doctor.title)) {
        speciality.push({ value: doctor.title, label: doctor.title });
      }
      if (!country.includes(doctor.country)) {
        country.push({ value: doctor.country, label: doctor.country });
      }
      doctor.language.forEach((lang: string) => {
        if (!language.includes(lang)) {
          language.push({ value: lang, label: lang });
        }
      });
    });
    setSpecializationOptions(speciality);
    setCountryOptions(country);
    setLanguageOptions(language);
  };

  const headers = {
    "Content-Type": "application/json",
  };
  const fetchDoctors = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/home`,
      { headers }
    );
    if (!response.ok) {
      console.log("Error: Request sent no data");
    } else {
      const data = await response.json();
      handleFillOptions(data);
      setDoctors(data);
      // handleShownDoctors(filters);
    }
  };
  const [filters, setFilters] = useState({
    speciality: "",
    gender: "",
    rating: "",
    price: [],
    todayDate: "",
    thisWeek: "",
    dateRange1: "",
    dateRange2: "",
    country: [],
    language: [],
    sort: "",
    isOnline: "",
  });
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleShownDoctors = (filters: any) => {
    let filtered = doctors;

    if (filters.isOnline) {
      filtered = filtered.filter(
        (doctor: any) => doctor.isOnline === filters.isOnline
      );
    }

    if (filters.speciality.length > 0) {
      filtered = filtered.filter((doctor: any) =>
        filters.speciality.includes(doctor.title)
      );
    }
    if (filters.gender) {
      filtered = filtered.filter(
        (doctor: any) => doctor.gender === filters.gender
      );
    }
    if (filters.rating) {
      const ratingValue = parseFloat(filters.rating);
      if (!isNaN(ratingValue)) {
        filtered = filtered.filter(
          (doctor: any) => doctor.rating >= ratingValue
        );
      }
    }
    if (filters.price.length > 0) {
      if (!isNaN(filters.price[0]) && !isNaN(filters.price[1])) {
        filtered = filtered.filter(
          (doctor: any) =>
            doctor.fees60min >= filters.price[0] &&
            doctor.fees60min <= filters.price[1]
        );
      }
    }
    if (filters.country.length > 0) {
      filtered = filtered.filter((doctor: any) =>
        filters.country.includes(doctor.country)
      );
    }
    if (filters.language.length > 0) {
      filtered = filtered.filter((doctor: any) =>
        doctor.language.some((lang: string) => filters.language.includes(lang))
      );
    }

    if (filters.sort) {
      switch (filters.sort) {
        case "ascFees":
          filtered = filtered.sort(
            (a: any, b: any) => a.fees60min - b.fees60min
          );
          break;
        case "descFees":
          filtered = filtered.sort(
            (a: any, b: any) => b.fees60min - a.fees60min
          );
          break;
        case "rating":
          filtered = filtered.sort((a: any, b: any) => b.rating - a.rating);
          break;
        case "reset":
          setFilters({ ...filters, sort: "" });
          break;
        default:
          break;
      }
    }

    setFilteredDoctors(filtered);
    return filtered;
  };
  const handleResetFilters = () => {
    setFilters({
      ...filters,
      speciality: "",
      gender: "",
      rating: "",
      price: [],
      todayDate: "",
      thisWeek: "",
      country: [],
      language: [],
      isOnline: "",
    });
  };

  const handleChangeFilterDrop = (selectedOption: any, actionMeta: any) => {
    const { name } = actionMeta;
    const value = selectedOption
      ? Array.isArray(selectedOption)
        ? selectedOption.map((option: any) => option.value)
        : selectedOption.value
      : [];
    setFilters({ ...filters, [name]: value });
  };
  const handleChangeOptions = (e: any) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const getMinMaxFees = () => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    doctors.forEach((doctor: any) => {
      if (doctor.fees60min < min) {
        min = doctor.fees60min;
      }
      if (doctor.fees60min > max) {
        max = doctor.fees60min;
      }
    });
    setMinMaxFees({ min, max });
  };
  const sortOptions = [
    { value: "ascFees", label: "Fees Low to High" },
    { value: "descFees", label: "Fees High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "reset", label: "Reset" },
  ];
  useEffect(() => {
    fetchDoctors();
    getMinMaxFees();
  }, []);
  useEffect(() => {
    if (doctors.length > 0) {
      handleShownDoctors(filters);
    }
  }, [doctors, filters]);
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

      <div className="flex flex-col max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
        <div className="flex-initial m-5 bg-white rounded-xl relative ">
          <div className="flex pt-4 mb-3">
            <Link href="/patientProfile/view" className="font-bold ml-7 w-1/4">
              Personal Information
            </Link>
            <Link
              href="/patientProfile/paymentInfo"
              className="font-bold ml-7 mr-7 md:mr-0 w-1/4"
            >
              Payment Information
            </Link>
            <Link
              href="/patientProfile/Prescriptions"
              className=" font-bold ml-7 w-1/4"
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
            <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
            <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
            <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
          </div>
        </div>
        <div className="flex flex-col m-4">
          {filteredDoctors.length > 0 ? (
            <DoctorGrid doctors={filteredDoctors} />
          ) : (
            <div> Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
