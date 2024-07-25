// import cookies from "js-cookie";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { addToArray, removeById } from "src/Features/productsSlice";
// import { favIconToolTipLeftPos } from "src/Functions/componentsFunctions";
// import {
//   checkDateBeforeMonthToPresent,
//   isItemFound,
// } from "src/Functions/helper";
// import {
//   detailsIconToolTipLeftPos,
//   trashcanIconToolTipLeftPos,
// } from "../../../../Functions/componentsFunctions";
// import SvgIcon from "../../MiniComponents/SvgIcon";
// import ToolTip from "../../MiniComponents/ToolTip";
// import AddToCartButton from "./AddToCartButton";
// import s from "./ProductCard.module.scss";
// import ProductCardInfo from "./ProductCardInfo";

// const ProductCard = ({
//   product,
//   customization = {
//     stopHover: false,
//     showDiscount: true,
//     showFavIcon: true,
//     showDetailsIcon: true,
//     showRemoveIcon: false,
//     showNewText: false,
//     showWishList: true,
//     showColors: false,
//   },
//   removeFrom,
// }) => {
//   const {
//     name,
//     price,
//     discount,
//     afterDiscount,
//     img,
//     rate,
//     votes,
//     id,
//     addedDate,
//     colors,
//   } = product;
//   const {
//     stopHover,
//     showDiscount,
//     showFavIcon,
//     showDetailsIcon,
//     showRemoveIcon,
//     showNewText,
//     showWishList,
//     showColors,
//   } = customization;
//   const noHoverClass = stopHover ? s.noHover : "";
//   const hideDiscountClass = discount <= 0 || !showDiscount ? s.hide : "";
//   const hideNewClass = shouldHideNewWord();
//   const { loadingProductDetails } = useSelector((state) => state.global);
//   const { loginInfo } = useSelector((state) => state.user);
//   const { favoritesProducts, wishList } = useSelector(
//     (state) => state.products
//   );
//   const isAddedToWishList = wishList?.find(
//     (wishProduct) => wishProduct.id === id
//   );
//   const isAddedToFavorites = favoritesProducts?.find(
//     (favProduct) => favProduct.id === id
//   );
//   const navigateTo = useNavigate();
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const lang = cookies.get("i18next");
//   const favIconLeftToolTipPos = favIconToolTipLeftPos(lang);
//   const detailsIconLeftToolTipPos = detailsIconToolTipLeftPos(lang);
//   const trashcanIconLeftToolTipPos = trashcanIconToolTipLeftPos(lang);

//   function shouldHideNewWord() {
//     return checkDateBeforeMonthToPresent(addedDate) || !showNewText
//       ? s.hide
//       : "";
//   }

//   function addProductToFavorite() {
//     const isProductAlreadyExist = isItemFound(favoritesProducts, product, "id");
//     if (!loginInfo.isSignIn) navigateTo("/signup");
//     if (isProductAlreadyExist) {
//       dispatch(removeById({ key: "favoritesProducts", id: product.id }));
//       return;
//     }

//     dispatch(addToArray({ key: "favoritesProducts", value: product }));
//   }

//   function navigateToProductDetails() {
//     if (loadingProductDetails) return;
//     navigateTo(`/details?product=${name.toLowerCase()}`);
//   }

  // function addProductToWishList() {
  //   const isProductAlreadyExist = isItemFound(wishList, product, "id");
  //   if (!loginInfo.isSignIn) navigateTo("/signup");
  //   if (isProductAlreadyExist) {
  //     dispatch(removeById({ key: "wishList", id: product.id }));
  //     return;
  //   }

  //   dispatch(addToArray({ key: "wishList", value: product }));
  // }

//   return (
//     <div className={`${s.card} ${noHoverClass}`}>
//       <div className={s.productImg}>
//         <div className={s.imgHolder}>
//           <img
//             src={img}
//             alt={name}
//             aria-label={name}
//             onClick={navigateToProductDetails}
//           />
//         </div>

//         <div className={s.layerContent}>
//           {hideNewClass && (
//             <div className={`${s.discount} ${hideDiscountClass}`}>
//               -{discount}%
//             </div>
//           )}

//           <div className={`${s.new} ${hideNewClass}`}>New</div>

//           <div className={s.icons}>
//             {showFavIcon && (
//               <button
//                 type="button"
//                 className={`${s.iconHolder} ${s.favIcon} ${
//                   isAddedToFavorites ? s.active : ""
//                 }`}
//                 onClick={addProductToFavorite}
//                 aria-label={t("productCard.icons.favorite")}
//               >
//                 <div className={s.heartBackground}></div>
//                 <SvgIcon name="heart" />
//                 <ToolTip
//                   top="18px"
//                   left={favIconLeftToolTipPos}
//                   content={t("productCard.icons.favorite")}
//                 />
//               </button>
//             )}

//             {showDetailsIcon && (
//               <Link
//                 onClick={navigateToProductDetails}
//                 className={`${s.iconHolder} ${s.detailsIcon}`}
//                 aria-label={t("productCard.icons.details")}
//               >
//                 <SvgIcon name="eye" />
//                 <ToolTip
//                   top="18px"
//                   left={detailsIconLeftToolTipPos}
//                   content={t("productCard.icons.details")}
//                 />
//               </Link>
//             )}

//             {showRemoveIcon && (
//               <button
//                 type="button"
//                 className={`${s.iconHolder} ${s.removeIcon}`}
//                 aria-label={`Remove from ${removeFrom}`}
//                 onClick={() => dispatch(removeById({ key: removeFrom, id }))}
//               >
//                 <SvgIcon name="trashCan" />
//                 <ToolTip
//                   top="18px"
//                   left={trashcanIconLeftToolTipPos}
//                   content={t("productCard.icons.remove")}
//                 />
//               </button>
//             )}

//             {showWishList && (
//               <button
//                 type="button"
//                 className={`${s.iconHolder} ${s.wishListIcon} ${
//                   isAddedToWishList ? s.active : ""
//                 }`}
//                 onClick={addProductToWishList}
//                 aria-label="Add to wishlist"
//               >
//                 <SvgIcon name="save" />
//                 <ToolTip
//                   top="18px"
//                   left="-41px"
//                   content={t("productCard.icons.wishlist")}
//                 />
//               </button>
//             )}
//           </div>

//           <AddToCartButton hoverDataAttribute={true} product={product} />
//         </div>
//       </div>

//       <ProductCardInfo
//         product={product}
//         showColors={showColors}
//         navigateToProductDetails={navigateToProductDetails}
//       />
//     </div>
//   );
// };
// export default ProductCard;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { addToArray, removeById, selectProducts, addProductToWishlist, removeProductFromWishlist } from 'src/Features/productsSlice';
import {
  checkDateBeforeMonthToPresent,
  isItemFound,
} from 'src/Functions/helper';
import {
  detailsIconToolTipLeftPos,
  favIconToolTipLeftPos,
  trashcanIconToolTipLeftPos,
} from 'src/Functions/componentsFunctions';
import SvgIcon from '../../MiniComponents/SvgIcon';
import ToolTip from '../../MiniComponents/ToolTip';
import AddToCartButton from './AddToCartButton';
import s from './ProductCard.module.scss';
import ProductCardInfo from './ProductCardInfo';
import cookies from "js-cookie";
import { selectUserId } from 'src/Features/userSlice';

const ProductCard = ({
  product,
  customization = {
    stopHover: false,
    showDiscount: true,
    showFavIcon: true,
    showDetailsIcon: true,
    showRemoveIcon: false,
    showNewText: false,
    showWishList: true,
    showColors: false,
  },
  removeFrom,
}) => {
  // Destructure product and customization properties
  const {
    name,
    price,
    discount,
    img,
    rate,
    votes,
    id,
    addedDate,
    colors,
  } = product;

  const {
    stopHover,
    showDiscount,
    showFavIcon,
    showDetailsIcon,
    showRemoveIcon,
    showNewText,
    showWishList,
    showColors,
  } = customization;

  const noHoverClass = stopHover ? s.noHover : '';
  const hideDiscountClass = discount <= 0 || !showDiscount ? s.hide : '';
  const hideNewClass = shouldHideNewWord();
  const { loadingProductDetails } = useSelector((state) => state.global);
  const { loginInfo } = useSelector((state) => state.user);
  const products = useSelector(selectProducts);
  const favoritesProducts = useSelector((state) => state.products.favoritesProducts);
  const wishList = useSelector((state) => state.products.wishList);
  const isAddedToWishList = wishList?.some((wishProduct) => wishProduct.id === id);
  const isAddedToFavorites = favoritesProducts?.find((favProduct) => favProduct.id === id);
  const userId = useSelector(selectUserId); // Get userId from Redux state
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const lang = cookies.get('i18next');
  const favIconLeftToolTipPos = favIconToolTipLeftPos(lang);
  const detailsIconLeftToolTipPos = detailsIconToolTipLeftPos(lang);
  const trashcanIconLeftToolTipPos = trashcanIconToolTipLeftPos(lang);
  const navigateTo = useNavigate();

  // Determine whether to hide the "New" label
  function shouldHideNewWord() {
    return checkDateBeforeMonthToPresent(addedDate) || !showNewText ? s.hide : '';
  }

  // Add or remove product from favorites
  function addProductToFavorite() {
    const isProductAlreadyExist = isItemFound(favoritesProducts, product, 'id');
    if (!loginInfo.isSignIn) navigateTo('/signup');
    if (isProductAlreadyExist) {
      dispatch(removeById({ key: 'favoritesProducts', id: product.id }));
      return;
    }
    dispatch(addToArray({ key: 'favoritesProducts', value: product }));
  }

  // Navigate to product details page
  function navigateToProductDetails() {
    if (loadingProductDetails) return;
    navigateTo(`/details?product=${name.toLowerCase()}`);
  }


  // function addProductToWishList() {
  //   const isProductAlreadyExist = isItemFound(wishList, product, "id");
  //   if (!loginInfo.isSignIn) navigateTo("/signup");
  //   if (isProductAlreadyExist) {
  //     dispatch(removeById({ key: "wishList", id: product.id }));
  //     return;
  //   }

  //   dispatch(addToArray({ key: "wishList", value: product }));
  // }


  // Handle adding/removing product to/from wishlist
  const handleWishlistClick = async () => {
    if (!userId) {
      navigateTo('/signup');
      return;
    }
  
    try {
      const productExists = wishList.some(item => item.id === product.id);
  
      if (productExists) {
        await dispatch(removeProductFromWishlist({ userId, productId: product.id })).unwrap();
        console.log('Product removed from wishlist.');
      } else {
        await dispatch(addProductToWishlist({
          userId,
          product: {
            id,
            discount,
            name,
            category: product.category,
            price,
            description: product.description,
            img,
            shortName: product.shortName,
            quantity: product.quantity || 1
          }
        })).unwrap();
        console.log('Product added to wishlist.');
      }
  
      // Optionally, you can verify the state change here
      console.log('Updated wishlist:', wishList);
    } catch (error) {
      console.error('Error updating wishlist:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };
  

  // Handle image loading error
  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = '/src/Assets/Images/Avatar.jpg'; // Placeholder image
  };

  return (
    <div className={`${s.card} ${noHoverClass}`}>
      <div className={s.productImg}>
        <div className={s.imgHolder}>
          <img
            src={img ? `http://localhost:8000/${img}` : '/src/Assets/Images/Avatar.jpg'}
            alt={name}
            aria-label={name}
            onClick={navigateToProductDetails}
            onError={handleImageError}
          />
        </div>
        <div className={s.layerContent}>
          {hideNewClass && (
            <div className={`${s.discount} ${hideDiscountClass}`}>
              -{discount}%
            </div>
          )}
          <div className={`${s.new} ${hideNewClass}`}>New</div>
          <div className={s.icons}>
            {showDetailsIcon && (
              <Link
                onClick={navigateToProductDetails}
                className={`${s.iconHolder} ${s.detailsIcon}`}
                aria-label={t('productCard.icons.details')}
              >
                <SvgIcon name="eye" />
                <ToolTip
                  top="18px"
                  left={detailsIconLeftToolTipPos}
                  content={t('productCard.icons.details')}
                />
              </Link>
            )}
            {showRemoveIcon && (
              <button
                type="button"
                className={`${s.iconHolder} ${s.removeIcon}`}
                aria-label={`Remove from ${removeFrom}`}
                onClick={() => {
                  dispatch(removeProductFromWishlist({ userId, productId: id }));
                }}
              >
                <SvgIcon name="trashCan" />
                <ToolTip
                  top="18px"
                  left={trashcanIconLeftToolTipPos}
                  content={t('productCard.icons.remove')}
                />
              </button>
            )}
            {showWishList && (
              <button
                type="button"
                className={`${s.iconHolder} ${s.wishListIcon} ${isAddedToWishList ? s.active : ''}`}
                onClick={handleWishlistClick}
                aria-label="Add to wishlist"
              >
                <SvgIcon name="heart" />
                <ToolTip
                  top="18px"
                  left="-41px"
                  content={t('productCard.icons.wishlist')}
                />
              </button>
            )}
          </div>
          <AddToCartButton hoverDataAttribute={true} product={product} />
        </div>
      </div>
      <ProductCardInfo
        product={product}
        showColors={showColors}
        navigateToProductDetails={navigateToProductDetails}
      />
    </div>
  );
};

export default ProductCard;

