import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Header } from "components/organisms";

interface LayoutProps {
  title?: string;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <Box>
      <Header pageTitle={props.title!} />
      {props.children}
    </Box>
  );
};

Layout.defaultProps = {
  title: "Proje",
};

export default Layout;
