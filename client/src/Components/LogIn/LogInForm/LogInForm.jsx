// import { useRef } from "react";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { newSignUp } from "src/Features/userSlice";
// import { simpleValidationCheck } from "src/Functions/componentsFunctions";
// import s from "./LogInForm.module.scss";

// const LogInForm = () => {
//   const navigateTo = useNavigate();
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const { signedUpUsers } = useSelector((state) => state.user);
//   const email = useRef();
//   const password = useRef();

//   function login(e) {
//     const inputs = e.target.querySelectorAll("input");
//     e.preventDefault();

//     const isFormValid = simpleValidationCheck(inputs);
//     if (!isFormValid) return;

//     const dataByEmail = filterLoginByemail();
//     const isCorrectLoginData = checkLoginPassword(dataByEmail);

//     const formDataObj = new FormData(e.target);
//     const formData = {};

//     // Set keys and values from formDataObj to formData
//     for (let pair of formDataObj.entries()) formData[pair[0]] = pair[1];

//     if (isCorrectLoginData) {
//       dispatch(newSignUp(signedUpUsers));
//       navigateTo("/", { replace: true });
//     }
//   }

//   function filterLoginByemail() {
//     return signedUpUsers?.filter(
//       (user) => user.email === email.current
//     );
//   }

//   function checkLoginPassword(filteredUsersData) {
//     const isPasswordValid = filteredUsersData[0]?.password === password.current;
//     return isPasswordValid;
//   }

//   return (
//     <form className={s.form} onSubmit={login}>
//       <h2></h2>
//       <h2>{t("loginSignUpPage.login")}</h2>
//       <p>{t("loginSignUpPage.enterDetails")}</p>

//       <div className={s.inputs}>
//         <input
//           type="text"
//           name="email"
//           placeholder={t("inputsPlaceholders.email")}
//           onChange={(e) => (email.current = e.target.value)}
//         />
//         <input
//           type="password"
//           name="Password"
//           placeholder={t("inputsPlaceholders.password")}
//           onChange={(e) => (password.current = e.target.value)}
//         />
//       </div>

//       <div className={s.buttons}>
//         <button type="submit" className={s.loginBtn}>
//           {t("buttons.login")}
//         </button>
//         <a href="#">{t("loginSignUpPage.forgotPassword")}</a>
//       </div>
//     </form>
//   );
// };
// export default LogInForm;


import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { newSignUp } from "src/Features/userSlice";
import { simpleValidationCheck } from "src/Functions/componentsFunctions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./LogInForm.module.scss";

const LogInForm = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const emailRef = useRef();
  const passwordRef = useRef();

  async function login(e) {
    e.preventDefault();

    const inputs = e.target.querySelectorAll("input");
    const isFormValid = simpleValidationCheck(inputs);
    if (!isFormValid) return;

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch(newSignUp(response.data.user));
      localStorage.setItem('token', response.data.token);

      // Determine redirect based on user role
      if (response.data.user.role === "admin") {
        navigateTo("/dashboard", { replace: true });
      } else {
        navigateTo("/", { replace: true });
      }

      // Construct welcome message with username
      const username = response.data.user.username;
      const welcomeMessage = `Welcome, ${username}!`;

      // Hide loading animation and show custom success message
      toast.success(welcomeMessage);

    } catch (error) {
      console.error("Error:", error); // Log the error for debugging
      setError(error.response?.data.message || "Error logging in. Please try again.");
      toast.error("Error logging in. Please try again.");
    }
  }

  return (
    <form className={s.form} onSubmit={login}>
      <h2>{t("loginSignUpPage.login")}</h2>
      <p>{t("loginSignUpPage.enterDetails")}</p>

      <div className={s.inputs}>
        <input
          type="text"
          name="email"
          placeholder={t("Enter Your Email")}
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          placeholder={t("inputsPlaceholders.password")}
          ref={passwordRef}
        />
      </div>

      {error && <p className={s.error}>{error}</p>}

      <div className={s.buttons}>
        <button type="submit" className={s.loginBtn}>
          {t("buttons.login")}
        </button>
        <Link to="/forgotpassword">{t("loginSignUpPage.forgotPassword")}</Link>
      </div>
    </form>
  );
};

export default LogInForm;
