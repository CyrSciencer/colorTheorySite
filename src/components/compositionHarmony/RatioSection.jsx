import InformationTranslationFuncs from "../../../utilities/InformationTranslation";
const { rgbToHex } = InformationTranslationFuncs;
const RatioSection = ({ title, ratioKey, colorDataArray }) => {
  // Sort the array based on the specified ratio key
  const sortedColorDataArray = [...colorDataArray].sort(
    (a, b) => a.contrastInfo[ratioKey] - b.contrastInfo[ratioKey]
  );

  return (
    <div className="ratio-section-container">
      <h3>{title}</h3>
      <div className="composition-light-dark-container">
        {/* Map over the sorted array */}
        {sortedColorDataArray.map((colorData, index) => (
          <div
            key={`${ratioKey}-${index}-${colorData.name}`}
            className="color-container"
            style={{
              // Use the ratioKey prop to access the correct harmony value
              "--ratio":
                colorData.contrastInfo[ratioKey] || colorData.contrastInfo,
              "--color": rgbToHex(colorData.rgbValue),
            }}
            title={`${colorData.name}: ${rgbToHex(colorData.rgbValue)}, ${
              colorData[ratioKey]
            } parts`}
          >
            {/* Inner content could be added here if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatioSection;
