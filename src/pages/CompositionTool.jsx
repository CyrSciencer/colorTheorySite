import { Link } from "react-router-dom";
import "./compositionTool.css";
import TripleHexInput1 from "../components/tripleHexInputs/TripleHexInput1";
import TripleHexInput2 from "../components/tripleHexInputs/TripleHexInput2";
import ConfigurableContrastChecker from "../components/configurableContrastChecker/ConfigurableContrastChecker";
import ColorExploration from "../components/colorExploration/ColorExploration";
import ColorExperimentation from "../components/colorExploration/ColorExperimentation";
import ColorExperimentationV2 from "../components/colorExploration/ColorExperimentationV2";
import ColorExperimentationV3 from "../components/colorExploration/ColorExperimentationV3";
const CompositionTool = () => {
  return (
    <section className="composition-tool-page">
      <header>
        <h1>Outils de composition</h1>
        <Link to="/">
          <button>Accueil</button>
        </Link>
      </header>
      <main>
        <div className="triple-inputs-section">
          <TripleHexInput2 />
          <ConfigurableContrastChecker />
          <ColorExploration />
          <ColorExperimentation />
          <ColorExperimentationV2 />
          <ColorExperimentationV3 />
          <TripleHexInput1 />
        </div>
      </main>
    </section>
  );
};

export default CompositionTool;
