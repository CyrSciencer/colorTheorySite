import React from "react";
import "../colorInputs/colorInputs.css"; // Reuse existing CSS for now
import "./hexInput.css";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import colorManagementFuncs from "../../utilities/complementaries";
import { writeToClipboard } from "../../utilities/clipboardUtils";
import { useFeedback } from "../../contexts/FeedbackContext.jsx";

const { hexToRgb, rgbToHex } = InformationTranslationFuncs;
const { opposite } = colorManagementFuncs;

const HexInput = ({
  hex,
  setHex,
  contrastColor = "#000000",
  title,
  onSuggestionClick,
}) => {
  const contrastRgb = hexToRgb(contrastColor);
  const shadowRgb = opposite(contrastRgb);
  const shadowColorHex = rgbToHex(shadowRgb);
  const { showFeedback } = useFeedback();
  const handleSuggestionClick = (hex) => {
    // Use clipboard utility
    writeToClipboard(hex)
      .then(() => {
        showFeedback(`Copied ${hex}!`, "success"); // Trigger success popup via context
        if (onSuggestionClick) {
          onSuggestionClick(hex);
        }
      })
      .catch((err) => {
        showFeedback("Failed to copy!", "error"); // Trigger error popup via context
        // Keep console log for debugging
        console.error("Clipboard error: ", err);
      });

    // Optionally clear the input/suggestions after selection
    // setDescription('');
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
        onClick={() => handleSuggestionClick(hex)}
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
        onClick={() => handleSuggestionClick(hex)}
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
