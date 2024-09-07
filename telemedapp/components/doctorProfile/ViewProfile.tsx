"use client";

import Image from "next/image";
import userImage from "@/images/user.png";
import Link from "next/link";

function ViewDoctorProfile() {
  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 min-[880px]:flex-row min-[880px]:items-start">
      <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
        <Image src={userImage} height={120} width={120} alt="User Icon" className="mb-1"></Image>
        <p className="text-blue-500 mb-1 font-semibold">Dr. Name</p>
      </div>
      <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 min-[880px]:basis-7/12 min-[880px]:max-w-full">
        <div className="flex pt-4 mb-3">
            <Link href="/" className="text-blue-500 font-bold ml-7">Personal Information</Link>
            <Link href="/doctorProfile/timeSlots" className="font-bold ml-7 mr-7 min-[880px]:mr-0">Time Slots</Link>
        </div>
        <div className="flex">
            <hr className="bg-blue-500 border-none h-0.5 w-1/2 min-[880px]:min-w-52"></hr>
            <hr className="bg-neutral-800 border-none h-0.5 w-1/2 min-[880px]:min-w-52"></hr>
            <hr className="bg-neutral-800 border-none h-0.5 w-0 min-[880px]:w-full"></hr>
        </div>
        <div className="p-7">
          <div className="flex flex-col min-[450px]:flex-row min-[450px]:gap-10 lg:gap-24 xl:gap-56">
            <div>
              <div className="mb-3">
                  <p className="font-semibold">First Name</p>
                  <p>Example</p>
              </div>
              <div className="mb-3">
                  <p className="font-semibold">Last Name</p>
                  <p>Example</p>
              </div>
              <div className="mb-3">
                  <p className="font-semibold">Phone Number</p>
                  <p>+201111111111</p>
              </div>
              <div className="mb-3">
                  <p className="font-semibold">Email</p>
                  <p>Example@gmail.com</p>
              </div>
              <div className="mb-8">
                  <p className="font-semibold">Gender</p>
                  <p>Male</p>
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-3">
                  <p className="font-semibold">Residence Country</p>
                  <p>Egypt</p>
              </div>
              <div className="mb-3">
                  <p className="font-semibold">Specialization</p>
                  <p>Dermatology</p>
              </div>
              <div className="mb-3">
                  <p className="font-semibold">30 Min Price</p>
                  <p>600 EGP</p>
              </div>
              <div className="mb-3">
                  <p className="font-semibold">60 Min Price</p>
                  <p>1050 EGP</p>
              </div>
              <div className="mb-4">
                  <p className="font-semibold">Year Of Birth</p>
                  <p>1990</p>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-5">
              <Link href="/doctorProfile/changePassword" className="font-medium p-3 border border-solid text-green-600 border-green-600 rounded-full">Change Password</Link>
            </div>
            <div className="mb-3">
              <button className="font-medium p-3 border border-solid text-red-600 border-red-600 rounded-full">Sign Out</button>
            </div>
          </div>
          <Link href="/doctorProfile/edit" className="flex gap-1 justify-center items-center font-medium absolute top-[12.5%] right-[5%] min-[370px]:top-[10%] min-[450px]:top-[80%] min-[880px]:top-[15%]">
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

export default ViewDoctorProfile;
