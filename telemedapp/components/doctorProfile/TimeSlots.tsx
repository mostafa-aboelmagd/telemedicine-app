"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { FaUserCircle } from "react-icons/fa";

interface TimeIdMapping {
  [key: string]: { [time: string]: string };
}
function TimeSlots() {
  const userImage = <FaUserCircle className="h-32 w-32 text-[#035fe9]" />;
  const [appointmentType, setAppointmentType] = useState("online");
  const [loadingButton, setLoadingButton] = useState(false);

  const days = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

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

  const [dayDate, setDayDate] = useState(days[0]);

  const [timesChosen, setTimesChosen] = useState(
    Object.fromEntries(days.map((day) => [day, new Set<string>()]))
  );

  const [oldTimesId, setOldTimesId] = useState<TimeIdMapping>(
    Object.fromEntries(days.map((day) => [day, { "": "" }]))
  );

  const [oldTimes, setOldTimes] = useState<{ [key: string]: Set<string> }>(
    Object.fromEntries(days.map((day) => [day, new Set<string>()]))
  );

  const [oldTimesTemp, setOldTimesTemp] = useState<{
    [key: string]: { time: string; id: string }[];
  }>(Object.fromEntries(days.map((day) => [day, []])));

  const [toggleChecked, setToggleChecked] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
  });

  const [loading, setLoading] = useState(true);

  let token: string | null = "";
  const convertCodedToDates = (codedTimes: string[]) => {
    const dayCodes: { [key: string]: string } = {
      "1": "saturday",
      "2": "sunday",
      "3": "monday",
      "4": "tuesday",
      "5": "wednesday",
      "6": "thursday",
      "7": "friday",
    };

    const timeSlotCodes: { [key: string]: string } = {
      "01": "09:00:00",
      "02": "10:00:00",
      "03": "11:00:00",
      "04": "12:00:00",
      "05": "13:00:00",
      "06": "14:00:00",
      "07": "15:00:00",
      "08": "16:00:00",
      "09": "17:00:00",
      "10": "18:00:00",
      "11": "19:00:00",
      "12": "20:00:00",
    };

    const tempTimes: { [key: string]: { time: string; id: string }[] } =
      Object.fromEntries(days.map((day) => [day, []]));

    for (const codedTime of codedTimes) {
      const [dayCode, timeSlotCode, state] = codedTime.split("_");
      const dayName = dayCodes[dayCode];

      if (dayName) {
        const time = timeSlotCodes[timeSlotCode];
        const id = codedTime; // Assuming state is the ID

        if (time) {
          tempTimes[dayName].push({ time, id });
        }
      }
    }

    // You can set old times here as needed
    setOldTimesTemp(() => tempTimes);

    const tempTimesForSet: { [key: string]: Set<string> } = Object.fromEntries(
      Object.entries(tempTimes).map(([day, times]) => [
        day,
        new Set(times.map(({ time }) => time)),
      ])
    );

    setOldTimes(() => tempTimesForSet);
    console.log("oldTimes: ", tempTimes);

    return tempTimes;
  };
  const createCodedSlots = (sentObj: Record<string, string[]>) => {
    const dayCodes: Record<string, number> = {
      saturday: 1,
      sunday: 2,
      monday: 3,
      tuesday: 4,
      wednesday: 5,
      thursday: 6,
      friday: 7,
    };

    const timeSlotCodes: Record<string, string> = {
      "9:00:00": "01",
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
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((response) => setProfileData(() => response.formattedDoctor));

      fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/availability/view`, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const timeslots = response.timeslots || []; // Ensure there's a fallback for timeslots

          console.log("API view Response: ", timeslots); // Log the API response for inspection

          // Process the timeslots directly
          convertCodedToDates(timeslots);
        })
        .finally(() => setLoading(false));
    }
  }, [token]);

  useEffect(() => {
    setTimesChosen(() =>
      Object.fromEntries(days.map((day) => [day, new Set<string>()]))
    );

    setOldTimes(() =>
      Object.fromEntries(days.map((day) => [day, new Set<string>()]))
    );

    setOldTimesId(() =>
      Object.fromEntries(days.map((day) => [day, { "": "" }]))
    );

    if (oldTimesTemp || oldTimes) {
      // Loop through oldTimesTemp and update oldTimes and oldTimesId immutably
      Object.entries(oldTimesTemp).forEach(([key, value]) => {
        // Create a new set from the current times
        const newSet = new Set(oldTimes[key]);

        // Create a new object for the IDs
        const newIdObj = { ...oldTimesId[key] };

        // Update the times and IDs for the current day
        value.forEach((time: any) => {
          newSet.add(time.time);
          newIdObj[time.time] = time.id;
        });

        // Set the new values in state
        setOldTimes((prevTimes) => ({
          ...prevTimes,
          [key]: newSet,
        }));
        setOldTimesId((prevTimes) => ({
          ...prevTimes,
          [key]: newIdObj,
        }));
      });
    }
  }, [oldTimesTemp]);

  function getTimeClass(time: string) {
    if (oldTimes[dayDate].has(time)) {
      if (toggleChecked) {
        if (timesChosen[dayDate].has(time)) {
          return clickedTimeClass;
        }
        return timeButtonClass; // Available for deletion
      }
      return disabledTimeClass; // Disabled in normal mode (already selected)
    }

    if (timesChosen[dayDate].has(time)) {
      return clickedTimeClass;
    }

    if (toggleChecked) {
      return disabledTimeClass;
    }

    return timeButtonClass;
  }
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
    `${loadingButton ? "opacity-50 cursor-not-allowed" : ""}`,
    "font-medium rounded-full text-base px-5 py-2.5 text-center me-2 mt-8 mb-2 w-40 h-12",
  ].join(" ");

  const toggleLabelClass = [
    "inline-flex items-center cursor-pointer absolute  right-[15%] ",
    "min-[550px]:right-[10%]",
  ].join(" ");

  const toggleClass = [
    "relative w-11 h-6 bg-emerald-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full",
    "peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white",
    "after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600",
  ].join(" ");

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
      Object.fromEntries(days.map((day) => [day, new Set<string>()]))
    );
    setToggleChecked(() => !toggleChecked); // Toggle between modes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let sentObj: Record<string, string[]> = Object.fromEntries(
      days.map((day) => [day, [] as string[]])
    );

    for (const [key, value] of Object.entries(timesChosen)) {
      sentObj[key] = Array.from(value); // Convert set to array
    }

    const codedSlots = createCodedSlots(sentObj);
    if (codedSlots.length > 0) {
      setLoadingButton(true);
    } else {
      console.error("No time slots selected");
      return;
    }

    // Check for duplicates before sending the request
    const filteredSlots = codedSlots.filter(
      (slot) =>
        !Object.values(oldTimesId).some((day) =>
          Object.values(day).includes(slot)
        )
    );

    console.log("All slots: ", codedSlots);
    console.log("Filtered slots: ", filteredSlots);
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
            body: JSON.stringify(filteredSlots),
            mode: "cors",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add time slots");
        }

        console.log("Successfully added new time slots:", filteredSlots);
        // setLoadingButton(false);

        window.location.href = "/doctorProfile/timeSlots";
      } catch (error) {
        console.error("Error while adding time slots:", error);
        setLoadingButton(false);
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
      console.log("Time slots to delete:", sentTimesId);

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
            body: JSON.stringify(sentTimesId),
            mode: "cors",
          }
        );

        const result = await response.json();
        console.log("Response from server:", result);

        if (!response.ok) {
          throw new Error("Failed to delete time slots");
        }

        window.location.href = "/doctorProfile/timeSlots";
      } catch (error) {
        console.error("Error while deleting time slots:", error);
        setLoadingButton(false);
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
              <p className="text-blue-500 my-1 font-semibold">
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
              <Link href="/doctorProfile/view" className="font-bold ml-7">
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
                    {days.map((day, i) => {
                      return (
                        <button
                          key={days[i]}
                          name={day}
                          onClick={handleDayClick}
                          className={
                            day === dayDate ? clickedDayClass : dayButtonClass
                          }
                        >
                          {day.toUpperCase()}
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
                  {loadingButton
                    ? toggleChecked
                      ? "Deleting..."
                      : "Adding..."
                    : toggleChecked
                    ? "Delete"
                    : "Add"}
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
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TimeSlots;
