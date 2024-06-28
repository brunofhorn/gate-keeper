import { ConfirmationModalProps } from '@/interfaces/modal';
import { Modal, Button, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, title, message, onConfirm, onCancel }) => {
    return (
        <Modal isOpen={open} onOpenChange={onCancel} backdrop='blur'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            <p>{message}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={onConfirm}>
                                Confirmar
                            </Button>
                            <Button color="danger" variant="light" onPress={onClose} onClick={onCancel}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ConfirmationModal;
