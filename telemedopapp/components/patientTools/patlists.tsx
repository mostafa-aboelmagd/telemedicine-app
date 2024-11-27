"use client";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import ReadMore from "@/components/common/ReadMore";
import Image from "next/image";
import userImage from "@/images/user.png";
import ReminderComponent from '@/components/ReminderComponent/ReminderComponent';
import { useRouter } from 'next/navigation';

interface Patient {
  patientId: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  gender: string;
  phone: string;
  Languages: string[];
}
const filterTypeMapping: { [key: string]: string } = {
  user_first_name: "First Name",
  user_last_name: "Last Name",
  user_email: "Email",
  user_phone_number: "Phone Number",
  user_id: "User ID",
  patient_account_state: "Account State",
  ALL: "Nothing"
};
const Patlists = () => {
  const router = useRouter();
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<any>(null); // New state
  const [token, setToken] = useState<any>();

  const [filterType, setFilterType] = useState("user_first_name"); // Initial filter type
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setsortValue] = useState("user_id");
  const [showPatients, setShowPatients] = useState(false); // Add new state
  const [showAcceptPopup, setshowAcceptPopup] = useState(false);
  const [showStatePopup, setShowStatePopup] = useState(false);
  const [popupPatient, setPopupPatient] = useState<any>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showAppointmentsHistory, setShowAppointmentsHistory] = useState(false);
  const [selectedPatientForAppointments, setSelectedPatientForAppointments] = useState<any>(null);

  const [isReminderDialogOpen, setisReminderDialogOpen] = useState<boolean>(false);

  const [patientsData, setPatientsData] = useState([
    {
      user_id: null,
      user_first_name: "",
      user_last_name: "",
      user_email: "",
      user_gender: "",
      user_phone_number: "",
      user_birth_date: "",
      patient_account_state: "", // Note: patient_account_state
      languages: [],
    },
  ]);
  const keyMapping: { [key: string]: string } = {
    user_first_name: "First Name",
    user_last_name: "Last Name",
    user_birth_date: "Birth Date",
    doctor_country: "Country",
    doctor_city: "City",
    user_email: "Email",
    user_gender: "Gender",
    patient_account_state: "Account State",
    user_phone_number: "Phone Number",
    doctor_specialization: "Specialization",
  };
  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  }, []);
  const handleShowFullData = (patient: any) => {
    setSelectedPatient(patient);
  };

  const handlechangestate = (patient: any) => {
    setShowStatePopup(true);
    setPopupPatient(patient);
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

  const handleBanPatient = async (patientId: number) => {
    try {
      const newState =
        popupPatient.patient_account_state === "Active"
          ? "Banned"
          : "Active";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/backOffice/changePatientState/${patientId}`, // Assuming you have this endpoint
        {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ state: newState }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to change doctor state:', errorData);
        throw new Error('Failed to change doctor state');
      }
      setShowSuccessMessage(true);
      console.log("Patient state changed successfully");
      setPatientsData((prevPatientsData) => {
        return prevPatientsData.map((patient) =>
          patient.user_id === patientId
            ? { ...patient, patient_account_state: newState }
            : patient
        );
      });
    } catch (error) {
      console.error("Error changing patient state:", error);
    } finally {
      setShowStatePopup(false);
      setPopupPatient(null);
    }
  };

  const handleCloseStatePopup = () => {
    setShowStatePopup(false);
    setPopupPatient(null);
  };

  const getProfileCompletionStatus = (patient: any) => {
    const missingFields = isPatientProfileIncomplete(patient);
    const totalFields = 6; // Total number of required fields
    const completedFields = totalFields - missingFields.length;
    const percentage = Math.round((completedFields / totalFields) * 100);
    
    return {
      percentage,
      missingFields,
      status: percentage === 100 ? 'Complete' : 'Incomplete'
    };
  };

  const getProfileStatus = (patient: any) => {
    const accountState = patient.patient_account_state?.toLowerCase() || '';
    return accountState === 'banned' ? 'Banned' : 'Active';
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    setShowPatients(true);
    setLoadingRequest(true);
    const fetchPatients = async () => {
      let url = `${process.env.NEXT_PUBLIC_SERVER_NAME}/backOffice/getAllPatients?order=${sortValue}`;
      if (filterType !== "ALL") {
        if (filterType === "patient_account_state") {
          // Handle account state filtering on the client side
          const response = await fetch(url, {
            mode: "cors",
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const data = await response.json();
          const filteredPatients = data.patients.filter(
            (patient: any) => getProfileStatus(patient) === filterValue
          );
          setPatientsData(filteredPatients);
        } else {
          url += `&&${filterType}=${filterValue}`;
          const response = await fetch(url, {
            mode: "cors",
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const data = await response.json();
          setPatientsData(data.patients);
        }
      } else {
        const response = await fetch(url, {
          mode: "cors",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        setPatientsData(data.patients);
      }
      setLoadingRequest(false);
    };
    await fetchPatients();
  };

  const isPatientProfileIncomplete = (patient: any) => {
    const { user_email, user_first_name, user_last_name, user_phone_number, user_birth_date, languages } = patient;

    const missingFields = [];
    if (!user_email) missingFields.push('Email');
    if (!user_first_name) missingFields.push('First Name');
    if (!user_last_name) missingFields.push('Last Name');
    if (!user_phone_number) missingFields.push('Phone Number');
    if (!user_birth_date) missingFields.push('Birth Date');
    if (!languages || languages.length === 0 || languages.every((lang: string | null) => lang === null)) {
      missingFields.push('Languages');
    }

    return missingFields;
  };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 min-[880px]:flex-row min-[880px]:items-start">
      <div className="w-full max-w-screen-lg text-center">
        {showSuccessMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
            <div className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md">
              <p>User state changed successfully</p>
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
              onChange={(e) => {
                setFilterType(e.target.value);
                setFilterValue("");
              }}
              className="bg-neutral-100 w-full py-4 px-6 text-base rounded-lg border border-solid border-neutral-300 grey-100 outline-none transition-[border-color] focus:border-sky-500 focus:bg-neutral-50"
            >
              <option value="ALL">All</option>
              <option value="user_first_name">First Name</option>
              <option value="user_last_name">Last Name</option>
              <option value="user_email">Email</option>
              <option value="user_phone_number">Phone Number</option>
              <option value="user_id">User ID</option>
              <option value="patient_account_state">Account State</option>
            </select>
          </div>
          <div className="w-1/4 mr-4">
            <label htmlFor="filterValue" className="block mb-1.5 text-base font-semibold text-neutral-700">
              Enter Value:
            </label>
            {filterType === "patient_account_state" ? (
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Banned">Banned</option>
              </select>
            ) : (
              <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder={`Enter ${filterTypeMapping[filterType]}`}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            )}
          </div>
          <div className="w-1/4 mr-4">
            <label htmlFor="sortValue" className="block mb-1.5 text-base font-semibold text-neutral-700">
              Sort By:
            </label>
            <select
              id="sortValue"
              value={sortValue}
              onChange={(e) => setsortValue(e.target.value)}
              className="bg-neutral-100 w-full py-4 px-6 text-base rounded-lg border border-solid border-neutral-300 grey-100 outline-none transition-[border-color] focus:border-sky-500 focus:bg-neutral-50"
            >
              <option value="user_id">User ID</option>
              <option value="user_first_name">First Name</option>
              <option value="user_last_name">Last Name</option>
              <option value="user_email">Email</option>
              <option value="user_phone_number">Phone Number</option>
            </select>
          </div>
          <div className="w-1/4">
            <label className="block mb-1.5 text-base font-semibold text-neutral-700 invisible">
              Search
            </label>
            <button
              type="submit"
              className="bg-sky-500 text-neutral-50 text-lg px-4 py-2 rounded-lg w-full hover:bg-sky-600 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
        <div className="ml-6">
        </div>
        {showPatients ? (
          loadingRequest ? (
            <CircularProgress className="mx-auto my-4" />
          ) : (
            <>

              <div className="p-7">
                <div className="min-[1350px]:grid-cols-1 p-3 gap-y-10 justify-items-center">
                  <div className="p-7 w-full">
                    <ul className="w-full">
                      {patientsData && patientsData.length > 0 ? (
                        patientsData.map((patients) => {
                          return (
                            <li
                              key={patients.user_id}
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
                                      {patients.user_first_name} {patients.user_last_name}{"  ."}
                                      <span className="font-semibold text-gray-600">
                                        ID:
                                      </span>
                                      {patients.user_id}
                                    </h3>

                                    <p>
                                      <span className="font-semibold text-gray-600">
                                        Phone:
                                      </span>
                                      {patients.user_phone_number}
                                    </p>

                                  </div>
                                  <div>
                                    <p>
                                      <span className="font-semibold text-gray-600">
                                        Email:
                                      </span>
                                      {" " + patients.user_email}
                                    </p>

                                    <p>
                                      <span className="font-semibold text-gray-600">
                                        Account State:
                                      </span>
                                      {patients.patient_account_state}
                                    </p>
                                    
                                    {/* Profile Completion Status */}
                                    <div className="mt-2">
                                      <div className="flex items-center">
                                        <span className="font-semibold text-gray-600 mr-2">
                                          Profile Completion:
                                        </span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                                          <div 
                                            className={`h-2.5 rounded-full ${
                                              getProfileCompletionStatus(patients).percentage === 100
                                                ? 'bg-green-500'
                                                : getProfileCompletionStatus(patients).percentage > 50
                                                ? 'bg-yellow-500'
                                                : 'bg-red-500'
                                            }`}
                                            style={{ width: `${getProfileCompletionStatus(patients).percentage}%` }}
                                          />
                                        </div>
                                        <span className="ml-2 text-sm">
                                          {getProfileCompletionStatus(patients).percentage}%
                                        </span>
                                      </div>
                                      {getProfileCompletionStatus(patients).missingFields.length > 0 && (
                                        <p className="text-sm text-red-500 mt-1">
                                          Missing: {getProfileCompletionStatus(patients).missingFields.join(', ')}
                                        </p>
                                      )}
                                    </div>
                                    {/* Profile Status */}
                                    <div className="mt-2">
                                      <div className="flex items-center">
                                        <span className="font-semibold text-gray-600 mr-2">
                                          Account State:
                                        </span>
                                        <span className={`text-sm ${getProfileStatus(patients) === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                                          {getProfileStatus(patients)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-2 flex justify-end space-x-4">
                                    <button
                                      onClick={() => {
                                        router.push(`/appointments/history?userId=${patients.user_id}`);
                                      }}
                                      className="bg-sky-500 text-neutral-50 text-lg px-4 py-2 rounded-lg hover:bg-sky-600"
                                    >
                                      View Appointments History
                                    </button>
                                    <button
                                      onClick={() => handleShowFullData(patients)}
                                      className="bg-sky-500 text-neutral-50 text-lg px-4 py-2 rounded-lg hover:bg-sky-600"
                                    >
                                      Full Profile
                                    </button>
                                    <button
                                      onClick={() => handlechangestate(patients)}
                                      className="bg-sky-500 text-neutral-50 text-lg px-4 py-2 rounded-lg hover:bg-sky-600"
                                    >
                                      Account State
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <p className="font-semibold text-center md:text-xl">
                          There Are Currently No Requests
                        </p>
                      )}
                    </ul>
                  </div>
                  {selectedPatient && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl overflow-y-auto max-h-[80vh]">
                        <h2 className="text-xl font-bold mb-10">Full Data</h2>

                        <div className="grid grid-cols-2 gap-4 text-left w-full">
                          <div>
                            <h3 className="text-lg font-semibold mb-2 w-full">Personal Data</h3>
                            {Object.entries(selectedPatient)
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
                                        {selectedPatient.user_first_name} {selectedPatient.user_last_name}
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
                          </div>
                          <div className="w-full">
                            <div>
                              <h3 className="text-lg font-semibold mb-2">Languages</h3>
                              <ul>
                                {selectedPatient.languages.map((lang: string, index: number) => (
                                  <li key={index}>{lang}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-4">
                          {getProfileCompletionStatus(selectedPatient).percentage < 100 && (
                            <button
                              className="bg-sky-500 text-neutral-50 text-lg p-3.5 w-full border-none rounded-lg cursor-pointer transition-[background-color] hover:bg-sky-600"
                              onClick={() => setisReminderDialogOpen(true)}
                            >
                              Send Reminder (Missing: {getProfileCompletionStatus(selectedPatient).missingFields.join(', ')})
                            </button>
                          )}

                          <button
                            className="bg-sky-500 text-neutral-50 text-lg p-3.5 w-full border-none rounded-lg cursor-pointer transition-[background-color] hover:bg-sky-600"
                            onClick={() => setSelectedPatient(null)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </>

          )) : null}
      </div>
      {isReminderDialogOpen && selectedPatient && (
        <ReminderComponent
          isOpen={isReminderDialogOpen}
          recipientEmail={selectedPatient.user_email}
          recipientName={`${selectedPatient.user_first_name}`}
          onClose={() => setisReminderDialogOpen(false)}
          onSendSuccess={() => {
            setSelectedPatient(null);
          }}
        />
      )}
      {showAppointmentsHistory && selectedPatientForAppointments && (
        <button
          onClick={() => {
            router.push(`/appointments/history?userId=${selectedPatientForAppointments.user_id}`);
          }}
          className="bg-sky-500 text-neutral-50 text-lg px-4 py-2 rounded-lg hover:bg-sky-600"
        >
          View Appointments History
        </button>
      )}
      {showStatePopup && popupPatient && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg text-center">
              {popupPatient.user_first_name} {popupPatient.user_last_name} state is {popupPatient.patient_account_state}.
              {popupPatient.patient_account_state === "Active" ? (
                " Do you want to ban this account?"
              ) : (
                " Do you want to activate this account?"
              )}
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className={`${popupPatient.patient_account_state === "Active" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white px-4 py-2 rounded-lg`}
                onClick={() => handleBanPatient(popupPatient.user_id)}
              >
                {popupPatient.patient_account_state === "Active" ? "Ban Account" : "Activate Account"}
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

export default Patlists;
