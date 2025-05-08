import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import { useState, useEffect } from "react";
import "./temperature.css";
import colorManagementFuncs from "../../utilities/complementaries";
import useClipboardWithFeedback from "../../utilities/useClipboardWithFeedback.jsx";

const { rgbToHex, hslToRgb, rgbToHsl, ofOppositeTemperature } =
  InformationTranslationFuncs;
const { opposite } = colorManagementFuncs;

const Temperatures = ({ rgb, contrastColorRgb }) => {
  const [oppositeTemperature, setOppositeTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [HSL, setHSL] = useState(null);
  const copyWithFeedback = useClipboardWithFeedback();

  useEffect(() => {
    if (
      rgb &&
      rgb.length === 3 &&
      rgb.every((val) => typeof val === "number")
    ) {
      setOppositeTemperature(ofOppositeTemperature(rgb));
      setHSL(rgbToHsl(rgb));
    } else {
      setOppositeTemperature([]);
      setHSL({ h: 0, s: 0, l: 0 });
      console.warn("Invalid RGB prop passed to Temperatures component:", rgb);
    }
    setLoading(false);
  }, [rgb]);

  if (loading || !HSL || !oppositeTemperature) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="temperature-layout-wrapper">
      <div className="temperature-layout-container">
        <div
          className="center-item"
          style={{
            "--color": rgbToHex(rgb),
            "--color-opposite": rgbToHex(contrastColorRgb),
          }}
          onClick={() => copyWithFeedback(rgbToHex(rgb))}
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
            const contrastColorForChild = contrastColorRgb;
            return (
              <div
                key={temp}
                className="circle-item"
                style={{
                  "--i": index,
                  "--item-color": currentHex,
                  "--color-opposite": rgbToHex(contrastColorForChild),
                  "--shadow-color": rgbToHex(opposite(contrastColorForChild)),
                }}
                onClick={() => copyWithFeedback(currentHex)}
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
