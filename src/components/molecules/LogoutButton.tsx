import React, { FC, useState, useEffect } from "react";
import { Box, Text, Button, ButtonProps } from "@chakra-ui/react";
import { Authenticator } from "helper/authenticator";

interface LogoutButtonProps {
  label?: string;
}

type Props = LogoutButtonProps & Omit<ButtonProps, "onClick">;

const LogoutButton: FC<Props> = ({ label, ...props }) => {
  return (
    <Button {...props} onClick={Authenticator.Logout}>
      <Text>{label}</Text>
    </Button>
  );
};

LogoutButton.defaultProps = {
  label: "Logout",
};

export default LogoutButton;
