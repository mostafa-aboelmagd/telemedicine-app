import DoctorGrid from "@/components/DoctorGrid/grid";
import FilterComponent from "@/components/FilterComponent/filter";
import ReadyTherapist from "@/components/ReadyTherapistComp/readyTherapist";
import SearchBar from "@/components/SearchBar/searchbar";
import SortDropDown from "@/components/SortDropDown/sortdropdown";
import React from "react";

const Doctors = () => {
  const doctors: any = [
    {
      id: "1",
      name: "Dr. Ahmed Ali",
      nearestApp: "2024-08-31",
      title: "Psychiatrist",
      rating: 4.5,
      numSessions: 825,
      numReviews: 860,
      fees60min: 200,
      fees30min: 100,
      image: "/assets/doctorM.jpg",
      interests: [
        "Separation Anxiety Disorder, Generalized Anxiety Disorder, and Social Phobia",
        "Relations",
      ],
    },
    {
      id: "2",
      name: "Dr. Mona Aldahan",
      nearestApp: "2024-09-01",
      title: "Gynecologist",
      rating: 4.7,
      numSessions: 900,
      numReviews: 950,
      fees60min: 250,
      fees30min: 125,
      image: "/assets/doctorF.jpg",
      interests: ["Prenatal Care", "Reproductive Health", "Menopause"],
    },
    {
      id: "3",
      name: "Dr. Amina Sameeh",
      nearestApp: "2024-09-02",
      title: "Ophthalmologist",
      rating: 4.6,
      numSessions: 780,
      numReviews: 800,
      fees60min: 220,
      fees30min: 110,
      image: "/assets/doctorF.jpg",
      interests: ["Cataract Surgery", "Glaucoma", "Vision Correction"],
    },
    {
      id: "4",
      name: "Dr. Mohammed Mamdouh",
      nearestApp: "2024-09-03",
      title: "Plastic Surgeon",
      rating: 4.8,
      numSessions: 650,
      numReviews: 700,
      fees60min: 300,
      fees30min: 150,
      image: "/assets/doctorM.jpg",
      interests: [
        "Cosmetic Surgery",
        "Reconstructive Surgery",
        "Burn Treatment",
      ],
    },
    {
      id: "5",
      name: "Dr. Yousef Karim",
      nearestApp: "2024-09-04",
      title: "Cardiologist",
      rating: 4.9,
      numSessions: 1000,
      numReviews: 1050,
      fees60min: 280,
      fees30min: 140,
      image: "/assets/doctorM.jpg",
      interests: ["Heart Disease", "Hypertension", "Cardiac Rehabilitation"],
    },
    {
      id: "6",
      name: "Dr. Omar Tareq",
      nearestApp: "2024-09-05",
      title: "Dermatologist",
      rating: 4.5,
      numSessions: 850,
      numReviews: 900,
      fees60min: 230,
      fees30min: 115,
      image: "/assets/doctorM.jpg",
      interests: ["Skin Cancer", "Acne", "Eczema"],
    },
    {
      id: "7",
      name: "Dr. Ayah Lotfy",
      nearestApp: "2024-09-06",
      title: "Neurologist",
      rating: 4.7,
      numSessions: 720,
      numReviews: 750,
      fees60min: 260,
      fees30min: 130,
      image: "/assets/doctorF.jpg",
      interests: ["Epilepsy", "Stroke", "Multiple Sclerosis"],
    },
    {
      id: "8",
      name: "Dr. Mostafa Barakat",
      nearestApp: "2024-09-07",
      title: "Orthopedic Surgeon",
      rating: 4.6,
      numSessions: 680,
      numReviews: 700,
      fees60min: 270,
      fees30min: 135,
      image: "/assets/doctorM.jpg",
      interests: ["Joint Replacement", "Sports Injuries", "Fracture Treatment"],
    },
    {
      id: "9",
      name: "Dr. Mohsen Hassan",
      nearestApp: "2024-09-08",
      title: "Pediatrician",
      rating: 4.8,
      numSessions: 950,
      numReviews: 1000,
      fees60min: 210,
      fees30min: 105,
      image: "/assets/doctorM.jpg",
      interests: ["Child Development", "Vaccinations", "Pediatric Nutrition"],
    },
    {
      id: "10",
      name: "Dr. Sama Yehya",
      nearestApp: "2024-09-09",
      title: "Endocrinologist",
      rating: 4.7,
      numSessions: 800,
      numReviews: 850,
      fees60min: 240,
      fees30min: 120,
      image: "/assets/doctorF.jpg",
      interests: ["Diabetes", "Thyroid Disorders", "Hormonal Imbalances"],
    },
  ];
  const sortOptions = [
    { value: "ascFees", label: "Fees Low to High" },
    { value: "descFees", label: "Fees High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "reset", label: "Reset" },
  ];
  return (
    <main className="space-y-12">
      <ReadyTherapist />
      <h1 className="text-[#035fe9] font-bold text-[40px] text-center">
        Our Doctors
      </h1>
      <div></div>
      <section className="max-w-[75%] mx-auto grid grid-cols-3 gap-4 h-lvh">
        <SearchBar />
        <SortDropDown
          options={sortOptions}
          name="sort"
          id="sort"
          isMulti={false}
        />
        <FilterComponent />
        <DoctorGrid doctors={doctors} />
      </section>
    </main>
  );
};

export default Doctors;
