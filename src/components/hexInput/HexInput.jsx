import React from "react";
import "../colorInputs/colorInputs.css"; // Reuse existing CSS for now
import "./hexInput.css";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import colorManagementFuncs from "../../utilities/complementaries";
// import { writeToClipboard } from "../../utilities/clipboardUtils"; // No longer needed directly
// import { useFeedback } from "../../contexts/FeedbackContext.jsx"; // No longer needed directly
import useClipboardWithFeedback from "../../utilities/useClipboardWithFeedback.jsx";

const { hexToRgb, rgbToHex } = InformationTranslationFuncs;
const { opposite } = colorManagementFuncs;

const HexInput = ({
  hex,
  setHex,
  contrastColor = "#000000",
  title,
  onSuggestionClick, // This prop might need to be re-evaluated or used differently
}) => {
  const contrastRgb = hexToRgb(contrastColor);
  const shadowRgb = opposite(contrastRgb);
  const shadowColorHex = rgbToHex(shadowRgb);
  const copyWithFeedback = useClipboardWithFeedback();

  const handleHexClick = () => {
    copyWithFeedback(hex, `Copied ${title || ""}`);
    if (onSuggestionClick) {
      // If onSuggestionClick was purely for the copy-feedback mechanism,
      // it might not be needed anymore or its purpose might change.
      // For now, we call it if it exists, passing the hex.
      onSuggestionClick(hex);
    }
  };

  return (
    <div
      className="hex-input-component"
      style={{
        backgroundColor: hex,
        "--shadow-color": shadowColorHex,
      }}
    >
      <p
        style={{
          color: contrastColor,
          textShadow: "0 0 3px var(--shadow-color)",
        }}
        onClick={handleHexClick} // Updated handler
      >
        {title}
      </p>
      {/* Display hex code as text */}
      <span
        id={title + "-hex-only"}
        style={{
          color: contrastColor, // Use contrast color for text
          textShadow: "0 0 3px var(--shadow-color)", // Same shadow as label
        }}
        aria-label={`${title} hex value`}
        onClick={handleHexClick} // Updated handler
      >
        {hex.toUpperCase()}
      </span>
      {/* Color picker input */}
      <input
        type="color"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        style={{ border: ` 5px inset ${contrastColor}` }}
      />
    </div>
  );
};

export default HexInput;
