const RatioSection = ({ title, ratioKey, colorDataArray, rgbVersHex }) => {
  // Sort the array based on the specified ratio key
  const sortedColorDataArray = [...colorDataArray].sort(
    (a, b) => a.contrastInfo[ratioKey] - b.contrastInfo[ratioKey]
  );

  return (
    <>
      <h3>{title}</h3>
      <div className="composition-light-dark-container">
        {/* Map over the sorted array */}
        {sortedColorDataArray.map((colorData, index) => (
          <div
            key={`${ratioKey}-${index}-${colorData.name}`}
            className="color-container"
            style={{
              // Use the ratioKey prop to access the correct harmony value
              "--ratio": colorData.contrastInfo[ratioKey],
              "--color": rgbVersHex(colorData.rgbValue),
            }}
            title={`${colorData.name}: ${rgbVersHex(
              colorData.rgbValue
            ).toUpperCase()}`}
          >
            {/* Inner content could be added here if needed */}
          </div>
        ))}
      </div>
    </>
  );
};

export default RatioSection;
