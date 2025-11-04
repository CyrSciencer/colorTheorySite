import React from "react";
import PropTypes from "prop-types";
import "./FeedbackPopup.css";

/**
 FeedbackPopup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]).isRequired,
  color: PropTypes.string,
};aram {boolean} isVisible - Whether the popup should be visible
 * @param {string} message - The message to display
 * @param {string} type - The type of feedback ('success' or 'error')
 */
const FeedbackPopup = ({ isVisible, message, type, color }) => {
  return (
    <div
      className={`feedback-popup ${type} ${isVisible ? "" : "hidden"}`}
      style={{ backgroundColor: color }}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

FeedbackPopup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]).isRequired,
  color: PropTypes.string,
};

export default FeedbackPopup;
