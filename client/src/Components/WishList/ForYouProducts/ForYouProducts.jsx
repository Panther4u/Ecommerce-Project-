// import { productsData } from "src/Data/productsData";
// import ProductCard from "../../Shared/ProductsCards/ProductCard/ProductCard";
// import s from "./ForYouProducts.module.scss";

// const ForYouProducts = () => {
//   const forYouProducts = productsData.filter((_, i) => i < 4);

//   return (
//     <div className={s.forYouProducts}>
//       {forYouProducts.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// };
// export default ForYouProducts;



import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../../Features/productsSlice';
import ProductCard from "../../Shared/ProductsCards/ProductCard/ProductCard";
import s from "./ForYouProducts.module.scss";

const ForYouProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const forYouProducts = products.slice(0, 4);

  return (
    <div className={s.forYouProducts}>
      {forYouProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ForYouProducts;
