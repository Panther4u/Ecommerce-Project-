// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addToArray, removeByKeyName } from "src/Features/productsSlice";
// import { isItemFound } from "src/Functions/helper";
// import SvgIcon from "../../Shared/MiniComponents/SvgIcon";
// import ToolTip from "../../Shared/MiniComponents/ToolTip";
// import s from "./ProductDealingControls.module.scss";

// const ProductDealingControls = ({ data }) => {
//   const { favoritesProducts } = useSelector((state) => state.products);
//   const { loginInfo } = useSelector((state) => state.user);
//   const navigateTo = useNavigate();
//   const dispatch = useDispatch();
//   const [quantity, setQuantity] = useState(1);
//   const { t } = useTranslation();
//   const isFavoriteProduct =
//     favoritesProducts.filter((product) => product.shortName === data.shortName)
//       .length !== 0;

//   function increaseQuantity() {
//     setQuantity((prevNumber) => +prevNumber + 1);
//   }

//   function decreaseQuantity() {
//     setQuantity((prevNumber) => +prevNumber - 1);
//   }

//   function handleBuyProduct() {
//     if (!loginInfo.isSignIn) navigateTo("/signup");
//   }

//   function addProductToFavorite() {
//     const isProductAlreadyExist = isItemFound(
//       favoritesProducts,
//       data,
//       "shortName"
//     );

//     if (!loginInfo.isSignIn) navigateTo("/signup");
//     if (isProductAlreadyExist) {
//       dispatch(
//         removeByKeyName({
//           dataKey: "favoritesProducts",
//           itemKey: "shortName",
//           keyValue: data.shortName,
//         })
//       );
//       return;
//     }

//     dispatch(addToArray({ key: "favoritesProducts", value: data }));
//   }

//   return (
//     <section className={s.dealing}>
//       <div className={s.customNumberInput}>
//         <button onClick={decreaseQuantity} type="button">
//           <label htmlFor="quantity-input">-</label>
//         </button>

//         <input
//           type="number"
//           onChange={(e) => setQuantity(e.target.value)}
//           value={quantity}
//           min={1}
//           max={1000}
//           id="quantity-input"
//         />

//         <button onClick={increaseQuantity} type="button">
//           <label htmlFor="quantity-input">+</label>
//         </button>
//       </div>

//       <div className={s.wrapper}>
//         <button
//           type="button"
//           className={s.buyButton}
//           onClick={handleBuyProduct}
//         >
//           {t("buttons.buyNow")}
//         </button>

//         <button
//           type="button"
//           className={`${s.addToFav} ${isFavoriteProduct ? s.active : ""}`}
//           aria-label={t("detailsPage.addToFav")}
//           onClick={addProductToFavorite}
//         >
//           <div className={s.heartBackground} />
//           <SvgIcon name="heart" />
//           <ToolTip left="50%" top="60px" content={t("detailsPage.addToFav")} />
//         </button>
//       </div>
//     </section>
//   );
// };
// export default ProductDealingControls;




import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToArray, removeByKeyName } from "src/Features/productsSlice";
import { isItemFound } from "src/Functions/helper";
import SvgIcon from "../../Shared/MiniComponents/SvgIcon";
import ToolTip from "../../Shared/MiniComponents/ToolTip";
import s from "./ProductDealingControls.module.scss";


const InstagramIcon = () => (
  <svg
    id="instagram"
    fill="rgb(217, 50, 117)"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="169.063px"
    height="169.063px"
    viewBox="0 0 169.063 169.063"
    style={{ enableBackground: "new 0 0 169.063 169.063" }}
    xmlSpace="preserve"
  >
    <g>
      <path
        d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752
             c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407
             c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752
             c17.455,0,31.656,14.201,31.656,31.655V122.407z"
      />
      <path
        d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561
             C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561
             c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z"
      />
      <path
        d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78
             c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78
             C135.661,29.421,132.821,28.251,129.921,28.251z"
      />
    </g>
  </svg>
);

const WhatsAppIcon = () => (
  <img
    src="https://raw.githubusercontent.com/gauravghongde/social-icons/9d939e1c5b7ea4a24ac39c3e4631970c0aa1b920/SVG/Color/WhatsApp.svg"
    alt="WhatsApp Icon"
    style={{ width: '24px', height: '24px' }} // Adjust size as needed
  />
);

const ProductDealingControls = ({ data }) => {
  const { favoritesProducts } = useSelector((state) => state.products);
  const { loginInfo } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { t } = useTranslation();
  const isFavoriteProduct = favoritesProducts.some(
    (product) => product.shortName === data.shortName
  );

  const [shareImage, setShareImage] = useState(null);
  const [shareMessage, setShareMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [sharePlatform, setSharePlatform] = useState(""); // Track which platform to share on

  function increaseQuantity() {
    setQuantity((prevNumber) => +prevNumber + 1);
  }

  function decreaseQuantity() {
    setQuantity((prevNumber) => Math.max(+prevNumber - 1, 1));
  }

  function handleBuyProduct() {
    if (!loginInfo.isSignIn) {
      navigateTo("/signup");
      return;
    }

    dispatch(addToArray({ key: "cartProducts", value: { ...data, quantity } }));
    navigateTo("/cart");
  }

  function addProductToFavorite() {
    if (!loginInfo.isSignIn) {
      navigateTo("/signup");
      return;
    }

    const isProductAlreadyExist = isItemFound(
      favoritesProducts,
      data,
      "shortName"
    );

    if (isProductAlreadyExist) {
      dispatch(
        removeByKeyName({
          dataKey: "favoritesProducts",
          itemKey: "shortName",
          keyValue: data.shortName,
        })
      );
    } else {
      dispatch(addToArray({ key: "favoritesProducts", value: data }));
    }
  }

  async function getBase64Image(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL("image/jpeg"); // Adjust format if needed
        resolve(dataURL);
      };

      img.onerror = (error) => reject(error);
      img.src = imageUrl;
    });
  }

  async function shareOnInstagram() {
    try {
      const productImage =
        data.otherImages.length > 0 ? data.otherImages[0] : data.img;
      const imageData = await getBase64Image(productImage);
      const caption = `Check out this product: ${data.name} - ${data.description}`;
      setShareImage(imageData);
      setShareMessage(caption);
      setSharePlatform("instagram");
      setShowPreview(true);
    } catch (error) {
      console.error("Error preparing image data:", error);
    }
  }

  async function shareOnWhatsApp() {
    try {
      const productImage =
        data.otherImages.length > 0 ? data.otherImages[0] : data.img;
      const message = `Check out this product: ${data.name} - ${data.description} \n\n${window.location.origin}/details?product=${encodeURIComponent(
        data.shortName
      )}`;
      setShareImage(productImage); // Only for preview
      setShareMessage(message);
      setSharePlatform("whatsapp");
      setShowPreview(true);
    } catch (error) {
      console.error("Error preparing image data:", error);
    }
  }

  function confirmShare() {
    if (showPreview) {
      if (shareMessage) {
        // Handle Instagram sharing
        if (sharePlatform === "instagram") {
          const instagramUrl = `https://www.instagram.com/create/story/?title=${encodeURIComponent(
            shareMessage
          )}&media=${encodeURIComponent(shareImage)}`;
          window.open(instagramUrl, "_blank");
        }

        // Handle WhatsApp sharing
        if (sharePlatform === "whatsapp") {
          const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
            shareMessage
          )}`;
          window.open(whatsappUrl, "_blank");
        }

        setShowPreview(false); // Close the preview modal after sharing
      }
    }
  }

  return (
    <section className={s.dealing}>
      {/* Quantity input section */}
      <div className={s.wrapper}>
        <div className={s.customNumberInput}>
                  <button onClick={decreaseQuantity} type="button">
          <label htmlFor="quantity-input">-</label>
        </button>

        <input
          type="number"
          onChange={(e) => setQuantity(Math.max(+e.target.value, 1))}
          value={quantity}
          min={1}
          max={1000}
          id="quantity-input"
        />

        <button onClick={increaseQuantity} type="button">
          <label htmlFor="quantity-input">+</label>
        </button>
        </div>

        <div>
              
        <button type="button" className={s.buyButton} onClick={handleBuyProduct}>
          {t("Add 2 Cart")}
        </button>
        </div>
      </div>

      {/* Buttons for buying, adding to favorites, and sharing */}
      <div className={s.wrapper}>


        {/* Button to add to favorites */}
        <button
          type="button"
          className={`${s.addToFav} ${isFavoriteProduct ? s.active : ""}`}
          aria-label={t("detailsPage.addToFav")}
          onClick={addProductToFavorite}
        >
          <div className={s.heartBackground} />
          <SvgIcon name="heart" />
          <ToolTip left="50%" top="60px" content={t("detailsPage.addToFav")} />
        </button>

        {/* Button to share on Instagram */}
        <button type="button" className={s.addToFav} onClick={shareOnInstagram}>
          <InstagramIcon className={s.heartBackground} />
        </button>

        {/* Button to share on WhatsApp */}
        <button type="button" className={s.addToFav} onClick={shareOnWhatsApp}>
          <WhatsAppIcon className={s.whatsappIcon} />
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className={s.modal}>
          <div className={s.modalContent}>
            <button className={s.closeButton} onClick={() => setShowPreview(false)}>
              &times;
            </button>
            <img src={shareImage} alt="Shared Product" className={s.previewImage} />
            <p>{shareMessage}</p>
            <button className={s.shareButton} onClick={confirmShare}>
              Share
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDealingControls;
