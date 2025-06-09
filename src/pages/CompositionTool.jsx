import { Link } from "react-router-dom";
import "./compositionTool.css";
import TripleHexInput1 from "../components/tripleHexInputs/TripleHexInput1";
import TripleHexInput2 from "../components/tripleHexInputs/TripleHexInput2";
import ConfigurableContrastChecker from "../components/configurableContrastChecker/ConfigurableContrastChecker";
import ColorExploration from "../components/colorExploration/ColorExploration";

import ColorExperimentation from "../components/colorExploration/ColorExperimentation";
import { useEffect } from "react";
const CompositionTool = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <section className="composition-tool-page">
      <header>
        <h1>Outils de composition</h1>
        <Link to="/">
          <button>Accueil</button>
        </Link>
        <p className="header-text">
          Cette page vous permet de comparer au moins 2 couleurs entre elles via
          différents outils de composition.
        </p>
      </header>
      <main>
        <div className="triple-inputs-section">
          <TripleHexInput1 />
          <TripleHexInput2 />
          <ConfigurableContrastChecker />
          <ColorExploration />
          <ColorExperimentation />
        </div>
      </main>
    </section>
  );
};

export default CompositionTool;
