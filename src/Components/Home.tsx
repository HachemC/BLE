import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export function Home() {
  const nav = useNavigate();

  const goToStartPage = () => {
    nav("/Start");
  };

  const handleCloseApp = () => {
    window.ipcRenderer.send('close-app');
  };

  return (
    <div className="home-container">
      <div className="home-description">
        <p>Welcome to our application, you can start the search by clicking on the button...</p>
      </div>

      <div className="home-buttons">
        <input
          type="submit"
          className="button-27 start"
          value="START"
          onClick={goToStartPage}
        />
        <input
          type="button"
          className="button-27 exit"
          value="EXIT"
          onClick={handleCloseApp}
        />
      </div>
    </div>
  );
}
