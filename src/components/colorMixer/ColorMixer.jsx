import React, { useState, useEffect } from "react";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import colorManagementFuncs from "../../utilities/complementaries"; // Contains hslMixer
import SquareComposition from "../squareComposition/SquareComposition";
import { writeToClipboard } from "../../utilities/clipboardUtils"; // Import clipboard utility
import { useFeedback } from "../../contexts/FeedbackContext.jsx"; // Import feedback context

import "./ColorMixer.css";
const { hexToRgb, rgbToHsl, hslToRgb, rgbToHex } = InformationTranslationFuncs;
const { inputOfTwoColorForAThird, opposite } = colorManagementFuncs; // Import opposite

const ColorMixer = ({ hex1, hex2, mixedColor, setMixedColor }) => {
  const [mixPercent, setMixPercent] = useState(50); // Default mix percentage
  const [contrastColor, setContrastColor] = useState("#FFFFFF"); // Default contrast
  const [shadowColorHex, setShadowColorHex] = useState("#000000"); // Added state for shadow
  const { showFeedback } = useFeedback(); // Use the feedback context hook

  // Function to handle copying hex codes to clipboard
  const handleHexCopy = (hex) => {
    if (!hex) return;
    writeToClipboard(hex)
      .then(() => {
        showFeedback(`Copied ${hex}!`, "success");
      })
      .catch((err) => {
        showFeedback("Failed to copy!", "error");
        console.error("Clipboard error: ", err);
      });
  };

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

      const currentMixedHex = rgbToHex(mixedRgb);
      // console.log({ currentMixedHex });
      setMixedColor(currentMixedHex);

      // Calculate contrast color for the mixed hex
      const brightness =
        (mixedRgb[0] * 299 + mixedRgb[1] * 587 + mixedRgb[2] * 114) / 1000;
      const currentContrastColor = brightness > 128 ? "#000000" : "#FFFFFF";
      setContrastColor(currentContrastColor);

      // Calculate shadow color
      const contrastRgb = hexToRgb(currentContrastColor);
      const shadowRgb = opposite(contrastRgb);
      setShadowColorHex(rgbToHex(shadowRgb));
    } catch (error) {
      console.error("Error mixing colors:", error);
      // Handle potential errors during conversion or mixing if necessary
      setMixedColor("#808080"); // Reset to default on error
      setContrastColor("#FFFFFF");
      setShadowColorHex("#000000"); // Reset shadow on error
    }
  }, [hex1, hex2, mixPercent, setMixedColor]); // Added setMixedColor dependency

  const handleSliderChange = (event) => {
    setMixPercent(Number(event.target.value));
  };

  return (
    <div className="mixer-container">
      <div
        className="color-mixer-container"
        style={{ backgroundColor: mixedColor, color: contrastColor }}
      >
        <div
          className="mixed-color-display"
          style={{ textShadow: `0 0 3px ${shadowColorHex}` }}
        >
          couleur mélangée:{" "}
          <span
            className="clickable-hex"
            onClick={() => handleHexCopy(mixedColor)}
          >
            {mixedColor.toUpperCase()}
          </span>
        </div>
        <div className="mixer-controls">
          <SquareComposition innerColor={mixedColor} outerColor={hex1} />
          <input
            type="range"
            min="0"
            max="100"
            value={mixPercent}
            onChange={handleSliderChange}
            className="mix-slider"
          />
          <SquareComposition innerColor={mixedColor} outerColor={hex2} />
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
