import React from "react";
import "../colorInputs/colorInputs.css"; // Reuse existing CSS for now
import "./hexInput.css";
import InformationTranslationFuncs from "../../../utilities/InformationTranslation";
import colorManagementFuncs from "../../../utilities/complementaries";

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
        htmlFor={title + "-hex-only"}
        style={{
          color: contrastColor,
          textShadow: "0 0 3px var(--shadow-color)",
        }}
      >
        {title}
      </label>
      <input
        id={title + "-hex-only"}
        type="text"
        value={hex.toUpperCase()}
        onChange={(e) => setHex(e.target.value)}
        maxLength="7"
      />
    </div>
  );
};

export default HexInput;
