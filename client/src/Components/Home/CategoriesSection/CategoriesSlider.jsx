// import { categoriesData } from "src/Data/staticData";
// import CategoryCard from "../../Shared/ProductsCards/CategoryCard/CategoryCard";
// import s from "./CategoriesSlider.module.scss";

// const CategoriesSlider = () => {
//   return (
//     <div className={s.categoriesSlider}>
//       {categoriesData.map((categoryData) => (
//         <CategoryCard categoryData={categoryData} key={categoryData.id} />
//       ))}
//     </div>
//   );
// };
// export default CategoriesSlider;



import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categoriesData } from "src/Data/staticData"; // Adjust path as needed
import CategoryCard from "../../Shared/ProductsCards/CategoryCard/CategoryCard";
import s from "./CategoriesSlider.module.scss"; // Adjust path as needed

const CategoriesSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Default number of slides to show
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay speed in milliseconds (adjust as needed)
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className={s.categoriesSlider}>
      <Slider {...settings} className={s.slider}>
        {categoriesData.map((categoryData) => (
          <div key={categoryData.id} className={s.slideItem}>
            <CategoryCard categoryData={categoryData} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoriesSlider;
