"use client";
import { useState, useEffect } from 'react';
import HistoryDetails from './HistoryDetails';

interface AppointmentsHistoryProps {
  userId: number;
}

interface Appointment {
  patient_id: number;
  patient_first_name: string;
  patient_last_name: string;
  patient_email: string;
  patient_birth_date: string;
  patient_phone_number: string;
  doctor_id: number;
  doctor_first_name: string;
  doctor_last_name: string;
  appointment_id: number;
  appointment_type: string;
  appointment_duration: number;
  appointment_complaint: string;
  appointment_status: string;
  appointment_parent_reference: number | null;
  appointment_settings_type: string;
  doctor_availability_day_hour: string;
  doctor_specialization: string;
  doctor_clinic_location: string;
}

const AppointmentsHistory = ({ userId }: AppointmentsHistoryProps) => {
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    const fetchAppointments = async () => {
      let token = localStorage.getItem("jwt");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_NAME}/backOffice/getPatientAppointment/${userId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("data: ", data);
        if (data.status === "success" && data.patientAppointments) {
          setAppointmentsData(data.patientAppointments);
        }
      } catch (error) {
        setError("Error fetching appointments");
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const filteredAppointments = appointmentsData.filter(appointment => 
    !statusFilter || appointment.appointment_status === statusFilter
  );

  if (isLoading) return <div className="text-center py-4">Loading appointments...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!appointmentsData.length) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Appointments History</h2>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">No appointments found in patient's history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Appointments History -  {appointmentsData[0].patient_first_name} {appointmentsData[0].patient_last_name}</h2>
      
      <label htmlFor="appointment-filter" className="block mb-2">
        Filter Appointments:
      </label>
      <select 
        id="appointment-filter"
        value={statusFilter} 
        onChange={(e) => setStatusFilter(e.target.value)} 
        className="mb-4"
      >
        <option value="">All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
        <option value="Canceled">Canceled</option>
        <option value="Approved">Approved</option>
      </select>
      <div className="space-y-4">
        {filteredAppointments.map((appointment, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Dr. {appointment.doctor_first_name} {appointment.doctor_last_name}
                </h3>
                <p className="text-gray-600">{appointment.doctor_specialization}</p>
                <p className="text-gray-600">{appointment.doctor_clinic_location || 'Online Consultation'}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  appointment.appointment_status === 'Completed' ? 'bg-green-100 text-green-800' :
                  appointment.appointment_status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {appointment.appointment_status}
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700">
                  <span className="font-medium">Date & Time:</span>{' '}
                  {formatDateTime(appointment.doctor_availability_day_hour)}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Duration:</span> {appointment.appointment_duration} minutes
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Type:</span> {appointment.appointment_type}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-medium">Complaint:</span> {appointment.appointment_complaint}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Setting:</span> {appointment.appointment_settings_type}
                </p>
                {appointment.appointment_parent_reference && (
                  <p className="text-gray-700">
                    <span className="font-medium">Reference ID:</span> {appointment.appointment_parent_reference}
                  </p>
                )}
                 <HistoryDetails appointment_id={appointment.appointment_id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsHistory;
