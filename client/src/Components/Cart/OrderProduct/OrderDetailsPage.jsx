import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderDetailsPage.scss';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="orderDetailsPage">
      <h2>Order ID: {order._id}</h2>
      <p>Total Bill Amount: Rs. {order.totalBillAmount}</p>
      <p>Total Products: {order.totalProducts}</p>
      <p>Delivery Method: {order.deliveryMethod}</p>
      <p>Payment Method: {order.paymentMethod}</p>
      <div className="orderedProducts">
        {order.orderedProducts.map(product => (
          <div key={product._id} className="product">
            <img src={product.img} alt={product.name} />
            <div className="productInfo">
              <h4>{product.name}</h4>
              <p>Price: Rs. {product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Color: {product.colors.length > 0 ? product.colors[0].name : 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
