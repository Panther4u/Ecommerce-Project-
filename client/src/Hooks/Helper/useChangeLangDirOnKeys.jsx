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



import { useEffect } from "react";
import i18next from "i18next";
import useFunctionOnKey from "./useFunctionOnKey";

const useChangeLangDirOnKeys = () => {
  const delay = 0;

  function changeLang(lang) {
    i18next.changeLanguage(lang);
  }

  useEffect(() => {
    // Default language set to English
    i18next.changeLanguage("en");
  }, []); // Empty dependency array means this effect runs once when the component mounts

  useFunctionOnKey(() => changeLang("en"), ["KeyE"], delay);
};

export default useChangeLangDirOnKeys;

