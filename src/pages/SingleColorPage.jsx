import { useState, useEffect } from "react";
import "./SingleColorPage.css"; // Import page-specific CSS
import ColorInputs from "../components/colorInputs/ColorInputs"; // Adjust path
import colorManagementFuncs from "../utilities/complementaries"; // Corrected path
import InformationTranslationFuncs from "../utilities/InformationTranslation"; // Corrected path
import ColorTriangles from "../components/colorTriangles/ColorTriangles"; // Adjust path
import SquareComposition from "../components/squareComposition/SquareComposition"; // Adjust path
import CompositionHarmony from "../components/compositionHarmony/CompositionHarmony"; // Adjust path
import TriangularHarmonies from "../components/triangularHamonies/TriangularHarmonies"; // Adjust path
import QuadrangularHarmonies from "../components/quadrangularHarmonies/QuadrangularHarmonies.jsx"; // Adjust path
import Temperatures from "../components/Temperatures/Temperatures"; // Adjust path
import ColorGradients from "../components/gradients/ColorGradients"; // Adjust path
import SquareHarmonyComposition from "../components/compositionHarmony/SquareHarmonyComposition"; // Adjust path
import TriangleHarmonyComposition from "../components/compositionHarmony/TriangleHarmonyComposition"; // Adjust path
import { Link } from "react-router-dom";
import useClipboardWithFeedback from "../utilities/useClipboardWithFeedback.jsx"; // Import the hook
import React from "react";
import PopupWrapper from "../utilities/PopupWrapper"; // Import shared component
import {
  TrianglesComparatifs,
  CarrésDeContrasteSimultané,
  HarmoniesTriadique,
  HarmoniesTétradique,
  TensionEtEquilibre,
  températureOpposée,
  Gradients,
} from "../utilities/ContentPopUpText"; // Import content constants

function SingleColorPage() {
  // Renamed from App
  //states définisant les couleurs
  const [rgb, setRgb] = useState([15, 51, 128]);
  const [hsl, setHsl] = useState({ h: 221, s: 0.79, l: 0.28 });
  const [hex, setHex] = useState("#0F3380");
  const [hsv, setHsv] = useState({ h: 221, s: 0.88, v: 0.5 });
  const [oppositeColorHex, setOppositeColorHex] = useState("#FFFFFF");
  const [complementaryColorHex, setComplementaryColorHex] = useState("#FFFFFF");
  const [contrastColorRgb, setContrastColorRgb] = useState([255, 255, 255]);
  const { rgbToHex, getContrastingTextColorRgb } = InformationTranslationFuncs;
  const { complementary, opposite } = colorManagementFuncs;
  const copyWithFeedback = useClipboardWithFeedback(); // Use the hook
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  useEffect(() => {
    // console.log(funcs.opposite(rgb));
    setOppositeColorHex(rgbToHex(opposite(rgb)));
    setComplementaryColorHex(rgbToHex(complementary(rgb)));

    // Use the utility function to calculate contrast color
    setContrastColorRgb(getContrastingTextColorRgb(rgb));
  }, [rgb, rgbToHex, opposite, complementary, getContrastingTextColorRgb]);

  return (
    <div className="single-color-page-layout">
      <header
        style={{ backgroundColor: hex, borderBottomColor: oppositeColorHex }}
      >
        <h1 style={{ backgroundColor: oppositeColorHex, color: hex }}>
          Analyse chromatique
        </h1>
        <Link to="/">
          <button>Accueil</button>
        </Link>
        <div className="color-inputs">
          <ColorInputs
            rgb={rgb}
            setRgb={setRgb}
            hsl={hsl}
            setHsl={setHsl}
            hex={hex}
            setHex={setHex}
            hsv={hsv}
            setHsv={setHsv}
            oppositeColor={oppositeColorHex}
          />
        </div>
      </header>
      <main className="single-color-page-main">
        <div className="content-section triangles-section">
          <PopupWrapper
            title="Triangles comparatifs"
            content={TrianglesComparatifs}
          >
            <h2>Triangles comparatifs</h2>
          </PopupWrapper>
          <ColorTriangles hex={hex} />
        </div>
        <div className="square-composition-container">
          <PopupWrapper
            title="Carrés de contraste simultané"
            content={CarrésDeContrasteSimultané}
          >
            <h2>Carrés de contraste simultané</h2>
          </PopupWrapper>
          <h3>
            Couleur complémentaire:
            <span
              className="complementary-color-display"
              style={{
                /* Style to make it look like a chip */
                padding: "2px 6px",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: "8px",
                /* Original styles */
                color: rgbToHex(contrastColorRgb),
                textShadow: `0 1px 2px ${rgbToHex(
                  contrastColorRgb
                )} , 0 -1px 2px ${rgbToHex(opposite(contrastColorRgb))} `,
                backgroundColor: complementaryColorHex,
              }}
              onClick={() => copyWithFeedback(complementaryColorHex)}
            >
              <span
                className="clickable-hex-inline"
                style={{
                  backgroundColor: complementaryColorHex,
                  padding: "2px 6px",
                  borderRadius: "4px",
                }}
              >
                {complementaryColorHex.toUpperCase()}
              </span>
            </span>
          </h3>
          <div>
            <div className="square-composition-row">
              <SquareComposition innerColor={hex} outerColor="#000000" />
              <SquareComposition innerColor="#000000" outerColor={hex} />

              <SquareComposition innerColor={hex} outerColor="#949494" />
              <SquareComposition innerColor="#949494" outerColor={hex} />
            </div>

            <div className="square-composition-row">
              <SquareComposition
                innerColor={hex}
                outerColor={complementaryColorHex}
              />
              <SquareComposition
                innerColor={complementaryColorHex}
                outerColor={hex}
              />
              <SquareComposition innerColor={hex} outerColor="#ffffff" />
              <SquareComposition innerColor="#ffffff" outerColor={hex} />
            </div>
          </div>
        </div>

        <div className="three-hue-harmonies">
          <PopupWrapper
            title="Harmonies triadique"
            content={HarmoniesTriadique}
          >
            <h2>Harmonies triadique</h2>
          </PopupWrapper>
          <div className="three-hue-harmonies-container">
            <TriangularHarmonies
              rgb={rgb}
              contrastColorRgb={contrastColorRgb}
            />
          </div>
        </div>
        <div className="four-hue-harmonies">
          <PopupWrapper
            title="Harmonies tétradique"
            content={HarmoniesTétradique}
          >
            <h2>Harmonies tétradique</h2>
          </PopupWrapper>
          <div className="four-hue-harmonies-container">
            <QuadrangularHarmonies
              rgb={rgb}
              contrastColorRgb={contrastColorRgb}
            />
          </div>
        </div>
        <div className="composition-harmony">
          <PopupWrapper
            title="Tension et équilibre entre les pôles de luminosité"
            content={TensionEtEquilibre}
          >
            <h2>Tension et équilibre entre les pôles de luminosité</h2>
          </PopupWrapper>
          <div className="composition-harmony-container">
            <CompositionHarmony hsl={hsl} />
            <SquareHarmonyComposition hsl={hsl} />
            <TriangleHarmonyComposition hsl={hsl} />
          </div>
        </div>
        <div className="opposite-temperature">
          <PopupWrapper
            title="Set de couleurs de température opposée"
            content={températureOpposée}
          >
            <h2>Set de couleurs de températures opposée</h2>
          </PopupWrapper>
          <div className="opposite-temperature-container">
            <Temperatures rgb={rgb} contrastColorRgb={contrastColorRgb} />
          </div>
        </div>
        <div className="gradient">
          <PopupWrapper title="Gradients" content={Gradients}>
            <h2>Gradients</h2>
          </PopupWrapper>
          <span>gradient 1 vers le complémentaire</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={0} />
          <span>gradient 2 vers le complémentaire</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={1} />
          <span>gradient 1 vers l'opposée</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={7} />
          <span>gradient 2 vers l'opposée</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={8} />
          <span>gradient vers l'opposée passant par le gris</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={6} />
          <span>gradient de luminosité</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={2} />
          <span>gradient de saturation</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={5} />
          <span>gradient 1 vers le moins saturé</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={3} />
          <span>gradient 2 vers le moins saturé</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={4} />
        </div>
      </main>
    </div>
  );
}

export default SingleColorPage; // Export the renamed component
