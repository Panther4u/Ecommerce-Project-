import { Link } from "react-router-dom";
import useNavToolsProps from "src/Hooks/App/useNavToolsProps";
import NavTools from "../../Shared/MidComponents/NavTools/NavTools";
import s from "./Header.module.scss";
import MobileNavIcon from "./MobileNavIcon";
import Nav from "./Nav";
import SectionsMenu from "./SectionsMenu";

const Header = () => {
  const navToolsProps = useNavToolsProps();

  return (
    <header className={s.header}>
      <div className={s.container} dir="ltr">
        <div className={s.left}>
            <SectionsMenu/>
            <h1>
              <Link to="/">Exclusive</Link>
            </h1>
        </div>

        <div className={s.headerContent}>
          <Nav />
          <NavTools {...navToolsProps} />
        </div>

        <MobileNavIcon />
      </div>
    </header>
  );
};

export default Header;
