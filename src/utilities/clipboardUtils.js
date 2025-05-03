/**
 * Writes the given text to the clipboard.
 * @param {string} text The text to copy.
 * @returns {Promise<void>} A promise that resolves when the text is successfully copied, or rejects if copying fails.
 */
export const writeToClipboard = (text) => {
  return new Promise((resolve, reject) => {
    if (!navigator.clipboard) {
      // Clipboard API not available (e.g., insecure context)
      reject(new Error("Clipboard API not available."));
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log(`Copied ${text} to clipboard`); // Keep console log for debugging
        resolve(); // Resolve the promise on success
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        reject(err); // Reject the promise on error
      });
  });
};
