const dayCodes: Record<string, string> = {
  "1": "Saturday",
  "2": "Sunday",
  "3": "Monday",
  "4": "Tuesday",
  "5": "Wednesday",
  "6": "Thursday",
  "7": "Friday",
};

const timeSlotCodes: Record<string, string> = {
  "01": "09:00 AM",
  "02": "10:00 AM",
  "03": "11:00 AM",
  "04": "12:00 PM",
  "05": "01:00 PM",
  "06": "02:00 PM",
  "07": "03:00 PM",
  "08": "04:00 PM",
  "09": "05:00 PM",
  "10": "06:00 PM",
  "11": "07:00 PM",
  "12": "08:00 PM",
};

const typeCodes: Record<string, string> = {
  L: "Online",
  S: "Onsite",
};
export const formatDoctorAvailabilities = (slots: string[]) => {
  const availabilityMap: Record<
    string,
    { time: string; id: number; type: string }[]
  > = {};

  slots.forEach((slotId) => {
    const [dayCode, timeCode, typeCode] = slotId.split("_");
    const date = dayCodes[dayCode];

    if (!availabilityMap[date]) {
      availabilityMap[date] = [];
    }

    availabilityMap[date].push({
      time: timeSlotCodes[timeCode],
      id: parseInt(timeCode),
      type: typeCodes[typeCode],
    });
  });

  // Convert the map to an array of dates with slots
  return Object.keys(availabilityMap).map((date) => ({
    date,
    slots: availabilityMap[date],
  }));
};
