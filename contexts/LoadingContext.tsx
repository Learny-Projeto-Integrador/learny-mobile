import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import Loading from "@/components/ui/Loading";

type LoadingContextType = {
  showLoadingModal: () => void;
  hideLoadingModal: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  const showLoadingModal = useCallback(() => setVisible(true), []);
  const hideLoadingModal = useCallback(() => setVisible(false), []);

  const value = useMemo(
    () => ({ showLoadingModal, hideLoadingModal }),
    [showLoadingModal, hideLoadingModal],
  );

  return (
    <LoadingContext.Provider value={value}>
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
