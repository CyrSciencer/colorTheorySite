import colorManagementFuncs from "../../../utilities/complementaries";
import InformationTranslationFuncs from "../../../utilities/InformationTranslation.js";
import "./compositionHarmony.css"; // Reuse the same CSS for now
import RatioSection from "./RatioSection";

const SquareHarmonyComposition = ({ hsl }) => {
  const { contrast, hslToRgb, rgbToHsl, rgbVersHex } =
    InformationTranslationFuncs;
  const { squareHarmony } = colorManagementFuncs;

  // 1. Calculate data for the base color
  const contrastSelected = contrast(hsl);
  const rgb = hslToRgb(hsl);

  // 2. Calculate data for the square harmony colors
  const harmony = squareHarmony(rgb);
  const rgb2 = harmony.rgb2;
  const rgb3 = harmony.rgb3;
  const rgb4 = harmony.rgb4;

  const hsl2 = rgbToHsl(rgb2);
  const hsl3 = rgbToHsl(rgb3);
  const hsl4 = rgbToHsl(rgb4);

  const contrast2 = contrast(hsl2);
  const contrast3 = contrast(hsl3);
  const contrast4 = contrast(hsl4);

  // 3. Create an array of color data objects
  const colorDataArrayofFour = [
    {
      name: "Base",
      contrastInfo: contrastSelected,
      rgbValue: rgb,
    },
    {
      name: "Square 2",
      contrastInfo: contrast2,
      rgbValue: rgb2,
    },
    {
      name: "Square 3",
      contrastInfo: contrast3,
      rgbValue: rgb3,
    },
    {
      name: "Square 4",
      contrastInfo: contrast4,
      rgbValue: rgb4,
    },
  ];

  return (
    <div className="composition-harmony-wrapper">
      {/* Use the inner component for the Light Ratio section */}
      <RatioSection
        title="Light Ratio Harmony (Square)"
        ratioKey="lightRatioHarmony" // Pass the key for the light ratio
        colorDataArray={colorDataArrayofFour}
        rgbVersHex={rgbVersHex} // Pass the conversion function
      />

      {/* Use the inner component for the Dark Ratio section */}
      <RatioSection
        title="Dark Ratio Harmony (Square)"
        ratioKey="darkRatioHarmony" // Pass the key for the dark ratio
        colorDataArray={colorDataArrayofFour}
        rgbVersHex={rgbVersHex} // Pass the conversion function
      />
    </div>
  );
};

export default SquareHarmonyComposition;
