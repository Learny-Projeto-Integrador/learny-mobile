import { createContext, useContext, useState, ReactNode } from "react";
import Loading from "@/components/ui/Loading";

type LoadingContextType = {
  showLoadingModal: () => void;
  hideLoadingModal: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  const showLoadingModal = () => setVisible(true);
  const hideLoadingModal = () => setVisible(false);

  return (
    <LoadingContext.Provider value={{ showLoadingModal, hideLoadingModal }}>
      {children}
      <Loading visible={visible} />
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading precisa estar dentro de LoadingProvider");
  }
  return context;
}
