import { createContext, useContext, useState } from "react";

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

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        setFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedbackContext() {
  return useContext(FeedbackContext);
}