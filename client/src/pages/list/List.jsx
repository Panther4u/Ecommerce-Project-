import "./list.scss"
import React, { useState } from "react";
import Navbar from "../../Components/navbar/Navbar"
import Datatable from "../../Components/datatable/Datatable"
import Sidebar from "../../Components/sidebar/Sidebar"
import PagesHistory from "../../Components/Shared/MiniComponents/PagesHistory/PagesHistory";
const List = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <div> 
      {/* <div className='top'>
        <PagesHistory history={["/", ("nav.profile")]} />
      </div> */}
      
      <div className="list">
        <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
        <div className={`listContainer ${showSidebar ? "sidebarOpen" : ""}`}>
          <Navbar toggleSidebar={toggleSidebar}/>
          <Datatable/>
        </div>
      </div>
    </div>

  )
}

export default List