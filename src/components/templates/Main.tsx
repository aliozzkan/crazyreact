import React, { PropsWithChildren } from "react";
import {
  Flex,
  Box,
  Container,
  Link,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { IoChevronForward } from "react-icons/io5";
import { useResponsive } from "hooks/responsive";

interface MainProps {
}

function Main({ children}: PropsWithChildren<MainProps>) {
  const drawerDisc = useDisclosure();
  const { isSm, isBase } = useResponsive();

  return (
    <Flex w="100vw" minH="100vh" overflow="hidden">
      <Box bgColor="gray.100" w="100%" maxH="100vh" overflowY="scroll">
        <Container mt="5">{children}</Container>
        {(isBase || isSm) && <Box h="100px"></Box>}
      </Box>
    </Flex>
  );
}

export default Main;
