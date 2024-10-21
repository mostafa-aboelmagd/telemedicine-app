import React from 'react'

const HowItWorks = () => {
    return (
        <section className='mb-4'>
            <div className='flex flex-col space-y-8 max-w-full md:max-w-[90%] lg:max-w-[75%] mx-auto'>
                <h1 className='text-[#343a40] font-bold text-3xl mx-auto'>Operation Pannel</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-20 bg-white rounded-2xl p-4 shadow-xl px-[5%] pt-[5%]'>
                    <div className='flex space-x-8'>
                        <div className='flex flex-col justify-between space-y-8'>
                            <div className='text-[#035fe9] font-bold'>Doctor Management </div>
                            <div className='text-[#212529] text-xs'>Efficiently manage doctor profiles, including their specializations, availability, and contact information. Ensure accurate and up-to-date records, optimize scheduling</div>
                        </div>
                    </div>
                    <div className='flex space-x-8'>
                        <div className='flex flex-col justify-between space-y-8'>
                            <div className='text-[#035fe9] font-bold'>Patient Management </div>
                            <div className='text-[#212529] text-xs'>Centralized hub for managing patient records, including medical history, appointments, and communication logs. Access critical information at your fingertips, streamline patient interactions, and deliver personalized care.</div>
                        </div>
                    </div>
                    <div className='flex space-x-8'>
                        <div className='flex flex-col justify-between space-y-8'>
                            <div className='text-[#035fe9] font-bold'>Appointment Management </div>
                            <div className='text-[#212529] text-xs'>User-friendly interface for scheduling, rescheduling, and managing appointments. Reduce no-shows, optimize doctor availability, and improve patient satisfaction with efficient appointment management.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks