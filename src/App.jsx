import { useState, useEffect } from "react";
import "./App.css";
import ColorInputs from "./components/colorInputs/ColorInputs";
import funcs from "../utilities/complementaries";
import ColorTriangles from "./components/colorTriangles/colorTriangles";
import SquareComposition from "./components/squareComposition/SquareComposition";
import CompositionHarmony from "./components/compositionHarmony/CompositionHarmony";
import TriangularHarmonies from "./components/triangularHamonies/TriangularHarmonies";
function App() {
  //states définisant les couleurs
  const [rgb, setRgb] = useState([0, 0, 0]);
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });
  const [hex, setHex] = useState("#000000");
  const [hsv, setHsv] = useState({ h: 0, s: 0, v: 0 });
  const [oppositeColor, setoppositeColor] = useState([255, 255, 255]);
  const [complementaryColor, setComplementaryColor] = useState([255, 255, 255]);
  //useEffect pour mettre à jour la couleur opposée
  // console.log({ complementaryColor });
  useEffect(() => {
    // console.log(funcs.opposite(rgb));
    setoppositeColor(funcs.rgbVersHex(funcs.opposite(rgb)));
    setComplementaryColor(funcs.rgbVersHex(funcs.complementary(rgb)));
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
          <div>
            <div className="square-composition-row">
              <SquareComposition innerColor={hex} outerColor="#000000" />
              <SquareComposition innerColor="#000000" outerColor={hex} />
              <SquareComposition innerColor={hex} outerColor="#ffffff" />
              <SquareComposition innerColor="#ffffff" outerColor={hex} />{" "}
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

              <SquareComposition innerColor={hex} outerColor="#949494" />
              <SquareComposition innerColor="#949494" outerColor={hex} />
            </div>
          </div>
        </div>
        {/* <div className="composition-harmony-container">
          <h2>Composition harmony</h2>
          <CompositionHarmony hsv={hsv} />
        </div> */}
        <div className="three-hue-harmonies">
          <h2>Three hue harmonies</h2>
          <div className="three-hue-harmonies-container">
            <TriangularHarmonies rgb={rgb} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
