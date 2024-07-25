// import { useTranslation } from "react-i18next";
// import ProductColors from "../../Shared/MiniComponents/ProductColors/ProductColors";
// import s from "./ProductColorsSection.module.scss";

// const ProductColorsSection = ({ data: { colors } }) => {
//   const { t } = useTranslation();
//   const hasColors = colors?.length > 0 && colors;

//   if (!hasColors) return null;

//   return (
//     <section className={s.colors}>
//       <span>{t("detailsPage.colors")}:</span>
//       <ProductColors colors={colors} showToolTip={true} />
//     </section>
//   );
// };
// export default ProductColorsSection;


import { useTranslation } from "react-i18next";
import ProductColors from "../../Shared/MiniComponents/ProductColors/ProductColors";
import s from "./ProductColorsSection.module.scss";

const ProductColorsSection = ({ data }) => {
  const { t } = useTranslation();
  
  // Check if data and colors are defined
  if (!data || !data.colors || data.colors.length === 0) {
    // Return a null or placeholder component if data or colors are not available
    return null;
  }

  // If colors exist, render the component
  return (
    <section className={s.colors}>
      <span>{t("detailsPage.colors")}:</span>
      <ProductColors colors={data.colors} showToolTip={true} />
    </section>
  );
};

export default ProductColorsSection;
