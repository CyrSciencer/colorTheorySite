import { useState } from "react";
import colorManagementFuncs from "./complementaries";
import InformationTranslationFuncs from "./InformationTranslation";

//usages
const { rgbToHsl, hslToRgb, rgbToHex, hexToRgb, hslToHsv, hsvToHsl } =
  InformationTranslationFuncs;

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
  // Assuming conversion functions now handle numeric HSL/HSV values (0-100 for s, l, v)
  const newHsl = rgbToHsl(newRgb);
  setHsl(newHsl);
  const newHex = rgbToHex(newRgb);
  setHex(newHex);
  const newHsv = hslToHsv(newHsl);
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
  // Remove '%' or '°' before parsing
  const rawValue = value.replace(/[%°]/g, "");
  if (rawValue === "") {
    newHsl[key] = 0; // Handle empty input as 0
  } else {
    const numValue = parseFloat(rawValue);
    if (!isNaN(numValue)) {
      if (key === "h" && numValue >= 0 && numValue <= 360) {
        newHsl[key] = numValue;
      } else if (
        (key === "s" || key === "l") &&
        numValue >= 0 &&
        numValue <= 100
      ) {
        newHsl[key] = numValue / 100; // Store as number 0-1
      } else {
        return; // Ignore out-of-range input
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
      // Assuming conversion functions now handle numeric HSL/HSV values
      const newHsl = rgbToHsl(newRgb);
      setHsl(newHsl);
      const newHsv = hslToHsv(newHsl);
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
  // Remove '%' or '°' before parsing
  const rawValue = value.replace(/[%°]/g, "");
  if (rawValue === "") {
    newHsv[key] = 0; // Handle empty input as 0
  } else {
    const numValue = parseFloat(rawValue);
    if (!isNaN(numValue)) {
      if (key === "h" && numValue >= 0 && numValue <= 360) {
        newHsv[key] = numValue;
      } else if (
        (key === "s" || key === "v") &&
        numValue >= 0 &&
        numValue <= 100
      ) {
        newHsv[key] = numValue / 100; // Store as number 0-1
      } else {
        return; // Ignore out-of-range input
      }
    } else {
      return; // Ignore invalid non-numeric input
    }
  }

  setHsv(newHsv);
  // Assuming conversion functions now handle numeric HSL/HSV values
  const newHsl = hsvToHsl(newHsv);
  setHsl(newHsl);
  const newRgb = hslToRgb(newHsl);
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
