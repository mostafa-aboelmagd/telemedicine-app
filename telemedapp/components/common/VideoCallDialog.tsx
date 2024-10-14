"use client";
import React from "react";
import { Dialog } from "primereact/dialog"; // Import the Dialog component
import VideoCall from "./VideoCall";

const VideoCallDialog: React.FC<{ isOpen: boolean; onHide: () => void }> = ({
  isOpen,
  onHide,
}) => {
  return (
    <Dialog
      header="Video Call"
      visible={isOpen}
      style={{ width: "screen", height: "screen" }} // Set the dialog size
      onHide={onHide}
      modal
    >
      <VideoCall />
    </Dialog>
  );
};

export default VideoCallDialog;
