import React from "react";
import { Badge as CHBadge} from "@chakra-ui/react";

interface Props {
  isActive: boolean;
}

function Badge({ isActive }: Props) {
  return (
    <CHBadge colorScheme={!!isActive ? "green" : "red"}>
      {isActive ? "Aktif" : "Pasif"}
    </CHBadge>
  );
}

export default Badge;
