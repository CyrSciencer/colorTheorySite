import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SingleColorPage from "./pages/SingleColorPage";
import CompositionOfTwo from "./pages/CompositionOfTwo";

import "./App.css"; // Keep general styles if needed

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/single-color" element={<SingleColorPage />} />
        <Route path="/composition-of-two" element={<CompositionOfTwo />} />
        {/* Add other routes here if needed */}
      </Routes>
      <footer></footer>
    </>
  );
}

export default App;
