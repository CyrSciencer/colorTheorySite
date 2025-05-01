import "./quadrangularHarmonies.css";
import InformationTranslationFuncs from "../../../utilities/InformationTranslation";
import colorManagementFuncs from "../../../utilities/complementaries";
import { useState, useEffect } from "react";
import tetradHarmony from "../../assets/svg/harmonie-tetradiques.svg";
import pureSquareHarmony from "../../assets/svg/harmonie-carré.svg";
const QuadrangularHarmonies = ({ rgb, contrastColorRgb }) => {
  const [hex2, setHex2] = useState("");
  const [hex3, setHex3] = useState("");
  const [hex4, setHex4] = useState("");
  const [hex5, setHex5] = useState("");
  const [hex6, setHex6] = useState("");
  const [hex7, setHex7] = useState("");
  const [hex8, setHex8] = useState("");
  const { rgbToHex } = InformationTranslationFuncs;
  const { squareHarmony, rectangleHarmony1, rectangleHarmony2, opposite } =
    colorManagementFuncs;
  useEffect(() => {
    console.log("squareHarmony =====>", squareHarmony(rgb));
    console.log("rectangleHarmony1 =====>", rectangleHarmony1(rgb));
    console.log("rectangleHarmony2 =====>", rectangleHarmony2(rgb));
    setHex2(rgbToHex(squareHarmony(rgb).rgb2));
    setHex3(rgbToHex(squareHarmony(rgb).rgb3));
    setHex4(rgbToHex(squareHarmony(rgb).rgb4));
    setHex5(rgbToHex(rectangleHarmony1(rgb).rgb2));
    setHex6(rgbToHex(rectangleHarmony2(rgb).rgb2));
    setHex7(rgbToHex(rectangleHarmony1(rgb).rgb4));
    setHex8(rgbToHex(rectangleHarmony2(rgb).rgb4));
  }, [rgb]);
  return (
    <div className="quadrangular-harmonies">
      <div className="tetrad-harmony">
        <img src={tetradHarmony} alt="tetradHarmony" />
        <div className="tips">
          <div
            className="tip"
            style={{
              backgroundColor: rgbToHex(rgb),
              color: rgbToHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
            }}
          ></div>
          <div
            className="tip"
            style={{
              backgroundColor: hex2,
              color: rgbToHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex2.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex5,
              color: rgbToHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex5.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex7,
              color: rgbToHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex7.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="pure-square-harmony">
        <img src={pureSquareHarmony} alt="pureSquareHarmony" />
        <div className="tips">
          <div
            className="tip"
            style={{
              backgroundColor: rgbToHex(rgb),
              color: rgbToHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
            }}
          ></div>
          <div
            className="tip"
            style={{
              backgroundColor: hex2,
              color: rgbToHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex2.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex3,
              color: rgbToHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex3.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex4,
              color: rgbToHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex4.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="tetrad-harmony">
        <img
          src={tetradHarmony}
          alt="tetradHarmony"
          className="quadrangularShifted"
        />
        <div className="tips">
          <div
            className="tip"
            style={{
              backgroundColor: rgbToHex(rgb),
              color: rgbToHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
            }}
          ></div>
          <div
            className="tip"
            style={{
              backgroundColor: hex2,
              color: rgbToHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex2.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex6,
              color: rgbToHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex6.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex8,
              color: rgbToHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex8.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuadrangularHarmonies;
