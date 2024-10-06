import React from "react";
import { FaUserCircle } from "react-icons/fa";
import type { DoctorBooking } from "@/types";
const DoctorInfo = ({ doctor }: { doctor: DoctorBooking }) => {
  const userImage = <FaUserCircle className="h-10 w-10 text-[#035fe9]" />;

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 w-full">
      <div className="flex flex-row gap-10 items-center justify-between">
        <div className="flex flex-row gap-4 items-center">
          {/* {doctor.image ? doctor.image : userImage} */}
          {userImage}
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">{doctor.name}</h2>
            <p className="text-base text-blue-500">{doctor.title}</p>
          </div>
        </div>
        <div className="flex items-center flex-col">
          <span className="text-yellow-500">★ 5{/* {doctor.rating} */}</span>
          <span className="text-gray-600 ml-2 text-xs">
            ({/* {doctor.numReviews} */}
            11 Reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
