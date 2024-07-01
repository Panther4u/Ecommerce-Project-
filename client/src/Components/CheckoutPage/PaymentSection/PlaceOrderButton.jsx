import React, { useState } from 'react';
import './PlaceOrderButton.scss'; // Import your SCSS file for styling

const PlaceOrderButton = () => {
  const [orderState, setOrderState] = useState('default');

  const handleClick = () => {
    setOrderState('placing');

    setTimeout(() => {
      setOrderState('done');
    }, 4000);

    setTimeout(() => {
      setOrderState('default');
    }, 6000);
  };

  return (
    <button className={`place-order place-order--${orderState}`} onClick={handleClick}>
      <div className="default text">Place Order</div>
      <div className="forklift">
        <div className="upper"></div>
        <div className="lower"></div>
      </div>
      <div className="box animation"></div>
      <div className="done text">Done</div>
    </button>
  );
};

export default PlaceOrderButton;
