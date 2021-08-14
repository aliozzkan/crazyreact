import React, {
  useImperativeHandle,
  forwardRef,
  PropsWithChildren,
  useRef,
  useEffect,
} from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export interface DrawerProps {
  open: () => void;
  close: () => void;
}

interface Props {
  title?: string;
  onConfirm?: () => void;
  onConfirmText?: string;
  onClose?: () => void;
  onOpen?: () => void;
}

const DrawerAtom = forwardRef<DrawerProps, PropsWithChildren<Props>>(
  ({ children, title, onConfirm, onConfirmText, ...props }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<any>();

    useEffect(() => {
      if (isOpen) {
        props?.onOpen && props.onOpen();
      } else {
      }
    }, [isOpen]);

    useImperativeHandle(ref, () => ({
      close: () => {
        onClose();
      },
      open: () => {
        onOpen();
      },
    }));

    return (
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          props?.onClose && props.onClose();
          onClose();
        }}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {!!title && <DrawerHeader>{title}</DrawerHeader>}

          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Kapat
            </Button>
            {!!onConfirm && (
              <Button colorScheme="teal" onClick={onConfirm}>
                {onConfirmText}
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
);

DrawerAtom.defaultProps = {
  onConfirmText: "Onayla",
};

export default DrawerAtom;
