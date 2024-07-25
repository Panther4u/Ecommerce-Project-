// import { useTranslation } from "react-i18next";
// import RateStars from "../../MidComponents/RateStars/RateStars";
// import ProductColors from "../../MiniComponents/ProductColors/ProductColors";
// import s from "./ProductCardInfo.module.scss";

// const ProductCardInfo = ({ product, showColors, navigateToProductDetails }) => {
//   const { shortName, price, discount, afterDiscount, rate, votes, colors } =
//     product;
//   const { t } = useTranslation();

//   function translateProduct(key, uppercase, dynamicData = {}) {
//     const shortNameKey = shortName.replaceAll(" ", "");
//     const productTrans = `${shortNameKey}`;
//     const translateText = t(`${productTrans} ${key}`, dynamicData);
//     return uppercase ? translateText.toUpperCase() : translateText;
//   }

//   return (
//     <section className={s.productInfo}>
//       <strong className={s.productName}>
//         <a href="#" onClick={() => navigateToProductDetails()}>
//           {translateProduct("")}
//         </a>
//       </strong>
//       <div className={s.price}>
//         RS.{afterDiscount}
//         {discount > 0 && <del className={s.afterDiscount}>RS.{price}</del>}
//       </div>

//       <div className={s.rateContainer}>
//         <RateStars rate={rate} />

//         <span className={s.numOfVotes}>({votes})</span>
//       </div>

//       {showColors && (
//         <div className={s.colors}>
//           <ProductColors colors={colors} />
//         </div>
//       )}
//     </section>
//   );
// };
// export default ProductCardInfo;



import { useTranslation } from "react-i18next";
import RateStars from "../../MidComponents/RateStars/RateStars";
import ProductColors from "../../MiniComponents/ProductColors/ProductColors";
import s from "./ProductCardInfo.module.scss";

const ProductCardInfo = ({ product, showColors, navigateToProductDetails }) => {
  const { shortName, price, discount, rate, votes, colors } = product;
  const { t } = useTranslation();

  // Calculate discounted price if applicable
  const afterDiscount = discount > 0 ? price - (price * discount) / 100 : price;

  // Format afterDiscount to two decimal places
  const formattedPrice = afterDiscount.toFixed(2);

  // Function to translate product names dynamically
  function translateProduct(key, uppercase, dynamicData = {}) {
    const shortNameKey = shortName.replaceAll(" ", "");
    const productTrans = `${shortNameKey}`;
    const translateText = t(`${productTrans} ${key}`, dynamicData);
    return uppercase ? translateText.toUpperCase() : translateText;
  }

  return (
    <section className={s.productInfo}>
      <strong className={s.productName}>
        <a href="#" onClick={() => navigateToProductDetails()}>
          {translateProduct("")}
        </a>
      </strong>
      <div className={s.price}>
        RS.{formattedPrice} {/* Display formatted price with two decimal places */}
        {discount > 0 && (
          <del className={s.afterDiscount}>RS.{price}</del> // Display original price with strike-through if discounted
        )}
      </div>

      <div className={s.rateContainer}>
        <RateStars rate={rate} /> {/* Display star rating based on 'rate' prop */}
        <span className={s.numOfVotes}>({votes})</span> {/* Display number of votes */}
      </div>

      {showColors && (
        <div className={s.colors}>
          <ProductColors colors={colors} /> {/* Display product colors */}
        </div>
      )}
    </section>
  );
};

export default ProductCardInfo;

