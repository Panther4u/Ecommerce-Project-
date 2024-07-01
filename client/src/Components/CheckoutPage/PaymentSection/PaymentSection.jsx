// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// // import AddCoupon from "../../Cart/CartInfo/AddCoupon";
// import PaymentCalculation from "./PaymentCalculation";
// import PaymentOptionsSelection from "./PaymentOptionsSelection";
// import PaymentProducts from "./PaymentProducts";
// import s from "./PaymentSection.module.scss";

// const PaymentSection = () => {
//   const { cartProducts } = useSelector((state) => state.products);
//   const { t } = useTranslation();

//   return (
//     <section className={s.paymentSection}>
//       <PaymentProducts data={cartProducts} />
//       <PaymentCalculation />
//       <PaymentOptionsSelection />
//       {/* <AddCoupon /> */}

//       <button type="submit" className={s.submitPaymentButton}>
//         {t("buttons.placeOrder")}
//       </button>
//     </section>
//   );
// };
// export default PaymentSection;
// components/PaymentSection/PaymentSection.js
// PaymentSection.jsx

// PaymentSection.jsx

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaymentProducts from './PaymentProducts';
import PaymentCalculation from './PaymentCalculation';
import PaymentOptionsSelection from './PaymentOptionsSelection';
import { useTranslation } from 'react-i18next';
import s from './PaymentSection.module.scss';
import { clearCart } from 'src/Features/cartSlice';
import PlaceOrderButton from './PlaceOrderButton';
import axios from 'axios';
import { setOrderedProducts } from 'src/Features/orderSlice';

const PaymentSection = ({ handlePlaceOrder, handleApplyCoupon }) => {
  const { products } = useSelector((state) => state.cart);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const placeOrderFrontend = async () => {
    setLoading(true);
    setError(null);
    try {
      await handlePlaceOrder(); // Assuming this function handles frontend logic for placing order
      dispatch(setOrderedProducts(products)); // Dispatch ordered products to Redux state
      dispatch(clearCart()); // Clear cart after successful order placement

      setTimeout(() => {
        toast.success('Order placed successfully', {
          onClose: () => navigate('/order-summary')
        });
      }, 2000); // Wait for 2 seconds before navigating

    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={s.paymentSection}>
      <h2>{t('Order Summary')}</h2>
      <PaymentProducts products={products} />
      <PaymentCalculation products={products} handleApplyCoupon={handleApplyCoupon} />
      <PaymentOptionsSelection />

      <PlaceOrderButton
        type="button"
        className={s.submitPaymentButton}
        onClick={placeOrderFrontend} // Use the frontend function here
        disabled={loading}
      >
        {loading ? t('buttons.placingOrder') : t('buttons.placeOrder')}
      </PlaceOrderButton>

      {error && <p className={s.errorMessage}>{error}</p>}
    </section>
  );
};

export default PaymentSection;
