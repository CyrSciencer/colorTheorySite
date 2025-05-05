import React from "react";
import "./FeedbackPopup.css";

/**
 * Simple feedback popup component.
 */
const FeedbackPopup = ({ message, type = "success", isVisible }) => {
  // Base class
  let popupClass = "feedback-popup";
  console.log(message.replace("Copied ", "").replace("!", ""));
  // Add type class (success/error)
  if (type === "success" || type === "error") {
    popupClass += ` ${type}`;
  }

  // Add hidden class based on visibility
  if (!isVisible) {
    popupClass += " hidden";
  }

  return (
    <div
      className={popupClass}
      style={{
        "--color-success": message.replace("Copied ", "").replace("!", ""),
      }}
    >
      {message}
    </div>
  );
};

export default FeedbackPopup;
