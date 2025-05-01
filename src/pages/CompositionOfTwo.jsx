import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HexInput from "../components/hexInput/HexInput";
import ColorMixer from "../components/colorMixer/ColorMixer";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import colorManagementFuncs from "../../utilities/complementaries";

const { rgbToHex, hexToRgb } = InformationTranslationFuncs;
const { opposite } = colorManagementFuncs;

const CompositionOfTwo = () => {
  const [hex1, setHex1] = useState("#FF0000");
  const [hex2, setHex2] = useState("#0000FF");
  const [contrastColorRgb1, setContrastColorRgb1] = useState([255, 255, 255]);
  const [contrastColorRgb2, setContrastColorRgb2] = useState([255, 255, 255]);
  const [oppositeLightness1, setOppositeLightness1] = useState("#FFFFFF");
  const [oppositeLightness2, setOppositeLightness2] = useState("#FFFFFF");

  useEffect(() => {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    let checklightness1 = 0;
    let checklightness2 = 0;
    rgb1.map((val) => {
      checklightness1 += val;
    });
    rgb2.map((val) => {
      checklightness2 += val;
    });
    checklightness1 > 383
      ? setContrastColorRgb1([0, 0, 0]) // Set to black
      : setContrastColorRgb1([255, 255, 255]); // Set to white
    checklightness2 > 383
      ? setContrastColorRgb2([0, 0, 0]) // Set to black
      : setContrastColorRgb2([255, 255, 255]); // Set to white
    setOppositeLightness1(rgbToHex(contrastColorRgb1));
    setOppositeLightness2(rgbToHex(contrastColorRgb2));
  }, [hex1, hex2]);

  return (
    <div className="composition-of-two-page">
      <header>
        <h1>Composition of Two Colors</h1>
        <Link to="/">
          <button>HomePage</button>
        </Link>
        <div className="hex-inputs-container">
          <HexInput
            hex={hex1}
            setHex={setHex1}
            oppositeColor={oppositeLightness1}
            title="Color 1"
          />
          <HexInput
            hex={hex2}
            setHex={setHex2}
            oppositeColor={oppositeLightness2}
            title="Color 2"
          />
        </div>
      </header>
      <main>
        <ColorMixer hex1={hex1} hex2={hex2} />
      </main>
    </div>
  );
};

export default CompositionOfTwo;
