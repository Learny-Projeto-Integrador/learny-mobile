import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import CustomAlert from "@/components/ui/CustomAlert";
import type { CustomAlertType } from "@/types/alert";

type AlertContextType = {
  showAlert: (data: CustomAlertType) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useCustomAlert() {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
}

type Props = { children: ReactNode };

export function AlertProvider({ children }: Props) {
  const [queue, setQueue] = useState<CustomAlertType[]>([]);
  const [current, setCurrent] = useState<CustomAlertType | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = (data: CustomAlertType) => {
    setQueue((prev) => [...prev, data]);
  };

  // quando não há alerta atual e a fila tem itens, pega o próximo
  useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setQueue(rest);
      setVisible(true);
    }
  }, [queue, current]);

  const handleClose = () => {
    setVisible(false);
    setCurrent(null); // isso vai ativar o useEffect acima e puxar o próximo da fila
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
