"use client";

import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { PiSignInBold } from "react-icons/pi";
import { BsPersonFillAdd } from "react-icons/bs";
import MenuList from "../MenuList/menuList";
import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import the hooks
import { usePathname } from 'next/navigation'; // Import usePathname

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
  const [token, setToken] = useState<any>();
  const [userRole, setUserRole] = useState<any>();
  const [showSignOutPopup, setShowSignOutPopup] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showAuthButtons, setShowAuthButtons] = useState(true); // New state

  const pathname = usePathname(); // Get the pathname

  const router = useRouter();
  const handleSignOut = () => {
    setShowSignOutPopup(true); // Show the confirmation popup
  };

  const confirmSignOut = () => {
    localStorage.clear(); // Clear local storage
    window.location.reload(); // Reload the page
  };
  useEffect(() => {
    const expiryDate = localStorage.getItem("expiryDate");
    if (
      expiryDate &&
      Math.floor(new Date().getTime() / 1000) > Number(expiryDate)
    ) {
      localStorage.clear();
    }
    if (pathname === "/auth/signin") { // Use pathname here
      setShowAuthButtons(false); // Hide both buttons
    }
    setToken(localStorage.getItem("jwt"));
    setUserRole(localStorage.getItem("userRole"));
  }, [pathname]); //

  return (
    <nav className="h-14 bg-white border border-b-[1px] sticky top-0 z-10 pb-8">
      <div className="max-w-full md:max-w-[90%] min-[1130px]:max-w-[75%] flex justify-between items-center mx-auto">
        <Link href="/">
          <div className="flex justify-center items-center">
            <img className="w-14 h-14" src="/assets/logo.png" alt="logo" />
            <span className="texl-base md:text-xl">TeleMedPilot</span>
          </div>
        </Link>
        <div className="hidden min-[1130px]:inline-block justify-between space-x-4 text-[#4d4d4f] text-sm font-light">
        </div>
        <div className="flex justify-between items-center space-x-0 md:space-x-4 min-[1130px]:space-x-6">
          {showAuthButtons && (
            <>
              {!token ? (
                <>
                  <Link href="/auth/signin">
                    <button className="hidden min-[1130px]:inline-block border border-[#035fe9] rounded-lg text-[#035fe9] px-12 py-2 my-2">
                      Sign in
                    </button>
                    <button className="min-[1130px]:hidden text-[#035fe9] p-2 my-2">
                      <PiSignInBold className="h-6 w-6 text-[#035fe9]" />
                    </button>
                  </Link>
                </>
              ) : (
                <div>
                  <button
                    className="hidden min-[1130px]:inline-block border border-[#035fe9] rounded-lg text-[#035fe9] px-12 py-2 my-2"
                    onClick={handleSignOut} // Call the sign out function
                  >
                    Sign out
                  </button>
                  <button
                    className="min-[1130px]:hidden text-[#035fe9] p-2 my-2"
                    onClick={handleSignOut} // Call the sign out function
                  >
                    <PiSignInBold className="h-6 w-6 text-[#035fe9]" />
                  </button>
                </div>
              )} 
              </>
              )}
              {showSignOutPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-lg   
 text-center">Are you sure you want to sign out?</p>
                    <div className="mt-4 flex justify-center gap-4">
                      <button
                        className="bg-sky-500 text-neutral-50 text-lg p-3.5 px-6 border-none rounded-lg cursor-pointer transition-[background-color]"
                        onClick={confirmSignOut}
                      >
                        Sign Out
                      </button>
                      <button
                        className="bg-gray-300 text-neutral-700 text-lg p-3.5 px-6 border-none rounded-lg cursor-pointer transition-[background-color]"
                        onClick={() => setShowSignOutPopup(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="min-[1130px]:hidden">
              </div>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
