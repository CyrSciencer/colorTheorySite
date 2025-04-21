import colorManagementFuncs from "../../../utilities/complementaries";
import InformationTranslationFuncs from "../../../utilities/InformationTranslation.js";
import { useState, useEffect } from "react";
import "./triangularHarmonies.css";
const TriangularHarmonies = ({ rgb }) => {
  const [hex2, setHex2] = useState("");
  const [hex3, setHex3] = useState("");
  const [hex4, setHex4] = useState("");
  const [hex5, setHex5] = useState("");
  const { rgbVersHex } = InformationTranslationFuncs;
  const { triangleHarmony, siblingOfComplementary, opposite } =
    colorManagementFuncs;
  const equilateralHarmony = triangleHarmony(rgb);
  const siblingOfComplementaryHarmony = siblingOfComplementary(rgb);
  console.log({ equilateralHarmony, siblingOfComplementaryHarmony });
  useEffect(() => {
    setHex2(rgbVersHex(equilateralHarmony.rgb2));
    setHex3(rgbVersHex(equilateralHarmony.rgb3));
    setHex4(rgbVersHex(siblingOfComplementaryHarmony.rgb2));
    setHex5(rgbVersHex(siblingOfComplementaryHarmony.rgb3));
    console.log({ hex2, hex3, hex4, hex5 });
  }, [rgb]);
  return (
    <div className="triangular-harmonies">
      <div>
        <div className="equilateral-triangle">
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
              }}
            ></div>
            <div
              className="tip"
              style={{
                backgroundColor: hex3,
                borderColor: rgbVersHex(opposite(rgb)),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div>
        <div className="isosceles-triangle">
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
              }}
            ></div>
            <div
              className="tip"
              style={{
                backgroundColor: hex5,
                borderColor: rgbVersHex(opposite(rgb)),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriangularHarmonies;
