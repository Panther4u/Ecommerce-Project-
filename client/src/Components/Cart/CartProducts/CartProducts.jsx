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



import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CartProduct from './CartProduct'; // Assuming you have this component defined
import s from './CartProducts.module.scss';

const CartProducts = () => {
  const { t } = useTranslation(); // Translation hook for localization
  const { cartProducts } = useSelector((state) => state.products); // Fetch cart products from Redux store

  return (
    <div className={s.cartProducts}>
      {cartProducts.length === 0 ? ( // Conditional rendering for empty cart
        <p>{t('cartPage.emptyCartMessage')}</p> // Localization key for empty cart message
      ) : (
        <table className={s.cartProducts}>
          <thead>
            <tr>
              <th>{t('cartPage.productsTable.product')}</th>
              <th>{t('cartPage.productsTable.price')}</th>
              <th>{t('cartPage.productsTable.quantity')}</th>
              <th>{t('cartPage.productsTable.subtotal')}</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product) => (
              <CartProduct key={product.id} data={product} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartProducts;
