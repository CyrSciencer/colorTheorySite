import React from "react";
import handleChanges from "../../../utilities/handleChanges";
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
  return (
    <>
      <div className="rgb-input" style={{ borderColor: oppositeColor }}>
        <label htmlFor="r" style={{ color: oppositeColor }}>
          R
        </label>
        <input
          id="r"
          type="text"
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
          maxLength="3"
        />
        <label htmlFor="g" style={{ color: oppositeColor }}>
          G
        </label>
        <input
          id="g"
          type="text"
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
          maxLength="3"
        />
        <label htmlFor="b" style={{ color: oppositeColor }}>
          B
        </label>
        <input
          id="b"
          type="text"
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
          maxLength="3"
        />
      </div>
      <div className="hsl-input" style={{ borderColor: oppositeColor }}>
        <label htmlFor="h-hsl" style={{ color: oppositeColor }}>
          H
        </label>
        <input
          id="h-hsl"
          type="text"
          value={Math.round(hsl.h) + "°"}
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
          S
        </label>
        <input
          id="s-hsl"
          type="text"
          value={Math.round(hsl.s * 100) + "%"}
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
          L
        </label>
        <input
          id="l-hsl"
          type="text"
          value={Math.round(hsl.l * 100) + "%"}
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
          H
        </label>
        <input
          id="h-hsv"
          type="text"
          value={Math.round(hsv.h) + "°"}
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
          S
        </label>
        <input
          id="s-hsv"
          type="text"
          value={Math.round(hsv.s * 2 * 100) + "%"}
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
          V
        </label>
        <input
          id="v-hsv"
          type="text"
          value={Math.round(hsv.v * 100) + "%"}
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
      <div className="hex-input" style={{ borderColor: oppositeColor }}>
        <label htmlFor="hex" style={{ color: oppositeColor }}>
          Hex
        </label>
        <input
          id="hex"
          type="text"
          value={hex}
          onChange={(e) =>
            handleHexChange(e.target.value, setRgb, setHsl, setHex, setHsv)
          }
          maxLength="7"
        />
      </div>
    </>
  );
};

export default ColorInputs;
