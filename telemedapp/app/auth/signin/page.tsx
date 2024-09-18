"use client";

import { useState, useEffect } from "react";
import SignInForm from "@/components/auth/SignInForm";
import ImageContainer from "@/components/auth/ImageContainer";
import { CircularProgress } from "@mui/material";

function SignInPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem("jwt")) {
      window.location.href = "/";
    }
    else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex h-screen bg-neutral-100 flex-col lg:flex-row">
      {loading ? (
        <CircularProgress className="absolute top-1/2 left-1/2" />
      ) : (
        <>
          <SignInForm />
          <ImageContainer />
        </>
      )}
    </div>
  );
}

export default SignInPage;
