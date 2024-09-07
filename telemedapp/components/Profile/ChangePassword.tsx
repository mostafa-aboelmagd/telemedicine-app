"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InputComponent from "@/components/auth/InputComponent";
import ProfileCard from "./ProfileCard";

type userParams = {
  role: string;
};


function ChangePassword({role} : userParams) {
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

  useEffect(() => {
    validateForm();
  }, [formData]);

  const profileLink = (role === "patient" ? "/patientProfile/" : "/doctorProfile/");

  const formFields = [{name : "oldPassword", type: "Old Password"},
                      {name : "password", type : "New Password"},
                      {name : "confirmPassword", type : "Confirm New Password"}]

  const submitButtonClass = ["bg-sky-500 text-neutral-50 font-medium	p-3.5 border border-solid rounded-full cursor-pointer",
                            "transition-[background-color] disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed",
                            "enabled:bg-sky-500"].join(" ");

  const validateFieldsChosen = () => {
    for(let key in formData) {
      if(!(formData[key as keyof typeof formData])) {
        return false;
      }
    }
    return true;
  };

  const validatePassword = () => {
    let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let changedValidation = false;
    if(!formData.password || (formData.password && passwordPattern.test(formData.password))) {
      if(errorMessage.password !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, password: "",}));
    }
    
    else {
      if(errorMessage.password === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, password: "Password Must Contain 8+ Characters Including Atleast One Number",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm})); 
    }
  };

  const validateConfirmPassword = () => {
    let changedValidation = false;

    if(formData.confirmPassword && formData.confirmPassword !== formData.password) {
      if(errorMessage.confirmPassword === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, confirmPassword: "Passwords Don't Match",}));
    } 

    else {
      if(errorMessage.confirmPassword !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, confirmPassword: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm})); 
    }
  };

  const validateForm = () => {
    switch(changedField) {
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
    setFormData((prevForm) => ({...prevForm, [name]: value,}));
    setChangedField(() => (name));
  };

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      <ProfileCard role={role} />
      <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
        <form>
          <div className="flex pt-4 mb-3">
            <Link href={`${profileLink}view`} className="text-blue-500 font-bold ml-7">Personal Information</Link>
            <Link href={role === "patient" ? "/patientProfile/paymentInfo" : "/doctorProfile/timeSlots"} className="font-bold ml-7 mr-7 md:mr-0">
              {role === "patient" ? "Payment Information" : "Time Slots"}
            </Link>
          </div>
          <div className="flex">
            <hr className="bg-blue-500 border-none h-0.5 w-1/2"></hr>
            <hr className="bg-neutral-800 border-none h-0.5 w-1/2"></hr>
          </div>
          <div className="p-7">
            {formFields.map((field) => {
              return (
                <div key={field.type} className="mb-3 max-w-80">
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
              <button
                type="submit"
                className={submitButtonClass}
                disabled={!formValid}
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
