import { useMediaQuery } from "@chakra-ui/react";

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

export function useResponsive() {
  const [isBase] = useMediaQuery(`(max-width: ${breakpoints.sm})`);
  const [isSm] = useMediaQuery(`(max-width: ${breakpoints.md})`);
  const [isMd] = useMediaQuery(`(max-width: ${breakpoints.lg})`);
  const [isLg] = useMediaQuery(`(max-width: ${breakpoints.xl})`);
  const [isXl] = useMediaQuery(`(max-width: ${breakpoints["2xl"]})`);
  const [is2xl] = useMediaQuery(`(min-width: ${breakpoints["2xl"]})`);
  return { isBase, isSm, isMd, isLg, isXl, is2xl };
}
