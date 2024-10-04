"use client"; // Required for client-side data fetching
import React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useProfile } from "@/context/ProfileContext"; // Ensure correct import path
import { usePathname, useRouter } from "next/navigation"; // Import the hooks

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profileData, loading } = useProfile();
  const userImage = <FaUserCircle className="h-32 w-32 text-[#035fe9]" />;

  // Get the current path using usePathname
  const router = useRouter(); // Initialize the useRouter hook
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gray-100 w-full flex flex-col items-center justify-center gap-5 md:flex-row md:items-start">
          {loading ? (
            <CircularProgress className="absolute top-1/2" />
          ) : (
            <>
              <div>
                <div className="flex-initial flex flex-col justify-center items-center my-5 bg-white h-fit w-fit p-7 rounded-xl">
                  {userImage}
                  <p className="text-blue-500 mb-1 font-semibold">
                    {profileData?.firstName} {profileData?.lastName}
                  </p>
                </div>
                <div className="flex flex-col gap-3 font-semibold text-sm">
                  {/* Use router.push() instead of window.location.href */}
                  <button
                    className=" bg-blue-600 text-white py-3 rounded-lg"
                    onClick={() =>
                      router.push("/patientProfile/upcoming_appointments")
                    }
                  >
                    Upcoming Appointments
                  </button>

                  <button
                    className=" bg-blue-600 text-white py-3 rounded-lg"
                    onClick={() =>
                      router.push("/patientProfile/appointments_history")
                    }
                  >
                    Appointments History
                  </button>
                </div>
              </div>
              <div className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
                {/* Navigation Links */}
                <div className="flex pt-4 mb-3 justify-between gap-2">
                  <Link
                    href="/patientProfile"
                    className={`${
                      pathname === "/patientProfile"
                        ? "text-blue-500 font-bold "
                        : "font-bold"
                    } ml-7`}
                  >
                    Personal Info
                  </Link>
                  <Link
                    href="/patientProfile/paymentInfo"
                    className={`${
                      pathname === "/patientProfile/paymentInfo"
                        ? "text-blue-500 font-bold "
                        : "font-bold"
                    }`}
                  >
                    Payment Info
                  </Link>
                  <Link
                    href="/patientProfile/patientDocuments"
                    className={`${
                      pathname === "/patientProfile/patientDocuments"
                        ? "text-blue-500 font-bold "
                        : "font-bold"
                    } mr-7`}
                  >
                    Documents
                  </Link>
                </div>

                {/* Underline indicator */}
                <div className="flex">
                  <hr
                    className={`${
                      pathname === "/patientProfile"
                        ? "bg-blue-500"
                        : "bg-neutral-800"
                    } border-none h-0.5 w-1/3`}
                  />
                  <hr
                    className={`${
                      pathname === "/patientProfile/paymentInfo"
                        ? "bg-blue-500"
                        : "bg-neutral-800"
                    } border-none h-0.5 w-1/3`}
                  />
                  <hr
                    className={`${
                      pathname === "/patientProfile/patientDocuments"
                        ? "bg-blue-500"
                        : "bg-neutral-800"
                    } border-none h-0.5 w-1/3`}
                  />
                </div>

                {/* Page Content */}
                <main className="flex-initial m-5 bg-white rounded-xl relative max-w-lg min-w-0 md:basis-7/12 md:max-w-full">
                  {children}
                </main>
              </div>
            </>
          )}
        </div>
      </body>
    </html>
  );
}
