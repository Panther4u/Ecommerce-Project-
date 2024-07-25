// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getSubTotal } from "src/Functions/helper";
// import s from "./CartInfoMenu.module.scss";

// const CartInfoMenu = () => {
//   const { cartProducts } = useSelector((state) => state.products);
//   const subTotal = getSubTotal(cartProducts);
//   const { t } = useTranslation();
//   const cartInfo = "cartPage.cartInfoMenu";

//   return (
//     <div className={s.menu}>
//       <b>{t(`${cartInfo}.cartTotal`)}</b>

//       <div className={s.content}>
//         <div className={s.item}>
//           <span>{t(`${cartInfo}.subTotal`)}:</span>
//           <span>RS.{subTotal}</span>
//         </div>

//         <div className={s.item}>
//           <span>{t(`${cartInfo}.shipping`)}:</span>
//           <span>{t(`${cartInfo}.free`)}</span>
//         </div>

//         <div className={s.item}>
//           <span>{t(`${cartInfo}.total`)}:</span>
//           <span>RS.{subTotal}</span>
//         </div>
//       </div>

//       <Link to="/checkout">{t("buttons.processToCheckout")}</Link>
//     </div>
//   );
// };
// export default CartInfoMenu;

// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getSubTotal } from 'src/Functions/helper';
// import s from './CartInfoMenu.module.scss';

// const CartInfoMenu = () => {
//   // Select cartProducts from the Redux store
//   const cartProducts = useSelector((state) => state.products.cartProducts) || [];

//   // Calculate the subtotal
//   const subTotal = getSubTotal(cartProducts);
  
//   // Initialize translation hook
//   const { t } = useTranslation();
//   const cartInfo = 'cartPage.cartInfoMenu';

//   // Debugging: log cart products and subtotal
//   // console.log('CartInfoMenu:', cartProducts);
//   // console.log('SubTotal:', subTotal);

//   return (
//     <div className={s.menu}>
//       <b>{t(`${cartInfo}.cartTotal`)}</b>
//       <div className={s.content}>
//         <div className={s.item}>
//           <span>{t(`${cartInfo}.subTotal`)}:</span>
//           <span>RS. {subTotal}</span>
//         </div>
//         <div className={s.item}>
//           <span>{t(`${cartInfo}.shipping`)}:</span>
//           <span>{t(`${cartInfo}.free`)}</span>
//         </div>
//         <div className={s.item}>
//           <span>{t(`${cartInfo}.total`)}:</span>
//           <span>RS. {subTotal}</span>
//         </div>
//       </div>
//       <Link to="/checkout" className={s.checkoutLink}>{t('buttons.processToCheckout')}</Link>
//     </div>
//   );
// };

// export default CartInfoMenu;


import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSubTotal, calculateTotalDiscount } from 'src/Functions/helper';
import s from './CartInfoMenu.module.scss';

const CartInfoMenu = () => {
  const cartProducts = useSelector((state) => state.products.cartProducts) || [];

  // Define default coupon value
  const defaultCouponValue = 0;

  // Calculate the subtotal
  const subTotal = getSubTotal(cartProducts) || 0;

  // Calculate total discount
  const totalDiscount = calculateTotalDiscount(cartProducts) || 0;

  // Calculate the total after discount
  const totalAfterDiscount = subTotal - totalDiscount;

  return (
    <div className={s.menu}>
      <b>Cart Total</b>
      <div className={s.content}>
        <div className={s.item}>
          <span>Subtotal:</span>
          <span>RS. {subTotal.toFixed(2)}</span>
        </div>
        <div className={s.item}>
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className={`${s.item} ${s.discount}`}>
          <span>Total Discount:</span>
          <span className={s.value}>RS. {totalDiscount.toFixed(2)}</span>
        </div>
        <div className={s.items}>
          <span>Total:</span>
          <span>RS. {totalAfterDiscount.toFixed(2)}</span>
        </div>
      </div>
      <Link to="/checkout" className={s.checkoutLink}>Proceed to Checkout</Link>
    </div>
  );
};

export default CartInfoMenu;
