// components/common/VideoCallDialog.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog"; // PrimeReact Dialog
import { layout } from "agora-react-uikit"; // Import layout from Agora UIKit
import dynamic from "next/dynamic"; // Dynamic import for Agora UIKit

const AgoraUIKit = dynamic(() => import("agora-react-uikit"), { ssr: false });
import "agora-react-uikit/dist/index.css";

const VideoCallDialog: React.FunctionComponent<{
  isOpen: boolean;
  onHide: () => void;
}> = ({ isOpen, onHide }) => {
  const [isHost, setHost] = useState(true);
  const [isPinned, setPinned] = useState(false);
  const [username, setUsername] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set client-side flag
  }, []);

  if (!isClient) {
    return null; // Do not render on the server
  }

  const dialogStyle: React.CSSProperties = {
    width: "80vw",
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
          <AgoraUIKit
            rtcProps={{
              appId: "c27f95cfa894406c81a0c51deecacc65",
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
        </div>
      </div>
    </Dialog>
  );
};

export default VideoCallDialog;
