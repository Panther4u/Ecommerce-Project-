import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import useSignOut from "src/Hooks/App/useSignOut";
import SvgIcon from "../MiniComponents/SvgIcon";
import s from "./UserMenu.module.scss";
import UserMenuItemWithCount from "./UserMenuItemWithCount";

const UserMenu = ({ isActive, toggler }) => {
  const { wishList } = useSelector((state) => state.products);
  const { role } = useSelector((state) => state.user.loginInfo);
  const wishListLength = wishList.length;
  const navigateTo = useNavigate();
  const signOut = useSignOut();

  function handleSignOut() {
    signOut();
    navigateTo("/", { replace: true });
  }

  return (
    <div className={`${s.userMenu} ${isActive ? s.active : ""}`}>
      <NavLink to="/profile">
        <SvgIcon name="user" />
        <span>Manage My Account</span>
      </NavLink>

      {role === "admin" && (
        <NavLink to="/dashboard">
          <SvgIcon name="dashboard" />
          <span>Dashboard</span>
        </NavLink>
      )}

      <NavLink to="/order-summary">
        <SvgIcon name="cart" />
        <span>My Order</span>
      </NavLink>

      <NavLink to="/cancellations">
        <SvgIcon name="cancel" />
        <span>My Cancellations</span>
      </NavLink>

      <NavLink to="/reviews">
        <SvgIcon name="solidStar" />
        <span>My Reviews</span>
      </NavLink>

      <NavLink to="/wishlist">
        <UserMenuItemWithCount
          props={{
            iconName: "save",
            title: "Wishlist",
            countLength: wishListLength,
          }}
        />
      </NavLink>

      <a href="#" onClick={handleSignOut} onBlur={() => toggler()}>
        <SvgIcon name="boxArrowLeft" />
        <span>Logout</span>
      </a>
    </div>
  );
};

export default UserMenu;
