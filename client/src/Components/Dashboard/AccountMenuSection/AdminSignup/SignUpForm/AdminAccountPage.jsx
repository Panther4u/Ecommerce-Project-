import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import s from "./AdminAccountPage.module.scss";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar'; // Make sure to install @material-ui/core
import DEFAULT_AVATAR from "src/Assets/Images/Avatar.jpg"; // Provide the correct path to the default avatar

const AdminAccountPage = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(DEFAULT_AVATAR);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", usernameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("password", passwordRef.current.value);
    formData.append("role", "admin"); // Assuming you set role as "admin" for new admin accounts
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }

    try {
      // Make a POST request to create a new admin account
      const response = await axios.post("http://localhost:8000/api/admin/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Optionally, dispatch or handle response data if needed
      dispatch({ type: "ADMIN_ACCOUNT_CREATED", payload: response.data });

      toast.success("Admin account created successfully!");
      navigateTo("/dashboard"); // Navigate to dashboard or any other page
    } catch (error) {
      toast.error("Failed to create admin account. Please try again.");
      console.error("Admin account creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <div className={s.profileImageUpload}>
        <div className={s.avatarContainer}>
          <Avatar
            sx={{ width: '100px', height: '100px', cursor: 'pointer' }}
            src={imagePreview}
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
      </div>
      <div className={s.buttons}>
        <button type="submit" className={s.createAccBtn}>Create Account</button>
      </div>
    </form>
  );
};

export default AdminAccountPage;
