import { Helmet } from "react-helmet-async";
import { signUpImg } from "src/Assets/Images/Images";
import useScrollOnMount from "src/Hooks/App/useScrollOnMount";
import s from "./AdminSignUp.module.scss";
import AdminAccountPage from "./SignUpForm/AdminAccountPage";

const AdminSignup = () => {
  useScrollOnMount(240);

  return (
    <>
      <Helmet>
        <title>Admin Sign up</title>
      </Helmet>

      <main className={s.signUpPage} id="signup-page">
        <div className={s.container}>
          <div className={s.imgHolder}>
            <img src={signUpImg} alt="Shopping cart and phone" />
          </div>

          <AdminAccountPage />
        </div>
      </main>
    </>
  );
};
export default AdminSignup;
