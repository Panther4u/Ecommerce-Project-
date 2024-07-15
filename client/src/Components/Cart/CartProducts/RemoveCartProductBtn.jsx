import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { removeById } from "../../../Features/productsSlice";
import SvgIcon from "../../Shared/MiniComponents/SvgIcon";
import ToolTip from "../../Shared/MiniComponents/ToolTip";
import s from "./RemoveCartProductBtn.module.scss";

const RemoveCartProductBtn = ({ productId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function removeProduct() {
    const removeAction = removeById({ key: "cartProducts", id: productId });
    dispatch(removeAction);
  }

  return (
    <button type="button" className={s.removeButton} onClick={removeProduct}>
      <SvgIcon name="xMark" />
      <ToolTip top="50%" left="-44px" content={t("tooltips.remove")} />
    </button>
  );
};
export default RemoveCartProductBtn;

// // RemoveCartProductBtn.jsx
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { useTranslation } from "react-i18next";
// import { removeFromCart, updateCartFromBackend } from "../../../Features/cartSlice";
// import SvgIcon from "../../Shared/MiniComponents/SvgIcon";
// import ToolTip from "../../Shared/MiniComponents/ToolTip";
// import s from "./RemoveCartProductBtn.module.scss";

// const RemoveCartProductBtn = ({ productId, onRemove }) => {
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const userId = useSelector((state) => state.user.loginInfo.userId); // Fetch userId from Redux store
//   const removeProduct = async () => {
//     try {
//       const response = await axios.delete(`http://localhost:8000/api/cart/remove/products/${productId}`, {
//         data: { userId }
//       });

//       console.log("Product removed successfully:", response.data);

//       // Dispatch Redux action to update the state after removal
//       const removeAction = removeFromCart({ id: productId });
//       dispatch(removeAction);

//       // Invoke the parent callback to update the cart items after removal
//       if (onRemove) {
//         onRemove(response.data.cartItems); // Assuming response.data.cartItems contains updated cart items
//       }
//     } catch (error) {
//       console.error("Error removing product:", error);
//       // Handle error (e.g., show error message to the user)
//     }
//   };

//   return (
//     <button type="button" className={s.removeButton} onClick={removeProduct}>
//       <SvgIcon name="xMark" />
//       <ToolTip top="50%" left="-44px" content={t("tooltips.remove")} />
//     </button>
//   );
// };

// export default RemoveCartProductBtn;
