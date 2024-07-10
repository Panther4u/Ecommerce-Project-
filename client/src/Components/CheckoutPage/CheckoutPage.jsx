import React, { useState, useEffect, useId } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveBillingInfo } from 'src/Features/userSlice';
import { setOrderedProducts as setOrderedProductsInCart } from 'src/Features/cartSlice';
import { setOrderedProducts as setOrderedProductsInOrderSlice } from 'src/Features/orderSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BillingDetails from './BillingDetails/BillingDetails';
import PaymentSection from './PaymentSection/PaymentSection';
import s from './CheckoutPage.module.scss';
import PagesHistory from '../Shared/MiniComponents/PagesHistory/PagesHistory';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user.loginInfo);
  const { cartProducts } = useSelector((state) => state.products);

  const [billingValues, setBillingValues] = useState({
    firstName: '',
    streetAddress: '',
    townCity: '',
    apartment: '',
    pincode: '',
    mobileNumber: '',
    saveInfo: false,
  });

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const savedBillingInfo = JSON.parse(localStorage.getItem('billingInfo'));
    if (savedBillingInfo) {
      setBillingValues(savedBillingInfo);
    }
  }, []);

  const handleSaveBillingInfo = async () => {
    try {
      await dispatch(saveBillingInfo({ userId, ...billingValues })).unwrap();
      console.log('Billing information saved successfully');
      toast.success('Billing information saved successfully');
    } catch (error) {
      console.error('Error saving billing information:', error);
      toast.error('Error saving billing information');
    }
  };

  const validateBillingDetails = () => {
    return (
      billingValues.firstName &&
      billingValues.streetAddress &&
      billingValues.townCity &&
      billingValues.pincode &&
      billingValues.mobileNumber
    );
  };

  const handlePlaceOrder = async () => {
    try {
      if (!validateBillingDetails()) {
        toast.error('Please fill in all billing details');
        return;
      }

      if (billingValues.saveInfo) {
        await handleSaveBillingInfo();
      }

      const orderResponse = await axios.post('http://localhost:8000/api/checkout', {
        userId: userId,
        cartProducts,
        billingDetails: billingValues,
        deliveryMethod: "Express Delivery",
        totalBillAmount: totalAmount,
      });

      const { orderId } = orderResponse.data;

      console.log('Order placed successfully:', orderResponse.data);

      localStorage.setItem('orderId', orderId);

      localStorage.removeItem('billingInfo');

      dispatch(setOrderedProductsInCart([]));
      dispatch(setOrderedProductsInOrderSlice(cartProducts));

      toast.success('Order placed successfully');
      setTimeout(() => {
        navigate(`/order/${userId}`); // Navigate to order summary with user ID
        // navigate(`/order-summary`); // Navigate to order summary with user ID
      }, 5000);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order");
    }
  };

  const handleApplyCoupon = (couponValue) => {
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
              setTotalAmount={setTotalAmount}
            />
          </form>
        </main>
      </div>
    </>
  );
};

export default CheckoutPage;



// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { saveBillingInfo } from 'src/Features/userSlice';
// import { setOrderedProducts as setOrderedProductsInCart } from 'src/Features/cartSlice';
// import { setOrderedProducts as setOrderedProductsInOrderSlice } from 'src/Features/orderSlice';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import BillingDetails from './BillingDetails/BillingDetails';
// import PaymentSection from './PaymentSection/PaymentSection';
// import s from './CheckoutPage.module.scss';
// import PagesHistory from '../Shared/MiniComponents/PagesHistory/PagesHistory';

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { _id } = useSelector((state) => state.user.loginInfo);
//   const { cartProducts } = useSelector((state) => state.products);

//   const [billingValues, setBillingValues] = useState({
//     firstName: '',
//     streetAddress: '',
//     townCity: '',
//     apartment: '',
//     pincode: '',
//     mobileNumber: '',
//     saveInfo: false,
//   });

//   const [totalAmount, setTotalAmount] = useState(0);

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
//       toast.success('Billing information saved successfully');
//     } catch (error) {
//       console.error('Error saving billing information:', error);
//       toast.error('Error saving billing information');
//     }
//   };

//   const validateBillingDetails = () => {
//     // Validate if any billing details fields are empty
//     return (
//       billingValues.firstName &&
//       billingValues.streetAddress &&
//       billingValues.townCity &&
//       billingValues.pincode &&
//       billingValues.mobileNumber
//     );
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       if (!validateBillingDetails()) {
//         toast.error('Please fill in all billing details');
//         return;
//       }

//       if (billingValues.saveInfo) {
//         await handleSaveBillingInfo();
//       }

//       const orderResponse = await axios.post('http://localhost:8000/api/checkout', {
//         userId: _id,
//         cartProducts,
//         billingDetails: billingValues,
//         deliveryMethod: "Express Delivery",
//         totalBillAmount: totalAmount,
//       });

//       console.log('Order placed successfully:', orderResponse.data);
//       console.log('Order placed successfully:', cartProducts);

//       // Clearing local storage
//       localStorage.removeItem('billingInfo');

//       dispatch(setOrderedProductsInCart([]));
//       dispatch(setOrderedProductsInOrderSlice(cartProducts));

//       toast.success('Order placed successfully');
//       setTimeout(() => {
//         navigate("/order/${_id}");
//       }, 5000);
//     } catch (error) {
//       console.error("Error placing order:", error);
//       toast.error("Error placing order");
//     }
//   };

//   // const handlePlaceOrder = async () => {
//   //   try {
//   //     if (!validateBillingDetails()) {
//   //       toast.error('Please fill in all billing details');
//   //       return;
//   //     }
  
//   //     if (billingValues.saveInfo) {
//   //       await handleSaveBillingInfo();
//   //     }
  
//   //     const orderResponse = await axios.post('http://localhost:8000/api/checkout', {
//   //       userId: _id,
//   //       cartProducts,
//   //       billingDetails: billingValues,
//   //       deliveryMethod: "Express Delivery",
//   //       totalBillAmount: totalAmount,
//   //     });
  
//   //     const { orderId } = orderResponse.data; // Ensure this matches the backend response
  
//   //     console.log('Order placed successfully:', orderResponse.data);

//   //     // Store orderId in localStorage or state
//   //     localStorage.setItem('orderId', orderId); // Example: Storing orderId in localStorage
//   //     console.log('OrderID:', orderId);
//   //     // Clearing local storage for billing info
//   //     localStorage.removeItem('billingInfo');
  
//   //     dispatch(setOrderedProductsInCart([]));
//   //     dispatch(setOrderedProductsInOrderSlice(cartProducts));
  
//   //     toast.success('Order placed successfully');
//   //     setTimeout(() => {
//   //       navigate("/order-summary/:orderId");
//   //     }, 5000);
//   //   } catch (error) {
//   //     console.error("Error placing order:", error);
//   //     toast.error("Error placing order");
//   //   }
//   // };
  

//   // const handlePlaceOrder = async () => {
//   //   try {
//   //     if (!validateBillingDetails()) {
//   //       toast.error('Please fill in all billing details');
//   //       return;
//   //     }
  
//   //     if (billingValues.saveInfo) {
//   //       await handleSaveBillingInfo();
//   //     }
  
//   //     const orderResponse = await axios.post('http://localhost:8000/api/checkout', {
//   //       userId: _id,
//   //       cartProducts,
//   //       billingDetails: billingValues,
//   //       deliveryMethod: "Express Delivery",
//   //       totalBillAmount: totalAmount,
//   //     });
  
//   //     const { orderId } = orderResponse.data; // Assuming orderId is returned from backend
  
//   //     console.log('Order placed successfully:', orderResponse.data);
  
//   //     // Store orderId in localStorage or state
//   //     localStorage.setItem('orderId', orderId); // Example: Storing orderId in localStorage
  
//   //     // Clearing local storage for billing info
//   //     localStorage.removeItem('billingInfo');
  
//   //     dispatch(setOrderedProductsInCart([]));
//   //     dispatch(setOrderedProductsInOrderSlice(cartProducts));
  
//   //     toast.success('Order placed successfully');
//   //     setTimeout(() => {
//   //       navigate("/order/${_id}");
//   //     }, 5000);
//   //   } catch (error) {
//   //     console.error("Error placing order:", error);
//   //     toast.error("Error placing order");
//   //   }
//   // };
  

//   const handleApplyCoupon = (couponValue) => {
//     console.log('Applying coupon:', couponValue);
//   };

//   const handleSubmitPayment = async (e) => {
//     e.preventDefault();
//     try {
//       await handlePlaceOrder();
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
//               setTotalAmount={setTotalAmount}
//             />
//           </form>
//         </main>
//       </div>
//     </>
//   );
// };

// export default CheckoutPage;
