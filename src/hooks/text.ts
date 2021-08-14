import { useTranslation } from "react-i18next";

export function useText(
  dir: "atoms" | "molecules" | "organizms" | "pages" | "templates",
  sub?: string
) {
  const [t] = useTranslation();
  function translator(textKey: string) {
    return t(`${dir}.${!!sub ? sub + "." : ""}${textKey}`);
  }
  return translator;
}