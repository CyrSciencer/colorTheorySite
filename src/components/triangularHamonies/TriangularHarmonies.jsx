import "./triangularHarmonies.css";
import colorManagementFuncs from "../../utilities/complementaries";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import { useState, useEffect } from "react";
import adjComplementaryHarmony from "../../assets/svg/harmonie-adj-complémentaire.svg";
import analoguousHarmony from "../../assets/svg/harmonie-analogues.svg";
import triadHarmony from "../../assets/svg/harmonie-triadiques.svg";
import { writeToClipboard } from "../../utilities/clipboardUtils";
import { useFeedback } from "../../contexts/FeedbackContext.jsx";

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
  const { showFeedback } = useFeedback();

  const equilateralHarmony = triangleHarmony(rgb);
  const siblingOfComplementaryHarmony = siblingOfComplementary(rgb);
  const analogueHarmony = analogue(rgb);
  console.log({ equilateralHarmony, siblingOfComplementaryHarmony });

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

  const createTipElement = (hexValue) => {
    if (!hexValue) return null;
    return (
      <div
        className="tip"
        style={{
          backgroundColor: hexValue,
          color: rgbToHex(contrastColorRgb),
          textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
        }}
        onClick={() => handleHexCopy(hexValue)}
      >
        {hexValue.toUpperCase()}
      </div>
    );
  };

  const topTip = (
    <div
      className="tip"
      style={{
        backgroundColor: rgbToHex(rgb),
      }}
    ></div>
  );

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
        <div className="top-tip">{topTip}</div>
        <div className="bottom-tips">
          {createTipElement(hex2)}
          {createTipElement(hex3)}
        </div>
      </div>

      <div className="isosceles-triangle">
        <img src={adjComplementaryHarmony} alt="adjComplementary" />
        <div className="top-tip">{topTip}</div>
        <div className="bottom-tips">
          {createTipElement(hex4)}
          {createTipElement(hex5)}
        </div>
      </div>
      <div className="analogue-triangle">
        <img src={analoguousHarmony} alt="analogue" />
        <div className="top-tip">{topTip}</div>
        <div className="bottom-tips">
          {createTipElement(hex7)}
          {createTipElement(hex6)}
        </div>
      </div>
    </div>
  );
};

export default TriangularHarmonies;
