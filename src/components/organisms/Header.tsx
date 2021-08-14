import React, { FC } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import LogoutButton from "components/molecules/LogoutButton";

interface HeaderProps {
  pageTitle: string;
}

const Header: FC<HeaderProps> = (props) => {
  return (
    <Flex
      justifyContent="space-between"
      bgColor="purple.100"
      h="70px"
      alignItems="center"
      px="10"
    >
      <Flex>
        <Text color="gray.700" fontSize="lg" fontWeight="bold">
          LOGO
        </Text>
      </Flex>
      <Flex>
        <Text>{props.pageTitle}</Text>
      </Flex>
      <Flex>
        <LogoutButton />
      </Flex>
    </Flex>
  );
};

export default Header;
