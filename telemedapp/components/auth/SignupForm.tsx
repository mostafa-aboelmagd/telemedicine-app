"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import patientImage from "@/images/patient.png";
import doctorImage from "@/images/doctor.png";
import InputComponent from "./InputComponent";
import { Calendar } from "primereact/calendar";
import { format } from "date-fns"; // For formatting dates (optional)
import { useRouter } from "next/navigation";
import { useToast } from '@/context/ToastContext';
import OTPDialog from './OTPDialog';


function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("patient");
  const [changedField, setChangedField] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState<{
    type: 'registration' | 'email' | null;
    message: string;
  } | null>(null);
  const [signedUp, setSignedUp] = useState(false);
  const [currCertificateId, setCurrCertificateId] = useState(1);
  const [currExperienceId, setCurrExperienceId] = useState(1);
  const [currInterestId, setCurrInterestId] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
    gender: "",
    country: "",
    city: "",
    speciality: "",
  });

  const [doctorCertificates, setDoctorCertificates] = useState([
    {
      id: 0,
      name: "",
      authority: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const [doctorExperiences, setDoctorExperiences] = useState([
    {
      id: 0,
      title: "",
      firm: "",
      department: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const [doctorInterests, setDoctorInterests] = useState([
    {
      id: 0,
      name: "",
      category: "",
    },
  ]);

  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
    speciality: "",
    country: "",
    city: "",
  });

  const { showSuccess, showError } = useToast();

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      birthDate: "",
      gender: "",
      country: "",
      city: "",
      speciality: "",
    });

    setErrorMessage({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      birthDate: "",
      speciality: "",
      country: "",
      city: "",
    });

    setDoctorCertificates([
      {
        id: 0,
        name: "",
        authority: "",
        startDate: "",
        endDate: "",
      },
    ]);

    setDoctorExperiences([
      {
        id: 0,
        title: "",
        firm: "",
        department: "",
        startDate: "",
        endDate: "",
      },
    ]);

    setDoctorInterests([
      {
        id: 0,
        name: "",
        category: "",
      },
    ]);

    setCurrCertificateId(1);
    setCurrExperienceId(1);
    setCurrInterestId(1);
  }, [userType]);

  const formFields = [
    { name: "firstName", title: "First Name", type: "text" },
    { name: "lastName", title: "Last Name", type: "text" },
    { name: "email", title: "Email", type: "email" },
    { name: "phone", title: "Phone Number", type: "number" },
    { name: "password", title: "Password", type: "password" },
    { name: "confirmPassword", title: "Confirm Password", type: "password" },
    { name: "birthDate", title: "Birth Date", type: "number" },
  ];

  const submitButtonClass = [
    "bg-sky-500 text-neutral-50 text-lg	p-3.5	w-full border-none rounded-lg cursor-pointer transition-[background-color]",
    "disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed enabled:bg-sky-500",
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

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let changedValidation = false;
    if (formData.email && !emailPattern.test(formData.email)) {
      if (errorMessage.email === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        email: "Email Is Invalid",
      }));
    } else {
      if (errorMessage.email !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, email: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validatePassword = () => {
    // Individual validation patterns
    const patterns = {
      minLength: /.{8,}/,            // At least 8 characters
      hasUpperCase: /[A-Z]/,         // At least one uppercase letter
      hasLowerCase: /[a-z]/,         // At least one lowercase letter
      hasNumber: /\d/,               // At least one number
      hasSymbol: /[@$!%*#?&]/        // At least one special character
    };

    let changedValidation = false;
    const password = formData.password;

    if (!password) {
      // Empty password field
      if (errorMessage.password !== "") {
        changedValidation = true;
        setErrorMessage(prevError => ({ ...prevError, password: "" }));
      }
      return;
    }

    // Check all password requirements
    const validations = {
      length: patterns.minLength.test(password),
      upper: patterns.hasUpperCase.test(password),
      lower: patterns.hasLowerCase.test(password),
      number: patterns.hasNumber.test(password),
      symbol: patterns.hasSymbol.test(password)
    };

    // Generate specific error message based on failed validations
    const errorMessages = [];
    if (!validations.length) errorMessages.push("at least 8 characters");
    if (!validations.upper) errorMessages.push("one uppercase letter");
    if (!validations.lower) errorMessages.push("one lowercase letter");
    if (!validations.number) errorMessages.push("one number");
    if (!validations.symbol) errorMessages.push("one special character (@$!%*#?&)");

    const isValid = Object.values(validations).every(v => v);

    if (isValid) {
      if (errorMessage.password !== "") {
        changedValidation = true;
        setErrorMessage(prevError => ({ ...prevError, password: "" }));
      }
    } else {
      if (errorMessage.password === "") {
        changedValidation = true;
      }
      const errorMsg = `Password must contain ${errorMessages.join(", ")}`;
      setErrorMessage(prevError => ({
        ...prevError,
        password: errorMsg
      }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData(prevForm => ({ ...prevForm }));
    }
  };

  const validateConfirmPassword = () => {
    let changedValidation = false;

    if (
      formData.confirmPassword &&
      formData.confirmPassword !== formData.password
    ) {
      if (errorMessage.confirmPassword === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        confirmPassword: "Passwords Don't Match",
      }));
    } else {
      if (errorMessage.confirmPassword !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, confirmPassword: "" }));
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

  const validateForm = () => {
    switch (changedField) {
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

      case "birthDate":
        validateBirthDate();
        break;

      case "speciality":
        validateSpeciality();
        break;

      case "country":
        validateCountry();
        break;

      case "city":
        validateCity();
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
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setChangedField(() => name);
  };

  const handleAddCertificate = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrCertificateId((prevId) => prevId + 1);
    let currCertificates = doctorCertificates;
    currCertificates.push({
      id: currCertificateId,
      name: "",
      authority: "",
      startDate: "",
      endDate: "",
    });
    setDoctorCertificates(() => currCertificates);
  };

  const handleDeleteCertificate = (id: Number) => {
    setCurrCertificateId((prevId) => prevId + 1);
    let currCertificates = [];
    for (let i = 0; i < doctorCertificates.length; i++) {
      if (doctorCertificates[i].id === id) {
        continue;
      }
      currCertificates.push(doctorCertificates[i]);
    }
    setDoctorCertificates(() => currCertificates);
  };

  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, placeholder, value } = e.target;
    let currCertificates = doctorCertificates;
    for (let i = 0; i < currCertificates.length; i++) {
      if (
        currCertificates[i].id + 1 ===
        Number(placeholder[placeholder.length - 1])
      ) {
        if (name === "name") {
          currCertificates[i].name = value;
        } else if (name === "authority") {
          currCertificates[i].authority = value;
        } else if (name === "startDate") {
          currCertificates[i].startDate = value;
        } else if (name === "endDate") {
          currCertificates[i].endDate = value;
        }
        break;
      }
    }
    setDoctorCertificates(() => currCertificates);
    setFormData((prevForm) => ({ ...prevForm }));
  };

  const handleAddExperience = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrExperienceId((prevId) => prevId + 1);
    let currExperiences = doctorExperiences;
    currExperiences.push({
      id: currExperienceId,
      title: "",
      firm: "",
      department: "",
      startDate: "",
      endDate: "",
    });
    setDoctorExperiences(() => currExperiences);
  };

  const handleDeleteExperience = (id: Number) => {
    setCurrExperienceId((prevId) => prevId + 1);
    let currExperiences = [];
    for (let i = 0; i < doctorExperiences.length; i++) {
      if (doctorExperiences[i].id === id) {
        continue;
      }
      currExperiences.push(doctorExperiences[i]);
    }
    setDoctorExperiences(() => currExperiences);
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, placeholder, value } = e.target;
    let currExperiences = doctorExperiences;
    for (let i = 0; i < currExperiences.length; i++) {
      if (
        currExperiences[i].id + 1 ===
        Number(placeholder[placeholder.length - 1])
      ) {
        if (name === "title") {
          currExperiences[i].title = value;
        } else if (name === "firm") {
          currExperiences[i].firm = value;
        } else if (name === "department") {
          currExperiences[i].department = value;
        } else if (name === "startDate") {
          currExperiences[i].startDate = value;
        } else if (name === "endDate") {
          currExperiences[i].endDate = value;
        }
        break;
      }
    }
    setDoctorExperiences(() => currExperiences);
    setFormData((prevForm) => ({ ...prevForm }));
  };

  const handleAddInterest = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrInterestId((prevId) => prevId + 1);
    let currInterests = doctorInterests;
    currInterests.push({
      id: currInterestId,
      name: "",
      category: "",
    });
    setDoctorInterests(() => currInterests);
  };

  const handleDeleteInterest = (id: Number) => {
    setCurrInterestId((prevId) => prevId + 1);
    let currInterests = [];
    for (let i = 0; i < doctorInterests.length; i++) {
      if (doctorInterests[i].id === id) {
        continue;
      }
      currInterests.push(doctorInterests[i]);
    }
    setDoctorInterests(() => currInterests);
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, placeholder, value } = e.target;
    let currInterests = doctorInterests;
    for (let i = 0; i < currInterests.length; i++) {
      if (
        currInterests[i].id + 1 ===
        Number(placeholder[placeholder.length - 1])
      ) {
        if (name === "name") {
          currInterests[i].name = value;
        } else if (name === "category") {
          currInterests[i].category = value;
        }
        break;
      }
    }
    setDoctorInterests(() => currInterests);
    setFormData((prevForm) => ({ ...prevForm }));
  };

  const handleEmailVerification = async () => {
    try {
      setShowOTPDialog(false);
      setIsEmailVerified(true);
      // Continue with the registration process
      if (userType === "patient") {
        await handlePatientRegistration();
      } else {
        await handleDoctorRegistration();
      }
    } catch (error) {
      showError('Verification failed');
      console.error("Error during verification:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientRegistration = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fName: formData.firstName,
            lName: formData.lastName,
            email: formData.email,
            password: formData.password,
            gender: formData.gender,
            phone: formData.phone,
            birthDate: formData.birthDate
              ? format(new Date(formData.birthDate), "yyyy-MM-dd")
              : null,
          }),
          mode: "cors",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.message?.includes('email already exists')) {
          setError({ type: 'email', message: 'This email is already registered!' });
        } else {
          setError({ type: 'registration', message: 'Failed to register. Please try again.' });
        }
        throw new Error("Failed to register");
      }

      setError(null);
      setSignedUp(true);
      showSuccess('Registered Successfully');
      router.replace("/auth/signin");
    } catch (error) {
      setSignedUp(false);
      showError('Registration Failed');
      console.error("Error During Signup:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorRegistration = async () => {
    try {
      const requestBody = {
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthdate: format(new Date(formData.birthDate), "yyyy-MM-dd"),
          city: formData.city,
          country: formData.country,
          email: formData.email,
          gender: formData.gender,
          location: "", // Add if needed
          password: formData.password,
          phone: formData.phone,
          speciality: formData.speciality
        },
        certificates: doctorCertificates.slice(1),
        experiences: doctorExperiences.slice(1),
        interests: doctorInterests.slice(1),
        Languages: []
      };
      console.log("body", requestBody)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          mode: "cors",
        }
      );

      console.log(response);


      if (!response.ok) {
        setSignedUp(false);
        setError({ type: 'registration', message: 'Failed to register. Please try again.' });
        setLoading(false);
        showError('Registration Failed');
        console.log(response.json())
        throw new Error("Failed to register");
      }
      setLoading(false);
      setError(null);
      setSignedUp(true);
      showSuccess('Registration Submitted Successfully');
      setShowPopup(true); // Show the popup
      // router.replace("/");
    } catch (error) {
      showError('Error During Registration');
      console.error("Error During Signup:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!formValid) return;

    // Show OTP dialog instead of immediate registration
    setShowOTPDialog(true);
  };

  const patientImageClass = `w-20 h-20 border-2 border-solid rounded-full ${userType === "patient" ? "border-blue-500" : ""
    } hover:cursor-pointer hover:scale-105`;
  const patientTextClass = `font-bold ${userType === "patient" ? "text-blue-500" : "text-neutral-700"
    }`;
  const doctorImageClass = `w-20 h-20 border-2 border-solid rounded-full ${userType === "doctor" ? "border-blue-500" : ""
    } hover:cursor-pointer hover:scale-105`;
  const doctorTextClass = `font-bold ${userType === "doctor" ? "text-blue-500" : "text-neutral-700"
    }`;

  const handleCertificateDateChange = (date: Date | null, id: number, fieldName: 'startDate' | 'endDate') => {
    let currCertificates = [...doctorCertificates]; // Create a new array to avoid direct state mutation
    const certificateIndex = currCertificates.findIndex(cert => cert.id === id);

    if (certificateIndex !== -1) {
      currCertificates[certificateIndex] = {
        ...currCertificates[certificateIndex],
        [fieldName]: date ? date.toISOString().split('T')[0] : ''
      };
      setDoctorCertificates(currCertificates);
      setFormData(prevForm => ({ ...prevForm })); // Trigger form validation
    }
  };

  const handleExperienceDateChange = (date: Date | null, id: number, fieldName: 'startDate' | 'endDate') => {
    let currExperiences = [...doctorExperiences];
    const experienceIndex = currExperiences.findIndex(exp => exp.id === id);

    if (experienceIndex !== -1) {
      currExperiences[experienceIndex] = {
        ...currExperiences[experienceIndex],
        [fieldName]: date ? date.toISOString().split('T')[0] : ''
      };
      setDoctorExperiences(currExperiences);
      setFormData(prevForm => ({ ...prevForm }));
    }
  };

  const validateSpeciality = () => {
    let changedValidation = false;
    if (!formData.speciality && userType === "doctor") {
      if (errorMessage.speciality === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        speciality: "Speciality is required",
      }));
    } else {
      if (errorMessage.speciality !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, speciality: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateCountry = () => {
    let changedValidation = false;
    if (!formData.country && userType === "doctor") {
      if (errorMessage.country === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        country: "Country is required",
      }));
    } else {
      if (errorMessage.country !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, country: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateCity = () => {
    let changedValidation = false;
    if (!formData.city && userType === "doctor") {
      if (errorMessage.city === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        city: "City is required",
      }));
    } else {
      if (errorMessage.city !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, city: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const handleOTPDialogClose = () => {
    setShowOTPDialog(false);
    setLoading(false); // Reset loading state
  };

  return (
    <div className="p-5 rounded-xl max-w-md m-auto h-screen overflow-y-hidden hover:overflow-y-scroll">
      <h2 className="font-bold text-2xl text-center text-neutral-700 mb-6">
        Sign Up
      </h2>
      <div className="flex gap-8 items-center justify-center my-2">
        <div className="flex flex-col gap-2 items-center">
          <Image
            src={patientImage}
            alt="Patient Image"
            className={patientImageClass}
            onClick={() => setUserType(() => "patient")}
          />
          <p className={patientTextClass}>Patient</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Image
            src={doctorImage}
            alt="Doctor Image"
            className={doctorImageClass}
            onClick={() => setUserType(() => "doctor")}
          />
          <p className={doctorTextClass}>Doctor</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => {
          return (
            <React.Fragment key={field.name}>
              {field.name === "birthDate" ? (
                <>
                  <label className="block text-base mb-1.5 font-semibold text-neutral-700">
                    {field.title} *
                  </label>
                  <Calendar
                    value={formData.birthDate ? new Date(formData.birthDate) : null}
                    onChange={handleDateChange}
                    showIcon
                    dateFormat="yy-mm-dd"
                    placeholder="Enter your birth date"
                    maxDate={new Date()}
                    minDate={new Date('1900-01-01')}
                    yearRange="1900:2024"
                    monthNavigator
                    yearNavigator
                    showButtonBar
                    className={`bg-white w-full rounded-lg border border-solid transition-all ${errorMessage.birthDate
                        ? "border-red-500 focus:border-red-500"
                        : "border-neutral-300 focus:border-sky-500"
                      }`}
                    panelClassName="bg-white rounded-lg shadow-xl border-none p-2"
                    touchUI={window.innerWidth < 768}
                    showOnFocus={false}
                    icon={() => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                    )}
                  />
                  {errorMessage.birthDate && (
                    <small className="text-xs mt-1 text-red-700 font-semibold">
                      {errorMessage.birthDate}
                    </small>
                  )}
                </>
              ) : (
                <InputComponent
                  key={field.name}
                  label={field.title}
                  type={field.type}
                  name={field.name}
                  placeholder={
                    field.name === "phone" && !formData.phone
                      ? "+20 XXXX XXX XXX"
                      : `Enter ${field.title}`
                  }
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  errorText={
                    errorMessage[field.name as keyof typeof errorMessage]
                  }
                  required
                  additionalText={
                    field.name === "phone" && !errorMessage.phone
                      ? "Please Enter A Valid Phone Number"
                      : ""
                  }
                />
              )}
              </React.Fragment>
          );
        })}
        <div className="mb-4">
          <label className="block text-base mb-1.5 font-semibold text-neutral-700">
            Gender *
          </label>
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
          </div>
        </div>
        {userType === "doctor" && (
          <>
            {/* Speciality Field */}
            <InputComponent
              label="Speciality"
              type="text"
              name="speciality"
              placeholder="Enter your medical speciality"
              value={formData.speciality}
              onChange={handleChange}
              required
              errorText={errorMessage.speciality}
            />

            {/* Country Field */}
            <InputComponent
              label="Country"
              type="text"
              name="country"
              placeholder="Enter your country"
              value={formData.country}
              onChange={handleChange}
              required
              errorText={errorMessage.country}
            />

            {/* City Field */}
            <InputComponent
              label="City"
              type="text"
              name="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
              required
              errorText={errorMessage.city}
            />
          </>
        )}
        {userType === "doctor" ? (
          <>
            <div className="mb-4 relative border-2 border-blue-400 rounded-lg">
              <div className="flex justify-between items-center mb-3 p-3">
                <button
                  className="flex gap-2 rounded-xl border-2 p-2 mb-1 border-green-500 hover:bg-green-100 transition-colors"
                  onClick={handleAddCertificate}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 stroke-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <p className="text-green-500 font-bold">Add Certificate</p>
                </button>
                <p className="font-semibold text-xl">Certificates</p>
              </div>
              {doctorCertificates.map((certificate) => (
                <div key={certificate.id} className="p-2 border-t-4 border-blue-400">
                  <InputComponent
                    label="Certificate Name"
                    type="text"
                    id={`certificate-name-${certificate.id}`}
                    name="name"
                    placeholder={`Enter The Name Of Certificate Number ${certificate.id + 1}`}
                    value={certificate.name}
                    onChange={handleCertificateChange}
                    required
                  />
                  <InputComponent
                    label="Certificate Authority"
                    type="text"
                    name="authority"
                    placeholder={
                      "Enter The Authority Of Certificate Number " +
                      (certificate.id + 1)
                    }
                    value={certificate.authority}
                    onChange={handleCertificateChange}
                    required
                  />

                  {/* Start Date Calendar */}
                  <div className="mb-4">
                    <label className="block text-base mb-1.5 font-semibold text-neutral-700">
                      Certificate Start Date *
                    </label>
                    <Calendar
                      value={certificate.startDate ? new Date(certificate.startDate) : null}
                      onChange={(e) => handleCertificateDateChange(e.value as Date | null, certificate.id, 'startDate')}
                      showIcon
                      dateFormat="yy-mm-dd"
                      placeholder="Select start date"
                      maxDate={new Date()}
                      minDate={new Date('1900-01-01')}
                      yearRange="1900:2024"
                      monthNavigator
                      yearNavigator
                      className="w-full"
                      panelClassName="bg-white rounded-lg shadow-xl border-none p-2"
                      touchUI={window.innerWidth < 768}
                      showOnFocus={false}
                    />
                  </div>

                  {/* End Date Calendar */}
                  <div className="mb-4">
                    <label className="block text-base mb-1.5 font-semibold text-neutral-700">
                      Certificate End Date *
                    </label>
                    <Calendar
                      value={certificate.endDate ? new Date(certificate.endDate) : null}
                      onChange={(e) => handleCertificateDateChange(e.value as Date | null, certificate.id, 'endDate')}
                      showIcon
                      dateFormat="yy-mm-dd"
                      placeholder="Select end date"
                      minDate={certificate.startDate ? new Date(certificate.startDate) : new Date('1900-01-01')}
                      yearRange="1900:2050"
                      monthNavigator
                      yearNavigator
                      className="w-full"
                      panelClassName="bg-white rounded-lg shadow-xl border-none p-2"
                      touchUI={window.innerWidth < 768}
                      showOnFocus={false}
                    />
                  </div>

                  <button
                    className="flex gap-2 rounded-xl border-2 p-2 mb-1 border-red-500 hover:bg-red-100 transition-colors"
                    onClick={() => handleDeleteCertificate(certificate.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 stroke-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                    <p className="text-red-500 font-bold">
                      Delete Certificate
                    </p>
                  </button>
                </div>
              ))}
            </div>
            <div className="mb-4 relative border-2 border-blue-400 rounded-lg">
              <div className="flex justify-between items-center mb-3 p-3">
                <button
                  className="flex gap-2 rounded-xl border-2 p-2 mb-1 border-green-500 hover:bg-green-100 transition-colors"
                  onClick={handleAddExperience}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 stroke-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <p className="text-green-500 font-bold">Add Experience</p>
                </button>
                <p className="font-semibold text-xl">Experiences</p>
              </div>
              {doctorExperiences.map((experience) => {
                return (
                  <div
                    key={experience.id}
                    className="p-2 border-t-4 border-blue-400"
                  >
                    <InputComponent
                      label="Experience Title"
                      type="text"
                      name="title"
                      placeholder={
                        "Enter The Title Of Experience Number " +
                        (experience.id + 1)
                      }
                      value={experience.title}
                      onChange={handleExperienceChange}
                      required
                    />
                    <InputComponent
                      label="Experience Firm"
                      type="text"
                      name="firm"
                      placeholder={
                        "Enter The Firm Of Experience Number " +
                        (experience.id + 1)
                      }
                      value={experience.firm}
                      onChange={handleExperienceChange}
                      required
                    />
                    <InputComponent
                      label="Experience Department"
                      type="text"
                      name="department"
                      placeholder={
                        "Enter The Department Of Experience Number " +
                        (experience.id + 1)
                      }
                      value={experience.department}
                      onChange={handleExperienceChange}
                      required
                    />

                    {/* Start Date Calendar */}
                    <div className="mb-4">
                      <label className="block text-base mb-1.5 font-semibold text-neutral-700">
                        Experience Start Date *
                      </label>
                      <Calendar
                        value={experience.startDate ? new Date(experience.startDate) : null}
                        onChange={(e) => handleExperienceDateChange(e.value as Date | null, experience.id, 'startDate')}
                        showIcon
                        dateFormat="yy-mm-dd"
                        placeholder="Select start date"
                        maxDate={new Date()}
                        minDate={new Date('1900-01-01')}
                        yearRange="1900:2024"
                        monthNavigator
                        yearNavigator
                        className="w-full"
                        panelClassName="bg-white rounded-lg shadow-xl border-none p-2"
                        touchUI={window.innerWidth < 768}
                        showOnFocus={false}
                        icon={() => (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                            />
                          </svg>
                        )}
                      />
                    </div>

                    {/* End Date Calendar */}
                    <div className="mb-4">
                      <label className="block text-base mb-1.5 font-semibold text-neutral-700">
                        Experience End Date *
                      </label>
                      <Calendar
                        value={experience.endDate ? new Date(experience.endDate) : null}
                        onChange={(e) => handleExperienceDateChange(e.value as Date | null, experience.id, 'endDate')}
                        showIcon
                        dateFormat="yy-mm-dd"
                        placeholder="Select end date"
                        maxDate={new Date()}
                        minDate={experience.startDate ? new Date(experience.startDate) : new Date('1900-01-01')}
                        yearRange="1900:2024"
                        monthNavigator
                        yearNavigator
                        className="w-full"
                        panelClassName="bg-white rounded-lg shadow-xl border-none p-2"
                        touchUI={window.innerWidth < 768}
                        showOnFocus={false}
                        icon={() => (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                            />
                          </svg>
                        )}
                      />
                    </div>

                    <button
                      className="flex gap-2 rounded-xl border-2 p-2 mb-1 border-red-500 hover:bg-red-100 transition-colors"
                      onClick={() => handleDeleteExperience(experience.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                      <p className="text-red-500 font-bold">
                        Delete Experience
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mb-4 relative border-2 border-blue-400 rounded-lg">
              <div className="flex justify-between items-center mb-3 p-3">
                <button
                  className="flex gap-2 rounded-xl border-2 p-2 mb-1 border-green-500 hover:bg-green-100 transition-colors"
                  onClick={handleAddInterest}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 stroke-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <p className="text-green-500 font-bold">Add Interest</p>
                </button>
                <p className="font-semibold text-xl">Interests</p>
              </div>
              {doctorInterests.map((interest) => (
                <div key={interest.id} className="p-2 border-t-4 border-blue-400">
                  <InputComponent
                    label="Interest Name"
                    type="text"
                    id={`interest-name-${interest.id}`}
                    name="name"
                    placeholder={`Enter The Name Of Interest Number ${interest.id + 1}`}
                    value={interest.name}
                    onChange={handleInterestChange}
                    required
                  />
                  <InputComponent
                    label="Interest Categoryty"
                    type="text"
                    name="category"
                    placeholder={
                      "Enter The Category Of Interest Number " +
                      (interest.id + 1)
                    }
                    value={interest.category}
                    onChange={handleInterestChange}
                    required
                  />
                  <button
                    className="flex gap-2 rounded-xl border-2 p-2 mb-1 border-red-500 hover:bg-red-100 transition-colors"
                    onClick={() => handleDeleteInterest(interest.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 stroke-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                    <p className="text-red-500 font-bold">Delete Interest</p>
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg text-center">
                Your registration is being confirmed. Once it's done, you will get an email.
              </p>
              <button
                className="mt-4 bg-sky-500 text-neutral-50 text-lg p-3.5 w-full border-none rounded-lg cursor-pointer transition-[background-color]"
                onClick={() => {
                  setShowPopup(false);
                  router.replace("/"); // Redirect after closing the popup
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
        <p className="mb-2">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-blue-500 font-semibold cursor-pointer"
          >
            Sign in
          </Link>
        </p>
        {error && (
          <p className={`font-semibold mt-4 mb-2 ${error.type === 'email' ? 'text-yellow-600' : 'text-red-600'
            }`}>
            {error.message}
          </p>
        )}
        {signedUp && (
          <p className="font-semibold text-green-700 mt-4 mb-2">
            Signed up successfully!
          </p>
        )}
        <button
          type="submit"
          className={`${submitButtonClass} disabled:cursor-not-allowed disabled:opacity-50 mb-14`}
          disabled={!formValid || loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>

      {/* Add OTP Dialog */}
      <OTPDialog
        visible={showOTPDialog}
        onHide={() => setShowOTPDialog(false)}
        onVerificationComplete={handleEmailVerification}
        loading={loading}
        userEmail={formData.email}
        onDialogClose={handleOTPDialogClose}
      />
    </div>
  );
}

export default SignUpForm;
