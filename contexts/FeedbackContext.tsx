import { createContext, useContext, useMemo, useState } from "react";

type Feedback = {
  label: string | null;
  content: React.ReactNode | null;
};

type FeedbackContextData = {
  feedback: Feedback | null;

  setFeedback: React.Dispatch<
    React.SetStateAction<Feedback | null>
  >;
};

const FeedbackContext =
  createContext({} as FeedbackContextData);

export function FeedbackProvider({ children }: any) {
  const [feedback, setFeedback] =
    useState<Feedback | null>(null);

  const value = useMemo(
    () => ({ feedback, setFeedback }),
    [feedback],
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedbackContext() {
  return useContext(FeedbackContext);
}