import InformationTranslationFuncs from "../../../utilities/InformationTranslation";
import { useState, useEffect } from "react";
import "./temperature.css";
import colorManagementFuncs from "../../../utilities/complementaries";
const { ofOppositeTemperature } = InformationTranslationFuncs;
const { opposite } = colorManagementFuncs;
const Temperatures = ({ rgb, contrastColorRgb }) => {
  const [oppositeTemperature, setOppositeTemperature] = useState(null);
  const { rgbVersHex, hslToRgb, rgbToHsl } = InformationTranslationFuncs;
  const [loading, setLoading] = useState(true);
  const [HSL, setHSL] = useState(null);
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
            "--color": rgbVersHex(rgb),
            "--color-opposite": rgbVersHex(contrastColorRgb),
          }}
        >
          {rgbVersHex(rgb).toUpperCase()}
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
            return (
              <div
                key={temp}
                className="circle-item"
                style={{
                  "--i": index,
                  "--item-color": rgbVersHex(hslToRgb(neoHSL)),
                }}
              >
                {rgbVersHex(hslToRgb(neoHSL)).toUpperCase()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Temperatures;
