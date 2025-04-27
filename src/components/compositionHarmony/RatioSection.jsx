const RatioSection = ({ title, ratioKey, colorDataArray, rgbVersHex }) => {
  return (
    <>
      <h3>{title}</h3>
      <div className="composition-light-dark-container">
        {colorDataArray.map((colorData, index) => (
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
