// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// import CustomNumberInput from "../../Shared/MiniComponents/CustomNumberInput/CustomNumberInput";
// import s from "./CartProduct.module.scss";
// import RemoveCartProductBtn from "./RemoveCartProductBtn";

// const CartProduct = ({ data }) => {
//   const { img, name, shortName, afterDiscount, quantity, id } = data;
//   const priceAfterDiscount = afterDiscount.replaceAll(",", "");
//   const subTotal = (quantity * priceAfterDiscount).toFixed(2);
//   const { t } = useTranslation();

//   function translateProduct(key, uppercase, dynamicData = {}) {
//     const shortNameKey = shortName.replaceAll(" ", "");
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
//           {translateProduct("")}
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
  // const { img, name, shortName, afterDiscount, quantity, id } = data;
  // const priceAfterDiscount = parseFloat(afterDiscount.replaceAll(',', ''));
  // const subTotal = (quantity * priceAfterDiscount).toFixed(2);
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

//         const response = await axios.post('${API_BASE_URL}/api/cart/add', productData);

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

// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import CustomNumberInput from '../../Shared/MiniComponents/CustomNumberInput/CustomNumberInput';
// import s from './CartProduct.module.scss';
// import RemoveCartProductBtn from './RemoveCartProductBtn';
// import PropTypes from 'prop-types';

// const CartProduct = ({ data }) => {
//   const { img, name, shortName = '', price, discount = 0, quantity = 0, id } = data;
//   const afterDiscount = discount > 0 ? price - (price * discount) / 100 : price;
//   const priceAfterDiscount = typeof afterDiscount === 'string' ? parseFloat(afterDiscount.replace(/,/g, "")) : afterDiscount;
//   const subTotal = (quantity * (priceAfterDiscount || 0)).toFixed(2);
//   const { t } = useTranslation();

//   function translateProduct(key, uppercase, dynamicData = {}) {
//     const shortNameKey = shortName.replace(/\s+/g, ""); // Handle undefined shortName
//     const productTrans = `${shortNameKey}${key ? ` ${key}` : ''}`;
//     const translateText = t(productTrans, dynamicData);
//     return uppercase ? translateText.toUpperCase() : translateText;
//   }

//   return (
//     <tr className={s.productContainer}>
//       <td className={s.product}>
//         <div className={s.imgHolder}>
//           <img src={`${API_BASE_URL}/${img}`} alt={shortName} />
//           <RemoveCartProductBtn productId={id} />
//         </div>
//         <Link to={`/details?product=${name}`}>
//           {translateProduct("")}
//         </Link>
//       </td>
//       <td className={s.price}>RS. {price}</td>
//       <td>
//         <CustomNumberInput product={data} quantity={quantity} />
//       </td>
//       <td>RS. {subTotal}</td>
//     </tr>
//   );
// };

// CartProduct.propTypes = {
//   data: PropTypes.shape({
//     img: PropTypes.string,
//     name: PropTypes.string,
//     shortName: PropTypes.string,
//     price: PropTypes.number,
//     discount: PropTypes.number,
//     quantity: PropTypes.number,
//     id: PropTypes.string
//   }).isRequired
// };

// export default CartProduct;


// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import CustomNumberInput from '../../Shared/MiniComponents/CustomNumberInput/CustomNumberInput';
// import s from './CartProduct.module.scss';
// import RemoveCartProductBtn from './RemoveCartProductBtn';
// import PropTypes from 'prop-types';

// const CartProduct = ({ data }) => {
//   const { img, name, shortName = '', discount, quantity, id, price } = data;
//   const validQuantity = !isNaN(quantity) && quantity > 0 ? parseInt(quantity, 10) : 0;
//   const afterDiscount = discount > 0 ? price - (price * discount) / 100 : price;
//   const priceAfterDiscount = typeof afterDiscount === 'string' ? parseFloat(afterDiscount.replace(/,/g, "")) : afterDiscount;
//   const subTotal = (validQuantity * (priceAfterDiscount || 0)).toFixed(2);
//   const { t } = useTranslation();

//   function translateProduct(key, uppercase, dynamicData = {}) {
//     const shortNameKey = shortName.replace(/\s+/g, ""); // Handle undefined shortName
//     const productTrans = `${shortNameKey}${key ? ` ${key}` : ''}`;
//     const translateText = t(productTrans, dynamicData);
//     return uppercase ? translateText.toUpperCase() : translateText;
//   }

//   if (validQuantity === 0) {
//     // console.warn('Skipping product with zero quantity:', data);
//     return null;
//   }

//   return (
//     <tr className={s.productContainer}>
//       <td className={s.product}>
//         <div className={s.imgHolder}>
//           <img src={`${API_BASE_URL}/${img}`} alt={shortName} />
//           <RemoveCartProductBtn productId={id} />
//         </div>
//         <Link className={s.productName} to={`/details?product=${name}`}>
//           {translateProduct("")}
//         </Link>
//       </td>
//       <td className={s.price}>RS. {price}</td>
//       <td>
//         <CustomNumberInput product={data} quantity={validQuantity} />
//       </td>
//       <td>RS. {subTotal}</td>
//     </tr>
//   );
// };

// CartProduct.propTypes = {
//   data: PropTypes.shape({
//     img: PropTypes.string,
//     name: PropTypes.string,
//     shortName: PropTypes.string,
//     price: PropTypes.number,
//     discount: PropTypes.number,
//     quantity: PropTypes.number,
//     id: PropTypes.string
//   }).isRequired
// };

// export default CartProduct;import React from 'react';


import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductFromCart, addProductToWishlist, updateProductQuantity } from 'src/Features/productsSlice';
import s from './CartProduct.module.scss';
import CustomNumberInput from '../../Shared/MiniComponents/CustomNumberInput/CustomNumberInput';
import { FaHeart } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { selectUserId } from 'src/Features/userSlice';
import { API_BASE_URL } from 'src/api/index';

const CartProduct = ({ data }) => {
  const { img, name, shortName = '', discount = 0, quantity = 0, id, price = 0 } = data;
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const wishList = useSelector((state) => state.products.wishList);
  const { t } = useTranslation();
  const priceNumber = parseFloat(price) || 0;

  // Function to calculate the discounted price based on quantity
  const calculateDiscountedPrice = (price, discount, quantity) => {
    const afterDiscount = discount > 0 ? price - (price * discount) / 100 : price;
    return afterDiscount * quantity;
  };

  // Function to handle quantity change
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeProduct();
    } else {
      const discountedPrice = calculateDiscountedPrice(priceNumber, discount, newQuantity);
      dispatch(updateProductQuantity({ userId, productId: id, quantity: newQuantity, discountedPrice }));
    }
  };

  const removeProduct = () => {
    dispatch(removeProductFromCart({ userId, productId: id }));
  };

  const moveToWishlist = async () => {
    if (!userId) {
      console.error('User ID is missing');
      return;
    }

    const productExists = wishList.some(item => item.id === id);

    if (!productExists) {
      try {
        await dispatch(removeProductFromCart({ userId, productId: id })).unwrap();
        const validQuantity = quantity > 0 ? quantity : 1;
        await dispatch(addProductToWishlist({
          userId,
          product: {
            id,
            discount,
            name,
            category: data.category,
            price,
            description: data.description,
            img,
            shortName,
            quantity: validQuantity
          }
        })).unwrap();
        // console.log('Product successfully added to wishlist and removed from cart.');
      } catch (error) {
        console.error('Error moving product to wishlist:', error.message);
      }
    }
  };

  const translateProduct = (key, uppercase, dynamicData = {}) => {
    const shortNameKey = shortName.replace(/\s+/g, "").toLowerCase();
    const productTrans = `${shortNameKey}${key ? key : ''}`;
    const translateText = t(productTrans, dynamicData);
    return uppercase ? translateText.toUpperCase() : translateText;
  };

  // Calculate the total discounted price based on current quantity
  const discountedPrice = calculateDiscountedPrice(priceNumber, discount, quantity);

  if (quantity <= 0) {
    return null;
  }

  return (
    <div className={s.productContainer}>
      <div className={s.imageContainer}>
        <img 
          src={`${API_BASE_URL}/${img}`} 
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
              ₹ {priceNumber.toFixed(2)}
            </p>
          )}
          <p className={s.discountedPrice}>
            ₹ {discountedPrice.toFixed(2)}
          </p>
        </div>
        <p className={s.sizeAndQuantity}>
          Qty: <CustomNumberInput product={data} quantity={quantity} onChange={handleQuantityChange} />
        </p>
        <p className={s.returnPolicy}>Free Delivery</p>
        <p className={s.returnPolicy}>All issues easy return allowed</p>
        <div className={s.sellerInfo}>
          <p onClick={removeProduct} className={s.remove}>
            <MdDelete className={s.deleteIcon} /> {t('remove')}
          </p>
          <p onClick={moveToWishlist} className={s.moveToWishlist}>
            <FaHeart className={s.wishlistIcon} /> {t('MoveToWishlist')}
          </p>
        </div>
      </div>
    </div>
  );
};

CartProduct.propTypes = {
  data: PropTypes.shape({
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    shortName: PropTypes.string,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    quantity: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    category: PropTypes.string,
    description: PropTypes.string
  }).isRequired
};

export default CartProduct;
