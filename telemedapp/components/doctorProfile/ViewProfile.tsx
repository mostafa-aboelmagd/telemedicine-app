"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import userImage from "@/images/user.png";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { FaUserCircle } from "react-icons/fa";
function ViewProfile() {
  const userImage = <FaUserCircle className="h-32 w-32 text-[#035fe9]" />;
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
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

  const [tempData, setTempData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    birthYear: "",
    residenceCountry: "",
    specialization: "",
    languages: [],
    thirtyMinPrice: "",
    sixtyMinPrice: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/profile/info`, {
      mode: "cors",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((response) => setTempData(() => response.formattedDoctor))
      .finally(() => setLoading(false));
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
    { name: "birthYear", title: "Year Of Birth" },
    { name: "gender", title: "Gender" },
    { name: "residenceCountry", title: "Residence Country" },
    { name: "specialization", title: "Specialization" },
    { name: "languages", title: "Languages" },
    { name: "thirtyMinPrice", title: "30 Minutes Price" },
    { name: "sixtyMinPrice", title: "60 Minutes Price" },
  ];

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 min-[880px]:flex-row min-[880px]:items-start">
      {loading ? (
        <CircularProgress className="absolute top-1/2" />
      ) : (
        <>
          <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
            {userImage}
            <p className="text-blue-500 mb-1 font-semibold">
              Dr. {profileData.firstName} {profileData.lastName}
            </p>
          </div>
          <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 min-[880px]:basis-7/12 min-[880px]:max-w-full">
            <div className="flex pt-4 mb-3">
              <Link href="/" className="text-blue-500 font-bold ml-7 w-1/2">
                Personal Info
              </Link>
              <Link
                href="/doctorProfile/timeSlots"
                className="font-bold ml-7 mr-7 min-[880px]:mr-0 w-1/2"
              >
                Time Slots
              </Link>
            </div>
            <div className="flex">
              <hr className="bg-blue-500 border-none h-0.5 w-1/2"></hr>
              <hr className="bg-neutral-800 border-none h-0.5 w-1/2"></hr>
            </div>
            <div className="p-7">
              <div className="flex flex-col min-[450px]:flex-row min-[450px]:gap-10 lg:gap-24 xl:gap-56">
                <div>
                  {profileFields.slice(0, 6).map((field) => {
                    return (
                      <div key={field.name} className="mb-3">
                        <p className="font-extrabold">{field.title}</p>
                        <p>
                          {profileData[field.name as keyof typeof profileData]}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="mb-5">
                  {profileFields.slice(6).map((field) => {
                    return (
                      <div key={field.name} className="mb-3">
                        <p className="font-extrabold">{field.title}</p>
                        <p>
                          {profileData[field.name as keyof typeof profileData]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="mt-5">
                  <Link
                    href="/doctorProfile/changePassword"
                    className="font-medium p-3 border border-solid text-green-600 border-green-600 rounded-full"
                  >
                    Change Password
                  </Link>
                </div>
                <div className="mt-5 mb-3">
                  <button className="font-medium p-3 border border-solid text-red-600 border-red-600 rounded-full">
                    Sign Out
                  </button>
                </div>
              </div>
              <Link
                href="/doctorProfile/edit"
                className="flex gap-1 justify-center items-center font-medium absolute top-[12.5%] right-[5%] min-[370px]:top-[10%] min-[450px]:top-[80%] min-[880px]:top-[15%]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 fill-green-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <p className="text-green-500 underline">Edit Profile</p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewProfile;
