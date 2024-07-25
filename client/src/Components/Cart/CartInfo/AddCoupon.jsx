// import { useRef } from "react";
// import { useTranslation } from "react-i18next";
// import s from "./AddCoupon.module.scss";

// const AddCoupon = () => {
//   const couponInputRef = useRef("");
//   const { t } = useTranslation();

//   return (
//     <div className={s.couponContainer}>
//       <input
//         type="text"
//         placeholder={t("inputsPlaceholders.couponExample")}
//         onChange={(e) => (couponInputRef.current = e.target.value)}
//       />

//       <button type="button">{t("buttons.applyCoupon")}</button>
//     </div>
//   );
// };
// export default AddCoupon;








import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon } from "src/Features/cartSlice"; // Import applyCoupon action from cartSlice
import s from "./AddCoupon.module.scss";
import { toast } from "react-toastify";

const AddCoupon = () => {
  const couponInputRef = useRef(null); // Initialize with null
  const [applyCouponError, setApplyCouponError] = useState("");
  const [applyCouponSuccess, setApplyCouponSuccess] = useState("");
  
  const userId = useSelector((state) => state.user.loginInfo.userId);
  const dispatch = useDispatch();

  const handleApplyCoupon = async () => {
    const couponCode = couponInputRef.current?.value.trim(); // Optional chaining for safety
    if (!couponCode) {
      toast.error("Coupon code cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/apply-coupon", { userId, couponCode });
      const { discountPercentage, message } = response.data;

      dispatch(applyCoupon(discountPercentage)); // Dispatch action to apply coupon discount to Redux store
      setApplyCouponSuccess(message);
      toast.success(message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setApplyCouponError(error.response.data.error);
        toast.error(error.response.data.error); // Use toast for errors
      } else {
        setApplyCouponError("An error occurred while applying the coupon");
        toast.error("An error occurred while applying the coupon"); // Use a generic error message
      }
    }
  };

  return (
    <div className={s.couponContainer}>
      <input
        type="text"
        placeholder="Enter coupon code"
        ref={couponInputRef}
        aria-label="Enter coupon code"
      />
      <button
        type="button"
        onClick={handleApplyCoupon}
        aria-label="Apply coupon"
      >
        Apply Coupon
      </button>
    </div>
  );
};

export default AddCoupon;
