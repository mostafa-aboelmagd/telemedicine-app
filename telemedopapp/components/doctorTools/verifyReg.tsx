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

  const handleShowFullData = (doctor: any) => {
    setSelectedDoctor(doctor); // Set the selected doctor data
  };
  const [doctorsData, setDoctorsData] = useState([
    {
      user_id: null,
      user_first_name: "",
      user_last_name: "",
      user_email: "",
      user_gender: "",
      user_phone_number: "",
      user_birth_date: "",
      doctor_account_state: "",
      doctor_country: "",
      doctor_specialization: "",
      doctor_city: "",
      doctor_clinic_location: "",
      doctor_sixty_min_price: "",
      doctor_thirty_min_price: "",
      doctor_image: null,
      experiences: [
        {
          firm: "",
          title: "",
          endDate: "",
          startDate: "",
          department: ""
        },
        {
          firm: "",
          title: "",
          endDate: "",
          startDate: "",
          department: ""
        }
      ],
      interests: [{
        name: "",
        category: ""
      }
      ],
      languages: []
    }
  ]); // State variable to store the data
  const keyMapping: { [key: string]: string } = {
    user_first_name: "First Name",
    user_last_name: "Last Name",
    user_birth_date: "Birth Date",
    doctor_country: "Country",
    doctor_city: "City",
    user_email: "Email",
    user_gender: "Gender",
    user_phone_number: "Phone Number",
    doctor_specialization: "Specialization",
  };
  const [loadingRequest, setLoadingRequest] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/backOffice/getAllDoctors?order=user_id&&state=On_hold`,
      {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setDoctorsData(data.doctors); // Update the state variable with the fetched data
      });
  }, []);


  useEffect(() => {


    console.log("data", doctorsData); // Now you can access the data here
  }, [doctorsData]);

  const handleAccept = (doctorId: number) => {
    useEffect(() => {
      const token = localStorage.getItem("jwt");

      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/backOffice/changeDoctorState/${doctorId}`,
        {
          method: "PATCH",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ "state": "Active" }),
        }
      )
        .then(response => {
          if (!response.ok) {
            console.log(response.json())
            throw new Error('Failed to accept doctor');
          }
          console.log('Doctor accepted successfully');
        })
        .catch(error => {
          console.error('Error accepting doctor:', error);
        });
    }, [doctorId]); // Add doctorId to the dependency array
  };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 min-[880px]:flex-row min-[880px]:items-start">
      {loadingRequest ? (
        <CircularProgress className="mx-auto my-4" />
      ) : (
        <>
          <div className="p-7">
            <div className="grid grid-cols-1 min-[1350px]:grid-cols-2 p-3 gap-y-10 justify-items-center">
              {doctorsData.length > 0 ? (
                doctorsData.map((doctors) => {
                  return (
                    <>
                      <div
                        className="min-w-80 max-w-[400px] h-fit flex flex-col p-2 gap-2 rounded-lg bg-neutral-50 shadow-lg"
                        key={doctors.user_id}
                      >
                        <div className="flex gap-3">
                          <Image
                            className="inline-block h-20 w-20 rounded-full"
                            src={userImage}
                            alt="Doctor Image"
                          />
                          <p className="font-bold pt-1 self-center">
                            {doctors.user_first_name}{" "}
                            {doctors.user_last_name}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p>
                            <span className="font-semibold text-gray-600">
                              location:
                            </span>
                            {doctors.doctor_country} {doctors.doctor_city}
                          </p>
                          <p>
                            <span className="font-semibold text-gray-600">
                              Spetialty:
                            </span>
                            {doctors.doctor_specialization}
                          </p>
                          <p>
                            <span className="font-semibold text-gray-600">
                              Email:
                            </span>
                            {" " + doctors.user_email}
                          </p>
                        </div>
                        <div className="max-w-[400px] whitespace-break-spaces break-words">
                          <div>
                            <strong>Gender:</strong>{" "}
                            {doctors.user_gender}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between gap-2">
                            <button
                              name="accept"
                              // value={doctors.appointment_id}
                              className="rounded-full border-none bg-emerald-600 text-white w-40 px-4 py-2 hover:scale-105 hover:cursor-pointer"
                              onClick={() => {
                                if (doctors.user_id) {  // Check if doctorId is not null
                                  handleAccept(doctors.user_id); // Pass doctorId
                                } else {
                                  // Handle the case where doctorId is null, e.g., show an error message
                                  console.error("Error: doctorId is null");
                                }
                              }}
                            >
                              Accept
                            </button>
                            <button
                              name="decline"
                              // value={doctors.appointment_id}
                              className="rounded-full border-none bg-emerald-600 text-white w-40 px-4 py-2 hover:scale-105 hover:cursor-pointer"
                              onClick={() => handleShowFullData(doctors)} // Call the function
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
                              "user_first_name",
                              "user_last_name",
                              "user_birth_date",
                              "doctor_country",
                              "doctor_city",
                              "user_email",
                              "user_gender",
                              "user_phone_number",
                              "doctor_specialization",
                            ].includes(key)
                          )
                          .map(([key, value]) => {
                            if (key === "user_first_name") {
                              return (
                                <div key="full_name" className="flex items-center">
                                  <strong className="text-gray-600 mr-2">Name:</strong>
                                  <span>
                                    {selectedDoctor.user_first_name} {selectedDoctor.user_last_name}
                                  </span>
                                </div>
                              );
                            } else if (key !== "user_last_name") { // Skip rendering last name separately
                              // ... your existing code for other keys ...
                              return (
                                <div key={key} className="flex items-center">
                                  <strong className="text-gray-600 mr-2">{keyMapping[key]}:</strong>
                                  <span>{String(value)}</span>
                                </div>
                              );
                            } else {
                              return null; // Don't render anything for "user_last_name"
                            }
                          })
                        }
                      </div>
                      {/* certificates is not sent from backend yet */}
                      {/* <div>
                          <h3 className="text-lg font-semibold mb-2">Certificates</h3>
                          {selectedDoctor.certificates.map((cert: Certificate, index: number) => (
                            <div key={index} className="mb-4">
                              <div><strong>Authority:</strong> {cert.authority}</div>
                              <div><strong>Name:</strong> {cert.name}</div>
                              <div><strong>Start Date:</strong> {cert.startDate}</div>
                              <div><strong>End Date:</strong> {cert.endDate}</div>
                            </div>
                          ))}
                        </div> */}
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
                          {selectedDoctor.languages.map((lang: string, index: number) => (
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
