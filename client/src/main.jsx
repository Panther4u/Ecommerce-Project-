// import { StrictMode } from "react";
// import ReactDOM from "react-dom/client";
// import { HelmetProvider } from "react-helmet-async";
// import { Provider } from "react-redux";
// import App from "./App.jsx";
// import { store } from "./App/store.jsx";
// import "./Styles/main.scss";
// import "./Translations/i18n";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <HelmetProvider>
//         <App />
//       </HelmetProvider>
//     </Provider>
//   </StrictMode>
// );

// servicerWorker.register();



// import React from "react";
// import ReactDOM from "react-dom/client";
// import { HelmetProvider } from "react-helmet-async";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { CookiesProvider } from "react-cookie";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import App from "./App.jsx";
// import { store, persistor } from "../src/redux/store.js";
// import "./Styles/main.scss";
// import "./Translations/i18n";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <CookiesProvider>
//     <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <HelmetProvider>
//             <App />
//           </HelmetProvider>
//         </PersistGate>
//       </Provider>
//     </GoogleOAuthProvider>
//   </CookiesProvider>
// );


import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import App from "./App.jsx";
import  store from "../src/App/store.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./Styles/main.scss";
import "./Translations/i18n";
import "react-toastify/dist/ReactToastify.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <HelmetProvider>
          <GoogleOAuthProvider clientId="744223957530-qkbi4bbt7fv5ffr7ua5kv0cetgr07abs.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </HelmetProvider>
      </Provider>
    </CookiesProvider>
  </StrictMode>
);