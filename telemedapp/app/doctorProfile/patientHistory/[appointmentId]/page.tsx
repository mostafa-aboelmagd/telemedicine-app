"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AppointmentHistorySummary from '@/components/patientHistoryComps/appointmentHistorySummary';
import CurrentRequest from '@/components/patientHistoryComps/currentRequest';

const PatientHistory = () => {
    const [openModal, setOpenModal] = useState(false);
    const [patientHistory, setPatientHistory] = useState<any>();
    const [appointmentHistory, setAppointmentHistory] = useState<any[]>([]);
    const { appointmentId } = useParams();

    const fetchPatientHistory = async (appId: any, headers: any) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/appointmentDetails/${appId}`, { headers, mode: 'cors' });
            if (!response.ok) {
                throw new Error('Failed to fetch prescriptions');
            }
            const data = await response.json();
            console.log(data);
            // const orderedData = data.sort(
            //     (a: any, b: any) =>
            //         new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
            // );
            setPatientHistory(data.appointment);
        }
        catch (error) {
            console.error(error);
        }
    };
    const fetchAppointmentHistory = async (headers: any) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/PatientSummary/3`, { headers, mode: 'cors' });
        if (!response.ok) {
            throw new Error('Failed to fetch prescriptions');
        }
        const data = await response.json();
        console.log(data);
        setAppointmentHistory(data.appointments);
    }
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
        fetchPatientHistory(appointmentId, headers);
    }, [appointmentId]);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
        fetchAppointmentHistory(headers);
    }, []);
    return (
        <main className='flex-col space-y-6'>
            {patientHistory ? (
                <>
                    <div className="text-2xl md:text-4xl p-6 font-bold text-center text-[#035fe9]">{`${patientHistory.patient_first_name} ${patientHistory.patient_last_name}'s Medical History`}</div>
                    <section className="max-w-full md:max-w-[90%] lg:max-w-[75%] mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
                        <CurrentRequest
                            isFollowUp={patientHistory.appointment_type}
                            time={patientHistory.doctor_availability_day_hour}
                            complaint={patientHistory.appointment_complaint}
                        />
                        {appointmentHistory ? (
                            <AppointmentHistorySummary
                                appointmentHistory={appointmentHistory}
                            />
                        ) : <div className='text-4xl flex items-center justify-center text-black col-span-2'>No past appointments</div>}
                    </section>
                </>
            ) : (
                <div className='text-4xl flex h-screen items-center justify-center text-[#035fe9]'>Loading patient history...</div>
            )}
        </main>
    );
};

export default PatientHistory;
