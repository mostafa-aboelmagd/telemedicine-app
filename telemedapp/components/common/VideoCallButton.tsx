"use client";
import React, { useState } from "react";
import { Button } from "primereact/button"; // Import PrimeReact Button
import VideoCallDialog from "./VideoCallDialog"; // Import the VideoCallDialog component

const VideoCallButton: React.FC<{ label: string }> = ({ label }) => {
  const [isVideoCallOpen, setVideoCallOpen] = useState(false);

  const handleOpenVideoCall = () => setVideoCallOpen(true);
  const handleCloseVideoCall = () => setVideoCallOpen(false);

  return (
    <>
      <Button
        onClick={handleOpenVideoCall}
        label={label}
        className="bg-sky-600 hover:bg-sky-700 text-white md:text-sm text-xs font-medium py-2 px-4 rounded-lg w-full"
      />
      <VideoCallDialog isOpen={isVideoCallOpen} onHide={handleCloseVideoCall} />
    </>
  );
};

export default VideoCallButton;
