"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import userImage from "@/images/user.png";
import InputComponent from "@/components/auth/InputComponent";
import Link from "next/link";

function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
    });

  const [errorMessage, setErrorMessage] = useState({
    password: "",
    confirmPassword: "",
    });

  const [changedField, setChangedField] = useState("");

  const [formValid, setFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevForm) => ({...prevForm, [name]: type === "checkbox" ? checked : value,}));
    setChangedField(() => (name));
  };

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

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
      <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
        <Image src={userImage} height={120} width={120} alt="User Icon" className="mb-1"></Image>
        <p className="text-blue-500 mb-1 font-semibold">FirstName LastName</p>
        <div className="flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 fill-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg>
            <p>Wallet</p>
            <p className="text-green-500">(0)</p>
        </div>
      </div>
      <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
        <form>
          <div className="flex pt-4 mb-3">
              <Link href="/patientProfile/view" className="text-blue-500 font-bold ml-7 w-1/2">Personal Information</Link>
              <Link href="/patientProfile/paymentInfo" className="font-bold ml-7 mr-7 md:mr-0 w-1/2">Payment Information</Link>
          </div>
          <div className="flex">
              <hr className="bg-blue-500 border-none h-0.5 w-1/2"></hr>
              <hr className="bg-neutral-800 border-none h-0.5 w-1/2"></hr>
          </div>
          <div className="p-7">
              <div className="mb-3 max-w-80">
                  <p className="font-semibold">Old Password</p>
                  <InputComponent
                    label=""
                    type="password"
                    name="oldPassword"
                    placeholder="Enter Old Password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                  />
              </div>
              <div className="mb-3 max-w-80">
                  <p className="font-semibold">New Password</p>
                  <InputComponent
                    label=""
                    type="password"
                    name="password"
                    placeholder="Enter New Password"
                    value={formData.password}
                    onChange={handleChange}
                    errorText={errorMessage.password}
                  />
              </div>
              <div className="mb-3 max-w-80">
                  <p className="font-semibold">Confirm New Password</p>
                  <InputComponent
                    label=""
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    errorText={errorMessage.confirmPassword}
                  />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-sky-500 text-neutral-50 font-medium	p-3.5 border border-solid rounded-full cursor-pointer transition-[background-color] disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed enabled:bg-sky-500"
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