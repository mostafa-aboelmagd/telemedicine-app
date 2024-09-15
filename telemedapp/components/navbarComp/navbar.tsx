"use client";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { PiSignInBold } from "react-icons/pi";
import { BsPersonFillAdd } from "react-icons/bs";
import MenuList from "../MenuList/menuList";
import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const menuIcon = (
  <div>
    <IoMenu className="h-8 w-8 text-[#035fe9]" />
  </div>
);
const signedInIcon = (
  <div>
    <FaUserCircle className="h-10 w-10 text-[#035fe9]" />
  </div>
);
const Navbar = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  }, [token]);
  return (
    <nav className="h-14 bg-white border border-b-[1px] sticky top-0 z-10 mb-8">
      <div className="max-w-full md:max-w-[90%] lg:max-w-[75%] flex justify-between items-center mx-auto">
        <Link href="/">
          <div className="flex justify-center items-center">
            <img className="w-14 h-14" src="/assets/logo.png" alt="logo" />
            <span className="texl-base md:text-xl">TeleMedPilot</span>
          </div>
        </Link>
        <div className="hidden lg:inline-block  justify-between space-x-4 text-[#4d4d4f] text-sm font-light">
          <Link href="/doctors">
            <button className="hover:text-[#035fe9]">Doctor List</button>
          </Link>
          <button className="hover:text-[#035fe9]">Tests</button>
          <button className="hover:text-[#035fe9]">Find A Doctor</button>
          <button className="hover:text-[#035fe9]">Blog</button>
        </div>
        <div className="flex justify-between items-center space-x-0 md:space-x-4 lg:space-x-6">
          <a className="cursor-pointer">العربيه</a>
          {!token! ? (
            <>
              <Link href="/auth/signin">
                <button className="hidden lg:inline-block border border-[#035fe9] rounded-lg text-[#035fe9] px-12 py-2 my-2">
                  Sign in
                </button>
                <button className="lg:hidden text-[#035fe9] p-2 my-2">
                  <PiSignInBold className="h-6 w-6 text-[#035fe9]" />
                </button>
              </Link>
              <Link href="/auth/signup">
                <button
                  className={
                    styles.gradient_button +
                    " hidden lg:inline-block px-12 py-2 my-2 text-white rounded-lg "
                  }
                >
                  Sign up
                </button>
                <button className="lg:hidden p-2 my-2 text-[#035fe9] rounded-lg">
                  <BsPersonFillAdd className="h-6 w-6 text-[#035fe9]" />
                </button>
              </Link>
            </>
          ) : (
            <div>
              <MenuList
                linkTo={[
                  "/patientProfile/view",
                  "/patientProfile/prescriptions",
                  "/patientProfile/patientDocuments",
                  "/patientProfile/paymentInfo",
                ]}
                linkName={["View Profile", "My Prescriptions"]}
                text={signedInIcon}
              />
              <MenuList
                linkTo={["/doctorProfile/view", "/doctorProfile/timeSlots"]}
                linkName={["View Profile", "Set Time Slots", "", "Wallet"]}
                text={signedInIcon}
              />
            </div>
          )}
          <div className="lg:hidden">
            <MenuList
              linkTo={["/doctors", "", "", ""]}
              linkName={["Doctor List", "Tests", "Find a Doctor", "Blog"]}
              text={menuIcon}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
