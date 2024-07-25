// import { useDispatch, useSelector } from "react-redux";
// import { MAXIMUM_QUANTITY, MINIMUM_QUANTITY } from "src/Data/globalVariables";
// import { updateProductsState } from "../../../../Features/productsSlice";
// import SvgIcon from "../SvgIcon";
// import s from "./CustomNumberInput.module.scss";

// const CustomNumberInput = ({ product, quantity }) => {
//   const { cartProducts } = useSelector((state) => state.products);
//   const dispatch = useDispatch();

//   function handleUpdateQuantity(state) {
//     const isDecrease = state === "decrease";
//     const updatedProduct = { ...product };
//     const isBelowMinimum = quantity <= MINIMUM_QUANTITY && isDecrease;
//     const isAboveMaximum = quantity >= MAXIMUM_QUANTITY && !isDecrease;

//     if (isBelowMinimum || isAboveMaximum) return;

//     updatedProduct.quantity += isDecrease ? -1 : 1;
//     updateProductQuantity(updatedProduct);
//   }

//   function handleChangeQuantityInput(e) {
//     const inputValue = parseInt(e.target.value);
//     const updatedProduct = { ...product };

//     if (isNaN(inputValue)) return;

//     const isBelowMinimum = inputValue < MINIMUM_QUANTITY;
//     const isAboveMaximum = inputValue > MAXIMUM_QUANTITY;

//     if (isBelowMinimum) {
//       updatedProduct.quantity = MINIMUM_QUANTITY;
//     } else if (isAboveMaximum) {
//       updatedProduct.quantity = MAXIMUM_QUANTITY;
//     } else {
//       updatedProduct.quantity = inputValue;
//     }

//     updateProductQuantity(updatedProduct);
//     return updatedProduct.quantity;
//   }

//   function updateProductQuantity(updatedProduct) {
//     const indexToUpdate = cartProducts.findIndex(
//       (item) => item.id == updatedProduct.id
//     );

//     if (indexToUpdate === -1) return;

//     const updatedCartProducts = [...cartProducts];
//     updatedCartProducts[indexToUpdate] = updatedProduct;

//     dispatch(
//       updateProductsState({
//         key: "cartProducts",
//         value: updatedCartProducts,
//       })
//     );
//   }

//   return (
  //   <div className={s.numberInput}>
  //     <input
  //       type="number"
  //       value={quantity}
  //       onChange={(e) => handleChangeQuantityInput(e)}
  //       min={MINIMUM_QUANTITY}
  //       max={MAXIMUM_QUANTITY}
  //     />

  //     <div className={s.buttons}>
  //       <button
  //         type="button"
  //         onClick={() => handleUpdateQuantity("increase")}
  //         tabIndex="-1"
  //       >
  //         <SvgIcon name="arrowUp" />
  //       </button>

  //       <button
  //         type="button"
  //         onClick={() => handleUpdateQuantity("decrease")}
  //         tabIndex="-1"
  //       >
  //         <SvgIcon name="arrowUp" />
  //       </button>
  //     </div>
  //   </div>
  // );
// };
// export default CustomNumberInput;




import { useDispatch, useSelector } from "react-redux";
import { updateProductsState } from "../../../../Features/productsSlice";
import { MAXIMUM_QUANTITY, MINIMUM_QUANTITY } from "src/Data/globalVariables";
import SvgIcon from "../SvgIcon";
import s from "./CustomNumberInput.module.scss";

const CustomNumberInput = ({ product, quantity }) => {
  const { cartProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (action) => {
    const newQuantity = action === "increase" ? quantity + 1 : quantity - 1;

    if (newQuantity < MINIMUM_QUANTITY || newQuantity > MAXIMUM_QUANTITY) {
      return;
    }

    updateProductQuantity({ ...product, quantity: newQuantity });
  };

  const handleChangeQuantityInput = (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    if (!isNaN(newQuantity) && newQuantity >= MINIMUM_QUANTITY && newQuantity <= MAXIMUM_QUANTITY) {
      updateProductQuantity({ ...product, quantity: newQuantity });
    }
  };

  const updateProductQuantity = (updatedProduct) => {
    const updatedCartProducts = cartProducts.map((cartProduct) =>
      cartProduct.id === updatedProduct.id ? updatedProduct : cartProduct
    );

    dispatch(updateProductsState({ key: "cartProducts", data: updatedCartProducts }));
  };

  return (
    <div className={s.numberInput}>
      <input
        type="number"
        value={quantity}
        onChange={(e) => handleChangeQuantityInput(e)}
        min={MINIMUM_QUANTITY}
        max={MAXIMUM_QUANTITY}
      />

      <div className={s.buttons}>
        <button
          type="button"
          onClick={() => handleUpdateQuantity("increase")}
          tabIndex="-1"
        >
          <SvgIcon name="arrowUp" />
        </button>

        <button
          type="button"
          onClick={() => handleUpdateQuantity("decrease")}
          tabIndex="-1"
        >
          <SvgIcon name="arrowUp" />
        </button>
      </div>
    </div>
  );
};

export default CustomNumberInput;


