// SignInForm.tsx
"use client";

import { useState, useEffect } from "react";
import InputComponent from "./InputComponent"; // Import the reusable InputComponent
import styles from "./SignupForm.module.css";
import Link from "next/link"; // Assuming Next.js for routing

function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formValid, setFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (email && password.length >= 8) {
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
      <h2 className={styles.h2}>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <InputComponent
          label="Enter Email"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputComponent
          label="Password"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className={styles.linksContainer}>
          <Link href="/forgot-password" className={styles.link}>
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!formValid}
        >
          Sign In
        </button>
        <div className={styles.linksContainer}>
          <Link href="/auth/signup" className={styles.link}>
            Don't have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
