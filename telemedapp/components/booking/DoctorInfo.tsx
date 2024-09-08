import React from "react";

interface DoctorInfoProps {
  doctor: {
    image: string;
    name: string;
    title: string;
    rating: number;
    numReviews: number;
  };
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctor }) => (
  <div className="bg-white rounded-3xl shadow-md p-6 w-full">
    <div className="flex flex-row gap-10 items-center justify-between">
      <div className="flex flex-row gap-4 items-center">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-12 h-12 rounded-full"
        />
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

export default DoctorInfo;
