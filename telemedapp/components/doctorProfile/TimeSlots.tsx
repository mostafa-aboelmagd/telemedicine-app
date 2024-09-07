"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import userImage from "@/images/user.png";

function TimeSlots() {
  const [dayName, setDayName] = useState("sunday");

  const [timesChosen, setTimesChosen] = useState({
    sunday: new Set<String>(),
    monday: new Set<String>(),
    tuesday: new Set<String>(),
    wednesday: new Set<String>(),
    thursday: new Set<String>(),
    friday: new Set<String>(),
    saturday: new Set<String>(),
  });

  const [oldTimes, setOldTimes] = useState({
    sunday: new Set<String>(),
    monday: new Set<String>(),
    tuesday: new Set<String>(),
    wednesday: new Set<String>(),
    thursday: new Set<String>(),
    friday: new Set<String>(),
    saturday: new Set<String>(),
  });

  const [toggleChecked, setToggleChecked] = useState(false);

  const daysList = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const timesList = [ "9:00 AM : 10:00 AM", "10:00 AM : 11:00 AM", "11:00 AM : 12:00 PM", "12:00 PM : 1:00 PM",
                      "1:00 PM : 2:00 PM", "2:00 PM : 3:00 PM", "3:00 PM : 4:00 PM", "4:00 PM : 5:00 PM", "5:00 PM : 6:00 PM",
                      "6:00 PM : 7:00 PM", "7:00 PM : 8:00 PM", "8:00 PM : 9:00 PM"];

  const baseButtonClass = "text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";
  const dayButtonClass = "bg-blue-500 hover:bg-blue-800 " + baseButtonClass;
  const clickedDayClass = "bg-blue-800 ring-1 ring-black " + baseButtonClass;
  const timeButtonClass = `${toggleChecked ? "bg-red-500 hover:bg-red-800 " : "bg-emerald-500 hover:bg-emerald-800 "} ` + baseButtonClass;
  const clickedTimeClass = `${toggleChecked ? "bg-red-800 " : "bg-emerald-800 "} ring-1 ring-black ` + baseButtonClass;
  const disabledTimeClass = "bg-slate-500 cursor-not-allowed " + baseButtonClass;
  const submitButtonClass = [`${toggleChecked ? "text-red-600 border-red-600 " : "text-teal-600 border-teal-600 "} bg-white border border-solid`,
                             "font-medium rounded-full text-base px-5 py-2.5 text-center me-2 mt-8 mb-2 w-40 h-12"].join(" ");
  const toggleClass = ["relative w-11 h-6 bg-emerald-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full",
                        "peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white",
                        "after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"].join(" ");

  function getTimeClass(time: string) {
    if(oldTimes[dayName as keyof typeof oldTimes].has(time)) {
      if(toggleChecked) {
        return timeButtonClass; // in the case of deletion we want the already selected times to be available for deletion
      }
      return disabledTimeClass;
    }

    if(timesChosen[dayName as keyof typeof timesChosen].has(time)) {
      return clickedTimeClass;
    }

    if(toggleChecked) {
      return disabledTimeClass; // in the case of deletion we want the non selected items and the not clicked on items to be disabled
    }

    return timeButtonClass;
  };

  const handleDayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;

    if(dayName === name) {
      return;
    }

    setDayName(() => (name));
  };

  const handleTimeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let currSet = timesChosen[dayName as keyof typeof timesChosen];

    if(e.currentTarget.className === clickedTimeClass) {
      e.currentTarget.className = timeButtonClass;
      currSet.delete(e.currentTarget.name);
    }
    else if(e.currentTarget.className === timeButtonClass) {
      e.currentTarget.className = clickedTimeClass;
      currSet.add(e.currentTarget.name);
    }
    setTimesChosen((prevTimes) => ({...prevTimes, dayName: currSet,}));
  };

  const handleChangeToggle = () => {
    setTimesChosen(() => ({
      sunday: new Set<String>(),
      monday: new Set<String>(),
      tuesday: new Set<String>(),
      wednesday: new Set<String>(),
      thursday: new Set<String>(),
      friday: new Set<String>(),
      saturday: new Set<String>(),
    }));

    setToggleChecked(() => (!toggleChecked));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(timesChosen);
  };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
        <Image src={userImage} height={120} width={120} alt="User Icon" className="mb-1"></Image>
        <p className="text-blue-500 mb-1 font-semibold">Dr. Name</p>
      </div>
      <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
        <div className="flex pt-4 mb-3">
        <Link href="/doctorProfile/view" className="font-bold ml-7 w-1/2">Personal Information</Link>
        <Link href="/" className="text-blue-500 font-bold ml-7 mr-7 md:mr-0 w-1/2">Time Slots</Link>
        </div>
        <div className="flex">
            <hr className="bg-neutral-800 border-none h-0.5 w-1/2"></hr>
            <hr className="bg-blue-500 border-none h-0.5 w-1/2"></hr>
        </div>
        <div className="p-7 relative">
          <div className="flex gap-28 mt-3">
            <div className="flex flex-col gap-5">
              {daysList.map((day) => {
                return <button key={day} name={day} onClick={handleDayClick} className={day === dayName ? clickedDayClass : dayButtonClass}>{day}</button>;
              })}
            </div>
            <div className="grid grid-cols-3 gap-5">
              {Object.keys(timesList).map((time) => {
                return <button key={time} name={time} onClick={handleTimeClick} className={getTimeClass(time)}>{time}</button>;
              })}
            </div>
          </div>
          <button onClick={handleSubmit} className={submitButtonClass}>{toggleChecked ? "Delete" : "Add"}</button>
          <label className="inline-flex items-center cursor-pointer absolute top-[1%] right-[10%]">
            <input type="checkbox" value="" className="sr-only peer" checked={toggleChecked} onChange={handleChangeToggle} />
            <div className={toggleClass}></div>
            <span className="ms-3 text-base font-bold text-black">{toggleChecked ? "DEL" : "ADD"}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default TimeSlots;
