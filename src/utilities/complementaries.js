import InformationTranslationFuncs from "./InformationTranslation.js";
const { rgbToHsl, hslToRgb } = InformationTranslationFuncs;
import colorDataBase from "./colorDataBase.js";
//complementaire §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
const complementary = (rgb) => {
  const hsl = rgbToHsl(rgb);
  // Ajuste la teinte de 180 degrés
  hsl.h = (hsl.h + 180) % 360;
  // Convertit l'objet hsl en tableau rgb
  const rgb2 = hslToRgb(hsl);
  return rgb2;
};
const opposite = (rgb) => {
  const rgb2 = [255 - rgb[0], 255 - rgb[1], 255 - rgb[2]];
  return rgb2;
};
//thirds §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
const triangleHarmony = (rgb) => {
  const rgb2 = [rgb[1], rgb[2], rgb[0]];
  const rgb3 = [rgb[2], rgb[0], rgb[1]];
  return { rgb, rgb2, rgb3 };
};
const siblingOfComplementary = (rgb) => {
  const complementaryColor = complementary(rgb);
  const hsl = rgbToHsl(complementaryColor);
  // Ajuste la teinte de 15 degrés
  const h2 = (hsl.h + 15) % 360;
  // Ajuste la teinte de -15 degrés
  const h3 = (hsl.h - 15 + 360) % 360; // fait en sorte que la teinte soit entre 0 et 360
  const hsl2 = { h: h2, s: hsl.s, l: hsl.l };
  const hsl3 = { h: h3, s: hsl.s, l: hsl.l };
  const rgb2 = hslToRgb(hsl2);
  const rgb3 = hslToRgb(hsl3);
  return { rgb, rgb2, rgb3 };
};
const analogue = (rgb) => {
  const hsl = rgbToHsl(rgb);
  const h2 = (hsl.h + 30) % 360;
  const h3 = (hsl.h - 30 + 360) % 360;
  const hsl2 = { h: h2, s: hsl.s, l: hsl.l };
  const hsl3 = { h: h3, s: hsl.s, l: hsl.l };
  const rgb2 = hslToRgb(hsl2);
  const rgb3 = hslToRgb(hsl3);
  return { rgb, rgb2, rgb3 };
};
//fourths §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
const squareHarmony = (rgb) => {
  const hsl = rgbToHsl(rgb); // hsl.h is now [0, 360]
  // Ajuste la teinte de 90 degrés
  const h3 = (hsl.h + 90) % 360;
  // Ajuste la teinte de 180 degrés
  const h2 = (hsl.h + 180) % 360; // Complementary
  // Ajuste la teinte de 270 degrés
  const h4 = (hsl.h + 270) % 360;
  const hsl2 = { h: h2, s: hsl.s, l: hsl.l };
  const hsl3 = { h: h3, s: hsl.s, l: hsl.l };
  const hsl4 = { h: h4, s: hsl.s, l: hsl.l };
  const rgb2 = hslToRgb(hsl2);
  const rgb3 = hslToRgb(hsl3);
  const rgb4 = hslToRgb(hsl4);
  return { rgb, rgb2, rgb3, rgb4 };
};
const rectangleHarmony1 = (rgb) => {
  const hsl = rgbToHsl(rgb);
  // Ajuste la teinte de 45 degrés
  const h2 = (hsl.h + 45) % 360;
  const hsl2 = { h: h2, s: hsl.s, l: hsl.l };
  const rgb2 = hslToRgb(hsl2);
  const rgb3 = complementary(rgb); //complémentaire
  const hsl3 = rgbToHsl(rgb3); // H est déjà la teinte complémentaire
  const h4 = (hsl3.h + 45) % 360; // Ajoute le même angle à la teinte complémentaire
  const hsl4 = { h: h4, s: hsl3.s, l: hsl3.l }; // Utilise s, l de la teinte complémentaire
  const rgb4 = hslToRgb(hsl4);
  return { rgb, rgb2, rgb3, rgb4 };
};
const rectangleHarmony2 = (rgb) => {
  const hsl = rgbToHsl(rgb);
  // Ajuste la teinte de -45 degrés
  const h2 = (hsl.h - 45 + 360) % 360;
  const hsl2 = { h: h2, s: hsl.s, l: hsl.l };
  const rgb2 = hslToRgb(hsl2);
  const rgb3 = complementary(rgb); //complémentaire
  const hsl3 = rgbToHsl(rgb3); // H est déjà la teinte complémentaire
  const h4 = (hsl3.h - 45 + 360) % 360; // Ajoute le même angle à la teinte complémentaire
  const hsl4 = { h: h4, s: hsl3.s, l: hsl3.l }; // Utilise s, l de la teinte complémentaire
  const rgb4 = hslToRgb(hsl4);
  return { rgb, rgb2, rgb3, rgb4 };
};
// Autres §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
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

// Mixe deux couleurs HSL pour une troisième couleur
const hslMixer = (hsl1, hsl2, percent) => {
  // Interpolation de la teinte (chemin le plus court) - Attend h entre 0 et 360
  let deltaH = hsl2.h - hsl1.h;
  if (deltaH > 180) {
    deltaH -= 360;
  } else if (deltaH <= -180) {
    deltaH += 360;
  }
  let h = hsl1.h + deltaH * percent;
  // Normalise la teinte pour être entre 0 et 360
  h = ((h % 360) + 360) % 360;

  // Interpolation de la saturation - Attend s entre 0 et 1
  const s = hsl1.s + (hsl2.s - hsl1.s) * percent;

  // Interpolation de la luminosité - Attend l entre 0 et 1
  const l = hsl1.l + (hsl2.l - hsl1.l) * percent;

  // Clamp saturation et luminosité entre 0 et 1
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

// Generates a third color by mixing two input RGB colors using rule-based logic
const inputOfTwoColorForAThird = (rgb1, rgb2, percent) => {
  const hsl1 = rgbToHsl(rgb1);
  const hsl2 = rgbToHsl(rgb2);

  // --- Rule 0: Check if colors are in the same category --- // NEW RULE
  const name1 = getColorNameFromHue(hsl1.h);
  const name2 = getColorNameFromHue(hsl2.h);

  if (name1 && name2 && name1 === name2) {
    // Same category: Simple HSL interpolation + darkening
    const h = interpolateHueShortestPath(hsl1.h, hsl2.h, percent);
    const s = hsl1.s + (hsl2.s - hsl1.s) * percent;
    let l = hsl1.l + (hsl2.l - hsl1.l) * percent;

    l *= 0.95; // Apply slight darkening

    const resultHsl = {
      h: h,
      s: Math.max(0, Math.min(1, s)),
      l: Math.max(0, Math.min(1, l)),
    };
    const rgb3 = hslToRgb(resultHsl);
    return { rgb: rgb1, rgb2, rgb3 };
  }

  // --- Proceed to complex rules if Rule 0 didn't apply ---
  const info1 = getColorInfo(hsl1);
  const info2 = getColorInfo(hsl2);

  if (!info1 || !info2) {
    // Fallback to simple HSL mix (using hslMixer for consistency)
    console.warn(
      "Color category not found for complex rules, using simple mix"
    );
    const fallbackHsl = hslMixer(hsl1, hsl2, percent);
    // Optionally apply a slight darkening to fallback too?
    // fallbackHsl.l *= 0.95;
    fallbackHsl.s = Math.max(0, Math.min(1, fallbackHsl.s));
    fallbackHsl.l = Math.max(0, Math.min(1, fallbackHsl.l));
    return { rgb: rgb1, rgb2, rgb3: hslToRgb(fallbackHsl) };
  }

  let resultHsl = { h: 0, s: 0, l: 0 };
  let ruleApplied = false;

  // --- Apply Rules 1, 2, 3 --- // (Existing logic for Primary+Primary, Primary+Addition, Addition+Addition)

  // Rule 1: Primary + Primary
  if (info1.type === "primary" && info2.type === "primary") {
    // ... (Rule 1 logic - unchanged) ...
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
      const targetMidpointHue = getMidpointHue(secondaryName);
      const h1 = hsl1.h;
      const h2 = hsl2.h;
      if (percent === 0.5) {
        calculatedHue = targetMidpointHue;
      } else if (percent < 0.5) {
        const scaledPercent = percent / 0.5;
        calculatedHue = interpolateHueShortestPath(
          h1,
          targetMidpointHue,
          scaledPercent
        );
      } else {
        const scaledPercent = (percent - 0.5) / 0.5;
        calculatedHue = interpolateHueShortestPath(
          targetMidpointHue,
          h2,
          scaledPercent
        );
      }
    } else {
      calculatedHue = interpolateHueShortestPath(hsl1.h, hsl2.h, percent);
    }
    const interpolatedS = hsl1.s + (hsl2.s - hsl1.s) * percent;
    const interpolatedL = hsl1.l + (hsl2.l - hsl1.l) * percent;
    resultHsl = { h: calculatedHue, s: interpolatedS, l: interpolatedL * 0.85 };
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
    const additionHsl = info1.type === "addition" ? hsl1 : hsl2;
    // Calculate resulting hue based on standard interpolation or leaning for Case 2a
    let calculatedHue;
    let calculatedS, calculatedL;

    // Case 2a: Addition CONTAINS Primary
    if (additionInfo.primaries.includes(primaryInfo.name)) {
      const baseHue = interpolateHueShortestPath(hsl1.h, hsl2.h, percent);
      const targetHue = primaryHsl.h;
      let deltaH = targetHue - baseHue;
      if (deltaH > 180) deltaH -= 360;
      if (deltaH <= -180) deltaH += 360;
      calculatedHue = (((baseHue + deltaH * 0.3) % 360) + 360) % 360;

      calculatedS = hsl1.s + (hsl2.s - hsl1.s) * percent;
      calculatedL = hsl1.l + (hsl2.l - hsl1.l) * percent;
      calculatedL *= 0.95; // Apply slight darkening

      resultHsl = { h: calculatedHue, s: calculatedS, l: calculatedL };
    }
    // Case 2b: Addition does NOT contain Primary (Complementary mixing effect)
    else {
      // Hue interpolates normally along the shortest path
      calculatedHue = interpolateHueShortestPath(hsl1.h, hsl2.h, percent);

      // Calculate complementarity
      let deltaH = hsl1.h - hsl2.h;
      if (deltaH > 180) deltaH -= 360;
      if (deltaH <= -180) deltaH += 360;
      const complementarityFactor = Math.abs(deltaH) / 180.0;

      // Calculate the normal interpolated S/L at midpoint 0.5
      const s_mid_normal = hsl1.s + (hsl2.s - hsl1.s) * 0.5;
      const l_mid_normal = hsl1.l + (hsl2.l - hsl1.l) * 0.5;

      // Determine target S/L at the midpoint based on complementarity
      // Target L approaches 0 as factor -> 1, capped at 0.2
      const targetMidpointL = Math.min(
        0.2,
        l_mid_normal * (1 - complementarityFactor)
      );
      // Target S approaches 0 as factor -> 1 (maybe less aggressively than L)
      const targetMidpointS = s_mid_normal * (1 - complementarityFactor * 0.8); // Slightly less reduction than L

      // Interpolate S and L piecewise through the target midpoint
      if (percent === 0.5) {
        calculatedS = targetMidpointS;
        calculatedL = targetMidpointL;
      } else if (percent < 0.5) {
        const scaledPercent = percent / 0.5;
        // Interpolate from additionHsl to target midpoint
        calculatedS =
          additionHsl.s + (targetMidpointS - additionHsl.s) * scaledPercent;
        calculatedL =
          additionHsl.l + (targetMidpointL - additionHsl.l) * scaledPercent;
      } else {
        // percent > 0.5
        const scaledPercent = (percent - 0.5) / 0.5;
        // Interpolate from target midpoint to primaryHsl
        calculatedS =
          targetMidpointS + (primaryHsl.s - targetMidpointS) * scaledPercent;
        calculatedL =
          targetMidpointL + (primaryHsl.l - targetMidpointL) * scaledPercent;
      }

      resultHsl = { h: calculatedHue, s: calculatedS, l: calculatedL };
    }
    ruleApplied = true;
  }
  // Rule 3: Addition + Addition
  else if (info1.type === "addition" && info2.type === "addition") {
    // ... (Rule 3 logic - unchanged) ...
    let currentHue = interpolateHueShortestPath(hsl1.h, hsl2.h, percent);
    const commonPrimaries = info1.primaries.filter((p) =>
      info2.primaries.includes(p)
    );
    let targetHue = currentHue;
    if (commonPrimaries.length === 1) {
      const dominantPrimaryName = commonPrimaries[0];
      targetHue = getMidpointHue(dominantPrimaryName);
    } else if (commonPrimaries.length === 0) {
      const allPrimaries = [...info1.primaries, ...info2.primaries];
      const counts = allPrimaries.reduce((acc, p) => {
        acc[p] = (acc[p] || 0) + 1;
        return acc;
      }, {});
      const dominantPrimary = Object.keys(counts).find((p) => counts[p] > 1);
      if (dominantPrimary) {
        targetHue = getMidpointHue(dominantPrimary);
      }
    }
    let calculatedHue = currentHue;
    if (targetHue !== currentHue) {
      let deltaH = targetHue - currentHue;
      if (deltaH > 180) deltaH -= 360;
      if (deltaH <= -180) deltaH += 360;
      calculatedHue = (((currentHue + deltaH * 0.3) % 360) + 360) % 360;
    }
    const midpointS = Math.min(hsl1.s, hsl2.s) * 0.5;
    const midpointL = Math.min(hsl1.l, hsl2.l) * 0.5;
    let calculatedS, calculatedL;
    if (percent === 0.5) {
      calculatedS = midpointS;
      calculatedL = midpointL;
    } else if (percent < 0.5) {
      const scaledPercent = percent / 0.5;
      calculatedS = hsl1.s + (midpointS - hsl1.s) * scaledPercent;
      calculatedL = hsl1.l + (midpointL - hsl1.l) * scaledPercent;
    } else {
      const scaledPercent = (percent - 0.5) / 0.5;
      calculatedS = midpointS + (hsl2.s - midpointS) * scaledPercent;
      calculatedL = midpointL + (hsl2.l - midpointL) * scaledPercent;
    }
    calculatedL *= 0.9;
    resultHsl = { h: calculatedHue, s: calculatedS, l: calculatedL };
    ruleApplied = true;
  }

  // --- Fallback if no rule applied --- //
  if (!ruleApplied) {
    // This fallback should now only trigger if info1/info2 were valid but didn't match any rule (unlikely)
    console.warn(
      "No mixing rule applied despite valid color info, using simple mix"
    );
    resultHsl = hslMixer(hsl1, hsl2, percent);
    // Apply slight darkening to this fallback too?
    // resultHsl.l *= 0.95;
  }

  // Final Clamping
  resultHsl.s = Math.max(0, Math.min(1, resultHsl.s));
  resultHsl.l = Math.max(0, Math.min(1, resultHsl.l));

  const rgb3 = hslToRgb(resultHsl);
  return { rgb: rgb1, rgb2, rgb3 };
};
// crée une variation d'une couleur
const createRGBVariations = (rgb) => {
  // Crée deux tableaux pour stocker les variations de couleur
  const rgb1 = [];
  const rgb2 = [];

  // Définit les distances de variation de couleur
  const distance1 = 20; // Variation plus petite
  const distance2 = 40; // Variation plus grande

  // Calcule les variations de couleur pour chaque composante RGB
  rgb.map((val, index) => {
    // Utilise clamp pour simplifier
    rgb1[index] = Math.max(0, Math.min(255, val + distance1));
    rgb2[index] = Math.max(0, Math.min(255, val - distance2));
  });

  // Retourne l'objet contenant les trois tableaux de couleurs
  return { rgb, rgb1, rgb2 };
};
// avec 2 couleurs et une couleur cible, génère 2 couleurs intermédiaires
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

const colorManagementFuncs = {
  complementary,
  opposite,
  triangleHarmony,
  siblingOfComplementary,
  analogue,
  squareHarmony,
  rectangleHarmony1,
  rectangleHarmony2,
  inputOfTwoColorForAThird,
  createRGBVariations,
  generateIntermediateColors,
  getColorInfo,
  getColorNameFromHue,
};
export default colorManagementFuncs;
