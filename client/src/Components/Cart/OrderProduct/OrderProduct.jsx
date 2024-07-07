// import React from 'react';
// import PropTypes from 'prop-types';
// import s from './OrderProduct.module.scss';

// const OrderProduct = ({ product }) => {
//   return (
//     <table className={s.cartProducts}>
//     <thead>
//       <tr>
//         <th>{t('cartPage.productsTable.product')}</th>
//         <th>{t('cartPage.productsTable.price')}</th>
//         <th>{t('cartPage.productsTable.quantity')}</th>
//         <th>{t('cartPage.productsTable.subtotal')}</th>
//       </tr>
//     </thead>
//   </table>
//   );
// };

// OrderProduct.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     quantity: PropTypes.number.isRequired,
//   }).isRequired,
// };

// export default OrderProduct;
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook for localization
import { Link } from 'react-router-dom'; // Import Link for navigation
import CustomNumberInput from '../../Shared/MiniComponents/CustomNumberInput/CustomNumberInput'; // Adjust path as per your project structure
import s from './OrderProduct.module.scss'; // Assuming you have defined styles

const OrderProduct = ({ product }) => {
  const { img, name, shortName, afterDiscount, quantity, id } = product;
  const priceAfterDiscount = afterDiscount.replaceAll(",", ""); // Remove commas from price string
  const subTotal = (quantity * parseFloat(priceAfterDiscount)).toFixed(2); // Calculate subtotal with two decimal places
  const { t } = useTranslation(); // Translation hook for localization

  // Function to translate product details
  function translateProduct(key, uppercase, dynamicData = {}) {
    const shortNameKey = shortName.replaceAll(" ", ""); // Remove spaces from shortName for translation key
    const productTrans = `${shortNameKey}`;
    const translateText = t(`${productTrans} ${key}`, dynamicData); // Translate text using i18n translation function
    return uppercase ? translateText.toUpperCase() : translateText; // Optionally convert to uppercase
  }

  return (
    <tr className={s.orderProduct}>
      <td className={s.product}>
        <div className={s.imgHolder}>
          <img src={img} alt={shortName} />
        </div>
        <Link to={`/details?product=${name}`}>
          {translateProduct("")} {/* Display translated product name */}
        </Link>
      </td>
      <td className={s.price}>RS. {afterDiscount}</td> {/* Display price after discount */}
      <td>
        <CustomNumberInput product={product} quantity={quantity} /> {/* Custom input for quantity */}
      </td>
      <td>RS. {subTotal}</td> {/* Display calculated subtotal */}
    </tr>
  );
};

OrderProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired, // Assuming _id is used as key
    img: PropTypes.string.isRequired, // Image URL
    name: PropTypes.string.isRequired, // Product name
    shortName: PropTypes.string.isRequired, // Short name for translation
    afterDiscount: PropTypes.string.isRequired, // Price after discount
    quantity: PropTypes.number.isRequired, // Quantity of the product
  }).isRequired,
};

export default OrderProduct;
