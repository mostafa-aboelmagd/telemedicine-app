"use client";
import { useSearchParams } from 'next/navigation';
import AppointmentsHistory from "@/components/AppointmentsHistory/AppointmentsHistoryPatient";
import { Suspense } from 'react';

export default function AppointmentsHistoryPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense>
        <AppointmentsHistoryContent />
      </Suspense>
    </main>
  );
}

function AppointmentsHistoryContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  if (!userId) {
    return (
      <div className="text-center text-red-500">
        Error: User ID is required
      </div>
    );
  }

  return <AppointmentsHistory userId={parseInt(userId)} />;
}
