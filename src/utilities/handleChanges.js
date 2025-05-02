import { useState } from "react";
import colorManagementFuncs from "./complementaries";
import InformationTranslationFuncs from "./InformationTranslation";

//usages
const {
  rgbToHsl,
  hslToRgb,
  rgbToHex,
  hexToRgb,
  hslToHsv,
  hsvToHsl,
  rgbToHsv,
  hsvToRgb,
} = InformationTranslationFuncs;

//fonctions handle changes
const handleRgbChange = (
  index,
  value,
  currentRgb,
  setRgb,
  setHsl,
  setHex,
  setHsv
) => {
  const newRgb = [...currentRgb];
  // Basic validation: Ensure value is a number and within range 0-255
  const numValue = parseInt(value, 10);
  if (!isNaN(numValue) && numValue >= 0 && numValue <= 255) {
    newRgb[index] = numValue;
  } else if (value === "") {
    newRgb[index] = 0; // Or handle empty input as 0
  } else {
    // Ignore invalid non-empty input
    return;
  }

  setRgb(newRgb);
  const newHsl = rgbToHsl(newRgb);
  setHsl(newHsl);
  const newHex = rgbToHex(newRgb);
  setHex(newHex);
  const newHsv = rgbToHsv(newRgb);
  setHsv(newHsv);
};

const handleHslChange = (
  key,
  value,
  currentHsl,
  setRgb,
  setHsl,
  setHex,
  setHsv
) => {
  const newHsl = { ...currentHsl };
  // Validation for numeric HSL
  // Remove '%' or '°' before parsing - REMOVED as range input value is numeric string
  const rawValue = value; // Use value directly
  if (rawValue === "") {
    newHsl[key] = 0; // Handle empty input as 0 (shouldn't happen with range?)
  } else {
    const numValue = parseFloat(rawValue);
    if (!isNaN(numValue)) {
      if (key === "h" && numValue >= 0 && numValue <= 360) {
        newHsl[key] = numValue;
      } else if (
        (key === "s" || key === "l") &&
        numValue >= 0 &&
        numValue <= 1 // Check range 0-1
      ) {
        newHsl[key] = numValue; // Store value directly (already 0-1)
      } else {
        // If key is s or l but value is outside 0-1, potentially clamp or ignore
        // For now, we ignore, consistent with previous logic for out-of-range
        if (key !== "h") {
          // Only return if it's s or l outside 0-1
          return;
        }
        // Allow h values outside 0-360? Or clamp? Current logic ignores. Let's keep ignoring.
        return;
      }
    } else {
      return; // Ignore invalid non-numeric input
    }
  }

  setHsl(newHsl);
  // Assuming conversion functions now handle numeric HSL/HSV values
  const newRgb = hslToRgb(newHsl);
  setRgb(newRgb);
  const newHex = rgbToHex(newRgb);
  setHex(newHex);
  const newHsv = hslToHsv(newHsl);
  setHsv(newHsv);
};

const handleHexChange = (value, setRgb, setHsl, setHex, setHsv) => {
  // Basic validation for HEX format
  if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
    setHex(value); // Update hex state immediately
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      const newRgb = hexToRgb(value);
      setRgb(newRgb);
      const newHsl = rgbToHsl(newRgb);
      setHsl(newHsl);
      const newHsv = rgbToHsv(newRgb);
      setHsv(newHsv);
    }
  }
  // else: ignore invalid input while typing
};

const handleHsvChange = (
  key,
  value,
  currentHsv,
  setRgb,
  setHsl,
  setHex,
  setHsv
) => {
  const newHsv = { ...currentHsv };
  // Validation for numeric HSV
  // Remove '%' or '°' before parsing - REMOVED as range input value is numeric string
  const rawValue = value; // Use value directly
  if (rawValue === "") {
    newHsv[key] = 0; // Handle empty input as 0 (shouldn't happen with range?)
  } else {
    const numValue = parseFloat(rawValue);
    if (!isNaN(numValue)) {
      if (key === "h" && numValue >= 0 && numValue <= 360) {
        newHsv[key] = numValue;
      } else if (
        (key === "s" || key === "v") && // Changed l to v
        numValue >= 0 &&
        numValue <= 1 // Check range 0-1
      ) {
        newHsv[key] = numValue; // Store value directly (already 0-1)
      } else {
        // If key is s or v but value is outside 0-1, potentially clamp or ignore
        // For now, we ignore, consistent with previous logic for out-of-range
        if (key !== "h") {
          // Only return if it's s or v outside 0-1
          return;
        }
        // Allow h values outside 0-360? Or clamp? Current logic ignores. Let's keep ignoring.
        return;
      }
    } else {
      return; // Ignore invalid non-numeric input
    }
  }

  setHsv(newHsv);
  const newHsl = hsvToHsl(newHsv);
  setHsl(newHsl);
  const newRgb = hsvToRgb(newHsv);
  setRgb(newRgb);
  const newHex = rgbToHex(newRgb);
  setHex(newHex);
};

const handleChanges = {
  handleRgbChange,
  handleHslChange,
  handleHexChange,
  handleHsvChange,
};

export default handleChanges;
