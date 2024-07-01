// import { Helmet } from "react-helmet-async";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import useScrollOnMount from "src/Hooks/App/useScrollOnMount";
// import useFormData from "src/Hooks/Helper/useFormData";
// import PagesHistory from "../Shared/MiniComponents/PagesHistory/PagesHistory";
// import BillingDetails from "./BillingDetails/BillingDetails";
// import s from "./CheckoutPage.module.scss";
// import PaymentSection from "./PaymentSection/PaymentSection";

// const CheckoutPage = () => {
//   useScrollOnMount(160);
//   const { t } = useTranslation();
//   const { saveBillingInfoToLocal } = useSelector((state) => state.products);
//   const { values: billingValues, handleChange } = useFormData({
//     initialValues: {
//       firstName: "",
//       companyName: "",
//       address: "",
//       streetAddress: "",
//       cityOrTown: "",
//       phoneNumber: "",
//       email: "",
//     },
//     onSubmit: handleSubmitPayment,
//     storeInLocalStorage: saveBillingInfoToLocal,
//     localStorageKey: "billingInfo",
//   });

//   const pageHistory = [t("history.account"), t("history.checkout")];
//   const historyPaths = [
//     {
//       index: 0,
//       path: "/profile",
//     },
//   ];

//   function handleSubmitPayment(e) {
//     e.preventDefault();
//     if (!saveBillingInfoToLocal) localStorage.removeItem("billingInfo");
//   }

//   return (
//     <>
//       <Helmet>
//         <title>Checkout</title>
//       </Helmet>

//       <div className="container">
//         <main className={s.checkoutPage} id="checkout-page">
//           <PagesHistory history={pageHistory} historyPaths={historyPaths} />

//           <form
//             className={s.checkoutPageContent}
//             method="POST"
//             onSubmit={handleSubmitPayment}
//           >
//             <BillingDetails inputsData={{ billingValues, handleChange }} />
//             <PaymentSection />
//           </form>
//         </main>
//       </div>
//     </>
//   );
// };
// export default CheckoutPage;

// CheckoutPage.jsx

// CheckoutPage.jsx

// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import PagesHistory from '../Shared/MiniComponents/PagesHistory/PagesHistory';
// import BillingDetails from './BillingDetails/BillingDetails';
// import PaymentSection from './PaymentSection/PaymentSection';
// import { saveBillingInfo } from 'src/Features/userSlice';
// import { applyCoupon, clearCart, setOrderedProducts } from 'src/Features/cartSlice';
// import { setOrderedProducts as setOrderedProductsInCart } from 'src/Features/cartSlice'; // Import setOrderedProducts from cartSlice
// import { setOrderedProducts as setOrderedProductsInOrderSlice } from 'src/Features/cartSlice'; // Import setOrderedProducts from orderSlice
// import s from './CheckoutPage.module.scss';
// import { toast } from 'react-toastify';

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { saveBillingInfoToLocal } = useSelector((state) => state.products);
//   const { _id } = useSelector((state) => state.user.loginInfo);
//   const { products } = useSelector((state) => state.cart);

//   const [billingValues, setBillingValues] = useState({
//     name: '',
//     streetAddress: '',
//     townCity: '',
//     apartment: '',
//     pincode: '',
//     mobileNumber: '',
//     saveInfo: false,
//   });

//   useEffect(() => {
//     const savedBillingInfo = JSON.parse(localStorage.getItem('billingInfo'));
//     if (savedBillingInfo) {
//       setBillingValues(savedBillingInfo);
//     }
//   }, []);

//   const handleSaveBillingInfo = async () => {
//     try {
//       await dispatch(saveBillingInfo({ _id, ...billingValues })).unwrap();
//       console.log('Billing information saved successfully');
//     } catch (error) {
//       console.error('Error saving billing information:', error);
//       throw error;
//     }
//   };

//   // const handlePlaceOrder = async () => {
//   //   try {
//   //     const saveBillingResponse = await axios.post('http://localhost:8000/api/user/save-billing', { _id, ...billingValues });
//   //     console.log('Billing information saved:', saveBillingResponse.data);
  
//   //     const placeOrderResponse = await axios.post('http://localhost:8000/api/checkout', billingValues);
//   //     console.log('Order placed successfully:', placeOrderResponse.data);
  
//   //     // Dispatch action to save ordered products in Redux state
//   //     dispatch(setOrderedProducts(products));
  
//   //     dispatch(clearCart());
  
//   //     console.log('Payment submitted successfully');
  
//       // setTimeout(() => {
//       //   toast.success('Order placed successfully', {
//       //     onClose: () => navigate('/order-summary')
//       //   });
//       // }, 2000); // Wait for 2 seconds before navigating
      
//   //     return true;
//   //   } catch (error) {
//   //     console.error('Error placing order:', error.response ? error.response.data : error.message);
//   //     throw error;
//   //   }
//   // };
//   const handlePlaceOrder = async (billingValues, products) => {
//     const dispatch = useDispatch();
  
//     try {
//       // Assuming you save billing and place order
//       const saveBillingResponse = await axios.post('http://localhost:8000/api/user/save-billing', { _id, ...billingValues });
//       console.log('Billing information saved:', saveBillingResponse.data);
  
//       const placeOrderResponse = await axios.post('http://localhost:8000/api/checkout', billingValues);
//       console.log('Order placed successfully:', placeOrderResponse.data);
  
//       // Dispatch actions to set ordered products in both slices
//       dispatch(setOrderedProductsInCart([])); // Clear cart products
//       dispatch(setOrderedProductsInOrderSlice(products)); // Set ordered products in orderSlice
  
//       setTimeout(() => {
//         toast.success('Order placed successfully', {
//           onClose: () => navigate('/order-summary')
//         });
//       }, 2000); // Wait for 2 seconds before navigating
//       // Optionally clear local storage or perform other cleanup
  
//       return true;
//     } catch (error) {
//       console.error('Error placing order:', error);
//       throw error;
//     }
//   };
  

//   const handleApplyCoupon = (couponValue) => {
//     dispatch(applyCoupon(couponValue));
//   };

//   const handleSubmitPayment = async (e) => {
//     e.preventDefault();
//     try {
//       if (billingValues.saveInfo) {
//         await handleSaveBillingInfo();
//       }

//       console.log('Submitting payment...');
//       const orderPlaced = await handlePlaceOrder();

//       console.log('Payment submitted successfully');
//     } catch (error) {
//       console.error('Error during payment submission:', error);
//     }
//   };

//   const pageHistory = ['Account', 'Checkout'];
//   const historyPaths = [{ index: 0, path: '/profile' }];

//   return (
//     <>
//       <Helmet>
//         <title>Checkout</title>
//       </Helmet>

//       <div className="container">
//         <main className={s.checkoutPage} id="checkout-page">
//           <PagesHistory history={pageHistory} historyPaths={historyPaths} />

//           <form className={s.checkoutPageContent} onSubmit={handleSubmitPayment}>
//             <BillingDetails
//               billingValues={billingValues}
//               setBillingValues={setBillingValues}
//             />
//             <PaymentSection
//               handlePlaceOrder={handlePlaceOrder}
//               handleApplyCoupon={handleApplyCoupon}
//             />
//           </form>
//         </main>
//       </div>
//     </>
//   );
// };

// export default CheckoutPage;
// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import PagesHistory from '../Shared/MiniComponents/PagesHistory/PagesHistory';
// import BillingDetails from './BillingDetails/BillingDetails';
// import PaymentSection from './PaymentSection/PaymentSection';
// import { saveBillingInfo } from 'src/Features/userSlice';
// import { applyCoupon } from 'src/Features/cartSlice';
// import { setOrderedProducts as setOrderedProductsInCart } from 'src/Features/cartSlice'; // Import setOrderedProducts from cartSlice
// import { setOrderedProducts as setOrderedProductsInOrderSlice } from 'src/Features/orderSlice'; // Import setOrderedProducts from orderSlice
// import s from './CheckoutPage.module.scss';
// import { toast } from 'react-toastify';

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { _id } = useSelector((state) => state.user.loginInfo);
//   const { cartProducts } = useSelector((state) => state.products);

//   const [billingValues, setBillingValues] = useState({
//     name: '',
//     streetAddress: '',
//     townCity: '',
//     apartment: '',
//     pincode: '',
//     mobileNumber: '',
//     saveInfo: false,
//   });

//   useEffect(() => {
//     const savedBillingInfo = JSON.parse(localStorage.getItem('billingInfo'));
//     if (savedBillingInfo) {
//       setBillingValues(savedBillingInfo);
//     }
//   }, []);

//   const handleSaveBillingInfo = async () => {
//     try {
//       await dispatch(saveBillingInfo({ _id, ...billingValues })).unwrap();
//       console.log('Billing information saved successfully');
//     } catch (error) {
//       console.error('Error saving billing information:', error);
//       throw error;
//     }
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       // Save billing information
//       const saveBillingResponse = await axios.post('http://localhost:8000/api/user/save-billing', { _id, ...billingValues });
//       console.log('Billing information saved:', saveBillingResponse.data);

//       // Place order
//       const placeOrderResponse = await axios.post('http://localhost:8000/api/checkout', { cartProducts, ...billingValues });
//       console.log('Order placed successfully:', placeOrderResponse.data);

//       // Dispatch actions to set ordered products in both slices
//       dispatch(setOrderedProductsInCart([])); // Clear cart products
//       dispatch(setOrderedProductsInOrderSlice(cartProducts)); // Set ordered products in orderSlice

//       // Log the products after placing the order
//       console.log('Cart Products:', cartProducts);

//       return true;
//     } catch (error) {
//       console.error('Error placing order:', error.response ? error.response.data : error.message);
//       throw error;
//     }
//   };

//   const handleApplyCoupon = (couponValue) => {
//     dispatch(applyCoupon(couponValue));
//   };

//   const handleSubmitPayment = async (e) => {
//     e.preventDefault();
//     try {
//       if (billingValues.saveInfo) {
//         await handleSaveBillingInfo();
//       }

//       console.log('Submitting payment...');
//       const orderPlaced = await handlePlaceOrder();

//       if (orderPlaced) {
//         toast.success('Order placed successfully', {
//           onClose: () => navigate('/order-summary')
//         });
//       }

//       console.log('Payment submitted successfully');
//     } catch (error) {
//       console.error('Error during payment submission:', error);
//     }
//   };

//   const pageHistory = ['Account', 'Checkout'];
//   const historyPaths = [{ index: 0, path: '/profile' }];

//   return (
//     <>
//       <Helmet>
//         <title>Checkout</title>
//       </Helmet>

      // <div className="container">
      //   <main className={s.checkoutPage} id="checkout-page">
      //     <PagesHistory history={pageHistory} historyPaths={historyPaths} />

      //     <form className={s.checkoutPageContent} onSubmit={handleSubmitPayment}>
      //       <BillingDetails
      //         billingValues={billingValues}
      //         setBillingValues={setBillingValues}
      //       />
      //       <PaymentSection
      //         handlePlaceOrder={handlePlaceOrder}
      //         handleApplyCoupon={handleApplyCoupon}
      //       />
      //     </form>
      //   </main>
      // </div>
//     </>
//   );
// };

// export default CheckoutPage;



import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BillingDetails from './BillingDetails/BillingDetails'; // Assuming this component handles billing details
import PaymentSection from './PaymentSection/PaymentSection'; // Assuming this component handles payment section
import { saveBillingInfo } from 'src/Features/userSlice'; // Redux action to save billing info
import { setOrderedProducts as setOrderedProductsInCart } from 'src/Features/cartSlice'; // Redux action to update cart
import { setOrderedProducts as setOrderedProductsInOrderSlice } from 'src/Features/orderSlice'; // Redux action to update orders
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './CheckoutPage.module.scss';
import PagesHistory from '../Shared/MiniComponents/PagesHistory/PagesHistory'; 

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user.loginInfo); // Assuming Redux state manages user login info
  const { cartProducts } = useSelector((state) => state.products); // Assuming Redux state manages cart products

  const [billingValues, setBillingValues] = useState({
    name: '',
    streetAddress: '',
    townCity: '',
    apartment: '',
    pincode: '',
    mobileNumber: '',
    saveInfo: false,
  });

  useEffect(() => {
    const savedBillingInfo = JSON.parse(localStorage.getItem('billingInfo'));
    if (savedBillingInfo) {
      setBillingValues(savedBillingInfo);
    }
  }, []);

  const handleSaveBillingInfo = async () => {
    try {
      await dispatch(saveBillingInfo({ _id, ...billingValues })).unwrap();
      console.log('Billing information saved successfully');
      toast.success('Billing information saved successfully');
    } catch (error) {
      console.error('Error saving billing information:', error);
      toast.error('Error saving billing information');
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // Save billing information if user opted to save it
      if (billingValues.saveInfo) {
        await handleSaveBillingInfo();
      }

      // Place order
      const orderResponse = await axios.post('http://localhost:8000/api/checkout', {
        userId: _id,
        cartProducts,
        ...billingValues,
      });

      console.log('Order placed successfully:', orderResponse.data);

      // Dispatch actions to update cart and order slices
      dispatch(setOrderedProductsInCart([])); // Clear cart products
      dispatch(setOrderedProductsInOrderSlice(cartProducts)); // Update ordered products in order slice

      // Notify user and navigate to order summary page
      toast.success('Order placed successfully');
      navigate('/order-summary');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order');
    }
  };

  const handleApplyCoupon = (couponValue) => {
    // Implement apply coupon functionality if needed
    console.log('Applying coupon:', couponValue);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    try {
      await handlePlaceOrder();
    } catch (error) {
      console.error('Error during payment submission:', error);
    }
  };

  const pageHistory = ['Account', 'Checkout'];
  const historyPaths = [{ index: 0, path: '/profile' }];
  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>

      <div className="container">
        <main className={s.checkoutPage} id="checkout-page">
          <PagesHistory history={pageHistory} historyPaths={historyPaths} />

          <form className={s.checkoutPageContent} onSubmit={handleSubmitPayment}>
            <BillingDetails
              billingValues={billingValues}
              setBillingValues={setBillingValues}
            />
            <PaymentSection
              handlePlaceOrder={handlePlaceOrder}
              handleApplyCoupon={handleApplyCoupon}
            />
          </form>
        </main>
      </div> 
    </>
  );
};

export default CheckoutPage;
