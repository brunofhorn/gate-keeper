import { ModalProps } from '@/interfaces/modal';
import { Modal as NextModal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

const Modal: React.FC<ModalProps> = ({ open, title, message, size = "md", buttons, onCancel }) => {
    return (
        <NextModal isOpen={open} onOpenChange={onCancel} backdrop='blur' size={size}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            <p>{message}</p>
                        </ModalBody>
                        {buttons?.length && (
                            <ModalFooter>
                                {buttons.map((button) => button)}
                            </ModalFooter>
                        )}
                    </>
                )}
            </ModalContent>
        </NextModal>
    );
};

export default Modal;
