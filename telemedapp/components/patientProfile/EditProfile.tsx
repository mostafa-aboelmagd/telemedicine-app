"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import userImage from "@/images/user.png";
import InputComponent from "@/components/auth/InputComponent";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

function EditProfile() {

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    languages: [],
    gender: "",
    birthYear: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    languages: "",
    gender: "",
    birthYear: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    languages: "",
    birthYear: "",
  });

  let token: string | null = "";

  const [changedField, setChangedField] = useState("");

  const [formValid, setFormValid] = useState(false);

  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
=======
  const [error, setError] = useState(false);



  useEffect(() => {
    token = localStorage.getItem("jwt");
>>>>>>> f5fc4e6 (.)
    fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/profile/info`, {
      mode: "cors", headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(response => (setProfileData(() => (response.formattedPatient))))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let languagesString = profileData.languages.join(" ");
    const tempObj = { ...profileData, languages: languagesString };
    setFormData(() => tempObj);
  }, [profileData]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const formFields = [
    { name: "firstName", title: "First Name", type: "text" },
    { name: "lastName", title: "Last Name", type: "text" },
    { name: "email", title: "Email", type: "email" },
    { name: "phone", title: "Phone Number", type: "tel" },
    { name: "languages", title: "Languages (Space Between Each Language)", type: "text" },
    { name: "birthYear", title: "Birth Year", type: "number" },
  ];

  const submitButtonClass = [
    "bg-sky-500 text-neutral-50 font-medium	p-3.5 border border-solid rounded-full cursor-pointer",
    "transition-[background-color] disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed",
    "enabled:bg-sky-500"
  ].join(" ");

  const validateFieldsChosen = () => {
    for(let key in formData) {
      if(!(formData[key as keyof typeof formData])) {
        return false;
      }
    }
    return true;
  };

  const validateFirstName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;

    if(formData.firstName && (!regex.test(formData.firstName))) {
      if(errorMessage.firstName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, firstName: "First Name Must Consist Of Only Characters", }));
    }

    else {
      if(errorMessage.firstName !== "") {
        changedValidation = true; 
      }
      setErrorMessage((prevError) => ({...prevError, firstName: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm}));  // Extra rerender needed to correct the current input error status
    }
  };

  const validateLastName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;
    if(formData.lastName && (!regex.test(formData.lastName))) {
      if(errorMessage.lastName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, lastName: "Last Name Must Consist Of Only Characters", }));
    }

    else {
      if(errorMessage.lastName !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, lastName: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm})); 
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let changedValidation = false;
    if(formData.email && (!emailPattern.test(formData.email))) {
      if(errorMessage.email === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, email: "Email Is Invalid",}));
    }

    else {
      if(errorMessage.email !== "") {
          changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, email: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm})); 
    }
  };

  const validatePhone = () => {
    const phonePattern = /^\+201(0|1|2|5)(\d{8})$/;
    let changedValidation = false;
    if(formData.phone && ((!phonePattern.test(formData.phone)) || formData.phone.length != 13)) {
      if(errorMessage.phone === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, phone: "Current Phone Number Is Not valid!", }));
    }

    else {
      if(errorMessage.phone !== "") {
          changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, phone: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm})); 
    }
  };

  const validateLanguages = () => {
    let regex = /^[a-zA-Z\s]*$/;
    let changedValidation = false;

    if (formData.languages && (!regex.test(formData.languages))) {
      if (errorMessage.languages === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, languages: "Languages Must Consist Of Only Characters", }));
    }

    else {
      if (errorMessage.languages !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, languages: "", }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));  // Extra rerender needed to correct the current input error status
    }
  };

  const validateBirthYear = () => {
    let changedValidation = false;

    if(formData.birthYear && (Number(formData.birthYear) < 1900 || Number(formData.birthYear) > 2011)) {
      if(errorMessage.birthYear === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, birthYear: "Age Isn't Valid",}));
    } 

    else {
      if(errorMessage.birthYear !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, birthYear: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm})); 
    }
  };

  const validateForm = () => {
    switch(changedField) {
      case "firstName":
        validateFirstName();
        break;

      case "lastName":
        validateLastName();
        break;

      case "email":
        validateEmail();
        break;

      case "phone":
        validatePhone();
        break;

      case "languages":
        validateLanguages();
        break;

      case "birthYear":
        validateBirthYear();
        break;

      default:
        break;
    }

    setChangedField(() => "");

    if(validateFieldsChosen()) {
      for(let key in errorMessage) {
        if(errorMessage[key as keyof typeof errorMessage] !== "") {
          setFormValid(() => (false));
          return;
        }
      }
      setFormValid(() => (true));
    }
    else {
      setFormValid(() => (false));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value, }));
    setChangedField(() => (name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const languagesArr = formData.languages.split(" ");
<<<<<<< HEAD
    const sentObj = {...formData, "languages" : languagesArr};
=======
    const sentObj = { ...formData, "languages": languagesArr };

    for (const [key, value] of Object.entries(profileData)) {
      if (value === sentObj[key as keyof typeof sentObj]) {
        delete sentObj[key as keyof typeof sentObj];
      }
    }
    console.log(sentObj);

>>>>>>> f5fc4e6 (.)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/edit/info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentObj),
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Failed To Edit Profile Info");
      }

      window.location.href = "/patientProfile/view";

    } catch (error) {
      console.error("Error While Editing Profile Info:", error);
    }
  };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      {loading ? <CircularProgress className="absolute top-1/2" /> :
        <>
          <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
            <Image src={userImage} height={120} width={120} alt="User Icon" className="mb-1"></Image>
            <p className="text-blue-500 mb-1 font-semibold">{profileData.firstName} {profileData.lastName}</p>
            <div className="flex gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 fill-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
              </svg>
              <p>Wallet</p>
              <p className="text-green-500">(0)</p>
            </div>
          </div>
          <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
            <form onSubmit={handleSubmit}>
              <div className="flex pt-4 mb-3">
                <Link href="/patientProfile/view" className="text-blue-500 font-bold ml-7 w-1/2">Personal Info</Link>
                <Link href="/patientProfile/paymentInfo" className="font-bold ml-7 mr-7 md:mr-0 w-1/2">Payment Info</Link>
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
                      <InputComponent
                        label=""
                        type={field.type}
                        name={field.name}
                        placeholder={`Enter ${field.title}`}
                        value={formData[field.name as keyof typeof formData] ?? ""}
                        onChange={handleChange}
                        errorText={errorMessage[field.name as keyof typeof errorMessage]}
                      />
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
                  <button type="submit" className={submitButtonClass} disabled={!formValid}>Save Changes</button>
                </div>
              </div>
            </form>
          </div>
        </>
      }
    </div>
  );
}

export default EditProfile;
