import React from 'react';
import { useLocation } from 'react-router-dom';
import SuccessMessage from './SuccessMessage';
import s from './OrderSuccessPage.module.scss'; // Import the SCSS module

const OrderSuccessPage = () => {
  const location = useLocation();
  const { invoiceId } = location.state || {}; // Destructure invoiceId from location.state

  // Debugging: Log the invoiceId and location.state
  console.log('OrderSuccessPage location.state:', location.state);
  console.log('OrderSuccessPage invoiceId:', invoiceId);

  return (
    <div className={s.successContainer}>
      {invoiceId ? (
        <div className={s.successMessage}>
          <SuccessMessage invoiceId={invoiceId} />
        </div>
      ) : (
        <p className={s.loading}>Loading...</p>
      )}
    </div>
  );
};

export default OrderSuccessPage;
