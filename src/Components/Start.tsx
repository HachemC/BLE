import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from React Router
import "./start.css";

export function Start() {
  const navigate = useNavigate(); // Initialize navigate function using useNavigate hook

  const handleOpenBluetooth = () => {
    // Send message to main process to open Bluetooth
    window.ipcRenderer.send('open-bluetooth');
  };

  const handleCloseBluetooth = () => {
    // Send message to main process to close Bluetooth
    window.ipcRenderer.send('close-bluetooth');
  };

  const handleNavigateToList = () => {
    // Navigate to Bluetooth device list page when button is clicked
    navigate("/bluetoothlist");
  };

  return (
    <div className="cont-1">
      <div></div>
      <button className="a" type="button" onClick={handleOpenBluetooth}>Start scan</button>
      <button className="a" type="button" onClick={handleCloseBluetooth}>Stop scan</button>
      <button className="a" type="button" onClick={handleNavigateToList}>Show Bluetooth Devices</button>
    </div>
  );
}
