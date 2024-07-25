// import { productsData } from "src/Data/productsData";
// import ProductCard from "../../Shared/ProductsCards/ProductCard/ProductCard";
// import s from "./ExploreProducts.module.scss";

// const ExploreProducts = ({ numOfProducts = -1, customization }) => {
//   const filteredProducts = productsData.filter((_, i) => i > numOfProducts);

//   return (
//     <div className={s.products}>
//       {filteredProducts.map((product) => (
//         <ProductCard
//           product={product}
//           key={product.id}
//           customization={customization}
//         />
//       ))}
//     </div>
//   );
// };
// export default ExploreProducts;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Shared/ProductsCards/ProductCard/ProductCard"; // Adjust path as per your project structure
import { fetchProducts, selectProducts } from "src/Features/productsSlice"; // Adjust path as per your project structure

import s from "./ExploreProducts.module.scss"; // Adjust path as per your project structure

const ExploreProducts = ({ numOfProducts = -1, customization }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts()); // Dispatch the action to fetch products when component mounts
  }, [dispatch]);

  // Determine the products to display based on the numOfProducts prop
  const filteredProducts = numOfProducts > 0 ? products.slice(0, numOfProducts) : products;
// console.log(filteredProducts)
  return (
    <div className={s.products}>
      {filteredProducts.map((product) => (
        <ProductCard
          product={product}
          key={product.id} // Assuming product has an id
          customization={customization}
        />
      ))}
    </div>
  );
};

export default ExploreProducts;
