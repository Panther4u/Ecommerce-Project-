// import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import HttpApi from "i18next-http-backend";
// import { initReactI18next } from "react-i18next";

// i18n
//   .use(initReactI18next)
//   .use(LanguageDetector)
//   .use(HttpApi)
//   .init({
//     compatibilityJSON: "v3", // Optional: Specify compatibility with i18next v3 JSON format
//     fallbackLng: "en", // Default language if translation file for detected language is not available
//     detection: {
//       order: [
//         "cookie",
//         "htmlTag",
//         "localStorage",
//         "sessionStorage",
//         "navigator",
//         "path",
//         "subdomain",
//       ], // Order in which language detection methods will be used
//       caches: ["cookie"], // Cache the language detected in the browser's cookie
//     },
//     backend: {
//       loadPath: "/locale/{{lng}}/{{ns}}.json", // Path to load translation resources from the server
//     },
//   });

// export default i18n;


import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    compatibilityJSON: "v3", // Optional: Specify compatibility with i18next v3 JSON format
    fallbackLng: "en", // Default language if translation file for detected language is not available
    detection: {
      order: [
        "cookie",
        "htmlTag",
        "localStorage",
        "sessionStorage",
        "navigator",
        "path",
        "subdomain",
      ], // Order in which language detection methods will be used
      caches: ["cookie"], // Cache the language detected in the browser's cookie
    },
    backend: {
      loadPath: "/locale/{{lng}}/{{ns}}.json", // Path to load translation resources from the server
    },
  });

export default i18n;
