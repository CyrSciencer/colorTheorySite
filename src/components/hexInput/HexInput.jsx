import React from "react";
import "../colorInputs/colorInputs.css"; // Reuse existing CSS for now
import "./hexInput.css";
const HexInput = ({ hex, setHex, oppositeColor, title }) => {
  return (
    <div className="hex-input" style={{ backgroundColor: hex }}>
      <label htmlFor="hex-only" style={{ color: oppositeColor }}>
        {title}
      </label>
      <input
        id="hex-only" // Changed ID to avoid potential conflicts if used alongside ColorInputs
        type="text"
        value={hex.toUpperCase()}
        onChange={(e) => setHex(e.target.value)}
        maxLength="7"
        // Added style for consistency
      />
    </div>
  );
};

export default HexInput;
