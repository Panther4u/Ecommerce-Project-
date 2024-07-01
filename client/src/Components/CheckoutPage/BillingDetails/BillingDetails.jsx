// import { useTranslation } from "react-i18next";
// import CustomCheckbox from "../../Shared/MiniComponents/CustomCheckbox/CustomCheckbox";
// import s from "./BillingDetails.module.scss";
// import BillingInputs from "./BillingInputs";

// const BillingDetails = ({ inputsData: { billingValues, handleChange } }) => {
//   const { t } = useTranslation();

//   return (
//     <section className={s.billingDetailsSection}>
//       <h2>{t("billingDetails")}</h2>

//       <BillingInputs inputsData={{ billingValues, handleChange }} />

//       <CustomCheckbox
//         inputData={{
//           name: "saveInfo",
//           value: billingValues.saveInfo,
//           onchange: handleChange,
//           id: "save-info",
//         }}
//       />
//     </section>
//   );
// };
// export default BillingDetails;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CustomCheckbox from '../../Shared/MiniComponents/CustomCheckbox/CustomCheckbox';
import BillingInputs from './BillingInputs'; // Ensure correct path to BillingInputs
import s from './BillingDetails.module.scss';

const BillingDetails = ({ billingValues, setBillingValues }) => {
  const { t } = useTranslation();
  const [editable, setEditable] = useState(false); // Initialize editable state

  useEffect(() => {
    const fetchBillingInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/save-billing");
        setBillingValues(response.data); // Update billingValues state
        setEditable(!!response.data); // Determine editability based on fetched data
      } catch (error) {
        console.error("Error fetching billing information:", error);
        // Handle error fetching data
      }
    };

    fetchBillingInfo();
  }, [setBillingValues]);

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setBillingValues((prevValues) => ({
      ...prevValues,
      saveInfo: checked,
    }));
  };

  return (
    <section className={s.billingDetailsSection}>
      <h2>{t('billingDetails')}</h2>

      {/* Pass editable state to BillingInputs */}
      <BillingInputs
        billingValues={billingValues}
        setBillingValues={setBillingValues}
        editable={editable}
      />

      <CustomCheckbox
        inputData={{
          label: t('saveInfo'),
          name: 'saveInfo',
          value: billingValues.saveInfo,
          onChange: handleCheckboxChange,
          id: 'save-info',
        }}
      />
    </section>
  );
};

export default BillingDetails;
