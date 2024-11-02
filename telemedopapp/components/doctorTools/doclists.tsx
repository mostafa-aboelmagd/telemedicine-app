"use client";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import ReadMore from "@/components/common/ReadMore";
import Image from "next/image";
import userImage from "@/images/user.png";
import Inputcomponent from "./InputComponent"
import InputComponent from "./InputComponent";

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

const filterTypeMapping: { [key: string]: string } = {
  user_first_name: "First Name",
  user_last_name: "Last Name",
  user_email: "Email",
  user_phone_number: "Phone Number",
  user_id: "Doctor ID",
  ALL:"Nothing"
};
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

const Doclists = () => {
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null); // New state
  const [token, setToken] = useState<any>();

  const [filterType, setFilterType] = useState("user_first_name"); // Initial filter type
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setsortValue] = useState("user_id");
  const [showDoctors, setShowDoctors] = useState(false); // Add new state
  const [showAcceptPopup, setshowAcceptPopup] = useState(false);
  const [showStatePopup, setShowStatePopup] = useState(false);
  const [popupDoctor, setPopupDoctor] = useState<any>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
    doctor_account_state: "Account State",
    user_phone_number: "Phone Number",
    doctor_specialization: "Specialization",
  };
  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  }, []);
  const handleShowFullData = (doctor: any) => {
    setSelectedDoctor(doctor);
  };
  const handlechangestate = (doctor: any) => {
    setShowStatePopup(true);
    setPopupDoctor(doctor);
  };
  useEffect(() => {
    let timer: any;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessMessage]);

  const handleBanDoctor = async (doctorId: number) => {
    try {
      const newState = popupDoctor.doctor_account_state === "Active" ? "Panned" : "Active";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/backOffice/changeDoctorState/${doctorId}`,
        {
          method: "PATCH",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ "state": newState }), // Use the determined new state
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to change doctor state:', errorData);
        throw new Error('Failed to change doctor state');
      }
      setShowSuccessMessage(true);
      console.log('Doctor state changed successfully');
      setDoctorsData((prevDoctorsData) => {
        return prevDoctorsData.map((doctor) =>
          doctor.user_id === doctorId
            ? { ...doctor, doctor_account_state: newState }
            : doctor
        );
      });
    } catch (error) {
      console.error('Error changing doctor state:', error);
    } finally {
      setShowStatePopup(false);
      setPopupDoctor(null);
    }
  };

  const handleCloseStatePopup = () => {
    setShowStatePopup(false);
    setPopupDoctor(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    setShowDoctors(true);
    setLoadingRequest(true); // Reset loading state 
    console.log("value", filterValue);
    console.log("type", filterType);
    const fetchDoctors = async () => {
      let url = `${process.env.NEXT_PUBLIC_SERVER_NAME}/backOffice/getAllDoctors?order=${sortValue}`;

      if (filterType !== "ALL") {
        url += `&&${filterType}=${filterValue}`;
      } const response = await fetch(url, {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();
      console.log("response", data);
      console.log("urlll", url);

      setDoctorsData(data.doctors);
      setShowSuccessMessage(false);
      setLoadingRequest(false);
    };
    fetchDoctors();

  };
  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 min-[880px]:flex-row min-[880px]:items-start">
      <div className="w-full max-w-screen-lg text-center">
        {showSuccessMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
            <div className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md">
              <p>Doctor state changed successfully</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mb-4 flex items-center justify-center">
          <div className="w-1/4 mr-4">
            <label htmlFor="filterType" className="block mb-1.5 text-base font-semibold text-neutral-700">
              Filter By:
            </label>
            <select
              id="filterType"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-neutral-100 w-full py-4 px-6 text-base rounded-lg border border-solid border-neutral-300 grey-100 outline-none transition-[border-color] focus:border-sky-500 focus:bg-neutral-50"
            >
              <option value="ALL">ALL</option>
              <option value="user_first_name">First Name</option>
              <option value="user_last_name">Last Name</option>
              <option value="user_email">Email</option>
              <option value="user_phone_number">Phone Number</option>
              <option value="user_id">Doctor ID</option>
            </select>
          </div>
          <div className="w-1/3 mr-4">
            <label htmlFor="filterValue" className="block mb-1.5 text-base font-semibold text-neutral-700">
              Filter Value:
            </label>
            <InputComponent
              label=""
              type="text"
              name="filterValue"
              placeholder={`Enter ${filterTypeMapping[filterType]} here`} 
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="w-1/2 "
            />
          </div>
          <div className="w-1/6 mr-4">
            <label htmlFor="sortValue" className="block mb-1.5 text-base font-semibold text-neutral-700">
              Sort By:
            </label>
            <select
              id="sortValue"
              value={sortValue}
              onChange={(e) => setsortValue(e.target.value)}
              className="bg-neutral-100 w-full py-4 px-6 text-base rounded-lg border border-solid border-neutral-300 grey-100 outline-none transition-[border-color] focus:border-sky-500 focus:bg-neutral-50"
            >

              <option value="user_first_name">First Name</option>
              <option value="user_last_name">Last Name</option>
              <option value="user_email">Email</option>
              <option value="user_phone_number">Phone Number</option>
              <option value="user_id">Doctor ID</option>
            </select>
          </div>

          <div className="ml-6">
            <button
              type="submit"
              className="bg-sky-500 text-neutral-50 text-lg p-3.5 px-6 border-none rounded-lg cursor-pointer transition-[background-color]"
            >
              Search
            </button>
          </div>
        </form>
        <div className="ml-6">
        </div>
        {showDoctors ? (
          loadingRequest ? (
            <CircularProgress className="mx-auto my-4" />
          ) : (
            <>
              <div className="p-7">
                <div className="min-[1350px]:grid-cols-1 p-3 gap-y-10 justify-items-center">
                  <div className="p-7 w-full">
                    <ul className="w-full">
                      {doctorsData && doctorsData.length > 0 ? (
                        doctorsData.map((doctors) => {
                          return (
                            <li
                              key={doctors.user_id}
                              className="mb-4 p-4 bg-neutral-50 rounded-lg shadow-md"
                            >
                              <div className="flex">
                                <Image
                                  className="inline-block h-20 w-20 rounded-full mr-4"
                                  src={userImage}
                                  alt="Doctor Image"
                                />
                                <div className="grid grid-cols-2 gap-4 w-full">
                                  <div>
                                    <h3 className="font-bold">
                                      Dr. {doctors.user_first_name} {doctors.user_last_name}{"  ."}
                                      <span className="font-semibold text-gray-600">
                                        ID:
                                      </span>
                                      {doctors. user_id} 
                                    </h3>
                                    <p>
                                      <span className="font-semibold text-gray-600">
                                        Specialty:
                                      </span>
                                      {doctors.doctor_specialization}
                                    </p>
                                    <p>
                                      <span className="font-semibold text-gray-600">
                                        Phone:
                                      </span>
                                      {doctors.user_phone_number}
                                    </p>

                                  </div>
                                  <div>

                                    <p>
                                      <span className="font-semibold text-gray-600">
                                        Email:
                                      </span>
                                      {" " + doctors.user_email}
                                    </p>
                                    <p>
                                      <span className="font-semibold text-gray-600">
                                        Location:
                                      </span>
                                      {doctors.doctor_country} {doctors.doctor_city}
                                    </p>
                                    <p>
                                      <span className="font-semibold text-gray-600">
                                        Account State:
                                      </span>
                                      {doctors.doctor_account_state}
                                    </p>
                                  </div>
                                  <div className="col-span-2 flex justify-end">
                                    <button
                                      onClick={() => handleShowFullData(doctors)}
                                      className="bg-sky-500 text-neutral-50 text-lg px-4 py-2 rounded-lg hover:bg-sky-600"
                                    >
                                      Full Profile
                                    </button>
                                    <div className="ml-10">
                                      <button
                                        onClick={() => handlechangestate(doctors)}
                                        className="bg-sky-500 text-neutral-50 text-lg px-4 py-2 rounded-lg hover:bg-sky-600"
                                      >
                                        Account State
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <p className="font-semibold text-center md:text-xl">
                          No Users Found
                        </p>
                      )}
                    </ul>
                  </div>
                  {selectedDoctor && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl overflow-y-auto max-h-[80vh]">
                        <h2 className="text-xl font-bold mb-10">Doctor Full Data</h2>

                        <div className="grid grid-cols-2 gap-4 text-left w-full">
                          <div>
                            <h3 className="text-lg font-semibold mb-2 w-full">Personal Data</h3>
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
                                  "doctor_account_state",

                                ].includes(key)
                              )
                              .map(([key, value]) => {
                                if (key === "user_first_name") {
                                  return (
                                    <div key="full_name" className="flex items-center">
                                      <strong className="text-gray-600 mr-2">Name:</strong>
                                      <span>
                                        Dr. {selectedDoctor.user_first_name} {selectedDoctor.user_last_name}
                                      </span>
                                    </div>
                                  );
                                } else if (key !== "user_last_name") {
                                  return (
                                    <div key={key} className="flex items-center">
                                      <strong className="text-gray-600 mr-2">{keyMapping[key]}:</strong>
                                      <span>{String(value)}</span>
                                    </div>
                                  );
                                } else {
                                  return null;
                                }
                              })
                            }
                            <div>
                              <h3 className="text-lg font-semibold mb-2">Interests</h3>
                              <ul>
                                {selectedDoctor.interests.map((interest: { category: string; name: string }, index: number) => (
                                  <li key={index}>
                                    <strong>{interest.category}:</strong> {interest.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="w-full">
                            <div>
                              <h3 className="text-lg font-semibold mb-2 w-full">Experiences: </h3>
                              {selectedDoctor.experiences.map((exp: Experience, index: number) => (
                                <div key={index} className="mb-10">
                                  <div><strong>Department:</strong> {exp.department}</div>
                                  <div><strong>Firm:</strong> {exp.firm}</div>
                                  <div><strong>Title:</strong> {exp.title}</div>
                                  <div><strong>Start Date:</strong> {exp.startDate}</div>
                                  <div><strong>End Date:</strong> {exp.endDate}</div>
                                </div>
                              ))}

                              <h3 className="text-lg font-semibold mb-2">Languages</h3>
                              <ul>
                                {selectedDoctor.languages.map((lang: string, index: number) => (
                                  <li key={index}>{lang}</li>
                                ))}
                              </ul>
                            </div>
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
          )) : null}
      </div>
      {showStatePopup && popupDoctor && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg text-center">
              Dr. {popupDoctor.user_first_name} {popupDoctor.user_last_name} state is {popupDoctor.doctor_account_state}.
              {popupDoctor.doctor_account_state === "Active" ? (
                " Do you want to ban this account?"
              ) : (
                " Do you want to activate this account?"
              )}
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className={`${popupDoctor.doctor_account_state === "Active" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white px-4 py-2 rounded-lg`}
                onClick={() => handleBanDoctor(popupDoctor.user_id)}
              >
                {popupDoctor.doctor_account_state === "Active" ? "Ban Account" : "Activate Account"}
              </button>
              <button
                className="bg-gray-300 text-neutral-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={handleCloseStatePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Doclists;