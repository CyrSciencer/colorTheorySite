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
