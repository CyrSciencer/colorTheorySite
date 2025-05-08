import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import colorManagementFuncs from "../../utilities/complementaries";

const { opposite } = colorManagementFuncs;

// Function to determine contrast color (black or white) based on RGB array
const getContrastColor = (rgbArray) => {
  // Simple brightness calculation (YIQ formula)
  const brightness =
    (rgbArray[0] * 299 + rgbArray[1] * 587 + rgbArray[2] * 114) / 1000;
  return brightness > 128 ? [0, 0, 0] : [255, 255, 255]; // Return black or white RGB array
};

export const renderGradientCell = (
  currentRgbArray,
  key,
  handleSuggestionClick
) => {
  const currentHex = InformationTranslationFuncs.rgbToHex
    ? InformationTranslationFuncs.rgbToHex(currentRgbArray)
    : "#000000"; // Default hex
  const contrastRgb = getContrastColor(currentRgbArray);
  const contrastHex = InformationTranslationFuncs.rgbToHex(contrastRgb);
  const shadowRgb = opposite(contrastRgb); // Calculate shadow RGB
  const shadowHex = InformationTranslationFuncs.rgbToHex(shadowRgb); // Calculate shadow Hex

  return (
    <div
      key={key}
      className="tip"
      style={{
        backgroundColor: currentHex,
        color: contrastHex,
        textShadow: `0 0 3px ${shadowHex}`,
      }}
      onClick={() => handleSuggestionClick(currentHex)}
    >
      {currentHex.toUpperCase()}
    </div>
  );
};

// Utility for HSL-based gradients that also need CSS HSL string
export const renderGradientCellWithCssHsl = (
  currentHsl,
  key,
  handleSuggestionClick
) => {
  const currentRgbArray = InformationTranslationFuncs.hslToRgb
    ? InformationTranslationFuncs.hslToRgb(currentHsl)
    : [0, 0, 0]; // Fallback RGB array

  const currentHex = InformationTranslationFuncs.rgbToHex
    ? InformationTranslationFuncs.rgbToHex(currentRgbArray)
    : "#000000"; // Default hex
  const contrastRgb = getContrastColor(currentRgbArray);
  const contrastHex = InformationTranslationFuncs.rgbToHex(contrastRgb);
  const shadowRgb = opposite(contrastRgb); // Calculate shadow RGB
  const shadowHex = InformationTranslationFuncs.rgbToHex(shadowRgb); // Calculate shadow Hex
  const cssHslString = `hsl(${currentHsl.h}, ${currentHsl.s * 100}%, ${
    currentHsl.l * 100
  }%)`;

  return (
    <div
      key={key}
      className="tip"
      style={{
        backgroundColor: cssHslString, // Use HSL string for background
        color: contrastHex,
        textShadow: `0 0 3px ${shadowHex}`,
      }}
      onClick={() => handleSuggestionClick(currentHex)}
    >
      {currentHex.toUpperCase()}
    </div>
  );
};
