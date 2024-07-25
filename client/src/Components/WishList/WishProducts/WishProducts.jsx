// import { useSelector } from "react-redux";
// import { productCardCustomizations } from "src/Data/staticData";
// import useScrollOnMount from "src/Hooks/App/useScrollOnMount";
// import ProductCard from "../../Shared/ProductsCards/ProductCard/ProductCard";
// import s from "./WishProducts.module.scss";

// const WishProducts = () => {
//   const { wishList } = useSelector((state) => state.products);
//   useScrollOnMount(160);

//   return (
//     <div className={s.wishProducts}>
//       {wishList.map((product) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//           customization={productCardCustomizations.wishListProducts}
//           removeFrom="wishList"
//         />
//       ))}
//     </div>
//   );
// };
// export default WishProducts;

import { useSelector } from 'react-redux';
import { productCardCustomizations } from 'src/Data/staticData';
import useScrollOnMount from 'src/Hooks/App/useScrollOnMount';
import ProductCard from '../../Shared/ProductsCards/ProductCard/ProductCard';
import s from './WishProducts.module.scss';

const WishProducts = () => {
  const { wishList, status, error } = useSelector((state) => state.products);

  useScrollOnMount(160);

  // Handle loading and error states
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className={s.wishProducts}>
      {wishList.length > 0 ? (
        wishList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            customization={productCardCustomizations.wishListProducts}
            removeFrom="wishList"
          />
        ))
      ) : (
        <p>No products in your wishlist.</p>
      )}
    </div>
  );
};

export default WishProducts;
