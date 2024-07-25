// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addToArray, removeByKeyName } from "src/Features/productsSlice";
// import { isItemFound } from "src/Functions/helper";
// import SvgIcon from "../../MiniComponents/SvgIcon";
// import s from "./AddToCartButton.module.scss";
// import { useTranslation } from "react-i18next";

// const AddToCartButton = ({ product }) => {
//   const { t } = useTranslation();
//   const cartProducts = useSelector((state) => state.products.cartProducts);
//   const loginInfo = useSelector((state) => state.user.loginInfo);
//   const isProductAlreadyExist = isItemFound(cartProducts, product, "shortName");
//   const [iconNameState, setIconName] = useState(isProductAlreadyExist ? "trashCan" : "cart3");
//   const navigateTo = useNavigate();
//   const dispatch = useDispatch();
//   const buttonText = t(
//     `productCard.buttonText.${isProductAlreadyExist ? "removeFromCart" : "addToCart"}`
//   );

//   function handleCartButton() {
//     console.log("Button clicked:", { isProductAlreadyExist, loginInfo });
//     if (!loginInfo.isSignIn) {
//       navigateTo("/signup");
//       return;
//     }
//     isProductAlreadyExist ? removeFromCart() : addToCart();
//   }

//   function addToCart() {
//     console.log("Adding to cart:", product);
//     const addAction = addToArray({ key: "cartProducts", value: product });
//     dispatch(addAction);
//     setIconName("trashCan");
//   }

//   function removeFromCart() {
//     console.log("Removing from cart:", product);
//     const removeAction = removeByKeyName({
//       dataKey: "cartProducts",
//       itemKey: "shortName",
//       keyValue: product.shortName,
//     });

//     dispatch(removeAction);
//     setIconName("cart3");
//   }

//   return (
//     <button
//       type="button"
//       className={`${s.addToCartBtn} ${s.addToCartButton}`}
//       onClick={handleCartButton}
//       aria-label={buttonText}
//       data-add-to-cart-button
//     >
//       <SvgIcon name={iconNameState} />
//       <span>{buttonText}</span>
//     </button>
//   );
// };

// export default AddToCartButton;

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addToArray, removeByKeyName } from "src/Features/productsSlice";
// import { selectUserId } from "src/Features/userSlice";
// import { isItemFound } from "src/Functions/helper";
// import SvgIcon from "../../MiniComponents/SvgIcon";
// import s from "./AddToCartButton.module.scss";
// import { useTranslation } from "react-i18next";

// const AddToCartButton = ({ product }) => {
//   const { t } = useTranslation();
//   const { cartProducts } = useSelector((state) => state.products);
//   const { loginInfo } = useSelector((state) => state.user);
//   const userId = useSelector(selectUserId);
//   const isProductAlreadyExist = isItemFound(cartProducts, product, "shortName");
//   const [iconNameState, setIconName] = useState(isProductAlreadyExist ? "trashCan" : "cart3");
//   const navigateTo = useNavigate();
//   const dispatch = useDispatch();
//   const buttonText = t(
//     `productCard.buttonText.${
//       isProductAlreadyExist ? "removeFromCart" : "addToCart"
//     }`
//   );

//   function handleCartButton() {
//     if (!loginInfo.isSignIn) {
//       navigateTo("/signup");
//       return;
//     }
//     if (isProductAlreadyExist) {
//       removeFromCart();
//     } else {
//       addToCart();
//     }
//   }

//   function addToCart() {
//     const addAction = addToArray({ key: "cartProducts", value: product });
//     dispatch(addAction);
//     setIconName("trashCan");
//   }

//   function removeFromCart() {
//     const removeAction = removeByKeyName({
//       dataKey: "cartProducts",
//       itemKey: "shortName",
//       keyValue: product.shortName,
//     });
//     dispatch(removeAction);
//     setIconName("cart3");
//   }

//   return (
//     <button
//       type="button"
//       className={`${s.addToCartBtn} ${s.addToCartButton}`}
//       onClick={handleCartButton}
//       aria-label={buttonText}
//       data-add-to-cart-button
//     >
//       <SvgIcon name={iconNameState} />
//       <span>{buttonText}</span>
//     </button>
//   );
// };

// export default AddToCartButton;



import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToArray, removeByKeyName } from "src/Features/productsSlice";
import { isItemFound } from "src/Functions/helper";
import SvgIcon from "../../MiniComponents/SvgIcon";
import s from "./AddToCartButton.module.scss";
import { useTranslation } from "react-i18next";

const AddToCartButton = ({ product }) => {
  const { t } = useTranslation();
  const { cartProducts } = useSelector((state) => state.products);
  const { loginInfo } = useSelector((state) => state.user);
  
  const [isProductAlreadyExist, setIsProductAlreadyExist] = useState(
    isItemFound(cartProducts, product, "shortName")
  );
  const [iconNameState, setIconNameState] = useState(
    isProductAlreadyExist ? "trashCan" : "cart3"
  );

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const buttonText = t(
    `productCard.buttonText.${
      isProductAlreadyExist ? "removeFromCart" : "addToCart"
    }`
  );

  function handleCartButton() {
    if (!loginInfo.isSignIn) {
      navigateTo("/signup");
      return;
    }

    if (isProductAlreadyExist) {
      removeFromCart();
    } else {
      addToCart();
    }
  }

  function addToCart() {
    const addAction = addToArray({ key: "cartProducts", value: product });
    dispatch(addAction);
    setIsProductAlreadyExist(true);
    setIconNameState("trashCan");
  }

  function removeFromCart() {
    const removeAction = removeByKeyName({
      dataKey: "cartProducts",
      itemKey: "shortName",
      keyValue: product.shortName,
    });

    dispatch(removeAction);
    setIsProductAlreadyExist(false);
    setIconNameState("cart3");
  }

  return (
    <button
      type="button"
      className={`${s.addToCartBtn} ${s.addToCartButton}`}
      onClick={handleCartButton}
      aria-label={buttonText}
      data-add-to-cart-button
    >
      <SvgIcon name={iconNameState} />
      <span>{buttonText}</span>
    </button>
  );
};

export default AddToCartButton;
