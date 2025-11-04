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
        showFeedback("No text to copy!", "error", 3000, "");
        return;
      }
      try {
        await writeToClipboard(textToCopy);
        // Pass the copied hex code as the color parameter
        showFeedback(
          `${successMessagePrefix} ${textToCopy}!`,
          "success",
          3000,
          textToCopy
        );
      } catch (err) {
        showFeedback("Failed to copy!", "error", 3000, "");
        console.error("Clipboard error: ", err); // Keep for debugging, or remove for production
      }
    },
    [showFeedback]
  );

  return copy;
}

export default useClipboardWithFeedback;
