// Modal.js
import React from 'react';
import s from './Modal.module.scss'; // Add your styles

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={e => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
