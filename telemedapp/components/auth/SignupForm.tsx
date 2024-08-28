"use client";

import { useState, useEffect } from "react";
import InputComponent from "./InputComponent"; // import the InputComponent
import Link from "next/link";

function SignUpForm() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthYear: "",
    gender: "",
    agreeToPrivacyPolicy: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthYear: "",
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

      case "password":
        validatePassword();
        validateConfirmPassword();
        break;

      case "confirmPassword":
        validateConfirmPassword();
        break;

      case "phone":
        validatePhone();
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

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!formValid) {
      return;
    }

    // Perform sign-up logic here
  };

  return (
    <div className="p-5 rounded-xl max-w-md m-auto">
      <h2 className="font-bold text-2xl text-center text-neutral-700 mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          errorText={errorMessage.firstName}
        />
        <InputComponent
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          errorText={errorMessage.lastName}
        />
        <InputComponent
          label="Email"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          errorText={errorMessage.email}
        />
        <InputComponent
          label="Password"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          errorText={errorMessage.password}
        />
        <InputComponent
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          errorText={errorMessage.confirmPassword}
        />
        <InputComponent
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder={formData.phone ? formData.phone : "+20 XXXX XXX XXX"}
          value={formData.phone}
          onChange={handleChange}
          required
          additionalText={errorMessage.phone ? "" : "Please Enter A Valid Phone Number"}
          errorText={errorMessage.phone}
        />
        <InputComponent
          label="Birth Year"
          type="number"
          name="birthYear"
          placeholder="Enter Birth Year"
          value={formData.birthYear}
          onChange={handleChange}
          required
          errorText={errorMessage.birthYear}
        />
        <div className="mb-4">
          <label className="block text-base mb-1.5 font-semibold text-neutral-700">Gender *</label>
          <div className="flex gap-8">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                className="radio align-middle mb-[3px] mr-1"
                checked={formData.gender === "Male"}
                required
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
            <label>
              <input
                type="radio"
                name="gender"
                value="nan"
                onChange={handleChange}
                className="radio align-middle mb-[3px] mr-1"
                checked={formData.gender === "nan"}
              />
              Prefer Not To Say
            </label>
          </div>
        </div>
        <div className="form-control mb-2">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              name="agreeToPrivacyPolicy"
              onChange={handleChange}
              checked={formData.agreeToPrivacyPolicy}
              required
              className="checkbox align-baseline mt-[7px] mr-1"
            />
            <span className="align-top">I agree with the Privacy Policy</span>
          </label>
        </div>
        <p className="mb-2">Already Have An Account? <Link href="/auth/signin" className="text-blue-500 font-semibold cursor-pointer">Sign in</Link></p>
        <button
          type="submit"
          className="bg-sky-500 text-neutral-50 text-lg	p-3.5	w-full border-none rounded-lg cursor-pointer transition-[background-color] disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed enabled:bg-sky-500"
          disabled={!formValid}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
