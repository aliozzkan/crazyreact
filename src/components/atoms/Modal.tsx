import React, {
  useImperativeHandle,
  forwardRef,
  PropsWithChildren,
} from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export interface ModalProps {
  open: () => void;
  close: () => void;
}

interface Props {
  title?: string;
  onConfirm?: () => void;
  onConfirmText?: string;
  isConfirmSpinner?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  noForm?: boolean;
}

const ModalAtom = forwardRef<ModalProps, PropsWithChildren<Props>>(
  ({ children, title, onConfirm, onConfirmText, noForm, isConfirmSpinner, ...rest }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useImperativeHandle(ref, () => ({
      close: () => {
        onClose();
        if (rest.onClose) rest.onClose();
      },
      open: () => {
        onOpen();
        if (rest.onOpen) rest.onOpen();
      },
    }));

    return (
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          {!!title && <ModalHeader>{title}</ModalHeader>}
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          {!noForm && (
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Vazgeç
              </Button>
              {!!onConfirm && (
                <Button colorScheme="teal" onClick={onConfirm} isLoading={!!isConfirmSpinner}>
                  {onConfirmText}
                </Button>
              )}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    );
  }
);

ModalAtom.defaultProps = {
  onConfirmText: "Onayla",
};

export default ModalAtom;
