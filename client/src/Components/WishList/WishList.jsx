// import { Helmet } from "react-helmet-async";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getUniqueArrayByObjectKey } from "src/Functions/helper";
// import { updateProductsState } from "../../Features/productsSlice";
// import SectionTitle from "../Shared/MiniComponents/SectionTitle/SectionTitle";
// import ForYouProducts from "./ForYouProducts/ForYouProducts";
// import s from "./WishList.module.scss";
// import WishProducts from "./WishProducts/WishProducts";

// const WishList = () => {
//   const { wishList, cartProducts } = useSelector((state) => state.products);
//   const numberOfWishlist = wishList.length;
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   function moveAllToCart() {
//     const uniqueCartProducts = getUniqueArrayByObjectKey({
//       arr: cartProducts,
//       newArr: wishList,
//       key: "shortName",
//     });
//     dispatch(
//       updateProductsState({ key: "cartProducts", value: uniqueCartProducts })
//     );
//     dispatch(updateProductsState({ key: "wishList", value: [] }));
//   }

//   return (
//     <>
//       <Helmet>
//         <title>Wishlist</title>
//       </Helmet>

//       <div className="container">
//         <main className={s.wishListPage} id="wishlist-page">
//           <section className={s.wishList}>
//             <header>
//               <label htmlFor="wishlist">{t("wishlist", {numberOfWishlist})}</label>

//               <button type="button" onClick={moveAllToCart}>
//                 {t("buttons.moveAllToBag")}
//               </button>
//             </header>

//             <WishProducts />
//           </section>
// {/* 
//           <section className={s.forYou}>
//             <header>
//               <SectionTitle eventName={t("sectionTitles.forYou")} type={2} />

//               <Link to="/products">{t("buttons.seeAll")}</Link>
//             </header>

//             <ForYouProducts />
//           </section> */}
//         </main>
//       </div>
//     </>
//   );
// };
// export default WishList;










import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUniqueArrayByObjectKey } from 'src/Functions/helper';
import { fetchWishlist, updateProductsState } from '../../Features/productsSlice';
import SectionTitle from '../Shared/MiniComponents/SectionTitle/SectionTitle';
import ForYouProducts from './ForYouProducts/ForYouProducts';
import s from './WishList.module.scss';
import WishProducts from './WishProducts/WishProducts';
import { selectUserId } from 'src/Features/userSlice';
import emptyCartImage from 'src/Assets/Images/empty-cart.png';

const WishList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  // Local state to manage loading delay
  const [showLoader, setShowLoader] = useState(false);

  // Get state from Redux store
  const { wishList, status, error, cartProducts } = useSelector((state) => state.products);
  const userId = useSelector(selectUserId);
  const numberOfWishlist = wishList.length;

  // Fetch wishlist when component mounts or userId changes
  useEffect(() => {
    if (userId) {
      setShowLoader(true); // Show loader
      const timer = setTimeout(() => {
        dispatch(fetchWishlist(userId)).finally(() => {
          setShowLoader(false); // Hide loader when fetch is done
        });
      }, 500); // Simulate a delay of 500ms
      return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }
  }, [dispatch, userId]);

  // Move all wishlist items to the cart
  const moveAllToCart = () => {
    const uniqueCartProducts = getUniqueArrayByObjectKey({
      arr: cartProducts,
      newArr: wishList,
      key: 'shortName',
    });

    dispatch(updateProductsState({ key: 'cartProducts', value: uniqueCartProducts }));
    dispatch(updateProductsState({ key: 'wishList', value: [] }));
  };

  // Check if wishlist is empty
  const isEmptyWishlist = status !== 'loading' && numberOfWishlist === 0;

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>

      <main className={s.wishListPage} id="wishlist-page">
        <section className={s.wishList}>
          <header>
            <label htmlFor="wishlist">{t("wishlist", { numberOfWishlist })}</label>
            <button type="button" onClick={moveAllToCart}>
              {t("buttons.moveAllToBag")}
            </button>
          </header>

          {showLoader || status === 'loading' ? (
            <div className={s.loaderWrapper}>
              <div className={s.spinner}></div>
            </div>
          ) : isEmptyWishlist ? (
            <div className={s.emptyCart}>
              <img src={emptyCartImage} alt={t('emptyWishlistAlt')} />
              <p>{t('Your Wishlist Is Empty')}</p>
            </div>
          ) : (
            <WishProducts />
          )}
        </section>

        {/* Uncomment if you want to show recommended products */}
        {/* 
        <section className={s.forYou}>
          <header>
            <SectionTitle eventName={t('sectionTitles.forYou')} type={2} />
            <Link to="/products">{t('buttons.seeAll')}</Link>
          </header>
          <ForYouProducts />
        </section>
        */}
      </main>
    </>
  );
};

export default WishList;
