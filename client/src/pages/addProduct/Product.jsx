
// New.jsx
import React, { useState } from "react";
import "./Product.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/navbar/Navbar";
import PagesHistory from "../../Components/Shared/MiniComponents/PagesHistory/PagesHistory";
import { Link } from "react-router-dom";
import AddProduct from "./AddProduct";

const Product = () => {
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
      <div className='top'>
        <PagesHistory history={["Dashboard", ("Add Products")]} />
        <p>
              {t("common.welcome")}{"! "}
              <Link to="/profile">{loginInfo.username}</Link>
            </p>
      </div>
      <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
      <div className={`newContainer ${showSidebar ? "sidebarOpen" : ""}`}>
      <Navbar toggleSidebar={toggleSidebar} />
        <AddProduct/>
      </div>
    </div>
  );
};

export default Product;