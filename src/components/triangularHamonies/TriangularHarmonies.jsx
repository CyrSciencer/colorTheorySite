import "./triangularHarmonies.css";
import colorManagementFuncs from "../../../utilities/complementaries";
import InformationTranslationFuncs from "../../../utilities/InformationTranslation";
import { useState, useEffect } from "react";
import adjComplementaryHarmony from "../../assets/svg/harmonie-adj-complémentaire.svg";
import analoguousHarmony from "../../assets/svg/harmonie-analogues.svg";
import triadHarmony from "../../assets/svg/harmonie-triadiques.svg";
const TriangularHarmonies = ({ rgb, contrastColorRgb }) => {
  console.log(rgb);

  const [hex2, setHex2] = useState("");
  const [hex3, setHex3] = useState("");
  const [hex4, setHex4] = useState("");
  const [hex5, setHex5] = useState("");
  const [hex6, setHex6] = useState("");
  const [hex7, setHex7] = useState("");
  const { rgbToHex } = InformationTranslationFuncs;
  const { triangleHarmony, siblingOfComplementary, opposite, analogue } =
    colorManagementFuncs;
  const equilateralHarmony = triangleHarmony(rgb);
  const siblingOfComplementaryHarmony = siblingOfComplementary(rgb);
  const analogueHarmony = analogue(rgb);
  console.log({ equilateralHarmony, siblingOfComplementaryHarmony });
  useEffect(() => {
    setHex2(rgbToHex(equilateralHarmony.rgb2));
    setHex3(rgbToHex(equilateralHarmony.rgb3));
    setHex4(rgbToHex(siblingOfComplementaryHarmony.rgb2));
    setHex5(rgbToHex(siblingOfComplementaryHarmony.rgb3));
    setHex6(rgbToHex(analogueHarmony.rgb2));
    setHex7(rgbToHex(analogueHarmony.rgb3));

    console.log({ hex2, hex3, hex4, hex5, hex6, hex7 });
  }, [rgb]);
  return (
    <div className="triangular-harmonies">
      <div className="equilateral-triangle">
        <img src={triadHarmony} alt="triad" />
        <div className="top-tip">
          <div
            className="tip"
            style={{
              backgroundColor: rgbToHex(rgb),
            }}
          ></div>
        </div>
        <div className="bottom-tips">
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
        </div>
      </div>

      <div className="isosceles-triangle">
        <img src={adjComplementaryHarmony} alt="adjComplementary" />
        <div className="top-tip">
          <div
            className="tip"
            style={{
              backgroundColor: rgbToHex(rgb),
            }}
          ></div>
        </div>
        <div className="bottom-tips">
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
        </div>
      </div>
      <div className="analogue-triangle">
        <img src={analoguousHarmony} alt="analogue" />
        <div className="top-tip">
          <div
            className="tip"
            style={{
              backgroundColor: rgbToHex(rgb),
            }}
          ></div>
        </div>
        <div className="bottom-tips">
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
        </div>
      </div>
    </div>
  );
};

export default TriangularHarmonies;
