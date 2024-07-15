import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CustomNumberInput from "../../Shared/MiniComponents/CustomNumberInput/CustomNumberInput";
import s from "./CartProduct.module.scss";
import RemoveCartProductBtn from "./RemoveCartProductBtn";

const CartProduct = ({ data }) => {
  const { img, name, shortName, afterDiscount, quantity, id } = data;
  const priceAfterDiscount = afterDiscount.replaceAll(",", "");
  const subTotal = (quantity * priceAfterDiscount).toFixed(2);
  const { t } = useTranslation();

  function translateProduct(key, uppercase, dynamicData = {}) {
    const shortNameKey = shortName.replaceAll(" ", "");
    const productTrans = `${shortNameKey}`;
    const translateText = t(`${productTrans} ${key}`, dynamicData);
    return uppercase ? translateText.toUpperCase() : translateText;
  }

  return (
    <tr className={s.productContainer}>
      <td className={s.product}>
        <div className={s.imgHolder}>
          <img src={img} alt={shortName} />
          <RemoveCartProductBtn productId={id} />
        </div>

        <Link to={`/details?product=${name}`}>
          {translateProduct("")}
        </Link>
      </td>

      <td className={s.price}>RS. {afterDiscount}</td>

      <td>
        <CustomNumberInput product={data} quantity={quantity} />
      </td>

      <td>RS. {subTotal}</td>
    </tr>
  );
};
export default CartProduct;





// import React, { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import CustomNumberInput from '../../Shared/MiniComponents/CustomNumberInput/CustomNumberInput';
// import s from './CartProduct.module.scss';
// import RemoveCartProductBtn from './RemoveCartProductBtn';
// import { updateCartFromBackend } from '../../../Features/cartSlice';

// const CartProduct = ({ data }) => {
//   const { img, name, shortName, afterDiscount, quantity, id } = data;
//   const priceAfterDiscount = parseFloat(afterDiscount.replaceAll(',', ''));
//   const subTotal = (quantity * priceAfterDiscount).toFixed(2);
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.user.loginInfo.userId); // Fetch userId from Redux store

//   useEffect(() => {
//     const saveProductToCart = async () => {
//       try {
//         if (!userId) {
//           throw new Error('User is not logged in.');
//         }

//         const productData = { userId, id, img, name, shortName, afterDiscount, quantity };

//         const response = await axios.post('http://localhost:8000/api/cart/add', productData);

//         if (response.data.message) {
//           console.log(response.data.message);
//           dispatch(updateCartFromBackend(response.data.cartItems));
//         } else {
//           dispatch(updateCartFromBackend(response.data));
//         }
//       } catch (error) {
//         console.error('Error saving cart product:', error);
//         // Handle error saving product
//       }
//     };

//     if (userId) {
//       saveProductToCart();
//     }
//   }, [userId, data, dispatch]);

//   function translateProduct(key, uppercase, dynamicData = {}) {
//     const shortNameKey = shortName.replaceAll(' ', '');
//     const productTrans = `${shortNameKey}`;
//     const translateText = t(`${productTrans} ${key}`, dynamicData);
//     return uppercase ? translateText.toUpperCase() : translateText;
//   }

//   return (
//     <tr className={s.productContainer}>
//       <td className={s.product}>
//         <div className={s.imgHolder}>
//           <img src={img} alt={shortName} />
//           <RemoveCartProductBtn productId={id} />
//         </div>
//         <Link to={`/details?product=${name}`}>
//           {translateProduct('')}
//         </Link>
//       </td>
//       <td className={s.price}>RS. {afterDiscount}</td>
//       <td>
//         <CustomNumberInput product={data} quantity={quantity} />
//       </td>
//       <td>RS. {subTotal}</td>
//     </tr>
//   );
// };

// export default CartProduct;
