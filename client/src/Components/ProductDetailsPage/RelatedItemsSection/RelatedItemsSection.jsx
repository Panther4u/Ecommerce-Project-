// import { productsData } from "src/Data/productsData";
// import SectionTitle from "../../Shared/MiniComponents/SectionTitle/SectionTitle";
// import s from "./RelatedItemsSection.module.scss";
// import ProductsSlider from "../../Shared/MidComponents/ProductsSlider/ProductsSlider";
// import { useTranslation } from "react-i18next";

// const RelatedItemsSection = ({ productType, currentProduct }) => {
//   const hasRelatedProducts = getProductsByRelatedType().length > 0;
//   const {t} = useTranslation()

//   function getProductsByRelatedType() {
//     return productsData.filter((product) => {
//       const isSameType = product.category === productType;
//       const isCurrentProduct = product === currentProduct;
//       return isSameType && !isCurrentProduct;
//     });
//   }

//   return (
//     <section className={s.section}>
//       <SectionTitle type={2} eventName={t("detailsPage.relatedItems")} />

//       {!hasRelatedProducts && <p>No related items were found.</p>}

//       <ProductsSlider filterFun={getProductsByRelatedType} />
//     </section>
//   );
// };
// export default RelatedItemsSection;



import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SectionTitle from "../../Shared/MiniComponents/SectionTitle/SectionTitle";
import ProductsSlider from "../../Shared/MidComponents/ProductsSlider/ProductsSlider";
import { fetchProducts } from "../../../Features/productsSlice";
import s from "./RelatedItemsSection.module.scss";

const RelatedItemsSection = ({ productType, currentProduct }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  function getProductsByRelatedType() {
    if (!products) return [];

    return products.filter((product) => {
      const isSameType = product.category === productType;
      const isCurrentProduct = product.id === currentProduct.id;
      return isSameType && !isCurrentProduct;
    });
  }

  const relatedProducts = getProductsByRelatedType();
  const hasRelatedProducts = relatedProducts.length > 0;

  return (
    <section className={s.section}>
      <SectionTitle type={2} eventName={t("detailsPage.relatedItems")} />

      {/* {!hasRelatedProducts && <p>{t("detailsPage.noRelatedItems")}</p>} */}

      <ProductsSlider filterFun={() => relatedProducts} />
    </section>
  );
};

export default RelatedItemsSection;
