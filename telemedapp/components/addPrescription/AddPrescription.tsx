import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";

const AddPrescription = ({ appointmentId }: { appointmentId: number }) => {
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
    return (
        <section>
            <FaPlus
                onClick={() => setOpenModalAdd(true)}
                className="z-10 fixed bottom-[3%] right-[3%] rounded-full w-14 h-14 bg-[#035fe9] p-4 cursor-pointer text-white shadow-md shadow-gray-600 hover:scale-110 transition"
            />
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
                                                <strong>{med.name}</strong> - {med.dose}{/*, {med.frequency}*/}, {med.start} to {med.end}
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
    )
}

export default AddPrescription