"use client";
import React, { useState } from 'react'
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { LuShapes } from "react-icons/lu";
import { IoStopwatchOutline } from "react-icons/io5";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { MdMedication } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";
import { PiDotsThreeCircle } from "react-icons/pi";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SortDropDown from '../SortDropDown/sortdropdown';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { colors } from '@mui/material';

const EmptyIcon = () => null;
const FilterComponent = () => {
    const [value, setValue] = React.useState<number[]>([0, 1000]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => { setOpen(!open); };
    const handleChangeSlider = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    const handleChangeDate = () => {
        handleOpen();
    }
    const specializationOptions = [
        { value: 'Relations', label: 'Relations' },
        { value: 'Prenatal Care', label: 'Prenatal Care' },
        { value: 'Reproductive Health', label: 'Reproductive Health' },
        { value: 'Menopause', label: 'Menopause' },
        { value: 'Cataract Surgery', label: 'Cataract Surgery' },
        { value: 'Vision Correction', label: 'Vision Correction' },
        { value: 'Cosmetic Surgery', label: 'Cosmetic Surgery' },
        { value: 'Reconstructive Surgery', label: 'Reconstructive Surgery' },
        { value: 'Burn Treatment', label: 'Burn Treatment' },
        { value: 'Heart Disease', label: 'Heart Disease' },
        { value: 'Hypertension', label: 'Hypertension' },
        { value: 'Cardiac Rehabilitation', label: 'Cardiac Rehabilitation' },
        { value: 'Skin Cancer', label: 'Skin Cancer' },
        { value: 'Acne', label: 'Acne' },
        { value: 'Eczema', label: 'Eczema' },
        { value: 'Epilepsy', label: 'Epilepsy' },
        { value: 'Stroke', label: 'Stroke' },
        { value: 'Multiple Sclerosis', label: 'Multiple Sclerosis' },
        { value: 'Joint Replacement', label: 'Joint Replacement' },
        { value: 'Sports Injuries', label: 'Sports Injuries' },
        { value: 'Fracture Treatment', label: 'Fracture Treatment' },
        { value: 'Child Development', label: 'Child Development' },
        { value: 'Vaccinations', label: 'Vaccinations' },
        { value: 'Pediatric Nutrition', label: 'Pediatric Nutrition' },
        { value: 'Diabetes', label: 'Diabetes' },
        { value: 'Thyroid Disorders', label: 'Thyroid Disorders' },
        { value: 'Hormonal Imbalances', label: 'Hormonal Imbalances' }
    ];
    const countryOptions = [
        { value: 'Egypt', label: 'Egypt' },
        { value: 'Saudi Arabia', label: 'Saudi Arabia' },
        { value: 'United Arab Emirates', label: 'United Arab Emirates' },
        { value: 'Kuwait', label: 'Kuwait' },
        { value: 'Qatar', label: 'Qatar' },
        { value: 'Yemen', label: 'Yemen' },
        { value: 'Syria', label: 'Syria' },
        { value: 'Jordan', label: 'Jordan' },
        { value: 'Iraq', label: 'Iraq' },
        { value: 'Lebanon', label: 'Lebanon' },
        { value: 'Morocco', label: 'Morocco' },
        { value: 'Tunisia', label: 'Tunisia' },
        { value: 'Algeria', label: 'Algeria' },
        { value: 'Libya', label: 'Libya' },
        { value: 'Oman', label: 'Oman' },
        { value: 'United States', label: 'United States' },
        { value: 'Canada', label: 'Canada' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'Australia', label: 'Australia' },
        { value: 'Germany', label: 'Germany' },
        { value: 'France', label: 'France' },
        { value: 'Italy', label: 'Italy' },
        { value: 'Spain', label: 'Spain' },
        { value: 'Mexico', label: 'Mexico' },
        { value: 'India', label: 'India' },
        { value: 'China', label: 'China' },
        { value: 'Japan', label: 'Japan' },
        { value: 'Brazil', label: 'Brazil' },
        { value: 'Russia', label: 'Russia' },
        { value: 'South Africa', label: 'South Africa' },
        { value: 'Nigeria', label: 'Nigeria' },
        { value: 'Argentina', label: 'Argentina' },
        { value: 'Chile', label: 'Chile' },
        { value: 'Colombia', label: 'Colombia' },
        { value: 'Turkey', label: 'Turkey' },
        { value: 'Sweden', label: 'Sweden' },
        { value: 'Norway', label: 'Norway' },
        { value: 'Denmark', label: 'Denmark' },
        { value: 'Switzerland', label: 'Switzerland' }
    ];
    const languageOptions = [
        { value: 'English', label: 'English' },
        { value: 'Arabic', label: 'Arabic' },
        { value: 'Spanish', label: 'Spanish' },
        { value: 'Mandarin', label: 'Mandarin' },
        { value: 'French', label: 'French' },
        { value: 'German', label: 'German' },
        { value: 'Japanese', label: 'Japanese' },
        { value: 'Russian', label: 'Russian' },
        { value: 'Portuguese', label: 'Portuguese' },
        { value: 'Hindi', label: 'Hindi' },
        { value: 'Arabic', label: 'Arabic' },
        { value: 'Bengali', label: 'Bengali' },
        { value: 'Urdu', label: 'Urdu' },
        { value: 'Indonesian', label: 'Indonesian' },
        { value: 'Korean', label: 'Korean' },
        { value: 'Italian', label: 'Italian' },
        { value: 'Dutch', label: 'Dutch' },
        { value: 'Swedish', label: 'Swedish' },
        { value: 'Norwegian', label: 'Norwegian' },
        { value: 'Polish', label: 'Polish' },
        { value: 'Turkish', label: 'Turkish' },
        { value: 'Vietnamese', label: 'Vietnamese' },
        { value: 'Thai', label: 'Thai' },
        { value: 'Greek', label: 'Greek' },
        { value: 'Czech', label: 'Czech' },
    ];
    return (
        <aside className='flex flex-col space-y-6 p-4 border border-[#919395] rounded-[10px] max-h-fit'>
            <h2 className='text-[#035fe9] text-lg font-bold text-center'>Filters</h2>
            <hr />
            <div className='flex flex-col space-y-6'>
                <h3 className='flex items-center text-md text-[#035fe9] font-semibold'>
                    <MdOutlineEventAvailable className='w-6 h-6 mr-2' /> Availability
                </h3>
                <div className='grid grid-cols-2 w-full'>
                    <div>
                        <input id='today' name='today' value='today' type="checkbox" />
                        <label htmlFor="today"> Today</label>
                    </div>
                    <div>
                        <input id='this week' name='this week' value='this week' type="checkbox" />
                        <label htmlFor="this week"> This Week</label>
                    </div>
                    <div>
                        <input id='online' name='online' value='online' type="checkbox" />
                        <label htmlFor="online"> Online</label>
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-6'>
                <h3 className='flex items-center text-md text-[#035fe9] font-semibold'>
                    <MdDateRange className='w-6 h-6 mr-2' /> Specific date or range
                </h3>
                <div onClick={handleOpen}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Choose a date"
                                sx={{ width: 1, borderRadius: 4 }}
                                open={open}
                                onChange={handleChangeDate}
                                closeOnSelect={true}
                                slots={{ openPickerIcon: EmptyIcon }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>
            <div className='flex flex-col space-y-6'>
                <h3 className='flex items-center text-md text-[#035fe9] font-semibold'>
                    <LuShapes className='w-6 h-6 mr-2' /> Areas of interest
                </h3>
                <div>
                    <SortDropDown options={specializationOptions} name='specialization' id='specialization' isMulti={true} />
                </div>
            </div>
            <div className='flex flex-col space-y-6'>
                <h3 className='flex items-center text-md text-[#035fe9] font-semibold'>
                    <IoStopwatchOutline className='w-6 h-6 mr-2' /> Duration
                </h3>
                <div className='flex space-x-4'>
                    <div>
                        <input id='30mins' name='30mins' value='30mins' type="checkbox" />
                        <label htmlFor="30mins"> 30 mins</label>
                    </div>
                    <div>
                        <input id='60mins' name='60mins' value='60mins' type="checkbox" />
                        <label htmlFor="60mins"> 60 mins</label>
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-6'>
                <h3 className='flex items-center text-md text-[#035fe9] font-semibold'>
                    <IoMaleFemaleSharp className='w-6 h-6 mr-2' /> Doctor Gender
                </h3>
                <div className='flex space-x-4'>
                    <div>
                        <input id='male' name='male' value='male' type="checkbox" />
                        <label htmlFor="male"> Male</label>
                    </div>
                    <div>
                        <input id='female' name='female' value='female' type="checkbox" />
                        <label htmlFor="female"> Female</label>
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-6'>
                <h3 className='flex items-center text-md text-[#035fe9] font-semibold'>
                    <FaRegStar className='w-6 h-6 mr-2' /> Ratings
                </h3>
                <div>
                    <Stack spacing={1}>
                        <Rating sx={{ color: '#035fe9' }} name="half-rating" defaultValue={0} precision={0.5} />
                    </Stack>
                </div>
            </div>
            <div className='flex flex-col space-y-6'>
                <h3 className='flex items-center text-md text-[#035fe9] font-semibold'>
                    <FaGlobeAmericas className='w-6 h-6 mr-2' /> Language and country
                </h3>
                <div className='flex flex-col space-y-2'>
                    <SortDropDown options={languageOptions} name='language' id='language' isMulti={true} />
                    <SortDropDown options={countryOptions} name='country' id='country' isMulti={true} />
                </div>
            </div>
            <div className='flex flex-col space-y-6'>
                <h3 className='flex items-center text-md text-[#035fe9] font-semibold'>
                    <FaMoneyBill1Wave className='w-6 h-6 mr-2' /> Session fees
                </h3>
                <div className='px-4'>
                    <Box>
                        <Slider
                            getAriaLabel={() => 'Fees range'}
                            value={value}
                            onChange={handleChangeSlider}
                            valueLabelDisplay="auto"
                            getAriaValueText={value => `${value}`}
                            min={0}
                            max={1000}
                        />
                    </Box>
                </div>
            </div>
            <div className='flex flex-col space-y-6'>
                <h3 className='flex items-center text-md text-[#035fe9] font-semibold'>
                    <MdMedication className='w-6 h-6 mr-2' /> Can prescribe medication
                </h3>
                <div className='flex space-x-4'>
                    <div>
                        <input id='yes' name='yes' value='yes' type="checkbox" />
                        <label htmlFor="yes"> Yes</label>
                    </div>
                    <div>
                        <input id='no' name='no' value='no' type="checkbox" />
                        <label htmlFor="no"> No</label>
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-6'>
                <h3 className='flex items-center text-md text-[#035fe9] font-semibold'>
                    <RiDiscountPercentLine className='w-6 h-6 mr-2' /> Accept promocodes
                </h3>
                <div className='flex space-x-4'>
                    <div>
                        <input id='yes' name='yes' value='yes' type="checkbox" />
                        <label htmlFor="yes"> Yes</label>
                    </div>
                    <div>
                        <input id='no' name='no' value='no' type="checkbox" />
                        <label htmlFor="no"> No</label>
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-6'>
                <h3 className='flex items-center text-md text-[#035fe9] font-semibold'>
                    <PiDotsThreeCircle className='w-6 h-6 mr-2' /> Accept bundles
                </h3>
                <div className='flex space-x-4'>
                    <div>
                        <input id='yes' name='yes' value='yes' type="checkbox" />
                        <label htmlFor="yes"> Yes</label>
                    </div>
                    <div>
                        <input id='no' name='no' value='no' type="checkbox" />
                        <label htmlFor="no"> No</label>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default FilterComponent