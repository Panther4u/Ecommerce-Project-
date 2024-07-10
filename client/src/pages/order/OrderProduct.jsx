// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './OrderProduct.scss';

// const OrderProduct = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/orders/${orderId}`);
//         setOrder(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching order details:', error);
//         toast.error('Failed to fetch order details. Please try again.');
//         setError('Failed to fetch order details');
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="orderDetails">
//       <h2>Order Details</h2>
//       <div className="billingInfo">
//         {/* <h3>Billing Info</h3> */}
//         <p><span>Name:</span> {order.billingInfo.name}</p>
//         <p><span>Address:</span> {order.billingInfo.streetAddress}, {order.billingInfo.townCity}</p>
//         <p><span>Apartment:</span> {order.billingInfo.apartment}</p>
//         <p><span>Pincode:</span> {order.billingInfo.pincode}</p>
//         <p><span>Mobile:</span> {order.billingInfo.mobileNumber}</p>
//       </div>
//       <div className="productDetails">
//         {/* <h3>Products</h3> */}
//         {order.orderedProducts.map(product => (
//           <div key={product._id} className="product">
//             <img src={product.img} alt={product.name} />
//             <div className="productInfo">
//               <h4>{product.name}</h4>
//               {/* <p className="description"><span>Description: </span> {product.description}</p> */}
//               <p><span>Price: Rs.</span> {product.price} </p>
//               <p><span>Quantity:</span> {product.quantity}</p>
//               <p><span>Color:</span> {product.colors[0].name}</p>
//               {/* <p><span>Discount:</span> {product.discount}%</p> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderProduct;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './OrderProduct.scss';

const OrderProduct = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        toast.error('Failed to fetch order details. Please try again.');
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const updateOrderStatus = async (newStatus) => {
    try {
      console.log(`Updating order status to ${newStatus} for order ID ${orderId}`);
      const response = await axios.put(`http://localhost:8000/api/orders/${orderId}/status`, { status: newStatus });
      console.log('Response:', response.data);
      setOrder({ ...order, status: newStatus }); // Update order status in local state
      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="orderDetails">
      <h2>Order Details</h2>
      <div className="billingInfo">
        <div>
          <p><span>Name:</span> {order.billingInfo.firstName}</p>
          <p><span>Address:</span> {order.billingInfo.streetAddress}, {order.billingInfo.townCity}</p>
          <p><span>Apartment:</span> {order.billingInfo.apartment}</p>
          <p><span>Pincode:</span> {order.billingInfo.pincode}</p>
          <p><span>Mobile:</span> {order.billingInfo.mobileNumber}</p>
        </div>
        <div>
          <p><span>Total Bill Amount:</span>Rs. {order.totalBillAmount}</p>
          <p><span>Status: </span> <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></p>
        </div>
      </div>
      <div className="productDetails">
        {order.orderedProducts.map(product => (
          <div key={product._id} className="product">
            <img src={product.img} alt={product.name} />
            <div className="productInfo">
              <h4>{product.name}</h4>
              <p><span>Price: Rs.</span> {product.price} </p>
              <p><span>Quantity:</span> {product.quantity}</p>
              <p><span>Color:</span> {product.colors[0].name}</p>
              <p><span>Status: </span> <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></p>
              {/* Button to update order status */}
              {order.status === 'Pending' && (
                <>
                  <button className="button-primary" onClick={() => updateOrderStatus('Shipped')}>Mark as Shipped</button>
                  <button className="button-success"onClick={() => updateOrderStatus('Delivered')}>Mark as Delivered</button>
                </>
              )}
              {order.status === 'Shipped' && (
                <button className="button-danger" onClick={() => updateOrderStatus('Delivered')}>Mark as Delivered</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProduct;
