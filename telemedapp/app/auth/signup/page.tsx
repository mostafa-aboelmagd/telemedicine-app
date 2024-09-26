"use client";

import { useState, useEffect } from "react";
import SignUpForm from "@/components/auth/SignupForm";
import ImageContainer from "@/components/auth/ImageContainer";
import { CircularProgress } from "@mui/material";

function SignUpPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem("jwt")) {
      if(Math.floor(new Date().getTime() / 1000) > Number(localStorage.getItem("expiryDate"))) {
        localStorage.clear();
        setLoading(false);
      }
      else {
        window.location.href = "/";
      }
    }
    else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex h-full bg-neutral-100 flex-col lg:flex-row">
      {loading ? (
        <CircularProgress className="absolute top-1/2 left-1/2" />
      ) : (
        <>
          <SignUpForm />
          <ImageContainer />
        </>
      )}
    </div>
  );
}

export default SignUpPage;
