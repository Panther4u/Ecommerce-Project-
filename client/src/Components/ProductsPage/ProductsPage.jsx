// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { SIMPLE_DELAYS } from "src/Data/globalVariables";
// import { productCardCustomizations } from "src/Data/staticData";
// import useScrollOnMount from "src/Hooks/App/useScrollOnMount";
// import { updateGlobalState } from "../../Features/globalSlice";
// import useUpdateLoadingState from "../../Hooks/App/useUpdateLoadingState";
// import ExploreProducts from "../Home/ProductPoster/ExploreProducts";
// import PagesHistory from "../Shared/MiniComponents/PagesHistory/PagesHistory";
// import SkeletonCards from "../Shared/SkeletonLoaders/ProductCard/SkeletonCards";
// import s from "./ProductsPage.module.scss";

// const ProductsPage = () => {
//   const { loadingProductsPage } = useSelector((state) => state.global);
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   useUpdateLoadingState({
//     loadingState: loadingProductsPage,
//     loadingKey: "loadingProductsPage",
//     actionMethod: updateGlobalState,
//     delays: SIMPLE_DELAYS,
//     cleanFunction: () =>
//       dispatch(updateGlobalState({ key: "loadingProductsPage", value: true })),
//   });
//   useScrollOnMount(200);

//   return (
//     <div className="container">
//       <main className={s.productsPage}>
//         <PagesHistory history={["/", t("history.products")]} />

//         <section className={s.products}>
//           {!loadingProductsPage && (
//             <ExploreProducts
//               customization={productCardCustomizations.allProducts}
//             />
//           )}

//           {loadingProductsPage && (
//             <div className={s.SkeletonCards}>
//               <SkeletonCards numberOfCards={8} />
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };
// export default ProductsPage;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SIMPLE_DELAYS } from "src/Data/globalVariables";
import { productCardCustomizations, categoriesData } from "src/Data/staticData";
import useScrollOnMount from "src/Hooks/App/useScrollOnMount";
import { updateGlobalState } from "../../Features/globalSlice";
import useUpdateLoadingState from "../../Hooks/App/useUpdateLoadingState";
import ExploreProducts from "../Home/ProductPoster/ExploreProducts";
import PagesHistory from "../Shared/MiniComponents/PagesHistory/PagesHistory";
import SkeletonCards from "../Shared/SkeletonLoaders/ProductCard/SkeletonCards";
import s from "./ProductsPage.module.scss";
import CategorySelector from "../Home/ProductPoster/CategorySelector";
import CustomDropdown from "../Home/ProductPoster/CustomDropdown"; // Adjust path as needed

const ProductsPage = () => {
  const { loadingProductsPage } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useUpdateLoadingState({
    loadingState: loadingProductsPage,
    loadingKey: "loadingProductsPage",
    actionMethod: updateGlobalState,
    delays: SIMPLE_DELAYS,
    cleanFunction: () =>
      dispatch(updateGlobalState({ key: "loadingProductsPage", value: true })),
  });

  useScrollOnMount(200);

  // Price filter states
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState(''); // Add state for sorting order

  // Function to handle sorting order change
  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'lowToHigh', label: 'Price: Low to High' },
    { value: 'highToLow', label: 'Price: High to Low' },
  ];

  return (
    <div className={s.container}>
      <main className={s.productsPage}>
        <PagesHistory history={["/", t("history.products")]} />

        <section className={s.filters}>
          {/* <input
            type="number"
            placeholder={t('minPrice')}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={s.priceInput}
          />
          <input
            type="number"
            placeholder={t('maxPrice')}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={s.priceInput}
          /> */}
          <CategorySelector
            categories={categoriesData}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className={s.sortOptions}>
            <CustomDropdown
              options={sortOptions}
              value={sortOrder}
              onChange={handleSortChange}
            />
          </div>
        </section>

        <section className={s.products}>
          {loadingProductsPage ? (
            <div className={s.SkeletonCards}>
              <SkeletonCards numberOfCards={8} />
            </div>
          ) : (
            <ExploreProducts
              customization={productCardCustomizations.allProducts}
              minPrice={minPrice}
              maxPrice={maxPrice}
              selectedCategory={selectedCategory}
              sortOrder={sortOrder} // Pass sortOrder to ExploreProducts
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductsPage;
