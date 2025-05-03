import colorManagementFuncs from "../../utilities/complementaries";
import InformationTranslationFuncs from "../../utilities/InformationTranslation.js";
import "./compositionHarmony.css";
import RatioSection from "./RatioSection";

// Define the inner component to render a ratio section

const CompositionHarmony = ({ hsl }) => {
  const { contrast, hslToRgb, rgbToHsl, rgbVersHex } =
    InformationTranslationFuncs;
  const { complementary } = colorManagementFuncs;
  // 1. Calculate data for the base color
  const contrastSelected = contrast(hsl);
  const rgb = hslToRgb(hsl);

  // 2. Calculate data for the complementary color
  const complementaryRgb = complementary(rgb);
  const complementaryHsl = rgbToHsl(complementaryRgb);
  const complementaryContrast = contrast(complementaryHsl);

  // 3. Create an array of color data objects
  const colorDataArrayofTwo = [
    {
      name: "Base",
      contrastInfo: contrastSelected,
      rgbValue: rgb,
    },
    {
      name: "Complementary",
      contrastInfo: complementaryContrast,
      rgbValue: complementaryRgb,
    },
  ];

  return (
    <div className="composition-harmony-wrapper">
      {/* Use the inner component for the Light Ratio section */}
      <RatioSection
        title="Ratio lumineux (Complémentaire)"
        ratioKey="lightRatioHarmony" // Pass the key for the light ratio
        colorDataArray={colorDataArrayofTwo}
        rgbVersHex={rgbVersHex} // Pass the conversion function
      />

      {/* Use the inner component for the Dark Ratio section */}
      <RatioSection
        title="Ratio sombre (Complémentaire)"
        ratioKey="darkRatioHarmony" // Pass the key for the dark ratio
        colorDataArray={colorDataArrayofTwo}
        rgbVersHex={rgbVersHex} // Pass the conversion function
      />
    </div>
  );
};

export default CompositionHarmony;
