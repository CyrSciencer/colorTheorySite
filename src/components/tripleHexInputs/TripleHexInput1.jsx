import { useState, useEffect, useRef } from "react";
import React from "react"; // Added React for cloneElement
import HexInput from "../hexInput/HexInput"; // Adjust path as needed
import colorManagementFuncs from "../../utilities/complementaries.js";
import InformationTranslationFuncs from "../../utilities/InformationTranslation.js";
import "./tripleHexInput.css";
import SquareComposition from "../squareComposition/SquareComposition";
import { writeToClipboard } from "../../utilities/clipboardUtils.js";
import FeedbackPopup from "../popUp/FeedbackPopup"; // Import FeedbackPopup
import PopupWrapper from "../../utilities/PopupWrapper"; // Import shared component
import { OutilDanalyseDintermédiaires } from "../../utilities/ContentPopUpText";
const { generateIntermediateColors, opposite } = colorManagementFuncs;
const { hexToRgb, rgbToHex } = InformationTranslationFuncs;

// Helper function to determine contrast color based on RGB sum
const getContrastColorFromRgb = (rgb) => {
  let brightnessSum = 0;
  rgb.forEach((val) => {
    brightnessSum += val;
  });
  // If sum > 382 (threshold from SingleColorPage), use black text, else white
  const contrastRgb = brightnessSum > 382 ? [0, 0, 0] : [255, 255, 255];
  return rgbToHex(contrastRgb); // Return as hex string
};

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

  // Local state for feedback popup
  const [feedback, setFeedback] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });
  const feedbackTimeoutRef = useRef(null); // Ref to manage timeout

  // Function to handle copying hex codes to clipboard using local state
  const handleHexCopy = (hex) => {
    if (!hex) return;

    // Clear previous timeout if it exists
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    writeToClipboard(hex)
      .then(() => {
        setFeedback({
          isVisible: true,
          message: `Copied ${hex}!`,
          type: "success",
        });
      })
      .catch((err) => {
        setFeedback({
          isVisible: true,
          message: "Failed to copy!",
          type: "error",
        });
        console.error("Clipboard error: ", err);
      })
      .finally(() => {
        // Set a new timeout to hide the feedback
        feedbackTimeoutRef.current = setTimeout(() => {
          setFeedback((prev) => ({ ...prev, isVisible: false }));
        }, 2500); // Hide after 2.5 seconds
      });
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

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
      const finalContrast3 = getContrastColorFromRgb(rgb3);
      const finalContrast4 = getContrastColorFromRgb(rgb4);

      // Calculate shadow colors for intermediate results
      const finalShadow3 = rgbToHex(opposite(hexToRgb(finalContrast3)));
      const finalShadow4 = rgbToHex(opposite(hexToRgb(finalContrast4)));

      // Calculate contrast for inputs (shadows handled within HexInput)
      const finalContrastA = getContrastColorFromRgb(rgb1);
      const finalContrastB = getContrastColorFromRgb(rgb2);
      const finalContrastC = getContrastColorFromRgb(targetRGB);

      setIntermediateColors({
        hex3: finalHex3,
        hex4: finalHex4,
        contrast3: finalContrast3,
        contrast4: finalContrast4,
        shadow3: finalShadow3, // Set shadow state
        shadow4: finalShadow4, // Set shadow state
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
  }, [hexA, hexB, hexC, factor]); // Recalculate when inputs or factor change

  return (
    <div className="triple-hex-input-one-container">
      {/* Render the local FeedbackPopup */}
      <FeedbackPopup
        isVisible={feedback.isVisible}
        message={feedback.message}
        type={feedback.type}
      />

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
                      onClick={() => handleHexCopy(intermediateColors.hex3)}
                    >
                      {intermediateColors.hex3.toUpperCase()}
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
                      onClick={() => handleHexCopy(intermediateColors.hex4)}
                    >
                      {intermediateColors.hex4.toUpperCase()}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <HexInput
          hex={hexC}
          setHex={setHexC}
          title="Couleur cible"
          contrastColor={intermediateColors.contrastC}
        />
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
