import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
// import { DarkModeContext } from "./context/darkModeContext";
import { useSelector } from 'react-redux';

function DashBoard() {
  const { loginInfo } = useSelector((state) => state.user);
  const { role } = loginInfo || {};

  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="users" element={<List />} />
          <Route path="users/:userId" element={<Single />} />
          <Route
            path="users/new"
            element={<New inputs={userInputs} title="Add New User" />}
          />
          <Route path="products" element={<List />} />
          <Route path="products/:productId" element={<Single />} />
          <Route
            path="products/new"
            element={<New inputs={productInputs} title="Add New Product" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default DashBoard;
