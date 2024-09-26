"use client";
import DoctorBooking from "@/components/booking/DoctorBooking";
import { Suspense } from "react";

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="mx-10 text-xl">Loading...</div>}>
      <DoctorBooking />
    </Suspense>
  );
}
