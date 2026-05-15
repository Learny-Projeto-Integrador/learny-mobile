import { createContext, useContext, useState } from "react";

type FeedBack = {
  label: string | null;
  content: React.ReactNode | null;
};

type FeedbackContextData = {
  feedback: FeedBack | null;

  setFeedback: React.Dispatch<
    React.SetStateAction<FeedBack | null>
  >;
};

const FeedbackContext =
  createContext({} as FeedbackContextData);

export function FeedbackProvider({ children }: any) {
  const [feedback, setFeedback] =
    useState<FeedBack | null>(null);

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