import { useState, useEffect } from "react";
import "./App.css";
import ColorInputs from "./components/colorInputs/ColorInputs";
import colorManagementFuncs from "../utilities/complementaries";
import InformationTranslationFuncs from "../utilities/InformationTranslation.js";
import ColorTriangles from "./components/colorTriangles/ColorTriangles";
import SquareComposition from "./components/squareComposition/SquareComposition";
import CompositionHarmony from "./components/compositionHarmony/CompositionHarmony";
import TriangularHarmonies from "./components/triangularHamonies/TriangularHarmonies";
import QuadrangularHarmonies from "./components/quadrangularHarmonies/QuadrangularHarmonies.jsx";
import Temperatures from "./components/Temperatures/Temperatures";
import ColorGradients from "./components/gradients/ColorGradients";
import SquareHarmonyComposition from "./components/compositionHarmony/SquareHarmonyComposition";
import TriangleHarmonyComposition from "./components/compositionHarmony/TriangleHarmonyComposition";
function App() {
  //states définisant les couleurs
  const [rgb, setRgb] = useState([0, 0, 0]);
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });
  const [hex, setHex] = useState("#000000");
  const [hsv, setHsv] = useState({ h: 0, s: 0, v: 0 });
  const [oppositeColor, setoppositeColor] = useState([255, 255, 255]);
  const [complementaryColor, setComplementaryColor] = useState([255, 255, 255]);
  const [contrastColorRgb, setContrastColorRgb] = useState([255, 255, 255]);
  const { rgbVersHex } = InformationTranslationFuncs;
  const { opposite, complementary } = colorManagementFuncs;
  console.log({ hsl, hsv });
  //useEffect pour mettre à jour la couleur opposée
  // console.log({ complementaryColor });
  useEffect(() => {
    // console.log(funcs.opposite(rgb));
    setoppositeColor(rgbVersHex(opposite(rgb)));
    setComplementaryColor(rgbVersHex(complementary(rgb)));

    // Calculate contrast color (black or white) based on rgb brightness
    let checklightness = 0;
    rgb.map((val) => {
      checklightness += val;
    });
    checklightness > 382
      ? setContrastColorRgb([0, 0, 0]) // Set to black
      : setContrastColorRgb([255, 255, 255]); // Set to white
  }, [rgb]);
  return (
    <>
      <header
        style={{ backgroundColor: hex, borderBottomColor: oppositeColor }}
      >
        <h1 style={{ backgroundColor: oppositeColor, color: hex }}>
          Color Composition
        </h1>
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
            oppositeColor={oppositeColor}
          />
        </div>
      </header>
      <main>
        <div className="color-triangles-container">
          <h2>Color triangles</h2>
          <ColorTriangles hex={hex} />
        </div>
        <div className="square-composition-container">
          <h2>Composition squares</h2>
          <h3>
            Complementary color:
            <span
              style={{
                color: rgbVersHex(contrastColorRgb),
                textShadow: `0 1px 2px ${rgbVersHex(
                  opposite(contrastColorRgb)
                )} , 0 -1px 2px ${rgbVersHex(opposite(contrastColorRgb))} `,
                backgroundColor: rgbVersHex(complementary(rgb)),
              }}
            >
              {rgbVersHex(complementary(rgb)).toUpperCase()}
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
                outerColor={complementaryColor}
              />
              <SquareComposition
                innerColor={complementaryColor}
                outerColor={hex}
              />
              <SquareComposition innerColor={hex} outerColor="#ffffff" />
              <SquareComposition innerColor="#ffffff" outerColor={hex} />
            </div>
          </div>
        </div>

        <div className="three-hue-harmonies">
          <h2>Three hue harmonies</h2>
          <div className="three-hue-harmonies-container">
            <TriangularHarmonies
              rgb={rgb}
              contrastColorRgb={contrastColorRgb}
            />
          </div>
        </div>
        <div className="four-hue-harmonies">
          <h2>Four hue harmonies</h2>
          <div className="four-hue-harmonies-container">
            <QuadrangularHarmonies
              rgb={rgb}
              contrastColorRgb={contrastColorRgb}
            />
          </div>
        </div>
        <div className="opposite-temperature">
          <h2>Of opposite temperature</h2>
          <div className="opposite-temperature-container">
            <Temperatures rgb={rgb} contrastColorRgb={contrastColorRgb} />
          </div>
        </div>
        <div className="composition-harmony">
          <h2>Composition harmony</h2>
          <div className="composition-harmony-container">
            <CompositionHarmony hsl={hsl} />
            <SquareHarmonyComposition hsl={hsl} />
            <TriangleHarmonyComposition hsl={hsl} />
          </div>
        </div>
        <div className="gradient">
          <h2>Gradients</h2>
          <ColorGradients rgb={rgb} />
        </div>
      </main>
    </>
  );
}

export default App;
