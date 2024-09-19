"use client";
import React from "react";
import { Dialog } from "primereact/dialog";

interface ConfirmDialogProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  onConfirm,
  onCancel,
  loading,
}) => {
  return (
    <Dialog
      visible={visible}
      className="bg-opacity-100 bg-gray-50 rounded-lg shadow-2xl"
      style={{
        width: "90vw",
        minHeight: "200px",
        maxWidth: "600px",
        padding: "1rem",
        zIndex: 1000,
      }}
      onHide={onCancel}
      draggable={false}
    >
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold text-start">
          Confirm Appointment
        </h2>
        <p className="mt-12 text-center italic text-gray-700">
          Are you sure you want to add this appointment?
        </p>
        <div className="flex justify-end h-[100px] items-end">
          <div className="flex gap-4">
            <button
              onClick={onConfirm}
              disabled={loading}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Booking..." : "Confirm"}
            </button>
            <button
              onClick={onCancel}
              disabled={loading}
              className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-800 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
