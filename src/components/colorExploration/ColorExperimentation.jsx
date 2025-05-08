import React, { useState, useEffect } from "react";
import BigSquareComposition from "../squareComposition/BigSquareComposition.jsx";
import informationTranslationFuncs from "../../utilities/InformationTranslation.js";
import useClipboardWithFeedback from "../../utilities/useClipboardWithFeedback.jsx";
import {
  getRandomRgbArray,
  getPermutations,
} from "../../utilities/arrayUtils.js"; // Import helpers
import "./ColorExploration.css";
import PopupWrapper from "../../utilities/PopupWrapper.jsx";
import { colorExperimentation } from "../../utilities/ContentPopUpText";

const { rgbToHsv, hsvToRgb, hexToRgb, rgbToHex } = informationTranslationFuncs;

/*
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
*/

const ColorExperimentation = () => {
  const [color1, setColor1] = useState(null); // User-modifiable base color
  const [color2, setColor2] = useState(null); // Random Hue, Opposite Luminosity, modifiable
  const [color3, setColor3] = useState(null); // Derived color

  const [inputHex1, setInputHex1] = useState("#ffffff");
  const [inputHex2, setInputHex2] = useState("#000000"); // Initial placeholder

  const copyWithFeedback = useClipboardWithFeedback();

  // Function to calculate color2 and color3 based on color1
  const calculateDerivedColors = (baseRgbArr) => {
    if (!baseRgbArr || baseRgbArr.length !== 3) {
      return { c2: null, c3: null };
    }

    const baseHsv = rgbToHsv(baseRgbArr);

    // Calculate Color 2: Random Hue, Opposite Luminosity
    const color2Hsv = {
      h: Math.random() * 360, // Random Hue
      s: baseHsv.s, // Saturation from color1 (or could be a fixed value like 1)
      v: 1 - baseHsv.v, // Opposite Luminosity
    };
    const color2RgbArr = hsvToRgb(color2Hsv);

    // Calculate Color 3: Random Hue, Average Saturation and Value of color1 and color2
    const color2HsvForAvg = rgbToHsv(color2RgbArr); // Ensure we use the actual HSV of color2 for averaging
    const avgS = (baseHsv.s + color2HsvForAvg.s) / 2;
    const avgV = (baseHsv.v + color2HsvForAvg.v) / 2;
    const color3Hsv = {
      h: Math.random() * 360, // Random Hue
      s: avgS,
      v: avgV,
    };
    const color3RgbArr = hsvToRgb(color3Hsv);

    return {
      c2: color2RgbArr,
      c3: color3RgbArr,
    };
  };

  // Initial generation for color1 and subsequent derivations
  const handleGenerate = () => {
    const randomRgbArr1 = getRandomRgbArray();
    setColor1(randomRgbArr1);
    setInputHex1(rgbToHex(randomRgbArr1));

    const { c2, c3 } = calculateDerivedColors(randomRgbArr1);
    if (c2) {
      setColor2(c2);
      setInputHex2(rgbToHex(c2));
    }
    if (c3) {
      setColor3(c3);
    }
  };

  // Effect for Color 1 changes (from hex input)
  useEffect(() => {
    if (color1 && rgbToHex(color1) === inputHex1) {
      return; // Avoid loop if hex input matches current color1
    }
    const currentRgbArr1 = hexToRgb(inputHex1);
    if (currentRgbArr1 && currentRgbArr1.every((val) => !isNaN(val))) {
      setColor1(currentRgbArr1);
      // Recalculate color2 and color3 based on the new color1
      const { c2, c3 } = calculateDerivedColors(currentRgbArr1);
      if (c2) {
        setColor2(c2);
        setInputHex2(rgbToHex(c2)); // Update hex for color2 as well
      }
      if (c3) {
        setColor3(c3);
      }
    } else {
      console.warn("Invalid hex input for Color 1:", inputHex1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputHex1]); // Only depends on inputHex1

  // Effect for Color 2 changes (from hex input)
  useEffect(() => {
    if (color2 && rgbToHex(color2) === inputHex2) {
      return; // Avoid loop if hex input matches current color2
    }
    const currentRgbArr2 = hexToRgb(inputHex2);
    if (currentRgbArr2 && currentRgbArr2.every((val) => !isNaN(val))) {
      setColor2(currentRgbArr2);
      // Recalculate color3 based on the new color2 (and existing color1)
      if (color1) {
        const color1Hsv = rgbToHsv(color1);
        const color2Hsv = rgbToHsv(currentRgbArr2);

        const avgS = (color1Hsv.s + color2Hsv.s) / 2;
        const avgV = (color1Hsv.v + color2Hsv.v) / 2;
        const color3Hsv = {
          h: Math.random() * 360,
          s: avgS,
          v: avgV,
        };
        setColor3(hsvToRgb(color3Hsv));
      }
    } else {
      console.warn("Invalid hex input for Color 2:", inputHex2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputHex2, color1]); // Depends on inputHex2 and color1 (for recalculating color3)

  const handleNativeColorInputChange1 = (event) => {
    setInputHex1(event.target.value);
  };

  const handleNativeColorInputChange2 = (event) => {
    setInputHex2(event.target.value);
  };

  const hexColor1 = rgbToHex(color1) || inputHex1 || "#ffffff";
  const hexColor2 = rgbToHex(color2) || inputHex2 || "#000000";
  const hexColor3 = rgbToHex(color3) || "#000000";

  const validColorArray = [color1, color2, color3].filter(
    (c) => Array.isArray(c) && c.length === 3 && c.every((v) => !isNaN(v))
  );
  const validPermutations =
    validColorArray.length === 3 ? getPermutations(validColorArray) : [];
  const hexPermutations = validPermutations.map((perm) => perm.map(rgbToHex));

  // Initial generation if colors are not set
  useEffect(() => {
    if (!color1) {
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return (
    <div className="color-exploration-container">
      <PopupWrapper
        title="Outils exploratif de composition"
        content={colorExperimentation}
      >
        <h2>Outils exploratif de composition</h2>
      </PopupWrapper>
      <div className="controls-section">
        <button onClick={handleGenerate}>Générer une nouvelle palette</button>
      </div>

      {color1 && color2 && color3 && (
        <div className="results-section">
          <h3>Couleurs générées:</h3>
          <div className="color-swatches">
            {/* Color 1 Swatch */}
            <div
              className="color-swatch-container"
              style={{ backgroundColor: hexColor1 }}
            >
              Couleur première:{" "}
              <span
                className="clickable-hex"
                onClick={() => copyWithFeedback(hexColor1, "Copied Color 1")}
              >
                {hexColor1}
              </span>
              <input
                type="color"
                value={hexColor1}
                onChange={handleNativeColorInputChange1}
                style={{ marginLeft: "10px" }}
              />
            </div>

            {/* Color 2 Swatch */}
            <div
              className="color-swatch-container"
              style={{ backgroundColor: hexColor2 }}
            >
              Couleur luminosité opposée:{" "}
              <span
                className="clickable-hex"
                onClick={() => copyWithFeedback(hexColor2, "Copied Color 2")}
              >
                {hexColor2}
              </span>
              <input
                type="color"
                value={hexColor2}
                onChange={handleNativeColorInputChange2}
                style={{ marginLeft: "10px" }}
              />
            </div>

            {/* Color 3 Swatch */}
            <div
              className="color-swatch-container"
              style={{ backgroundColor: hexColor3 }}
            >
              Couleur dérivée:{" "}
              <span
                className="clickable-hex"
                onClick={() => copyWithFeedback(hexColor3, "Copied Color 3")}
              >
                {hexColor3}
              </span>
              {/* Color 3 is not directly modifiable by input, it's derived */}
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
              background: `linear-gradient(to right, ${hexColor1}, ${hexColor2}, ${hexColor3})`,
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

export default ColorExperimentation;
