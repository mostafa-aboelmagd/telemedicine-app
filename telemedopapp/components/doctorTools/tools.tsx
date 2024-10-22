"use client";

import React, { useState, useEffect } from "react";
import buttonStyles from "../navbarComp/navbar.module.css";
import Link from "next/link";

function DoctorManagementTools() {
  const [isAdmin, setIsAdmin] = useState(false);
  

  return (
    <section className="h-screen flex flex-col-reverse md:flex md:flex-row md:ml-[12.5%] items-center justify-center">
      <div className="flex flex-col h-full w-full md:w-auto items-center md:items-start space-y-4">
        <div className="flex flex-col p-2 space-y-6 w-full md:w-auto">
          <p className="text-base md:text-lg font-semibold text-[#343a40] text-center md:text-left">
            Doctor Management
          </p>
        </div>
        
          <div className="flex flex-col items-center justify-center space-y-4 md:max-w-[80%]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="w-full">
                <Link className="w-full" href="#">
                  <button
                    className={
                      buttonStyles.gradient_button +
                      " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full h-24"
                    }
                  >
                    View Doctor List
                  </button>
                </Link>
              </div>
              <div className="w-full">
                <Link className="w-full" href="#">
                  <button
                    className={
                      buttonStyles.gradient_button +
                      " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full h-24"
                    }
                  >
                    View Pending Profiles
                  </button>
                </Link>
              </div>
              <div className="w-full">
                <Link className="w-full" href="/docTools/pendingAccounts">
                  <button
                    className={
                      buttonStyles.gradient_button +
                      " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full h-24"
                    }
                  >
                    Verify Registrations
                  </button>
                </Link>
              </div>
              <div className="w-full">
                <Link className="w-full" href="#">
                  <button
                    className={
                      buttonStyles.gradient_button +
                      " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full h-24"
                    }
                  >
                    Send Reminders
                  </button>
                </Link>
              </div>
              <div className="w-full">
                <Link className="w-full" href="#">
                  <button
                    className={
                      buttonStyles.gradient_button +
                      " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full h-24"
                    }
                  >
                    View Appointment History
                  </button>
                </Link>
              </div>
              <div className="w-full">
                <Link className="w-full" href="#">
                  <button
                    className={
                      buttonStyles.gradient_button +
                      " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full h-24"
                    }
                  >
                    Hold Accounts
                  </button>
                </Link>
              </div>
              <div className="w-full">
                <Link className="w-full" href="#">
                  <button
                    className={
                      buttonStyles.gradient_button +
                      " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full h-24"
                    }
                  >
                    Filter Doctors
                  </button>
                </Link>
              </div>
              <div className="w-full">
                <Link className="w-full" href="#">
                  <button
                    className={
                      buttonStyles.gradient_button +
                      " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full h-24"
                    }
                  >
                    Search Doctors
                  </button>
                </Link>
              </div>
              <div className="w-full">
                <Link className="w-full" href="#">
                  <button
                    className={
                      buttonStyles.gradient_button +
                      " md:px-12 py-2 my-2 text-base md:text-lg text-white rounded-lg w-full h-24"
                    }
                  >
                    View Doctor Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
export default DoctorManagementTools;