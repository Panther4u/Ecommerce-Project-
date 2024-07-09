
// New.jsx
import React, { useState } from "react";
import "./OrderDetails.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/navbar/Navbar";
import PagesHistory from "../../Components/Shared/MiniComponents/PagesHistory/PagesHistory";
import { Link } from "react-router-dom";
import OrderProduct from "./OrderProduct";

const OrderDetails = () => {
  const { loginInfo } = useSelector((state) => state.user);
  const [showSidebar, setShowSidebar] = useState(false);
  const { t } = useTranslation();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="new">
        <div className="top">
          <PagesHistory history={["Dashboard", ("Order Details")]} />
        </div>

      <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
      <div className={`newContainer ${showSidebar ? "sidebarOpen" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <OrderProduct />
      </div>
    </div>
  );
};

export default OrderDetails;
