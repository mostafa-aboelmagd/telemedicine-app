// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css"; // Global styles
import Navbar from "@/components/navbarComp/navbar";
import { ProfileProvider } from "@/context/ProfileContext";
import { DoctorProvider } from "@/context/GetDoctorsContext";

const inter = Inter({ subsets: ["latin"] });

// Define metadata for the application
export const metadata: Metadata = {
  title: "TelemedPilot",
  description:
    "Pilot Development Project for Telemedicine Enterprise Solution in Healthcare",
  viewport: "width=device-width, initial-scale=1",
  keywords:
    "telemedicine, pilot, development, project, enterprise, solution, healthcare, health, medical, doctor, patient, appointment, video, call, chat, prescription, history, profile, user, admin, dashboard, calendar, schedule, reminder, notification, telemedapp",
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </Head>
      <body className={inter.className}>
        <DoctorProvider>
          <ProfileProvider>
            <Navbar />
            <main className="w-full">{children}</main>{" "}
            {/* Wrap children with main for semantic HTML */}
          </ProfileProvider>
        </DoctorProvider>
      </body>
    </html>
  );
}
