import React, { useEffect, useRef, useState } from 'react';
import s from './SuccessMessage.module.scss';
import { useNavigate } from 'react-router-dom';
import useScrollOnMount from "src/Hooks/App/useScrollOnMount";

// PathLoader class definition
class PathLoader {
  constructor(el) {
    this.el = el;
    this.strokeLength = el.getTotalLength();
    this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.strokeLength;
  }

  _draw(val) {
    this.el.style.strokeDashoffset = this.strokeLength * (1 - val);
  }

  setProgress(val, cb) {
    this._draw(val);
    if (cb && typeof cb === 'function') cb();
  }

  setProgressFn(fn) {
    if (typeof fn === 'function') fn(this);
  }
}

const SuccessMessage = ({ invoiceId }) => {
  const [active, setActive] = useState(false);
  const pathRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const pathLoader = new PathLoader(path);

      const showSuccessMessage = () => {
        setActive(true);
        pathLoader.setProgress(1);
      };

      const hideSuccessMessage = () => {
        setActive(false);
        pathLoader.setProgress(0);
      };

      const handleClick = () => {
        if (active) {
          hideSuccessMessage();
        } else {
          showSuccessMessage();
        }
      };

      setTimeout(showSuccessMessage, 200);
      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [active]);

  const handleReturnHome = () => {
    navigate('/');
  };

  console.log('SuccessMessage invoiceId:', invoiceId); // Debugging line
  useScrollOnMount();
  return (
    <div className={`${s.fundsSuccessMessageContainer} ${active ? s.active : ''}`}>
      <div className={s.fundsContainer}>
        <div className={s.fundsCheckmarkTextContainer}>
          <div className={s.fundsCheckmarkContainer}>
            <svg className={s.fundsCheckmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className={s.fundsCheckmarkCircle} cx="26" cy="26" r="25" fill="none" />
              <path ref={pathRef} className={s.fundsCheckmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            <div className={s.fundsDisplayOnIe}>
              <svg className={s.fundsIeCheckmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className={s.fundsIeCheckmarkCircle} cx="26" cy="26" r="25" fill="none" />
                <path className={s.fundsIeCheckmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
          </div>
          <h1 className={s.fundsSuccessDoneText}>Done!</h1>
        </div>
        <div className={s.fundsSuccessMessage}>
          <h2>Thank you for your order</h2>
          <h3>ORDER CONFIRMATION</h3>
          <p>Your invoice #{invoiceId} has been successful!</p>
        </div>
      </div>

      <div className={s.proceedPayment}>
            <button
              type="button"
              className={s.proceedButton}
              onClick={handleReturnHome}
            >
              Return Home
            </button>
          </div>
    </div>
  );
};

export default SuccessMessage;
