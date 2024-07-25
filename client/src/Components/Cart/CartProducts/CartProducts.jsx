// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import CartProduct from "./CartProduct";
// import s from "./CartProducts.module.scss";

// const CartProducts = () => {
//   const { t } = useTranslation();
//   const { cartProducts } = useSelector((state) => state.products);
//   const productsTable = "cartPage.productsTable";

//   return (
//     <table className={s.cartProducts}>
//       <thead>
//         <tr>
//           <th>{t(`${productsTable}.product`)}</th>
//           <th>{t(`${productsTable}.price`)}</th>
//           <th>{t(`${productsTable}.quantity`)}</th>
//           <th>{t(`${productsTable}.subtotal`)}</th>
//         </tr>
//       </thead>

//       <tbody>
//         {cartProducts.map((product) => (
//           <CartProduct key={product.id} data={product} />
//         ))}
//       </tbody>
//     </table>
//   );
// };
// export default CartProducts;



// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
// import CartProduct from './CartProduct'; // Assuming you have this component defined
// import s from './CartProducts.module.scss';

// const CartProducts = () => {
//   const { t } = useTranslation(); // Translation hook for localization
//   const { cartProducts } = useSelector((state) => state.products); // Fetch cart products from Redux store

//   return (
//     <div className={s.cartProducts}>
//       {cartProducts.length === 0 ? ( // Conditional rendering for empty cart
//         <p>{t('cartPage.emptyCartMessage')}</p> // Localization key for empty cart message
//       ) : (
//         <table className={s.cartProducts}>
//           <thead>
//             <tr>
//               <th>{t('cartPage.productsTable.product')}</th>
//               <th>{t('cartPage.productsTable.price')}</th>
//               <th>{t('cartPage.productsTable.quantity')}</th>
//               <th>{t('cartPage.productsTable.subtotal')}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartProducts.map((product) => (
//               <CartProduct key={product.id} data={product} />
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CartProducts;

// import React, { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchCartProducts, selectCartProducts, selectStatus, selectError } from 'src/Features/productsSlice';
// import CartProduct from './CartProduct';
// import s from './CartProducts.module.scss';

// const CartProducts = ({ userId }) => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const cartProducts = useSelector(selectCartProducts) || [];
//   const status = useSelector(selectStatus);
//   const error = useSelector(selectError);

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchCartProducts({ userId }));
//     }
//   }, [dispatch, userId]);

//   if (status === 'loading') {
//     return <p>{t('cartPage.loading')}</p>;
//   }

//   if (status === 'failed') {
//     return <p>{t('cartPage.errorMessage')}: {error}</p>;
//   }

//   return (
//     <div className={s.cartProducts}>
//       {cartProducts.length === 0 ? (
//         <p>{t('cartPage.emptyCartMessage')}</p>
//       ) : (
//         <table className={s.cartProducts}>
//           <thead>
//             <tr>
//               <th>{t('cartPage.productsTable.product')}</th>
//               <th>{t('cartPage.productsTable.price')}</th>
//               <th>{t('cartPage.productsTable.quantity')}</th>
//               <th>{t('cartPage.productsTable.subtotal')}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartProducts.map((product) => (
//               <CartProduct key={product.id} data={product} />
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CartProducts;

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartProducts, selectCartProducts, selectStatus, selectError } from 'src/Features/productsSlice';
import CartProduct from './CartProduct';
import s from './CartProducts.module.scss';
import emptyCartImage from 'src/Assets/Images/empty-cart.png';

const CartProducts = ({ userId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartProducts) || [];
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const [loadingDelay, setLoadingDelay] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // New state to track data loading

  useEffect(() => {
    let timer;
    if (userId) {
      timer = setTimeout(() => {
        setLoadingDelay(true); // Simulate loading delay
        dispatch(fetchCartProducts({ userId })).finally(() => {
          setIsDataLoaded(true); // Set data loaded to true after fetch
        });
      }, 500); // Delay of 500ms
    }

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [dispatch, userId]);

  const validCartProducts = Array.isArray(cartProducts) ? cartProducts : [];

  return (
    <div className={s.cartProducts}>
      {status === 'loading' || !isDataLoaded ? (
        <div className={s.loading}>
          <div className={s.spinner}></div>
        </div>
      ) : status === 'error' ? (
        <div className={s.error}>
          <p>{t('Failed to load cart products. Please try again later.')}</p>
        </div>
      ) : validCartProducts.length === 0 ? (
        <div className={s.emptyCart}>
          <img src={emptyCartImage} alt={t('cartPage.emptyCartAlt')} />
          <p>{t('Your Cart Is Empty')}</p>
        </div>
      ) : (
        <table className={s.cartProductsTable}>
          <tbody>
            {validCartProducts.map((product) => (
              <CartProduct key={product.id} data={product} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartProducts;






// import React, { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchCartProducts, selectCartProducts, selectStatus, selectError } from 'src/Features/productsSlice';
// import CartProduct from './CartProduct';
// import s from './CartProducts.module.scss';
// import emptyCartImage from 'src/Assets/Images/empty-cart.png';

// const CartProducts = ({ userId }) => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const cartProducts = useSelector(selectCartProducts) || [];
//   const status = useSelector(selectStatus);
//   const error = useSelector(selectError);

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchCartProducts({ userId }));
//     }
//   }, [dispatch, userId]);

//   // console.log('CartProducts:', cartProducts); // Debugging

//   const validCartProducts = Array.isArray(cartProducts) ? cartProducts : [];

//   return (
//     <div>
//       {status === 'loading' ? (
//         <div className={s.loading}>
//           <p>{t('Loading...')}</p>
//         </div>
//       ) : status === 'error' ? (
//         <div className={s.error}>
//           <p>{t('Failed to load cart products. Please try again later.')}</p>
//         </div>
//       ) : validCartProducts.length === 0 ? (
//         <div className={s.emptyCart}>
//           <img src={emptyCartImage} alt={t('cartPage.emptyCartAlt')} />
//           <p>{t('Your Cart Is Empty')}</p>
//         </div>
//       ) : (
//         // <div  className={s.cartProducts}>
//         //     {validCartProducts.map((product) => (
//         //       <CartProduct key={product.id} data={product} />
//         //     ))}
//         // </div>
//         <table className={s.cartProducts}>
//           <tbody>
//             {validCartProducts.map((product) => (
//               <CartProduct key={product.id} data={product} />
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CartProducts;

