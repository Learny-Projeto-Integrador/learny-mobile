import { createContext, useContext, useState, ReactNode } from "react";
import CustomAlert from "@/components/ui/CustomAlert";
import type { AlertData } from "@/types";

type AlertContextType = {
  showAlert: (data: AlertData) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useCustomAlert() {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
}

type Props = { children: ReactNode };

export function AlertProvider({ children }: Props) {
  const [queue, setQueue] = useState<AlertData[]>([]);
  const [current, setCurrent] = useState<AlertData | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = (data: AlertData) => {
    setQueue(prev => [...prev, data]);
    // se não tiver alerta atual, mostra imediatamente
    if (!current) {
      setCurrent(data);
      setVisible(true);
    }
  };

  const handleClose = () => {
    setVisible(false);
    setQueue(prevQueue => {
      const [, ...rest] = prevQueue; // remove o primeiro
      if (rest.length > 0) {
        setCurrent(rest[0]);
        setVisible(true);
      } else {
        setCurrent(null);
      }
      return rest;
    });
  };

  const AlertComponent = () =>
    current ? (
      <CustomAlert
        icon={current.icon}
        visible={visible}
        dualAction={current.dualAction || false}
        title={current.title}
        message={current.message}
        closeLabel={current.closeLabel}
        redirectLabel={current.redirectLabel}
        onClose={handleClose}
        onRedirect={current.onRedirect}
      />
    ) : null;

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertComponent />
    </AlertContext.Provider>
  );
}
