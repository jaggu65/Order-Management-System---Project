// src/pages/WelcomeIntro.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomeIntro.css";

const WelcomeIntro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000); // Redirect after 6 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-video-container">
      <video autoPlay muted playsInline className="welcome-video">
        <source src="/assets/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    </div>
  );
};

export default WelcomeIntro;
