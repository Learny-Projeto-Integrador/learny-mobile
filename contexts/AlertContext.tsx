import { createContext, useContext, useState, ReactNode } from "react";
import CustomAlert from "@/components/ui/CustomAlert";
import type { AlertData } from "@/types";

type AlertContextType = {
  showAlert: (data: AlertData) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useCustomAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
}

type Props = { children: ReactNode };

export function AlertProvider({ children }: Props) {
  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = (data: AlertData) => {
    setAlertData(data);
    setVisible(true);
  };

  const AlertComponent = () =>
    alertData ? (
      <CustomAlert
        icon={alertData.icon}
        visible={visible}
        dualAction={alertData.dualAction || false}
        title={alertData.title}
        message={alertData.message}
        closeLabel={alertData.closeLabel}
        redirectLabel={alertData.redirectLabel}
        onClose={() => setVisible(false)}
        onRedirect={alertData.onRedirect}
      />
    ) : null;

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertComponent />
    </AlertContext.Provider>
  );
}
