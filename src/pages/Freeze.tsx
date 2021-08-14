import React, { FC } from "react";
import {Box, Text} from "@chakra-ui/react";

interface FreezeProps {
}

const Freeze: FC<FreezeProps> = (props) => {
  return (
    <Box>
      <Text>Freeze</Text>
    </Box>
  )
}

Freeze.defaultProps = {}

export default Freeze