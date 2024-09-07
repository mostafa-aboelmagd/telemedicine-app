"use client";

import { useState, useEffect } from "react";
import InputComponent from "./InputComponent"; // Import the reusable InputComponent
import Link from "next/link";

function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formValid, setFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (email && password) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValid) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/users?email=" +
          encodeURIComponent(formData.email),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const users = await response.json();
      const user = users.find(
        (user: any) => user.password_hash === formData.password
      );

      if (user) {
        console.log("User signed in:", user);
        // Redirect to the home page or a profile page
        window.location.href = "/";
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("An error occurred during sign-in");
    }
  };

  return (
    <div className="p-5 rounded-xl max-w-md m-auto">
      <h2 className="font-bold text-2xl text-center text-neutral-700 mb-6">
        Sign in
      </h2>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="Email"
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
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <p className="mb-2">
          Don&apos;t Have An Account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-500 font-semibold cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
        <button
          type="submit"
          className="bg-sky-500 text-neutral-50 text-lg p-3.5 w-full border-none rounded-lg cursor-pointer transition-[background-color] disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed enabled:bg-sky-500"
          disabled={!formValid}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
