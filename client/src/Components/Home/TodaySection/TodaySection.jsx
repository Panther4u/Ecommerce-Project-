import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { productsData } from "src/Data/productsData";
import ProductsSlider from "../../Shared/MidComponents/ProductsSlider/ProductsSlider";
import SectionTitle from "../../Shared/MiniComponents/SectionTitle/SectionTitle";
import EventCounter from "./EventCounter";
import s from "./TodaySection.module.scss";

const TodaySection = () => {
  const todaysSection = "sectionTitles.todaysSection";
  const { t } = useTranslation();

  const filterFlashSalesProducts = () =>
    productsData.filter((productData) => productData.sold > 100);

  return (
    <section className={s.todaysSection} id="todays-section">
      <div className={s.wrapper}>
        <SectionTitle
          eventName={t(`${todaysSection}.title`)}
          sectionName={t(`${todaysSection}.flashSales`)}
        />
        <EventCounter eventName="flash-sales" timeEvent="3 23 19 56" />
      </div>

      <ProductsSlider filterFun={filterFlashSalesProducts} />

      <Link to="/products" className={s.viewProductsBtn}>
        {t("buttons.viewAllProducts")}
      </Link>
    </section>
  );
};
export default TodaySection;


// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import ProductsSlider from "../../Shared/MidComponents/ProductsSlider/ProductsSlider";
// import SectionTitle from "../../Shared/MiniComponents/SectionTitle/SectionTitle";
// import EventCounter from "./EventCounter";
// import s from "./TodaySection.module.scss";

// const TodaySection = () => {
//   const [flashSalesProducts, setFlashSalesProducts] = useState([]);
//   const todaysSection = "sectionTitles.todaysSection";
//   const { t } = useTranslation();

//   useEffect(() => {
//     const fetchFlashSalesProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/products/flash-sales');
//         setFlashSalesProducts(response.data);
//         console.log('fetching flash sales products:',response.data);
//       } catch (error) {
//         console.error('Error fetching flash sales products:', error);
//         // Handle error gracefully in your application
//       }
//     };

//     fetchFlashSalesProducts();
//   }, []);

//   return (
//     <section className={s.todaysSection} id="todays-section">
//       <div className={s.wrapper}>
//         <SectionTitle
//           eventName={t(`${todaysSection}.title`)}
//           sectionName={t(`${todaysSection}.flashSales`)}
//         />
//         <EventCounter eventName="flash-sales" timeEvent="3 23 19 56" />
//       </div>

//       <ProductsSlider products={flashSalesProducts} />

//       <Link to="/products" className={s.viewProductsBtn}>
//         {t("buttons.viewAllProducts")}
//       </Link>
//     </section>
//   );
// };

// export default TodaySection;
