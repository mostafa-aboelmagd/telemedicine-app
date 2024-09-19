"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import PrescriptionCard from '@/components/patientProfile/prescriptionCard';
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdDownload } from "react-icons/md";
import MedicationTable from '@/components/patientProfile/medicationTable';

const PrescriptionsPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openPrescription, setOpenPrescription] = useState<any>({});
    const [prescriptionList, setPrescriptionList] = useState<any[]>([]);
    const { appointmentId } = useParams();
    const handleDownloadPrescription = () => { };

    const handlePrevPrescription = () => {
        const currentIndex = prescriptionList.findIndex(
            (prescription) => prescription.id === openPrescription.id
        );
        if (currentIndex > 0) {
            setOpenPrescription(prescriptionList[currentIndex - 1]);
        } else {
            console.log("No previous prescription");
        }
    };

    const handleNextPrescription = () => {
        const currentIndex = prescriptionList.findIndex(
            (prescription) => prescription.id === openPrescription.id
        );
        if (currentIndex < prescriptionList.length - 1) {
            setOpenPrescription(prescriptionList[currentIndex + 1]);
        } else {
            console.log("No next prescription");
        }
    };
    const handlePrescriptionModal = (id: number | string) => {
        setOpenModal(!openModal);
        setOpenPrescription(
            prescriptionList.find((prescription) => prescription.id === id)
        );
    };
    const fetchPrescriptions = async (appId: any, headers: any) => {
        try {
            const response = await fetch(`http://localhost:3000/prescriptionListDoc`);
            const data = await response.json();
            setPrescriptionList(data);
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
        fetchPrescriptions(appointmentId, headers);
    }, [])
    return (
        <section>
            <div className="text-center text-2xl font-bold text-[#035fe9] p-4">Prescriptions of { }</div>
            <div className="max-w-[75%] mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
                {prescriptionList.length > 0 ? (
                    prescriptionList.map((prescription, index) => (
                        <PrescriptionCard
                            key={index}
                            handlePrescriptionModal={handlePrescriptionModal}
                            prescription={prescription}
                        />
                    ))
                ) : (
                    <p className="font-semibold">
                        You don't have any saved prescriptions
                    </p>
                )}
            </div>
            {openModal ? (
                <aside className="fixed inset-0 flex justify-center items-center z-10">
                    <div
                        onClick={() => setOpenModal(false)}
                        className="fixed inset-0 bg-black opacity-50"
                    ></div>
                    <div className="bg-white flex flex-col space-y-6 w-[80%] h-[60%] md:w-[60%] lg:w-[50%] overflow-y-auto rounded-2xl z-20">
                        <div className="flex justify-between items-center sticky top-0 bg-white z-2 p-2 border-b-[1px] border-[#035fe9]">
                            <div>
                                <GrFormPrevious
                                    onClick={() => handlePrevPrescription()}
                                    className="hover:scale-110 transition text-[#035fe9] w-10 h-10 cursor-pointer p-2 rounded-full bg-white hover:bg-gray-100"
                                />
                            </div>
                            <div className="text-[#035fe9] font-bold text-xl">
                                Prescription List
                            </div>
                            <div>
                                <MdOutlineNavigateNext
                                    onClick={() => handleNextPrescription()}
                                    className="hover:scale-110 transition text-[#035fe9] w-10 h-10 cursor-pointer p-2 rounded-full bg-white hover:bg-gray-100"
                                />
                            </div>
                        </div>
                        <div className="grow space-y-4 px-4 overflow-x-auto">
                            <MedicationTable
                                medicationList={openPrescription.medicationList}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleDownloadPrescription}
                                className="text-white rounded-full px-4 py-2 bg-[#035fe9] flex items-center space-x-4 m-4 hover:scale-110 transition"
                            >
                                <span>Download pdf</span> <MdDownload />
                            </button>
                        </div>
                    </div>
                </aside>
            ) : null}
        </section>
    )
}

export default PrescriptionsPage