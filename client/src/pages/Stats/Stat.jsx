
import "./Stat.scss"
import React, { useState } from "react";
import Navbar from "../../Components/navbar/Navbar"
import Sidebar from "../../Components/sidebar/Sidebar"
import PagesHistory from "../../Components/Shared/MiniComponents/PagesHistory/PagesHistory";
import Chart from "../../Components/chart/Chart";


const Stat = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <div> 
      <div className='top'>
        <PagesHistory history={["Dashboard", ("Stats")]} />
      </div>
      
      <div className="list">
        <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
        <div className={`listContainer ${showSidebar ? "sidebarOpen" : ""}`}>
          <Navbar toggleSidebar={toggleSidebar}/>
          <div className="n">
                   <Chart/>   
          </div>

        </div>
      </div>
    </div>

  )
}
export default Stat