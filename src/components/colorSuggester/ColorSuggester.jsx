import React, { useState, useMemo, useEffect } from "react";
import htmlColorNames from "../../utilities/htmlColorNames";
import "./ColorSuggester.css";

const ColorSuggester = ({ onSuggestionClick }) => {
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccessMessage, setCopySuccessMessage] = useState(""); // State for copy feedback

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
  const handleSuggestionClick = (hex) => {
    // Copy the hex value to the clipboard
    navigator.clipboard
      .writeText(hex)
      .then(() => {
        console.log(`Copied ${hex} to clipboard`); // Optional feedback
        setCopySuccessMessage(`Copied ${hex}!`); // Set success message
        // Clear the message after 2 seconds
        setTimeout(() => setCopySuccessMessage(""), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        setCopySuccessMessage("Failed to copy!"); // Set error message (optional)
        // Clear the message after 2 seconds
        setTimeout(() => setCopySuccessMessage(""), 2000);
      });

    if (onSuggestionClick) {
      onSuggestionClick(hex); // Pass the selected hex value up
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
        {isOpen ? "Close" : "Color search"}
      </button>
      {isOpen && (
        <>
          <label htmlFor="color-description">Describe a Color:</label>
          <input
            type="text"
            id="color-description"
            value={description}
            onChange={handleInputChange}
            placeholder="e.g., sky blue, dark red, lime"
            autoComplete="off" // Prevent browser's default autocomplete
          />
          {/* Display copy success message */}
          {copySuccessMessage && (
            <span className="copy-feedback">{copySuccessMessage}</span>
          )}

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map(({ name, hex }) => (
                <li
                  key={name}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(hex)}
                  title={`Click to select ${name} (${hex})`}
                >
                  <span
                    className="color-swatch"
                    style={{ backgroundColor: hex }}
                  ></span>
                  <div className="suggestion-details">
                    <span className="suggestion-name">{name}</span>
                    <span className="suggestion-hex">{hex}</span>
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
