import { formatDateString } from '@/utils/date'
import React from 'react'
import { useRouter } from 'next/navigation';
const AppointmentHistoryCard = ({ appointment }: { appointment: any }) => {
    const router = useRouter();

    const handleCardClick = (id: number) => {
        router.push(`/doctorProfile/appointmentDetails?appointment=${id}`);
    };

    return (
        <div onClick={() => handleCardClick(appointment.appointment_id)} className='bg-white rounded-3xl p-4 flex flex-col space-y-4 hover:scale-105 transition shadow-lg cursor-pointer'>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <h2 className='text-sm md:text-lg font-semibold'>Dr. {appointment.doctor_first_name} {appointment.doctor_last_name}</h2>
                    <p className='text-sm md:text-lg text-[#035fe9]'>{appointment.doctor_specialization}</p>
                </div>
                <div className='text-sm md:text-lg font-bold'>{formatDateString(appointment.doctor_availability_day_hour)}</div>
            </div>
            <div className='flex flex-col space-y-2 md:space-y-4'>
                <div className='text-sm md:text-lg font-semibold'>Complaint:</div>
                <div className='italic text-sm md:text-lg grow'>{appointment.appointment_complaint}</div>
            </div>
        </div>
    )
}

export default AppointmentHistoryCard