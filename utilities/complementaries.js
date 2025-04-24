import InformationTranslationFuncs from "./InformationTranslation.js";
const { rgbToHsl, hslToRgb } = InformationTranslationFuncs;

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
};
export default colorManagementFuncs;
