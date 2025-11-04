import informationTranslationFuncs from "./InformationTranslation";
import colorManagementFuncs from "./complementaries";
const { rgbToHsl, hslToRgb } = informationTranslationFuncs;
const { interpolateHueShortestPath, interpolateHueLongestPath } =
  colorManagementFuncs;
// Helper function to generate a random RGB color array
export const getRandomRgbArray = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return [r, g, b];
};

// Helper function to generate permutations of an array
export const getPermutations = (arr) => {
  if (!Array.isArray(arr)) {
    // console.warn("getPermutations expects an array. Received:", arr);
    return [[]]; // Return a default value or throw an error
  }
  if (arr.length === 0) return [[]];

  const firstElement = arr[0];
  const rest = arr.slice(1);

  const permsWithoutFirst = getPermutations(rest);
  const allPermutations = [];

  permsWithoutFirst.forEach((perm) => {
    for (let i = 0; i <= perm.length; i++) {
      const permWithFirst = [
        ...perm.slice(0, i),
        firstElement,
        ...perm.slice(i),
      ];
      allPermutations.push(permWithFirst);
    }
  });
  return allPermutations;
};
export const getIntermediateColors1 = (rgb1, rgb2) => {
  const hsl1 = rgbToHsl(rgb1);
  const hsl2 = rgbToHsl(rgb2);
  const intermediateHue = interpolateHueShortestPath(hsl1.h, hsl2.h, 0.5);
  const intermediateHsl = {
    h: intermediateHue,
    s: (hsl1.s + hsl2.s) / 2,
    l: (hsl1.l + hsl2.l) / 2,
  };
  return hslToRgb(intermediateHsl);
};
export const getIntermediateColors2 = (rgb1, rgb2) => {
  const hsl1 = rgbToHsl(rgb1);
  const hsl2 = rgbToHsl(rgb2);
  const intermediateHue = interpolateHueLongestPath(hsl1.h, hsl2.h, 0.5);
  const intermediateHsl = {
    h: intermediateHue,
    s: (hsl1.s + hsl2.s) / 2,
    l: (hsl1.l + hsl2.l) / 2,
  };
  return hslToRgb(intermediateHsl);
};
