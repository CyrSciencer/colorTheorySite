import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SingleColorPage from "./pages/SingleColorPage";
import CompositionOfTwo from "./pages/CompositionOfTwo";
import CompositionTool from "./pages/CompositionTool";
import ColorSuggester from "./components/colorSuggester/ColorSuggester";
import "./App.css"; // Keep general styles if needed
import { FeedbackProvider } from "./contexts/FeedbackContext";
import "./styles/fonts.css";

function App() {
  return (
    <FeedbackProvider>
      <div className="color-suggester-container">
        <ColorSuggester />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/single-color" element={<SingleColorPage />} />
        <Route path="/composition-of-two" element={<CompositionOfTwo />} />
        <Route path="/composition-tool" element={<CompositionTool />} />
      </Routes>
      <footer>
        <p>Crée par Cyr ROUYRRE en Mai 2025</p>
        <p>
          Portfolio: <a href="https://portfolio-cyr-rouyrre.netlify.app">▶</a>
        </p>
      </footer>
    </FeedbackProvider>
  );
}

export default App;
