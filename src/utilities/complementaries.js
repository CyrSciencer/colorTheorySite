import InformationTranslationFuncs from "./InformationTranslation.js";
const { rgbToHsl, hslToRgb, contrast, rgbToHex, hslToHsv, hsvToRgb } =
  InformationTranslationFuncs;
import colorDataBase from "./colorDataBase.js";

/**
 * Helper function: Calculates a saturation factor based on lightness.
 * Colors are most saturated at L=0.5 and least at L=0 or L=1.
 * @param {number} l - Lightness value (0-1).
 * @returns {number} Saturation factor (0-1).
 */
const saturationFromLightness = (l) => {
  const clampedL = Math.max(0, Math.min(1, l)); // Ensure l is [0, 1]
  return 1 - Math.abs(clampedL - 0.5) * 2;
};

/**
 * Calculates the complementary color (180-degree hue shift).
 * @param {number[]} rgb - Input color as RGB array.
 * @returns {number[]} Complementary color as RGB array.
 */
const complementary = (rgb) => {
  const hsl = rgbToHsl(rgb);
  hsl.h = (hsl.h + 180) % 360;
  const rgb2 = hslToRgb(hsl);
  return rgb2;
};

/**
 * Calculates the opposite color (RGB inversion).
 * @param {number[]} rgb - Input color as RGB array.
 * @returns {number[]} Opposite color as RGB array.
 */
const opposite = (rgb) => {
  const rgb2 = complementary(rgb);
  const hsl = rgbToHsl(rgb2);
  hsl.l = 1 - hsl.l;
  const hsv = hslToHsv(hsl);
  hsv.v = hsv.v * hsl.l;
  const rgb3 = hsvToRgb(hsv);
  return rgb3;
};

/**
 * Creates a "harmony" by swapping RGB components.
 * Note: This is a non-standard definition of triadic harmony.
 * @param {number[]} rgb - Input color as RGB array.
 * @returns {{rgb: number[], rgb2: number[], rgb3: number[]}} Object with original and swapped RGB arrays.
 */
const triangleHarmony = (rgb) => {
  const rgb2 = [rgb[1], rgb[2], rgb[0]];
  const rgb3 = [rgb[2], rgb[0], rgb[1]];
  return { rgb, rgb2, rgb3 };
};

// Helper to create a new RGB color by shifting the hue of a base HSL color
const _createShiftedColorRgb = (baseHsl, hueShiftDegrees) => {
  const newHue = (baseHsl.h + hueShiftDegrees + 360) % 360;
  const newHsl = { h: newHue, s: baseHsl.s, l: baseHsl.l };
  return hslToRgb(newHsl);
};

/**
 * Calculates split complementary colors (+/- 15 degrees from complementary hue).
 * @param {number[]} rgb - Input color as RGB array.
 * @returns {{rgb: number[], rgb2: number[], rgb3: number[]}} Object with original and two split complementary RGB arrays.
 */
const splitComplementary = (rgb) => {
  const complementaryColor = complementary(rgb);
  const hsl = rgbToHsl(complementaryColor);
  const rgb2 = _createShiftedColorRgb(hsl, 15);
  const rgb3 = _createShiftedColorRgb(hsl, -15);
  return { rgb, rgb2, rgb3 };
};

/**
 * Calculates analogous colors (+/- 30 degrees from base hue).
 * @param {number[]} rgb - Input color as RGB array.
 * @returns {{rgb: number[], rgb2: number[], rgb3: number[]}} Object with original and two analogous RGB arrays.
 */
const analogue = (rgb) => {
  const hsl = rgbToHsl(rgb);
  const rgb2 = _createShiftedColorRgb(hsl, 30);
  const rgb3 = _createShiftedColorRgb(hsl, -30);
  return { rgb, rgb2, rgb3 };
};

/**
 * Calculates square harmony colors (0, 90, 180, 270 degree hue shifts).
 * @param {number[]} rgb - Input color as RGB array.
 * @returns {{rgb: number[], rgb2: number[], rgb3: number[], rgb4: number[]}} Object with base and three harmony RGB arrays.
 */
const squareHarmony = (rgb) => {
  const hsl = rgbToHsl(rgb);
  const rgb2 = _createShiftedColorRgb(hsl, 180); // Complementary
  const rgb3 = _createShiftedColorRgb(hsl, 90);
  const rgb4 = _createShiftedColorRgb(hsl, 270);
  return { rgb, rgb2, rgb3, rgb4 };
};

/**
 * Calculates rectangular harmony colors (base, +45 deg, complementary, comp +45 deg).
 * @param {number[]} rgb - Input color as RGB array.
 * @returns {{rgb: number[], rgb2: number[], rgb3: number[], rgb4: number[]}} Object with base and three harmony RGB arrays.
 */
const rectangleHarmony1 = (rgb) => {
  const hsl = rgbToHsl(rgb);
  const rgb2 = _createShiftedColorRgb(hsl, 45);
  const rgb3 = complementary(rgb); // This is hsl + 180 deg
  const hsl3 = rgbToHsl(rgb3);
  const rgb4 = _createShiftedColorRgb(hsl3, 45);
  return { rgb, rgb2, rgb3, rgb4 };
};

/**
 * Calculates rectangular harmony colors (base, -45 deg, complementary, comp -45 deg).
 * @param {number[]} rgb - Input color as RGB array.
 * @returns {{rgb: number[], rgb2: number[], rgb3: number[], rgb4: number[]}} Object with base and three harmony RGB arrays.
 */
const rectangleHarmony2 = (rgb) => {
  const hsl = rgbToHsl(rgb);
  const rgb2 = _createShiftedColorRgb(hsl, -45);
  const rgb3 = complementary(rgb); // This is hsl + 180 deg
  const hsl3 = rgbToHsl(rgb3);
  const rgb4 = _createShiftedColorRgb(hsl3, -45); // Apply shift to the complementary's HSL
  return { rgb, rgb2, rgb3, rgb4 };
};

// --- Color Database Helpers ---
// Helper to get only the color name from colorDataBase based on HSL Hue
const getColorNameFromHue = (hue) => {
  for (const name in colorDataBase.colorName) {
    const range = colorDataBase.colorName[name];
    // Standard range check
    if (hue >= range.minHue && hue < range.maxHue) {
      return name;
    }
    // Check for second range (for Red)
    if (
      range.minHue2 !== undefined &&
      hue >= range.minHue2 &&
      hue < range.maxHue2
    ) {
      return name;
    }
  }
  return null; // No matching category found
};

// Helper to get color info from colorDataBase based on HSL
const getColorInfo = (hsl) => {
  const hue = hsl.h;
  let colorName = null;

  for (const name in colorDataBase.colorName) {
    const range = colorDataBase.colorName[name];
    // Standard range check
    if (hue >= range.minHue && hue < range.maxHue) {
      colorName = name;
      break;
    }
    // Check for second range (for Red)
    if (
      range.minHue2 !== undefined &&
      hue >= range.minHue2 &&
      hue < range.maxHue2
    ) {
      colorName = name;
      break;
    }
  }

  if (!colorName) {
    return null; // Or handle edge cases/default
  }

  const comp = colorDataBase.colorComp[colorName];
  if (comp === "primary") {
    return { name: colorName, type: "primary" };
  } else {
    // Parse primaries from string like "blue + yellow"
    const primaries = comp.split(" + ");
    return { name: colorName, type: "addition", primaries: primaries };
  }
};

// Helper function for shortest-path hue interpolation
const interpolateHueShortestPath = (h1, h2, percent) => {
  let deltaH = h2 - h1;
  if (deltaH > 180) {
    deltaH -= 360;
  } else if (deltaH <= -180) {
    deltaH += 360;
  }
  let h = h1 + deltaH * percent;
  // Normalize hue to be within [0, 360)
  return ((h % 360) + 360) % 360;
};

// Helper function for smooth (ease-in-out) interpolation
const smoothStepInterpolate = (a, b, t) => {
  const smoothedT = t * t * (3 - 2 * t);
  return a + (b - a) * smoothedT;
};

/**
 * Simple linear interpolation for HSL colors.
 * Interpolates Hue using the shortest path.
 * Clamps S and L between 0 and 1.
 * @param {object} hsl1 - Start HSL color {h, s, l}.
 * @param {object} hsl2 - End HSL color {h, s, l}.
 * @param {number} percent - Interpolation factor (0-1).
 * @returns {object} Interpolated HSL color {h, s, l}.
 */
const hslMixer = (hsl1, hsl2, percent) => {
  let deltaH = hsl2.h - hsl1.h;
  if (deltaH > 180) deltaH -= 360;
  else if (deltaH <= -180) deltaH += 360;
  let h = hsl1.h + deltaH * percent;
  h = ((h % 360) + 360) % 360;
  const s = hsl1.s + (hsl2.s - hsl1.s) * percent;
  const l = hsl1.l + (hsl2.l - hsl1.l) * percent;
  const clampedS = Math.max(0, Math.min(1, s));
  const clampedL = Math.max(0, Math.min(1, l));
  return { h: h, s: clampedS, l: clampedL };
};

// Helper to calculate the midpoint hue of a color category
const getMidpointHue = (colorName) => {
  const range = colorDataBase.colorName[colorName];
  if (!range) return 0; // Default
  // Handle Red's wrap-around case - find center of the combined range
  if (range.minHue2 !== undefined) {
    // Effective range is [minHue2, 360] and [0, maxHue]. Total size:
    const size1 = 360 - range.minHue2;
    const size2 = range.maxHue - 0;
    // Midpoint calculation needs care due to wrap-around
    // Simple average of midpoints of the two segments, weighted by size?
    const mid1 = (range.minHue2 + 360) / 2;
    const mid2 = (0 + range.maxHue) / 2;
    // Weighted average might be complex, let's approximate for now
    // Or just take the midpoint of the largest segment? minHue2=330, maxHue=10 -> Largest is [330, 360]
    // Let's simplify and target hue 0/360 for Red for now.
    return 0;
  }
  return (range.minHue + range.maxHue) / 2;
};

/**
 * Generates a third color by mixing two input RGB colors using custom, rule-based logic.
 * This aims to simulate aspects of pigment mixing rather than simple linear interpolation.
 * Key features:
 * - Calculates saturation factor based on lightness.
 * - Applies a contrast bias based on Goethe-inspired ratios (via contrast function).
 * - Skips a "forbidden zone" around mid-lightness (L=0.5) when interpolating lightness,
 *   especially for highly saturated colors, to avoid muddy intermediates.
 * - Uses smoothstep interpolation for saturation and lightness (after adjustment).
 * - Hue is interpolated using the shortest path.
 * @param {number[]} rgb1 - First input color as RGB array.
 * @param {number[]} rgb2 - Second input color as RGB array.
 * @param {number} percent - Interpolation factor (0-1).
 * @returns {{rgb3: number[], hsl1: object, hsl2: object, hsl3: object}} Object containing the resulting mixed RGB (rgb3) and the HSL values of all three colors.
 */
const advancedColorBlend = (rgb1, rgb2, percent) => {
  const hsl1 = rgbToHsl(rgb1);
  const hsl2 = rgbToHsl(rgb2);

  // --- Calculate Input Saturation Factors ---
  const sfl1 = saturationFromLightness(hsl1.l);
  const sfl2 = saturationFromLightness(hsl2.l);

  // --- Calculate contrast bias ---
  // Les couleurs sombres sont toujours plus "fortes" dans les mélanges
  const contrast1 = contrast(hsl1);
  const contrast2 = contrast(hsl2);
  const ratio1 = contrast1.darkRatioHarmony;
  const ratio2 = contrast2.darkRatioHarmony;

  let adjustedPercent = percent; // Default to original percent

  if (ratio1 + ratio2 > 0) {
    const biasStrength = 0.25;
    const bias = (ratio2 - ratio1) / (ratio1 + ratio2);
    const midpoint = 0.5 + bias * biasStrength;
    adjustedPercent =
      percent < 0.5
        ? (percent / 0.5) * midpoint
        : midpoint + ((percent - 0.5) / 0.5) * (1 - midpoint);
    adjustedPercent = Math.max(0, Math.min(1, adjustedPercent));
  }

  // --- Calculate Lightness with Forbidden Zone Skipping ---
  // La zone interdite est utilisée pour éviter une couleur de mélange trop saturée
  const max_sfl = Math.max(sfl1, sfl2);
  const forbidden_half_width = Math.max(0, (1 - max_sfl) / 2);
  const lower_forbidden_bound = 0.5 - forbidden_half_width;
  const upper_forbidden_bound = 0.5 + forbidden_half_width;

  const is_crossing =
    (hsl1.l < lower_forbidden_bound && hsl2.l > upper_forbidden_bound) ||
    (hsl1.l > upper_forbidden_bound && hsl2.l < lower_forbidden_bound);
  const is_relevant = forbidden_half_width > 0.01;

  let finalL_before_darkening;
  const smooth_adj_p = smoothStepInterpolate(0, 1, adjustedPercent);

  if (is_crossing && is_relevant) {
    const l_start_orig = hsl1.l;
    const l_end_orig = hsl2.l;
    const l_start = Math.min(l_start_orig, l_end_orig);
    const l_end = Math.max(l_start_orig, l_end_orig);

    const len1 = Math.max(0, lower_forbidden_bound - l_start);
    const len2 = Math.max(0, l_end - upper_forbidden_bound);
    const total_allowed_len = len1 + len2;

    if (total_allowed_len <= 1e-6) {
      finalL_before_darkening =
        l_start_orig < 0.5 ? lower_forbidden_bound : upper_forbidden_bound;
    } else {
      const prop1 = len1 / total_allowed_len;

      let mapped_l;
      if (smooth_adj_p <= prop1) {
        const scaled_p1 = prop1 > 1e-6 ? smooth_adj_p / prop1 : 0;
        mapped_l = l_start + scaled_p1 * (lower_forbidden_bound - l_start);
      } else {
        const scaled_p2 =
          prop1 < 1.0 - 1e-6 ? (smooth_adj_p - prop1) / (1 - prop1) : 1;
        mapped_l =
          upper_forbidden_bound + scaled_p2 * (l_end - upper_forbidden_bound);
      }
      finalL_before_darkening =
        l_start_orig > l_end_orig ? l_end + l_start - mapped_l : mapped_l;
    }
  } else {
    finalL_before_darkening = hsl1.l + (hsl2.l - hsl1.l) * smooth_adj_p;
  }
  finalL_before_darkening = Math.max(0, Math.min(1, finalL_before_darkening));

  // --- Determine Final HSL based on rules ---
  let resultHsl = { h: 0, s: 0, l: 0 };
  let ruleApplied = false;

  // Calculate Final Saturation
  const finalS = smoothStepInterpolate(sfl1, sfl2, adjustedPercent);

  // --- Apply Rules ---
  const info1 = getColorInfo(hsl1);
  const info2 = getColorInfo(hsl2);

  if (!info1 || !info2) {
    console.warn("Color category not found, using simple mix logic for L");
    const fallbackH = interpolateHueShortestPath(
      hsl1.h,
      hsl2.h,
      adjustedPercent
    );
    let fallbackL = finalL_before_darkening;
    resultHsl = {
      h: fallbackH,
      s: finalS,
      l: Math.max(0, Math.min(1, fallbackL)),
    };
    ruleApplied = true;
  }
  // Rule 0: Same Category
  else if (getColorNameFromHue(hsl1.h) === getColorNameFromHue(hsl2.h)) {
    // La hue est à équidistance des deux
    const h = interpolateHueShortestPath(hsl1.h, hsl2.h, adjustedPercent);
    let finalL = finalL_before_darkening * 0.95;
    resultHsl = { h: h, s: finalS, l: Math.max(0, Math.min(1, finalL)) };
    ruleApplied = true;
  }
  // Rule 1: Primary + Primary
  else if (info1.type === "primary" && info2.type === "primary") {
    let secondaryName = null;
    for (const name in colorDataBase.colorComp) {
      const comp = colorDataBase.colorComp[name];
      if (
        comp !== "primary" &&
        comp.includes(info1.name) &&
        comp.includes(info2.name)
      ) {
        secondaryName = name;
        break;
      }
    }

    let calculatedHue;
    if (secondaryName) {
      // Calcul de la hue subjective pour chaque couleur primaire
      const range1 = colorDataBase.colorName[info1.name];
      const range2 = colorDataBase.colorName[info2.name];
      const rangeSecondary = colorDataBase.colorName[secondaryName];

      // Calcul des valeurs subjectives
      const getSubjectiveValue = (hue, range) => {
        if (range.minHue2 !== undefined) {
          // Cas spécial pour le rouge
          if (hue >= range.minHue2) {
            return (hue - range.minHue2) / (range.maxHue2 - range.minHue2);
          } else {
            return (hue - range.minHue) / (range.maxHue - range.minHue);
          }
        }
        return (hue - range.minHue) / (range.maxHue - range.minHue);
      };

      const subj1 = getSubjectiveValue(hsl1.h, range1);
      const subj2 = getSubjectiveValue(hsl2.h, range2);
      const avgSubj = (subj1 + subj2) / 2;

      // Calcul de la hue cible dans la plage de la couleur secondaire
      const hueRange = rangeSecondary.maxHue - rangeSecondary.minHue;
      const targetHue = rangeSecondary.minHue + hueRange * avgSubj;

      // Création d'un dégradé fluide
      if (smooth_adj_p < 0.5) {
        // Dégradé de la première couleur vers la cible
        const scaledPercent = smooth_adj_p * 2; // Map [0, 0.5) -> [0, 1)
        calculatedHue = interpolateHueShortestPath(
          hsl1.h,
          targetHue,
          scaledPercent
        );
      } else {
        // Dégradé de la cible vers la deuxième couleur
        const scaledPercent = (smooth_adj_p - 0.5) * 2; // Map [0.5, 1] -> [0, 1]
        calculatedHue = interpolateHueShortestPath(
          targetHue,
          hsl2.h,
          scaledPercent
        );
      }
    } else {
      calculatedHue = interpolateHueShortestPath(
        hsl1.h,
        hsl2.h,
        adjustedPercent
      );
    }

    let finalL = finalL_before_darkening * 0.85;
    resultHsl = {
      h: calculatedHue,
      s: finalS,
      l: Math.max(0, Math.min(1, finalL)),
    };
    ruleApplied = true;
  }
  // Rule 2: Primary + Addition
  else if (
    (info1.type === "primary" && info2.type === "addition") ||
    (info1.type === "addition" && info2.type === "primary")
  ) {
    const primaryInfo = info1.type === "primary" ? info1 : info2;
    const additionInfo = info1.type === "addition" ? info1 : info2;
    const primaryHsl = info1.type === "primary" ? hsl1 : hsl2;

    let calculatedHue;
    let finalL;
    let finalS_rule2;

    if (additionInfo.primaries.includes(primaryInfo.name)) {
      // Création d'un dégradé fluide vers la couleur primaire
      const baseHue = interpolateHueShortestPath(
        hsl1.h,
        hsl2.h,
        adjustedPercent
      );
      const targetHue = primaryHsl.h;
      let deltaH = targetHue - baseHue;
      if (deltaH > 180) deltaH -= 360;
      if (deltaH <= -180) deltaH += 360;
      calculatedHue = (((baseHue + deltaH * 0.3) % 360) + 360) % 360;
      finalL = finalL_before_darkening * 0.95;
      finalS_rule2 = finalS;
    } else {
      // Création d'un dégradé fluide avec effet de neutralisation
      calculatedHue = interpolateHueShortestPath(
        hsl1.h,
        hsl2.h,
        adjustedPercent
      );
      let deltaHComp = hsl1.h - hsl2.h;
      if (deltaHComp > 180) deltaHComp -= 360;
      if (deltaHComp <= -180) deltaHComp += 360;
      const complementarityFactor = Math.abs(deltaHComp) / 180.0;
      const effectStrength = 1 - Math.abs(percent - 0.5) * 1.6;
      const neutralizationFactor = complementarityFactor * effectStrength;
      finalL = finalL_before_darkening * (1 - neutralizationFactor);
      finalS_rule2 = finalS * (1 - neutralizationFactor);
    }

    resultHsl = {
      h: calculatedHue,
      s: finalS_rule2,
      l: Math.max(0, Math.min(1, finalL)),
    };
    ruleApplied = true;
  }
  // Rule 3: Addition + Addition
  else if (info1.type === "addition" && info2.type === "addition") {
    // Création d'un dégradé fluide entre les deux couleurs
    const rgb3 = [
      Math.round((rgb1[0] + rgb2[0]) / 2),
      Math.round((rgb1[1] + rgb2[1]) / 2),
      Math.round((rgb1[2] + rgb2[2]) / 2),
    ];
    const hsl3 = rgbToHsl(rgb3);

    // Interpolation fluide entre les deux couleurs
    const calculatedHue = interpolateHueShortestPath(
      hsl1.h,
      hsl2.h,
      adjustedPercent
    );

    resultHsl = {
      h: calculatedHue,
      s: hsl3.s,
      l: hsl3.l,
    };
    ruleApplied = true;
  }

  if (!ruleApplied) {
    console.warn("Mixing rule logic failed, using simple mix.");
    const fallbackH = interpolateHueShortestPath(
      hsl1.h,
      hsl2.h,
      adjustedPercent
    );
    let fallbackL = finalL_before_darkening;
    resultHsl = {
      h: fallbackH,
      s: finalS,
      l: Math.max(0, Math.min(1, fallbackL)),
    };
  }

  resultHsl.s = Math.max(0, Math.min(1, resultHsl.s));

  const rgb3 = hslToRgb(resultHsl);
  return { rgb: rgb1, rgb2, rgb3 };
};

/**
 * Generates two intermediate colors between rgb1 and rgb2, biased towards a target RGB.
 * Uses linear interpolation factors adjusted by proximity to the target color.
 * @param {number[]} rgb1 - Start color RGB.
 * @param {number[]} rgb2 - End color RGB.
 * @param {number[]} [targetRGB=[179, 148, 210]] - Default target is a lavender-like purple; chosen as an arbitrary distinct color. Target color RGB for biasing.
 * @param {number} [factor=0.5] - Bias factor (0-1). Higher values bias more towards the target.
 * @returns {{rgb3: number[], rgb4: number[]}} Object containing the two intermediate RGB colors.
 */
const generateIntermediateColors = (
  rgb1,
  rgb2,
  targetRGB = [179, 148, 210],
  factor = 0.5
) => {
  // Convertit les couleurs RGB en HSL
  const hsl1 = rgbToHsl(rgb1);
  const hsl2 = rgbToHsl(rgb2);
  const targetHsl = rgbToHsl(targetRGB);

  // Interpolation dans l'espace HSL vers la cible HSL
  const hsl3 = hslMixer(hsl1, targetHsl, factor);
  const hsl4 = hslMixer(hsl2, targetHsl, factor);

  // Convertit les couleurs HSL en RGB
  const rgb3 = hslToRgb(hsl3);
  const rgb4 = hslToRgb(hsl4);

  // Retourne les couleurs RGB d'origine et les nouvelles couleurs RGB intermédiaires
  return { rgb1, rgb2, rgb3, rgb4 };
};

/**
 * Calculates the "true opposite" HSL color.
 * The "true opposite" is defined as having the complementary hue of the original color,
 * the original saturation, and an inverted version of the original lightness.
 * @param {number[]} rgb - The input color as RGB array.
 * @returns {object} The HSL representation {h, s, l} of the "true opposite" color.
 */
const getTrueOppositeHsl = (rgb) => {
  const originalHsl = rgbToHsl(rgb);
  const complementaryHue = (originalHsl.h + 180) % 360;
  const invertedLightness = 1 - originalHsl.l;
  return {
    h: complementaryHue,
    s: originalHsl.s, // Keep original saturation
    l: invertedLightness, // Use inverted original lightness
  };
};

// Export all functions together
const colorManagementFuncs = {
  saturationFromLightness,
  complementary,
  opposite,
  triangleHarmony,
  splitComplementary,
  analogue,
  squareHarmony,
  rectangleHarmony1,
  rectangleHarmony2,
  getColorNameFromHue,
  getColorInfo,
  interpolateHueShortestPath,
  smoothStepInterpolate,
  hslMixer,
  getMidpointHue,
  advancedColorBlend,

  generateIntermediateColors,
  getTrueOppositeHsl,
};

export default colorManagementFuncs;
