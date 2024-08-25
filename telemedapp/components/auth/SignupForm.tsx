"use client";

import { useState, useEffect } from "react";
import InputComponent from "./InputComponent"; // import the InputComponent
import styles from "./SignupForm.module.css";
import InputComponentStyles from "./InputComponent.module.css";

function SignupForm() {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthYear: "",
    gender: "",
    agreeToPrivacyPolicy: false,
  });

  const [formValid, setFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const {
      nickname,
      email,
      password,
      confirmPassword,
      phone,
      birthYear,
      gender,
      agreeToPrivacyPolicy,
    } = formData;

    if (
      nickname &&
      email &&
      password.length >= 8 &&
      password.match(/\d/) &&
      password === confirmPassword &&
      phone &&
      birthYear &&
      gender &&
      agreeToPrivacyPolicy
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValid) return;

    // Perform sign-in logic here
    console.log("Signing in with:", formData);
  };
  return (
    <div className={styles.signupForm}>
      <h2 className={styles.h2}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="Enter Nickname"
          type="text"
          name="nickname"
          placeholder="Enter Nickname"
          value={formData.nickname}
          onChange={handleChange}
          required
          additionalText="You can use letters a-z, numbers, and periods (- , _ , .)"
        />
        <InputComponent
          label="Enter Email"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className={styles.passwordGroup}>
          <InputComponent
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            additionalText="Use 8 or more characters with a mix of letters and at least one number"
          />
        </div>
        <InputComponent
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <InputComponent
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          additionalText="* Please make sure you enter a valid phone number"
        />
        <InputComponent
          label="Birth Year"
          type="number"
          name="birthYear"
          placeholder="Enter Birth Year"
          value={formData.birthYear}
          onChange={handleChange}
          required
        />

        <div className={styles.formGroup}>
          <label className={InputComponentStyles.inputLabel}>Gender *</label>

          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
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
                checked={formData.gender === "Female"}
                required
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="nan"
                onChange={handleChange}
                checked={formData.gender === "nan"}
                required
              />
              Prefer Not To Say
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              name="agreeToPrivacyPolicy"
              onChange={handleChange}
              checked={formData.agreeToPrivacyPolicy}
              required
            />
            I agree with the Privacy Policy
          </label>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!formValid}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
