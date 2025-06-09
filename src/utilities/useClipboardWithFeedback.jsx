import { useCallback } from "react";
import { writeToClipboard } from "./clipboardUtils"; // Assuming clipboardUtils.js is in the same directory
import { useFeedback } from "../contexts/FeedbackContext";

/**
 * Custom hook to handle copying text to the clipboard and showing feedback.
 * @returns {function} A function that takes text to copy and an optional success message prefix.
 */
function useClipboardWithFeedback() {
  const { showFeedback } = useFeedback();

  const copy = useCallback(
    async (textToCopy, successMessagePrefix = "Copied") => {
      if (!textToCopy) {
        showFeedback("Aucun texte à copier !", "error");
        return;
      }
      try {
        await writeToClipboard(textToCopy);
        showFeedback(
          `Couleur copiée : ${textToCopy.toUpperCase()} !`,
          "success"
        );
      } catch (err) {
        showFeedback("Échec de la copie !", "error");
        console.error("Erreur de copie : ", err); // Garder pour le débogage, ou supprimer pour la production
      }
    },
    [showFeedback]
  );

  return copy;
}

export default useClipboardWithFeedback;
