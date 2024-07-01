// import s from "./BillingInput.module.scss";

// const BillingInput = ({ inputData }) => {
//   const {
//     label,
//     placeholder,
//     name,
//     required,
//     type,
//     value,
//     onChange,
//     autoComplete,
//   } = inputData;

//   const inputAttributes = {
//     id: name,
//     name,
//     type: type || "text",
//     placeholder: placeholder || "",
//     required: required || false,
//     value,
//     onChange,
//     autoComplete: autoComplete ? "on" : "off",
//   };

//   return (
//     <div className={s.input}>
//       <label htmlFor={name} className={required ? s.redStarLabel : ""}>
//         {label}
//       </label>
//       <input {...inputAttributes} />
//     </div>
//   );
// };
// export default BillingInput;



import React from 'react';
import s from "./BillingInput.module.scss";

const BillingInput = ({ inputData }) => {
  const {
    label,
    placeholder,
    name,
    required,
    type,
    value,
    onChange,
    readOnly, // Receive readOnly prop
    autoComplete,
  } = inputData;

  const inputAttributes = {
    id: name,
    name,
    type: type || "text",
    placeholder: placeholder || "",
    required: required || false,
    value,
    onChange,
    readOnly: readOnly || false, // Set readOnly attribute based on prop
    autoComplete: autoComplete ? "on" : "off",
  };

  return (
    <div className={s.input}>
      <label htmlFor={name} className={required ? s.redStarLabel : ""}>
        {label}
      </label>
      <input {...inputAttributes} />
    </div>
  );
};

export default BillingInput;
