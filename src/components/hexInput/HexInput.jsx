import React from "react";
import "../colorInputs/colorInputs.css"; // Reuse existing CSS for now
import "./hexInput.css";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import colorManagementFuncs from "../../utilities/complementaries";

const { hexToRgb, rgbToHex } = InformationTranslationFuncs;
const { opposite } = colorManagementFuncs;

const HexInput = ({ hex, setHex, contrastColor = "#000000", title }) => {
  const contrastRgb = hexToRgb(contrastColor);
  const shadowRgb = opposite(contrastRgb);
  const shadowColorHex = rgbToHex(shadowRgb);

  return (
    <div
      className="hex-input"
      style={{
        backgroundColor: hex,
        "--shadow-color": shadowColorHex,
      }}
    >
      <label
        htmlFor={title + "-hex-only"} // Keep association for the color picker
        style={{
          color: contrastColor,
          textShadow: "0 0 3px var(--shadow-color)",
        }}
      >
        {title}
      </label>
      {/* Display hex code as text */}
      <span
        style={{
          color: contrastColor, // Use contrast color for text

          textShadow: "0 0 3px var(--shadow-color)", // Same shadow as label
        }}
        aria-label={`${title} hex value`}
      >
        {hex.toUpperCase()}
      </span>
      {/* Color picker input */}
      <input
        id={title + "-hex-only"}
        type="color"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        style={{ border: ` 5px inset ${contrastColor}` }}
      />
    </div>
  );
};

export default HexInput;
