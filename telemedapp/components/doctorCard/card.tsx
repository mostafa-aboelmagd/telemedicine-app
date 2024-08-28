import React from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoMdAlarm } from "react-icons/io";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import styles from './card.module.css';
import stylesButton from '../navbarComp/navbar.module.css';

const DoctorCard = ({ doctor }: { doctor: any }) => {
    return (
        <div className='bg-white rounded-3xl p-4 flex flex-col space-y-8'>
            <div className='flex space-x-2'>
                <div><img className='w-20 h-20 rounded-full object-cover' src={doctor.image} alt="doc" /></div>
                <div className='flex flex-col space-y-2 grow'>
                    <h2 className='text-sm'>{doctor.name}</h2>
                    <div className='flex justify-between items-center'>
                        <p className='text-[#035fe9] text-sm'>{doctor.title}</p>
                        <p className='text-[#035fe9] text-sm flex items-center'><HiOutlineUserGroup className='h-6 w-6 mr-2' /> {doctor.numSessions} Sessions</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <Stack spacing={1}>
                            <Rating name="rating" defaultValue={doctor.rating} precision={0.01} readOnly />
                        </Stack>
                        <p className='text-[#343a40] text-xs'>{`${doctor.rating} (${doctor.numReviews} Reviews)`}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-2'>
                <div className='text-sm'>Interests:</div>
                <div className='flex'>
                    {doctor.interests.map((interest: string) => <div key={interest} className={styles.text_control + ' text-xs text-center text-[#60A899] bg-[#6CCA871A] px-2 py-1 rounded-full '}>{interest}</div>)}
                </div>
            </div>
            <div className='flex justify-between items-center space-x-2'>
                <div><IoMdAlarm className='h-6 w-6 text-[#035fe9]' /></div>
                <div className='grow text-sm'>Next available: {doctor.nearestApp}</div>
            </div>
            <div className='flex justify-between items-center space-x-2'>
                <FaMoneyBill1Wave className='h-6 w-6 text-[#035fe9]' />
                <div className='text-md grow'>
                    <span className='text-[#035fe9]'>{doctor.fees60min} EGP</span> / 60 min <span className='text-[#035fe9]'>{doctor.fees30min} EGP</span> / 30 min
                </div>
            </div>
            <div className='flex justify-center space-x-12'>
                <button className='text-[#60A899] hover:text-[#4b8377] py-2 rounded-xl w-full'>View Profile</button>
                <button className={stylesButton.gradient_button + ' text-white py-3 rounded-xl w-full '}>Book Now</button>
            </div>
        </div>
    )
}

export default DoctorCard