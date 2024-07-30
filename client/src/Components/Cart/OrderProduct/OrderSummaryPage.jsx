


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Helmet } from 'react-helmet-async';
// import s from './OrderSummaryPage.module.scss';

// const OrderSummaryPage = () => {
//   const { userId } = useParams();
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/order/${userId}`);
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Failed to fetch orders:', error);
//       }
//     };

//     fetchOrders();
//   }, [userId]);

//   return (
//     <>
//       <Helmet>
//         <title>Order Summary</title>
//       </Helmet>

//       <div className="container">
//         <main className={s.orderSummaryPage} id="order-summary-page">
//           <h1>Order Summary</h1>
//           {orders.length === 0 ? (
//             <p>No orders found.</p>
//           ) : (
//             orders.map((order) => (
//               <div key={order._id} className={s.orderItem}>
//                 <h2>Order ID: {order._id}</h2>
//                 <p>Total Bill Amount: ${order.totalBillAmount}</p>
//                 <h3>Products</h3>
//                 <ul>
//                   {order.orderedProducts.map((product) => (
//                     <li key={product.id}>
//                       Product Name: {product.name}, Quantity: {product.quantity}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))
//           )}
//         </main>
//       </div>
//     </>
//   );
// };

// export default OrderSummaryPage;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import { setLoginData } from '../../../Features/userSlice'; // Update path as per your folder structure
// import './OrderSummaryPage.scss'; // Import styles as needed
// import { toast } from 'react-toastify';
// import PagesHistory from '../../Shared/MiniComponents/PagesHistory/PagesHistory';
// import { Link } from '@mui/material';
// import { useTranslation } from "react-i18next";

// const OrderSummaryPage = () => {
//   const { userId } = useParams();
//   const [orders, setOrders] = useState([]);
//   const [selectedOrderProducts, setSelectedOrderProducts] = useState(null);
//   const [popupOpen, setPopupOpen] = useState(false);
//   const { loginInfo } = useSelector((state) => state.user);
//   const { t } = useTranslation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/order/${userId}`);
//         setOrders(response.data); // Assuming response.data is an array of orders
//       } catch (error) {
//         console.error('Failed to fetch orders:', error);
//       }
//     };

//     fetchOrders();
//   }, [userId]);

//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const response = await axios.put(`http://localhost:8000/api/orders/${orderId}/status`, { status: newStatus });
//       const updatedOrders = orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order);
//       setOrders(updatedOrders);
//     } catch (error) {
//       console.error('Failed to update order status:', error);
//     }
//   };

//   const handleProductClick = (orderedProducts) => {
//     setSelectedOrderProducts(orderedProducts);
//     setPopupOpen(true);
//   };

//   const handleCloseDetails = () => {
//     setSelectedOrderProducts(null);
//     setPopupOpen(false);
//   };

//   useEffect(() => {
//     // Example of setting login data on page load (assuming you have a token or credentials)
//     if (!loginInfo.userId && localStorage.getItem('userSliceData')) {
//       const storedUserData = JSON.parse(localStorage.getItem('userSliceData')).loginInfo;
//       dispatch(setLoginData(storedUserData));
//     }
//   }, [dispatch, loginInfo.userId]);

//   return (
//     <div className="orderDetails">
      // <div className='wrapper'>
      //   <PagesHistory history={["/", t("nav.profile")]} />

      //   <p className='welcomeMessage'>
      //     {t("common.welcome")}{"! "}
      //     <Link to="/profile">{loginInfo.username}</Link>
      //   </p>
      // </div>
//       <h2>Order Summary</h2>
//       <div className="productDetails">
//         {orders.map(order => (
//           <div key={order._id} className="order">
//             <div className="product">
//               <img
//                 src={order.orderedProducts.length > 0 ? order.orderedProducts[0].img : 'placeholder_image_url'}
//                 alt={order.orderedProducts.length > 0 ? order.orderedProducts[0].name : 'Product'}
//                 onClick={() => handleProductClick(order.orderedProducts)}
//                 style={{ cursor: 'pointer' }}
//               />
//               <div className="productInfo">
//                 <h4><span>Order ID:</span> {order._id}</h4>
//                 <p><span>Total Bill Amount: Rs.</span>  {order.totalBillAmount}</p>
//                 <p><span>Total Products:</span> {order.totalProducts}</p>
//                 <p><span>Delivery Method:</span> {order.deliveryMethod}</p>
//                 <p><span>Payment Method:</span> {order.paymentMethod}</p>
//                 {order.status !== 'Delivered' && (
//                   <>
//                     <button onClick={() => updateOrderStatus(order._id, 'Shipped')}>Mark as Shipped</button>
//                     <button onClick={() => updateOrderStatus(order._id, 'Delivered')}>Mark as Delivered</button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {popupOpen && selectedOrderProducts && (
//         <div className="popup">
//           <div className="productDetails">
//             {selectedOrderProducts.map(product => (
//               <div key={product._id} className="product">
//                 <img src={product.img} alt={product.name} />
//                 <div className="productInfo">
//                   <h4>{product.name}</h4>
//                   <p><span>Price: Rs.</span> {product.price} </p>
//                   <p><span>Quantity:</span> {product.quantity}</p>
//                   <p><span>Color:</span> {product.colors.length > 0 ? product.colors[0].name : 'N/A'}</p>
//                 </div>
//               </div>
//             ))}
//             <div className="closeBtn" onClick={handleCloseDetails}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-x"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderSummaryPage;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import { setLoginData } from '../../../Features/userSlice'; // Update path as per your folder structure
// import './OrderSummaryPage.scss'; // Import styles as needed
// import { toast } from 'react-toastify';
// import PagesHistory from '../../Shared/MiniComponents/PagesHistory/PagesHistory';
// import { Link } from '@mui/material';
// import { useTranslation } from "react-i18next";

// const OrderSummaryPage = () => {
//   const { userId } = useParams();
//   const [orders, setOrders] = useState([]);
//   const { loginInfo } = useSelector((state) => state.user);
//   const { t } = useTranslation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/order/${userId}`);
//         setOrders(response.data); // Assuming response.data is an array of orders
//         console.error('fetch orders:', setOrders);
//       } catch (error) {
//         console.error('Failed to fetch orders:', error);
//       }
//     };

//     fetchOrders();
//   }, [userId]);

//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const response = await axios.put(`http://localhost:8000/api/orders/${orderId}/status`, { status: newStatus });
//       const updatedOrders = orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order);
//       setOrders(updatedOrders);
//     } catch (error) {
//       console.error('Failed to update order status:', error);
//     }
//   };

//   useEffect(() => {
//     // Example of setting login data on page load (assuming you have a token or credentials)
//     if (!loginInfo.userId && localStorage.getItem('userSliceData')) {
//       const storedUserData = JSON.parse(localStorage.getItem('userSliceData')).loginInfo;
//       dispatch(setLoginData(storedUserData));
//     }
//   }, [dispatch, loginInfo.userId]);

//   return (
//     <div className="orderDetails">
//       <div className='wrapper'>
//         <PagesHistory history={["/", t("nav.profile")]} />

//         <p className='welcomeMessage'>
//           {t("common.welcome")}{"! "}
//           <Link to="/profile">{loginInfo.username}</Link>
//         </p>
//       </div>
//       <h2>Order Summary</h2>
//       <div className="productDetails">
//         {orders.map(order => (
//           <div key={order._id} className="order">
//             {/* <div className="product">
//               <img
//                 src={order.orderedProducts.length > 0 ? order.orderedProducts[0].img : 'placeholder_image_url'}
//                 alt={order.orderedProducts.length > 0 ? order.orderedProducts[0].name : 'Product'}
//                 style={{ cursor: 'pointer' }}
//               />
//               <div className="productInfo">
//                 <h4><span>Order ID:</span> {order._id}</h4>
//                 <p><span>Total Bill Amount: Rs.</span>  {order.totalBillAmount}</p>
//                 <p><span>Total Products:</span> {order.totalProducts}</p>
//                 <p><span>Delivery Method:</span> {order.deliveryMethod}</p>
//                 <p><span>Payment Method:</span> {order.paymentMethod}</p>
//                 {order.status !== 'Delivered' && (
//                   <>
//                     <button onClick={() => updateOrderStatus(order._id, 'Shipped')}>Mark as Shipped</button>
//                     <button onClick={() => updateOrderStatus(order._id, 'Delivered')}>Mark as Delivered</button>
//                   </>
//                 )}
//               </div>
//             </div> */}
//             <div className="orderedProducts">
//               {order.orderedProducts.map(product => (
//                 <div key={product._id} className="product">
//                   <img src={product.img} alt={product.name} />
//                   <div className="productInfo">
//                     <h4>{product.name}</h4>
//                     {/* <p><span>Price: Rs.</span> {product.price} </p> */}
//                     <p><span>Order ID:</span> {order._id}</p>
//                     {/* <p><span>Quantity:</span> {product.quantity}</p> */}
//                     <p><span>Payment Method:</span> {order.paymentMethod}</p>
//                     <p><Link to={`/orders/${order._id}`}>View Order Details</Link></p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderSummaryPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PagesHistory from '../../Shared/MiniComponents/PagesHistory/PagesHistory';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './OrderSummaryPage.module.scss';

const OrderSummaryPage = () => {
  const { loginInfo } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!loginInfo.userId) {
          console.error('No userId found in loginInfo');
          return;
        }

        const response = await axios.get(`http://localhost:8000/api/orders/user/${loginInfo.userId}`);
        setOrders(response.data);
      } catch (error) {
        toast.error('Failed to fetch orders');
      }
    };

    if (loginInfo.userId) {
      fetchOrders();
    }
  }, [loginInfo.userId]);

  const filteredOrders = orders.filter(order =>
    selectedStatus === 'All' || order.status === selectedStatus
  );

  return (
    <div className={styles.orderSummaryPage}>
      <div className={styles.wrapper}>
        <PagesHistory history={['/', t('nav.profile')]} />
        <p className={styles.welcomeMessage}>
          {t('common.welcome')}! <Link to="/profile">{loginInfo.username}</Link>
        </p>
      </div>
      <h2>{t('Order Summary')}</h2>
      <div className={styles.container}>
        <div className={styles.filterSection}>
          <h3>{t('Filter')}</h3>
          <select onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus}>
            <option value="All">{t('All')}</option>
            <option value="Pending">{t('Pending')}</option>
            <option value="Packed">{t('Packed')}</option>
            <option value="Shipped">{t('Shipped')}</option>
            <option value="Out for Delivery">{t('Out for Delivery')}</option>
            <option value="Delivered">{t('Delivered')}</option>
            <option value="Cancelled">{t('Cancelled')}</option>
          </select>
        </div>
        <div className={styles.productDetails}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <div key={order._id} className={styles.order}>
                <div className={styles.orderedProducts}>
                  {order.cartProducts.map(product => (
                    <div key={product.id} className={styles.product}>
                      <img
                        src={`http://localhost:8000/${product.img}`} 
                        alt={product.name} 
                        onError={(e) => e.target.src = '/path/to/fallback-image.jpg'}
                      />
                      <div className={styles.productInfo}>
                        <h4>{product.name}</h4>
                        <p>
                          <span>{t('ID')}:</span> {order._id}
                        </p>
                        <p>
                          <span>{t('Status')}:</span> {order.status}
                        </p>
                        <div className={styles.orderTracking}>
  <div className={`${styles.line} ${styles.line1} ${order.status === 'Packed' ? styles.active : ''} ${styles.first}`}>
    <div className={styles.dot} />
    <div className={styles.status}>Packed</div>
    <div className={styles.innerLine1} />
  </div>
  <div className={`${styles.line} ${styles.line2} ${order.status === 'Shipped' ? styles.active : ''} ${styles.second}`}>
    <div className={styles.dot} />
    <div className={styles.status}>Shipped</div>
    <div className={styles.innerLine2} />
  </div>
  <div className={`${styles.line} ${styles.line3} ${order.status === 'Delivered' ? styles.active : ''} ${styles.third}`}>
    <div className={styles.dot} />
    <div className={styles.status}>Delivered</div>
    <div className={styles.innerLine3} />
  </div>
</div>


                        <div className={styles.orderdate}>
                          <span>{t('Delivery Date')}:</span> {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <p>
                          <Link className={styles.view} to={`/orders/${order._id}`}>
                            {t('View Order Details')}
                          </Link>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className={styles.ordersFound}>{t('Orders Not Found')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
