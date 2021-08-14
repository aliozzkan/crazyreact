import { Button, Center, Flex, Icon, Text, Link } from "@chakra-ui/react";
import Main from "components/templates/Main";
import React from "react";
import { FaTimes } from "react-icons/fa";

export class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Bir sonraki render'da son çare arayüzünü göstermek için
    // state'i güncelleyin.
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.log(error.message);
    const errData = { error: error.toString(), date: new Date() };
    const errorsSTR = localStorage.getItem("errors");
    let errors: any[] = [];
    if (errorsSTR) {
      errors = [...JSON.parse(errorsSTR)];
    }

    errors.push(errData);
    localStorage.setItem("errors", JSON.stringify(errors));
  }

  render() {
    if (this.state.hasError) {
      // İstediğiniz herhangi bir son çare arayüzünü render edebilirsiniz.
      return (
        <Center h="100vh">
          <Flex flexDir="column" alignItems="center">
            <Icon color="gray.600" as={FaTimes} fontSize="8xl" />
            <Text color="gray.600" fontSize="xl">
              Bir Hata Oluştu
            </Text>
            <Link href="/" mt="3" color="teal">
              Ana Sayfaya Git
            </Link>
          </Flex>
        </Center>
      );
    }

    return this.props.children;
  }
}
