// Helper function to generate a random RGB color array
import informationTranslationFuncs from "./InformationTranslation";
const { hslToRgb } = informationTranslationFuncs;
export const getRandomRgbArray = () => {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100);
  const l = Math.floor(Math.random() * 100);
  const rgb = hslToRgb({ h, s, l });
  return rgb;
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
