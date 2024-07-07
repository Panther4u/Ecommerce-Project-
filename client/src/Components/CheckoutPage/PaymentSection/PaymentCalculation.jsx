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


import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getSubTotal } from 'src/Functions/helper'; // Assuming helper function for subtotal calculation
import s from './PaymentCalculation.module.scss';

const PaymentCalculation = ({ setTotalAmount }) => {
  const { cartProducts } = useSelector((state) => state.products);
  const { couponDiscount } = useSelector((state) => state.cart);

  const subTotal = getSubTotal(cartProducts);
  const discountAmount = (subTotal * couponDiscount) / 100;
  const total = subTotal - discountAmount;

  useEffect(() => {
    setTotalAmount(total);
  }, [total, setTotalAmount]);

  const { t } = useTranslation();
  const cartInfo = 'cartPage.cartInfoMenu';

  const formatCurrency = (value) => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value;
  };

  return (
    <div className={s.calculationInfo}>
      <div className={s.item}>
        <span>{t(`${cartInfo}.subTotal`)}:</span>
        <span>RS.{formatCurrency(subTotal)}</span>
      </div>

      <div className={s.item}>
        <span>Total Products:</span>
        <span>{cartProducts.length}</span>
      </div>

      <div className={s.item}>
        <span>{t(`${cartInfo}.shipping`)}:</span>
        <span>{t(`${cartInfo}.free`)}</span>
      </div>

      <div className={s.item}>
        <span>{t(`${cartInfo}.total`)}:</span>
        <span>RS.{formatCurrency(total)}</span>
      </div>

      <div className={s.item}>
        <span>Delivery Method:</span>
        <span>Express Delivery</span>
      </div>
    </div>
  );
};

export default PaymentCalculation;
