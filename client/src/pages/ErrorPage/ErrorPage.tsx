import React from "react";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="errorContainer">
      <div className="error">Page not found</div>
      <button className="backButton" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}
