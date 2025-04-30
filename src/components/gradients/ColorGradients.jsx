import React from "react";
import InformationTranslationFuncs from "../../../utilities/InformationTranslation";
import "./gradient.css"; // Reusing the existing CSS for simplicity

// Function to determine contrast color (black or white) based on RGB array
const getContrastColor = (rgbArray) => {
  // Simple brightness calculation (YIQ formula)
  const brightness =
    (rgbArray[0] * 299 + rgbArray[1] * 587 + rgbArray[2] * 114) / 1000;
  return brightness > 128 ? [0, 0, 0] : [255, 255, 255]; // Return black or white RGB array
};

const ColorGradients = ({ rgb }) => {
  // Convert input RGB color to HSL using the object format
  const hsl1 = InformationTranslationFuncs.rgbToHsl
    ? InformationTranslationFuncs.rgbToHsl(rgb) // rgb is already an array
    : { h: 0, s: 1, l: 0.5 }; // Fallback

  const h1 = hsl1.h;
  const s1 = hsl1.s;
  const l1 = hsl1.l;

  // --- Hue Gradients --- //
  const h_comp = (h1 + 180) % 360;
  let diff_short = h_comp - h1;
  if (diff_short > 180) {
    diff_short -= 360;
  } else if (diff_short < -180) {
    diff_short += 360;
  }
  const diff_long = diff_short >= 0 ? diff_short - 360 : diff_short + 360;
  const hueStep_short = diff_short / 9;
  const hueStep_long = diff_long / 9;

  const renderHueGradient = (hueStep, startHue) => {
    return Array.from({ length: 10 }, (_, i) => {
      const currentHue = (startHue + i * hueStep + 360) % 360;
      const currentHsl = { h: currentHue, s: s1, l: l1 };
      const currentRgb = InformationTranslationFuncs.hslToRgb
        ? InformationTranslationFuncs.hslToRgb(currentHsl)
        : [0, 0, 0]; // Fallback RGB array
      const currentHex = InformationTranslationFuncs.rgbVersHex
        ? InformationTranslationFuncs.rgbVersHex(currentRgb)
        : "#000000"; // Fallback
      const contrastRgb = getContrastColor(currentRgb); // Pass array, receive array
      const contrastHex = InformationTranslationFuncs.rgbVersHex(contrastRgb); // Pass array
      const cssHsl = `hsl(${currentHsl.h}, ${currentHsl.s * 100}%, ${
        currentHsl.l * 100
      }%)`;
      return (
        <div
          key={`hue-${hueStep}-${i}`}
          className="tip"
          style={{ backgroundColor: cssHsl, color: contrastHex }}
        >
          {currentHex.toUpperCase()}
        </div>
      );
    });
  };

  // --- Lightness Gradient --- //
  const renderLightnessGradient = () => {
    return Array.from({ length: 10 }, (_, i) => {
      const currentL = i / 9; // Go from L=0 to L=1
      const currentHsl = { h: h1, s: s1, l: currentL };
      const currentRgb = InformationTranslationFuncs.hslToRgb
        ? InformationTranslationFuncs.hslToRgb(currentHsl)
        : [0, 0, 0]; // Fallback RGB array
      const currentHex = InformationTranslationFuncs.rgbVersHex
        ? InformationTranslationFuncs.rgbVersHex(currentRgb)
        : "#000000";
      const contrastRgb = getContrastColor(currentRgb); // Pass array, receive array
      const contrastHex = InformationTranslationFuncs.rgbVersHex(contrastRgb); // Pass array
      const cssHsl = `hsl(${currentHsl.h}, ${currentHsl.s * 100}%, ${
        currentHsl.l * 100
      }%)`;
      return (
        <div
          key={`lightness-${i}`}
          className="tip"
          style={{ backgroundColor: cssHsl, color: contrastHex }}
        >
          {currentHex.toUpperCase()}
        </div>
      );
    });
  };

  // --- Saturation Gradient --- //
  const renderSaturationGradient = () => {
    return Array.from({ length: 10 }, (_, i) => {
      const currentS = i / 9; // Go from S=0 to S=1
      const currentHsl = { h: h1, s: currentS, l: l1 };
      const currentRgb = InformationTranslationFuncs.hslToRgb
        ? InformationTranslationFuncs.hslToRgb(currentHsl)
        : [0, 0, 0]; // Fallback RGB array
      const currentHex = InformationTranslationFuncs.rgbVersHex
        ? InformationTranslationFuncs.rgbVersHex(currentRgb)
        : "#000000";
      const contrastRgb = getContrastColor(currentRgb); // Pass array, receive array
      const contrastHex = InformationTranslationFuncs.rgbVersHex(contrastRgb); // Pass array
      const cssHsl = `hsl(${currentHsl.h}, ${currentHsl.s * 100}%, ${
        currentHsl.l * 100
      }%)`;
      return (
        <div
          key={`saturation-${i}`}
          className="tip"
          style={{ backgroundColor: cssHsl, color: contrastHex }}
        >
          {currentHex.toUpperCase()}
        </div>
      );
    });
  };

  return (
    <div className="gradient-container">
      {/* Hue Shortest Path */}
      <div className="gradient-sub-container">
        {renderHueGradient(hueStep_short, h_comp)}
      </div>
      {/* Hue Longest Path */}
      <div className="gradient-sub-container">
        {renderHueGradient(hueStep_long, h_comp)}
      </div>
      {/* Lightness Gradient */}
      <div className="gradient-sub-container">{renderLightnessGradient()}</div>
      {/* Saturation Gradient */}
      <div className="gradient-sub-container">{renderSaturationGradient()}</div>
    </div>
  );
};

export default ColorGradients;
