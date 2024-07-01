import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { introductionSliderData } from "src/Data/staticData";
import { SwiperSlide } from "swiper/react";
import SvgIcon from "../../Shared/MiniComponents/SvgIcon";
import s from "./IntroductionSlides.module.scss";

const IntroductionSlides = () => {
  const { t } = useTranslation();

  return introductionSliderData.map(
    ({ productName, productImg, logoImg, id }) => {
      return (
        <SwiperSlide dir="ltr" className={s.slide} key={id}>
          <img src={productImg} alt="product preview" />
          <div className={s.content}>
            <div className={s.nameProduct}>
              <img src={logoImg} alt="market logo" />
              <strong>{productName}</strong>
            </div>

            <h2 className={s.discount}>{t("homeSlider.title")}</h2>

            <Link to="/products" className={s.shopNow} tabIndex="-1">
              <span>{t("buttons.buyNow")}</span>

              <div className={s.arrow}>
                <SvgIcon name="arrowRightLong" />
              </div>
            </Link>
          </div>
        </SwiperSlide>
      );
    }
  );
};
export default IntroductionSlides;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import { SwiperSlide } from 'swiper/react';
// import SvgIcon from '../../Shared/MiniComponents/SvgIcon';
// import s from './IntroductionSlides.module.scss';

// const IntroductionSlides = () => {
//   const { t } = useTranslation();
//   const [sliderData, setSliderData] = useState([]);

//   useEffect(() => {
//     const fetchSliderData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/sliders');
//         if (Array.isArray(response.data)) {
//           setSliderData(response.data);
//         } else {
//           console.error('Fetched data is not an array:', response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching slider data:', error);
//       }
//     };

//     fetchSliderData(); // Invoke fetchSliderData directly inside useEffect

//     // Clean-up function (optional) - not needed for this case
//   }, []); // Dependency array is empty to run only on mount

//   const getImageUrl = (path) => {
//     return `http://localhost:8000${path}`;
//   };

//   return (
//     <>
//       {sliderData.map(({ productName, productImg, logoImg, id }) => (
//         <SwiperSlide dir="ltr" className={s.slide} key={id}>
//           <img src={getImageUrl(productImg)} alt="product preview" />
//           <div className={s.content}>
//             <div className={s.nameProduct}>
//               <img src={getImageUrl(logoImg)} alt="market logo" />
//               <strong>{productName}</strong>
//             </div>
//             <h2 className={s.discount}>{t("homeSlider.title")}</h2>
//             <Link to="/products" className={s.shopNow} tabIndex="-1">
//               <span>{t("buttons.buyNow")}</span>
//               <div className={s.arrow}>
//                 <SvgIcon name="arrowRightLong" />
//               </div>
//             </Link>
//           </div>
//         </SwiperSlide>
//       ))}
//     </>
//   );
// };

// export default IntroductionSlides;
