import React from "react";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import colorManagementFuncs from "../../utilities/complementaries"; // Added import
import "./gradient.css"; // Reusing the existing CSS for simplicity
import { writeToClipboard } from "../../utilities/clipboardUtils";
import { useFeedback } from "../../contexts/FeedbackContext.jsx";
import {
  renderGradientCell,
  renderGradientCellWithCssHsl,
} from "./gradientUtils"; // Import new utility functions

const { opposite } = colorManagementFuncs; // Destructure function

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
      // Use renderGradientCellWithCssHsl for HSL-based gradients
      return renderGradientCellWithCssHsl(
        currentHsl,
        `hue-${hueStep}-${i}`,
        handleSuggestionClick
      );
    });
  };

  // --- Lightness Gradient --- //
  const renderLightnessGradient = () => {
    return Array.from({ length: 10 }, (_, i) => {
      const currentL = i / 9; // Go from L=0 to L=1
      const currentHsl = { h: h1, s: s1, l: currentL };
      // Use renderGradientCellWithCssHsl
      return renderGradientCellWithCssHsl(
        currentHsl,
        `lightness-${i}`,
        handleSuggestionClick
      );
    });
  };

  // --- Saturation Gradient --- //
  const renderSaturationGradient = () => {
    return Array.from({ length: 10 }, (_, i) => {
      const currentS = i / 9; // Go from S=0 to S=1
      const currentHsl = { h: h1, s: currentS, l: l1 };
      // Use renderGradientCellWithCssHsl
      return renderGradientCellWithCssHsl(
        currentHsl,
        `saturation-${i}`,
        handleSuggestionClick
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
        : [0, 0, 0];
      // Use renderGradientCell for RGB-based gradients
      return renderGradientCell(
        currentRgb,
        `hsv-saturation-${i}`,
        handleSuggestionClick
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
        : [0, 0, 0];
      // Use renderGradientCell
      return renderGradientCell(
        currentRgb,
        `hsv-value-${i}`,
        handleSuggestionClick
      );
    });
  };

  // --- Opposite Color Gradient --- //
  const renderOppositeGradient = (pathType) => {
    const chosenRgb = rgb;
    const oppositeToChosenRgb = opposite(chosenRgb);
    const startRgb = oppositeToChosenRgb; // Interpolate from opposite to original
    const endRgb = chosenRgb; // to match visual flow if reversed by CSS

    let startHslValue = null;
    let endHslValue = null;
    let canEffectivelyUseHslPath = false;

    // Check if HSL path is viable (all necessary functions exist and conversions succeed)
    if (
      (pathType === "hsl_short" || pathType === "hsl_long") &&
      InformationTranslationFuncs.rgbToHsv &&
      InformationTranslationFuncs.hsvToHsl &&
      InformationTranslationFuncs.hslToRgb
    ) {
      const startHsv = InformationTranslationFuncs.rgbToHsv(startRgb);
      if (startHsv) {
        startHslValue = InformationTranslationFuncs.hsvToHsl(startHsv);
      }

      const endHsv = InformationTranslationFuncs.rgbToHsv(endRgb);
      if (endHsv) {
        endHslValue = InformationTranslationFuncs.hsvToHsl(endHsv);
      }

      if (startHslValue && endHslValue) {
        canEffectivelyUseHslPath = true;
      }
    }

    return Array.from({ length: 10 }, (_, i) => {
      const t = i / 9; // Interpolation factor from 0 to 1
      let currentRgbArray;
      let currentHslForCell; // Will hold HSL if HSL path is used

      const useHslPathForThisStep =
        (pathType === "hsl_short" || pathType === "hsl_long") &&
        canEffectivelyUseHslPath;

      if (useHslPathForThisStep) {
        // HSL interpolation
        const h_start = startHslValue.h;
        const s_start = startHslValue.s;
        const l_start = startHslValue.l;
        const h_end = endHslValue.h;
        const s_end = endHslValue.s;
        const l_end = endHslValue.l;

        const currentS = s_start * (1 - t) + s_end * t;
        const currentL = l_start * (1 - t) + l_end * t;

        let delta_h = h_end - h_start;
        let final_delta_h_short = delta_h;
        if (final_delta_h_short > 180) final_delta_h_short -= 360;
        else if (final_delta_h_short < -180) final_delta_h_short += 360;

        let final_delta_h;
        if (pathType === "hsl_short") {
          final_delta_h = final_delta_h_short;
        } else {
          // hsl_long
          if (final_delta_h_short === 0) {
            final_delta_h = 0;
          } else {
            final_delta_h =
              final_delta_h_short > 0
                ? final_delta_h_short - 360
                : final_delta_h_short + 360;
          }
        }
        const currentH = (h_start + final_delta_h * t + 360) % 360;
        currentHslForCell = { h: currentH, s: currentS, l: currentL };

        // This conversion is safe due to canEffectivelyUseHslPath check
        currentRgbArray =
          InformationTranslationFuncs.hslToRgb(currentHslForCell);
        if (!currentRgbArray) currentRgbArray = [0, 0, 0]; // Should not happen
      } else {
        // RGB interpolation (either pathType is "rgb" or HSL path is not viable)
        currentRgbArray = [
          Math.round(startRgb[0] * (1 - t) + endRgb[0] * t),
          Math.round(startRgb[1] * (1 - t) + endRgb[1] * t),
          Math.round(startRgb[2] * (1 - t) + endRgb[2] * t),
        ];
      }

      // Decide which render function to use
      if (useHslPathForThisStep && currentHslForCell) {
        return renderGradientCellWithCssHsl(
          currentHslForCell,
          `opposite-${pathType}-${i}`,
          handleSuggestionClick
        );
      } else {
        return renderGradientCell(
          currentRgbArray,
          `opposite-${pathType}-${i}`,
          handleSuggestionClick
        );
      }
    });
  };

  const renderSelectedGradient = () => {
    switch (gradientTypeIndex) {
      case 0: // Hue Shortest Path
        return renderHueGradient(hueStep_short, h_comp);
      case 1: // Hue Longest Path
        return renderHueGradient(hueStep_long, h_comp);
      case 2: // Lightness Gradient
        return renderLightnessGradient();
      case 3: // Saturation Gradient
        return renderSaturationGradient();
      case 4: // HSV Saturation Gradient
        return renderHSVSaturationGradient();
      case 5: // HSV Value Gradient
        return renderHSVValueGradient();
      case 6: // Opposite Color Gradient - RGB path
        return renderOppositeGradient("rgb");
      case 7: // Opposite Color Gradient - HSL Shortest Hue path
        return renderOppositeGradient("hsl_short");
      case 8: // Opposite Color Gradient - HSL Longest Hue path
        return renderOppositeGradient("hsl_long");
      default: // Default to Hue Shortest Path
        return renderHueGradient(hueStep_short, h_comp);
    }
  };

  return <div className="gradient-line">{renderSelectedGradient()}</div>;
};

export default ColorGradients;
