export interface ConfirmationModalProps {
    open: boolean;
    title: string;
    message: JSX.Element;
    onConfirm: () => void;
    onCancel: () => void;
}