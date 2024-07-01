import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PagesHistory from "../Shared/MiniComponents/PagesHistory/PagesHistory";
import s from "./AccountPage.module.scss";
import EditProfileForm from "./EditProfileForm/EditProfileForm";
// import DasboardMenuSection from "./AccountMenuSection/DasboardMenuSection";


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

          <div className={s.accountPageContent}>
            {/* <DasboardMenuSection /> */}
            <EditProfileForm />

          </div>
        </main>

    </>
  );
};
export default DashBoard;
