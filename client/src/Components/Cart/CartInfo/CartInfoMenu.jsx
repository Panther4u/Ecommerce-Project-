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

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSubTotal } from "src/Functions/helper"; // Assuming you have a helper function to calculate subtotal
import s from "./CartInfoMenu.module.scss";

const CartInfoMenu = () => {
  const { cartProducts } = useSelector((state) => state.products); // Assuming products are stored in Redux state
  const { couponDiscount } = useSelector((state) => state.cart); // Assuming coupon discount is stored in cart slice of Redux state
  const subTotal = getSubTotal(cartProducts); // Calculate subtotal using helper function
  const discountAmount = (subTotal * couponDiscount) / 100; // Calculate discount amount based on percentage
  const total = subTotal - discountAmount; // Calculate total after applying coupon discount

  // Function to format currency values to two decimal places
  const formatCurrency = (value) => {
    if (typeof value === 'number') {
      return value.toFixed(2); // Round to 2 decimal places if value is a number
    }
    return value; // Return as is if value is not a number
  };

  return (
    <div className={s.menu}>
      <b>Cart Total</b>

      <div className={s.content}>
        <div className={s.item}>
          <span>Subtotal:</span>
          <span>RS.{formatCurrency(subTotal)}</span>
        </div>

        {couponDiscount > 0 && ( // Render coupon discount only if there's a discount applied
          <div className={s.item}>
            <span>Coupon Discount:</span>
            <span>- RS.{formatCurrency(discountAmount)}</span>
          </div>
        )}

        <div className={s.item}>
          <span>Total:</span>
          <span>RS.{formatCurrency(total)}</span>
        </div>
      </div>

      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
};

export default CartInfoMenu;
