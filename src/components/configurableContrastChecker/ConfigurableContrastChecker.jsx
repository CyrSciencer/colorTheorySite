import React, { useState, useEffect } from "react";
import HexInput from "../hexInput/HexInput";
import RatioSection from "../compositionHarmony/RatioSection"; // Import RatioSection
import InformationTranslationFuncs from "../../utilities/InformationTranslation.js";
const { hexToRgb, rgbToHex } = InformationTranslationFuncs; // Removed unused contrast, rgbToHsl
import "./configurableContrast.css";
import PopupWrapper from "../../utilities/PopupWrapper";
import { configurableContrast } from "../../utilities/ContentPopUpText";

const ConfigurableContrastChecker = () => {
  // State to hold the full colorDataArray
  const [colorDataArray, setColorDataArray] = useState(() => {
    // Initial setup for 3 colors
    const initialColors = ["#CD3232", "#3232CD", "#CDCD32"];
    return initialColors.map((hex, index) => {
      const rgb = hexToRgb(hex);
      // const hsl = rgbToHsl(rgb);
      // Initial contrast calculation is removed
      // const initialContrastInfo = contrast(hsl);
      return {
        name: `Color ${String.fromCharCode(65 + index)}`,
        rgbValue: rgb,
        // Store contrastInfo directly, default to 1
        contrastInfo: 1,
        hexValue: hex,
      };
    });
  });

  // No longer need separate hexValues state

  // Update useEffect to recalculate contrast if needed (e.g., if contrast function changes)
  // Or remove if contrast depends only on HSL derived from hex

  const handleHexChange = (index, newHex) => {
    setColorDataArray((prevArray) => {
      const updatedArray = [...prevArray];
      const rgb = hexToRgb(newHex);
      // Contrast info is no longer calculated here automatically
      updatedArray[index] = {
        ...updatedArray[index],
        rgbValue: rgb,
        // contrastInfo remains as it was, modifiable separately
        hexValue: newHex,
      };
      return updatedArray;
    });
  };

  // New handler for changing contrastInfo directly
  const handleContrastInfoChange = (index, newContrastInfo) => {
    // Basic validation: ensure it's a number or empty string (for clearing)
    const value = newContrastInfo === "" ? "" : parseFloat(newContrastInfo);

    if (!isNaN(value) || newContrastInfo === "") {
      setColorDataArray((prevArray) => {
        const updatedArray = [...prevArray];
        // Enforce minimum value of 1
        let finalContrastInfo = value === "" ? 1 : Math.max(1, value);

        updatedArray[index] = {
          ...updatedArray[index],
          // Update only contrastInfo
          contrastInfo: finalContrastInfo, // Use validated value
        };
        return updatedArray;
      });
    }
    // Optional: Add feedback if input is invalid
  };

  const addInput = () => {
    if (colorDataArray.length < 6) {
      const newIndex = colorDataArray.length;
      const newHex = "#DDDDDD"; // Default new color
      const rgb = hexToRgb(newHex);
      // const hsl = rgbToHsl(rgb);
      // Calculate initial contrast for the new color is removed
      // const initialContrastInfo = contrast(hsl);
      const newColorData = {
        name: `Color ${String.fromCharCode(65 + newIndex)}`,
        rgbValue: rgb,
        contrastInfo: 1, // Default contrastInfo to 1
        hexValue: newHex,
      };
      setColorDataArray((prevArray) => [...prevArray, newColorData]);
    }
  };

  const removeInput = () => {
    if (colorDataArray.length > 3) {
      setColorDataArray((prevArray) => prevArray.slice(0, -1));
    }
  };

  return (
    <div className="configurable-contrast-checker">
      <PopupWrapper
        title="Outil de contraste configurable"
        content={configurableContrast}
      >
        <h2>Outil de contraste configurable</h2>
      </PopupWrapper>
      <div className="inputs-section">
        <div className="inputs-wrapper">
          {/* Map over colorDataArray to render inputs */}
          {colorDataArray.map((colorData, index) => (
            <div key={colorData.name} className="color-input-group">
              <HexInput
                // key={colorData.name} // Key moved to parent div
                hex={colorData.hexValue} // Use the stored hex value
                setHex={(newHex) => handleHexChange(index, newHex)}
                title={colorData.name}
              />
              {/* Add input for contrastInfo */}
              <div className="contrast-info-input">
                <label htmlFor={`contrast-info-${index}`}>Ratio:</label>
                <input
                  id={`contrast-info-${index}`}
                  type="number"
                  step="1" // Allow decimal input
                  min="1" // Set minimum value for the input
                  value={colorData.contrastInfo}
                  onChange={(e) =>
                    handleContrastInfoChange(index, e.target.value)
                  }
                  placeholder="1"
                  className="ratio-input"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="controls-wrapper">
          <button onClick={addInput} disabled={colorDataArray.length >= 6}>
            Ajouter
          </button>
          <button onClick={removeInput} disabled={colorDataArray.length <= 3}>
            Retirer
          </button>
        </div>
      </div>
      {/* Add RatioSection components */}
      <div className="contrast-results">
        {/* Pass the array and necessary functions to RatioSection */}
        <RatioSection
          title="Bande de contraste"
          colorDataArray={colorDataArray}
          // rgbToHex is needed by RatioSection internally, let's pass it
        />
      </div>
    </div>
  );
};

export default ConfigurableContrastChecker;
