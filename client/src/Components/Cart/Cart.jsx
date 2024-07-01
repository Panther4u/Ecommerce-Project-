// import { Helmet } from "react-helmet-async";
// import { useTranslation } from "react-i18next";
// import PagesHistory from "../Shared/MiniComponents/PagesHistory/PagesHistory";
// import s from "./Cart.module.scss";
// import AddCoupon from "./CartInfo/AddCoupon";
// import CartInfoMenu from "./CartInfo/CartInfoMenu";
// import CartButtons from "./CartProducts/CartButtons";
// import CartProducts from "./CartProducts/CartProducts";

// const Cart = () => {
//   const { t } = useTranslation();

//   return (
//     <>
//       <Helmet>
//         <title>Cart</title>
//       </Helmet>

//       <div className="container">
//         <main className={s.cartPage}>
//           <PagesHistory history={["/", t("history.cart")]} />

//           <div className={s.pageComponents} id="cart-page">
//             <CartProducts />
            

//             <div className={s.wrapper}>
//               <AddCoupon />
//               <CartInfoMenu />
//             </div>
//             <CartButtons />
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };
// export default Cart;

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PagesHistory from '../Shared/MiniComponents/PagesHistory/PagesHistory';
import s from './Cart.module.scss';
import AddCoupon from './CartInfo/AddCoupon';
import CartInfoMenu from './CartInfo/CartInfoMenu';
import CartButtons from './CartProducts/CartButtons';
import CartProducts from './CartProducts/CartProducts';
import PaymentSection from '../CheckoutPage/PaymentSection/PaymentSection'; // Import PaymentSection component
import { useDispatch } from 'react-redux';
import { clearCart } from 'src/Features/cartSlice';

const Cart = () => {
  const { t } = useTranslation();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const dispatch = useDispatch();

  const handlePlaceOrder = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate order placement success after 2 seconds
        resolve();
      }, 2000);
    });
  };

  useEffect(() => {
    if (orderPlaced) {
      dispatch(clearCart()); // Clear cart when order is successfully placed
    }
  }, [orderPlaced, dispatch]);

  const placeOrder = async () => {
    try {
      await handlePlaceOrder();
      setOrderPlaced(true); // Set orderPlaced to true after successful order placement
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error scenario if needed
    }
  };

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="container">
        <main className={s.cartPage}>
          <PagesHistory history={['/', t('history.cart')]} />
          <div className={s.pageComponents} id="cart-page">
            <CartProducts />
            <div className={s.wrapper}>
              <AddCoupon />
              <CartInfoMenu />
            </div>
            <CartButtons placeOrder={placeOrder} />
            {orderPlaced && <PaymentSection handlePlaceOrder={handlePlaceOrder} />} {/* Render PaymentSection conditionally */}
          </div>
        </main>
      </div>
    </>
  );
};

export default Cart;
