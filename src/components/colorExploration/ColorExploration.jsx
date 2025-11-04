import React, { useState, useEffect } from "react";
import BigSquareComposition from "../squareComposition/BigSquareComposition";
import colorManagementFuncs from "../../utilities/complementaries"; // Assuming complementaries.js exports 'second' directly
import informationTranslationFuncs from "../../utilities/InformationTranslation"; // Import HSV functions
import useClipboardWithFeedback from "../../utilities/useClipboardWithFeedback.jsx";
import {
  getRandomRgbArray,
  getPermutations,
  getIntermediateColors1,
  getIntermediateColors2,
} from "../../utilities/arrayUtils.js"; // Import helpers
import "./ColorExploration.css"; // We'll create this for styling the layout and gradient
import PopupWrapper from "../../utilities/PopupWrapper"; // Import shared component
import { colorExploration } from "../../utilities/ContentPopUpText";

const { complementary } = colorManagementFuncs;
const { rgbToHsv, hsvToRgb, hexToRgb, rgbToHex, hslToRgb, rgbToHsl } =
  informationTranslationFuncs;

const ColorExploration = () => {
  const [colors, setColors] = useState({
    firstColor: "#ffffff",
    secondColor: "#000000",
    thirdColor: "#808080",
  });
  const [inputHex, setInputHex] = useState("#ffffff"); // State for color input
  const copyWithFeedback = useClipboardWithFeedback(); // Use the hook
  const [secondaryOption, setSecondaryOption] = useState({
    complementary: true,
    hueChoice: 360,
    oppositeLum: 0,
    oppositeSat: 0,
  });
  const [thirdOption, setThirdOption] = useState({
    hueChoice: 1, // 1 = random, 2 = 1st in beetween, 3 = 2nd in between
  });
  // Function to calculate derived colors based on a starting RGB array
  const calculateDerivedColors = (firstColorRgbArr) => {
    if (!firstColorRgbArr || firstColorRgbArr.length !== 3) {
      return {
        firstColor: [255, 255, 255],
        secondColor: [0, 0, 0],
        thirdColor: [128, 128, 128],
      };
    }

    const firstColorHsl = rgbToHsl(firstColorRgbArr);

    // Calculate second color hue (complementary or custom)
    let secondColorHue;
    if (secondaryOption.complementary) {
      // Get complementary color to extract its hue
      const firstColorRgbFromHsl = hslToRgb(firstColorHsl);
      const complementaryRgb = complementary(firstColorRgbFromHsl);
      const complementaryHsl = rgbToHsl(complementaryRgb);
      secondColorHue = complementaryHsl.h;
    } else {
      // Use custom hue from slider
      secondColorHue = secondaryOption.hueChoice;
    }

    // Apply luminosity and saturation adjustments (always applied)
    // Range: -100 to 200
    // -100: extreme in same direction (light->white, dark->black)
    // 0: same as first color
    // 100: opposite value
    // 200: extreme in opposite direction (light->black, dark->white)

    const calculateAdjustedValue = (baseValue, sliderValue) => {
      if (sliderValue < 0) {
        // -100 to 0: Go from extreme in same direction to base value
        const factor = (sliderValue + 100) / 100; // 0 to 1
        const extreme = baseValue < 0.5 ? 0 : 1; // If dark, go to black; if light, go to white
        return extreme + factor * (baseValue - extreme);
      } else if (sliderValue <= 100) {
        // 0 to 100: Go from base value to opposite
        const factor = sliderValue / 100;
        const opposite = 1 - baseValue;
        return baseValue + factor * (opposite - baseValue);
      } else {
        // 100 to 200: Go from opposite to opposite's extreme
        const factor = (sliderValue - 100) / 100;
        const opposite = 1 - baseValue;
        const extreme = opposite < 0.5 ? 0 : 1;
        return opposite + factor * (extreme - opposite);
      }
    };

    const secondColorHsl = {
      h: secondColorHue,
      s: Math.max(
        0,
        Math.min(
          1,
          calculateAdjustedValue(firstColorHsl.s, secondaryOption.oppositeSat)
        )
      ),
      l: Math.max(
        0,
        Math.min(
          1,
          calculateAdjustedValue(firstColorHsl.l, secondaryOption.oppositeLum)
        )
      ),
    };
    const secondColorRgb = hslToRgb(secondColorHsl);

    // Calculate third color based on hue choice
    let thirdColorRgb;
    if (thirdOption.hueChoice === 1) {
      // Random hue with average saturation and luminosity
      const randomHue = Math.random() * 360;
      const thirdColorHsl = {
        h: randomHue,
        s: (secondColorHsl.s + firstColorHsl.s) / 2,
        l: (secondColorHsl.l + firstColorHsl.l) / 2,
      };
      thirdColorRgb = hslToRgb(thirdColorHsl);
    } else if (thirdOption.hueChoice === 2) {
      thirdColorRgb = getIntermediateColors1(firstColorRgbArr, secondColorRgb);
    } else {
      thirdColorRgb = getIntermediateColors2(firstColorRgbArr, secondColorRgb);
    }

    return {
      secondColor: secondColorRgb,
      thirdColor: thirdColorRgb,
    };
  };

  // Initial generation
  const handleGenerate = () => {
    const randomRgbArr = getRandomRgbArray();
    const randomHue = Math.floor(Math.random() * 360);

    // Update hue choice with random value
    setSecondaryOption((prev) => ({
      ...prev,
      hueChoice: randomHue,
    }));

    const derived = calculateDerivedColors(randomRgbArr);
    setColors({
      firstColor: randomRgbArr,
      ...derived,
    });
    setInputHex(rgbToHex(randomRgbArr)); // Update input hex as well
  };

  // Effect to update colors when inputHex changes
  useEffect(() => {
    // Avoid running if colors.firstColor is already set to this exact hex
    if (colors.firstColor && rgbToHex(colors.firstColor) === inputHex) {
      return;
    }

    const firstColorRgbArr = hexToRgb(inputHex);
    // Add validation for the RGB array from hex input
    if (firstColorRgbArr && firstColorRgbArr.every((val) => !isNaN(val))) {
      // Check if hex is valid AND resulted in valid numbers
      const derived = calculateDerivedColors(firstColorRgbArr);
      setColors({
        firstColor: firstColorRgbArr,
        ...derived,
      });
    } else {
      console.warn("Invalid hex input detected:", inputHex);
      // Optionally, reset to a default or previous valid state, or just do nothing
    }
    // We only want this effect to run when inputHex changes.
    // Adding colors.firstColor to dependency array would cause infinite loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputHex]);

  // Effect to recalculate colors when secondary options change
  useEffect(() => {
    if (colors.firstColor) {
      const derived = calculateDerivedColors(colors.firstColor);
      setColors((prev) => ({
        ...prev,
        ...derived,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondaryOption, thirdOption]);

  // Renamed from handleColorInputChange if using native input again
  const handleNativeColorInputChange = (event) => {
    setInputHex(event.target.value);
  };

  // Handlers for secondary color options
  const handleComplementaryToggle = () => {
    setSecondaryOption((prev) => ({
      ...prev,
      complementary: !prev.complementary,
    }));
  };

  const handleHueChoiceChange = (event) => {
    const value = parseFloat(event.target.value);
    setSecondaryOption((prev) => ({
      ...prev,
      hueChoice: value,
    }));
  };

  const handleOppositeLumChange = (event) => {
    const value = parseFloat(event.target.value);
    setSecondaryOption((prev) => ({
      ...prev,
      oppositeLum: value,
    }));
  };

  const handleOppositeSatChange = (event) => {
    const value = parseFloat(event.target.value);
    setSecondaryOption((prev) => ({
      ...prev,
      oppositeSat: value,
    }));
  };

  // Handler for third color options
  const handleThirdColorModeChange = (mode) => {
    setThirdOption({ hueChoice: mode });
  };

  // Prepare data for rendering
  // rgbToHex now handles null/invalid input, but we can still be explicit with defaults
  const hexColors = {
    firstColor: rgbToHex(colors.firstColor) || inputHex || "#ffffff", // Default to inputHex or white
    secondColor: rgbToHex(colors.secondColor) || "#000000", // Default to black if calculation fails
    thirdColor: rgbToHex(colors.thirdColor) || "#000000", // Default to black if calculation fails
  };

  // Check if permutations can be generated (requires 3 valid colors)
  const validColorArray = [
    colors.firstColor,
    colors.secondColor,
    colors.thirdColor,
  ].filter(
    (c) => Array.isArray(c) && c.length === 3 && c.every((v) => !isNaN(v))
  );
  const validPermutations =
    validColorArray.length === 3 ? getPermutations(validColorArray) : [];

  const hexPermutations = validPermutations.map(
    (perm) => perm.map(rgbToHex) // rgbToHex handles potential issues internally
  );

  return (
    <div className="color-exploration-container">
      <PopupWrapper
        title="Outil d'exploration de couleurs"
        content={colorExploration}
      >
        <h2>Outil d'exploration de couleurs</h2>
      </PopupWrapper>
      <div className="controls-section">
        <button onClick={handleGenerate}>Génération aléatoire:</button>

        <div className="options-container">
          <div className="secondary-options">
            <h3>Options pour la couleur secondaire:</h3>

            <div className="option-row">
              <button
                className={`toggle-button ${
                  secondaryOption.complementary ? "active" : "inactive"
                }`}
                onClick={handleComplementaryToggle}
              >
                {secondaryOption.complementary
                  ? "✓ Complémentaire"
                  : "✗ Complémentaire"}
              </button>
            </div>

            <div className="option-row">
              <label
                className={
                  secondaryOption.complementary ? "disabled-label" : ""
                }
              >
                Teinte: {Math.round(secondaryOption.hueChoice)}°
                {secondaryOption.complementary && " (verrouillé)"}
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={secondaryOption.hueChoice}
                  onChange={handleHueChoiceChange}
                  disabled={secondaryOption.complementary}
                />
              </label>
            </div>

            <div className="option-row">
              <label>
                Luminosité: {secondaryOption.oppositeLum}
                <input
                  type="range"
                  min="-100"
                  max="200"
                  step="1"
                  value={secondaryOption.oppositeLum}
                  onChange={handleOppositeLumChange}
                />
              </label>
            </div>

            <div className="option-row">
              <label>
                Saturation: {secondaryOption.oppositeSat}
                <input
                  type="range"
                  min="-100"
                  max="200"
                  step="1"
                  value={secondaryOption.oppositeSat}
                  onChange={handleOppositeSatChange}
                />
              </label>
            </div>
          </div>

          <div className="third-color-options">
            <h3>Options pour la couleur tertiaire:</h3>

            <div className="option-row">
              <div className="mode-buttons">
                <button
                  className={`mode-button ${
                    thirdOption.hueChoice === 1 ? "active" : ""
                  }`}
                  onClick={() => handleThirdColorModeChange(1)}
                >
                  Aléatoire
                </button>
                <button
                  className={`mode-button ${
                    thirdOption.hueChoice === 2 ? "active" : ""
                  }`}
                  onClick={() => handleThirdColorModeChange(2)}
                >
                  Chemin court
                </button>
                <button
                  className={`mode-button ${
                    thirdOption.hueChoice === 3 ? "active" : ""
                  }`}
                  onClick={() => handleThirdColorModeChange(3)}
                >
                  Chemin long
                </button>
              </div>
            </div>

            <div className="mode-description">
              {thirdOption.hueChoice === 1 && (
                <p>Teinte aléatoire avec saturation et luminosité moyennes</p>
              )}
              {thirdOption.hueChoice === 2 && (
                <p>
                  Couleur intermédiaire par le chemin le plus court sur la roue
                  chromatique
                </p>
              )}
              {thirdOption.hueChoice === 3 && (
                <p>
                  Couleur intermédiaire par le chemin le plus long sur la roue
                  chromatique
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Only render results section if initial generation has happened */}
      {colors.firstColor && (
        <div className="results-section">
          <h3>Couleurs générées:</h3>
          <div className="color-swatches">
            {/* First color swatch */}
            <div
              className="color-swatch-container"
              style={{ backgroundColor: hexColors.firstColor }}
            >
              couleur de départ:{" "}
              <span
                className="clickable-hex"
                onClick={() =>
                  copyWithFeedback(hexColors.firstColor, "Copied first color")
                }
              >
                {hexColors.firstColor}
              </span>
              {/* Assuming native input if reverted */}
              <input
                type="color"
                value={hexColors.firstColor}
                onChange={handleNativeColorInputChange} // Use updated handler name
                style={{ marginLeft: "10px" }} // Basic styling for spacing
              />
            </div>
            {/* Second color swatch */}
            <div
              className="color-swatch-container"
              style={{ backgroundColor: hexColors.secondColor }}
            >
              couleur secondaire:
              <span
                className="clickable-hex"
                onClick={() =>
                  copyWithFeedback(hexColors.secondColor, "Copied second color")
                }
              >
                {hexColors.secondColor}
              </span>
            </div>
            {/* Third color swatch */}
            <div
              className="color-swatch-container"
              style={{ backgroundColor: hexColors.thirdColor }}
            >
              Couleur dérivée:
              <span
                className="clickable-hex"
                onClick={() =>
                  copyWithFeedback(hexColors.thirdColor, "Copied third color")
                }
              >
                {hexColors.thirdColor}
              </span>
            </div>
          </div>

          <h3>Compositions (Toutes les permutations):</h3>
          <div className="compositions-grid">
            {hexPermutations.map((perm, index) => (
              <BigSquareComposition
                key={index}
                main={perm[0]}
                secondary={perm[1]}
                tertiary={perm[2]}
              />
            ))}
          </div>

          <h3>Gradient:</h3>
          <div
            className="gradient-display"
            style={{
              background: `linear-gradient(to right, ${hexColors.firstColor}, ${hexColors.thirdColor}, ${hexColors.secondColor})`,
              height: "50px",
              width: "100%",
              border: "1px solid #ccc",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ColorExploration;
