// import { Helmet } from "react-helmet-async";
// import { useTranslation } from "react-i18next";
// import PagesHistory from "../Shared/MiniComponents/PagesHistory/PagesHistory";
// import s from "./Cart.module.scss";
// import AddCoupon from "./CartInfo/AddCoupon";
// import CartInfoMenu from "./CartInfo/CartInfoMenu";
// import CartButtons from "./CartProducts/CartButtons";
// import CartProducts from "./CartProducts/CartProducts";

// const Cart = () => {
//   const { t } = useTranslation();

//   return (
//     <>
//       <Helmet>
//         <title>Cart</title>
//       </Helmet>

//       <div className="container">
//         <main className={s.cartPage}>
//           <PagesHistory history={["/", t("history.cart")]} />

//           <div className={s.pageComponents} id="cart-page">
//             <CartProducts />
            

//             <div className={s.wrapper}>
//               <AddCoupon />
//               <CartInfoMenu />
//             </div>
//             <CartButtons />
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };
// export default Cart;













// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useSelector, useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import PagesHistory from '../Shared/MiniComponents/PagesHistory/PagesHistory';
// import s from './Cart.module.scss';
// import AddCoupon from './CartInfo/AddCoupon';
// import CartInfoMenu from './CartInfo/CartInfoMenu';
// import CartButtons from './CartProducts/CartButtons';
// import CartProducts from './CartProducts/CartProducts';
// import { addProductToCart, selectCartProducts } from 'src/Features/productsSlice';
// import { selectUserId } from 'src/Features/userSlice';

// const Cart = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const userId = useSelector(selectUserId);
//   const cartProducts = useSelector(selectCartProducts);
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     const saveCartProductsToBackend = async () => {
//       if (!userId) {
//         console.warn('User is not logged in. Cannot save cart products.');
//         return;
//       }

//       setIsSaving(true);
//       try {
//         for (const product of cartProducts) {
//           if (product.quantity > 0) {
//             await dispatch(addProductToCart({ userId, product }));
//           } else {
//             console.warn('Skipping product with zero quantity:', product);
//           }
//         }
//         console.log('Cart products saved to backend successfully.');
//       } catch (error) {
//         console.error('Error saving cart products to backend:', error);
//       } finally {
//         setIsSaving(false);
//       }
//     };

//     saveCartProductsToBackend();
//   }, [cartProducts, userId, dispatch]);

//   const handleAddToCart = (product) => {
//     dispatch(addProductToCart({
//       userId,
//       product: {
//         id: product.id,
//         discount: product.discount,
//         name: product.name,
//         category: product.category,
//         price: product.price,
//         description: product.description,
//         img: product.img,
//         shortName: product.shortName,
//         quantity: 1
//       }
//     }));
//   };

//   if (!userId) {
//     return (
//       <div className="container">
//         <p>{t('cart.loginMessage')}</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Helmet>
//         <title>{t('cart.title')}</title>
//       </Helmet>
//       <div className="container">
        // <main className={s.cartPage}>
        //   <PagesHistory history={['/', t('history.cart')]} />
        //   <div className={s.pageComponents} id="cart-page">
        //     <CartProducts userId={userId} cartProducts={cartProducts} />
        //     <div className={s.wrapper}>
        //       <AddCoupon />
        //       <CartInfoMenu />
        //     </div>
        //     <CartButtons />
        //   </div>
        //   {isSaving && <div className={s.loader}>Saving cart...</div>}
        // </main>
//       </div>
//     </>
//   );
// };

// export default Cart;



















import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PagesHistory from '../Shared/MiniComponents/PagesHistory/PagesHistory';
import s from './Cart.module.scss';
import AddCoupon from './CartInfo/AddCoupon';
import CartInfoMenu from './CartInfo/CartInfoMenu';
import CartButtons from './CartProducts/CartButtons';
import CartProducts from './CartProducts/CartProducts';
import { addProductToCart, selectCartProducts } from 'src/Features/productsSlice';
import { selectUserId } from 'src/Features/userSlice';
import WishList from '../WishList/WishList';

const Cart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const cartProducts = useSelector(selectCartProducts) || []; // Ensure cartProducts is an array
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    const saveCartProductsToBackend = async () => {
      if (!userId || hasSaved) {
        return;
      }

      setIsSaving(true);
      try {
        for (const product of cartProducts) {
          if (product.quantity > 0) {
            await dispatch(addProductToCart({ userId, product }));
          }
        }
        setHasSaved(true);
      } catch (error) {
        console.error('Error saving cart products to backend:', error);
      } finally {
        setIsSaving(false);
      }
    };

    if (cartProducts.length > 0 && userId) {
      saveCartProductsToBackend();
    }
  }, [cartProducts, userId, dispatch, hasSaved]);

  const handleAddToCart = (product) => {
    dispatch(addProductToCart({
      userId,
      product: {
        id: product.id,
        discount: product.discount,
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        img: product.img,
        shortName: product.shortName,
        quantity: product.quantity || 1
      }
    }));
  };

  if (!userId) {
    return (
      <div className="container">
        <p>{t('cart.loginMessage')}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('cart.title')}</title>
      </Helmet>

      <main className={s.cartPage}>
        <PagesHistory history={['/', t('history.cart')]} />
        <div className={s.pageComponents} id="cart-page">
          <CartProducts userId={userId} cartProducts={cartProducts} />
          {cartProducts.length > 0 && (
            <div className={s.wrapper}>
              {/* <AddCoupon /> */}
              <CartInfoMenu />
            </div>
          )}
        </div>
        {/* <CartButtons /> */}
      </main>
      <WishList />
    </>
  );
};

export default Cart;
