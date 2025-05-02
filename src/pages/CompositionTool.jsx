import { Link } from "react-router-dom";

import TripleHexInput1 from "../components/tripleHexInputs/TripleHexInput1";
import TripleHexInput2 from "../components/tripleHexInputs/TripleHexInput2";
import ConfigurableContrastChecker from "../components/configurableContrastChecker/ConfigurableContrastChecker";

const CompositionTool = () => {
  return (
    <section className="composition-tool-page">
      <header>
        <h1>Composition Tools</h1>
        <Link to="/">
          <button>HomePage</button>
        </Link>
      </header>
      <main>
        <div className="triple-inputs-section">
          <TripleHexInput1 />
          <TripleHexInput2 />
          <ConfigurableContrastChecker />
        </div>
      </main>
    </section>
  );
};

export default CompositionTool;
