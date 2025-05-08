// RGB is an array format, e.g., [255, 255, 255]
// HSL is an object format, e.g., {h:0, s:0, l:0}
// HEX is a string format, e.g., "#ffffff"
// HSV is an object format, e.g., {h:0, s:0, v:0}

// --- Color Converters ---
const rgbToHsl = (rgb) => {
  let r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0, // Default hue
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6; // h is now [0, 1]
  }

  // Return h=[0, 360], s=[0, 1], l=[0, 1]
  return {
    h: h * 360,
    s: s,
    l: l,
  };
};

const hslToRgb = (hsl) => {
  // Expects h=[0, 360], s=[0, 1], l=[0, 1]
  let h = hsl.h / 360, // Convert h to [0, 1] for calculation
    s = Math.max(0, Math.min(1, hsl.s)), // Clamp s
    l = Math.max(0, Math.min(1, hsl.l)); // Clamp l
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    // Use standard formulas
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

/**
 * Converts an RGB color value array to a hex color string.
 * Clamps RGB values to the valid 0-255 range.
 * Returns #000000 for invalid input.
 * @param {number[]} rgb - An array containing R, G, B values ([0-255]).
 * @returns {string} The hex color string (e.g., "#RRGGBB").
 */
const rgbToHex = (rgb) => {
  //"Convertit un tableau de 3 valeurs RGB en code hexadécimal."
  // console.log({ rgb });

  // Add check for valid array input
  if (!Array.isArray(rgb) || rgb.length !== 3) {
    console.warn("Invalid input to rgbToHex:", rgb);
    return "#000000"; // Return black or another default for invalid input
  }

  const [inputR, inputG, inputB] = rgb;

  // Ensure values are clamped to the [0, 255] range
  const clampedR = Math.max(0, Math.min(255, inputR));
  const clampedG = Math.max(0, Math.min(255, inputG));
  const clampedB = Math.max(0, Math.min(255, inputB));

  // Convert each component to a two-digit hexadecimal string
  const hexRed = clampedR.toString(16).padStart(2, "0");
  const hexGreen = clampedG.toString(16).padStart(2, "0");
  const hexBlue = clampedB.toString(16).padStart(2, "0");

  // Concatenate the hex components with a leading '#'
  const hexCode = "#" + hexRed + hexGreen + hexBlue;
  return hexCode;
};

/**
 * Converts a hex color string to an RGB color value array.
 * Returns [0, 0, 0] for invalid input format (#RRGGBB expected).
 * @param {string} hex - The hex color string (e.g., "#RRGGBB").
 * @returns {number[]} An array containing R, G, B values ([0-255]).
 */
const hexToRgb = (hex) => {
  // Validate input format (#RRGGBB)
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    console.warn("Invalid input to hexToRgb:", hex);
    return [0, 0, 0]; // Return black as default for invalid input
  }
  const rouge = parseInt(hex.slice(1, 3), 16);
  const vert = parseInt(hex.slice(3, 5), 16);
  const bleu = parseInt(hex.slice(5, 7), 16);
  return [rouge, vert, bleu];
};

const hslToHsv = (hsl) => {
  // Expects h=[0, 360], s=[0, 1], l=[0, 1]
  const h = hsl.h;
  let s = Math.max(0, Math.min(1, hsl.s)); // Clamp s
  let l = Math.max(0, Math.min(1, hsl.l)); // Clamp l

  // Calculate V and S_hsv in [0, 1]
  const v = l + s * Math.min(l, 1 - l);
  let s_hsv;
  if (v === 0) {
    s_hsv = 0;
  } else {
    s_hsv = 2 * (1 - l / v); // Corrected formula
  }

  // Return h=[0, 360], s_hsv=[0, 1], v=[0, 1]
  return {
    h: h,
    s: Math.max(0, Math.min(1, s_hsv)), // Clamp result
    v: Math.max(0, Math.min(1, v)), // Clamp result
  };
};

const hsvToHsl = (hsv) => {
  // Expects h=[0, 360], s=[0, 1], v=[0, 1]
  const h = hsv.h;
  let s = Math.max(0, Math.min(1, hsv.s)); // Clamp s
  let v = Math.max(0, Math.min(1, hsv.v)); // Clamp v

  // Calculate L and S_hsl in [0, 1]
  const l = v * (1 - s / 2);
  let s_hsl;
  if (l === 0 || l === 1) {
    s_hsl = 0;
  } else {
    // Use standard formula: (v - l) / min(l, 1 - l)
    s_hsl = (v - l) / Math.min(l, 1 - l);
  }

  // Return h=[0, 360], s_hsl=[0, 1], l=[0, 1]
  return {
    h: h,
    s: Math.max(0, Math.min(1, s_hsl)), // Clamp result
    l: Math.max(0, Math.min(1, l)), // Clamp result
  };
};

// Add the new HSV to RGB function here
const hsvToRgb = (hsv) => {
  // Expects h=[0, 360], s=[0, 1], v=[0, 1]
  let h = hsv.h / 60; // Normalize h to [0, 6)
  let s = Math.max(0, Math.min(1, hsv.s)); // Clamp s
  let v = Math.max(0, Math.min(1, hsv.v)); // Clamp v
  let r, g, b;

  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// Add the new RGB to HSV function here
const rgbToHsv = (rgb) => {
  // Convert RGB to HSL first
  const hsl = rgbToHsl(rgb);
  // Then convert HSL to HSV
  return hslToHsv(hsl);
};

// Helper function to calculate the minimum distance between two hues (0-360)
const getMinHueDistance = (h1, h2) => {
  const diff = Math.abs(h1 - h2);
  return Math.min(diff, 360 - diff);
};

// --- Contrast Calculation ---

/**
 * Calculates a contrast score object based on hue and Goethe-inspired ratios.
 * @param {object} hsl - Color in HSL format {h, s, l}.
 * @returns {object} An object containing lightRatioHarmony and darkRatioHarmony.
 */
const contrast = (hsl) => {
  const colorHues = {
    yellow: { hue: 60, darkRatio: 5, lightRatio: 15 },
    red: { hue: 0, darkRatio: 12, lightRatio: 8 }, // Also covers hues near 360
    blue: { hue: 240, darkRatio: 15, lightRatio: 5 },
    green: { hue: 120, darkRatio: 9, lightRatio: 11 },
    purple: { hue: 280, darkRatio: 14, lightRatio: 6 },
    orange: { hue: 30, darkRatio: 10, lightRatio: 10 },
    cyan: { hue: 180, darkRatio: 7, lightRatio: 13 },
    magenta: { hue: 300, darkRatio: 11, lightRatio: 9 },
  };

  // Calculate distances using the helper function
  // Note: For red, its primary hue is 0. Distances to hues near 360 are naturally handled
  // by getMinHueDistance (e.g., getMinHueDistance(350, 0) is 10).
  // The original code had a special handling for red with 'red2' at hue 360.
  // getMinHueDistance(hsl.h, colorHues.red.hue) will correctly find the shortest path.
  const distances = {
    yellow: getMinHueDistance(hsl.h, colorHues.yellow.hue),
    red: getMinHueDistance(hsl.h, colorHues.red.hue), // Handles wrap-around for red correctly
    blue: getMinHueDistance(hsl.h, colorHues.blue.hue),
    green: getMinHueDistance(hsl.h, colorHues.green.hue),
    purple: getMinHueDistance(hsl.h, colorHues.purple.hue),
    orange: getMinHueDistance(hsl.h, colorHues.orange.hue),
    cyan: getMinHueDistance(hsl.h, colorHues.cyan.hue),
    magenta: getMinHueDistance(hsl.h, colorHues.magenta.hue),
  };

  const minDistance = Math.min(...Object.values(distances));
  const closestColor = Object.keys(distances).find(
    (key) => distances[key] === minDistance
  );
  const hsv = hslToHsv(hsl);
  const { darkRatio, lightRatio } = colorHues[closestColor];

  // Intensity (hsl.s) boosts the effect of brightness (hsv.v) and lightness (hsl.l)
  const saturationBoost = 1 + hsl.s; // Range [1, 2]
  // Average brightness (v) and lightness (l) before applying saturation boost
  const rawAdjustment = ((hsv.v + hsl.l) / 2) * saturationBoost;

  // Use a small epsilon to prevent division by zero or extreme values when v=0 or l=0
  const epsilon = 0.01;
  const finalAdjustment = Math.max(epsilon, rawAdjustment);

  // Adjust base ratios
  const darkRatioHarmony = darkRatio / finalAdjustment;
  const lightRatioHarmony = lightRatio * finalAdjustment;

  return { darkRatioHarmony, lightRatioHarmony, closestColor };
};

/**
 * Determines the best contrasting text color (black or white) for a given background RGB.
 * Uses a simple brightness threshold (sum of RGB > 382).
 * @param {number[]} rgb - Background color as an RGB array [r, g, b].
 * @returns {number[]} [0, 0, 0] for black or [255, 255, 255] for white.
 */
const getContrastingTextColorRgb = (rgb) => {
  if (!Array.isArray(rgb) || rgb.length !== 3) {
    console.warn("Invalid input to getContrastingTextColorRgb:", rgb);
    return [255, 255, 255]; // Default to white for invalid input
  }
  let checklightness = 0;
  rgb.forEach((val) => {
    checklightness += val;
  });
  // Use the threshold from SingleColorPage & TripleHexInput1
  return checklightness > 382 ? [0, 0, 0] : [255, 255, 255];
};

// --- Opposite Temperature Hue Gradient ---
const ofOppositeTemperature = (rgb, numSteps = 18) => {
  const hsl = rgbToHsl(rgb);
  const oppositeCenterHue = (hsl.h + 180) % 360; // Center of the opposite arc

  if (numSteps <= 0) {
    return [];
  }
  if (numSteps === 1) {
    return [oppositeCenterHue];
  }

  const gradientHues = [];
  const arcExtent = 180; // Extent of the arc in degrees (a semi-circle)
  const startHue = (oppositeCenterHue - arcExtent / 2 + 360) % 360; // Start of the arc
  const stepAngle = arcExtent / (numSteps - 1); // Angle between each step

  for (let i = 0; i < numSteps; i++) {
    const currentHue = (startHue + i * stepAngle) % 360;
    gradientHues.push(currentHue);
  }

  return gradientHues;
};
// --- Module Exports ---
const InformationTranslationFuncs = {
  rgbToHsl,
  hslToRgb,
  rgbToHex,
  hexToRgb,
  hslToHsv,
  hsvToHsl,
  hsvToRgb,
  rgbToHsv,
  contrast,
  getContrastingTextColorRgb,
  ofOppositeTemperature,
};

export default InformationTranslationFuncs;
