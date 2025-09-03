import { useState } from "react";
import CustomAlert from "@/components/ui/CustomAlert";
import type { AlertData } from "@/types";

export function useCustomAlert() {
  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = (data: AlertData) => {
    setAlertData(data);
    setVisible(true);
  };

  // componente pronto para renderizar
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

  return { showAlert, AlertComponent };
}
