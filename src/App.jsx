import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SingleColorPage from "./pages/SingleColorPage";
import CompositionOfTwo from "./pages/CompositionOfTwo";
import CompositionTool from "./pages/CompositionTool";
import ColorSuggester from "./components/colorSuggester/ColorSuggester";
import "./App.css"; // Keep general styles if needed
import { FeedbackProvider } from "./contexts/FeedbackContext";

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
      <footer></footer>
    </FeedbackProvider>
  );
}

export default App;
