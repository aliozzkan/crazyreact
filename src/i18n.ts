import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tr from "locales/tr.json";

const resources = {
  tr: {
    translation: tr,
  },
};

const fallbackLng = "tr";
const whitelist = ["tr"];

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng,
    whitelist,
    interpolation: {
      escapeValue: false,
    },
  });
