import React, {
  FC,
  Fragment,
  useRef,
  PropsWithChildren,
  ReactElement,
} from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

interface ChildrenData {
  onOpen: () => void;
  isOpen: boolean;
}

interface ConfirmProps {
  children: (item: ChildrenData) => ReactElement;
  onConfirm: () => void;
  colorScheme?: string;
  confirmText?: string;
  text?: string;
  title?: string;
}

const Confirm: FC<ConfirmProps> = (props) => {
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef<any>();
  return (
    <Fragment>
      {props.children({ onOpen, isOpen })}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {props.title ?? "Bu İşlem İçin Onay Gerekli"}
            </AlertDialogHeader>

            <AlertDialogBody>
              {props.text}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Vazgeç
              </Button>
              <Button
                colorScheme={props.colorScheme ?? "teal"}
                onClick={() => {
                  props.onConfirm();
                  onClose();
                }}
                ml={3}
              >
                {props.confirmText ?? "Onayla"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  );
};

Confirm.defaultProps = {};

export default Confirm;
