import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import FeedbackPopup from "../components/popUp/FeedbackPopup";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });
  const timeoutRef = useRef(null);

  const showFeedback = useCallback(
    (message, type = "success", duration = 3000) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set feedback state to visible with message and type
      setFeedback({ isVisible: true, message, type });

      // Set a timeout to hide the feedback
      timeoutRef.current = setTimeout(() => {
        // Reset state to hide the popup
        setFeedback((prev) => ({ ...prev, isVisible: false }));
        timeoutRef.current = null;
      }, duration);
    },
    []
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <FeedbackContext.Provider value={{ showFeedback }}>
      {children}
      {/* Render the popup component, controlled by context state */}
      <FeedbackPopup
        isVisible={feedback.isVisible}
        message={feedback.message}
        type={feedback.type}
      />
    </FeedbackContext.Provider>
  );
};

/**
 * Hook to easily access the showFeedback function.
 */
export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
};
