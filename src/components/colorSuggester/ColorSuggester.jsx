import React, { useState, useMemo } from "react";
import htmlColorNames from "../../utilities/htmlColorNames";
// import { writeToClipboard } from "../../utilities/clipboardUtils"; // No longer needed directly
// import { useFeedback } from "../../contexts/FeedbackContext.jsx"; // No longer needed directly
import useClipboardWithFeedback from "../../utilities/useClipboardWithFeedback.jsx";
import "./ColorSuggester.css";

const ColorSuggester = ({ onSuggestionClick }) => {
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const copyWithFeedback = useClipboardWithFeedback();

  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };

  // Memoize the filtering logic for performance
  const suggestions = useMemo(() => {
    const searchTerm = description.toLowerCase().trim().replace(/\s+/g, ""); // Normalize search term
    if (!searchTerm) {
      return [];
    }

    return Object.entries(htmlColorNames)
      .filter(([name]) => name.includes(searchTerm))
      .map(([name, hex]) => ({ name, hex }))
      .slice(0, 10); // Limit to 10 suggestions
  }, [description]);

  // Handle clicking on a suggestion
  const handleSuggestionItemClick = (hex, name) => {
    copyWithFeedback(hex, `Copied ${name}`);
    if (onSuggestionClick) {
      onSuggestionClick(hex);
    }
    // Optionally clear the input/suggestions after selection
    // setDescription('');
  };

  // Toggle the visibility state
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="color-suggester">
      <button onClick={toggleOpen} className="toggle-button">
        {isOpen ? "Fermer" : "Recherche par nom de couleur"}
      </button>
      {isOpen && (
        <>
          <label htmlFor="color-description">
            Recherche par nom de couleur:
          </label>
          <input
            type="text"
            id="color-description"
            value={description}
            onChange={handleInputChange}
            placeholder="e.g., sky blue, dark red, lime"
            autoComplete="off" // Prevent browser's default autocomplete
          />

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map(({ name, hex }) => (
                <li
                  key={name}
                  className="suggestion-item"
                  onClick={() => handleSuggestionItemClick(hex, name)}
                  title={`Click to copy ${name} (${hex})`}
                >
                  <span
                    className="color-swatch"
                    style={{ backgroundColor: hex }}
                  ></span>
                  <div className="suggestion-details">
                    <span className="suggestion-name">{name}</span>
                    <span className="suggestion-hex clickable-hex">
                      {hex.toUpperCase()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ColorSuggester;
