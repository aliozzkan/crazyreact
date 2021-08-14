import { useToast as useChToast, UseToastOptions } from "@chakra-ui/react";

export function useToast() {
  const _toast = useChToast();

  function toast(options: UseToastOptions) {
    _toast({
      duration: 3000,
      isClosable: true,
      position: "top-right",
      ...options
    });
  }

  return toast;
}
