import { useState } from "react";
import funcs from "../utilities/complementaries";
import "./App.css";

function App() {
  const [rgb, setRgb] = useState([0, 0, 0]);
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });
  const [hex, setHex] = useState("#000000");
  const [hsv, setHsv] = useState({ h: 0, s: 0, v: 0 });
  const { rgbToHsl, hslToRgb, rgbVersHex, HexVersRGB, hslToHsv, hsvToHsl } =
    funcs;

  const handleRgbChange = (index, value) => {
    const newRgb = [...rgb];
    // Basic validation: Ensure value is a number and within range 0-255
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 255) {
      newRgb[index] = numValue;
    } else if (value === "") {
      newRgb[index] = 0; // Or handle empty input as 0
    } else {
      // Optionally handle invalid input, maybe revert or keep old value
      // For now, let's just ignore invalid non-empty input
      return;
    }

    setRgb(newRgb);
    const newHsl = rgbToHsl(newRgb);
    setHsl(newHsl);
    const newHex = rgbVersHex(newRgb);
    setHex(newHex);
    const newHsv = hslToHsv(newHsl);
    setHsv(newHsv);
  };

  const handleHslChange = (key, value) => {
    const newHsl = { ...hsl };
    // Basic validation for HSL (adjust ranges as needed)
    const rawValue = value; // Rename for clarity
    if (rawValue === "") {
      newHsl[key] = key === "h" ? 0 : 0; // Handle empty input
    } else {
      const numValue = parseFloat(rawValue);
      if (!isNaN(numValue)) {
        if (key === "h" && numValue >= 0 && numValue <= 360) {
          newHsl[key] = numValue;
        } else if (
          (key === "s" || key === "l") &&
          numValue >= 0 &&
          numValue <= 100
        ) {
          newHsl[key] = numValue;
        } else {
          return; // Ignore out-of-range input
        }
      } else {
        return; // Ignore invalid non-numeric input
      }
    }

    setHsl(newHsl);
    const newRgb = hslToRgb(newHsl);
    setRgb(newRgb);
    const newHex = rgbVersHex(newRgb);
    setHex(newHex);
    const newHsv = hslToHsv(newHsl);
    setHsv(newHsv);
  };

  const handleHexChange = (value) => {
    // Basic validation for HEX format (e.g., # followed by 6 hex chars)
    // More robust validation might be needed
    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
      setHex(value);
      if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        const newRgb = HexVersRGB(value);
        setRgb(newRgb);
        const newHsl = rgbToHsl(newRgb);
        setHsl(newHsl);
        const newHsv = hslToHsv(newHsl);
        setHsv(newHsv);
      }
    }
    // else: ignore invalid input while typing or keep old value
  };

  const handleHsvChange = (key, value) => {
    const newHsv = { ...hsv };
    const rawValue = value; // Rename for clarity
    if (rawValue === "") {
      newHsv[key] = key === "h" ? 0 : 0; // Handle empty input
    } else {
      const numValue = parseFloat(rawValue);
      if (!isNaN(numValue)) {
        if (key === "h" && numValue >= 0 && numValue <= 360) {
          newHsv[key] = numValue;
        } else if (
          (key === "s" || key === "v") &&
          numValue >= 0 &&
          numValue <= 100
        ) {
          newHsv[key] = numValue;
        } else {
          return; // Ignore out-of-range input
        }
      } else {
        return; // Ignore invalid non-numeric input
      }
    }

    setHsv(newHsv);
    const newHsl = hsvToHsl(newHsv);
    setHsl(newHsl);
    const newRgb = hslToRgb(newHsl);
    setRgb(newRgb);
    const newHex = rgbVersHex(newRgb);
    setHex(newHex);
  };

  return (
    <>
      <section>
        <div className="rgb-input">
          <label htmlFor="r">R</label>
          <input
            id="r"
            type="text" // Consider type="number" with min/max for better UX
            value={rgb[0]}
            onChange={(e) => handleRgbChange(0, e.target.value)}
            maxLength="3"
          />
          <label htmlFor="g">G</label>
          <input
            id="g"
            type="text"
            value={rgb[1]}
            onChange={(e) => handleRgbChange(1, e.target.value)}
            maxLength="3"
          />
          <label htmlFor="b">B</label>
          <input
            id="b"
            type="text"
            value={rgb[2]}
            onChange={(e) => handleRgbChange(2, e.target.value)}
            maxLength="3"
          />
        </div>
        <div className="hsl-input">
          <label htmlFor="h">H</label>
          <input
            id="h"
            type="text" // Consider type="number"
            value={hsl.h}
            onChange={(e) => handleHslChange("h", e.target.value)}
          />
          <label htmlFor="s">S</label>
          <input
            id="s"
            type="text" // Consider type="number"
            value={parseFloat(hsl.s) ?? 0} // Display numeric part, default to 0
            onChange={(e) => handleHslChange("s", e.target.value)} // Pass raw value
          />
          <span>%</span>
          <label htmlFor="l">L</label>
          <input
            id="l"
            type="text" // Consider type="number"
            value={parseFloat(hsl.l) ?? 0} // Display numeric part, default to 0
            onChange={(e) => handleHslChange("l", e.target.value)} // Pass raw value
          />
          <span>%</span>
        </div>
        <div className="hsv-input">
          <label htmlFor="h">H</label>
          <input
            id="h"
            type="text" // Consider type="number"
            value={hsv.h}
            onChange={(e) => handleHsvChange("h", e.target.value)}
          />
          <label htmlFor="s">S</label>
          <input
            id="s"
            type="text" // Consider type="number"
            value={parseFloat(hsv.s) ?? 0} // Display numeric part, default to 0
            onChange={(e) => handleHsvChange("s", e.target.value)} // Pass raw value
          />
          <span>%</span>
          <label htmlFor="v">V</label>
          <input
            id="v"
            type="text" // Consider type="number"
            value={parseFloat(hsv.v) ?? 0} // Display numeric part, default to 0
            onChange={(e) => handleHsvChange("v", e.target.value)} // Pass raw value
          />
          <span>%</span>
        </div>
        <div className="hex-input">
          <label htmlFor="hex">Hex</label>
          <input
            id="hex"
            type="text"
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            maxLength="7"
          />
        </div>
        {/* Removed Convert button */}
      </section>
    </>
  );
}

export default App;
