
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
