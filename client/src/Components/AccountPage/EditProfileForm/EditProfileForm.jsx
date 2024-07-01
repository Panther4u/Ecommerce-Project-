// import React, { useRef, useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateProfile } from 'src/Features/userSlice';
// import EditProfileInputs from './EditProfileInputs';
// import ProfileFormButtons from './ProfileFormButtons';
// import Avatar from '@mui/material/Avatar';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import s from './EditProfileForm.module.scss'; // Ensure styles are scoped

// const EditProfileForm = () => {
//   const dispatch = useDispatch();
//   const formRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const { loginInfo } = useSelector((state) => state.user) || {};
//   const [profileImage, setProfileImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');

//   useEffect(() => {
//     if (loginInfo && loginInfo.profileImage) {
//       setImagePreview(`http://localhost:8000/${loginInfo.profileImage}`);
//     } else {
//       setImagePreview('src/Assets/Images/Avatar.jpg'); // Replace with your default image path
//     }
//   }, [loginInfo]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!loginInfo || !loginInfo._id) {
//       toast.error('User ID is missing.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('_id', loginInfo._id);
//     formData.append('username', formRef.current.username.value);
//     formData.append('email', formRef.current.email.value);
//     formData.append('mobileNumber', formRef.current.mobileNumber.value);
//     formData.append('streetaddress', formRef.current.streetaddress.value);
//     formData.append('apartment', formRef.current.apartment.value);
//     formData.append('pincode', formRef.current.pincode.value);
//     if (profileImage) {
//       formData.append('profileImage', profileImage);
//     }

//     try {
//       await dispatch(updateProfile(formData));
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//       toast.error(error.message || 'Failed to update profile');
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file instanceof Blob) {
//       setProfileImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAvatarClick = () => {
//     fileInputRef.current.click();
//   };

//   if (!loginInfo) {
//     return null;
//   }

//   return (
//     <form ref={formRef} onSubmit={handleSubmit} className={s.profileForm} encType="multipart/form-data">
//       <div className={s.profileImageUpload}>
//         <div className={s.avatarContainer}>
//           <Avatar
//             sx={{ width: '100px', height: '100px', cursor: 'pointer' }}
//             alt={loginInfo.username}
//             src={imagePreview}
//             onClick={handleAvatarClick}
//           />
//           <div className={s.avatarOverlay} onClick={handleAvatarClick}>
//             <span className={s.uploadText}>Upload</span>
//           </div>
//         </div>
//         <input
//           type="file"
//           id="profileImage"
//           name="profileImage"
//           accept="image/*"
//           ref={fileInputRef}
//           className={s.inputFile}
//           onChange={handleImageChange}
//         />
//       </div>
//       <EditProfileInputs formRef={formRef} />
//       <ProfileFormButtons />
//     </form>
//   );
// };

// export default EditProfileForm;


import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from 'src/Features/userSlice';
import EditProfileInputs from './EditProfileInputs';
import ProfileFormButtons from './ProfileFormButtons';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './EditProfileForm.module.scss';

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const { loginInfo } = useSelector((state) => state.user) || {};
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (loginInfo && loginInfo.profileImage) {
      setImagePreview(`http://localhost:8000/${loginInfo.profileImage}`);
    } else {
      setImagePreview('src/Assets/Images/Avatar.jpg'); // Replace with your default image path
    }
  }, [loginInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginInfo || !loginInfo._id) {
      toast.error('User ID is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('_id', loginInfo._id);
    formData.append('username', formRef.current.username.value);
    formData.append('email', formRef.current.email.value);
    formData.append('mobileNumber', formRef.current.mobileNumber.value);
    formData.append('streetAddress', formRef.current.streetAddress.value);
    formData.append('townCity', formRef.current.townCity.value);
    formData.append('pincode', formRef.current.pincode.value);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      await dispatch(updateProfile(formData));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file instanceof Blob) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  if (!loginInfo) {
    return null;
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={s.profileForm} encType="multipart/form-data">
      <div className={s.profileImageUpload}>
        <div className={s.avatarContainer}>
          <Avatar
            sx={{ width: '100px', height: '100px', cursor: 'pointer' }}
            alt={loginInfo.username}
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
        />
      </div>
      <EditProfileInputs formRef={formRef} />
      <ProfileFormButtons />
    </form>
  );
};

export default EditProfileForm;
