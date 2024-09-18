import { format } from "date-fns";

export const formatDoctorAvailabilities = (data: any) => {
  return Object.entries(data.availabilities).map(([date, slots]) => {
    // Format date to YYYY-MM-DD
    const formattedDate = new Date(date).toISOString().split("T")[0];

    // Cast slots to the expected type and format both time and id
    const formattedSlots = (slots as { time: string; id: number }[]).map(
      (slot) => {
        const slotTime = new Date(`1970-01-01T${slot.time}Z`); // Create a date object from the time
        return {
          time: format(slotTime, "hh:mm a"), // Format time to 12-hour AM/PM
          id: slot.id, // Keep the id as is
        };
      }
    );

    return {
      date: formattedDate,
      slots: formattedSlots,
    };
  });
};
