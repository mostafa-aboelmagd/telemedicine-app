"use client"
import DoctorBooking from "@/components/booking/DoctorBooking";
import { Suspense } from "react";

export default function BookingPage() {
  return <Suspense fallback={<div>Loading...</div>}><DoctorBooking /></Suspense>;
}

