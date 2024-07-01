// import { useRef } from "react";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useNavigate } from "react-router-dom";
// import { googleIcon } from "src/Assets/Images/Images";
// import { newSignUp, setLoginData } from "src/Features/userSlice";
// import { simpleValidationCheck } from "src/Functions/componentsFunctions";
// import {
//   compareDataToObjValue,
//   getUniqueArrayByObjectKey,
// } from "src/Functions/helper";
// import { openSignWithGooglePopUp } from "../SignUpWithGoogle/SignUpWithGooglePopup";
// import s from "./SignUpForm.module.scss";

// const SignUpForm = () => {
//   const dispatch = useDispatch();
//   const navigateTo = useNavigate();
//   const { t } = useTranslation();
//   const { signedUpUsers } = useSelector((state) => state.user);
//   const username = useRef("");
//   const email = useRef("");
//   const password = useRef("");
//   let isSignUpWithGooglePressed = false;

//   function signUp(e) {
//     e.preventDefault();
//     const inputs = e.target.querySelectorAll("input");
//     const formDataObj = new FormData(e.target);
//     const formData = {};

//     // Set keys and values from formDataObj to formData
//     for (let pair of formDataObj.entries()) formData[pair[0]] = pair[1];

//     const isFormValid = simpleValidationCheck(inputs);

//     if (isFormValid) {
//       const isUserAlreadySignedUp = compareDataToObjValue(
//         signedUpUsers,
//         formData,
//         "email"
//       );
//       if (isUserAlreadySignedUp) return;

//       const uniqueSignedUpUsers = getUniqueArrayByObjectKey({
//         arr: signedUpUsers,
//         newArr: [formData],
//         key: "email",
//       });

//       dispatch(newSignUp(uniqueSignedUpUsers));
//       dispatch(setLoginData(formData));
//       navigateTo("/", { replace: true });
//     }
//   }

//   function handleSignUpWithGoogle() {
//     if (isSignUpWithGooglePressed) return;
//     isSignUpWithGooglePressed = true;

//     openSignWithGooglePopUp();
//     setDefaultSignUpData();
//   }

//   function setDefaultSignUpData() {
//     const defaultLoginData = {
//       username: "Lily Watson",
//       email: "lily.wastons@gmail.com",
//       password: "random-password1234",
//       isSignIn: true,
//     };

//     setTimeout(() => {
//       navigateTo("/");
//       isSignUpWithGooglePressed = false;

//       setTimeout(() => dispatch(setLoginData(defaultLoginData)), 500);
//     }, 2500);
//   }

//   return (
//     <form action="GET" className={s.form} onSubmit={signUp}>
//       <h2>{t("loginSignUpPage.createAccount")}</h2>
//       <p>{t("loginSignUpPage.enterDetails")}</p>

//       <div className={s.inputs}>
//         <input
//           type="text"
//           name="username"
//           placeholder={t("inputsPlaceholders.fullName")}
//           onChange={(e) => (username.current = e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           name="email"
//           placeholder={t("inputsPlaceholders.email")}
//           onChange={(e) => (email.current = e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder={t("inputsPlaceholders.password")}
//           onChange={(e) => (password.current = e.target.value)}
//           required
//         />
//       </div>

//       <div className={s.buttons}>
//         <button type="submit" className={s.createAccBtn}>
//           {t("buttons.createAccount")}
//         </button>

//         <button
//           type="button"
//           className={s.signUpBtn}
//           onClick={handleSignUpWithGoogle}
//         >
//           <img src={googleIcon} alt="Colored Google icon" />
//           <span>{t("buttons.signUpWithGoogle")}</span>
//         </button>

//         <p>
//           <span>{t("loginSignUpPage.alreadyHaveAcc")}</span>
//           <NavLink to="/login">{t("buttons.login")}</NavLink>
//         </p>
//       </div>
//     </form>
//   );
// };
// export default SignUpForm;import { googleLogin } from "src/api/index.js";

// SignUpForm.jsx

// import React, { useRef } from "react";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { newSignUp, setLoginData } from "src/Features/userSlice";
// import { simpleValidationCheck } from "src/Functions/componentsFunctions";
// import { googleLogin, signUp } from "src/api/index.js";
// import { googleIcon } from "src/Assets/Images/Images";
// import s from "./SignUpForm.module.scss";

// const SignUpForm = () => {
//   const dispatch = useDispatch();
//   const navigateTo = useNavigate();
//   const { t } = useTranslation();
//   const { signedUpUsers } = useSelector((state) => state.user);
//   const username = useRef("");
//   const email = useRef("");
//   const password = useRef("");
//   let isSignUpWithGooglePressed = false;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataObj = new FormData(e.target);
//     const formData = {};

//     for (let pair of formDataObj.entries()) formData[pair[0]] = pair[1];

//     const isFormValid = simpleValidationCheck(e.target.querySelectorAll("input"));

//     if (isFormValid) {
//       try {
//         // Call the signUp function from the API file
//         await signUp(formData);
//         alert("Account created successfully");
//       } catch (error) {
//         console.error("Error creating account:", error);
//         alert("Error creating account. Please try again.");
//       }
//     }
//   };

//   async function handleSignUpWithGoogle() {
//     if (isSignUpWithGooglePressed) return;
//     isSignUpWithGooglePressed = true;

//     try {
//       const auth2 = window.gapi.auth2.getAuthInstance();
//       if (!auth2) {
//         throw new Error("Google Auth2 not initialized");
//       }
//       console.log("Google Auth2 initialized");

//       const googleUser = await new Promise((resolve, reject) => {
//         auth2.signIn({ prompt: "select_account" }).then(
//           (user) => resolve(user),
//           (error) => reject(error)
//         );
//       });

//       if (googleUser.isSignedIn()) {
//         const idToken = googleUser.getAuthResponse().id_token;
//         console.log("ID Token:", idToken);

//         const response = await googleLogin(idToken);
//         console.log("Google Login response:", response);

//         dispatch(setLoginData(response.data));
//         navigateTo("/", { replace: true });
//       } else {
//         console.log("User canceled Google Sign-In.");
//       }
//     } catch (error) {
//       if (error.error === "popup_closed_by_user") {
//         console.log("User closed Google Sign-In popup.");
//       } else {
//         console.error("Error logging in with Google", error);
//       }
//     } finally {
//       isSignUpWithGooglePressed = false;
//     }
//   }

//   return (
//     <form action="GET" className={s.form} onSubmit={handleSubmit}>
//       <h2>{t("loginSignUpPage.createAccount")}</h2>
//       <p>{t("loginSignUpPage.enterDetails")}</p>

//       <div className={s.inputs}>
//         <input
//           type="text"
//           name="username"
//           placeholder={t("inputsPlaceholders.fullName")}
//           onChange={(e) => (username.current = e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           name="email"
//           placeholder={t("inputsPlaceholders.email")}
//           onChange={(e) => (email.current = e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder={t("inputsPlaceholders.password")}
//           onChange={(e) => (password.current = e.target.value)}
//           required
//         />
//       </div>

      // <div className={s.buttons}>
      //   <button type="submit" className={s.createAccBtn}>
      //     {t("buttons.createAccount")}
      //   </button>

      //   <button
      //     type="button"
      //     className={s.signUpBtn}
      //     onClick={handleSignUpWithGoogle}
      //   >
      //     <img src={googleIcon} alt="Colored Google icon" />
      //     <span>{t("buttons.signUpWithGoogle")}</span>
      //   </button>

        // <p>
        //   <span>{t("loginSignUpPage.alreadyHaveAcc")}</span>
        //   <NavLink to="/login">{t("buttons.login")}</NavLink>
        // </p>
      // </div>
//     </form>
//   );
// };






// import React, { useRef, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, NavLink } from "react-router-dom";
// import axios from "axios";
// import { setLoginData } from "../../../Features/userSlice";
// import { googleIcon } from "src/Assets/Images/Images";
// import { toast } from "react-toastify";
// import s from "./SignUpForm.module.scss";

// const SignUpForm = () => {
//   const dispatch = useDispatch();
//   const navigateTo = useNavigate();
//   const username = useRef("");
//   const email = useRef("");
//   const password = useRef("");
//   const [error, setError] = useState(null);

//   const handleSignUpWithGoogle = async () => {
//     try {
//       // Load Google API script dynamically
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/platform.js';
//       script.onload = async () => {
//         // Initialize Google Auth2
//         await window.gapi.load('auth2', async () => {
//           try {
//             const auth2 = await window.gapi.auth2.init({
//               client_id: '744223957530-qkbi4bbt7fv5ffr7ua5kv0cetgr07abs.apps.googleusercontent.com',
//             });
            
//             // Sign in with Google
//             const googleUser = await auth2.signIn();
//             const idToken = googleUser.getAuthResponse().id_token;

//             // Send token to backend for verification
//             const response = await axios.post('http://localhost:8000/auth/google', { token: idToken });

//             // Handle successful sign-up with Google
//           } catch (error) {
//             toast.error('An error occurred during Google Sign-In. Please try again.');
//             console.error('Google Sign-In error:', error);
//           }
//         });
//       };
//       document.body.appendChild(script);
//     } catch (error) {
//       toast.error('Failed to load Google API. Please try again later.');
//       console.error('Google API loading error:', error);
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = {
//         username: username.current.value,
//         email: email.current.value,
//         password: password.current.value,
//       };
//       console.log('Form Data:', formData); // Log form data
  
//       const response = await axios.post('http://localhost:8000/auth/signup', formData);
//       dispatch(setLoginData(response.data));
//       localStorage.setItem("userSliceData", JSON.stringify(response.data));
//       navigateTo("/", { replace: true });
//       toast.success("Sign up successful!");
//     } catch (error) {
//       toast.error("An error occurred during sign-up. Please try again.");
//       console.error("Sign-Up error:", error);
//     }
//   };
  
//   return (
//     <form className={s.form} onSubmit={handleSubmit}>
//       <h2>Create Account</h2>
//       {/* {error && <p className={s.error}>{error}</p>} */}
//       <div className={s.inputs}>
//         <input type="text" name="username" placeholder="Full Name" ref={username} required />
//         <input type="text" name="email" placeholder="Email" ref={email} required />
//         <input type="password" name="password" placeholder="Password" ref={password} required />
//       </div>
//       <div className={s.buttons}>
//         <button type="submit" className={s.createAccBtn}>Create Account</button>
//         <button type="button" className={s.signUpBtn} onClick={handleSignUpWithGoogle}>
//           <img src={googleIcon} alt="Google icon" />
//           <span>Sign Up with Google</span>
//         </button>
//         <p>
//           <span>Already have an account?</span>
//           <NavLink to="/login">Login</NavLink>
//         </p>
//       </div>
//     </form>
//   );
// };

// export default SignUpForm;


import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { setLoginData } from "../../../Features/userSlice";
import { googleIcon } from "src/Assets/Images/Images";
import { toast } from "react-toastify";
import s from "./SignUpForm.module.scss";
import Avatar from '@mui/material/Avatar';

// Default avatar image path
const DEFAULT_AVATAR = 'src/Assets/Images/Avatar.jpg'; // Replace with your default image path

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const mobileNumberRef = useRef("");
  const streetAddressRef = useRef("");
  const townCityRef = useRef("");
  const pincodeRef = useRef("");
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSignUpWithGoogle = async () => {
    try {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.async = true;
      script.defer = true;
      script.onload = async () => {
        await window.gapi.load('auth2', async () => {
          try {
            const auth2 = await window.gapi.auth2.init({
              client_id: '744223957530-qkbi4bbt7fv5ffr7ua5kv0cetgr07abs.apps.googleusercontent.com',
            });
            const googleUser = await auth2.signIn();
            const idToken = googleUser.getAuthResponse().id_token;
            const response = await axios.post('http://localhost:8000/auth/google', { token: idToken });
            dispatch(setLoginData(response.data));
            localStorage.setItem("userSliceData", JSON.stringify(response.data));
            navigateTo("/", { replace: true });
            toast.success("Sign up with Google successful!");
          } catch (error) {
            toast.error('An error occurred during Google Sign-In. Please try again.');
            console.error('Google Sign-In error:', error);
          }
        });
      };
      document.body.appendChild(script);
    } catch (error) {
      toast.error('Failed to load Google API. Please try again later.');
      console.error('Google API loading error:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImage', fileInputRef.current.files[0]);
    formData.append('username', usernameRef.current.value);
    formData.append('email', emailRef.current.value);
    formData.append('password', passwordRef.current.value);
    formData.append('mobileNumber', mobileNumberRef.current.value);
    formData.append('streetaddress', streetAddressRef.current.value);
    formData.append('towncity', townCityRef.current.value);
    formData.append('pincode', pincodeRef.current.value);

    try {
      const response = await axios.post('http://localhost:8000/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { userId } = response.data; // Extract userId from response
      dispatch(setLoginData({ ...response.data, userId }));
      localStorage.setItem("userSliceData", JSON.stringify({ ...response.data, userId }));
      navigateTo("/", { replace: true });
      toast.success("Sign up successful!");
    } catch (error) {
      toast.error("An error occurred during sign-up. Please try again.");
      console.error("Sign-Up error:", error);
    }
  };


  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <div className={s.profileImageUpload}>
        <div className={s.avatarContainer}>
          <Avatar
            sx={{ width: '100px', height: '100px', cursor: 'pointer' }}
            src={imagePreview || DEFAULT_AVATAR}
            onClick={handleAvatarClick}
          />
          <div className={s.avatarOverlay} onClick={handleAvatarClick}>
            <span className={s.uploadText}>Upload</span>
          </div>
        </div>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
          ref={fileInputRef}
          className={s.inputFile}
          onChange={handleImageChange}
          style={{ display: 'none' }} // Hide the input
        />
      </div>
      <div className={s.inputs}>
        <input type="text" name="username" placeholder="Full Name" ref={usernameRef} required />
        <input type="text" name="email" placeholder="Email" ref={emailRef} required />
        <input type="password" name="password" placeholder="Password" ref={passwordRef} required />
        <input type="text" name="mobileNumber" placeholder="Mobile Number" ref={mobileNumberRef} required />
        <input type="text" name="streetAddress" placeholder="streetAddress" ref={streetAddressRef}/>
        <input type="text" name="towncity" placeholder="town/city" ref={townCityRef} />
        <input type="text" name="pincode" placeholder="Pincode" ref={pincodeRef} />
      </div>
      <div className={s.buttons}>
        <button type="submit" className={s.createAccBtn}>Create Account</button>
        <button type="button" className={s.signUpBtn} onClick={handleSignUpWithGoogle}>
          <img src={googleIcon} alt="Google icon" />
          <span>Sign Up with Google</span>
        </button>
        <span className={s.buttons}>
          <p>
          <span>Already have an account?</span>
          <NavLink to="/login">Login !</NavLink>
        </p>
          <p>
            <span>Admin Create account</span>
            <NavLink to="/adminsignup">Admin Signup !</NavLink>
          </p>
        </span>

      </div>
    </form>
  );
};

export default SignUpForm;
