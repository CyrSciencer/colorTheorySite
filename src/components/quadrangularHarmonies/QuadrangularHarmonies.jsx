import "./quadrangularHarmonies.css";
import InformationTranslationFuncs from "../../../utilities/InformationTranslation.js";
import colorManagementFuncs from "../../../utilities/complementaries.js";
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
  const { rgbVersHex } = InformationTranslationFuncs;
  const { squareHarmony, rectangleHarmony1, rectangleHarmony2, opposite } =
    colorManagementFuncs;
  useEffect(() => {
    console.log("squareHarmony =====>", squareHarmony(rgb));
    console.log("rectangleHarmony1 =====>", rectangleHarmony1(rgb));
    console.log("rectangleHarmony2 =====>", rectangleHarmony2(rgb));
    setHex2(rgbVersHex(squareHarmony(rgb).rgb2));
    setHex3(rgbVersHex(squareHarmony(rgb).rgb3));
    setHex4(rgbVersHex(squareHarmony(rgb).rgb4));
    setHex5(rgbVersHex(rectangleHarmony1(rgb).rgb2));
    setHex6(rgbVersHex(rectangleHarmony2(rgb).rgb2));
    setHex7(rgbVersHex(rectangleHarmony1(rgb).rgb4));
    setHex8(rgbVersHex(rectangleHarmony2(rgb).rgb4));
  }, [rgb]);
  return (
    <div className="quadrangular-harmonies">
      <div className="tetrad-harmony">
        <img src={tetradHarmony} alt="tetradHarmony" />
        <div className="tips">
          <div
            className="tip"
            style={{
              backgroundColor: rgbVersHex(rgb),
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbVersHex(opposite(contrastColorRgb))}`,
            }}
          ></div>
          <div
            className="tip"
            style={{
              backgroundColor: hex2,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbVersHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex2.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex5,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbVersHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex5.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex7,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbVersHex(opposite(contrastColorRgb))}`,
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
              backgroundColor: rgbVersHex(rgb),
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbVersHex(opposite(contrastColorRgb))}`,
            }}
          ></div>
          <div
            className="tip"
            style={{
              backgroundColor: hex2,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbVersHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex2.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex3,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbVersHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex3.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex4,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbVersHex(opposite(contrastColorRgb))}`,
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
              backgroundColor: rgbVersHex(rgb),
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbVersHex(opposite(contrastColorRgb))}`,
            }}
          ></div>
          <div
            className="tip"
            style={{
              backgroundColor: hex2,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbVersHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex2.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex6,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbVersHex(opposite(contrastColorRgb))}`,
            }}
          >
            {hex6.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex8,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(contrastColorRgb),
              textShadow: `0 0 5px ${rgbVersHex(opposite(contrastColorRgb))}`,
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
