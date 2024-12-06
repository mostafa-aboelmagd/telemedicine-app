"use client";
import { useSearchParams } from 'next/navigation';
import AppointmentsHistory from "@/components/AppointmentsHistory/AppointmentsHistory";
import { Suspense } from 'react';

export default function AppointmentsHistoryPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  if (!userId) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Error: User ID is required
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
     <Suspense>
        <AppointmentsHistory userId={parseInt(userId)} />
      </Suspense>
    </main>
  );
}
