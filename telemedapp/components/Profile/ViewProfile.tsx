"use client";

import Link from "next/link";
import ProfileCard from "./ProfileCard";


type userParams = {
  role: string;
};

function ViewProfile({role} : userParams) {
  const infoParameters = ["First Name", "Last Name", "Phone Number", "Email", "Gender", "Year Of Birth"];

  let screenSize = ""; 
  let profileLink = "";

  if(role === "patient") {
    screenSize = "md";
    profileLink = "/patientProfile/";
  }
  else if(role === "doctor") {
    screenSize = "min-[880px]";
    profileLink = "/doctorProfile/"
  }

  function getButtonClass(color:string) {
    return `font-medium p-3 border border-solid text-${color}-600 border-${color}-600 rounded-full`;
  };

  return (
    <div className={`bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 ${screenSize}:flex-row ${screenSize}:items-start`}>
      <ProfileCard role={role} />
      <div className={`flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 ${screenSize}:basis-7/12 ${screenSize}:max-w-full`}>
        <div className="flex pt-4 mb-3">
          <Link href="/" className="text-blue-500 font-bold ml-7 w-1/2">Personal Information</Link>
          <Link
            href={role === "patient" ? "/patientProfile/paymentInfo" : "/doctorProfile/timeSlots"}
            className={`font-bold ml-7 mr-7 w-1/2 ${screenSize}:mr-0`}>
              {role === "patient" ? "Payment Information" : "Time Slots"}
          </Link>
        </div>
        <div className="flex">
          <hr className="bg-blue-500 border-none h-0.5 w-1/2"></hr>
          <hr className="bg-neutral-800 border-none h-0.5 w-1/2"></hr>
        </div>
        <div className="p-7">
          { role === "patient" ?
            infoParameters.map((parameter) => {
              return (
                <div key={parameter} className="mb-3">
                  <p className="font-semibold">{parameter}</p>
                  <p>Example</p>
                </div>
              );
            }) : 
            <div className="flex flex-col min-[450px]:flex-row min-[450px]:gap-10 lg:gap-24 xl:gap-56">
              <div>
                {infoParameters.slice(0, -2).map((parameter) => {
                  return (
                    <div key={parameter} className="mb-3">
                      <p className="font-semibold">{parameter}</p>
                      <p>Example</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 mb-5">
                {["Residence Country", "Specialization", "30 Min Price", "60 Min Price", "Year Of Birth"].map((parameter) => {
                    return (
                      <div key={parameter} className="mb-3">
                        <p className="font-semibold">{parameter}</p>
                        <p>Example</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          }
          <div>
            <div className="mt-5">
              <Link href={`${profileLink}changePassword`} className={getButtonClass("green")}>Change Password</Link>
            </div>
            <div className="mt-5 mb-3">
              <button className={getButtonClass("red")}>Sign Out</button>
            </div>
          </div>
          <Link href={`${profileLink}edit`} className={`flex gap-1 justify-center items-center font-medium absolute ${role === "patient" ? "top-[18%] right-[5%] min-[450px]:top-[15%]" : "top-[12.5%] right-[5%] min-[370px]:top-[10%] min-[450px]:top-[80%] min-[880px]:top-[15%]"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 fill-green-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            <p className="text-green-500 underline">Edit Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
