import React, { useState, useEffect } from "react";
import InformationTranslationFuncs from "../../../utilities/InformationTranslation";
import colorManagementFuncs from "../../../utilities/complementaries"; // Contains hslMixer
import SquareComposition from "../squareComposition/SquareComposition";

import "./ColorMixer.css";
const { hexToRgb, rgbToHsl, hslToRgb, rgbToHex } = InformationTranslationFuncs;
const { inputOfTwoColorForAThird } = colorManagementFuncs; // Assuming hslMixer is exported directly or within the default export

const ColorMixer = ({ hex1, hex2, mixedColor, setMixedColor }) => {
  const [mixPercent, setMixPercent] = useState(50); // Default mix percentage
  const [mixedHex, setMixedHex] = useState("#808080"); // Default mixed color (grey)
  const [contrastColor, setContrastColor] = useState("#FFFFFF"); // Default contrast

  useEffect(() => {
    try {
      // Validate hex inputs slightly
      const validHex1 = /^#[0-9A-F]{6}$/i.test(hex1) ? hex1 : "#000000";
      const validHex2 = /^#[0-9A-F]{6}$/i.test(hex2) ? hex2 : "#FFFFFF";

      const rgb1 = hexToRgb(validHex1);
      const rgb2 = hexToRgb(validHex2);

      // Perform the mix in HSL space
      const RgbSet = inputOfTwoColorForAThird(rgb1, rgb2, mixPercent / 100); // Pass percentage as 0-1

      // Convert back to RGB and then Hex
      const mixedRgb = RgbSet.rgb3;
      setMixedColor(rgbToHex(mixedRgb));

      // Calculate contrast color for the mixed hex
      const brightness =
        (mixedRgb[0] * 299 + mixedRgb[1] * 587 + mixedRgb[2] * 114) / 1000;
      setContrastColor(brightness > 128 ? "#000000" : "#FFFFFF");
    } catch (error) {
      console.error("Error mixing colors:", error);
      // Handle potential errors during conversion or mixing if necessary
      setMixedHex("#808080"); // Reset to default on error
      setContrastColor("#FFFFFF");
    }
  }, [hex1, hex2, mixPercent]); // Recalculate when inputs or percentage change

  const handleSliderChange = (event) => {
    setMixPercent(Number(event.target.value));
  };

  return (
    <div className="mixer-container">
      <div
        className="color-mixer-container"
        style={{ backgroundColor: mixedColor, color: contrastColor }}
      >
        <div className="mixed-color-display">
          mixed: {mixedColor.toUpperCase()}
        </div>
        <div className="mixer-controls">
          <input
            type="range"
            min="0"
            max="100"
            value={mixPercent}
            onChange={handleSliderChange}
            className="mix-slider"
          />
          <span>{mixPercent}%</span>
        </div>
      </div>
      <div className="squares-container">
        <SquareComposition innerColor={mixedColor} outerColor={hex2} />
        <SquareComposition innerColor={mixedColor} outerColor={hex1} />
        <SquareComposition innerColor={hex2} outerColor={mixedColor} />
        <SquareComposition innerColor={hex1} outerColor={mixedColor} />
      </div>
      <div className="ratios-container"></div>
    </div>
  );
};

export default ColorMixer;
