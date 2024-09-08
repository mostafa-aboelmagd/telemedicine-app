"use client";

import Image from "next/image";
import userImage from "@/images/user.png";
import Link from "next/link";

function ViewProfile() {
  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
        <Image src={userImage} height={120} width={120} alt="User Icon" className="mb-1"></Image>
        <p className="text-blue-500 mb-1 font-semibold">FirstName LastName</p>
        <div className="flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 fill-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg>
            <p>Wallet</p>
            <p className="text-green-500">(0)</p>
        </div>
      </div>
      <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
        <div className="flex pt-4 mb-3">
            <Link href="/" className="text-blue-500 font-bold ml-7 w-1/2">Personal Information</Link>
            <Link href="/patientProfile/paymentInfo" className="font-bold ml-7 mr-7 md:mr-0 w-1/2">Payment Information</Link>
        </div>
        <div className="flex">
            <hr className="bg-blue-500 border-none h-0.5 w-1/2"></hr>
            <hr className="bg-neutral-800 border-none h-0.5 w-1/2"></hr>
        </div>
        <div className="p-7">
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
            <div className="mb-3">
                <p className="font-semibold">Gender</p>
                <p>Male</p>
            </div>
            <div className="mb-4">
                <p className="font-semibold">Year Of Birth</p>
                <p>2000</p>
            </div>
            <div className="mb-5">
                <Link href="/patientProfile/changePassword" className="font-medium p-3 border border-solid text-green-600 border-green-600 rounded-full">Change Password</Link>
            </div>
            <div className="mb-3">
                <button className="font-medium p-3 border border-solid text-red-600 border-red-600 rounded-full">Sign Out</button>
            </div>
            <Link href="/patientProfile/edit" className="flex gap-1 justify-center items-center font-medium absolute top-[18%] right-[5%] min-[450px]:top-[15%]">
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
