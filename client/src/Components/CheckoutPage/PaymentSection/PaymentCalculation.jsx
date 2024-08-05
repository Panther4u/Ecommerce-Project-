// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import { getSubTotal } from "src/Functions/helper";
// import s from "./PaymentCalculation.module.scss";

// const PaymentCalculation = () => {
//   const { cartProducts } = useSelector((state) => state.products);
//   const subTotal = getSubTotal(cartProducts);
//   const { t } = useTranslation();
//   const cartInfo = "cartPage.cartInfoMenu";

//   return (
//     <div className={s.calculationInfo}>
//       <div className={s.item}>
//         <span>{t(`${cartInfo}.subTotal`)}:</span>
//         <span>${subTotal}</span>
//       </div>

//       <div className={s.item}>
//         <span>{t(`${cartInfo}.shipping`)}:</span>
//         <span>{t(`${cartInfo}.free`)}</span>
//       </div>

//       <div className={s.item}>
//         <span>{t(`${cartInfo}.total`)}:</span>
//         <span>${subTotal}</span>
//       </div>
//     </div>
//   );
// };
// export default PaymentCalculation;






import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSubTotal, calculateTotalDiscount } from 'src/Functions/helper';
import s from './PaymentCalculation.module.scss';

const PaymentCalculation = ({ setTotalAmount }) => {
  const { cartProducts } = useSelector((state) => state.products);
  const couponDiscount = useSelector((state) => state.cart.couponDiscount) || 0;

  // Extract and filter unique product IDs, removing any invalid IDs
  const uniqueProductIds = Array.from(new Set(cartProducts.map(p => p.id).filter(id => id !== undefined)));

  // Get the count of unique products
  const uniqueProductCount = uniqueProductIds.length;

  // Debugging: Log unique product IDs and count
  // console.log('Unique Product IDs:', uniqueProductIds);
  // console.log('Number of Unique Products:', uniqueProductCount);

  // Ensure unique products and aggregate quantities
  const uniqueProductsMap = new Map();
  cartProducts.forEach(product => {
    if (product.id) {
      if (!uniqueProductsMap.has(product.id)) {
        uniqueProductsMap.set(product.id, {
          ...product,
          quantity: product.quantity || 1 // Default quantity to 1 if not provided
        });
      } else {
        // If the product already exists, update its quantity
        const existingProduct = uniqueProductsMap.get(product.id);
        existingProduct.quantity += (product.quantity || 1);
        uniqueProductsMap.set(product.id, existingProduct);
      }
    }
  });

  const uniqueCartProducts = Array.from(uniqueProductsMap.values());

  // Calculate subtotal and total discount
  const subTotal = parseFloat(getSubTotal(uniqueCartProducts)) || 0;
  const totalDiscount = calculateTotalDiscount(uniqueCartProducts) || 0;
  
  // Apply coupon discount to subtotal
  const discountAmount = (subTotal * couponDiscount) / 100;
  const totalAfterDiscount = subTotal - totalDiscount - discountAmount;

  useEffect(() => {
    setTotalAmount(totalAfterDiscount);
  }, [totalAfterDiscount, setTotalAmount]);

  const formatCurrency = (value) => {
    return typeof value === 'number' ? value.toFixed(2) : '0.00';
  };

  return (
    <div className={s.menu}>
      <div className={s.content}>
        <div className={s.item}>
          <span>Total Products:</span>
          <span>{uniqueProductCount}</span>
        </div>
        <div className={s.item}>
          <span>Total MRP : </span>
          <span>₹ {formatCurrency(subTotal)}</span>
        </div>

        <div className={`${s.item} ${s.discount}`}>
          <span>Total Discount:</span>
          <span className={s.value}>₹ {formatCurrency(totalDiscount)}</span>
        </div>

        <div className={`${s.item} ${s.discount}`}>
          <span>Coupon Discount:</span>
          <span className={s.value}>₹ {formatCurrency(discountAmount)}</span>
        </div>
        
        <div className={s.item}>
          <span>Shipping:</span>
          <span>Free</span>
        </div>

        <div className={`${s.items} ${s.total}`} >
          <span>Total:</span>
          <span>₹ {formatCurrency(totalAfterDiscount)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentCalculation;
