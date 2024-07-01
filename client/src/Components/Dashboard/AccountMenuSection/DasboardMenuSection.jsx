import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useGetResizeWindow from "src/Hooks/Helper/useGetResizeWindow";
import AccountMenuIcon from "./AccountMenuIcon";
import s from "./DasboardMenuSection.module.scss";

const DasboardMenuSection = () => {
  const { isProfileMenuActive } = useSelector((state) => state.global);
  const { width: windowWidth } = useGetResizeWindow();
  const isMobileDevice = windowWidth < 768;
  const mobileClass = isMobileDevice ? s.mobile : "";
  const activeClass = isProfileMenuActive ? s.active : "";

  // State to track which category is currently open
  const [openCategory, setOpenCategory] = useState(null);

  // Function to toggle the open category
  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <>
      <AccountMenuIcon />

      <section className={`${s.menuSection} ${mobileClass} ${activeClass}`}>
        <section className={s.section}>
          <h2>MAIN HOME</h2>
          <ul>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          </ul>
        </section>

        <section className={s.section}>
          <h2>ALL PAGES</h2>
          <ul>
            <li>
              <a href="#">Ecommerce</a>
            </li>
            <li>
                  <a href="#">Category</a>
                  <ul style={{ display: openCategory === 'Category' ? 'block' : 'none' }}>
                <li>
                  <a href="#">Category List</a>
                </li>
                <li>
                  <a href="#">New Category</a>
                </li>
              </ul>
              <span onClick={() => toggleCategory('Category')}>  +  </span>
              </li>
            <li>
              <a href="#">Orders</a>
            </li>
            <li>
              <a href="#">Users</a>
            </li>
            <li>
              <a href="#">Roles</a>
            </li>
            <li>
              <a href="#">Gallery</a>
            </li>
            <li>
              <a href="#">Report</a>
            </li>
          </ul>
        </section>

        <section className={s.section}>
          <h2>SETTINGS</h2>
          <ul>
            <li>
              <a href="#">Location</a>
            </li>
            <li>
              <a href="#">City</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
          </ul>
        </section>
      </section>
    </>
  );
};

export default DasboardMenuSection;
