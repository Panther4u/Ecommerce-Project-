// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import EditProfileInput from "./EditProfileInput";
// import s from "./EditProfileInputs.module.scss";

// const EditProfileInputs = () => {
//   const { loginInfo } = useSelector((state) => state.user);
//   const { username, email } = loginInfo;
//   const firstLastUserName = username.split(" ");
//   const [firstName, setFirstName] = useState(firstLastUserName[0]);
//   const [lastName, setLastName] = useState(firstLastUserName[1]);
//   const [emailState, setemailState] = useState(email);
//   const [newPassword, setNewPassword] = useState("");
//   const { t } = useTranslation();

//   return (
//     <section className={s.inputs}>
//       <section className={s.wrapper}>
//         <EditProfileInput
//           inputData={{
//             label: t("inputsLabels.firstName"),
//             name: "firstName",
//             value: firstName,
//             setValue: setFirstName,
//           }}
//         />

//         <EditProfileInput
//           inputData={{
//             label: t("inputsLabels.lastName"),
//             name: "lastName",
//             value: lastName,
//             setValue: setLastName,
//           }}
//         />

//         <EditProfileInput
//           inputData={{
//             label: t("inputsLabels.email"),
//             name: "changeEmail",
//             value: emailState,
//             setValue: setemailState,
//             placeholder: "example@gmail.com",
//           }}
//         />

//         <EditProfileInput
//           inputData={{
//             label: t("inputsLabels.address"),
//             name: "address",
//             placeholder: t("inputsPlaceholders.address"),
//           }}
//         />
//       </section>

//       <section className={s.passwordInputs}>
//         <EditProfileInput
//           inputData={{
//             type: "password",
//             label: t("inputsLabels.passwordChanges"),
//             name: "currentPass",
//             placeholder: t("inputsPlaceholders.currentPass"),
//           }}
//         />

//         <EditProfileInput
//           inputData={{
//             type: "password",
//             placeholder: t("inputsPlaceholders.newPass"),
//             value: newPassword,
//             setValue: setNewPassword,
//           }}
//         />

//         <EditProfileInput
//           inputData={{
//             type: "password",
//             placeholder: t("inputsPlaceholders.confirmPass"),
//           }}
//         />
//       </section>
//     </section>
//   );
// };
// export default EditProfileInputs;



import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditProfileInput from './EditProfileInput';
import s from './EditProfileInputs.module.scss';

const EditProfileInputs = ({ formRef }) => {
  const { loginInfo } = useSelector((state) => state.user) || {};

  const [username, setUsername] = useState(loginInfo.username || '');
  const [email, setEmail] = useState(loginInfo.email || '');
  const [streetAddress, setStreetAddress] = useState(loginInfo.streetAddress || '');
  const [townCity, setTownCity] = useState(loginInfo.townCity || '');
  const [pincode, setPincode] = useState(loginInfo.pincode || '');
  const [mobileNumber, setMobileNumber] = useState(loginInfo.mobileNumber || '');

  useEffect(() => {
    setUsername(loginInfo.username || '');
    setEmail(loginInfo.email || '');
    setStreetAddress(loginInfo.streetAddress || '');
    setTownCity(loginInfo.townCity || '');
    setPincode(loginInfo.pincode || '');
    setMobileNumber(loginInfo.mobileNumber || '');
  }, [loginInfo]);

  return (
    <div className={s.editProfileInputs}>
      <EditProfileInput
        inputData={{ label: 'Username', name: 'username', value: username, setValue: setUsername, required: true }}
      />
      <EditProfileInput
        inputData={{ label: 'Email', name: 'email', type: 'email', value: email, setValue: setEmail, required: true }}
      />
      <EditProfileInput
        inputData={{ label: 'Street Address', name: 'streetAddress', value: streetAddress, setValue: setStreetAddress, required: true }}
      />
      <EditProfileInput
        inputData={{ label: 'Town/City', name: 'townCity', value: townCity, setValue: setTownCity }}
      />
      <EditProfileInput
        inputData={{ label: 'Pincode', name: 'pincode', value: pincode, setValue: setPincode, required: true }}
      />
      <EditProfileInput
        inputData={{ label: 'Mobile Number', name: 'mobileNumber', value: mobileNumber, setValue: setMobileNumber, required: true }}
      />
    </div>
  );
};

export default EditProfileInputs;
