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
import { getSubTotal, calculateTotalDiscount } from 'src/Functions/helper';
import s from './PaymentCalculation.module.scss';

const PaymentCalculation = ({ setTotalAmount }) => {
  const { cartProducts } = useSelector((state) => state.products);
  const couponDiscount = useSelector((state) => state.cart.couponDiscount) || 0;

  // Calculate subtotal and total discount
  const subTotal = parseFloat(getSubTotal(cartProducts)) || 0;
  const totalDiscount = calculateTotalDiscount(cartProducts) || 0;
  
  // Apply coupon discount to subtotal
  const discountAmount = (subTotal * couponDiscount) / 100; // Ensure this calculation is correct
  const totalAfterDiscount = subTotal - totalDiscount - discountAmount;

  useEffect(() => {
    setTotalAmount(totalAfterDiscount);
  }, [totalAfterDiscount, setTotalAmount]);

  const { t } = useTranslation();
  const cartInfo = t('cartPage.cartInfoMenu'); // Localization key for cart info

  // Format currency value
  const formatCurrency = (value) => {
    return typeof value === 'number' ? value.toFixed(2) : '0.00';
  };

  return (
    <div className={s.menu}>
      <div className={s.content}>
        <div className={s.item}>
          <span>Total Products:</span>
          <span>{cartProducts.length}</span>
        </div>
        <div className={s.item}>
          <span>Total MRP : </span>
          <span>₹ {subTotal.toFixed(2)}</span>
        </div>

        <div className={`${s.item} ${s.discount}`}>
          <span>Total Discount:</span>
          <span className={s.value}>₹ {formatCurrency(totalDiscount)}</span>
        </div>

        <div className={`${s.item} ${s.discount}`}>
          <span>Coupon Discount:</span>
          <span className={s.value}>₹ {formatCurrency(discountAmount)}</span>
        </div>
        
        <div className={s.item}>
          <span>Shipping:</span>
          <span>Free</span>
        </div>

        <div className={s.items}>
          <span>Total:</span>
          <span>₹ {formatCurrency(totalAfterDiscount)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentCalculation;
