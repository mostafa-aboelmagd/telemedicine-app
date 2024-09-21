"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PrescriptionCard from '@/components/patientProfile/prescriptionCard';
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdDownload } from "react-icons/md";
import MedicationTable from '@/components/patientProfile/medicationTable';
import { FaPlus } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { formatDate } from '@/utils/date';
const PrescriptionsPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openPrescription, setOpenPrescription] = useState<any>({});
    const [prescriptionList, setPrescriptionList] = useState<any[]>([]);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [formData, setFormData] = useState<any[]>([]);
    const [currentMedication, setCurrentMedication] = useState({
        name: "",
        dose: "",
        // frequency: "",
        notes: "",
        start: "",
        end: ""
    });
    const { appointmentId } = useParams();

    const handleDownloadPrescription = () => {
        // Implement download functionality here
    };

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
            if (!response.ok) {
                throw new Error('Failed to fetch prescriptions');
            }
            const data = await response.json();
            const orderedData = data.sort(
                (a: any, b: any) =>
                    new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
            );
            setPrescriptionList(orderedData);
        }
        catch (error) {
            console.error(error);
        }
    };

    const handleUploadPrescription = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.length === 0) {
            alert("Please add at least one medication before uploading.");
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        };
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/patient-prescription/add/${appointmentId}`, {
                headers: headers,
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({ medicationData: formData }),
            });
            if (!response.ok) {
                throw new Error('Failed to upload prescription');
            }
            const data = await response.json();
            console.log('Prescription uploaded successfully:', data);
            setOpenModalAdd(false);
            setFormData([]);
            setCurrentMedication({
                name: "",
                dose: "",
                // frequency: "",
                notes: "",
                start: "",
                end: "",
            });
            fetchPrescriptions(appointmentId, headers);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddMedication = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, dose, start, end, notes } = currentMedication;

        if (!name || !dose || !start || !end) {
            alert("Please fill in all required fields (Name, Dose, Frequency, Start, End).");
            return;
        }

        setFormData((prevFormData) => [
            ...prevFormData,
            { ...currentMedication }
        ]);

        setCurrentMedication({
            name: "",
            dose: "",
            // frequency: "",
            start: "",
            end: "",
            notes: ""
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentMedication((prevMedication) => ({
            ...prevMedication,
            [name]: value,
        }));
    };

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
        fetchPrescriptions(appointmentId, headers);
    }, [appointmentId]);

    return (
        <section>
            <FaPlus
                onClick={() => setOpenModalAdd(true)}
                className="z-10 fixed bottom-[3%] right-[3%] rounded-full w-14 h-14 bg-[#035fe9] p-4 cursor-pointer text-white shadow-md shadow-gray-600 hover:scale-110 transition"
            />
            <div className="text-center text-2xl font-bold text-[#035fe9] p-4">
                Prescriptions of { }
            </div>
            <div className="max-w-[75%] mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
                {prescriptionList.length > 0 ? (
                    prescriptionList.map((prescription) => (
                        <PrescriptionCard
                            key={prescription.id}
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
            {openModal && (
                <aside className="fixed inset-0 flex justify-center items-center z-10">
                    <div
                        onClick={() => setOpenModal(false)}
                        className="fixed inset-0 bg-black opacity-50"
                    ></div>
                    <div className="bg-white flex flex-col space-y-6 w-[80%] h-[60%] md:w-[60%] lg:w-[50%] overflow-y-auto rounded-2xl z-20">
                        <div className="flex justify-between items-center sticky top-0 bg-white z-2 p-2 border-b-[1px] border-[#035fe9]">
                            <GrFormPrevious
                                onClick={handlePrevPrescription}
                                className="hover:scale-110 transition text-[#035fe9] w-10 h-10 cursor-pointer p-2 rounded-full bg-white hover:bg-gray-100"
                            />
                            <div className="text-[#035fe9] font-bold text-xl">
                                Prescription Details
                            </div>
                            <MdOutlineNavigateNext
                                onClick={handleNextPrescription}
                                className="hover:scale-110 transition text-[#035fe9] w-10 h-10 cursor-pointer p-2 rounded-full bg-white hover:bg-gray-100"
                            />
                        </div>
                        <div className="grow space-y-4 px-4 overflow-x-auto">
                            {openPrescription.medicationList ? (
                                <MedicationTable
                                    medicationList={openPrescription.medicationList}
                                />
                            ) : (
                                <p>No medications found.</p>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleDownloadPrescription}
                                className="text-white rounded-full px-4 py-2 bg-[#035fe9] flex items-center space-x-4 m-4 hover:scale-110 transition"
                            >
                                <span>Download PDF</span> <MdDownload />
                            </button>
                        </div>
                    </div>
                </aside>
            )}
            {openModalAdd && (
                <aside className="fixed inset-0 flex justify-center items-center z-10">
                    <div
                        onClick={() => setOpenModalAdd(false)}
                        className="fixed inset-0 bg-black opacity-50"
                    ></div>
                    <div className="bg-white flex flex-col space-y-6 w-[80%] h-[80%] md:w-[60%] lg:w-[50%] overflow-y-auto rounded-2xl z-20">
                        <div className="flex justify-center items-center sticky top-0 bg-white z-2 p-2 border-b-[1px] border-[#035fe9]">
                            <div className="text-[#035fe9] font-bold text-xl text-center">
                                Add a Prescription
                            </div>
                        </div>
                        <div className="grow flex flex-col space-y-4 px-4 overflow-x-auto">
                            <form onSubmit={handleAddMedication} className="flex flex-col space-y-4">
                                <div className="border p-4 rounded-lg">
                                    <h4 className="font-semibold mb-2">Add Medication</h4>
                                    <div className="mb-2">
                                        <label htmlFor="name" className="block font-medium">Name<span className="text-red-500">*</span></label>
                                        <input
                                            id="name"
                                            onChange={handleChange}
                                            name='name'
                                            value={currentMedication.name}
                                            type="text"
                                            className="w-full border p-2 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="dose" className="block font-medium">Dose<span className="text-red-500">*</span></label>
                                        <input
                                            id="dose"
                                            onChange={handleChange}
                                            name='dose'
                                            value={currentMedication.dose}
                                            type="text"
                                            className="w-full border p-2 rounded"
                                            required
                                        />
                                    </div>
                                    {/* <div className="mb-2">
                                        <label htmlFor="frequency" className="block font-medium">Frequency<span className="text-red-500">*</span></label>
                                        <input
                                            id="frequency"
                                            onChange={handleChange}
                                            name='frequency'
                                            value={currentMedication.frequency}
                                            type="text"
                                            className="w-full border p-2 rounded"
                                            required
                                        />
                                    </div> */}
                                    <div className="mb-2">
                                        <label htmlFor="start" className="block font-medium">Start Date<span className="text-red-500">*</span></label>
                                        <input
                                            id="start"
                                            onChange={handleChange}
                                            name='start'
                                            value={currentMedication.start}
                                            type="date"
                                            className="w-full border p-2 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="end" className="block font-medium">End Date<span className="text-red-500">*</span></label>
                                        <input
                                            id="end"
                                            onChange={handleChange}
                                            name='end'
                                            value={currentMedication.end}
                                            type="date"
                                            className="w-full border p-2 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="notes" className="block font-medium">Notes</label>
                                        <textarea
                                            id="notes"
                                            onChange={handleChange}
                                            name='notes'
                                            value={currentMedication.notes}
                                            className="w-full border p-2 rounded"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="text-white rounded-full px-4 py-2 bg-[#035fe9] flex items-center space-x-2 hover:scale-105 transition"
                                    >
                                        <FaPlus /> <span>Add Medication</span>
                                    </button>
                                </div>
                            </form>

                            {/* List of Added Medications */}
                            {formData.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-semibold text-lg mb-2">Added Medications</h4>
                                    <ul className="list-disc list-inside space-y-4">
                                        {formData.map((med, index) => (
                                            <li key={index}>
                                                <strong>{med.name}</strong> - {med.dose}, {med.frequency}, {med.start} to {med.end}
                                                {med.notes && `, Notes: ${med.notes}`}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-around space-x-4">
                            <button
                                onClick={handleUploadPrescription}
                                className="text-white rounded-full px-4 py-2 bg-[#035fe9] flex items-center space-x-2 m-4 hover:scale-105 transition"
                            >
                                <FaUpload /> <span>Upload Prescription</span>
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to discard the current prescription?")) {
                                        setOpenModalAdd(false);
                                        setFormData([]);
                                        setCurrentMedication({
                                            name: "",
                                            dose: "",
                                            // frequency: "",
                                            start: "",
                                            end: "",
                                            notes: ""
                                        });
                                    }
                                }}
                                className="text-gray-700 rounded-full px-4 py-2 bg-gray-200 flex items-center space-x-2 m-4 hover:scale-105 transition"
                            >
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                </aside>
            )}
        </section>
    );
};

export default PrescriptionsPage;
