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
        showFeedback("No text to copy!", "error");
        return;
      }
      try {
        await writeToClipboard(textToCopy);
        showFeedback(`${successMessagePrefix} ${textToCopy}!`, "success");
      } catch (err) {
        showFeedback("Failed to copy!", "error");
        console.error("Clipboard error: ", err); // Keep for debugging, or remove for production
      }
    },
    [showFeedback]
  );

  return copy;
}

export default useClipboardWithFeedback;
