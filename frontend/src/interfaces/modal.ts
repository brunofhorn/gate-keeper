export interface ModalProps {
    open: boolean;
    title: string;
    message: JSX.Element;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
    buttons: JSX.Element[];
    onCancel: () => void;
}
