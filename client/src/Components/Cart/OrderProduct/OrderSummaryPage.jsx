


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




// OrderSummaryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderSummaryPage.scss'; // Make sure to use styles as required
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderSummaryPage = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [selectedOrderProducts, setSelectedOrderProducts] = useState(null); // State to manage selected order products

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/order/${userId}`);
        setOrders(response.data); // Assuming response.data is an array of orders
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/orders/${orderId}/status`, { status: newStatus });
      // Assuming response.data contains the updated order with new status
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return { ...order, status: newStatus }; // Update the status of the specific order
        }
        return order;
      });
      setOrders(updatedOrders); // Update the orders state with the updated order
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const handleProductClick = (orderedProducts) => {
    // Set selected order products to display details
    setSelectedOrderProducts(orderedProducts);
  };

  const handleCloseDetails = () => {
    // Close product details view
    setSelectedOrderProducts(null);
  };

  return (
    <div className="orderDetails">
      <h2>Order Summary</h2>
      <div className="productDetails">
        {orders.map(order => (
          <div key={order._id} className="order">
            <div className="product">
              <img
                src={order.orderedProducts.length > 0 ? order.orderedProducts[0].img : 'placeholder_image_url'}
                alt={order.orderedProducts.length > 0 ? order.orderedProducts[0].name : 'Product'}
                onClick={() => handleProductClick(order.orderedProducts)}
                style={{ cursor: 'pointer' }}
              />
              <div className="productInfo">
                <h4><span>Order ID:</span> {order._id}</h4>
                <p><span>Total Bill Amount: Rs.</span>  {order.totalBillAmount}</p>
                <p><span>Total Products:</span> {order.totalProducts}</p>
                <p><span>Delivery Method:</span> {order.deliveryMethod}</p>
                <p><span>Payment Method:</span> {order.paymentMethod}</p>
                {order.status !== 'Delivered' && (
                  <>
                    <button onClick={() => updateOrderStatus(order._id, 'Shipped')}>Mark as Shipped</button>
                    <button onClick={() => updateOrderStatus(order._id, 'Delivered')}>Mark as Delivered</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedOrderProducts && (
        <div className="productDetails">
          {selectedOrderProducts.map(product => (
            <div key={product._id} className="product">
              <img src={product.img} alt={product.name} />
              <div className="productInfo">
                <h4>{product.name}</h4>
                <p><span>Price: Rs.</span> {product.price} </p>
                <p><span>Quantity:</span> {product.quantity}</p>
                <p><span>Color:</span> {product.colors.length > 0 ? product.colors[0].name : 'N/A'}</p>
              </div>
            </div>
          ))}
          <button onClick={handleCloseDetails}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default OrderSummaryPage;
