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




// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import useStoreWebsiteDataToLocalStorage from "./Hooks/App/useStoreWebsiteDataToLocalStorage";
// import useChangeLangDirOnKeys from "./Hooks/Helper/useChangeLangDirOnKeys";
// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import DashBoard from "./DashBoard"; // Import DashBoard component
// import AppRoutes from "./Routes/AppRoutes";

// function App() {
//   useStoreWebsiteDataToLocalStorage();
//   useChangeLangDirOnKeys();

//   const { loginInfo } = useSelector((state) => state.user);
//   const { role } = loginInfo || {};

//   return (
//     <>
//       <ToastContainer />
//       <BrowserRouter>
//           {role === "admin" && <Route path="/dashboard" element={<DashBoard />} />}
//           <AppRoutes />
//           <Route path="*" element={<Navigate to="/" replace />} />

//       </BrowserRouter>
//     </>
//   );
// }

// export default App;


