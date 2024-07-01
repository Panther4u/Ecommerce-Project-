import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderProduct from './OrderProduct'; // Assuming this component is correctly defined
import s from './OrderSummaryPage.module.scss';

const OrderSummaryPage = () => {
  const dispatch = useDispatch();
  const orderedProducts = useSelector((state) => state.order.orderedProducts);
  const userId = useSelector((state) => state.user.loginInfo._id);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders?userId=${userId}`);
        dispatch({ type: 'SET_ORDERED_PRODUCTS', payload: response.data }); // Dispatch action to set ordered products in Redux
      } catch (error) {
        console.error('Error fetching order summary:', error);
        toast.error('Error fetching order summary');
      }
    };

    if (userId) {
      fetchOrderSummary();
    }
  }, [dispatch, userId]);

  return (

    <div className={s.cartProducts}>
      {orderedProducts.length === 0 ? (
        <p>{t('cartPage.emptyCartMessage')}</p>
      ) : (
        <table className={s.cartProducts}>
          <thead>
            <tr>
              <th>{t('cartPage.productsTable.product')}</th>
              <th>{t('cartPage.productsTable.price')}</th>
              <th>{t('cartPage.productsTable.quantity')}</th>
              <th>{t('cartPage.productsTable.subtotal')}</th>
            </tr>
          </thead>
          <tbody>
            {orderedProducts.map((product) => (
              <OrderProduct key={product._id} product={product} />
            ))}
          </tbody>
        </table>
      )}
    </div>


  );
};

export default OrderSummaryPage;






// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setOrderedProducts } from '../../../Features/orderSlice';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';
// import s from './OrderSuccessPage.module.scss';

// const OrderSummaryPage = () => {
//   const dispatch = useDispatch();
//   const orderedProducts = useSelector((state) => state.order.orderedProducts);
//   const { userId } = useSelector((state) => state.user.loginInfo); // Assuming user login info is stored in Redux

//   useEffect(() => {
//     const fetchOrderedProducts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/orders?userId=${userId}`);
//         dispatch(setOrderedProducts(response.data));
//       } catch (error) {
//         console.error('Error fetching ordered products:', error);
//       }
//     };

//     fetchOrderedProducts();
//   }, [dispatch, userId]);

//   const { t } = useTranslation();

//   return (
//     <div className={s.cartProducts}>
//       <h1>{t('orderSuccessPage.orderPlaced')}</h1>
//       <div className={s.orderSummary}>
//         {orderedProducts.length === 0 ? (
//           <p>{t('orderSuccessPage.emptyOrderMessage')}</p>
//         ) : (
//           <table className={s.cartProducts}>
//             <thead>
//               <tr>
//                 <th>{t('orderSuccessPage.productsTable.product')}</th>
//                 <th>{t('orderSuccessPage.productsTable.price')}</th>
//                 <th>{t('orderSuccessPage.productsTable.quantity')}</th>
//                 <th>{t('orderSuccessPage.productsTable.subtotal')}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderedProducts.map((product) => (
//                 <tr key={product._id}>
//                   <td>{product.name}</td>
//                   <td>{product.price}</td>
//                   <td>{product.quantity}</td>
//                   <td>{product.subtotal}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderSummaryPage;
