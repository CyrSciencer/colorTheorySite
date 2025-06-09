import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HexInput from "../components/hexInput/HexInput";
import ColorMixer from "../components/colorMixer/ColorMixer";
import InformationTranslationFuncs from "../utilities/InformationTranslation";
import SquareComposition from "../components/squareComposition/SquareComposition";
import RatioSection from "../components/compositionHarmony/RatioSection";
import ColorGradients from "../components/gradients/ColorGradients";
import "./CompositionOfTwo.css";

import PopupWrapper from "../utilities/PopupWrapper";
import {
  MélangeDeCouleurs,
  HarmoniesDeRatio,
  GradientsVersLesCouleursComplémentaires,
} from "../utilities/ContentPopUpText";

const { rgbToHex, hexToRgb, rgbToHsl, contrast, getContrastingTextColorRgb } =
  InformationTranslationFuncs;

const CompositionOfTwo = () => {
  const [hex1, setHex1] = useState("#FF0000");
  const [hex2, setHex2] = useState("#0000FF");
  const [rgb1, setRgb1] = useState([255, 0, 0]);
  const [rgb2, setRgb2] = useState([0, 0, 255]);
  const [rgb3, setRgb3] = useState([0, 0, 0]);

  const [contrastColorHex1, setContrastColorHex1] = useState("#FFFFFF");
  const [contrastColorHex2, setContrastColorHex2] = useState("#FFFFFF");
  const [mixedColor, setMixedColor] = useState("#FF00FF");
  const [mixedColorDataArray, setMixedColorDataArray] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  useEffect(() => {
    const currentRgb1 = hexToRgb(hex1);
    const currentRgb2 = hexToRgb(hex2);
    const mixedRgb = hexToRgb(mixedColor);
    setRgb1(currentRgb1);
    setRgb2(currentRgb2);
    setRgb3(mixedRgb);

    const contrastRgb1 = getContrastingTextColorRgb(currentRgb1);
    const contrastRgb2 = getContrastingTextColorRgb(currentRgb2);
    setContrastColorHex1(rgbToHex(contrastRgb1));
    setContrastColorHex2(rgbToHex(contrastRgb2));

    const mixedHsl = rgbToHsl(mixedRgb);
    const mixedContrast = contrast(mixedHsl);
    const rgb1Hsl = rgbToHsl(currentRgb1);
    const rgb2Hsl = rgbToHsl(currentRgb2);
    const contrast1 = contrast(rgb1Hsl);
    const contrast2 = contrast(rgb2Hsl);

    const newMixedColorDataArray = [
      { name: "Mixed Color", rgbValue: mixedRgb, contrastInfo: mixedContrast },
      { name: "Color 1", rgbValue: currentRgb1, contrastInfo: contrast1 },
      { name: "Color 2", rgbValue: currentRgb2, contrastInfo: contrast2 },
    ];
    setMixedColorDataArray(newMixedColorDataArray);
  }, [
    hex1,
    hex2,
    mixedColor,
    hexToRgb,
    rgbToHsl,
    contrast,
    getContrastingTextColorRgb,
    rgbToHex,
  ]);

  return (
    <div className="composition-of-two-page">
      <header
        style={{
          "--color-1": hex1,
          "--color-2": hex2,
          "--color-3": mixedColor,
        }}
      >
        <h1>Composition base bichrome</h1>
        <Link to="/">
          <button>Accueil</button>
        </Link>

        <p className="header-text">
          selectionnez 2 couleurs avec les selecteurs ci-dessous pour les
          comparer et les mélanger.
        </p>
        <div className="hex-inputs-container">
          <SquareComposition innerColor={hex2} outerColor={hex1} />
          <HexInput
            hex={hex1}
            setHex={setHex1}
            contrastColor={contrastColorHex1}
            title="Couleur A"
          />
          <HexInput
            hex={hex2}
            setHex={setHex2}
            contrastColor={contrastColorHex2}
            title="Couleur B"
          />
          <SquareComposition innerColor={hex1} outerColor={hex2} />
        </div>
      </header>
      <main>
        <div className="content-section">
          <PopupWrapper title="Mélange de couleurs" content={MélangeDeCouleurs}>
            <h2>Mélange de couleurs</h2>
          </PopupWrapper>
          <div className="container-mix">
            <ColorMixer
              hex1={hex1}
              hex2={hex2}
              mixedColor={mixedColor}
              setMixedColor={setMixedColor}
            />
          </div>
        </div>
        <div className="content-section">
          <PopupWrapper title="Harmonies de ratio" content={HarmoniesDeRatio}>
            <h2>Harmonies de ratio</h2>
          </PopupWrapper>
          <div className="container-ratios">
            <div className="ratio-section-container">
              <RatioSection
                title="Harmonie de ratio lumière"
                ratioKey="lightRatioHarmony"
                colorDataArray={mixedColorDataArray}
              />
              <RatioSection
                title="Harmonie de ratio sombre"
                ratioKey="darkRatioHarmony"
                colorDataArray={mixedColorDataArray}
              />
            </div>
          </div>
        </div>
        <div className="content-section">
          <PopupWrapper
            title="Gradients vers les couleurs complémentaires"
            content={GradientsVersLesCouleursComplémentaires}
          >
            <h2>Gradients vers les couleurs complémentaires</h2>
          </PopupWrapper>
          <div className="container-gradients">
            <div
              className="gradient-sub-container"
              style={{ "--color-border": hex1 }}
            >
              <ColorGradients rgb={rgb1} gradientTypeIndex={0} />
              <h3>Couleur A</h3>
              <ColorGradients rgb={rgb1} gradientTypeIndex={1} />
            </div>
            <div
              className="gradient-sub-container"
              style={{ "--color-border": mixedColor }}
            >
              <ColorGradients rgb={rgb3} gradientTypeIndex={0} />
              <h3>Couleur mélangée</h3>
              <ColorGradients rgb={rgb3} gradientTypeIndex={1} />
            </div>
            <div
              className="gradient-sub-container"
              style={{ "--color-border": hex2 }}
            >
              <ColorGradients rgb={rgb2} gradientTypeIndex={0} />
              <h3>Couleur B</h3>
              <ColorGradients rgb={rgb2} gradientTypeIndex={1} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompositionOfTwo;
