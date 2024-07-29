import React from 'react';
import s from './InvoiceModal.module.scss'; // Import your styles

const InvoiceModal = ({ invoiceDetails }) => {
  // Destructure relevant details from invoiceDetails
  const { invoiceId, billingInfo, cartProducts, totalAmount } = invoiceDetails;

  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <h2>Invoice Details</h2>
        <div className={s.invoiceHeader}>
          <p><strong>Invoice ID:</strong> {invoiceId}</p>
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        </div>
        <div className={s.billingInfo}>
          <h3>Billing Information</h3>
          <p><strong>Name:</strong> {billingInfo.firstName}</p>
          <p><strong>Address:</strong> {billingInfo.streetAddress}, {billingInfo.townCity}, {billingInfo.pincode}</p>
          <p><strong>Phone:</strong> {billingInfo.mobileNumber}</p>
        </div>
        <div className={s.cartProducts}>
          <h3>Products</h3>
          <ul>
            {cartProducts.map((product) => (
              <li key={product.id}>
                <p><strong>{product.name}</strong></p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ${product.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.totalAmount}>
          <h3>Total Amount</h3>
          <p>${totalAmount.toFixed(2)}</p>
        </div>
      </div>
      <button className={s.closeButton} onClick={() => setShowModal(false)}>Close</button>
    </div>
  );
};

export default InvoiceModal;
