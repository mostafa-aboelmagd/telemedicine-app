"use client"
import React, { use, useEffect } from 'react'
import Image from "next/image";
import userImage from "@/images/user.png";
import Link from "next/link";

import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import DocumentComponent from './DocumentComponent';
import SearchBar from '../SearchBar/searchbar';

const PatientDocuments = () => {
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
  }
  useEffect(() => {
    fetchDocuments();
  }, []);
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
          <Link href="/patientProfile/view" className="font-bold ml-7 w-1/4">Personal Information</Link>
          <Link href="/patientProfile/paymentInfo" className="font-bold ml-7 mr-7 md:mr-0 w-1/4">Payment Information</Link>
          <Link href="/patientProfile/prescriptions" className="font-bold text-center w-1/4">Prescriptions</Link>
          <Link href="/patientProfile/patientDocuments" className="text-blue-500 font-bold text-center w-1/4">Documents</Link>
        </div>
        <div className="flex">
          <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
          <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
          <hr className="bg-neutral-800 border-none h-0.5 w-1/4"></hr>
          <hr className="bg-blue-500 border-none h-0.5 w-1/4"></hr>
        </div>
        <div className="p-7">
          {documents.length > 0 ?
            <div className='flex flex-col space-y-4 overflow-y-auto'>
              <SearchBar placeholder="Document name" />
              {documents.map((document, index) => (
                <DocumentComponent key={index} document={document} icon={getIcon(document.type)} />
              ))}
            </div>
            : <p className="font-semibold">You don't have any saved documents</p>}
        </div>
      </div>
    </div>
  )
}

export default PatientDocuments