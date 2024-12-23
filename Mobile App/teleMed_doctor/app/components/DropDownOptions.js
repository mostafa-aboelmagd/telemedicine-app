export default function dropdownlist(type) {
  if (type === "countries") {
    return [
      {
        label: "Egypt",
        cities: [
          { label: "Cairo" },
          { label: "Alexandria" },
          { label: "Giza" },
          { label: "Luxor" },
          { label: "Aswan" },
          { label: "Sharm El Sheikh" },
          { label: "Hurghada" },
          { label: "Dahab" },
          { label: "Marsa Alam" },
          { label: "El Alamein" },
        ],
      },
      {
        label: "Saudi Arabia",
        cities: [
          { label: "Riyadh" },
          { label: "Jeddah" },
          { label: "Mecca" },
          { label: "Medina" },
          { label: "Dammam" },
          { label: "Taif" },
          { label: "Al Khobar" },
          { label: "Yanbu" },
          { label: "Jubail" },
          { label: "Hail" },
        ],
      },
      {
        label: "Jordan",
        cities: [
          { label: "Amman" },
          { label: "Aqaba" },
          { label: "Irbid" },
          { label: "Zarqa" },
          { label: "Balqa" },
          { label: "Madaba" },
          { label: "Ajloun" },
          { label: "Jerash" },
          { label: "Mafraq" },
          { label: "Karak" },
        ],
      },
      {
        label: "Emirates",
        cities: [
          { label: "Dubai" },
          { label: "Abu Dhabi" },
          { label: "Sharjah" },
          { label: "Ajman" },
          { label: "Fujairah" },
          { label: "Ras Al Khaimah" },
          { label: "Umm Al Quwain" },
          { label: "Al Ain" },
          { label: "Hatta" },
          { label: "Khor Fakkan" },
        ],
      },
    ];
  } else if (type === "gender") {
    return [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ];
  } else if (type === "years") {
    const startYear = 1900;
    const endYear = new Date().getFullYear();
    const years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push({ label: i.toString(), value: i });
    }
    return years;
  } else if (type === "months") {
    const months = [
      { label: "January", value: 0 },
      { label: "February", value: 1 },
      { label: "March", value: 2 },
      { label: "April", value: 3 },
      { label: "May", value: 4 },
      { label: "June", value: 5 },
      { label: "July", value: 6 },
      { label: "August", value: 7 },
      { label: "September", value: 8 },
      { label: "October", value: 9 },
      { label: "November", value: 10 },
      { label: "December", value: 11 },
    ];
    return months;
  } else if (type === "days") {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push({ label: i.toString(), value: i });
    }
    return days;
  } else {
    return ["not a valid argument"]; // Return an empty array if the type is not recognized
  }
}
