import React from 'react';
import PropTypes from 'prop-types';
import s from './PaymentModal.module.scss';

const PaymentModal = ({ show, onClose, qrCode }) => {
  if (!show) return null;

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <h2>Complete Your Payment</h2>
        <p>To complete your payment, please scan the QR code below using your UPI app:</p>
        {qrCode ? (
          <img src={qrCode} alt="UPI QR Code" className={s.qrCode} />
        ) : (
          <p>Loading QR code...</p>
        )}
        <button onClick={onClose} className={s.closeButton}>Close</button>
      </div>
    </div>
  );
};

PaymentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  qrCode: PropTypes.string,
};

export default PaymentModal;
