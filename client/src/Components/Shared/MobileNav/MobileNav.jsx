import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { mobileNavData } from 'src/Data/staticData';
import useSignOut from 'src/Hooks/App/useSignOut';
import SvgIcon from '../MiniComponents/SvgIcon';
import s from './MobileNav.module.scss';
import axios from 'axios';
import { signOut } from '../../../Features/userSlice'; // Assuming this is your userSlice where signOut action is defined
import Avatar from "src/Assets/Images/Avatar.jpg";

const MobileNav = () => {
  const dispatch = useDispatch();
  const { isMobileMenuActive } = useSelector((state) => state.global);
  const { loginInfo } = useSelector((state) => state.user);
  const { username, isSignIn, role } = loginInfo || {};
  const [profileImage, setProfileImage] = useState(null);

  // useEffect(() => {
  //   const fetchProfileImage = async () => {
  //     if (username) {
  //       try {
  //         const endpoint = role === 'admin' ? `http://localhost:8000/admin/${username}` : `http://localhost:8000/user/${username}`;
  //         const response = await axios.get(endpoint);
  //         setProfileImage(response.data.profileImage);
  //       } catch (error) {
  //         console.error('Error fetching user data:', error);
  //         setProfileImage(null); // Reset profile image on error
  //       }
  //     } else {
  //       setProfileImage(null); // Reset profile image when username is empty
  //     }
  //   };

  //   fetchProfileImage();
  // }, [username, role]);

  const handleUserSignOut = () => {
    dispatch(signOut()); // Dispatch signOut action to clear user state
    setProfileImage(null); // Reset profile image when signing out
  };

  const formatName = (str) => {
    const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    const camelCased = str
      .split(" ")
      .map((word, index) => (index !== 0 ? capitalize(word) : word.toLowerCase()))
      .join("");

    return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
  };

  const filteredNavData = mobileNavData.filter(({ name }) => {
    if (name === 'Dashboard') {
      return role === 'admin';
    }
    return true;
  });

  return (
    <div className={`${s.mobileMenu} ${isMobileMenuActive ? s.active : ""}`}>
      <div className={s.userInfo}>
        <Link to="/profile" title="Profile" className={s.img}>
          {profileImage ? (
            <img src={`http://localhost:8000/${profileImage}`} alt="user's picture" />
          ) : (
            <img src={Avatar} alt="default user picture" />
          )}
        </Link>
        <p>
          <Link to="/profile" title="Profile" className={s.userName}>
            {username}
          </Link>
        </p>
      </div>

      <nav className={s.navLinks}>
        <ul>
          {filteredNavData.map(({ name, link, icon, requiteSignIn }, index) => {
            const shouldShow = requiteSignIn ? isSignIn : true;
            if (!shouldShow) return null;

            return (
              <li key={`mobile-nav-link-${index}`}>
                <NavLink to={link}>
                  <SvgIcon name={icon} />
                  <span>{formatName(name)}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <hr className={s.line} />

      {isSignIn ? (
        <button className={s.signOutButton} type="button" onClick={handleUserSignOut}>
          <SvgIcon name="boxArrowRight" />
          <span>Sign Out</span>
        </button>
      ) : (
        <Link to="/signup" className={s.signOutButton}>
          <SvgIcon name="boxArrowRight" />
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default MobileNav;
