// import { useTranslation } from "react-i18next";
// import { billingInputsData } from "../../../Data/staticData";
// import BillingInput from "./BillingInput";
// import s from "./BillingInputs.module.scss";

// const BillingInputs = ({ inputsData: { billingValues, handleChange } }) => {
//   const { t } = useTranslation();

//   return (
//     <div className={s.inputs}>
//       {billingInputsData.map(({ translationKey, name, type, required, id }) => {
//         const inputData = {
//           value: billingValues[translationKey],
//           name,
//           label: t(`inputsLabels.${translationKey}`),
//           required,
//           type,
//           onChange: handleChange,
//         };

//         return <BillingInput key={id} inputData={inputData} />;
//       })}
//     </div>
//   );
// };
// export default BillingInputs;

import React from 'react';
import { useTranslation } from 'react-i18next';
import BillingInput from './BillingInput';
import s from './BillingInputs.module.scss';

const BillingInputs = ({ billingValues, setBillingValues, editable }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className={s.inputs}>
      <BillingInput
        inputData={{
          label: t("First Name"),
          name: "firstName",
          value: billingValues.firstName || "",
          onChange: handleChange,
          readOnly: !editable,
        }}
      />
      <BillingInput
        inputData={{
          label: t("Street Address"),
          name: "streetAddress",
          value: billingValues.streetAddress || "",
          onChange: handleChange,
          readOnly: !editable,
        }}
      />
      <BillingInput
        inputData={{
          label: t("Town/City"),
          name: "townCity",
          value: billingValues.townCity || "",
          onChange: handleChange,
          readOnly: !editable,
        }}
      />
      <BillingInput
        inputData={{
          label: "Apartment",
          name: "apartment",
          value: billingValues.apartment || "",
          onChange: handleChange,
          readOnly: !editable,
        }}
      />
      <BillingInput
        inputData={{
          label: "Pincode",
          name: "pincode",
          value: billingValues.pincode || "",
          onChange: handleChange,
          readOnly: !editable,
        }}
      />
      <BillingInput
        inputData={{
          label: t("Mobile Number"),
          name: "mobileNumber",
          value: billingValues.mobileNumber || "",
          onChange: handleChange,
          readOnly: !editable,
        }}
      />
    </div>
  );
};

export default BillingInputs;
