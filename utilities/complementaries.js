//rgb est en format tableau [255,255,255]
//hsl est en format objet {h:0,s:0,l:0}
//hex est en format string #ffffff
//Convertisseurs §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
const rgbToHsl = (rgb) => {
  let r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
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
    h /= 6;
  }

  return {
    h: h.toFixed(4) * 100,
    s: s.toFixed(4) * 100,
    l: l.toFixed(4) * 100,
  };
};
const hslToRgb = (hsl) => {
  let h = hsl.h / 360,
    s = hsl.s,
    l = hsl.l;
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
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};
const rgbVersHex = (rgb) => {
  //"Convertit un tableau de 3 valeurs RGB en code hexadécimal."

  const [rouge, vert, bleu] = rgb;

  // Assure que les valeurs sont dans la plage [0, 255]
  const r = Math.max(0, Math.min(255, rouge));
  const v = Math.max(0, Math.min(255, vert));
  const b = Math.max(0, Math.min(255, bleu));

  // Convertit chaque composante en hexadécimal et s'assure qu'elle a deux chiffres
  const hexRouge = r.toString(16).padStart(2, "0");
  const hexVert = v.toString(16).padStart(2, "0");
  const hexBleu = b.toString(16).padStart(2, "0");

  // Concatène les composantes hexadécimales
  const codeHex = "#" + hexRouge + hexVert + hexBleu;
  return codeHex;
};
const HexVersRGB = (hex) => {
  const rouge = parseInt(hex.slice(1, 3), 16);
  const vert = parseInt(hex.slice(3, 5), 16);
  const bleu = parseInt(hex.slice(5, 7), 16);
  return [rouge, vert, bleu];
};
const hslToHsv = (hsl) => {
  const h = parseFloat(hsl.h); // Ensure h is a number
  let s = parseFloat(hsl.s); // Ensure s is a number
  let l = parseFloat(hsl.l); // Ensure l is a number

  // Calculate Value (V)
  let v = l + s * Math.min(l, 1 - l);

  // Calculate Saturation (S) for HSV
  let newS;
  if (v === 0) {
    newS = 0;
  } else {
    // Avoid division by zero or very small numbers causing issues
    newS = 2 * (1 - l / v);
  }

  // Clamp S and V before formatting to avoid potential issues with toFixed
  newS = Math.max(0, Math.min(1, newS));
  v = Math.max(0, Math.min(1, v));

  // Return consistent string format
  return {
    h: h.toFixed(4) * 100,
    s: newS.toFixed(4) * 100,
    v: v.toFixed(4) * 100,
  };
};
const hsvToHsl = (hsv) => {
  const h = hsv.h;
  let s = hsv.s;
  let v = hsv.v;
  let l = v * (1 - s / 2);
  let newS;
  if (l === 0 || l === 1) {
    newS = 0;
  } else {
    newS = 2 * (1 - l / v);
  }
  return {
    h: h.toFixed(4) * 100,
    s: newS.toFixed(4) * 100,
    l: l.toFixed(4) * 100,
  };
};
//complementaire §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
const complementary = (rgb) => {
  const hsl = rgbToHsl(rgb);
  hsl.h + 180 > 360 ? (hsl.h = hsl.h + 180 - 360) : (hsl.h = hsl.h + 180);
  const hsl2 = { h: hsl.h, s: hsl.s, l: hsl.l };
  const rgb2 = hslToRgb(hsl2);
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
  hsl.h + 30 > 360 ? (hsl.h = hsl.h + 30 - 360) : (hsl.h = hsl.h + 30);
  const hsl2 = { h: hsl.h, s: hsl.s, l: hsl.l };
  hsl.h - 30 < 0 ? (hsl.h = hsl.h - 30 + 360) : (hsl.h = hsl.h - 30);
  const hsl3 = { h: hsl.h, s: hsl.s, l: hsl.l };
  const rgb2 = hslToRgb(hsl2);
  const rgb3 = hslToRgb(hsl3);
  return { rgb, rgb2, rgb3 };
};
//fourths §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
const squareHarmony = (rgb) => {
  const hsl = rgbToHsl(rgb);
  hsl.h + 90 > 360 ? (hsl.h = hsl.h + 90 - 360) : (hsl.h = hsl.h + 90);
  const hsl2 = { h: hsl.h, s: hsl.s, l: hsl.l };
  hsl.h - 90 < 0 ? (hsl.h = hsl.h - 90 + 360) : (hsl.h = hsl.h - 90);
  const hsl3 = { h: hsl.h, s: hsl.s, l: hsl.l };
  hsl.h + 180 > 360 ? (hsl.h = hsl.h + 180 - 360) : (hsl.h = hsl.h + 180);
  const hsl4 = { h: hsl.h, s: hsl.s, l: hsl.l };
  const rgb2 = hslToRgb(hsl2);
  const rgb3 = hslToRgb(hsl3);
  const rgb4 = hslToRgb(hsl4);
  return { rgb, rgb2, rgb3, rgb4 };
};
const rectangleHarmony1 = (rgb) => {
  const hsl = rgbToHsl(rgb);
  hsl.h + 45 > 360 ? (hsl.h = hsl.h + 45 - 360) : (hsl.h = hsl.h + 45);
  const hsl2 = { h: hsl.h, s: hsl.s, l: hsl.l };
  const rgb2 = hslToRgb(hsl2);
  const rgb3 = complementary(rgb);
  const hsl3 = rgbToHsl(rgb3);
  hsl3.h + 45 > 360 ? (hsl3.h = hsl3.h + 45 - 360) : (hsl3.h = hsl3.h + 45);
  const hsl4 = { h: hsl3.h, s: hsl3.s, l: hsl3.l };
  const rgb4 = hslToRgb(hsl4);
  return { rgb, rgb2, rgb3, rgb4 };
};
const rectangleHarmony2 = (rgb) => {
  const hsl = rgbToHsl(rgb);
  hsl.h - 45 > 360 ? (hsl.h = hsl.h - 45 + 360) : (hsl.h = hsl.h - 45);
  const hsl2 = { h: hsl.h, s: hsl.s, l: hsl.l };
  const rgb2 = hslToRgb(hsl2);
  const rgb3 = complementary(rgb);
  const hsl3 = rgbToHsl(rgb3);
  hsl3.h - 45 < 0 ? (hsl3.h = hsl3.h - 45 + 360) : (hsl3.h = hsl3.h - 45);
  const hsl4 = { h: hsl3.h, s: hsl3.s, l: hsl3.l };
  const rgb4 = hslToRgb(hsl4);
  return { rgb, rgb2, rgb3, rgb4 };
};
// Autres §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
// Mixes two HSL colors for a third color
const hslMixer = (hsl1, hsl2, percent) => {
  // Hue interpolation (shortest path)
  let deltaH = hsl2.h - hsl1.h;
  if (deltaH > 180) {
    deltaH -= 360;
  } else if (deltaH <= -180) {
    deltaH += 360;
  }
  let h = hsl1.h + deltaH * percent;
  // Normalize hue to be within [0, 360)
  h = ((h % 360) + 360) % 360;

  // Saturation interpolation
  const s = hsl1.s + (hsl2.s - hsl1.s) * percent;

  // Lightness interpolation
  const l = hsl1.l + (hsl2.l - hsl1.l) * percent;

  // Clamp saturation and lightness between 0 and 1
  const clampedS = Math.max(0, Math.min(1, s));
  const clampedL = Math.max(0, Math.min(1, l));

  return { h: h, s: clampedS, l: clampedL };
};

// Generates a third color by mixing two input RGB colors in HSL space
const inputOfTwoColorForAThird = (rgb, rgb2, percent) => {
  // Convert input RGB to HSL
  const hsl1 = rgbToHsl(rgb);
  const hsl2 = rgbToHsl(rgb2);

  // Mix in HSL space
  const hsl3 = hslMixer(hsl1, hsl2, percent);

  // Convert the result back to RGB
  const rgb3 = hslToRgb(hsl3);

  // Return original RGBs and the new mixed RGB
  return { rgb, rgb2, rgb3 };
};
// create a variation of a color
const createRGBVariations = (rgb) => {
  // Crée deux tableaux pour stocker les variations de couleur
  const rgb1 = [];
  const rgb2 = [];

  // Définit les distances de variation de couleur
  const distance1 = 20; // Variation plus petite
  const distance2 = 40; // Variation plus grande

  // Calcule les variations de couleur pour chaque composante RGB
  rgb.map((val, index) => {
    // Use clamp for simplification
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
  // Convert input RGB colors to HSL
  const hsl1 = rgbToHsl(rgb1);
  const hsl2 = rgbToHsl(rgb2);
  const targetHsl = rgbToHsl(targetRGB);

  // Interpolate in HSL space towards the target HSL
  const hsl3 = hslMixer(hsl1, targetHsl, factor);
  const hsl4 = hslMixer(hsl2, targetHsl, factor);

  // Convert the resulting HSL colors back to RGB
  const rgb3 = hslToRgb(hsl3);
  const rgb4 = hslToRgb(hsl4);

  // Return original RGBs and the new intermediate RGBs
  return { rgb1, rgb2, rgb3, rgb4 };
};
const funcs = {
  rgbToHsl,
  hslToRgb,
  rgbVersHex,
  HexVersRGB,
  hslToHsv,
  hsvToHsl,
  complementary,
  triangleHarmony,
  siblingOfComplementary,
  squareHarmony,
  rectangleHarmony1,
  rectangleHarmony2,
  inputOfTwoColorForAThird,
  createRGBVariations,
  generateIntermediateColors,
};
export default funcs;
