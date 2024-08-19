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


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ProductCard from "../../Shared/ProductsCards/ProductCard/ProductCard"; // Adjust path as per your project structure
// import { fetchProducts, selectProducts } from "src/Features/productsSlice"; // Adjust path as per your project structure
// import s from "./ExploreProducts.module.scss"; // Adjust path as per your project structure

// const ExploreProducts = ({ numOfProducts = -1, customization }) => {
//   const dispatch = useDispatch();
//   const products = useSelector(selectProducts);
//   const status = useSelector((state) => state.products.status); // Get the status from the Redux store
//   const error = useSelector((state) => state.products.error); // Get the error from the Redux store

//   useEffect(() => {
//     dispatch(fetchProducts()); // Dispatch the action to fetch products when component mounts
//   }, [dispatch]);

//   // Ensure products is always an array
//   const filteredProducts = Array.isArray(products) ? (numOfProducts > 0 ? products.slice(0, numOfProducts) : products) : [];

//   return (
//     <div className={s.products}>
//       {status === 'loading' ? (
//         <p>Loading products...</p>
//       ) : status === 'failed' ? (
//         <p>Error loading products: {error}</p>
//       ) : filteredProducts.length > 0 ? (
//         filteredProducts.map((product) => (
//           <ProductCard
//             product={product}
//             key={product.id} // Assuming product has an id
//             customization={customization}
//           />
//         ))
//       ) : (
//         <p>No products available.</p>
//       )}
//     </div>
//   );
// };

// export default ExploreProducts;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Shared/ProductsCards/ProductCard/ProductCard"; // Adjust path as needed
import { fetchProducts, selectProducts } from "src/Features/productsSlice"; // Adjust path as needed
import s from "./ExploreProducts.module.scss"; // Adjust path as needed

const ExploreProducts = ({ numOfProducts = -1, customization, minPrice, maxPrice, selectedCategory, sortOrder }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector((state) => state.products.status); // Get the status from the Redux store
  const error = useSelector((state) => state.products.error); // Get the error from the Redux store

  useEffect(() => {
    dispatch(fetchProducts()); // Dispatch the action to fetch products when component mounts
  }, [dispatch]);

  // Filter products based on price range and selected category
  const filteredProducts = Array.isArray(products)
    ? products.filter(product => {
        const price = parseFloat(product.price);
        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;
        const categoryMatch = !selectedCategory || product.category === selectedCategory;
        return price >= min && price <= max && categoryMatch;
      })
    : [];

  // Sort products based on the selected sort order
  const sortedProducts = filteredProducts.sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    if (sortOrder === 'lowToHigh') {
      return priceA - priceB;
    } else if (sortOrder === 'highToLow') {
      return priceB - priceA;
    }
    return 0;
  }).slice(0, numOfProducts > 0 ? numOfProducts : undefined);

  return (
    <div className={s.products}>
      {status === 'loading' ? (
        <p>Loading products...</p>
      ) : status === 'failed' ? (
        <p>Error loading products: {error}</p>
      ) : sortedProducts.length > 0 ? (
        sortedProducts.map((product) => (
          <ProductCard
            product={product}
            key={product.id} // Assuming product has an id
            customization={customization}
          />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ExploreProducts;
