"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InputComponent from "./InputComponent";
import jwt from "jsonwebtoken";

function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const ACCESS_TOKEN_SECRET_KEY = `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET_KEY}`;

  const tokenAuthentication = (req : any) => {
    const token = req.token;
    let message = "";
    if (token) {
      jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, (err : any, decodedToken : any) => {
        if (err) {
          message = "Invalid token";
          console.log(message);
          return false;
        } 
        console.log(decodedToken);
        req.id = decodedToken.id;
        req.email = decodedToken.email;
        req.userRole = decodedToken.role;
        return true;
      });
    }
    else {
      message = "No token found";
      console.log(message);
      return false;
    }
    return true;
  };

  const submitButtonClass = [
    "bg-sky-500 text-neutral-50 text-lg	p-3.5	w-full border-none rounded-lg cursor-pointer transition-[background-color]",
    "disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed enabled:bg-sky-500"
  ].join(" ");

  const validateForm = () => {
    const { email, password } = formData;
    if (email && password) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token 
        },
        mode: "cors",
        body: JSON.stringify(formData),
      }
      );

      const textResponse = await response.text();
      console.log("Response body:", textResponse);

      if (!response.ok) {
        console.log("error in response");
        if(response.status === 400) {
          setError(true);
        }
        throw new Error("Failed To Sign In");
      }

      const users = await response.json();
      if(tokenAuthentication(users)) {
        localStorage.setItem("jwt", users.token);
        const redirect = users.userRole === "Patient" ? "/patientProfile/view" : "/doctorProfile/view";
        window.location.href = redirect;
      }
      else {
        console.log("Error During Token Authentication");
      }

    } catch(error) {
      console.error("Error During Sign In:", error);
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
        <p className="mb-2">
          Don&apos;t Have An Account?{" "}
          <Link href="/auth/signup" className="text-blue-500 font-semibold cursor-pointer">Sign Up</Link>
        </p>
        <button type="submit" className={submitButtonClass} disabled={!formValid}>Sign in</button>
        {error && <p className="font-semibold text-red-700 mt-4">Incorrect Email And/Or Password!</p>}
      </form>
    </div>
  );
}

export default SignInForm;
