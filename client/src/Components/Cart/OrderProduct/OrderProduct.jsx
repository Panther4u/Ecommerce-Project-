// import React from 'react';
// import PropTypes from 'prop-types';
// import s from './OrderProduct.module.scss';

// const OrderProduct = ({ product }) => {
//   return (
//     <table className={s.cartProducts}>
//     <thead>
//       <tr>
//         <th>{t('cartPage.productsTable.product')}</th>
//         <th>{t('cartPage.productsTable.price')}</th>
//         <th>{t('cartPage.productsTable.quantity')}</th>
//         <th>{t('cartPage.productsTable.subtotal')}</th>
//       </tr>
//     </thead>
//   </table>
//   );
// };

// OrderProduct.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     quantity: PropTypes.number.isRequired,
//   }).isRequired,
// };

// export default OrderProduct;
// import React from 'react';
// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next'; // Import useTranslation hook for localization
// import { Link } from 'react-router-dom'; // Import Link for navigation
// import CustomNumberInput from '../../Shared/MiniComponents/CustomNumberInput/CustomNumberInput'; // Adjust path as per your project structure
// import s from './OrderProduct.module.scss'; // Assuming you have defined styles

// const OrderProduct = ({ product }) => {
//   const { img, name, shortName, afterDiscount, quantity, id } = product;
//   const priceAfterDiscount = afterDiscount.replaceAll(",", ""); // Remove commas from price string
//   const subTotal = (quantity * parseFloat(priceAfterDiscount)).toFixed(2); // Calculate subtotal with two decimal places
//   const { t } = useTranslation(); // Translation hook for localization

//   // Function to translate product details
//   function translateProduct(key, uppercase, dynamicData = {}) {
//     const shortNameKey = shortName.replaceAll(" ", ""); // Remove spaces from shortName for translation key
//     const productTrans = `${shortNameKey}`;
//     const translateText = t(`${productTrans} ${key}`, dynamicData); // Translate text using i18n translation function
//     return uppercase ? translateText.toUpperCase() : translateText; // Optionally convert to uppercase
//   }

//   return (
//     <tr className={s.orderProduct}>
//       <td className={s.product}>
//         <div className={s.imgHolder}>
//           <img src={img} alt={shortName} />
//         </div>
//         <Link to={`/details?product=${name}`}>
//           {translateProduct("")} {/* Display translated product name */}
//         </Link>
//       </td>
//       <td className={s.price}>RS. {afterDiscount}</td> {/* Display price after discount */}
//       <td>
//         <CustomNumberInput product={product} quantity={quantity} /> {/* Custom input for quantity */}
//       </td>
//       <td>RS. {subTotal}</td> {/* Display calculated subtotal */}
//     </tr>
//   );
// };

// OrderProduct.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.string.isRequired, // Assuming _id is used as key
//     img: PropTypes.string.isRequired, // Image URL
//     name: PropTypes.string.isRequired, // Product name
//     shortName: PropTypes.string.isRequired, // Short name for translation
//     afterDiscount: PropTypes.string.isRequired, // Price after discount
//     quantity: PropTypes.number.isRequired, // Quantity of the product
//   }).isRequired,
// };

// export default OrderProduct;




// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next'; // Import useTranslation hook for localization
// import { Link } from 'react-router-dom'; // Import Link for navigation
// import CustomNumberInput from '../../Shared/MiniComponents/CustomNumberInput/CustomNumberInput'; // Adjust path as per your project structure
// import s from './OrderProduct.module.scss'; // Assuming you have defined styles

// const OrderProduct = ({ product }) => {
//   const { img, name, shortName, afterDiscount, quantity, id } = product;
//   const priceAfterDiscount = afterDiscount.replaceAll(",", ""); // Remove commas from price string
//   const subTotal = (quantity * parseFloat(priceAfterDiscount)).toFixed(2); // Calculate subtotal with two decimal places
//   const { t } = useTranslation(); // Translation hook for localization
//   const [deliveryStatus, setDeliveryStatus] = useState('Processing'); // Initial delivery status

//   // Function to translate product details
//   function translateProduct(key, uppercase, dynamicData = {}) {
//     const shortNameKey = shortName.replaceAll(" ", ""); // Remove spaces from shortName for translation key
//     const productTrans = `${shortNameKey}`;
//     const translateText = t(`${productTrans} ${key}`, dynamicData); // Translate text using i18n translation function
//     return uppercase ? translateText.toUpperCase() : translateText; // Optionally convert to uppercase
//   }

//   // Function to update delivery status
//   const updateDeliveryStatus = (newStatus) => {
//     setDeliveryStatus(newStatus);
//     // Optionally, make an API call to update the status in the backend
//     // axios.post('/api/updateDeliveryStatus', { id, status: newStatus })
//     //   .then(response => console.log('Status updated:', response.data))
//     //   .catch(error => console.error('Error updating status:', error));
//   };

//   return (
//     <tr className={s.orderProduct}>
//       <td className={s.product}>
//         <div className={s.imgHolder}>
//           <img src={img} alt={shortName} />
//         </div>
//         <Link to={`/details?product=${name}`}>
//           {translateProduct("")} {/* Display translated product name */}
//         </Link>
//       </td>
//       <td className={s.price}>RS. {afterDiscount}</td> {/* Display price after discount */}
//       <td>
//         <CustomNumberInput product={product} quantity={quantity} /> {/* Custom input for quantity */}
//       </td>
//       <td>RS. {subTotal}</td> {/* Display calculated subtotal */}
//       <td className={s.status}>
//         <select value={deliveryStatus} onChange={(e) => updateDeliveryStatus(e.target.value)}>
//           <option value="Processing">Processing</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Out for Delivery">Out for Delivery</option>
//           <option value="Delivered">Delivered</option>
//         </select>
//       </td>
//     </tr>
//   );
// };

// OrderProduct.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.string.isRequired, // Assuming _id is used as key
//     img: PropTypes.string.isRequired, // Image URL
//     name: PropTypes.string.isRequired, // Product name
//     shortName: PropTypes.string.isRequired, // Short name for translation
//     afterDiscount: PropTypes.string.isRequired, // Price after discount
//     quantity: PropTypes.number.isRequired, // Quantity of the product
//   }).isRequired,
// };

// export default OrderProduct;




// CheckoutPage.js or relevant component

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import s from './OrderProduct.module.scss';

// const OrderProduct = ({ orderId }) => {
//   const [orderDetails, setOrderDetails] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/orders/${orderId}`);
//         setOrderDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching order details:', error);
//         toast.error('Failed to fetch order details');
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   const updateDeliveryStatus = async (newStatus) => {
//     try {
//       const response = await axios.patch(`http://localhost:8000/api/orders/${orderId}/delivery`, {
//         deliveryStatus: newStatus,
//       });

//       setOrderDetails(response.data);
//       toast.success('Delivery status updated successfully');
//     } catch (error) {
//       console.error('Error updating delivery status:', error);
//       toast.error('Failed to update delivery status');
//     }
//   };

//   if (!orderDetails) {
//     return <div>Loading order details...</div>;
//   }

//   return (
//     <div className="container">
//       <div className={s.orderDetails}>
//         <h2>Order Details</h2>
//         <p>Order ID: {orderDetails.orderId}</p>
//         <p>Status: {orderDetails.deliveryStatus}</p>
//         <select value={orderDetails.deliveryStatus} onChange={(e) => updateDeliveryStatus(e.target.value)}>
//           <option value="Processing">Processing</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Out for Delivery">Out for Delivery</option>
//           <option value="Delivered">Delivered</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default OrderProduct;


// OrderDetailsComponent.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderProduct = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orderDetails) return null;

  return (
    <div>
      <h2>Order Details</h2>
      <p>Order ID: {orderDetails._id}</p>
      <p>Customer: {orderDetails.customerName}</p>
      {/* Display other order details */}
    </div>
  );
};

export default OrderProduct;
