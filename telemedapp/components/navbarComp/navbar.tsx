import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
const Navbar = () => {
    return (
        <nav className='h-14 bg-white border border-b-[1px] sticky top-0 z-10'>
            <div className='max-w-[75%] flex justify-between items-center mx-auto'>
                <div className='flex justify-center items-center'>
                    <img className='w-14 h-14' src="assets/logo.png" alt="logo" />
                    <span className='text-xl'>TeleMedPilot</span>
                </div>
                <div className='flex justify-between space-x-4 text-[#4d4d4f] text-sm font-light'>
                    <button className='hover:text-[#035fe9]'>Therapists List</button>
                    <button className='hover:text-[#035fe9]'>Tests</button>
                    <button className='hover:text-[#035fe9]'>Find A therapist</button>
                    <button className='hover:text-[#035fe9]'>Blog</button>
                </div>
                <div className='flex justify-between items-center space-x-6'>
                    <a className='cursor-pointer'>العربيه</a>
                    <button className='border border-[#035fe9] rounded-lg text-[#035fe9] px-12 py-2 my-2'>Sign in</button>
                    <button className={styles.gradient_button + " px-12 py-2 my-2 text-white rounded-lg "}>Sign up</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar