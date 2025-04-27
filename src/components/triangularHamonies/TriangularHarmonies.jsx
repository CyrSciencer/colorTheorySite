import "./triangularHarmonies.css";
import colorManagementFuncs from "../../../utilities/complementaries";
import InformationTranslationFuncs from "../../../utilities/InformationTranslation.js";
import { useState, useEffect } from "react";
import adjComplementaryHarmony from "../../assets/svg/harmonie-adj-complémentaire.svg";
import analoguousHarmony from "../../assets/svg/harmonie-analogues.svg";
import triadHarmony from "../../assets/svg/harmonie-triadiques.svg";
const TriangularHarmonies = ({ rgb }) => {
  console.log(rgb);

  const [hex2, setHex2] = useState("");
  const [hex3, setHex3] = useState("");
  const [hex4, setHex4] = useState("");
  const [hex5, setHex5] = useState("");
  const [hex6, setHex6] = useState("");
  const [hex7, setHex7] = useState("");
  const [lightness, setLightness] = useState([0, 0, 0]);
  const { rgbVersHex } = InformationTranslationFuncs;
  const {
    triangleHarmony,
    siblingOfComplementary,
    opposite,
    analogue,
    complementary,
  } = colorManagementFuncs;
  const equilateralHarmony = triangleHarmony(rgb);
  const siblingOfComplementaryHarmony = siblingOfComplementary(rgb);
  const analogueHarmony = analogue(rgb);
  console.log({ equilateralHarmony, siblingOfComplementaryHarmony });
  useEffect(() => {
    let checklightness = 0;
    rgb.map((val) => {
      checklightness += val;
    });
    console.log(checklightness);
    checklightness > 382
      ? setLightness([0, 0, 0])
      : setLightness([255, 255, 255]);
    setHex2(rgbVersHex(equilateralHarmony.rgb2));
    setHex3(rgbVersHex(equilateralHarmony.rgb3));
    setHex4(rgbVersHex(siblingOfComplementaryHarmony.rgb2));
    setHex5(rgbVersHex(siblingOfComplementaryHarmony.rgb3));
    setHex6(rgbVersHex(analogueHarmony.rgb2));
    setHex7(rgbVersHex(analogueHarmony.rgb3));

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
              backgroundColor: rgbVersHex(rgb),
              borderColor: rgbVersHex(opposite(rgb)),
            }}
          ></div>
        </div>
        <div className="bottom-tips">
          <div
            className="tip"
            style={{
              backgroundColor: hex2,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(lightness),
              textShadow: `0 0 5px ${rgbVersHex(opposite(lightness))}`,
            }}
          >
            {hex2.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex3,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(lightness),
              textShadow: `0 0 5px ${rgbVersHex(opposite(lightness))}`,
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
              backgroundColor: rgbVersHex(rgb),
              borderColor: rgbVersHex(opposite(rgb)),
            }}
          ></div>
        </div>
        <div className="bottom-tips">
          <div
            className="tip"
            style={{
              backgroundColor: hex4,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(lightness),
              textShadow: `0 0 5px ${rgbVersHex(opposite(lightness))}`,
            }}
          >
            {hex4.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex5,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(lightness),
              textShadow: `0 0 5px ${rgbVersHex(opposite(lightness))}`,
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
              backgroundColor: rgbVersHex(rgb),
              borderColor: rgbVersHex(opposite(rgb)),
            }}
          ></div>
        </div>
        <div className="bottom-tips">
          <div
            className="tip"
            style={{
              backgroundColor: hex6,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(lightness),
              textShadow: `0 0 5px ${rgbVersHex(opposite(lightness))}`,
            }}
          >
            {hex6.toUpperCase()}
          </div>
          <div
            className="tip"
            style={{
              backgroundColor: hex7,
              borderColor: rgbVersHex(opposite(rgb)),
              color: rgbVersHex(lightness),
              textShadow: `0 0 5px ${rgbVersHex(opposite(lightness))}`,
            }}
          >
            {hex7.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriangularHarmonies;
