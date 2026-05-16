export type CustomAlertType  = {
    icon: string;
    title: string;
    message: string;
    dualAction?: boolean;
    closeLabel?: string;
    redirectLabel?: string;
    onClose?: () => void;
    onRedirect?: () => void;
}