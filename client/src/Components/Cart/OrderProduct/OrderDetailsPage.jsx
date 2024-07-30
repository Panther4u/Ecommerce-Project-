import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './OrderDetailsPage.module.scss'; // Importing CSS Modules

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { userId } = useSelector(state => state.user);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders/${userId}/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      }
    };

    if (userId && orderId) {
      fetchOrder();
    }
  }, [orderId, userId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.orderDetailsPage}>
      <h2>Order ID: {order._id}</h2>
      <p>Total Bill Amount: Rs. {order.totalAmount}</p>
      <p>Total Products: {order.cartProducts.length}</p>
      <p>Delivery Method: {order.deliveryMethod}</p>
      <p>Payment Method: {order.paymentMethod}</p>
      <div className={styles.orderedProducts}>
        {order.cartProducts.map(product => (
          <div key={product.id} className={styles.product}>
            <img 
              src={`http://localhost:8000/${product.img}`} 
              alt={product.name} 
              onError={(e) => e.target.src = 'path/to/placeholder-image.jpg'} // Handle image load errors
            />
            <div className={styles.productInfo}>
              <h4>{product.name}</h4>
              <p>Price: Rs. {product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Color: {product.colors && product.colors.length > 0 ? product.colors[0].name : 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
