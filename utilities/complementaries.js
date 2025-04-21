//rgb est en format tableau [255,255,255]
//hsl est en format objet {h:0,s:0,l:0}
//hex est en format string #ffffff
//hsv est en format objet {h:0,s:0,v:0}
//Convertisseurs §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
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
    s_hsv = (v - l) / v; // Use standard formula: (V-L)/V
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
  // Ajuste la teinte de 30 degrés
  const h2 = (hsl.h + 30) % 360;
  // Ajuste la teinte de -30 degrés
  const h3 = (hsl.h - 30 + 360) % 360; // fait en sorte que la teinte soit entre 0 et 360
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
  hsl.h = (hsl.h + 90) % 360;
  // Ajuste la teinte de 180 degrés
  hsl.h = (hsl.h + 180) % 360; // Complementary
  // Ajuste la teinte de 270 degrés
  hsl.h = (hsl.h + 270) % 360;
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
  hsl.h = (hsl.h + 45) % 360;
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
  hsl.h = (hsl.h - 45 + 360) % 360;
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

// Generates a third color by mixing two input RGB colors in HSL space
const inputOfTwoColorForAThird = (rgb, rgb2, percent) => {
  // Convertit les couleurs RGB en HSL
  const hsl1 = rgbToHsl(rgb);
  const hsl2 = rgbToHsl(rgb2);

  // Mixe dans l'espace HSL
  const hsl3 = hslMixer(hsl1, hsl2, percent);

  // Convertit le résultat en RGB
  const rgb3 = hslToRgb(hsl3);

  // Retourne les couleurs RGB d'origine et la nouvelle couleur mélangée
  return { rgb, rgb2, rgb3 };
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
//contrastes §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
const contrast = (hsv) => {
  const colorHues = {
    yellow: { hue: 60, ratioHarmony: 3 },
    red: { hue: 0, ratioHarmony: 6 },
    red2: { hue: 360, ratioHarmony: 6 },
    blue: { hue: 240, ratioHarmony: 8 },
    green: { hue: 120, ratioHarmony: 6 },
    purple: { hue: 300, ratioHarmony: 9 },
    orange: { hue: 30, ratioHarmony: 4 },
  };

  // console.log(hsv.h);
  const distances = {
    yellow: Math.abs(hsv.h - colorHues.yellow.hue),
    red: Math.abs(hsv.h - colorHues.red.hue),
    red2: Math.abs(hsv.h - colorHues.red2.hue),
    blue: Math.abs(hsv.h - colorHues.blue.hue),
    green: Math.abs(hsv.h - colorHues.green.hue),
    purple: Math.abs(hsv.h - colorHues.purple.hue),
    orange: Math.abs(hsv.h - colorHues.orange.hue),
  };
  // console.log(distances);
  const minDistance = Math.min(...Object.values(distances));
  const closestColor = Object.keys(distances).find(
    (key) => distances[key] === minDistance
  );
  // console.log({ closestColor });
  // console.log(colorHues[closestColor]);
  const { ratioHarmony } = colorHues[closestColor];
  return { ratioHarmony, closestColor };
};
const funcs = {
  rgbToHsl,
  hslToRgb,
  rgbVersHex,
  HexVersRGB,
  hslToHsv,
  hsvToHsl,
  complementary,
  opposite,
  triangleHarmony,
  siblingOfComplementary,
  squareHarmony,
  rectangleHarmony1,
  rectangleHarmony2,
  inputOfTwoColorForAThird,
  createRGBVariations,
  generateIntermediateColors,
  contrast,
};
export default funcs;
