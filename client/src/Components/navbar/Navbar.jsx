import React from "react";
import "./navbar.scss";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="ite" onClick={toggleSidebar}>
            <ListOutlinedIcon className="icon" />
          </div>
        </div>
        <div className="items">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>         
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
