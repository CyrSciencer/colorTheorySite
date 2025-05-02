import React from "react";
import InformationTranslationFuncs from "../../../utilities/InformationTranslation";
import colorManagementFuncs from "../../../utilities/complementaries"; // Added import
import "./gradient.css"; // Reusing the existing CSS for simplicity

const { opposite } = colorManagementFuncs; // Destructure function

// Function to determine contrast color (black or white) based on RGB array
const getContrastColor = (rgbArray) => {
  // Simple brightness calculation (YIQ formula)
  const brightness =
    (rgbArray[0] * 299 + rgbArray[1] * 587 + rgbArray[2] * 114) / 1000;
  return brightness > 128 ? [0, 0, 0] : [255, 255, 255]; // Return black or white RGB array
};

const ColorGradients = ({ rgb, gradientTypeIndex }) => {
  // Convert input RGB color directly to HSV
  const hsv1 = InformationTranslationFuncs.rgbToHsv
    ? InformationTranslationFuncs.rgbToHsv(rgb) // rgb is already an array
    : { h: 0, s: 1, v: 1 }; // Fallback HSV

  // Convert to HSL as well if needed for other gradients (e.g., lightness/saturation)
  const hsl1 = InformationTranslationFuncs.hsvToHsl
    ? InformationTranslationFuncs.hsvToHsl(hsv1)
    : { h: 0, s: 1, l: 0.5 }; // Fallback HSL

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
      const currentHex = InformationTranslationFuncs.rgbToHex
        ? InformationTranslationFuncs.rgbToHex(currentRgb)
        : "#000000"; // Default hex
      const contrastRgb = getContrastColor(currentRgb); // Pass array, receive array
      const contrastHex = InformationTranslationFuncs.rgbToHex(contrastRgb); // Pass array
      const shadowRgb = opposite(contrastRgb); // Calculate shadow RGB
      const shadowHex = InformationTranslationFuncs.rgbToHex(shadowRgb); // Calculate shadow Hex
      const cssHsl = `hsl(${currentHsl.h}, ${currentHsl.s * 100}%, ${
        currentHsl.l * 100
      }%)`;
      return (
        <div
          key={`hue-${hueStep}-${i}`}
          className="tip"
          style={{
            backgroundColor: cssHsl,
            color: contrastHex,
            textShadow: `0 0 3px ${shadowHex}`, // Apply text shadow
          }}
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
      const currentHex = InformationTranslationFuncs.rgbToHex
        ? InformationTranslationFuncs.rgbToHex(currentRgb)
        : "#000000"; // Default hex
      const contrastRgb = getContrastColor(currentRgb); // Pass array, receive array
      const contrastHex = InformationTranslationFuncs.rgbToHex(contrastRgb); // Pass array
      const shadowRgb = opposite(contrastRgb); // Calculate shadow RGB
      const shadowHex = InformationTranslationFuncs.rgbToHex(shadowRgb); // Calculate shadow Hex
      const cssHsl = `hsl(${currentHsl.h}, ${currentHsl.s * 100}%, ${
        currentHsl.l * 100
      }%)`;
      return (
        <div
          key={`lightness-${i}`}
          className="tip"
          style={{
            backgroundColor: cssHsl,
            color: contrastHex,
            textShadow: `0 0 3px ${shadowHex}`, // Apply text shadow
          }}
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
      const currentHex = InformationTranslationFuncs.rgbToHex
        ? InformationTranslationFuncs.rgbToHex(currentRgb)
        : "#000000"; // Default hex
      const contrastRgb = getContrastColor(currentRgb); // Pass array, receive array
      const contrastHex = InformationTranslationFuncs.rgbToHex(contrastRgb); // Pass array
      const shadowRgb = opposite(contrastRgb); // Calculate shadow RGB
      const shadowHex = InformationTranslationFuncs.rgbToHex(shadowRgb); // Calculate shadow Hex
      const cssHsl = `hsl(${currentHsl.h}, ${currentHsl.s * 100}%, ${
        currentHsl.l * 100
      }%)`;
      return (
        <div
          key={`saturation-${i}`}
          className="tip"
          style={{
            backgroundColor: cssHsl,
            color: contrastHex,
            textShadow: `0 0 3px ${shadowHex}`, // Apply text shadow
          }}
        >
          {currentHex.toUpperCase()}
        </div>
      );
    });
  };

  // --- HSV Saturation Gradient --- //
  const renderHSVSaturationGradient = () => {
    return Array.from({ length: 10 }, (_, i) => {
      const currentS = i / 9; // Go from S=0 to S=1 in HSV
      const currentHsv = { h: hsv1.h, s: currentS, v: hsv1.v };
      const currentRgb = InformationTranslationFuncs.hsvToRgb
        ? InformationTranslationFuncs.hsvToRgb(currentHsv)
        : [0, 0, 0]; // Fallback RGB array
      const currentHex = InformationTranslationFuncs.rgbToHex
        ? InformationTranslationFuncs.rgbToHex(currentRgb)
        : "#000000"; // Default hex
      const contrastRgb = getContrastColor(currentRgb); // Pass array, receive array
      const contrastHex = InformationTranslationFuncs.rgbToHex(contrastRgb); // Pass array
      const shadowRgb = opposite(contrastRgb); // Calculate shadow RGB
      const shadowHex = InformationTranslationFuncs.rgbToHex(shadowRgb); // Calculate shadow Hex

      return (
        <div
          key={`hsv-saturation-${i}`}
          className="tip"
          style={{
            backgroundColor: currentHex,
            color: contrastHex, // Use hex directly
            textShadow: `0 0 3px ${shadowHex}`, // Apply text shadow
          }}
        >
          {currentHex.toUpperCase()}
        </div>
      );
    });
  };

  // --- HSV Value Gradient --- //
  const renderHSVValueGradient = () => {
    return Array.from({ length: 10 }, (_, i) => {
      const currentV = i / 9; // Go from V=0 to V=1 in HSV
      const currentHsv = { h: hsv1.h, s: hsv1.s, v: currentV };
      const currentRgb = InformationTranslationFuncs.hsvToRgb
        ? InformationTranslationFuncs.hsvToRgb(currentHsv)
        : [0, 0, 0]; // Fallback RGB array
      const currentHex = InformationTranslationFuncs.rgbToHex
        ? InformationTranslationFuncs.rgbToHex(currentRgb)
        : "#000000"; // Default hex
      const contrastRgb = getContrastColor(currentRgb); // Pass array, receive array
      const contrastHex = InformationTranslationFuncs.rgbToHex(contrastRgb); // Pass array
      const shadowRgb = opposite(contrastRgb); // Calculate shadow RGB
      const shadowHex = InformationTranslationFuncs.rgbToHex(shadowRgb); // Calculate shadow Hex

      return (
        <div
          key={`hsv-value-${i}`}
          className="tip"
          style={{
            backgroundColor: currentHex,
            color: contrastHex, // Use hex directly
            textShadow: `0 0 3px ${shadowHex}`, // Apply text shadow
          }}
        >
          {currentHex.toUpperCase()}
        </div>
      );
    });
  };

  const renderSelectedGradient = () => {
    switch (gradientTypeIndex) {
      case 1: // Hue Shortest Path
        return renderHueGradient(hueStep_short, h_comp);
      case 2: // Hue Longest Path
        return renderHueGradient(hueStep_long, h_comp);
      case 3: // Lightness Gradient
        return renderLightnessGradient();
      case 4: // Saturation Gradient
        return renderSaturationGradient();
      case 5: // HSV Saturation Gradient
        return renderHSVSaturationGradient();
      case 6: // HSV Value Gradient
        return renderHSVValueGradient();
      default: // Default to Hue Shortest Path or return null/error
        return renderHueGradient(hueStep_short, h_comp);
      // Or: return null;
      // Or: return <div>Invalid gradient type</div>;
    }
  };

  return (
    <div className="gradient-container">
      <div className="gradient-sub-container">{renderSelectedGradient()}</div>
    </div>
  );
};

export default ColorGradients;
