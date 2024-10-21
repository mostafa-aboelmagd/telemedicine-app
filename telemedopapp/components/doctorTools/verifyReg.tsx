"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/context/ProfileContext"; // Ensure correct import path
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import ReadMore from "@/components/common/ReadMore";
import Image from "next/image";
import userImage from "@/images/user.png";
interface Certificate {
  authority: string;
  endDate: string;
  name: string;
  startDate: string;
}

interface Experience {
  department: string;
  endDate: string;
  firm: string;
  startDate: string;
  title: string;
}

interface Doctor {
  doctorId: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  city: string;
  country: string;
  email: string;
  gender: string;
  location: string;
  phone: string;
  speciality: string;
  certificates: Certificate[];
  experiences: Experience[];
  interests: { category: string; name: string }[];
  Languages: string[];
}

const VerifyReg = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null); // New state
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("jwt")); // Access localStorage inside useEffect
  }, []);
  const handleShowFullData = (doctor: any) => {
    setSelectedDoctor(doctor); // Set the selected doctor data
  };
  const handleAccept = (doctorId: number) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/backOffice/changeDoctorState/${doctorId}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ "state": "Active" }), // Send an empty JSON object
      }
    )
      .then(response => {
        // Handle the response here, e.g., check for success or error
        if (response.ok) {
          // Request was successful
          console.log('Doctor accepted successfully');
          // You might want to update the UI here, e.g., remove the accepted doctor from the list
        } else {
          // Request failed
          console.error('Failed to accept doctor');
        }
      })
      .catch(error => {
        // Handle errors here
        console.error('Error accepting doctor:', error);
      });
  };
  const [requests, setRequests] = useState([
    {
      doctorId: 7,
      firstName: "Ahmed",
      lastName: "Said",
      birthdate: "1985-05-10",
      city: "Cairo",
      country: "Egypt",
      email: "ahmed.said@example.com",
      gender: "Male",
      location: "Cairo, Egypt",
      password: "password123",
      phone: "+20 11 1234 5678",
      speciality: "Cardiology",
      certificates: [
        {
          authority: "Egyptian Board of Cardiology",
          endDate: "2027-06-30",
          name: "Board Certified Cardiologist",
          startDate: "2022-01-01",
        },
        {
          authority: "Cairo University",
          endDate: "2018-12-31",
          name: "Master of Cardiology",
          startDate: "2016-01-01",
        },
      ],
      experiences: [
        {
          department: "Cardiology",
          endDate: "2024-12-31",
          firm: "Al-Azhar University Hospital",
          startDate: "2022-07-01",
          title: "Consultant Cardiologist",
        },
        {
          department: "Cardiology",
          endDate: "2022-06-30",
          firm: "Kasr El Aini Hospital",
          startDate: "2019-01-01",
          title: "Resident Cardiologist",
        },
      ],
      interests: [
        {
          category: "Medical Research",
          name: "Interventional Cardiology",
        },
        {
          category: "Teaching",
          name: "Cardiology Fellowship Training",
        },
      ],
      Languages: ["Arabic", "English"],
    }, {
      doctorId: 8,
      firstName: "Mona",
      lastName: "Ali",
      birthdate: "1988-11-20",
      city: "Alexandria",
      country: "Egypt",
      email: "mona.ali@example.com",
      gender: "Female",
      location: "Alexandria, Egypt",
      password: "password123",
      phone: "+20 10 9876 5432",
      speciality: "Pediatrics",
      certificates: [
        {
          authority: "Egyptian Board of Pediatrics",
          endDate: "2028-03-15",
          name: "Board Certified Pediatrician",
          startDate: "2023-07-01",
        },
        {
          authority: "Alexandria University",
          endDate: "2021-06-30",
          name: "Master of Pediatrics",
          startDate: "2019-01-01",
        },
      ],
      experiences: [
        {
          department: "Pediatrics",
          endDate: "2024-12-31",
          firm: "Alexandria University Hospital",
          startDate: "2023-08-01",
          title: "Consultant Pediatrician",
        },
        {
          department: "Pediatrics",
          endDate: "2023-07-31",
          firm: "El-Shatby Maternity University Hospital",
          startDate: "2021-07-01",
          title: "Resident Pediatrician",
        },
      ],
      interests: [
        {
          category: "Medical Research",
          name: "Neonatology",
        },
        {
          category: "Teaching",
          name: "Pediatric Emergency Medicine",
        },
      ],
      Languages: ["Arabic", "English", "French"],
    },
    {
      doctorId: 9,
      firstName: "Omar",
      lastName: "Hassan",
      birthdate: "1975-04-05",
      city: "Giza",
      country: "Egypt",
      email: "omar.hassan@example.com",
      gender: "Male",
      location: "Giza, Egypt",
      password: "password123",
      phone: "+20 12 7654 3210",
      speciality: "Orthopedic Surgery",
      certificates: [
        {
          authority: "Egyptian Board of Orthopedic Surgery",
          endDate: "2026-11-30",
          name: "Board Certified Orthopedic Surgeon",
          startDate: "2021-05-01",
        },
        {
          authority: "Ain Shams University",
          endDate: "2017-12-31",
          name: "Master of Orthopedic Surgery",
          startDate: "2015-01-01",
        },
      ],
      experiences: [
        {
          department: "Orthopedic Surgery",
          endDate: "2024-12-31",
          firm: "Ain Shams University Hospital",
          startDate: "2022-01-01",
          title: "Consultant Orthopedic Surgeon",
        },
        {
          department: "Orthopedic Surgery",
          endDate: "2021-12-31",
          firm: "Dar El Fouad Hospital",
          startDate: "2018-01-01",
          title: "Resident Orthopedic Surgeon",
        },
      ],
      interests: [
        {
          category: "Medical Research",
          name: "Sports Medicine",
        },
        {
          category: "Teaching",
          name: "Orthopedic Trauma",
        },
      ],
      Languages: ["Arabic", "English"],
    },
    {
      doctorId: 10,
      firstName: "Nadia",
      lastName: "Khaled",
      birthdate: "1992-09-12",
      city: "Asyut",
      country: "Egypt",
      email: "nadia.khaled@example.com",
      gender: "Female",
      location: "Asyut, Egypt",
      password: "password123",
      phone: "+20 15 2109 8765",
      speciality: "Dermatology",
      certificates: [
        {
          authority: "Egyptian Board of Dermatology",
          endDate: "2029-08-31",
          name: "Board Certified Dermatologist",
          startDate: "2024-02-01",
        },
        {
          authority: "Asyut University",
          endDate: "2022-06-30",
          name: "Master of Dermatology",
          startDate: "2020-01-01",
        },
      ],
      experiences: [
        {
          department: "Dermatology",
          endDate: "2024-12-31",
          firm: "Asyut University Hospital",
          startDate: "2024-03-01",
          title: "Consultant Dermatologist",
        },
        {
          department: "Dermatology",
          endDate: "2024-02-28",
          firm: "Asyut Skin Hospital",
          startDate: "2022-07-01",
          title: "Resident Dermatologist",
        },
      ],
      interests: [
        {
          category: "Medical Research",
          name: "Cosmetic Dermatology",
        },
        {
          category: "Teaching",
          name: "Pediatric Dermatology",
        },
      ],
      Languages: ["Arabic", "English"],
    },
    {
      doctorId: 11,
      firstName: "Mohamed",
      lastName: "Mahmoud",
      birthdate: "1980-02-28",
      city: "Ismailia",
      country: "Egypt",
      email: "mohamed.mahmoud@example.com",
      gender: "Male",
      location: "Ismailia, Egypt",
      password: "password123",
      phone: "+20 11 4321 0987",
      speciality: "Ophthalmology",
      certificates: [
        {
          authority: "Egyptian Board of Ophthalmology",
          endDate: "2025-10-31",
          name: "Board Certified Ophthalmologist",
          startDate: "2020-04-01",
        },
        {
          authority: "Suez Canal University",
          endDate: "2016-12-31",
          name: "Master of Ophthalmology",
          startDate: "2014-01-01",
        },
      ],
      experiences: [
        {
          department: "Ophthalmology",
          endDate: "2024-12-31",
          firm: "Suez Canal University Hospital",
          startDate: "2021-01-01",
          title: "Consultant Ophthalmologist",
        },
        {
          department: "Ophthalmology",
          endDate: "2020-12-31",
          firm: "Ismailia Eye Hospital",
          startDate: "2017-01-01",
          title: "Resident Ophthalmologist",
        },
      ],
      interests: [
        {
          category: "Medical Research",
          name: "Cataract Surgery",
        },
        {
          category: "Teaching",
          name: "Refractive Surgery",
        },
      ],
      Languages: ["Arabic", "English"],
    },
  ]);

  const [loadingRequest, setLoadingRequest] = useState(false);
  // useEffect(() => {
  //   const token = localStorage.getItem("jwt");
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_SERVER_NAME}/Doctor/Profile/PendingRequests`,
  //     {
  //       mode: "cors",
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((response) => setRequests(() => response))
  //     .finally(() => setLoadingRequest(false));
  // }, [profileData]);

  // const handleResolveRequest = async (
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   e.preventDefault();
  //   const buttonName = e.currentTarget.name;
  //   const appointmentID = e.currentTarget.value;

  //   try {
  //     const token = localStorage.getItem("jwt");

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/AppointmentResponse/${appointmentID}/${buttonName}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //         mode: "cors",
  //       }
  //     );

  //     if (!response.ok) {
  //       if (buttonName === "accept") {
  //         throw new Error("Failed To Accept Request");
  //       } else if (buttonName === "decline") {
  //         throw new Error("Failed To Decline Request");
  //       }
  //     }

  //     window.location.href = "/doctorProfile/requests";
  //   } catch (error) {
  //     if (buttonName === "accept") {
  //       console.error("Error While Accepting Request", error);
  //     } else if (buttonName === "decline") {
  //       console.error("Error While Declining Request", error);
  //     }
  //   }
  // };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 min-[880px]:flex-row min-[880px]:items-start">
      {loadingRequest ? (
        <CircularProgress className="mx-auto my-4" />
      ) : (
        <>
          <div className="p-7">
            <div className="grid grid-cols-1 min-[1350px]:grid-cols-2 p-3 gap-y-10 justify-items-center">
              {requests.length > 0 ? (
                requests.map((request) => {
                  return (
                    <>
                      <div
                        className="min-w-80 max-w-[400px] h-fit flex flex-col p-2 gap-2 rounded-lg bg-neutral-50 shadow-lg"
                        key={request.doctorId}
                      >
                        <div className="flex gap-3">
                          <Image
                            className="inline-block h-20 w-20 rounded-full"
                            src={userImage}
                            alt="Doctor Image"
                          />
                          <p className="font-bold pt-1 self-center">
                            {request.firstName}{" "}
                            {request.lastName}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p>
                            <span className="font-semibold text-gray-600">
                              location:
                            </span>
                            {request.country} {request.city}
                          </p>
                          <p>
                            <span className="font-semibold text-gray-600">
                              Spetialty:
                            </span>
                            {request.speciality}
                          </p>
                          <p>
                            <span className="font-semibold text-gray-600">
                              Email:
                            </span>
                            {" " + request.email}
                          </p>
                        </div>
                        <div className="max-w-[400px] whitespace-break-spaces break-words">
                          <div>
                            <strong>Gender:</strong>{" "}
                            {request.gender}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between gap-2">
                            <button
                              name="accept"
                              // value={request.appointment_id}
                              className="rounded-full border-none bg-emerald-600 text-white w-40 px-4 py-2 hover:scale-105 hover:cursor-pointer"
                              onClick={() => handleAccept(request.doctorId)} // Pass doctorId
                            >
                              Accept
                            </button>
                            <button
                              name="decline"
                              // value={request.appointment_id}
                              className="rounded-full border-none bg-emerald-600 text-white w-40 px-4 py-2 hover:scale-105 hover:cursor-pointer"
                              onClick={() => handleShowFullData(request)} // Call the function
                            >
                              Full Data
                            </button>
                          </div>
                          <div className="flex justify-center">
                            <button
                              className="rounded-full border-none bg-blue-500 text-white w-40 px-4 py-2 hover:scale-105 hover:cursor-pointer"
                            // onClick={() =>
                            //   (window.location.href = "/doctorProfile/chat")
                            // }
                            >
                              Ask For More Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <p className="font-semibold text-center  md:text-xl md:absolute md:left-[30%] md:top-[50%]">
                  There Are Currently No Requests
                </p>
              )}
              {selectedDoctor && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-md w-[80%] max-w-3xl overflow-y-auto max-h-[80vh]">
                    <h2 className="text-xl font-bold mb-4">Doctor Full Data</h2>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Personal Data</h3>
                        {Object.entries(selectedDoctor)
                          .filter(([key]) =>
                            [
                              "firstName",
                              "lastName",
                              "birthdate",
                              "city",
                              "country",
                              "email",
                              "gender",
                              "location",
                              "phone",
                              "speciality",
                            ].includes(key)
                          )
                          .map(([key, value]) => (
                            <div key={key} className="flex items-center">
                              <strong className="text-gray-600 mr-2">{key}:</strong>
                              <span>{String(value)}</span>
                            </div>
                          ))}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Certificates</h3>
                        {selectedDoctor.certificates.map((cert: Certificate, index: number) => (
                          <div key={index} className="mb-4">
                            <div><strong>Authority:</strong> {cert.authority}</div>
                            <div><strong>Name:</strong> {cert.name}</div>
                            <div><strong>Start Date:</strong> {cert.startDate}</div>
                            <div><strong>End Date:</strong> {cert.endDate}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Experiences</h3>
                        {selectedDoctor.experiences.map((exp: Experience, index: number) => (
                          <div key={index} className="mb-4">
                            <div><strong>Department:</strong> {exp.department}</div>
                            <div><strong>Firm:</strong> {exp.firm}</div>
                            <div><strong>Title:</strong> {exp.title}</div>
                            <div><strong>Start Date:</strong> {exp.startDate}</div>
                            <div><strong>End Date:</strong> {exp.endDate}</div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Languages</h3>
                        <ul>
                          {selectedDoctor.Languages.map((lang: string, index: number) => (
                            <li key={index}>{lang}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      className="mt-4 bg-sky-500 text-neutral-50 text-lg p-3.5 w-full border-none rounded-lg cursor-pointer transition-[background-color]"
                      onClick={() => setSelectedDoctor(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyReg;
