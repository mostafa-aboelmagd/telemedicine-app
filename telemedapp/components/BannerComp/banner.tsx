import React from 'react'
import styles from './banner.module.css'
import buttonStyles from '../navbarComp/navbar.module.css'

const Banner = () => {
    return (
        <section className="h-screen flex ml-[12.5%]">
            <div className='flex flex-col h-full space-y-4'>
                <div className='flex flex-col p-2 space-y-6'>
                    <p className='text-xs text-[#343a40] font-light'>YOU TALK WE HELP</p>
                    <h1 className='text-black text-6xl text-[#343a40] font-light'>Talk <span className='font-bold'>to your therapist online privately </span> anytime anywhere!</h1>
                    <p className='text-lg font-semibold text-[#343a40]'>TeleMedPilot is number one in online Arabic
                        psychotherapy worldwide.</p>
                </div>
                <div className='flex flex-col space-y-4 max-w-[80%]'>
                    <button className={buttonStyles.gradient_button + " px-12 py-2 my-2 text-lg text-white rounded-lg "}>Explore Our Therapists</button>
                    <button className="border border-[#035fe9] rounded-lg text-[#035fe9] px-12 py-2">Get Matched With a Therapist</button>
                </div>
            </div>
            <div>
                <img className='object-cover' src="assets/banner.jpg" alt="banner" />
            </div>
        </section>
    )
}

export default Banner