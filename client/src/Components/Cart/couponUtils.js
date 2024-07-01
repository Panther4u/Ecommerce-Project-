// couponUtils.js
export const generateFirstTimeLoginCoupon = () => {
    const couponCode = `WELCOME-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    // Add logic to store this coupon in the user's account or database if needed
    return couponCode;
  };
  