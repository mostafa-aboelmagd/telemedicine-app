import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbarComp/navbar";
import { ProfileProvider } from "@/context/ProfileContext"; // Ensure correct import path

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TelemedPilot",
  description:
    "Pilot Development Project for Telemedicine Enterprise Solution in Healthcare",
  viewport: "width=device-width, initial-scale=1",
  keywords:
    "telemedicine, pilot, development, project, enterprise, solution, healthcare, health, medical, doctor, patient, appointment, video, call, chat, prescription, history, profile, user, admin, dashboard, calendar, schedule, reminder, notification, telemedapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProfileProvider>
          <Navbar />
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
