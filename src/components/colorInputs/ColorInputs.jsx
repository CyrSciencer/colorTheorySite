import React from "react";
import handleChanges from "../../utilities/handleChanges";
import "./colorInputs.css";
const ColorInputs = ({
  rgb,
  setRgb,
  hsl,
  setHsl,
  hex,
  setHex,
  hsv,
  setHsv,
  oppositeColor,
}) => {
  const { handleRgbChange, handleHslChange, handleHexChange, handleHsvChange } =
    handleChanges;
  console.log({ hsl, hsv });
  return (
    <>
      <div className="rgb-input" style={{ borderColor: oppositeColor }}>
        <label htmlFor="r" style={{ color: oppositeColor }}>
          <p>R</p>
          <p>{rgb[0]}</p>
        </label>
        <input
          id="r"
          type="range"
          min="0"
          max="255"
          value={rgb[0]}
          onChange={(e) =>
            handleRgbChange(
              0,
              e.target.value,
              rgb,
              setRgb,
              setHsl,
              setHex,
              setHsv
            )
          }
        />
        <label htmlFor="g" style={{ color: oppositeColor }}>
          <p>G</p>
          <p>{rgb[1]}</p>
        </label>
        <input
          id="g"
          type="range"
          min="0"
          max="255"
          value={rgb[1]}
          onChange={(e) =>
            handleRgbChange(
              1,
              e.target.value,
              rgb,
              setRgb,
              setHsl,
              setHex,
              setHsv
            )
          }
        />
        <label htmlFor="b" style={{ color: oppositeColor }}>
          <p>B</p>
          <p>{rgb[2]}</p>
        </label>
        <input
          id="b"
          type="range"
          min="0"
          max="255"
          value={rgb[2]}
          onChange={(e) =>
            handleRgbChange(
              2,
              e.target.value,
              rgb,
              setRgb,
              setHsl,
              setHex,
              setHsv
            )
          }
        />
      </div>
      <div className="hsl-input" style={{ borderColor: oppositeColor }}>
        <label htmlFor="h-hsl" style={{ color: oppositeColor }}>
          <p>H</p>
          <p>{hsl.h}</p>
        </label>
        <input
          id="h-hsl"
          type="range"
          min="0"
          max="360"
          step="1"
          value={hsl.h}
          onChange={(e) =>
            handleHslChange(
              "h",
              e.target.value,
              hsl,
              setRgb,
              setHsl,
              setHex,
              setHsv
            )
          }
        />
        <label htmlFor="s-hsl" style={{ color: oppositeColor }}>
          <p>S</p>
          <p>{Math.round(hsl.s * 100)}%</p>
        </label>
        <input
          id="s-hsl"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={hsl.s}
          onChange={(e) =>
            handleHslChange(
              "s",
              e.target.value,
              hsl,
              setRgb,
              setHsl,
              setHex,
              setHsv
            )
          }
        />
        <label htmlFor="l-hsl" style={{ color: oppositeColor }}>
          <p>L</p>
          <p>{Math.round(hsl.l * 100)}%</p>
        </label>
        <input
          id="l-hsl"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={hsl.l}
          onChange={(e) =>
            handleHslChange(
              "l",
              e.target.value,
              hsl,
              setRgb,
              setHsl,
              setHex,
              setHsv
            )
          }
        />
      </div>
      <div className="hsv-input" style={{ borderColor: oppositeColor }}>
        <label htmlFor="h-hsv" style={{ color: oppositeColor }}>
          <p>H</p>
          <p>{hsv.h}</p>
        </label>
        <input
          id="h-hsv"
          type="range"
          min="0"
          max="360"
          step="1"
          value={hsv.h}
          onChange={(e) =>
            handleHsvChange(
              "h",
              e.target.value,
              hsv,
              setRgb,
              setHsl,
              setHex,
              setHsv
            )
          }
        />
        <label htmlFor="s-hsv" style={{ color: oppositeColor }}>
          <p>S</p>
          <p>{Math.round(hsv.s * 100)}%</p>
        </label>
        <input
          id="s-hsv"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={hsv.s}
          onChange={(e) =>
            handleHsvChange(
              "s",
              e.target.value,
              hsv,
              setRgb,
              setHsl,
              setHex,
              setHsv
            )
          }
        />
        <label htmlFor="v-hsv" style={{ color: oppositeColor }}>
          <p>V</p>
          <p>{Math.round(hsv.v * 100)}%</p>
        </label>
        <input
          id="v-hsv"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={hsv.v}
          onChange={(e) =>
            handleHsvChange(
              "v",
              e.target.value,
              hsv,
              setRgb,
              setHsl,
              setHex,
              setHsv
            )
          }
        />
      </div>
      <div
        className="hex-input-container"
        style={{ borderColor: oppositeColor }}
      >
        <label htmlFor="hex" style={{ color: oppositeColor }}>
          Hex
        </label>
        <input
          id="hex"
          type="text"
          value={hex.toUpperCase()}
          onChange={(e) =>
            handleHexChange(e.target.value, setRgb, setHsl, setHex, setHsv)
          }
          maxLength="7"
          className="hex-input"
        />
      </div>
    </>
  );
};

export default ColorInputs;
