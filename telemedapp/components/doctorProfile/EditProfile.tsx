"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InputComponent from "@/components/auth/InputComponent";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { FaUserCircle } from "react-icons/fa";
import { Calendar } from "primereact/calendar";
import { format } from "date-fns"; // For formatting dates (optional)

function EditProfile() {
  const userImage = <FaUserCircle className="h-32 w-32 text-[#035fe9]" />;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    birthDate: "",
    residenceCountry: "",
    specialization: "",
    languages: "",
    thirtyMinPrice: "",
    sixtyMinPrice: "",
  });

  const [tempForm, setTempForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    birthDate: "",
    residenceCountry: "",
    specialization: "",
    languages: [],
    thirtyMinPrice: "",
    sixtyMinPrice: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    birthDate: "",
    residenceCountry: "",
    specialization: "",
    languages: "",
    thirtyMinPrice: "",
    sixtyMinPrice: "",
  });

  const [changedField, setChangedField] = useState("");

  const [formValid, setFormValid] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  let token: string | null = "";

  useEffect(() => {
    token = localStorage.getItem("jwt");
    if (!token) {
      window.location.href = "/auth/signin";
    }

    else if(Math.floor(new Date().getTime() / 1000) > Number(localStorage.getItem("expiryDate"))) {
      localStorage.clear();
      window.location.href = "/auth/signin";
    }
    
    else {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/profile/info`, {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((response) => setTempForm(() => response.formattedDoctor))
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    let languagesString = tempForm?.languages.join(" ");
    const tempObj = { ...tempForm, languages: languagesString };
    setFormData(() => tempObj);
  }, [tempForm]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const formFields = [
    { name: "firstName", title: "First Name", type: "text" },
    { name: "lastName", title: "Last Name", type: "text" },
    { name: "phone", title: "Phone Number", type: "number" },
    { name: "birthDate", title: "Birth Year", type: "number" },
    { name: "residenceCountry", title: "Residence Country", type: "text" },
    { name: "specialization", title: "Specialization", type: "text" },
    {
      name: "languages",
      title: "Languages (Space Between Each Language)",
      type: "text",
    },
    { name: "thirtyMinPrice", title: "30 Minutes Price", type: "number" },
    { name: "sixtyMinPrice", title: "60 Minutes Price", type: "number" },
  ];

  const submitButtonClass = [
    "bg-sky-500 text-neutral-50 font-medium	p-3.5 border border-solid rounded-full cursor-pointer",
    "transition-[background-color] disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed",
    "enabled:bg-sky-500",
  ].join(" ");

  const validateFieldsChosen = () => {
    for (let key in formData) {
      if (!formData[key as keyof typeof formData]) {
        return false;
      }
    }
    return true;
  };

  const validateFirstName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;

    if (formData.firstName && !regex.test(formData.firstName)) {
      if (errorMessage.firstName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        firstName: "First Name Must Consist Of Only Characters",
      }));
    } else {
      if (errorMessage.firstName !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, firstName: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm })); // Extra rerender needed to correct the current input error status
    }
  };

  const validateLastName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;
    if (formData.lastName && !regex.test(formData.lastName)) {
      if (errorMessage.lastName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        lastName: "Last Name Must Consist Of Only Characters",
      }));
    } else {
      if (errorMessage.lastName !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, lastName: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validatePhone = () => {
    const phonePattern = /^-?\d+$/;
    let changedValidation = false;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      if (errorMessage.phone === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        phone: "Current Phone Number Is Not valid!",
      }));
    } else {
      if (errorMessage.phone !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, phone: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };
  const handleDateChange = (e: any) => {
    const { value } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      birthDate: value,
    }));
    setChangedField(() => "birthDate");
  };
  const validateBirthDate = () => {
    let changedValidation = false;

    if (formData.birthDate) {
      const selectedDate = new Date(formData.birthDate);
      const today = new Date();
      let age = today.getFullYear() - selectedDate.getFullYear();
      const m = today.getMonth() - selectedDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
      }

      if (age < 13) {
        // Example: User must be at least 13 years old
        if (errorMessage.birthDate === "") {
          changedValidation = true;
        }
        setErrorMessage((prevError) => ({
          ...prevError,
          birthDate: "You must be at least 13 years old.",
        }));
      } else {
        if (errorMessage.birthDate !== "") {
          changedValidation = true;
        }
        setErrorMessage((prevError) => ({ ...prevError, birthDate: "" }));
      }
    } else {
      if (errorMessage.birthDate === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        birthDate: "Birth Date is required.",
      }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };
  const validateResidenceCountry = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;

    if (formData.residenceCountry && !regex.test(formData.residenceCountry)) {
      if (errorMessage.residenceCountry === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        residenceCountry: "Country Must Consist Of Only Characters",
      }));
    } else {
      if (errorMessage.residenceCountry !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, residenceCountry: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm })); // Extra rerender needed to correct the current input error status
    }
  };

  const validateSpecialization = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;

    if (formData.specialization && !regex.test(formData.specialization)) {
      if (errorMessage.specialization === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        specialization: "Specialization Must Consist Of Only Characters",
      }));
    } else {
      if (errorMessage.specialization !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, specialization: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm })); // Extra rerender needed to correct the current input error status
    }
  };

  const validateLanguages = () => {
    let regex = /^[a-zA-Z\s]*$/;
    let changedValidation = false;

    if (formData.languages && !regex.test(formData.languages)) {
      if (errorMessage.languages === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        languages: "Languages Must Consist Of Only Characters",
      }));
    } else {
      if (errorMessage.languages !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, languages: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm })); // Extra rerender needed to correct the current input error status
    }
  };

  const validateThirtyMinPrice = () => {
    let regex = /^[0-9]+$/;
    let changedValidation = false;

    if (formData.thirtyMinPrice && !regex.test(formData.thirtyMinPrice)) {
      if (errorMessage.thirtyMinPrice === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        thirtyMinPrice: "Price Must Be A Number",
      }));
    } else {
      if (errorMessage.thirtyMinPrice !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, thirtyMinPrice: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm })); // Extra rerender needed to correct the current input error status
    }
  };

  const validateSixtyMinPrice = () => {
    let regex = /^[0-9]+$/;
    let changedValidation = false;

    if (formData.sixtyMinPrice && !regex.test(formData.sixtyMinPrice)) {
      if (errorMessage.sixtyMinPrice === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        sixtyMinPrice: "Price Must Be A Number",
      }));
    } else {
      if (errorMessage.sixtyMinPrice !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, sixtyMinPrice: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm })); // Extra rerender needed to correct the current input error status
    }
  };

  const validateForm = () => {
    switch (changedField) {
      case "firstName":
        validateFirstName();
        break;

      case "lastName":
        validateLastName();
        break;

      case "phone":
        validatePhone();
        break;

      case "birthDate":
        validateBirthDate();
        break;

      case "residenceCountry":
        validateResidenceCountry();
        break;

      case "specialization":
        validateSpecialization();
        break;

      case "languages":
        validateLanguages();
        break;

      case "thirtyMinPrice":
        validateThirtyMinPrice();
        break;

      case "sixtyMinPrice":
        validateSixtyMinPrice();
        break;

      default:
        break;
    }

    setChangedField(() => "");

    if (validateFieldsChosen()) {
      for (let key in errorMessage) {
        if (errorMessage[key as keyof typeof errorMessage] !== "") {
          setFormValid(() => false);
          return;
        }
      }
      setFormValid(() => true);
    } else {
      setFormValid(() => false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
    setChangedField(() => name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const languagesArr = formData?.languages.split(" ");
    const sentObj = { ...formData, languages: languagesArr };

    for (const [key, value] of Object.entries(tempForm)) {
      if (value === sentObj[key as keyof typeof sentObj]) {
        delete sentObj[key as keyof typeof sentObj];
      }
    }

    try {
      token = localStorage.getItem("jwt");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/edit/info`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(sentObj),
          mode: "cors",
        }
      );

      if (!response.ok) {
        setError(true);
        throw new Error("Failed To Edit Profile Info");
      }

      window.location.href = "/doctorProfile/view";
    } catch (error) {
      console.error("Error While Editing Profile Info:", error);
    }
  };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      {loading ? (
        <CircularProgress className="absolute top-1/2" />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
              {userImage}
              <p className="text-blue-500 mb-1 font-semibold">
                Dr. {tempForm?.firstName} {tempForm?.lastName}
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
          <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
            <form onSubmit={handleSubmit}>
              <div className="flex pt-4 mb-3">
                <Link
                  href="/doctorProfile/view"
                  className="text-blue-500 font-bold ml-7 w-1/2"
                >
                  Personal Info
                </Link>
                <Link
                  href="/doctorProfile/timeSlots"
                  className="font-bold ml-7 mr-7 w-1/2 min-[880px]:mr-0"
                >
                  Time Slots
                </Link>
              </div>
              <div className="flex">
                <hr className="bg-blue-500 border-none h-0.5 w-1/2"></hr>
                <hr className="bg-neutral-800 border-none h-0.5 w-1/2"></hr>
              </div>
              <div className="p-7">
                {formFields.map((field) => {
                  return (
                    <div key={field.title} className="mb-3 max-w-80">
                      <p className="font-semibold">{field.title}</p>
                      {field.name === "birthDate" ? (
                        <>
                          <Calendar
                            value={
                              formData.birthDate
                                ? new Date(formData.birthDate)
                                : null
                            }
                            onChange={handleDateChange}
                            showIcon
                            dateFormat="yy-mm-dd"
                            placeholder="yyyy-mm-dd"
                            maxDate={new Date()}
                            yearRange="1900:2023"
                            className={`bg-neutral-100 w-full py-4 px-6 text-base rounded-lg border border-solid border-neutral-300 grey-100 outline-none transition-[border-color] focus:border-sky-500 focus:bg-neutral-50 ${
                              errorMessage.birthDate ? "p-invalid" : ""
                            }`}
                          />
                          {errorMessage.birthDate && (
                            <small className="text-xs mt-1 text-red-700 font-semibold">
                              {errorMessage.birthDate}
                            </small>
                          )}
                        </>
                      ) : (
                        <InputComponent
                          label=""
                          type={field.type}
                          name={field.name}
                          placeholder={`Enter ${field.title}`}
                          value={
                            formData[field.name as keyof typeof formData] ?? ""
                          }
                          onChange={handleChange}
                          errorText={
                            errorMessage[
                              field.name as keyof typeof errorMessage
                            ]
                          }
                        />
                      )}
                    </div>
                  );
                })}
                <div className="mb-3">
                  <p className="font-semibold">Gender</p>
                  <div className="flex gap-8">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                        className="radio align-middle mb-[3px] mr-1"
                        checked={formData.gender === "Male"}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                        className="radio align-middle mb-[3px] mr-1"
                        checked={formData.gender === "Female"}
                      />
                      Female
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <button
                    type="submit"
                    className={submitButtonClass}
                    disabled={!formValid}
                  >
                    Save Changes
                  </button>
                  {error && (
                    <p className="font-semibold text-red-700 mt-4">
                      Couldn't Edit Profile Info!
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default EditProfile;
