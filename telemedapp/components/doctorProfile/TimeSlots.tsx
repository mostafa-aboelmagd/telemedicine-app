"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { FaUserCircle } from "react-icons/fa";

function TimeSlots() {
  const userImage = <FaUserCircle className="h-32 w-32 text-[#035fe9]" />;
  const [appointmentType, setAppointmentType] = useState("online");

  const today = new Date();
  let datesList = [];
  for (let i = 0; i < 7; i++) {
    let newDate = new Date();
    newDate.setDate(today.getDate() + i + 1);
    datesList.push(newDate);
  }

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  // 1_01_s : saturday, 9:00 AM : 10:00 AM, onsite
  // 2_12_l : sunday, 9:00 PM : 10:00 PM, online

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
  };

  const [dayDate, setDayDate] = useState(datesList[0].toDateString());

  const [timesChosen, setTimesChosen] = useState(
    Object.fromEntries(
      datesList.map((date) => [date.toDateString(), new Set<String>()])
    )
  );

  const [oldTimes, setOldTimes] = useState(
    Object.fromEntries(
      datesList.map((date) => [date.toDateString(), new Set<String>()])
    )
  );

  const [oldTimesTemp, setOldTimesTemp] = useState(
    Object.fromEntries(
      datesList.map((date) => [date.toDateString(), new Array()])
    )
  );

  const [oldTimesId, setOldTimesId] = useState(
    Object.fromEntries(
      datesList.map((date) => [date.toDateString(), { "": "" }])
    )
  );

  const [toggleChecked, setToggleChecked] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
  });

  const [loading, setLoading] = useState(true);

  let token: string | null = "";

  useEffect(() => {
    token = localStorage.getItem("jwt");
    if (!token) {
      window.location.href = "/auth/signin";
    } else if (
      Math.floor(new Date().getTime() / 1000) >
      Number(localStorage.getItem("expiryDate"))
    ) {
      localStorage.clear();
      window.location.href = "/auth/signin";
    } else {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/profile/info`, {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((response) => setProfileData(() => response.formattedDoctor));

      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/profile/availabilities`,
        {
          mode: "cors",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((response) => response.json())
        .then((response) => setOldTimesTemp(() => response.availabilities))
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    setTimesChosen(() =>
      Object.fromEntries(
        datesList.map((date) => [date.toDateString(), new Set<String>()])
      )
    );

    setOldTimes(() =>
      Object.fromEntries(
        datesList.map((date) => [date.toDateString(), new Set<String>()])
      )
    );

    setOldTimesId(() =>
      Object.fromEntries(
        datesList.map((date) => [date.toDateString(), { "": "" }])
      )
    );
    if (oldTimesTemp) {
      for (const [key, value] of Object.entries(oldTimesTemp)) {
        value.map((entry) => {
          let currSet = oldTimes[key];
          currSet?.add(entry.time);
          setOldTimes((prevTimes: any) => ({ ...prevTimes, [key]: currSet }));

          let currObj = oldTimesId[key as keyof typeof oldTimesId];
          if (currObj) {
            currObj[entry.time as keyof typeof currObj] = entry.id;
            setOldTimesId((prevTimes: any) => ({
              ...prevTimes,
              [key]: currObj,
            }));
          }
        });
      }
    }
  }, [oldTimesTemp]);

  const baseButtonClass =
    "text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";
  const baseDayClass = "w-40 " + baseButtonClass;
  const dayButtonClass = "bg-blue-500 hover:bg-blue-800 " + baseDayClass;
  const clickedDayClass = "bg-blue-800 ring-1 ring-black " + baseDayClass;
  const baseTimeClass = "w-fit " + baseButtonClass;
  const timeButtonClass =
    `${
      toggleChecked
        ? "bg-red-500 hover:bg-red-800 "
        : "bg-emerald-500 hover:bg-emerald-800 "
    } ` + baseTimeClass;
  const clickedTimeClass =
    `${toggleChecked ? "bg-red-800 " : "bg-emerald-800 "} ring-1 ring-black ` +
    baseTimeClass;
  const disabledTimeClass = "bg-slate-500 cursor-not-allowed " + baseTimeClass;

  const submitButtonClass = [
    `${
      toggleChecked
        ? "text-red-600 border-red-600 "
        : "text-teal-600 border-teal-600 "
    } bg-white border border-solid`,
    "font-medium rounded-full text-base px-5 py-2.5 text-center me-2 mt-8 mb-2 w-40 h-12",
  ].join(" ");

  const toggleLabelClass = [
    "inline-flex items-center cursor-pointer absolute top-[95.5%] min-[430px]:top-[94%] right-[15%] min-[470px]:top-[92%] min-[550px]:top-[1%]",
    "min-[550px]:right-[10%]",
  ].join(" ");

  const toggleClass = [
    "relative w-11 h-6 bg-emerald-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full",
    "peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white",
    "after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600",
  ].join(" ");

  function getTimeClass(time: string) {
    // Check if the current day has the time already selected
    if (oldTimes[dayDate].has(time)) {
      if (toggleChecked) {
        // If in deletion mode, allow selected times to be clicked
        if (timesChosen[dayDate].has(time)) {
          return clickedTimeClass;
        }
        return timeButtonClass; // Available for deletion
      }
      return disabledTimeClass; // Disabled in normal mode (already selected)
    }

    // If time is selected for adding
    if (timesChosen[dayDate].has(time)) {
      return clickedTimeClass;
    }

    // If in deletion mode, disable unselected times
    if (toggleChecked) {
      return disabledTimeClass;
    }

    // Available for selection in normal mode
    return timeButtonClass;
  }

  const handleDayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    if (dayDate === name) return; // Prevent unnecessary re-renders
    setDayDate(() => name);
  };

  const handleTimeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let currSet = timesChosen[dayDate];

    // Toggle selection/deselection
    if (e.currentTarget.className === clickedTimeClass) {
      e.currentTarget.className = timeButtonClass;
      currSet.delete(e.currentTarget.name); // Remove selected time
    } else if (e.currentTarget.className === timeButtonClass) {
      e.currentTarget.className = clickedTimeClass;
      currSet.add(e.currentTarget.name); // Add selected time
    }
    setTimesChosen((prevTimes: any) => ({ ...prevTimes, [dayDate]: currSet }));
  };

  const handleChangeToggle = () => {
    // Reset selection when toggling between add and delete mode
    setTimesChosen(() =>
      Object.fromEntries(
        datesList.map((date) => [date.toDateString(), new Set<String>()])
      )
    );
    setToggleChecked(() => !toggleChecked); // Toggle between modes
  };

  const handleCoddedSlots = (sentObj: Record<string, string[]>) => {
    const dayCodes: Record<string, number> = {
      Sun: 1,
      Mon: 2,
      Tue: 3,
      Wed: 4,
      Thu: 5,
      Fri: 6,
      Sat: 7,
    };

    const timeSlotCodes: Record<string, string> = {
      "09:00:00": "01",
      "10:00:00": "02",
      "11:00:00": "03",
      "12:00:00": "04",
      "13:00:00": "05",
      "14:00:00": "06",
      "15:00:00": "07",
      "16:00:00": "08",
      "17:00:00": "09",
      "18:00:00": "10",
      "19:00:00": "11",
      "20:00:00": "12",
    };

    let codedSlots: string[] = [];

    for (const [day, timeSlots] of Object.entries(sentObj)) {
      const dayCode = dayCodes[day.split(" ")[0]];

      for (const time of timeSlots) {
        const timeCode = timeSlotCodes[time];
        const typeCode = appointmentType === "online" ? "L" : "S";
        codedSlots.push(`${dayCode}_${timeCode}_${typeCode}`);
      }
    }

    return codedSlots;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let sentObj: Record<string, string[]> = Object.fromEntries(
      datesList.map((date) => [date.toDateString(), [] as string[]])
    );

    // for (const [key, value] of Object.entries(timesChosen)) {
    //   sentObj[key] = Array.from(value); // Convert set to array
    // }

    const codedSlots = handleCoddedSlots(sentObj);

    if (!toggleChecked) {
      // Add time slots
      try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/availability/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(codedSlots),
            mode: "cors",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add time slots");
        }

        window.location.href = "/doctorProfile/timeSlots";
      } catch (error) {
        console.error("Error while adding time slots:", error);
      }
    } else {
      // Delete time slots
      let sentTimesId: string[] = [];

      for (const [key, value] of Object.entries(sentObj)) {
        value.forEach((timeEntry) => {
          let currObj = oldTimesId[key as keyof typeof oldTimesId];
          let currEntry = currObj[timeEntry as keyof typeof currObj];
          if (currEntry) {
            sentTimesId.push(currEntry); // Collect IDs for deletion
          }
        });
      }

      try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/availability/delete`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              slots_id: sentTimesId,
            }),
            mode: "cors",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete time slots");
        }

        window.location.href = "/doctorProfile/timeSlots";
      } catch (error) {
        console.error("Error while deleting time slots:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 min-[980px]:flex-row min-[980px]:items-start">
      {loading ? (
        <CircularProgress className="absolute top-1/2" />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
              {userImage}
              <p className="text-blue-500 mb-1 font-semibold">
                Dr. {profileData?.firstName} {profileData?.lastName}
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              onClick={() =>
                (window.location.href = "/doctorProfile/appointments")
              }
            >
              My Appointments
            </button>
          </div>
          <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 min-[880px]:basis-7/12 min-[880px]:max-w-full">
            <div className="flex pt-4 mb-3 justify-between gap-2">
              <Link href="/" className="font-bold ml-7">
                Personal Info
              </Link>
              <Link
                href="/doctorProfile/timeSlots"
                className="text-blue-500 font-bold"
              >
                Time Slots
              </Link>
              <Link href="/doctorProfile/requests" className="font-bold mr-7">
                Pending Requests
              </Link>
            </div>
            <div className="flex">
              <hr className="bg-neutral-800 border-none h-0.5 w-1/3"></hr>
              <hr className="bg-blue-500 border-none h-0.5 w-1/3"></hr>
              <hr className="bg-neutral-800 border-none h-0.5 w-1/3"></hr>
            </div>
            <div className="p-7 relative">
              <div className="flex items-baseline flex-col justify-between ">
                <div className="flex gap-16 mt-3 min-[980px]:gap-20">
                  <div className="flex flex-col gap-40 min-[430px]:gap-24 min-[470px]:gap-12 min-[550px]:gap-5">
                    {datesList.map((date) => {
                      return (
                        <button
                          key={days[date.getDay()]}
                          name={date.toDateString()}
                          onClick={handleDayClick}
                          className={
                            date.toDateString() === dayDate
                              ? clickedDayClass
                              : dayButtonClass
                          }
                        >
                          {days[date.getDay()].toUpperCase()}
                          <br></br>({date.getDate()} / {today.getMonth() + 1} /{" "}
                          {today.getFullYear()})
                        </button>
                      );
                    })}
                  </div>
                  <div className=" grid grid-cols-1 gap-5 min-[470px]:grid-cols-2 min-[550px]:grid-cols-3">
                    {Object.entries(timesList).map((timeEntry) => {
                      return (
                        <button
                          key={timeEntry[0]}
                          name={timeEntry[1]}
                          onClick={handleTimeClick}
                          className={getTimeClass(timeEntry[1])}
                        >
                          {timeEntry[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className=" flex sm:flex-row flex-col items-baseline md:gap-20 gap-4">
                <button onClick={handleSubmit} className={submitButtonClass}>
                  {toggleChecked ? "Delete" : "Add"}
                </button>
                <div className="flex items-center flex-row gap-4 justify-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="online"
                      checked={appointmentType === "online"}
                      onChange={() => setAppointmentType("online")}
                    />

                    <span className="ml-2">Online</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="onsite"
                      checked={appointmentType === "onsite"}
                      onChange={() => setAppointmentType("onsite")}
                    />

                    <span className="ml-2">Onsite</span>
                  </label>
                </div>
              </div>
            </div>
            <label className={toggleLabelClass}>
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={toggleChecked}
                onChange={handleChangeToggle}
              />
              <div className={toggleClass}></div>
              <span className="ms-3 text-base font-bold text-black">
                {toggleChecked ? "DEL" : "ADD"}
              </span>
            </label>
          </div>
        </>
      )}
    </div>
  );
}

export default TimeSlots;
