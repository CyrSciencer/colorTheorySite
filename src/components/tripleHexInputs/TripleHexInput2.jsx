import React, { useState, useEffect } from "react";
import HexInput from "../hexInput/HexInput"; // Adjust path as needed
import RatioSection from "../compositionHarmony/RatioSection";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import SquareComposition from "../squareComposition/SquareComposition";
import BigSquareComposition from "../squareComposition/BigSquareComposition";
import "./tripleHexInput.css";
import PopupWrapper from "../../utilities/PopupWrapper"; // Import shared component
import { compositionRatio631 } from "../../utilities/ContentPopUpText";
const { rgbToHex, hexToRgb } = InformationTranslationFuncs;

const TripleHexInput2 = () => {
  const [hexA, setHexA] = useState("#CD3232"); // Different defaults
  const [hexB, setHexB] = useState("#3232CD");
  const [hexC, setHexC] = useState("#CDCD32");
  const [colorDataArray, setColorDataArray] = useState([]);
  useEffect(() => {
    setColorDataArray([
      {
        name: "main",
        contrastInfo: 6,
        rgbValue: hexToRgb(hexA),
      },
      {
        name: "secondary",
        contrastInfo: 3,
        rgbValue: hexToRgb(hexB),
      },
      {
        name: "tertiary",
        contrastInfo: 1,
        rgbValue: hexToRgb(hexC),
      },
    ]);
  }, [hexA, hexB, hexC]);
  return (
    <div className="triple-hex-input-two-container">
      <PopupWrapper
        title="Outil de composition ratio 6-3-1"
        content={compositionRatio631}
      >
        <h2>Outil de composition ratio 6-3-1</h2>
      </PopupWrapper>
      <div className="inputs-wrapper">
        <HexInput hex={hexA} setHex={setHexA} title="Color A" />
        <HexInput hex={hexB} setHex={setHexB} title="Color B" />
        <HexInput hex={hexC} setHex={setHexC} title="Color C" />
      </div>

      <RatioSection colorDataArray={colorDataArray} rgbVersHex={rgbToHex} />
      <div className="Square-container">
        <SquareComposition innerColor={hexB} outerColor={hexA} />
        <SquareComposition innerColor={hexC} outerColor={hexA} />
        <SquareComposition innerColor={hexC} outerColor={hexB} />
      </div>
      <BigSquareComposition main={hexA} secondary={hexB} tertiary={hexC} />
    </div>
  );
};

export default TripleHexInput2;
