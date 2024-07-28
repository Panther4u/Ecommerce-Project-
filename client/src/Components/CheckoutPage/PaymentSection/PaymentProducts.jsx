// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// import s from "./PaymentProducts.module.scss";

// const PaymentProducts = ({ data }) => {
//   const { t } = useTranslation();

//   function translateProduct(key, shortName, uppercase, dynamicData = {}) {
//     const shortNameKey = shortName.replaceAll(" ", "");
//     const productTrans = `products.${shortNameKey}`;
//     const translateText = t(`${productTrans}.${key}`, dynamicData);
//     return uppercase ? translateText.toUpperCase() : translateText;
//   }

//   return (
//     <div className={s.products}>
//       {data.map(({ img, name, shortName, afterDiscount, id }) => (
//         <Link to={`/details?product=${name}`} key={id} className={s.product}>
//           <div className={s.wrapper}>
//             <img src={img} alt={shortName} />
//             <span>{translateProduct("shortName", shortName)}</span>
//           </div>

//           <span className={s.price}>${afterDiscount}</span>
//         </Link>
//       ))}
//     </div>
//   );
// };
// export default PaymentProducts;

// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import s from "./PaymentProducts.module.scss";
// import { removeProductFromCart } from 'src/Features/productsSlice';
// import CustomNumberInput from "../../Shared/MiniComponents/CustomNumberInput/CustomNumberInput";

// const PaymentProducts = () => {
//   const { cartProducts } = useSelector((state) => state.products);
//   const dispatch = useDispatch();

//   return (
//     <div className={s.products}>
//       {cartProducts.map(({ img, name, shortName = '', discount = 0, quantity = 0, id, price = 0 }) => {
//         const validQuantity = !isNaN(quantity) && quantity > 0 ? parseInt(quantity, 10) : 0;
//         const priceNumber = parseFloat(price) || 0;
//         const afterDiscount = discount > 0 ? priceNumber - (priceNumber * discount) / 100 : priceNumber;
//         const priceAfterDiscount = typeof afterDiscount === 'string' ? parseFloat(afterDiscount.replace(/,/g, "")) : afterDiscount;
//         const subTotal = parseFloat((validQuantity * priceAfterDiscount).toFixed(2));

//         const removeProduct = () => {
//           dispatch(removeProductFromCart({ key: 'cartProducts', id }));
//         };

//         if (validQuantity === 0) {
//           return null;
//         }

//         return (
//           // <Link to={`/details?product=${name}`} key={id} className={s.product}>
//           //   <div className={s.wrapper}>
//           //     <img src={`http://localhost:8000/${img}`} alt={shortName} />
//           //     <span>{shortName}</span>
//           //   </div>
//           //   <span className={s.price}>Rs. {subTotal}</span>
//           // </Link>
//           <>
//               <div className={s.productContainer}>
//       <img src={`http://localhost:8000/${img}`} alt={shortName || name} className={s.productImage} />
//       <div className={s.productDetails}>
//         <p className={s.productName}>{shortName || name}</p>
//         <p className={s.price}>Rs. {subTotal.toFixed(2)}</p>
//         <p className={s.sizeAndQuantity}>
//           Qty: {quantity}
//         </p>
//         <div className={s.sellerInfo}>
//           <span>Free Delivery</span>
//         </div>
//       </div>
//     </div>
//           </>
//         );
//       })}
//     </div>
//   );
// };

// // export default PaymentProducts;
import React from 'react';
import { useSelector } from 'react-redux';
import s from './PaymentProducts.module.scss';

const PaymentProducts = () => {
  const { cartProducts } = useSelector((state) => state.products);

  return (
    <div className={s.products}>
      {cartProducts.map(({ img, name, shortName = '', discount = 0, quantity = 0, id, price = 0 }) => {
        const validQuantity = !isNaN(quantity) && quantity > 0 ? parseInt(quantity, 10) : 0;
        const priceNumber = parseFloat(price) || 0;
        const afterDiscount = discount > 0 ? priceNumber - (priceNumber * discount) / 100 : priceNumber;
        const subTotal = parseFloat((validQuantity * afterDiscount).toFixed(2));

        const originalPriceFormatted = priceNumber.toFixed(2);
        const discountedPriceFormatted = afterDiscount.toFixed(2);

        if (validQuantity === 0) {
          return null;
        }

        return (
          <div className={s.productContainer} key={id}>
            <div className={s.imageContainer}>
              <img 
                src={`http://localhost:8000/${img}`} 
                alt={shortName || name} 
                className={s.productImage} 
                onError={(e) => e.target.src = '/path/to/fallback-image.jpg'} 
              />
            </div>
            <div className={s.productDetails}>
              {discount > 0 && (
                <div className={s.discountBadge}>
                  {discount}%
                </div>
              )}
              <p className={s.productName}>{shortName || name}</p>
              <div className={s.priceContainer}>
                {discount > 0 && (
                  <p className={s.originalPrice}>
                    Rs. {originalPriceFormatted}
                  </p>
                )}
                <p className={s.discountedPrice}>
                  Rs. {discountedPriceFormatted}
                </p>
              </div>
              <p className={s.sizeAndQuantity}>
                Qty: {validQuantity}
              </p>
              <p className={s.returnPolicy}>Free Delivery</p>
              <p className={s.returnPolicy}>All issues easy return allowed</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentProducts;


// import React from 'react';
// import { useSelector } from 'react-redux';
// import s from './PaymentProducts.module.scss';
// import CustomNumberInput from '../../Shared/MiniComponents/CustomNumberInput/CustomNumberInput';

// const PaymentProducts = () => {
//   const { cartProducts } = useSelector((state) => state.products);

//   return (
//     <div className={s.products}>
//       {cartProducts.map(({ img, name, shortName = '', discount = 0, quantity = 0, id, price = 0 }) => {
//         const validQuantity = !isNaN(quantity) && quantity > 0 ? parseInt(quantity, 10) : 0;
//         const priceNumber = parseFloat(price) || 0;
//         const afterDiscount = discount > 0 ? priceNumber - (priceNumber * discount) / 100 : priceNumber;
//         const priceAfterDiscount = typeof afterDiscount === 'string' ? parseFloat(afterDiscount.replace(/,/g, "")) : afterDiscount;
//         const subTotal = parseFloat((validQuantity * priceAfterDiscount).toFixed(2));

//         const originalPriceFormatted = priceNumber.toFixed(2);
//         const discountedPriceFormatted = priceAfterDiscount.toFixed(2);

//         if (validQuantity === 0) {
//           return null;
//         }

//         return (
//           <div className={s.productContainer} key={id}>
//             <div className={s.imageContainer}>
//               <img 
//                 src={`http://localhost:8000/${img}`} 
//                 alt={shortName || name} 
//                 className={s.productImage} 
//                 onError={(e) => e.target.src = '/path/to/fallback-image.jpg'} 
//               />
//             </div>
//             <div className={s.productDetails}>
//               {discount > 0 && (
//                 <div className={s.discountBadge}>
//                   {discount}%
//                 </div>
//               )}
//               <p className={s.productName}>{shortName || name}</p>
//               <div className={s.priceContainer}>
//                 {discount > 0 && (
//                   <p className={s.originalPrice}>
//                     Rs. {originalPriceFormatted}
//                   </p>
//                 )}
//                 <p className={s.discountedPrice}>
//                   Rs. {discountedPriceFormatted}
//                 </p>
//               </div>
//               <p className={s.sizeAndQuantity}>
//                 Qty: <CustomNumberInput product={{ id, price: priceAfterDiscount, discount }} quantity={validQuantity} />
//               </p>
//               <p className={s.returnPolicy}>Free Delivery</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default PaymentProducts;
