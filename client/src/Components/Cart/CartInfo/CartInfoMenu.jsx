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







// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { applyCoupon } from 'src/Features/cartSlice'; // Import the action
// import { getSubTotal, calculateTotalDiscount } from 'src/Functions/helper';
// import CouponModal from './CouponModal';
// import s from './CartInfoMenu.module.scss';

// const CartInfoMenu = () => {
//   const dispatch = useDispatch();
//   const [isModalOpen, setIsModalOpen] = React.useState(false);

//   const cartProducts = useSelector((state) => state.products.cartProducts) || [];
//   const appliedCoupon = useSelector((state) => state.products.appliedCoupon);
//   const discount = useSelector((state) => state.products.discount);

//   const subTotal = getSubTotal(cartProducts) || 0;
//   const totalDiscount = calculateTotalDiscount(cartProducts) || 0;
//   const totalAfterDiscount = subTotal - totalDiscount - discount;

//   useEffect(() => {
//     // Initialize coupon details on component mount
//     const storedCoupon = localStorage.getItem('couponCode');
//     const storedDiscount = parseFloat(localStorage.getItem('couponDiscount')) || 0;

//     if (storedCoupon) {
//       dispatch(applyCoupon({ couponCode: storedCoupon, discount: storedDiscount }));
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     // Store coupon information in localStorage whenever it changes
//     localStorage.setItem('couponCode', appliedCoupon || '');
//     localStorage.setItem('couponDiscount', discount);
//   }, [appliedCoupon, discount]);

//   const handleApplyCoupon = (discount) => {
//     dispatch(applyCoupon({ couponCode: '', discount })); // Apply coupon and update state
//     setIsModalOpen(false); // Close the modal after applying coupon
//   };

//   return (
//     <div className={s.menu}>
//       <b>Cart Total</b>
//       <div className={s.content}>
//         <div className={s.item}>
//           <span>Total MRP : </span>
//           <span>₹ {subTotal.toFixed(2)}</span>
//         </div>
//         <div className={`${s.item} ${s.discount}`}>
//           <span>Discount on MRP :</span>
//           <span className={s.value}>₹ {totalDiscount.toFixed(2)}</span>
//         </div>
//         <div className={s.item}>
//           <span>Coupon Discount:</span>
//           <span className={`${s.coupon} ${discount > 0 ? s.couponApplied : ''}`}>
//             {discount > 0 ? (
//               <>₹ {discount.toFixed(2)}</>
//             ) : (
//               <span onClick={() => setIsModalOpen(true)}>Apply Coupon</span>
//             )}
//           </span>
//         </div>
//         <div className={s.item}>
//           <span>Shipping:</span>
//           <span className={s.ship}>Free</span>
//         </div>
//         <div className={s.items}>
//           <span>Total:</span>
//           <span>₹ {totalAfterDiscount.toFixed(2)}</span>
//         </div>
//       </div>
//       <Link to="/checkout" className={s.checkoutLink}>Proceed to Checkout</Link>

//       <CouponModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onApply={handleApplyCoupon} // Pass handleApplyCoupon as a callback
//       />
//     </div>
//   );
// };

// export default CartInfoMenu;


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSubTotal, calculateTotalDiscount } from 'src/Functions/helper';
import CouponModal from './CouponModal';
import s from './CartInfoMenu.module.scss';
import { setCouponDiscount, resetCouponDiscount } from '../../../Features/cartSlice';

const CartInfoMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Get state from Redux
  const cartProducts = useSelector((state) => state.products.cartProducts) || [];
  const couponDiscount = useSelector((state) => state.cart.couponDiscount) || 0;

  // Determine if a coupon is applied
  const couponApplied = couponDiscount > 0;

  // Calculate subtotal and total discount
  const subTotal = getSubTotal(cartProducts) || 0;
  const totalDiscount = calculateTotalDiscount(cartProducts) || 0;

  // Apply coupon discount to subtotal
  const discountAmount = (subTotal * couponDiscount) / 100; // Ensure this calculation is correct
  const totalAfterDiscount = subTotal - totalDiscount - discountAmount;

  // Apply coupon callback
  const handleApplyCoupon = (discount) => {
    dispatch(setCouponDiscount(discount)); // Update Redux state with coupon discount
    setIsModalOpen(false); // Close the modal after applying coupon
  };

  // Remove coupon callback
  const handleRemoveCoupon = () => {
    dispatch(resetCouponDiscount()); // Reset coupon discount in Redux store
  };

  return (
    <div className={s.menu}>
      <b>Cart Total</b>
      <div className={s.content}>
        <div className={s.item}>
          <span>Total MRP : </span>
          <span>₹ {subTotal.toFixed(2)}</span>
        </div>
        <div className={`${s.item} ${s.discount}`}>
          <span>Discount on MRP :</span>
          <span className={s.value}>₹ {totalDiscount.toFixed(2)}</span>
        </div>
        <div className={s.item}>
          <span>Coupon Discount:</span>
          <span className={`${s.coupon} ${couponApplied ? s.couponApplied : ''}`}>
            {couponApplied ? (
              <>
                <span onClick={handleRemoveCoupon} className={s.removeCouponBtn}>Remove</span>
                <span>₹ {discountAmount.toFixed(2)}</span> {/* Display actual discount applied */}
              </>
            ) : (
              <span onClick={() => setIsModalOpen(true)}>Apply Coupon</span>
            )}
          </span>
        </div>
        <div className={s.item}>
          <span>Shipping:</span>
          <span className={s.ship}>Free</span>
        </div>
        <div className={s.items}>
          <span>Total:</span>
          <span>₹ {totalAfterDiscount.toFixed(2)}</span>
        </div>
      </div>
      <Link to="/checkout" className={s.checkoutLink}>Proceed to Checkout</Link>

      <CouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApplyCoupon} // Pass handleApplyCoupon as a callback
      />
    </div>
  );
};

export default CartInfoMenu;
