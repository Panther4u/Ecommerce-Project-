import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PagesHistory from "../Shared/MiniComponents/PagesHistory/PagesHistory";
import s from "./AdminDashBoardPage.module.scss";
import DashHome from "../../pages/home/Home";


const DashBoard = () => {
  const { loginInfo } = useSelector((state) => state.user);
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>


        <main className={s.accountPage} id="account-page">
          <div className={s.wrapper}>
            <PagesHistory history={["/", t("nav.profile")]} />

            <p className={s.welcomeMessage}>
              {t("common.welcome")}{"! "}
              <Link to="/profile">{loginInfo.username}</Link>
            </p>
          </div>
          <DashHome/>
        </main>

    </>
  );
};
export default DashBoard;
