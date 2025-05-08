import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import { useState, useEffect } from "react";
import "./temperature.css";
import colorManagementFuncs from "../../utilities/complementaries";
import { writeToClipboard } from "../../utilities/clipboardUtils";
import { useFeedback } from "../../contexts/FeedbackContext.jsx";
const { rgbToHex, hslToRgb, rgbToHsl, ofOppositeTemperature } =
  InformationTranslationFuncs;
const { opposite } = colorManagementFuncs;
const Temperatures = ({ rgb, contrastColorRgb }) => {
  const [oppositeTemperature, setOppositeTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [HSL, setHSL] = useState(null);
  const { showFeedback } = useFeedback();

  const handleHexCopy = (hex) => {
    if (!hex) return;
    writeToClipboard(hex)
      .then(() => {
        showFeedback(`Copied ${hex}!`, "success");
      })
      .catch((err) => {
        showFeedback("Failed to copy!", "error");
        console.error("Clipboard error: ", err);
      });
  };

  console.log(rgb);
  useEffect(() => {
    setOppositeTemperature(ofOppositeTemperature(rgb));
    setHSL(rgbToHsl(rgb));
    setLoading(false);
  }, [rgb]);

  return loading ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="temperature-layout-wrapper">
      <div className="temperature-layout-container">
        <div
          className="center-item"
          style={{
            "--color": rgbToHex(rgb),
            "--color-opposite": rgbToHex(contrastColorRgb),
          }}
          onClick={() => handleHexCopy(rgbToHex(rgb))}
        >
          {rgbToHex(rgb).toUpperCase()}
        </div>
        <div
          className="circle-items-container"
          style={{
            "--n": oppositeTemperature.length,
            "--circle-size": "28em",
            "--item-size": "5em",
          }}
        >
          {oppositeTemperature.map((temp, index) => {
            const neoHSL = { h: temp, s: HSL.s, l: HSL.l };
            const currentHex = rgbToHex(hslToRgb(neoHSL));
            return (
              <div
                key={temp}
                className="circle-item"
                style={{
                  "--i": index,
                  "--item-color": currentHex,
                  "--color-opposite": rgbToHex(contrastColorRgb),
                  "--shadow-color": rgbToHex(opposite(contrastColorRgb)),
                }}
                onClick={() => handleHexCopy(currentHex)}
              >
                {currentHex.toUpperCase()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Temperatures;
