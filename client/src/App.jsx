// import useStoreWebsiteDataToLocalStorage from "./Hooks/App/useStoreWebsiteDataToLocalStorage";
// import useChangeLangDirOnKeys from "./Hooks/Helper/useChangeLangDirOnKeys";
// import AppRoutes from "./Routes/AppRoutes";

// function App() {
//   useStoreWebsiteDataToLocalStorage();
//   useChangeLangDirOnKeys()

//   return <AppRoutes />;
// }

// // export default App;


import React, { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStoreWebsiteDataToLocalStorage from "./Hooks/App/useStoreWebsiteDataToLocalStorage";
import useChangeLangDirOnKeys from "./Hooks/Helper/useChangeLangDirOnKeys";
import AppRoutes from "./Routes/AppRoutes";



function App() {
  useStoreWebsiteDataToLocalStorage();
  useChangeLangDirOnKeys();



  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
}

export default App;