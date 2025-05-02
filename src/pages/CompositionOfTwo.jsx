import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HexInput from "../components/hexInput/HexInput";
import ColorMixer from "../components/colorMixer/ColorMixer";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import colorManagementFuncs from "../../utilities/complementaries";
import RatioSection from "../components/compositionHarmony/RatioSection";
import ColorGradients from "../components/gradients/ColorGradients";
import "./CompositionOfTwo.css";
const { rgbToHex, hexToRgb, rgbToHsl, contrast } = InformationTranslationFuncs;

const CompositionOfTwo = () => {
  const [hex1, setHex1] = useState("#FF0000");
  const [hex2, setHex2] = useState("#0000FF");
  const [rgb1, setRgb1] = useState([255, 0, 0]);
  const [rgb2, setRgb2] = useState([0, 0, 255]);
  const [rgb3, setRgb3] = useState([0, 0, 0]);

  const [contrastColorRgb1, setContrastColorRgb1] = useState([255, 255, 255]);
  const [contrastColorRgb2, setContrastColorRgb2] = useState([255, 255, 255]);
  const [oppositeLightness1, setOppositeLightness1] = useState("#FFFFFF");
  const [oppositeLightness2, setOppositeLightness2] = useState("#FFFFFF");
  const [mixedColor, setMixedColor] = useState("#FF00FF");
  const [mixedColorDataArray, setMixedColorDataArray] = useState([]);
  useEffect(() => {
    setRgb1(hexToRgb(hex1));
    setRgb2(hexToRgb(hex2));
    const mixedRgb = hexToRgb(mixedColor);
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
    const mixedHsl = rgbToHsl(mixedRgb);
    const mixedContrast = contrast(mixedHsl);
    const rgb1Hsl = rgbToHsl(rgb1);
    const rgb2Hsl = rgbToHsl(rgb2);
    const contrast1 = contrast(rgb1Hsl);
    const contrast2 = contrast(rgb2Hsl);
    setRgb3(mixedRgb);
    //creation de l'array de couleurs
    const mixedColorDataArray = [
      {
        name: "Mixed Color",
        rgbValue: mixedRgb,
        contrastInfo: mixedContrast,
      },
      {
        name: "Color 1",
        rgbValue: rgb1,
        contrastInfo: contrast1,
      },
      {
        name: "Color 2",
        rgbValue: rgb2,
        contrastInfo: contrast2,
      },
    ];
    setMixedColorDataArray(mixedColorDataArray);
  }, [hex1, hex2, mixedColor]);

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
            contrastColor={oppositeLightness1}
            title="Color 1"
          />
          <HexInput
            hex={hex2}
            setHex={setHex2}
            contrastColor={oppositeLightness2}
            title="Color 2"
          />
        </div>
      </header>
      <main>
        <div className="container-mix">
          <ColorMixer
            hex1={hex1}
            hex2={hex2}
            mixedColor={mixedColor}
            setMixedColor={setMixedColor}
          />
        </div>
        <div className="container-ratios">
          <RatioSection
            title="Light Ratio Harmony"
            ratioKey="lightRatioHarmony" // Pass the key for the light ratio
            colorDataArray={mixedColorDataArray}
            rgbVersHex={rgbToHex} // Pass the conversion function
          />
          <RatioSection
            title="Dark Ratio Harmony"
            ratioKey="darkRatioHarmony" // Pass the key for the dark ratio
            colorDataArray={mixedColorDataArray}
            rgbVersHex={rgbToHex} // Pass the conversion function
          />
        </div>
        <div className="container-gradients">
          <ColorGradients rgb={rgb1} gradientTypeIndex={1} />
          <ColorGradients rgb={rgb1} gradientTypeIndex={2} />
          <ColorGradients rgb={rgb3} gradientTypeIndex={1} />
          <ColorGradients rgb={rgb3} gradientTypeIndex={2} />
          <ColorGradients rgb={rgb2} gradientTypeIndex={1} />
          <ColorGradients rgb={rgb2} gradientTypeIndex={2} />
        </div>
      </main>
    </div>
  );
};

export default CompositionOfTwo;
