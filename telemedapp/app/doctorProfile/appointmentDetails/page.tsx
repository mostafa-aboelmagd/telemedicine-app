"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDateString } from "@/utils/date";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import MedicationTable from "@/components/patientProfile/medicationTable";
import DocumentComponent from "@/components/patientProfile/DocumentComponent";
import ReadMore from "@/components/common/ReadMore";

const AppointmentDetailsPage = () => {
  const router = useRouter();
  const [appointment, setAppointment] = useState<any>();
  const [appId, setAppId] = useState<any>();
  const [tab, setTab] = useState("visit");
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank");
  };
  const handleTabClick = (tabName: string) => {
    setTab(tabName);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const appointmentParam = params.get("appointment");
    if (appointmentParam) {
      setAppId(JSON.parse(decodeURIComponent(appointmentParam)));
    }
  }, []);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/appointmentDetails/${appId}`,
          { headers, mode: "cors" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointment details");
        }
        const data = await response.json();
        setAppointment(data.appointment);
      } catch (error) {
        console.error(error);
      }
    };
    if (appId) {
      fetchAppointmentDetails();
    }
  }, [appId]);

  if (!appointment) {
    return (
      <div className="text-4xl h-screen flex items-center justify-center text-[#035fe9]">
        Loading details...
      </div>
    );
  }

  return (
    <main className="flex-col space-y-6 h-svh">
      <div className="text-2xl md:text-4xl p-6 font-bold text-center text-[#035fe9]">
        Appointment Details
      </div>
      <section className="h-[70%] bg-gray-100 max-w-full md:max-w-[90%] lg:max-w-[75%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 border border-[#919395] rounded-lg">
        <div className="col-span-1 overflow-y-auto flex flex-col font-bold border-r-[1px] border-[#919395]">
          <div
            onClick={() => handleTabClick("visit")}
            className={`p-4 cursor-pointer ${
              tab === "visit"
                ? "bg-[#035fe9] text-white"
                : "hover:bg-[#035fe9] hover:text-white"
            } rounded-tl-lg`}
          >
            Visit Details
          </div>
          <div
            onClick={() => handleTabClick("diagnosis")}
            className={`p-4 cursor-pointer ${
              tab === "diagnosis"
                ? "bg-[#035fe9] text-white"
                : "hover:bg-[#035fe9] hover:text-white"
            }`}
          >
            Diagnosis & Report
          </div>
          <div
            onClick={() => handleTabClick("medications")}
            className={`p-4 cursor-pointer ${
              tab === "medications"
                ? "bg-[#035fe9] text-white"
                : "hover:bg-[#035fe9] hover:text-white"
            }`}
          >
            Medications
          </div>
          <div
            onClick={() => handleTabClick("scans")}
            className={`p-4 cursor-pointer ${
              tab === "scans"
                ? "bg-[#035fe9] text-white"
                : "hover:bg-[#035fe9] hover:text-white"
            }`}
          >
            Scans & Operations
          </div>
        </div>

        <div className="col-span-2 flex flex-col overflow-y-auto space-y-4 p-4">
          {tab === "visit" && (
            <>
              <div className="flex justify-between">
                <p className="text-sm md:text-lg font-semibold">
                  Dr. {appointment.doctor_first_name}{" "}
                  {appointment.doctor_last_name}{" "}
                  <span className="text-[#035fe9]">
                    {appointment.doctor_specialization}
                  </span>
                </p>
                <p className="text-sm md:text-lg font-semibold">
                  {formatDateString(appointment.doctor_availability_day_hour)}
                </p>
              </div>
              <div>
                <strong>Complaint:</strong>{" "}
                {appointment.appointment_complaint ? (
                  <ReadMore text={appointment.appointment_complaint} />
                ) : (
                  "N/A"
                )}
              </div>
            </>
          )}

          {tab === "diagnosis" && (
            <>
              {appointment.appointmentResults &&
              appointment.appointmentResults.length > 0 ? (
                appointment.appointmentResults.map(
                  (result: any, index: number) => (
                    <div key={index}>
                      <div>
                        <p className="text-sm md:text-lg font-semibold">
                          Diagnosis:
                        </p>
                        <p className="italic text-sm md:text-lg">
                          {result.appointment_diagnosis ||
                            "No diagnosis available"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm md:text-lg font-semibold">
                          Report:
                        </p>
                        <p className="italic text-sm md:text-lg">
                          {result.appointment_report || "No Report available"}
                        </p>
                      </div>
                    </div>
                  )
                )
              ) : (
                <p className="italic text-sm md:text-lg">
                  No Diagnosis Available
                </p>
              )}
            </>
          )}

          {tab === "medications" && (
            <>
              <div className="flex flex-col space-y-6">
                <p className="text-sm md:text-lg font-semibold">
                  Prescribed Medications:
                </p>
                {appointment.medications &&
                appointment.medications.length > 0 ? (
                  <MedicationTable medicationList={appointment.medications} />
                ) : (
                  <p className="italic text-sm md:text-lg">
                    No medications prescribed
                  </p>
                )}
              </div>
            </>
          )}

          {tab === "scans" && (
            <>
              <div>
                <p className="text-sm md:text-lg font-semibold mb-2">Scans:</p>
                {appointment.medicalDocuments &&
                appointment.medicalDocuments.length > 0 ? (
                  <div className="flex flex-col space-y-2">
                    {appointment.medicalDocuments.map(
                      (scan: any, index: number) => (
                        <DocumentComponent
                          key={index}
                          document={scan}
                          icon={
                            <FaRegImage className="w-10 h-10 text-neutral-600 p-2" />
                          }
                        />
                      )
                    )}
                  </div>
                ) : (
                  <p className="italic text-sm md:text-lg">
                    No scans available
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm md:text-lg font-semibold mb-2">
                  Operations:
                </p>
                {appointment.treatmentPlan ? (
                  <div className="flex flex-col space-y-2">
                    {appointment.treatmentPlan.treatment_plan_operations}
                  </div>
                ) : (
                  <p className="italic text-sm md:text-lg">
                    No operations available
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default AppointmentDetailsPage;
