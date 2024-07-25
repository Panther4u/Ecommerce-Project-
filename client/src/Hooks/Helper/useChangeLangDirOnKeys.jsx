// import i18next from "i18next";
// import useFunctionOnKey from "./useFunctionOnKey";

// const useChangeLangDirOnKeys = () => {
//   const delay = 0;

//   function changeLang(lang) {
//     i18next.changeLanguage(lang);
//   }

//   useFunctionOnKey(() => changeLang("en"), ["KeyE"], delay);
//   useFunctionOnKey(() => changeLang("ar"), ["KeyA"], delay);
//   useFunctionOnKey(() => changeLang("ru"), ["KeyR"], delay);
//   useFunctionOnKey(() => changeLang("fr"), ["KeyF"], delay);
//   useFunctionOnKey(() => changeLang("ja"), ["KeyJ"], delay);
//   useFunctionOnKey(() => changeLang("hu"), ["KeyH"], delay);
//   useFunctionOnKey(() => changeLang("hi"), ["KeyI"], delay);
// };
// export default useChangeLangDirOnKeys;



import i18next from "i18next";
import useFunctionOnKey from "./useFunctionOnKey";

const useChangeLangDirOnKeys = () => {
  const delay = 0;

  function changeLang(lang) {
    i18next.changeLanguage(lang);
  }

  // Default language set to English
  i18next.changeLanguage("en");

  // Hook to change language to English when 'KeyE' is pressed
  useFunctionOnKey(() => changeLang("en"), ["KeyE"], delay);
};

export default useChangeLangDirOnKeys;
