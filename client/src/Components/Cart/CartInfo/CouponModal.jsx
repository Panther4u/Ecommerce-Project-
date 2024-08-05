// import React, { useEffect, useState, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAvailableCoupons, applyCoupon } from '../../../Features/cartSlice';
// import { selectUserId } from 'src/Features/userSlice';
// import s from './CouponModal.module.scss';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CouponModal = ({ isOpen, onClose, onApply }) => {
//   const [selectedCoupon, setSelectedCoupon] = useState('');
//   const userId = useSelector(selectUserId);
//   const coupons = useSelector((state) => state.cart.availableCoupons) || [];
//   const couponStatus = useSelector((state) => state.cart.status);
//   const dispatch = useDispatch();
//   const couponInputRef = useRef(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isOpen && userId) {
//       dispatch(fetchAvailableCoupons(userId));
//     }
//   }, [isOpen, userId, dispatch]);

//   // Use the coupons array directly without filtering
//   const validCoupons = coupons;

//   const handleApplyCoupon = (couponCode) => {
//     if (!couponCode || !userId) {
//       return toast.error('Please enter a valid coupon.');
//     }

//     const coupon = coupons.find(c => c.code === couponCode);

//     if (!coupon) {
//       return toast.error('Coupon code is invalid.');
//     }

//     if (coupon.valid === 'LIMITED_USE' && coupon.usedBy.includes(userId)) {
//       return toast.error('Coupon code has already been used by you.');
//     }

//     setLoadingCouponCode(couponCode);

//     dispatch(applyCoupon({ couponCode, userId }))
//       .unwrap()
//       .then((response) => {
//         toast.success('Coupon applied successfully!');
//         onApply(response.discountPercent);
//         setSelectedCoupon('');
//         setLoadingCouponCode(null);
//         onClose();
//       })
//       .catch((error) => {
//         const errorMessage = error.response?.data?.error || 'Failed to apply coupon. Please try again.';
//         toast.error(errorMessage);
//         setSelectedCoupon('');
//         setLoadingCouponCode(null);
//         onClose();
//       });
//   };
//   const handleCouponClick = (code) => {
//     setSelectedCoupon(code);
//     if (couponInputRef.current) {
//       couponInputRef.current.value = code;
//     }
//   };

//   const handleCopyClick = (code, event) => {
//     navigator.clipboard.writeText(code)
//       .then(() => {
//         event.target.textContent = 'COPIED';
//         setTimeout(() => {
//           event.target.textContent = 'COPY CODE';
//         }, 3000);
//       })
//       .catch((error) => {
//         console.error('Failed to copy text:', error);
//         event.target.textContent = 'FAILED';
//         setTimeout(() => {
//           event.target.textContent = 'COPY CODE';
//         }, 3000);
//       });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className={s.modalBackdrop}>
//       <div className={s.modalContent}>
//         <h2>Apply Coupon Code</h2>
//         <button className={s.closeButton} onClick={onClose} aria-label="Close">
//           ×
//         </button>
//         <div className={s.couponContainer}>
//           <input
//             type="text"
//             placeholder="Enter coupon code"
//             ref={couponInputRef}
//             aria-label="Enter coupon code"
//             value={selectedCoupon}
//             onChange={(e) => setSelectedCoupon(e.target.value)}
//           />
//           <button
//             className={s.couponbtn}
//             type="button"
//             onClick={handleApplyCoupon}
//             aria-label="Apply coupon"
//             disabled={couponStatus === 'loading' || loading}
//           >
//             {loading ? 'Applying...' : 'Apply Coupon'}
//           </button>
//         </div>

//         <div>
//           {validCoupons.length > 0 ? validCoupons.map((coupon) => (
//             <div key={coupon.code} className={s.couponCard}>
//               <img src="src/Assets/Images/special-offer-sale-sign.png" className={s.logo} alt="Coupon Logo" />
//               <p className={s.couponhead}>{coupon.discountPercent}% off on all rides within the city</p>
//               <div className={s.couponRow}>
//                 <span 
//                   className={s.cpnCode}
//                   onClick={() => handleCouponClick(coupon.code)}
//                 >
//                   {coupon.code}
//                 </span>
//                 <span
//                   className={s.cpnBtn}
//                   onClick={(event) => handleCopyClick(coupon.code, event)}
//                 >
//                   Apply Coupon
//                 </span>
//               </div>
//               <p>Valid Till: {new Date(coupon.validUntil).toLocaleDateString()}</p>
//               <div className={s.circle1}></div>
//               <div className={s.circle2}></div>
//             </div>
//           )) : (
//             <p>No available coupons.</p>
//           )}
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default CouponModal;



import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAvailableCoupons, applyCoupon } from '../../../Features/cartSlice';
import { selectUserId } from 'src/Features/userSlice';
import s from './CouponModal.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CouponModal = ({ isOpen, onClose, onApply }) => {
  const [selectedCoupon, setSelectedCoupon] = useState('');
  const [loadingCouponCode, setLoadingCouponCode] = useState(null);
  const userId = useSelector(selectUserId);
  const coupons = useSelector((state) => state.cart.availableCoupons) || [];
  const couponStatus = useSelector((state) => state.cart.status);
  const dispatch = useDispatch();
  const couponInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && userId) {
      dispatch(fetchAvailableCoupons(userId));
    }
  }, [isOpen, userId, dispatch]);

  const handleApplyCoupon = (couponCode) => {
    if (!couponCode || !userId) {
      return toast.error('Please enter a valid coupon.');
    }

    const coupon = coupons.find(c => c.code === couponCode);

    if (!coupon) {
      return toast.error('Coupon code is invalid.');
    }

    if (coupon.valid === 'LIMITED_USE' && coupon.usedBy.includes(userId)) {
      return toast.error('Coupon code has already been used by you.');
    }

    setLoadingCouponCode(couponCode);

    // Simulate loading with a timeout
    setTimeout(() => {
      dispatch(applyCoupon({ couponCode, userId }))
        .unwrap()
        .then((response) => {
          toast.success('Coupon applied successfully!');
          onApply(response.discountPercent);
          setSelectedCoupon('');
          setLoadingCouponCode(null);
          onClose();
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.error || 'Failed to apply coupon. Please try again.';
          toast.error(errorMessage);
          setSelectedCoupon('');
          setLoadingCouponCode(null);
          onClose();
        });
    }, 1000); // Simulating a delay of 1 second
  };

  const handleCouponClick = (code) => {
    setSelectedCoupon(code);
    if (couponInputRef.current) {
      couponInputRef.current.value = code;
    }
  };

  const handleCopyClick = (code, event) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        event.target.textContent = 'COPIED';
        setTimeout(() => {
          event.target.textContent = 'COPY CODE';
        }, 3000);
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
        event.target.textContent = 'FAILED';
        setTimeout(() => {
          event.target.textContent = 'COPY CODE';
        }, 3000);
      });
  };

  if (!isOpen) return null;

  return (
    <div className={s.modalBackdrop}>
      <div className={s.modalContent}>
        <h2>Apply Coupon Code</h2>
        <button className={s.closeButton} onClick={onClose} aria-label="Close">×</button>
        <div className={s.couponContainer}>
          <input
            type="text"
            placeholder="Enter coupon code"
            ref={couponInputRef}
            aria-label="Enter coupon code"
            value={selectedCoupon}
            onChange={(e) => setSelectedCoupon(e.target.value)}
          />
          <button
            className={s.couponbtn}
            type="button"
            onClick={() => handleApplyCoupon(selectedCoupon)}
            aria-label="Apply coupon"
            disabled={couponStatus === 'loading' || loadingCouponCode !== null}
          >
            {loadingCouponCode ? 'Applying...' : 'Apply Coupon'}
          </button>
        </div>
        <div>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <div key={coupon.code} className={s.couponCard}>
                <img src="src/Assets/Images/special-offer-sale-sign.png" className={s.logo} alt="Coupon Logo" />
                <p className={s.couponhead}>{coupon.discountPercent}% off on all rides within the city</p>
                <div className={s.couponRow}>
                  <span className={s.cpnCode} onClick={() => handleCouponClick(coupon.code)}>
                    {coupon.code}
                  </span>
                  <span
                    className={s.cpnBtn}
                    onClick={() => handleApplyCoupon(coupon.code)}
                    aria-label="Apply coupon"
                    disabled={couponStatus === 'loading' || loadingCouponCode === coupon.code}
                  >
                    {loadingCouponCode === coupon.code ? 'Applying...' : 'Apply Coupon'}
                  </span>
                </div>
                <p>Valid Till: {coupon.validUntil}</p>
                <div className={s.circle1}></div>
                <div className={s.circle2}></div>
              </div>
            ))
          ) : (
            <p>No coupons available</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CouponModal;
