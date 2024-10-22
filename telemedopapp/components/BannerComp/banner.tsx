"use client"
import React, { useState, useEffect } from "react";
import buttonStyles from "../navbarComp/navbar.module.css";
import Link from "next/link";
const Banner = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const role = localStorage.getItem("userRole");
    if (token && role === "Admin") {
      setIsAdmin(true);
    }
  }, []);
  return (
    <section className="flex flex-col md:flex-row md:ml-[12.5%] items-center justify-center w-full">
      <div className="flex flex-col h-full space-y-4 w-full">
        <div className="flex flex-col p-2 space-y-6">
          <p className="text-base md:text-lg font-semibold text-[#343a40]">
            Take Control of Your Healthcare Operations          </p>
        </div>
        {isAdmin ? (
        <div className="flex flex-col items-center justify-center space-y-4 md:max-w-[80%] w-full">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full md:w-1/2">
              <Link className="w-full" href="/docTools">
                <button
                  className={
                    buttonStyles.gradient_button +
                    " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full "
                  }
                >
                  Doctor Management
                </button>
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <Link className="w-full" href="/patientTools">
                <button
                  className={
                    buttonStyles.gradient_button +
                    " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full "
                  }
                >
                  Patient Management
                </button>
              </Link>
            </div>

            <div className="w-full md:w-1/2">
              <Link className="w-full" href="/appointments">
                <button
                  className={
                    buttonStyles.gradient_button +
                    " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full "
                  }
                >
                  Appointment Management
                </button>
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <Link className="w-full" href="/support">
                <button
                  className={
                    buttonStyles.gradient_button +
                    " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full "
                  }
                >
                  Support Team
                </button>
              </Link>
            </div>
          </div>
        </div>):(
          <div className="flex flex-col items-center justify-center space-y-4 md:max-w-[80%]">
            <p className="text-lg text-center w-full">
              Sign in to access administration tools
            </p>
            <Link href="/auth/signin">
              <button
                className={
                  buttonStyles.gradient_button +
                  " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full "
                }
              >
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;
