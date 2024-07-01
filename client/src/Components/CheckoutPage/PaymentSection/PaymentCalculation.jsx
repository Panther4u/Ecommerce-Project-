// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import { getSubTotal } from "src/Functions/helper";
// import s from "./PaymentCalculation.module.scss";

// const PaymentCalculation = () => {
//   const { cartProducts } = useSelector((state) => state.products);
//   const subTotal = getSubTotal(cartProducts);
//   const { t } = useTranslation();
//   const cartInfo = "cartPage.cartInfoMenu";

//   return (
//     <div className={s.calculationInfo}>
//       <div className={s.item}>
//         <span>{t(`${cartInfo}.subTotal`)}:</span>
//         <span>${subTotal}</span>
//       </div>

//       <div className={s.item}>
//         <span>{t(`${cartInfo}.shipping`)}:</span>
//         <span>{t(`${cartInfo}.free`)}</span>
//       </div>

//       <div className={s.item}>
//         <span>{t(`${cartInfo}.total`)}:</span>
//         <span>${subTotal}</span>
//       </div>
//     </div>
//   );
// };
// export default PaymentCalculation;



import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getSubTotal } from "src/Functions/helper";
import s from "./PaymentCalculation.module.scss";

const PaymentCalculation = () => {
  const { cartProducts } = useSelector((state) => state.products);
  const { couponDiscount } = useSelector((state) => state.cart); // Assuming coupon discount is stored in cart slice of Redux state
  const subTotal = getSubTotal(cartProducts); // Calculate subtotal using helper function
  const discountAmount = (subTotal * couponDiscount) / 100; // Calculate discount amount based on percentage
  const total = subTotal - discountAmount; // Calculate total after applying coupon discount
  const { t } = useTranslation();
  const cartInfo = "cartPage.cartInfoMenu";

  // Function to format currency values to two decimal places
  const formatCurrency = (value) => {
    if (typeof value === 'number') {
      return value.toFixed(2); // Round to 2 decimal places if value is a number
    }
    return value; // Return as is if value is not a number
  };

  return (
    <div className={s.calculationInfo}>
      <div className={s.item}>
        <span>{t(`${cartInfo}.subTotal`)}:</span>
        <span>RS.{formatCurrency(subTotal)}</span>
      </div>

      <div className={s.item}>
        <span>{t(`${cartInfo}.shipping`)}:</span>
        <span>{t(`${cartInfo}.free`)}</span>
      </div>

      <div className={s.item}>
        <span>{t(`${cartInfo}.total`)}:</span>
        <span>RS.{formatCurrency(total)}</span> {/* Display formatted total */}
      </div>
    </div>
  );
};

export default PaymentCalculation;
