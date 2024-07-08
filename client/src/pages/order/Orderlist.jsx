
// New.jsx
import React, { useState } from "react";
import "./Orderlist.scss";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/navbar/Navbar";
import PagesHistory from "../../Components/Shared/MiniComponents/PagesHistory/PagesHistory";
import OrderDatatable from "./Order";

const OrderList = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="new">
      <div className='top'>
        <PagesHistory history={["Dashboard", ("Orders")]} />
      </div>
      <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
      <div className={`newContainer ${showSidebar ? "sidebarOpen" : ""}`}>
      <Navbar toggleSidebar={toggleSidebar} />
        <OrderDatatable/>
      </div>
    </div>
  );
};

export default OrderList;
