"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import userImage from "@/images/user.png";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

function TimeSlots() {
  const today = new Date();
  let datesList = [];
  for (let i = 0; i < 7; i++) {
    let newDate = new Date();
    newDate.setDate(today.getDate() + i + 1);
    datesList.push(newDate);
  }

  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  const timesList = {
    "9:00 AM : 10:00 AM": "9:00:00",
    "10:00 AM : 11:00 AM": "10:00:00",
    "11:00 AM : 12:00 PM": "11:00:00",
    "12:00 PM : 1:00 PM": "12:00:00",
    "1:00 PM : 2:00 PM": "13:00:00",
    "2:00 PM : 3:00 PM": "14:00:00",
    "3:00 PM : 4:00 PM": "15:00:00",
    "4:00 PM : 5:00 PM": "16:00:00",
    "5:00 PM : 6:00 PM": "17:00:00",
    "6:00 PM : 7:00 PM": "18:00:00",
    "7:00 PM : 8:00 PM": "19:00:00",
    "8:00 PM : 9:00 PM": "20:00:00",
  }

  const [dayDate, setDayDate] = useState(datesList[0].toDateString());

  const [timesChosen, setTimesChosen] = useState(
    Object.fromEntries(datesList.map(date => [
      date.toDateString(), new Set<String>()
    ])));

  const [oldTimes, setOldTimes] = useState(
    Object.fromEntries(datesList.map(date => [
      date.toDateString(), new Set<String>()
    ])));

  const [oldTimesTemp, setOldTimesTemp] = useState(
    Object.fromEntries(datesList.map(date => [
      date.toDateString(), new Array()
    ])));

  const [oldTimesId, setOldTimesId] = useState(
    Object.fromEntries(datesList.map(date => [
      date.toDateString(), { "": "" }
    ])));

  const [toggleChecked, setToggleChecked] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
  });

  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  useEffect (() => {
    const token = sessionStorage.getItem("jwt");
=======
  let token: string | null = "";

  useEffect(() => {
    token = localStorage.getItem("jwt");
>>>>>>> f5fc4e6 (.)
    fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/profile/info`, {
      mode: "cors",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(response => (setProfileData(() => (response.formattedDoctor))));

    fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/profile/availabilities`, {
      mode: "cors", headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(response => (setOldTimesTemp(() => response.availabilities)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTimesChosen(() => (
      Object.fromEntries(datesList.map(date => [
        date.toDateString(), new Set<String>()
      ]))));

    setOldTimes(() => (
      Object.fromEntries(datesList.map(date => [
        date.toDateString(), new Set<String>()
      ]))));

    setOldTimesId(() => (
      Object.fromEntries(datesList.map(date => [
        date.toDateString(), { "": "" }
      ]))));
    if (oldTimesTemp) {
      for (const [key, value] of Object.entries(oldTimesTemp)) {
        value.map((entry) => {
          let currSet = oldTimes[key];
          currSet?.add(entry.time);
          setOldTimes((prevTimes: any) => ({ ...prevTimes, [key]: currSet }));

          let currObj = oldTimesId[key as keyof typeof oldTimesId];
          if (currObj) {
            currObj[entry.time as keyof typeof currObj] = entry.id;
            setOldTimesId((prevTimes: any) => ({ ...prevTimes, [key]: currObj }));
          }
        })
      }
    }
  }, [oldTimesTemp]);

  const baseButtonClass = "text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";
  const baseDayClass = "w-40 " + baseButtonClass;
  const dayButtonClass = "bg-blue-500 hover:bg-blue-800 " + baseDayClass;
  const clickedDayClass = "bg-blue-800 ring-1 ring-black " + baseDayClass;
  const baseTimeClass = "w-fit " + baseButtonClass;
  const timeButtonClass = `${toggleChecked ? "bg-red-500 hover:bg-red-800 " : "bg-emerald-500 hover:bg-emerald-800 "} ` + baseTimeClass;
  const clickedTimeClass = `${toggleChecked ? "bg-red-800 " : "bg-emerald-800 "} ring-1 ring-black ` + baseTimeClass;
  const disabledTimeClass = "bg-slate-500 cursor-not-allowed " + baseTimeClass;

  const submitButtonClass = [
    `${toggleChecked ? "text-red-600 border-red-600 " : "text-teal-600 border-teal-600 "} bg-white border border-solid`,
    "font-medium rounded-full text-base px-5 py-2.5 text-center me-2 mt-8 mb-2 w-40 h-12"
  ].join(" ");

  const toggleLabelClass = [
    "inline-flex items-center cursor-pointer absolute top-[95.5%] min-[430px]:top-[94%] right-[15%] min-[470px]:top-[92%] min-[550px]:top-[1%]",
    "min-[550px]:right-[10%]"
  ].join(" ");

  const toggleClass = [
    "relative w-11 h-6 bg-emerald-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full",
    "peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white",
    "after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"
  ].join(" ");

  function getTimeClass(time: string) {
    if (oldTimes[dayDate].has(time)) {
      if (toggleChecked) {
        if (timesChosen[dayDate].has(time)) {
          return clickedTimeClass;
        }
        return timeButtonClass; // in the case of deletion we want the already selected times to be available for deletion
      }
      return disabledTimeClass;
    }

    if (timesChosen[dayDate].has(time)) {
      return clickedTimeClass;
    }

    if (toggleChecked) {
      return disabledTimeClass; // in the case of deletion we want the non selected items and the not clicked on items to be disabled
    }

    return timeButtonClass;
  };

  const handleDayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;

    if (dayDate === name) {
      return;
    }

    setDayDate(() => (name));
  };

  const handleTimeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let currSet = timesChosen[dayDate];

    if (e.currentTarget.className === clickedTimeClass) {
      e.currentTarget.className = timeButtonClass;
      currSet.delete(e.currentTarget.name);
    }
    else if (e.currentTarget.className === timeButtonClass) {
      e.currentTarget.className = clickedTimeClass;
      currSet.add(e.currentTarget.name);
    }
    setTimesChosen((prevTimes: any) => ({ ...prevTimes, dayDate: currSet, }));
  };

  const handleChangeToggle = () => {
    setTimesChosen(() => (
      Object.fromEntries(datesList.map(date => [
        date.toDateString(), new Set<String>()
      ]))));

    setToggleChecked(() => (!toggleChecked));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let sentObj = Object.fromEntries(datesList.map(date => [
      date.toDateString(), new Array()
    ]));

    for (const [key, value] of Object.entries(timesChosen)) {
      sentObj[key] = Array.from(value);
    }
    delete sentObj["dayDate"];

    if (!toggleChecked) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/availability/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sentObj),
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error("Failed To Add Time Slots");
        }

        window.location.href = "/doctorProfile/timeSlots";

      } catch (error) {
        console.error("Error While Adding Time Slots:", error);
      }
    }
    else {
      let sentTimesId = new Array();

      for (const [key, value] of Object.entries(sentObj)) {
        value.map(timeEntry => {
          let currObj = oldTimesId[key as keyof typeof oldTimesId]
          let currEntry = currObj[timeEntry as keyof typeof currObj]
          if (currEntry) {
            sentTimesId.push(currEntry);
          }
        })
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/availability/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slots_id: sentTimesId
          }),
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error("Failed To Delete Time Slots");
        }

        window.location.href = "/doctorProfile/timeSlots";

      } catch (error) {
        console.error("Error While Deleting Time Slots:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 min-[980px]:flex-row min-[980px]:items-start">
      {loading ? <CircularProgress className="absolute top-1/2" /> :
        <>
          <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
            <Image src={userImage} height={120} width={120} alt="User Icon" className="mb-1"></Image>
            <p className="text-blue-500 mb-1 font-semibold">Dr. {profileData.firstName} {profileData.lastName}</p>
          </div>
          <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 min-[980px]:basis-7/12 min-[980px]:max-w-full">
            <div className="flex pt-4 mb-3">
              <Link href="/doctorProfile/view" className="font-bold ml-7 w-1/2">Personal Info</Link>
              <Link href="/doctorProfile/timeSlots" className="text-blue-500 font-bold ml-7 mr-7 min-[980px]:mr-0 w-1/2">Time Slots</Link>
            </div>
            <div className="flex">
              <hr className="bg-neutral-800 border-none h-0.5 w-1/2"></hr>
              <hr className="bg-blue-500 border-none h-0.5 w-1/2"></hr>
            </div>
            <div className="p-7 relative">
              <div className="flex gap-16 mt-3 min-[980px]:gap-28">
                <div className="flex flex-col gap-40 min-[430px]:gap-24 min-[470px]:gap-12 min-[550px]:gap-5">
                  {datesList.map((date) => {
                    return <button
                      key={days[date.getDay()]}
                      name={date.toDateString()}
                      onClick={handleDayClick}
                      className={date.toDateString() === dayDate ? clickedDayClass : dayButtonClass}>
                      {days[date.getDay()].toUpperCase()}<br></br>({date.getDate()} / {today.getMonth() + 1} / {today.getFullYear()})
                    </button>;
                  })}
                </div>
                <div className="grid grid-cols-1 gap-5 min-[470px]:grid-cols-2 min-[550px]:grid-cols-3">
                  {Object.entries(timesList).map((timeEntry) => {
                    return <button key={timeEntry[0]} name={timeEntry[1]} onClick={handleTimeClick} className={getTimeClass(timeEntry[1])}>
                      {timeEntry[0]}
                    </button>;
                  })}
                </div>
              </div>
              <button onClick={handleSubmit} className={submitButtonClass}>{toggleChecked ? "Delete" : "Add"}</button>
              <label className={toggleLabelClass}>
                <input type="checkbox" value="" className="sr-only peer" checked={toggleChecked} onChange={handleChangeToggle} />
                <div className={toggleClass}></div>
                <span className="ms-3 text-base font-bold text-black">{toggleChecked ? "DEL" : "ADD"}</span>
              </label>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default TimeSlots;
