// import React, { useState } from "react";
// import "./single.scss";
// import Sidebar from "../../Components/sidebar/Sidebar";
// import Navbar from "../../Components/navbar/Navbar";
// import Chart from "../../Components/chart/Chart";
// import List from "../../Components/table/Table";

// const Single = () => {
//   const [showSidebar, setShowSidebar] = useState(false);

//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   const closeSidebar = () => {
//     setShowSidebar(false);
//   };
//   return (
//     <div className="single">
//       <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar}/>
//       <div className={`singleContainer ${showSidebar ? "sidebarOpen" : ""}`}>
//         <Navbar />
//         <div className="top">
//           <div className="left">
//             <div className="editButton">Edit</div>
//             <h1 className="title">Information</h1>
//             <div className="item">
//               <img
//                 src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
//                 alt=""
//                 className="itemImg"
//               />
//               <div className="details">
//                 <h1 className="itemTitle">Jane Doe</h1>
//                 <div className="detailItem">
//                   <span className="itemKey">Email:</span>
//                   <span className="itemValue">janedoe@gmail.com</span>
//                 </div>
//                 <div className="detailItem">
//                   <span className="itemKey">Phone:</span>
//                   <span className="itemValue">+1 2345 67 89</span>
//                 </div>
//                 <div className="detailItem">
//                   <span className="itemKey">Address:</span>
//                   <span className="itemValue">
//                     Elton St. 234 Garden Yd. NewYork
//                   </span>
//                 </div>
//                 <div className="detailItem">
//                   <span className="itemKey">Country:</span>
//                   <span className="itemValue">USA</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="right">
//             <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
//           </div>
//         </div>
//         <div className="bottom">
//         <h1 className="title">Last Transactions</h1>
//           <List/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Single;



import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { setLoginData } from "../../Features/userSlice";
import { toast } from "react-toastify";
import s from "./single.module.scss";
import Avatar from '@mui/material/Avatar';

// Default avatar image path
const DEFAULT_AVATAR = 'src/Assets/Images/Avatar.jpg'; // Replace with your default image path

const Form = () => {
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
      navigateTo("/users", { replace: true });
      toast.success("Account Added successful!");
    } catch (error) {
      toast.error("An error occurred during Account Add. Please try again.");
      console.error("Account Add error:", error);
    }
  };


  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h2>Add Account</h2>
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
        <button type="submit" className={s.createAccBtn}>Add Account</button>
      </div>
    </form>
  );
};

export default Form;
