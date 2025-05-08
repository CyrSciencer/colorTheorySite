import React from "react";
import PropTypes from "prop-types";
import "./PopupTextBlock.css"; // Assurez-vous que le chemin CSS est correct

/**
 * Un composant popup qui affiche un bloc de contenu textuel.
 * S'affiche au centre de la page lorsqu'il est ouvert.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {boolean} props.isOpen - Indique si la popup est ouverte ou fermée.
 * @param {Function} props.onClose - La fonction à appeler pour fermer la popup.
 * @param {string|React.ReactNode} props.content - Le contenu à afficher dans la popup.
 * @param {string} [props.title] - Un titre optionnel pour la popup.
 */
function PopupTextBlock({ isOpen, onClose, content, title }) {
  if (!isOpen) {
    return null;
  }

  // Empêche le clic à l'intérieur de la popup de fermer la popup
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="popup-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="popup-content" onClick={handleContentClick}>
        <button
          className="popup-close-button"
          onClick={onClose}
          aria-label="Fermer"
        >
          &times; {/* Symbole de croix */}
        </button>
        {title && <h3 className="popup-title">{title}</h3>}
        <div className="popup-body">{content}</div>
      </div>
    </div>
  );
}

PopupTextBlock.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node, // Permet de passer du JSX comme contenu
  ]).isRequired,
  title: PropTypes.string,
};

export default PopupTextBlock;
