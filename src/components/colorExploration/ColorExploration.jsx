import React, { useState, useEffect, useRef } from "react";
import BigSquareComposition from "../squareComposition/BigSquareComposition";
import colorManagementFuncs from "../../utilities/complementaries"; // Assuming complementaries.js exports 'opposite' directly
import informationTranslationFuncs from "../../utilities/InformationTranslation"; // Import HSV functions
import { writeToClipboard } from "../../utilities/clipboardUtils"; // Import clipboard utility
import { useFeedback } from "../../contexts/FeedbackContext.jsx"; // Import feedback context
import "./ColorExploration.css"; // We'll create this for styling the layout and gradient
const { opposite } = colorManagementFuncs;
const { rgbToHsv, hsvToRgb, hexToRgb, rgbToHex } = informationTranslationFuncs;
// Helper function to generate a random RGB color array
const getRandomRgbArray = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return [r, g, b];
};

// Helper function to generate permutations of an array
const getPermutations = (arr) => {
  if (arr.length === 0) return [[]];
  const firstElement = arr[0];
  const rest = arr.slice(1);

  const permsWithoutFirst = getPermutations(rest);
  const allPermutations = [];

  permsWithoutFirst.forEach((perm) => {
    for (let i = 0; i <= perm.length; i++) {
      const permWithFirst = [
        ...perm.slice(0, i),
        firstElement,
        ...perm.slice(i),
      ];
      allPermutations.push(permWithFirst);
    }
  });
  return allPermutations;
};

const ColorExploration = () => {
  const [colors, setColors] = useState({
    random: null,
    opposite: null,
    hsvDerived: null,
  });
  const [inputHex, setInputHex] = useState("#ffffff"); // State for color input
  const { showFeedback } = useFeedback(); // Use the feedback context hook

  // Function to calculate derived colors based on a starting RGB array
  const calculateDerivedColors = (startRgbArr) => {
    if (!startRgbArr || startRgbArr.length !== 3) {
      return { opposite: null, hsvDerived: null };
    }
    const oppRgbArr = opposite(startRgbArr);
    const randomHsv = rgbToHsv(startRgbArr);
    const oppositeHsv = rgbToHsv(oppRgbArr);
    const avgS = (randomHsv.s + oppositeHsv.s) / 2;
    const avgV = (randomHsv.v + oppositeHsv.v) / 2;
    const randomHue = Math.random() * 360;
    const newHsv = { h: randomHue, s: avgS, v: avgV };
    const hsvDerivedRgbArr = hsvToRgb(newHsv);

    return {
      opposite: oppRgbArr,
      hsvDerived: hsvDerivedRgbArr,
    };
  };

  // Initial generation
  const handleGenerate = () => {
    const randomRgbArr = getRandomRgbArray();
    const derived = calculateDerivedColors(randomRgbArr);
    setColors({
      random: randomRgbArr,
      ...derived,
    });
    setInputHex(rgbToHex(randomRgbArr)); // Update input hex as well
  };

  // Effect to update colors when inputHex changes
  useEffect(() => {
    // Avoid running on initial mount if colors.random is already set by handleGenerate
    if (colors.random && rgbToHex(colors.random) === inputHex) {
      return;
    }

    const currentRgbArr = hexToRgb(inputHex);
    // Add validation for the RGB array from hex input
    if (currentRgbArr && currentRgbArr.every((val) => !isNaN(val))) {
      // Check if hex is valid AND resulted in valid numbers
      const derived = calculateDerivedColors(currentRgbArr);
      setColors({
        random: currentRgbArr,
        ...derived,
      });
    } else {
      console.warn("Invalid hex input detected:", inputHex);
      // Optionally, reset to a default or previous valid state, or just do nothing
    }
    // We only want this effect to run when inputHex changes.
    // Adding colors.random to dependency array would cause infinite loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputHex]);

  // Renamed from handleColorInputChange if using native input again
  const handleNativeColorInputChange = (event) => {
    setInputHex(event.target.value);
  };

  // Function to handle copying hex codes to clipboard
  const handleHexCopy = (hex) => {
    writeToClipboard(hex)
      .then(() => {
        showFeedback(`Copied ${hex}!`, "success");
      })
      .catch((err) => {
        showFeedback("Failed to copy!", "error");
        console.error("Clipboard error: ", err);
      });
  };

  // Prepare data for rendering
  const colorArray = [colors.random, colors.opposite, colors.hsvDerived].filter(
    Boolean
  );
  const colorPermutations =
    colorArray.length === 3 ? getPermutations(colorArray) : [];

  // rgbToHex now handles null/invalid input, but we can still be explicit with defaults
  const hexColors = {
    random: rgbToHex(colors.random) || inputHex || "#ffffff", // Default to inputHex or white
    opposite: rgbToHex(colors.opposite) || "#000000", // Default to black if calculation fails
    hsvDerived: rgbToHex(colors.hsvDerived) || "#000000", // Default to black if calculation fails
  };

  // Check if permutations can be generated (requires 3 valid colors)
  const validColorArray = [
    colors.random,
    colors.opposite,
    colors.hsvDerived,
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
      <h2>Outil d'exploration de couleurs</h2>
      <button onClick={handleGenerate}>Génération aléatoire:</button>

      {/* Only render results section if initial generation has happened */}
      {colors.random && (
        <div className="results-section">
          <h3>Couleurs générées:</h3>
          <div className="color-swatches">
            {/* Random color swatch */}
            <div
              className="color-swatch-container"
              style={{ backgroundColor: hexColors.random }}
            >
              Couleur aléatoire:{" "}
              <span
                className="clickable-hex"
                onClick={() => handleHexCopy(hexColors.random)}
              >
                {hexColors.random}
              </span>
              {/* Assuming native input if reverted */}
              <input
                type="color"
                value={hexColors.random}
                onChange={handleNativeColorInputChange} // Use updated handler name
                style={{ marginLeft: "10px" }} // Basic styling for spacing
              />
            </div>
            {/* Opposite color swatch */}
            <div
              className="color-swatch-container"
              style={{ backgroundColor: hexColors.opposite }}
            >
              Couleur opposée:
              <span
                className="clickable-hex"
                onClick={() => handleHexCopy(hexColors.opposite)}
              >
                {hexColors.opposite}
              </span>
            </div>
            {/* Derived color swatch */}
            <div
              className="color-swatch-container"
              style={{ backgroundColor: hexColors.hsvDerived }}
            >
              Couleur dérivée:
              <span
                className="clickable-hex"
                onClick={() => handleHexCopy(hexColors.hsvDerived)}
              >
                {hexColors.hsvDerived}
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
              background: `linear-gradient(to right, ${hexColors.random}, ${hexColors.hsvDerived}, ${hexColors.opposite})`,
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
