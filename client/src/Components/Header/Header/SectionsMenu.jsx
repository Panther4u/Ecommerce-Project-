import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { menFashionMenuItems, otherSectionsMenuItems, womenFashionMenuItems } from "src/Data/staticData";
import { updateGlobalState } from "src/Features/globalSlice";
import { camelCase } from "src/Functions/helper";
import SvgIcon from "../../Shared/MiniComponents/SvgIcon";
import DropDownMenu from "../../Home/Introduction/DropDownMenu";
import s from "./SectionsMenu.module.scss";

const SectionsMenu = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isSectionsMenuActive } = useSelector((state) => state.global);
  const activeClass = isSectionsMenuActive ? s.active : "";

  const toggleMenu = () => {
    dispatch(updateGlobalState({ key: "isSectionsMenuActive", value: !isSectionsMenuActive }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSectionsMenuActive && !event.target.closest(`.${s.sectionsMenu}`)) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSectionsMenuActive]);

  return (
    <>
      <button
        type="button"
        className={s.sectionsMenuButton}
        onClick={toggleMenu}
        aria-label={t("sectionsMenu.womenFashion")}
      >
        <SvgIcon name="list" />
      </button>

      {isSectionsMenuActive && (
        <button className={s.closeButton} onClick={toggleMenu} aria-label={t("sectionsMenu.close")}>
          <SvgIcon name="close" />
        </button>
      )}

      <nav className={`${s.sectionsMenu} ${activeClass}`}>
        <DropDownMenu nameMenu={t("sectionsMenu.womenFashion.title")}>
          <ul className={s.dropDownMenu}>
            {womenFashionMenuItems.map((item, index) => {
              const itemName = camelCase(item.name);
              const itemTrans = t("sectionsMenu.womenFashion.menuItems." + itemName);
              return (
                <li key={`item-${index}`}>
                  <a href={item.url}>{itemTrans}</a>
                </li>
              );
            })}
          </ul>
        </DropDownMenu>

        <DropDownMenu nameMenu={t("sectionsMenu.menFashion.title")}>
          <ul className={s.dropDownMenu}>
            {menFashionMenuItems.map((item, index) => {
              const itemName = camelCase(item.name);
              const itemTrans = t("sectionsMenu.menFashion.menuItems." + itemName);
              return (
                <li key={`item-${index}`}>
                  <a href={item.url}>{itemTrans}</a>
                </li>
              );
            })}
          </ul>
        </DropDownMenu>

        {otherSectionsMenuItems.map((item, index) => {
          const itemName = camelCase(item.name);
          const itemTrans = t("sectionsMenu.otherSections." + itemName);
          return (
            <a href={item.url} key={`item-${index}`}>
              {itemTrans}
            </a>
          );
        })}
      </nav>
    </>
  );
};

export default SectionsMenu;
