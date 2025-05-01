import colorManagementFuncs from "../../../utilities/complementaries";
import InformationTranslationFuncs from "../../../utilities/InformationTranslation";
import "./compositionHarmony.css"; // Reuse the same CSS for now
import RatioSection from "./RatioSection";

const TriangleHarmonyComposition = ({ hsl }) => {
  const { contrast, hslToRgb, rgbToHsl, rgbToHex } =
    InformationTranslationFuncs;
  const { triangleHarmony, siblingOfComplementary, analogue } =
    colorManagementFuncs;

  // 1. Calculate data for the base color
  const contrastSelected = contrast(hsl);
  const rgb = hslToRgb(hsl);

  // 2. Calculate data for the triangle harmony colors
  const harmony = triangleHarmony(rgb);
  const rgb2 = harmony.rgb2;
  const rgb3 = harmony.rgb3;

  const hsl2 = rgbToHsl(rgb2);
  const hsl3 = rgbToHsl(rgb3);

  const contrast2 = contrast(hsl2);
  const contrast3 = contrast(hsl3);

  // 3. Create an array of color data objects
  const colorDataArrayofThree = [
    {
      name: "Base",
      contrastInfo: contrastSelected,
      rgbValue: rgb,
    },
    {
      name: "Triangle 2",
      contrastInfo: contrast2,
      rgbValue: rgb2,
    },
    {
      name: "Triangle 3",
      contrastInfo: contrast3,
      rgbValue: rgb3,
    },
  ];

  const siblingOfComplementaryHarmony = siblingOfComplementary(rgb);
  const analogueHarmony = analogue(rgb);

  return (
    <div className="composition-harmony-wrapper">
      {/* Use the inner component for the Light Ratio section */}
      <RatioSection
        title="Light Ratio Harmony (Triangle)"
        ratioKey="lightRatioHarmony" // Pass the key for the light ratio
        colorDataArray={colorDataArrayofThree}
        rgbToHex={rgbToHex} // Pass the conversion function
      />

      {/* Use the inner component for the Dark Ratio section */}
      <RatioSection
        title="Dark Ratio Harmony (Triangle)"
        ratioKey="darkRatioHarmony" // Pass the key for the dark ratio
        colorDataArray={colorDataArrayofThree}
        rgbToHex={rgbToHex} // Pass the conversion function
      />
    </div>
  );
};

export default TriangleHarmonyComposition;
