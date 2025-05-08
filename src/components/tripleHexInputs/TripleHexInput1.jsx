import { useState, useEffect, useRef } from "react";
import React from "react"; // Added React for cloneElement
import HexInput from "../hexInput/HexInput"; // Adjust path as needed
import colorManagementFuncs from "../../utilities/complementaries.js";
import InformationTranslationFuncs from "../../utilities/InformationTranslation.js";
import "./tripleHexInput.css";
import SquareComposition from "../squareComposition/SquareComposition";
import useClipboardWithFeedback from "../../utilities/useClipboardWithFeedback.jsx"; // Import the hook
import PopupWrapper from "../../utilities/PopupWrapper"; // Import shared component
import { OutilDanalyseDintermédiaires } from "../../utilities/ContentPopUpText";
const { generateIntermediateColors, opposite } = colorManagementFuncs;
const { hexToRgb, rgbToHex, getContrastingTextColorRgb } =
  InformationTranslationFuncs;

const TripleHexInput1 = () => {
  const [hexA, setHexA] = useState("#CD3232"); // Example initial red
  const [hexB, setHexB] = useState("#3232CD"); // Example initial green
  const [hexC, setHexC] = useState("#CDCD32"); // Example initial blue (target)
  const [factor, setFactor] = useState(0.5);
  const [intermediateColors, setIntermediateColors] = useState({
    hex3: null,
    hex4: null,
    contrast3: "#000000", // Default contrast
    contrast4: "#000000", // Default contrast
    shadow3: "#FFFFFF", // Added default shadow
    shadow4: "#FFFFFF", // Added default shadow
    contrastA: "#000000",
    contrastB: "#000000",
    contrastC: "#000000",
    // Shadows for A, B, C handled by HexInput component
  });

  const copyWithFeedback = useClipboardWithFeedback(); // Use the hook

  useEffect(() => {
    try {
      const rgb1 = hexToRgb(hexA);
      const rgb2 = hexToRgb(hexB);
      const targetRGB = hexToRgb(hexC);

      const { rgb3, rgb4 } = generateIntermediateColors(
        rgb1,
        rgb2,
        targetRGB,
        factor
      );

      const finalHex3 = rgbToHex(rgb3);
      const finalHex4 = rgbToHex(rgb4);
      const contrastRgb3 = getContrastingTextColorRgb(rgb3);
      const contrastRgb4 = getContrastingTextColorRgb(rgb4);
      const finalContrast3 = rgbToHex(contrastRgb3);
      const finalContrast4 = rgbToHex(contrastRgb4);

      const finalShadow3 = rgbToHex(opposite(contrastRgb3));
      const finalShadow4 = rgbToHex(opposite(contrastRgb4));

      const finalContrastA = rgbToHex(getContrastingTextColorRgb(rgb1));
      const finalContrastB = rgbToHex(getContrastingTextColorRgb(rgb2));
      const finalContrastC = rgbToHex(getContrastingTextColorRgb(targetRGB));

      setIntermediateColors({
        hex3: finalHex3,
        hex4: finalHex4,
        contrast3: finalContrast3,
        contrast4: finalContrast4,
        shadow3: finalShadow3,
        shadow4: finalShadow4,
        contrastA: finalContrastA,
        contrastB: finalContrastB,
        contrastC: finalContrastC,
      });
    } catch (error) {
      console.error("Error generating intermediate colors:", error);
      setIntermediateColors((prev) => ({
        // Reset using previous state structure
        ...prev, // Keep existing keys
        hex3: null,
        hex4: null,
        contrast3: "#000000",
        contrast4: "#000000",
        shadow3: "#FFFFFF", // Reset shadow
        shadow4: "#FFFFFF", // Reset shadow
        contrastA: "#000000",
        contrastB: "#000000",
        contrastC: "#000000",
      }));
    }
  }, [
    hexA,
    hexB,
    hexC,
    factor,
    rgbToHex,
    hexToRgb,
    generateIntermediateColors,
    getContrastingTextColorRgb,
    opposite,
  ]);

  return (
    <div className="triple-hex-input-one-container">
      <PopupWrapper
        title="Outil d'analyse d'intermédiaires"
        content={OutilDanalyseDintermédiaires}
      >
        <h2>Outil d'analyse d'intermédiaires</h2>
      </PopupWrapper>
      <div className="logic-container">
        <div className="square-container">
          <div className="square-wrapper">
            <SquareComposition
              outerColor={hexA}
              innerColor={intermediateColors.hex3}
            />
            <SquareComposition
              outerColor={hexB}
              innerColor={intermediateColors.hex3}
            />

            <SquareComposition
              outerColor={intermediateColors.hex3}
              innerColor={hexA}
            />
            <SquareComposition
              outerColor={intermediateColors.hex3}
              innerColor={hexB}
            />
          </div>
          <div className="square-wrapper">
            <SquareComposition
              outerColor={hexA}
              innerColor={intermediateColors.hex4}
            />
            <SquareComposition
              outerColor={hexB}
              innerColor={intermediateColors.hex4}
            />

            <SquareComposition
              outerColor={intermediateColors.hex4}
              innerColor={hexA}
            />
            <SquareComposition
              outerColor={intermediateColors.hex4}
              innerColor={hexB}
            />
          </div>
        </div>

        <div className="inputs-wrapper">
          <HexInput
            hex={hexA}
            setHex={setHexA}
            title="Couleur A"
            contrastColor={intermediateColors.contrastA}
          />
          <HexInput
            hex={hexB}
            setHex={setHexB}
            title="Couleur B"
            contrastColor={intermediateColors.contrastB}
          />
        </div>
        <div>
          <div className="factor-slider-container">
            <label htmlFor="factor-slider">direction des intermédiaires:</label>
            <input
              type="range"
              id="factor-slider"
              min="0"
              max="1"
              step="0.01"
              value={factor}
              onChange={(e) => setFactor(parseFloat(e.target.value))}
              className="factor-slider"
            />
          </div>

          <div className="results-wrapper">
            <h5>Couleurs intermédiaires:</h5>
            <div className="results-container">
              {intermediateColors.hex3 && (
                <div
                  className="result-item"
                  style={{
                    backgroundColor: intermediateColors.hex3,
                    color: intermediateColors.contrast3,
                    textShadow: `0 0 3px ${intermediateColors.shadow3}`, // Apply shadow 3
                  }}
                >
                  <p>
                    <span
                      className="clickable-hex"
                      onClick={() =>
                        copyWithFeedback(
                          intermediateColors.hex3,
                          "Copied Intermediate 1"
                        )
                      }
                    >
                      {intermediateColors.hex3}
                    </span>
                  </p>
                </div>
              )}
              {intermediateColors.hex4 && (
                <div
                  className="result-item"
                  style={{
                    backgroundColor: intermediateColors.hex4,
                    color: intermediateColors.contrast4,
                    textShadow: `0 0 3px ${intermediateColors.shadow4}`, // Apply shadow 4
                  }}
                >
                  <p>
                    <span
                      className="clickable-hex"
                      onClick={() =>
                        copyWithFeedback(
                          intermediateColors.hex4,
                          "Copied Intermediate 2"
                        )
                      }
                    >
                      {intermediateColors.hex4}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="target-input-wrapper">
          <HexInput
            hex={hexC}
            setHex={setHexC}
            title="Couleur C (Cible)"
            contrastColor={intermediateColors.contrastC}
          />
        </div>
        <div className="square-container">
          <div className="square-wrapper">
            <SquareComposition outerColor={hexC} innerColor={hexA} />
            <SquareComposition outerColor={hexC} innerColor={hexB} />

            <SquareComposition
              outerColor={intermediateColors.hex3}
              innerColor={hexA}
            />

            <SquareComposition
              outerColor={hexC}
              innerColor={intermediateColors.hex3}
            />
          </div>
          <div className="square-wrapper">
            <SquareComposition outerColor={hexA} innerColor={hexC} />
            <SquareComposition outerColor={hexB} innerColor={hexC} />

            <SquareComposition
              outerColor={intermediateColors.hex4}
              innerColor={hexB}
            />
            <SquareComposition
              outerColor={hexC}
              innerColor={intermediateColors.hex4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripleHexInput1;
