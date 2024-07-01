import s from "./EditProfileInput.module.scss";

const EditProfileInput = ({
  inputData: {
    label,
    name,
    type = "text",
    value,
    setValue,
    required = false,
    autoComplete = false,
    placeholder = "",
  },
}) => {
  return (
    <div className={s.input}>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        type={type}
        name={name}
        // id={name}
        value={value?.length === 0 ? "" : value}
        required={required}
        autoComplete={"on"}
        onChange={setValue ? (e) => setValue(e.target.value) : null}
        placeholder={placeholder}
      />
    </div>
  );
};
export default EditProfileInput;



// import React from 'react';
// import PropTypes from 'prop-types';
// import s from './EditProfileInput.module.scss'; // Ensure correct path

// const EditProfileInput = ({ inputData }) => {
//   const { label, name, type = 'text', value, setValue, required, isFile } = inputData;

//   return (
//     <div className={s.inputData}>
//       <label htmlFor={name}>{label}</label>
//       <input
//         id={name}
//         name={name}
//         type={type}
//         value={isFile ? undefined : value}
//         onChange={(e) => isFile ? setValue(e.target.files[0]) : setValue(e.target.value)}
//         required={required}
//         accept={isFile ? 'image/*' : undefined}
//       />
//     </div>
//   );
// };

// EditProfileInput.propTypes = {
//   inputData: PropTypes.shape({
//     label: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     type: PropTypes.string,
//     value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
//     setValue: PropTypes.func.isRequired,
//     required: PropTypes.bool,
//     isFile: PropTypes.bool,
//   }).isRequired,
// };

// export default EditProfileInput;
