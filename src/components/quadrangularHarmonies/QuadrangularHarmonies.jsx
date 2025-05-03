import "./quadrangularHarmonies.css";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import colorManagementFuncs from "../../utilities/complementaries";
import { useState, useEffect } from "react";
import tetradHarmony from "../../assets/svg/harmonie-tetradiques.svg";
import pureSquareHarmony from "../../assets/svg/harmonie-carré.svg";
import { writeToClipboard } from "../../utilities/clipboardUtils";
import { useFeedback } from "../../contexts/FeedbackContext.jsx";

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

  const baseColorTip = (
    <div
      className="tip"
      style={{
        backgroundColor: rgbToHex(rgb),
        color: rgbToHex(contrastColorRgb),
        textShadow: `0 0 5px ${rgbToHex(opposite(contrastColorRgb))}`,
      }}
    ></div>
  );

  return (
    <div className="quadrangular-harmonies">
      <div className="tetrad-harmony">
        <img src={tetradHarmony} alt="tetradHarmony" />
        <div className="tips">
          {baseColorTip}
          {createTipElement(hex2)}
          {createTipElement(hex5)}
          {createTipElement(hex7)}
        </div>
      </div>
      <div className="pure-square-harmony">
        <img src={pureSquareHarmony} alt="pureSquareHarmony" />
        <div className="tips">
          {baseColorTip}
          {createTipElement(hex2)}
          {createTipElement(hex3)}
          {createTipElement(hex4)}
        </div>
      </div>
      <div className="tetrad-harmony">
        <img
          src={tetradHarmony}
          alt="tetradHarmony"
          className="quadrangularShifted"
        />
        <div className="tips">
          {baseColorTip}
          {createTipElement(hex2)}
          {createTipElement(hex6)}
          {createTipElement(hex8)}
        </div>
      </div>
    </div>
  );
};
export default QuadrangularHarmonies;
