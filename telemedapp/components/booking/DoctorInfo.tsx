import React from "react";
import { FaUserCircle } from "react-icons/fa";
const DoctorInfo = ({ doctor }: { doctor: any }) => {
  const userImage = <FaUserCircle className="h-10 w-10 text-[#035fe9]" />;

  // const bufferToBase64 = (buffer: number[]) => {
  //   const binary = String.fromCharCode.apply(null, buffer);
  //   return window.btoa(binary);
  // };
  // let base64Image = null;
  // if (!doctor) {
  //   return <div>Doctor not found</div>;
  // } else {
  //   base64Image = doctor.image
  //     ? `data:image/jpeg;base64,${bufferToBase64(doctor.image.data)}`
  //     : ""; // Handle the case if no image is available}
  // }
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 w-full">
      <div className="flex flex-row gap-10 items-center justify-between">
        <div className="flex flex-row gap-4 items-center">
          {doctor.image ? doctor.image : userImage}
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">{doctor.name}</h2>
            <p className="text-base text-blue-500">{doctor.title}</p>
          </div>
        </div>
        <div className="flex items-center flex-col">
          <span className="text-yellow-500">★ {doctor.rating}</span>
          <span className="text-gray-600 ml-2 text-xs">
            ({doctor.numReviews} Reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
