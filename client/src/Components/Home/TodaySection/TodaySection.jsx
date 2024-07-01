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




// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios"; // Import axios for making HTTP requests
// import ProductsSlider from "../../Shared/MidComponents/ProductsSlider/ProductsSlider";
// import SectionTitle from "../../Shared/MiniComponents/SectionTitle/SectionTitle";
// import EventCounter from "./EventCounter";
// import s from "./TodaySection.module.scss";

// const TodaySection = () => {
//   const todaysSection = "sectionTitles.todaysSection";
//   const { t } = useTranslation();
//   const [flashSalesProducts, setFlashSalesProducts] = useState([]);

//   // Function to fetch flash sales products from backend
//   const fetchFlashSalesProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/products");
//       const data = response.data;
//       const filteredProducts = data.filter((product) => product.sold > 100);
//       setFlashSalesProducts(filteredProducts);
//     } catch (error) {
//       console.error("Error fetching flash sales products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchFlashSalesProducts();
//   }, []); // Fetch products on component mount

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
