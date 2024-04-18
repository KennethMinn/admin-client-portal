import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import global_en from "./en/global.json";
import global_mm from "./mm/global.json";
import global_mn from "./mn/global.json";
import global_kr from "./kr/global.json";

const resources = {
  en: {
    translation: global_en,
  },
  kr: {
    translation: global_kr,
  },
  mm: {
    translation: global_mm,
  },
  mn: {
    translation: global_mn,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
