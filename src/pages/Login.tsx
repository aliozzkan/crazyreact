import React, { FC } from "react";
import {Box, Text} from "@chakra-ui/react";

interface LoginPageProps {
}

const LoginPage: FC<LoginPageProps> = (props) => {
  return (
    <Box>
      <Text>LoginPage</Text>
    </Box>
  )
}

LoginPage.defaultProps = {}

export default LoginPage