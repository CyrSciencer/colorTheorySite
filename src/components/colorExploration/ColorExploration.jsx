import React, { useState, useEffect } from "react";
import BigSquareComposition from "../squareComposition/BigSquareComposition";
import colorManagementFuncs from "../../utilities/complementaries"; // Assuming complementaries.js exports 'opposite' directly
import informationTranslationFuncs from "../../utilities/InformationTranslation"; // Import HSV functions
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

  const handleColorInputChange = (event) => {
    setInputHex(event.target.value);
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
      <h2>Color Exploration</h2>
      <button onClick={handleGenerate}>Generate Random Colors</button>

      {/* Only render results section if initial generation has happened */}
      {colors.random && (
        <div className="results-section">
          <h3>Generated Colors:</h3>
          <div className="color-swatches">
            {/* Random color swatch with input */}
            <div style={{ backgroundColor: hexColors.random }}>
              Random: {hexColors.random}
              <input
                type="color"
                value={hexColors.random} // Bind value to state hex
                onChange={handleColorInputChange}
                // Basic styling
              />
            </div>
            {/* Opposite color swatch */}
            <div style={{ backgroundColor: hexColors.opposite }}>
              Opposite: {hexColors.opposite}
            </div>
            {/* Derived color swatch */}
            <div style={{ backgroundColor: hexColors.hsvDerived }}>
              Derived: {hexColors.hsvDerived}
            </div>
          </div>

          <h3>Compositions (All Permutations):</h3>
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
