"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import userImage from "@/images/user.png";
import InputComponent from "@/components/auth/InputComponent";
import Link from "next/link";

function EditDoctorProfile() {
  const [formData, setFormData] = useState({
    firstName: "Example",
    lastName: "Example",
    phone: "+201111111111",
    email: "Example@gmail.com",
    gender: "Male",
    birthYear: "2000",
    residenceCountry: "Egypt",
    specialization: "Dermatology",
    thirtyMinPrice: "600",
    sixtyMinPrice: "1050",
    });

  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthYear: "",
    residenceCountry: "",
    specialization: "",
    thirtyMinPrice: "",
    sixtyMinPrice: "",
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

  const validateFirstName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;

    if(formData.firstName && (!regex.test(formData.firstName))) {
      if(errorMessage.firstName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, firstName: "First Name Can't Contain Numbers",}));
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
      setErrorMessage((prevError) => ({...prevError, lastName: "Last Name Can't Contain Numbers",}));
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
      setErrorMessage((prevError) => ({...prevError, phone: "Current Phone Number Isn't valid !",}));
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

  const validateResidenceCountry = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;

    if(formData.residenceCountry && (!regex.test(formData.residenceCountry))) {
      if(errorMessage.residenceCountry === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, residenceCountry: "Country Can't Contain Spaces Or Numbers",}));
    }

    else {
      if(errorMessage.residenceCountry !== "") {
        changedValidation = true; 
      }
      setErrorMessage((prevError) => ({...prevError, residenceCountry: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm}));  // Extra rerender needed to correct the current input error status
    }
  };

  const validateSpecialization = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;

    if(formData.specialization && (!regex.test(formData.specialization))) {
      if(errorMessage.specialization === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, specialization: "Specialization Can't Contain Spaces Or Numbers",}));
    }

    else {
      if(errorMessage.specialization !== "") {
        changedValidation = true; 
      }
      setErrorMessage((prevError) => ({...prevError, specialization: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm}));  // Extra rerender needed to correct the current input error status
    }
  };

  const validateThirtyMinPrice = () => {
    let regex = /^[0-9]+$/;
    let changedValidation = false;

    if(formData.thirtyMinPrice && (!regex.test(formData.thirtyMinPrice))) {
      if(errorMessage.thirtyMinPrice === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, thirtyMinPrice: "Price Must Be A Number",}));
    }

    else {
      if(errorMessage.thirtyMinPrice !== "") {
        changedValidation = true; 
      }
      setErrorMessage((prevError) => ({...prevError, thirtyMinPrice: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm}));  // Extra rerender needed to correct the current input error status
    }
  };

  const validateSixtyMinPrice = () => {
    let regex = /^[0-9]+$/;
    let changedValidation = false;

    if(formData.sixtyMinPrice && (!regex.test(formData.sixtyMinPrice))) {
      if(errorMessage.sixtyMinPrice === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({...prevError, sixtyMinPrice: "Price Must Be A Number",}));
    }

    else {
      if(errorMessage.sixtyMinPrice !== "") {
        changedValidation = true; 
      }
      setErrorMessage((prevError) => ({...prevError, sixtyMinPrice: "",}));
    }

    if(changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({...prevForm}));  // Extra rerender needed to correct the current input error status
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

      case "birthYear":
        validateBirthYear();
        break;

      case "residenceCountry":
        validateResidenceCountry();
        break;

      case "specialization":
        validateSpecialization();
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
        <p className="text-blue-500 mb-1 font-semibold">Dr. Name</p>
      </div>
      <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
        <form>
          <div className="flex pt-4 mb-3">
              <Link href="/doctorProfile/view" className="text-blue-500 font-bold ml-7">Personal Information</Link>
          </div>
          <hr className="bg-blue-500 border-none h-0.5 w-full"></hr>
          <div className="p-7">
              <div className="mb-3 max-w-80">
                  <p className="font-semibold">First Name</p>
                  <InputComponent
                    label=""
                    type="text"
                    name="firstName"
                    placeholder="Enter New First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    errorText={errorMessage.firstName}
                  />
              </div>
              <div className="mb-3 max-w-80">
                  <p className="font-semibold">Last Name</p>
                  <InputComponent
                    label=""
                    type="text"
                    name="lastName"
                    placeholder="Enter New Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    errorText={errorMessage.lastName}
                  />
              </div>
              <div className="mb-3 max-w-80">
                  <p className="font-semibold">Phone Number</p>
                  <InputComponent
                    label=""
                    type="tel"
                    name="phone"
                    placeholder={formData.phone ? formData.phone : "+20 XXXX XXX XXX"}
                    value={formData.phone}
                    onChange={handleChange}
                    errorText={errorMessage.phone}
                  />
              </div>
              <div className="mb-3 max-w-80">
                  <p className="font-semibold">Email</p>
                  <InputComponent
                    label=""
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    errorText={errorMessage.email}
                  />
              </div>
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
              <div className="mb-4 max-w-80">
                  <p className="font-semibold">Year Of Birth</p>
                  <InputComponent
                    label=""
                    type="number"
                    name="birthYear"
                    placeholder="Enter Birth Year"
                    value={formData.birthYear}
                    onChange={handleChange}
                    errorText={errorMessage.birthYear}
                  />
              </div>
              <div className="mb-4 max-w-80">
                  <p className="font-semibold">Residence Country</p>
                  <InputComponent
                    label=""
                    type="text"
                    name="residenceCountry"
                    placeholder="Enter Residence Country"
                    value={formData.residenceCountry}
                    onChange={handleChange}
                    errorText={errorMessage.residenceCountry}
                  />
              </div>
              <div className="mb-4 max-w-80">
                  <p className="font-semibold">Specialization</p>
                  <InputComponent
                    label=""
                    type="text"
                    name="specialization"
                    placeholder="Enter Specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    errorText={errorMessage.specialization}
                  />
              </div>
              <div className="mb-4 max-w-80">
                  <p className="font-semibold">30 Minute Price</p>
                  <InputComponent
                    label=""
                    type="number"
                    name="thirtyMinPrice"
                    placeholder="Enter 30 Minute Price"
                    value={formData.thirtyMinPrice}
                    onChange={handleChange}
                    errorText={errorMessage.thirtyMinPrice}
                  />
              </div>
              <div className="mb-4 max-w-80">
                  <p className="font-semibold">60 Minute Price</p>
                  <InputComponent
                    label=""
                    type="number"
                    name="sixtyMinPrice"
                    placeholder="Enter 60 Minute Price"
                    value={formData.sixtyMinPrice}
                    onChange={handleChange}
                    errorText={errorMessage.sixtyMinPrice}
                  />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-sky-500 text-neutral-50 font-medium	p-3.5 border border-solid rounded-full cursor-pointer transition-[background-color] disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed enabled:bg-sky-500"
                  disabled={!formValid}
                >
                  Save Changes
                </button>
              </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDoctorProfile;
