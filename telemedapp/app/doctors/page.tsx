"use client";
import DoctorGrid from "@/components/DoctorGrid/grid";
import FilterComponent from "@/components/FilterComponent/filter";
import ReadyTherapist from "@/components/ReadyTherapistComp/readyTherapist";
import SearchBar from "@/components/SearchBar/searchbar";
import SortDropDown from "@/components/SortDropDown/sortdropdown";
import React, { useEffect, useState } from "react";
import { unFormatDate } from "@/utils/date";
import { IoFilter } from "react-icons/io5";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

const Doctors = () => {
  const [minMaxFees, setMinMaxFees] = useState({ min: 0, max: 1000 });
  const [doctors, setDoctors] = useState<any>([]);

  const [specializationOptions, setSpecializationOptions] = useState<any>([]);
  const [countryOptions, setCountryOptions] = useState<any>([]);
  const [languageOptions, setLanguageOptions] = useState<any>([]);

  const handleFillOptions = (doctors: any[]) => {
    let speciality: any = [];
    let country: any = [];
    let language: any = [];
    doctors.forEach((doctor: any) => {
      if (!speciality.includes(doctor.title)) {
        speciality.push({ value: doctor.title, label: doctor.title });
      }
      if (!country.includes(doctor.country)) {
        country.push({ value: doctor.country, label: doctor.country });
      }
      doctor.language.forEach((lang: string) => {
        if (!language.includes(lang)) {
          language.push({ value: lang, label: lang });
        }
      });
    });
    setSpecializationOptions(speciality);
    setCountryOptions(country);
    setLanguageOptions(language);
  };

  const headers = {
    "Content-Type": "application/json",
  };
  const fetchDoctors = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/home`,
      { headers }
    );
    if (!response.ok) {
      console.log("Error: Request sent no data");
    } else {
      const data = await response.json();
      handleFillOptions(data);
      setDoctors(data);
      // handleShownDoctors(filters);
    }
  };
  const [filters, setFilters] = useState({
    speciality: "",
    gender: "",
    rating: "",
    price: [],
    todayDate: "",
    thisWeek: "",
    dateRange1: "",
    dateRange2: "",
    country: [],
    language: [],
    sort: "",
    isOnline: "",
  });
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleShownDoctors = (filters: any) => {
    let filtered = doctors;

    if (filters.todayDate) {
      let today = unFormatDate(filters.todayDate);
      filtered = filtered.filter((doctor: any) => {
        return (
          unFormatDate(doctor.nearestApp).getFullYear() ===
            today.getFullYear() &&
          unFormatDate(doctor.nearestApp).getMonth() === today.getMonth() &&
          unFormatDate(doctor.nearestApp).getDate() === today.getDate()
        );
      });
    }

    if (filters.thisWeek) {
      let thisWeek: any[] = filters.thisWeek.map((date: any) => date);
      filtered = filtered.filter((doctor: any) => {
        return (
          unFormatDate(doctor.nearestApp) >= unFormatDate(thisWeek[0]) &&
          unFormatDate(doctor.nearestApp) <= unFormatDate(thisWeek[1])
        );
      });
    }

    if (filters.isOnline) {
      filtered = filtered.filter(
        (doctor: any) => doctor.isOnline === filters.isOnline
      );
    }

    if (filters.speciality.length > 0) {
      filtered = filtered.filter((doctor: any) =>
        filters.speciality.includes(doctor.title)
      );
    }
    if (filters.gender) {
      filtered = filtered.filter(
        (doctor: any) => doctor.gender === filters.gender
      );
    }
    if (filters.rating) {
      const ratingValue = parseFloat(filters.rating);
      if (!isNaN(ratingValue)) {
        filtered = filtered.filter(
          (doctor: any) => doctor.rating >= ratingValue
        );
      }
    }
    if (filters.price.length > 0) {
      if (!isNaN(filters.price[0]) && !isNaN(filters.price[1])) {
        filtered = filtered.filter(
          (doctor: any) =>
            doctor.fees60min >= filters.price[0] &&
            doctor.fees60min <= filters.price[1]
        );
      }
    }
    if (filters.country.length > 0) {
      filtered = filtered.filter((doctor: any) =>
        filters.country.includes(doctor.country)
      );
    }
    if (filters.language.length > 0) {
      filtered = filtered.filter((doctor: any) =>
        doctor.language.some((lang: string) => filters.language.includes(lang))
      );
    }

    if (filters.sort) {
      switch (filters.sort) {
        case "ascFees":
          filtered = filtered.sort(
            (a: any, b: any) => a.fees60min - b.fees60min
          );
          break;
        case "descFees":
          filtered = filtered.sort(
            (a: any, b: any) => b.fees60min - a.fees60min
          );
          break;
        case "rating":
          filtered = filtered.sort((a: any, b: any) => b.rating - a.rating);
          break;
        case "reset":
          setFilters({ ...filters, sort: "" });
          break;
        default:
          break;
      }
    }

    setFilteredDoctors(filtered);
    return filtered;
  };
  const handleResetFilters = () => {
    setFilters({
      ...filters,
      speciality: "",
      gender: "",
      rating: "",
      price: [],
      todayDate: "",
      thisWeek: "",
      country: [],
      language: [],
      isOnline: "",
    });
  };

  const handleChangeFilterDrop = (selectedOption: any, actionMeta: any) => {
    const { name } = actionMeta;
    const value = selectedOption
      ? Array.isArray(selectedOption)
        ? selectedOption.map((option: any) => option.value)
        : selectedOption.value
      : [];
    setFilters({ ...filters, [name]: value });
  };
  const handleChangeOptions = (e: any) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const getMinMaxFees = () => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    doctors.forEach((doctor: any) => {
      if (doctor.fees60min < min) {
        min = doctor.fees60min;
      }
      if (doctor.fees60min > max) {
        max = doctor.fees60min;
      }
    });
    setMinMaxFees({ min, max });
  };
  const sortOptions = [
    { value: "ascFees", label: "Fees Low to High" },
    { value: "descFees", label: "Fees High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "reset", label: "Reset" },
  ];
  useEffect(() => {
    fetchDoctors();
    getMinMaxFees();
  }, []);
  useEffect(() => {
    if (doctors.length > 0) {
      handleShownDoctors(filters);
    }
  }, [doctors, filters]);
  return (
    <main className="space-y-12">
      <ReadyTherapist />
      <h1 className="text-[#035fe9] font-bold text-[40px] text-center">
        Our Doctors
      </h1>
      <section className="max-w-full md:max-w-[90%] lg:max-w-[85%] xl:max-w-[75%] mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4 h-lvh">
        <SearchBar placeholder="Doctor name or title" />
        <SortDropDown
          handleChangeFilter={handleChangeFilterDrop}
          options={sortOptions}
          name="sort"
          id="sort"
          isMulti={false}
        />
        <div className="lg:hidden ml-4 text-[#035fe9]">
          <button onClick={handleOpenModal} className="flex items-center">
            Filters <IoFilter className="w-4 h-4 ml-2" />
          </button>
        </div>
        <FilterComponent
          specializationOptions={specializationOptions}
          countryOptions={countryOptions}
          languageOptions={languageOptions}
          minFees={minMaxFees.min}
          maxFees={minMaxFees.max}
          handleOpenModal={handleOpenModal}
          openModal={openModal}
          handleChangeOptions={handleChangeOptions}
          handleChangeFilterDrop={handleChangeFilterDrop}
          handleResetFilters={handleResetFilters}
        />
        {filteredDoctors.length > 0 ? (
          <DoctorGrid doctors={filteredDoctors} />
        ) : (
          <CircularProgress className="mx-auto my-10" />
        )}
      </section>
    </main>
  );
};

export default Doctors;
