"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import userImage from "@/images/user.png";
import InputComponent from "@/components/auth/InputComponent";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [changedField, setChangedField] = useState("");

  const [formValid, setFormValid] = useState(false);


  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    birthYear: "",
    residenceCountry: "",
    specialization: "",
    languages: "",
    thirtyMinPrice: "",
    sixtyMinPrice: "",
  });

  const [tempData, setTempData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    birthYear: "",
    residenceCountry: "",
    specialization: "",
    languages: [],
    thirtyMinPrice: "",
    sixtyMinPrice: "",
  });

  const [loading, setLoading] = useState(true);

  const [oldPasswordError, setOldPasswordError] = useState(false);

  let token: string | null = "";


  useEffect(() => {
    token = localStorage.getItem("jwt");
    fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/profile/info`, {
      mode: "cors", headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(response => (setTempData(() => (response.formattedDoctor))))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let languagesString = tempData.languages.join(" ");
    const tempObj = { ...tempData, languages: languagesString };
    setProfileData(() => tempObj);
  }, [tempData]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const formFields = [
    { name: "oldPassword", type: "Old Password" },
    { name: "password", type: "New Password" },
    { name: "confirmPassword", type: "Confirm New Password" }
  ];

  const submitButtonClass = [
    "bg-sky-500 text-neutral-50 font-medium	p-3.5 border border-solid rounded-full cursor-pointer",
    "transition-[background-color] disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed",
    "enabled:bg-sky-500"
  ].join(" ");

  const validateFieldsChosen = () => {
    for (let key in formData) {
      if (!(formData[key as keyof typeof formData])) {
        return false;
      }
    }
    return true;
  };

  const validatePassword = () => {
    let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    let changedValidation = false;
    if (!formData.password || (formData.password && passwordPattern.test(formData.password))) {
      if (errorMessage.password !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, password: "", }));
    }

    else {
      if (errorMessage.password === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, password: "Password Must Contain 8+ Characters Including Atleast 1 Number, 1 Character, 1 Symbol", }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateConfirmPassword = () => {
    let changedValidation = false;

    if (formData.confirmPassword && formData.confirmPassword !== formData.password) {
      if (errorMessage.confirmPassword === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, confirmPassword: "Passwords Don't Match", }));
    }

    else {
      if (errorMessage.confirmPassword !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, confirmPassword: "", }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateForm = () => {
    switch (changedField) {
      case "password":
        validatePassword();
        validateConfirmPassword();
        break;

      case "confirmPassword":
        validateConfirmPassword();
        break;

      default:
        break;
    }

    setChangedField(() => "");

    if (validateFieldsChosen()) {
      for (let key in errorMessage) {
        if (errorMessage[key as keyof typeof errorMessage] !== "") {
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
    try {
      token = localStorage.getItem("jwt");
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/edit/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(formData),
        mode: "cors",
      });

      if (!response.ok) {
        if (response.status === 400) {
          setOldPasswordError(true);
        }
        throw new Error("Failed To Edit Password");
      }

      window.location.href = "/doctorProfile/view";

    } catch (error) {
      console.error("Error While Editing Password:", error);
    }
  };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      {loading ? <CircularProgress className="absolute top-1/2" /> :
        <>
          <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
            <Image src={userImage} height={120} width={120} alt="User Icon" className="mb-1"></Image>
            <p className="text-blue-500 mb-1 font-semibold">Dr. {profileData.firstName} {profileData.lastName}</p>
          </div>
          <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
            <form onSubmit={handleSubmit}>
              <div className="flex pt-4 mb-3">
                <Link href="/doctorProfile/view" className="text-blue-500 font-bold ml-7 w-1/2">Personal Info</Link>
                <Link href="/doctorProfile/timeSlots" className="font-bold ml-7 mr-7 w-1/2 min-[880px]:mr-0">Time Slots</Link>
              </div>
              <div className="flex">
                <hr className="bg-blue-500 border-none h-0.5 w-1/2"></hr>
                <hr className="bg-neutral-800 border-none h-0.5 w-1/2"></hr>
              </div>
              <div className="p-7">
                {formFields.map((field) => {
                  return (
                    <div key={field.name} className="mb-3 max-w-80">
                      <p className="font-semibold">{field.type}</p>
                      <InputComponent
                        label=""
                        type="password"
                        name={field.name}
                        placeholder={field.type}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        errorText={errorMessage[field.name as keyof typeof errorMessage]}
                      />
                    </div>
                  );
                })}
                <div className="mb-4">
                  <button type="submit" className={submitButtonClass} disabled={!formValid}>Change Password</button>
                </div>
                {oldPasswordError ? <p className="font-semibold text-red-700">Old Password Is Incorrect, Try Again!</p> : <></>}
              </div>
            </form>
          </div>
        </>
      }
    </div>
  );
}

export default ChangePassword;
