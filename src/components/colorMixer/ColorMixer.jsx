import React, { useState, useEffect } from "react";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import colorManagementFuncs from "../../utilities/complementaries"; // Contains hslMixer
import SquareComposition from "../squareComposition/SquareComposition";
import useClipboardWithFeedback from "../../utilities/useClipboardWithFeedback.jsx";

import "./ColorMixer.css";
const { hexToRgb, rgbToHsl, hslToRgb, rgbToHex } = InformationTranslationFuncs;
const { advancedColorBlend, opposite } = colorManagementFuncs; // Import opposite

const ColorMixer = ({ hex1, hex2, mixedColor, setMixedColor }) => {
  const [mixPercent, setMixPercent] = useState(50); // Default mix percentage
  const [contrastColor, setContrastColor] = useState("#FFFFFF"); // Default contrast
  const [shadowColorHex, setShadowColorHex] = useState("#000000"); // Added state for shadow
  const copyWithFeedback = useClipboardWithFeedback(); // Use the custom hook

  useEffect(() => {
    try {
      const validHex1 = /^#[0-9A-F]{6}$/i.test(hex1) ? hex1 : "#000000";
      const validHex2 = /^#[0-9A-F]{6}$/i.test(hex2) ? hex2 : "#FFFFFF";

      const rgb1 = hexToRgb(validHex1);
      const rgb2 = hexToRgb(validHex2);

      const RgbSet = advancedColorBlend(rgb1, rgb2, mixPercent / 100);
      const mixedRgb = RgbSet.rgb3;
      const currentMixedHex = rgbToHex(mixedRgb);
      setMixedColor(currentMixedHex);

      const brightness =
        (mixedRgb[0] * 299 + mixedRgb[1] * 587 + mixedRgb[2] * 114) / 1000;
      const currentContrastColor = brightness > 128 ? "#000000" : "#FFFFFF";
      setContrastColor(currentContrastColor);

      const contrastRgb = hexToRgb(currentContrastColor);
      const shadowRgb = opposite(contrastRgb);
      setShadowColorHex(rgbToHex(shadowRgb));
    } catch (error) {
      console.error("Error mixing colors:", error);
      setMixedColor("#808080");
      setContrastColor("#FFFFFF");
      setShadowColorHex("#000000");
    }
  }, [hex1, hex2, mixPercent, setMixedColor]);

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
            onClick={() => copyWithFeedback(mixedColor, "Copied mixed color")}
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
