import { Link } from "react-router-dom";
import useNavToolsProps from "src/Hooks/App/useNavToolsProps";
import NavTools from "../../Shared/MidComponents/NavTools/NavTools";
import s from "./Header.module.scss";
import MobileNavIcon from "./MobileNavIcon";
import Nav from "./Nav";
import SectionsMenu from "./SectionsMenu";
import SearchProductsInput from "../../Shared/NavTools/SearchProductsInput";
import logo from "src/Assets/Images/logo.png"; // Adjust path as needed

const Header = () => {
  const navToolsProps = useNavToolsProps();

  return (
    <header className={s.header}>
      <div className={s.container} dir="ltr">
        <div className={s.left}>
          {/* <SectionsMenu/> */}
          <MobileNavIcon />
          <h3 className={s.logoContainer}>
            <Link to="/" className={s.logo}>
              <img src={logo} alt="TheFrameshoppy Logo" className={s.logoImage} />
            </Link>
          </h3>
        </div>

        <div className={s.headerContent}>
          <div className={s.lefts}>
            <Nav />
          </div>
          <div className={s.right}>
            <NavTools {...navToolsProps} />
          </div>
        </div>
        {/* <SearchProductsInput /> */}
        {/* <MobileNavIcon /> */}
      </div>
    </header>
  );
};

export default Header;
