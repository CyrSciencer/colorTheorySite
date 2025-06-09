import React, { useState } from "react";
import PopupTextBlock from "../components/popUp/PopupTextBlock";
import "./PopupWrapper.css";

// Helper component to avoid repetition for H2 popups
const PopupWrapper = ({ title, children, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // Ensure children is a valid React element before cloning
  if (!React.isValidElement(children)) {
    // Optionally return children directly or null, or log an error
    console.error("PopupWrapper expects a single React element child.");
    return children; // Or return null;
  }

  // Clone the title element (e.g., h2) and add onClick and style
  const triggerElement = React.cloneElement(children, {
    onClick: open,
    style: { ...children.props.style, cursor: "pointer" }, // Add cursor pointer
  });

  return (
    <div className="popup-wrapper-container">
      <i className="info-icon" onClick={open}>
        i
      </i>
      {triggerElement}
      <PopupTextBlock
        isOpen={isOpen}
        onClose={close}
        title={title}
        content={<p>{content}</p>}
      />
    </div>
  );
};

export default PopupWrapper;
