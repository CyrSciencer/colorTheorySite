import React from "react";
import "./FeedbackPopup.css";

/**
 * Simple feedback popup component.
 */
const FeedbackPopup = ({ message, type = "success", isVisible }) => {
  // Base class
  const baseClass = "feedback-popup";
  const typeClass = type === "success" || type === "error" ? type : "";
  const visibilityClass = isVisible ? "" : "hidden";

  // Add hidden class based on visibility
  const popupClass = `${baseClass} ${typeClass} ${visibilityClass}`
    .trim()
    .replace(/\\s+/g, " ");

  return (
    <div
      className={popupClass}
      style={{
        "--color-success": message.split(" ").pop().replace("!", ""),
      }}
    >
      {message}
    </div>
  );
};

export default FeedbackPopup;
