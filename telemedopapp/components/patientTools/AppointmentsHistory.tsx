"use client";
import { useState, useEffect } from 'react';

interface AppointmentsHistoryProps {
  patientId: number;
  token: string;
  onClose: () => void;
}

interface Appointment {
  appointment_date: string;
  appointment_time: string;
  appointment_status: string;
  doctor_name: string;
}

const AppointmentsHistory = ({ patientId, token, onClose }: AppointmentsHistoryProps) => {
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/appointments`,
          {
            method: 'GET',
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Fetched appointments:", data); // Debug log
        setAppointmentsData(data || []);
      } catch (error) {
        setError("Error fetching appointments");
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-bold mb-4">Appointments History</h2>
        
        {isLoading ? (
          <div className="text-center py-4">Loading appointments...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : appointmentsData.length > 0 ? (
          <div className="space-y-4">
            {appointmentsData.map((appointment, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <p><strong>Date:</strong> {new Date(appointment.appointment_date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.appointment_time}</p>
                <p><strong>Status:</strong> {appointment.appointment_status}</p>
                <p><strong>Doctor:</strong> {appointment.doctor_name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4">No appointments found.</p>
        )}

        <button
          className="mt-4 bg-sky-500 text-neutral-50 text-lg p-3.5 w-full border-none rounded-lg cursor-pointer transition-[background-color] hover:bg-sky-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AppointmentsHistory;
