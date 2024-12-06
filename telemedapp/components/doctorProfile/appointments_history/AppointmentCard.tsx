import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { formatDate } from "../../../utils/date";
import HistoryDetails from "./HistoryDetails";
import { Rating } from 'primereact/rating';

const AppointmentCard = ({
  appointment,
  profileData,
}: {
  appointment: any;
  profileData: any;
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl flex flex-col space-y-3 border border-gray-200">
      {/* Patient Information */}
      <div className="flex items-center space-x-4">
        <FaUserCircle className="h-20 w-20 text-[#035fe9]" />
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">
            {`${appointment.patient_first_name} ${appointment.patient_last_name}`}
          </h2>
          <p className="text-sm text-[#035fe9] font-medium">
            {"Patient"}
          </p>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>Date:</strong>{" "}{appointment.doctor_availability_day_hour && formatDate(appointment.doctor_availability_day_hour)}
        </p>
        <p>
          <strong>Duration:</strong> {appointment.appointment_duration} min
        </p>
        <p>
          <strong>Type:</strong> {appointment.appointment_type}
        </p>

        {/* Review Section */}
        {(appointment.appointment_review_communication_rating ||
          appointment.appointment_review_understanding_rating ||
          appointment.appointment_review_providing_solutions_rating ||
          appointment.appointment_review_commitment_rating) && (
          <div className="mt-4 pt-4 border-t border-gray-200 appointment-review-display">
            <p className="font-semibold text-gray-700 mb-2">Patient Review:</p>
            <div className="space-y-2">
              {appointment.appointment_review_communication_rating && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Communication:</span>
                  <Rating 
                    value={appointment.appointment_review_communication_rating} 
                    readOnly 
                    stars={5} 
                    cancel={false}
                    className="text-sm pointer-events-none"
                  />
                </div>
              )}
              {appointment.appointment_review_understanding_rating && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Understanding:</span>
                  <Rating 
                    value={appointment.appointment_review_understanding_rating} 
                    readOnly 
                    stars={5} 
                    cancel={false}
                    className="text-sm pointer-events-none"
                  />
                </div>
              )}
              {appointment.appointment_review_providing_solutions_rating && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Problem Solving:</span>
                  <Rating 
                    value={appointment.appointment_review_providing_solutions_rating} 
                    readOnly 
                    stars={5} 
                    cancel={false}
                    className="text-sm pointer-events-none"
                  />
                </div>
              )}
              {appointment.appointment_review_commitment_rating && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Commitment:</span>
                  <Rating 
                    value={appointment.appointment_review_commitment_rating} 
                    readOnly 
                    stars={5} 
                    cancel={false}
                    className="text-sm pointer-events-none"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Follow-Up Button */}
      <HistoryDetails appointment={appointment} />

      <style jsx global>{`
        .appointment-review-display .p-rating.pointer-events-none .p-rating-item {
          cursor: default !important;
        }

        .appointment-review-display .p-rating.pointer-events-none .p-rating-item:hover {
          color: inherit !important;
        }

        .appointment-review-display .p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
          color: #fbbf24 !important;
        }

        .appointment-review-display .p-rating .p-rating-item .p-rating-icon {
          color: #d1d5db !important;
        }
      `}</style>
    </div>
  );
};

export default AppointmentCard;
