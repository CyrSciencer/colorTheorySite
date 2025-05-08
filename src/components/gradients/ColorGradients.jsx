import React from "react";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import colorManagementFuncs from "../../utilities/complementaries"; // Added import
import "./gradient.css"; // Reusing the existing CSS for simplicity
import { writeToClipboard } from "../../utilities/clipboardUtils";
import { useFeedback } from "../../contexts/FeedbackContext.jsx";
const { opposite } = colorManagementFuncs; // Destructure function

// Function to determine contrast color (black or white) based on RGB array
const getContrastColor = (rgbArray) => {
  // Simple brightness calculation (YIQ formula)
  const brightness =
    (rgbArray[0] * 299 + rgbArray[1] * 587 + rgbArray[2] * 114) / 1000;
  return brightness > 128 ? [0, 0, 0] : [255, 255, 255]; // Return black or white RGB array
};

const ColorGradients = ({ rgb, gradientTypeIndex, onSuggestionClick }) => {
  const { showFeedback } = useFeedback();
  const handleSuggestionClick = (hex) => {
    // Use clipboard utility
    writeToClipboard(hex)
      .then(() => {
        showFeedback(`Copied ${hex}!`, "success"); // Trigger success popup via context
        if (onSuggestionClick) {
          onSuggestionClick(hex);
        }
      })
      .catch((err) => {
        showFeedback("Failed to copy!", "error"); // Trigger error popup via context
        // Keep console log for debugging
        console.error("Clipboard error: ", err);
      });

    // Optionally clear the input/suggestions after selection
    // setDescription('');
  };
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
          onClick={() => handleSuggestionClick(currentHex)}
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
          onClick={() => handleSuggestionClick(currentHex)}
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
          onClick={() => handleSuggestionClick(currentHex)}
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
          onClick={() => handleSuggestionClick(currentHex)}
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
          onClick={() => handleSuggestionClick(currentHex)}
        >
          {currentHex.toUpperCase()}
        </div>
      );
    });
  };

  // --- Opposite Color Gradient --- //
  const renderOppositeGradient = (pathType) => {
    const chosenRgb = rgb; // Original input color prop
    const oppositeToChosenRgb = opposite(chosenRgb);

    // The gradient should visually start with chosenRgb and end with oppositeToChosenRgb.
    // If the display order of generated items is reversed (e.g., CSS flex-direction: row-reverse),
    // then our data array must be generated from oppositeToChosenRgb to chosenRgb.
    const startRgb = oppositeToChosenRgb; // Start of the data array for interpolation
    const endRgb = chosenRgb; // End of the data array for interpolation

    // Prepare HSL conversions if needed, with fallbacks
    let startHsl = { h: 0, s: 0, l: 0 };
    let endHsl = { h: 0, s: 0, l: 0 };
    let canUseHslPath = false;

    if (pathType === "hsl_short" || pathType === "hsl_long") {
      if (
        InformationTranslationFuncs.rgbToHsv &&
        InformationTranslationFuncs.hsvToHsl
      ) {
        const startHsvCheck = InformationTranslationFuncs.rgbToHsv(startRgb);
        if (startHsvCheck) {
          const startHslCheck =
            InformationTranslationFuncs.hsvToHsl(startHsvCheck);
          if (startHslCheck) startHsl = startHslCheck;
        }

        const endHsvCheck = InformationTranslationFuncs.rgbToHsv(endRgb);
        if (endHsvCheck) {
          const endHslCheck = InformationTranslationFuncs.hsvToHsl(endHsvCheck);
          if (endHslCheck) endHsl = endHslCheck;
        }
        // Check if primary conversion HSL->RGB is available
        if (InformationTranslationFuncs.hslToRgb) {
          canUseHslPath = true;
        }
      }
    }

    return Array.from({ length: 10 }, (_, i) => {
      const t = i / 9; // Interpolation factor from 0 to 1
      let currentRgbArray;

      if (
        pathType === "rgb" ||
        (!canUseHslPath &&
          (pathType === "hsl_short" || pathType === "hsl_long"))
      ) {
        // RGB interpolation or fallback for HSL if conversions are missing
        currentRgbArray = [
          Math.round(startRgb[0] * (1 - t) + endRgb[0] * t),
          Math.round(startRgb[1] * (1 - t) + endRgb[1] * t),
          Math.round(startRgb[2] * (1 - t) + endRgb[2] * t),
        ];
      } else {
        // HSL interpolation (hsl_short or hsl_long)
        const h_start = startHsl.h;
        const s_start = startHsl.s;
        const l_start = startHsl.l;

        const h_end = endHsl.h;
        const s_end = endHsl.s;
        const l_end = endHsl.l;

        // Interpolate S and L linearly
        const currentS = s_start * (1 - t) + s_end * t;
        const currentL = l_start * (1 - t) + l_end * t;

        // Interpolate H with short or long path
        let delta_h = h_end - h_start;
        let final_delta_h;

        // Calculate shortest path delta for hue
        let final_delta_h_short = delta_h;
        if (final_delta_h_short > 180) final_delta_h_short -= 360;
        else if (final_delta_h_short < -180) final_delta_h_short += 360;

        if (pathType === "hsl_short") {
          final_delta_h = final_delta_h_short;
        } else {
          // hsl_long
          if (final_delta_h_short === 0) {
            // Handles cases where hues are identical
            final_delta_h = 0; // Or 360 or -360 if a spin is desired, 0 means no hue change
          } else {
            final_delta_h =
              final_delta_h_short > 0
                ? final_delta_h_short - 360
                : final_delta_h_short + 360;
          }
        }

        const currentH = (h_start + final_delta_h * t + 360) % 360;
        const currentHsl = { h: currentH, s: currentS, l: currentL };

        currentRgbArray = InformationTranslationFuncs.hslToRgb
          ? InformationTranslationFuncs.hslToRgb(currentHsl)
          : [0, 0, 0]; // Fallback if hslToRgb is missing
      }

      const currentHex = InformationTranslationFuncs.rgbToHex
        ? InformationTranslationFuncs.rgbToHex(currentRgbArray)
        : "#000000";
      const contrastRgb = getContrastColor(currentRgbArray);
      const contrastHex = InformationTranslationFuncs.rgbToHex(contrastRgb);
      const shadowRgb = opposite(contrastRgb);
      const shadowHex = InformationTranslationFuncs.rgbToHex(shadowRgb);

      return (
        <div
          key={`opposite-${pathType}-${i}`}
          className="tip"
          style={{
            backgroundColor: currentHex,
            color: contrastHex,
            textShadow: `0 0 3px ${shadowHex}`,
          }}
          onClick={() => handleSuggestionClick(currentHex)}
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
      case 7: // Opposite Color Gradient - RGB path
        return renderOppositeGradient("rgb");
      case 8: // Opposite Color Gradient - HSL Shortest Hue path
        return renderOppositeGradient("hsl_short");
      case 9: // Opposite Color Gradient - HSL Longest Hue path
        return renderOppositeGradient("hsl_long");
      default: // Default to Hue Shortest Path
        return renderHueGradient(hueStep_short, h_comp);
    }
  };

  return <div className="gradient-line">{renderSelectedGradient()}</div>;
};

export default ColorGradients;
