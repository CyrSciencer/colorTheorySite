import React, { useState } from "react";
import ColorMixer from "./ColorMixer";
import HexInput from "../hexInput/HexInput";
import colorManagementFuncs from "../../utilities/complementaries";
import InformationTranslationFuncs from "../../utilities/InformationTranslation";
import "./colorMixer.css";
import PopupTextBlock from "../popUp/PopupTextBlock";
const { opposite } = colorManagementFuncs;
const { rgbToHex, hexToRgb } = InformationTranslationFuncs;

// Re-use the PopupWrapper helper component
const PopupWrapper = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const triggerElement = React.cloneElement(children, {
    onClick: open,
    style: { ...children.props.style, cursor: "pointer" },
  });

  return (
    <>
      {triggerElement}
      <PopupTextBlock
        isOpen={isOpen}
        onClose={close}
        title={title}
        content={<p>Information sur "{title}"</p>}
      />
    </>
  );
};

const MultipleColorMixing = () => {
  const [hex1, setHex1] = useState("#CD3232");
  const [hex2, setHex2] = useState("#3232CD");
  const [hex3, setHex3] = useState("#CDCD32");
  const [mixedColor1, setMixedColor1] = useState("#000000");
  const [mixedColor2, setMixedColor2] = useState("#000000");
  const [mixedColor3, setMixedColor3] = useState("#000000");
  const [mixedColor4, setMixedColor4] = useState("#000000");
  const [mixedColor5, setMixedColor5] = useState("#000000");
  const [mixedColor6, setMixedColor6] = useState("#000000");
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const rgb3 = hexToRgb(hex3);
  return (
    <div className="multiple-color-mixing-container">
      <PopupWrapper title="Mélange de 3 couleurs">
        <h2>Mélange de 3 couleurs</h2>
      </PopupWrapper>
      <div className="inputs-container">
        <HexInput
          hex={hex1}
          setHex={setHex1}
          contrastColor={rgbToHex(opposite(rgb1))}
          title="Couleur A"
        />
        <HexInput
          hex={hex2}
          setHex={setHex2}
          contrastColor={rgbToHex(opposite(rgb2))}
          title="Couleur B"
        />
        <HexInput
          hex={hex3}
          setHex={setHex3}
          contrastColor={rgbToHex(opposite(rgb3))}
          title="Couleur C"
        />
      </div>
      <div>
        <ColorMixer
          hex1={hex1}
          hex2={hex2}
          mixedColor={mixedColor1}
          setMixedColor={setMixedColor1}
        />
        <ColorMixer
          hex1={hex2}
          hex2={hex3}
          mixedColor={mixedColor2}
          setMixedColor={setMixedColor2}
        />
        <ColorMixer
          hex1={hex3}
          hex2={hex1}
          mixedColor={mixedColor3}
          setMixedColor={setMixedColor3}
        />
      </div>
      <div>
        <ColorMixer
          hex1={mixedColor1}
          hex2={hex3}
          mixedColor={mixedColor4}
          setMixedColor={setMixedColor4}
        />
        <ColorMixer
          hex1={mixedColor2}
          hex2={hex1}
          mixedColor={mixedColor5}
          setMixedColor={setMixedColor5}
        />
        <ColorMixer
          hex1={mixedColor3}
          hex2={hex2}
          mixedColor={mixedColor6}
          setMixedColor={setMixedColor6}
        />
      </div>
    </div>
  );
};

export default MultipleColorMixing;
