import { extendTheme } from "@chakra-ui/react";

const colors = {
  black: "#2d373c",
};

const theme = extendTheme({
  textStyles: {
    h: {},
    h1: {
      fontWeight: 600,
      fontSize: "14px",
      color: "black",
      lineHeight: "1.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "12px",
      lineHeight: "18px",
    },
    content: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "18px",
    },
  },
  config: {
    useSystemColorMode: false,
    colorMode: "light",
  },
  colors,
  components: {
    Input: {
      baseStyle: {
        borderColor: "red.500",
        borderRadius: "0px",
      },
    },
    Container: {
      baseStyle: {
        maxW: "1100px",
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "sm",
        _focus: {
          outline: 0,
          boxShadow: 0,
        },
      },
    },
    IconButton: {
      baseStyle: {
        _focus: {
          outline: 0,
          boxShadow: 0,
        },
      },
    },
  },
});

export default theme;
