import { useState, useEffect } from "react";
import "./App.css";
import ColorInputs from "./components/colorInputs/ColorInputs";
import funcs from "../utilities/complementaries";
import ColorTriangles from "./components/colorTriangles/colorTriangles";
function App() {
  //states définisant les couleurs
  const [rgb, setRgb] = useState([0, 0, 0]);
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });
  const [hex, setHex] = useState("#000000");
  const [hsv, setHsv] = useState({ h: 0, s: 0, v: 0 });
  const [oppositeColor, setOppositeColor] = useState([255, 255, 255]);
  //useEffect pour mettre à jour la couleur opposée
  useEffect(() => {
    // console.log(funcs.Opposite(rgb));
    setOppositeColor(funcs.rgbVersHex(funcs.Opposite(rgb)));
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
        <ColorTriangles color1="red" color2="blue" color3="green" />
      </main>
    </>
  );
}

export default App;
