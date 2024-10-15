// components/common/VideoCallDialog.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog"; // PrimeReact Dialog
import { layout } from "agora-react-uikit"; // Import layout from Agora UIKit
import dynamic from "next/dynamic"; // Dynamic import for Agora UIKit

const AgoraUIKit = dynamic(() => import("agora-react-uikit"), { ssr: false });

import "agora-react-uikit/dist/index.css"; // Import Agora UIKit CSS

// Props definition for the VideoCallDialog component
interface VideoCallDialogProps {
  isOpen: boolean; // Determines whether the dialog is open
  onHide: () => void; // Callback to hide/close the dialog
}

const VideoCallDialog: React.FC<VideoCallDialogProps> = ({
  isOpen,
  onHide,
}) => {
  const [isHost, setHost] = useState(true); // Manages host/audience role
  const [isPinned, setPinned] = useState(false); // Toggles layout mode
  const [username, setUsername] = useState(""); // Manages the user’s name
  const [isClient, setIsClient] = useState(false); // Ensures client-side rendering

  const agoraAppId = process.env.NEXT_PUBLIC_AGORA_APP_ID;

  if (!agoraAppId) {
    throw new Error("Agora App ID is not defined in the environment variables");
  }

  // Ensure component is only rendered client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  if (!isClient) {
    return null; // Avoid rendering server-side
  }

  // Custom CSS styles for the dialog and its content
  const dialogStyle: React.CSSProperties = {
    width: "100vw",
  };

  const containerStyle: React.CSSProperties = {
    width: "auto",
    height: "100vh",
    display: "flex",
    flex: 1,
    backgroundColor: "#007bff22",
  };

  const videoContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#007bff",
    cursor: "pointer",
    borderRadius: 5,
    padding: "4px 8px",
    color: "#ffffff",
    fontSize: 20,
  };

  return (
    <Dialog
      header="Video Call"
      visible={isOpen}
      onHide={onHide}
      modal={true}
      style={dialogStyle}
    >
      <div style={containerStyle}>
        <div style={videoContainerStyle}>
          <div style={navStyle}>
            <p style={{ fontSize: 20, width: 200 }}>
              You're {isHost ? "a host" : "an audience"}
            </p>
            <p style={buttonStyle} onClick={() => setHost(!isHost)}>
              Change Role
            </p>
            <p style={buttonStyle} onClick={() => setPinned(!isPinned)}>
              Change Layout
            </p>
          </div>
          {/* AgoraUIKit Video Call Integration */}
          <AgoraUIKit
            rtcProps={{
              appId: agoraAppId as string, // Guaranteed to be a valid string now
              channel: "test",
              token: null,
              role: isHost ? "host" : "audience",
              layout: isPinned ? layout.pin : layout.grid,
              enableScreensharing: true,
            }}
            rtmProps={{ username: username || "user", displayUsername: true }}
            callbacks={{
              EndCall: onHide,
            }}
          />
          ;{" "}
        </div>
      </div>
    </Dialog>
  );
};

export default VideoCallDialog;
