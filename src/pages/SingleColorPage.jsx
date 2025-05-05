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
import { writeToClipboard } from "../utilities/clipboardUtils"; // Import clipboard utility
import { useFeedback } from "../contexts/FeedbackContext.jsx"; // Import feedback context
import React from "react";
import PopupWrapper from "../utilities/PopupWrapper"; // Import shared component
const TrianglesComparatifs = (
  <p>
    Cette section présente des triangles ayant chaqu'un 3 couleurs, chaqune des
    triade représente un systeme de couleurs différent. la mise en contexte de
    la couleur sélectionnée dans chacun des triangles permet de mieux comprendre
    comment cette couleur peut intéragir visuellement avec les autres couleurs
    du triangle.
  </p>
);
const CarrésDeContrasteSimultané = (
  <p>
    Cette section présente 4 paires de carrés. chaque paires, de part la Loi du
    contraste simultané des couleurs, permet de mettre en context la couleur
    sélectionnée avec:
    <ul>
      <li>du noir</li>
      <li>du blanc</li>
      <li>un gris</li>
      <li>sa couleur complémentaire</li>
    </ul>
  </p>
);
const HarmoniesTriadique = (
  <p>
    Cette section présente les harmonies triadiques de la couleur sélectionnée:
    <ul>
      <li>
        gauche : Vrais triade, les couleurs forment un triangle equilateral sur
        la roue des couleurs.
      </li>
      <li>
        milieu : Complémentaire adjacent, les couleurs forment un triangle
        isocèle sur la roue des couleurs, les deux couleurs de la base sont
        analogues à la couleur complémentaire.
      </li>
      <li>
        droite : Analogues, les couleurs générées sont proches, à équidistance
        et de part et d'autre de la couleur sélectionnée.
      </li>
    </ul>
  </p>
);
const HarmoniesTétradique = (
  <p>
    Cette section présente les harmonies tétradiques de la couleur sélectionnée:
    <ul>
      <li>
        ( chaque tétrade est composée de 2 axes de couleurs complémentaires.)
      </li>
      <li>
        centre : Vrais tétrade, les couleurs forment un carré sur la roue des
        couleurs.
      </li>
      <li>
        gauche et droite : tétrade rectangulaire, les couleurs forment un
        rectangle sur la roue des couleurs, les deux réctangles sont positionné
        en mirroir selon l'axe de la couleur selectionnée et sa complémentaire.
      </li>
    </ul>
  </p>
);
const TensionEtEquilibre = (
  <>
    <p>
      Cette section s'inspire d'un concept imaginé par Goethe, il s'agit des
      valeurs de lumière des couleurs les une par rapport aux autres. C'est une
      approche sensible de la couleur, ces ratio ne sont pas universels. les
      couleurs, à meme saturation et luminosité, peuvent crées des impressions
      sensible de luminositées différentes, par exemple le violet sera perçu
      plus foncé que le jaune.
    </p>
    <p>
      partant de ce principe, les ratio suivant sont calculé selon leur
      luminosité réelle et leur luminosité percu selon le principe expliqué:
    </p>
    <ul>
      <li>
        (étant calculé selon des valeurs arbitraires, ces ratios sont a titre
        indicatif)
      </li>
      <li>
        Ratio lumineux : les couleurs sont plus ou moins spacialement dominante
        selon à quel point elles sont lumineuses.
      </li>
      <li>
        Ratio sombres : les couleurs sont plus ou moins spacialement dominante
        selon à quel point elles sont sombres.
      </li>
    </ul>
  </>
);
const températureOpposée = (
  <>
    <p>
      Selon une découpe arbitraire de la roue chromatique, la couleur
      sélectionnée est mise en perspective face aux couleurs de températures
      opposées. La notion de température est une notion subjective, elle est
      liée à la perception de la couleur par l'oeil humain.
    </p>
    <p>
      les couleurs tirant vers le rouge sont dites chaudes, les couleurs tirant
      vers le bleu sont dites froides.
    </p>
  </>
);

function SingleColorPage() {
  // Renamed from App
  //states définisant les couleurs
  const [rgb, setRgb] = useState([0, 0, 0]);
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });
  const [hex, setHex] = useState("#000000");
  const [hsv, setHsv] = useState({ h: 0, s: 0, v: 0 });
  const [oppositeColor, setoppositeColor] = useState([255, 255, 255]);
  const [complementaryColor, setComplementaryColor] = useState([255, 255, 255]);
  const [contrastColorRgb, setContrastColorRgb] = useState([255, 255, 255]);
  const { rgbToHex } = InformationTranslationFuncs;
  const { complementary, opposite } = colorManagementFuncs;
  const { showFeedback } = useFeedback(); // Use the feedback context hook

  console.log({ hsl, hsv });
  //useEffect pour mettre à jour la couleur opposée
  // console.log({ complementaryColor });
  useEffect(() => {
    // console.log(funcs.opposite(rgb));
    setoppositeColor(rgbToHex(opposite(rgb)));
    setComplementaryColor(rgbToHex(complementary(rgb)));

    // Calculate contrast color (black or white) based on rgb brightness
    let checklightness = 0;
    rgb.map((val) => {
      checklightness += val;
    });
    checklightness > 382
      ? setContrastColorRgb([0, 0, 0]) // Set to black
      : setContrastColorRgb([255, 255, 255]); // Set to white
  }, [rgb]);

  // Function to handle copying hex codes to clipboard
  const handleHexCopy = (hex) => {
    if (!hex) return;
    writeToClipboard(hex)
      .then(() => {
        showFeedback(`Copied ${hex}!`, "success");
      })
      .catch((err) => {
        showFeedback("Failed to copy!", "error");
        console.error("Clipboard error: ", err);
      });
  };

  return (
    <div className="single-color-page-layout">
      <header
        style={{ backgroundColor: hex, borderBottomColor: oppositeColor }}
      >
        <h1 style={{ backgroundColor: oppositeColor, color: hex }}>
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
            oppositeColor={oppositeColor}
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
                backgroundColor: rgbToHex(complementary(rgb)),
              }}
              onClick={() => handleHexCopy(rgbToHex(complementary(rgb)))}
            >
              <span
                className="clickable-hex-inline"
                /* Add specific styles if needed, otherwise rely on parent */
              >
                {rgbToHex(complementary(rgb)).toUpperCase()}
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
            <h2>Set de couleurs de température opposée</h2>
          </PopupWrapper>
          <div className="opposite-temperature-container">
            <Temperatures rgb={rgb} contrastColorRgb={contrastColorRgb} />
          </div>
        </div>
        <div className="gradient">
          <PopupWrapper title="Gradients">
            <h2>Gradients</h2>
          </PopupWrapper>
          <span>gradient 1 vers le complémentaire</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={1} />
          <span>gradient 2 vers le complémentaire</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={2} />
          <span>gradient de luminosité</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={3} />
          <span>gradient de saturation</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={6} />
          <span>gradient 1 vers le moins saturé</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={4} />
          <span>gradient 2 vers le moins saturé</span>
          <ColorGradients rgb={rgb} gradientTypeIndex={5} />
        </div>
      </main>
    </div>
  );
}

export default SingleColorPage; // Export the renamed component
