import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { formatDate } from "../../utils/date";
interface FollowUpAppointmentsProps {
  appointments: any[];
  selectedAppointment: any;
  setSelectedAppointment: (appointment: any) => void;
  setAppointmentState: (state: string) => void;
  appointmentState: string;
}
const FollowUpAppointments: React.FC<FollowUpAppointmentsProps> = ({
  appointments,
  selectedAppointment,
  setSelectedAppointment,
  setAppointmentState,
  appointmentState,
}) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleAppointmentSelect = (appointment: any) => {
    setSelectedAppointment(appointment);
  };

  const handleFollowUpClick = () => {
    setShowDialog(true);
  };

  const handleSaveAppointment = () => {
    console.log("Selected appointment saved:", selectedAppointment);
    setShowDialog(false);
  };

  return (
    <div>
      <label className="flex items-center">
        <input
          type="radio"
          name="type"
          value="follow-up"
          checked={appointmentState === "follow-up"}
          onChange={() => {
            setAppointmentState("follow-up");
            handleFollowUpClick();
          }}
        />
        <span className="ml-2">Follow up</span>
      </label>

      <Dialog
        className="bg-opacity-100 bg-gray-50 rounded-lg shadow-2xl"
        style={{
          width: "90vw",
          minHeight: "200px",
          maxWidth: "600px",
          padding: "1rem",
          zIndex: 1000,
        }}
        header="Select Appointment for Follow Up"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        footer={
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold disabled:opacity-50"
            onClick={handleSaveAppointment}
            disabled={!selectedAppointment}
          >
            Save
          </button>
        }
      >
        <ul className="p-0">
          {appointments.map((appointment) => (
            <li key={appointment.appointment_id} className="mb-3">
              <Card
                title={`Dr. ${appointment.doctor_first_name} ${appointment.doctor_last_name}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p>
                      <strong>Specialization:</strong>{" "}
                      {appointment.doctor_specialization}
                    </p>
                    <p>
                      <strong>Appointment Type:</strong>{" "}
                      {appointment.appointment_type}
                    </p>
                    <p>
                      <strong>Date & Time:</strong>{" "}
                      {formatDate(appointment.appointment_day_hour)}
                    </p>
                    <p>
                      <strong>Duration:</strong>{" "}
                      {appointment.appointment_duration} min
                    </p>
                  </div>
                  <button
                    className={
                      selectedAppointment?.appointment_id ===
                      appointment.appointment_id
                        ? "bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold"
                        : "bg-blue-400 text-white py-2 px-4 rounded-lg font-semibold"
                    }
                    onClick={() => handleAppointmentSelect(appointment)}
                  >
                    Select
                  </button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Dialog>
    </div>
  );
};

export default FollowUpAppointments;
