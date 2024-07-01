// import { productsData } from "src/Data/productsData";
// import s from "./ProductsSlider.module.scss";
// import ProductCard from "../../ProductsCards/ProductCard/ProductCard";

// const ProductsSlider = ({ filterFun = () => productsData, customization }) => {
//   const filteredProducts = filterFun();

//   return (
//     <div className={s.productsSlider}>
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

// export default ProductsSlider;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { productsData } from "src/Data/productsData"; // Adjust path as needed
import s from "./ProductsSlider.module.scss"; // Adjust path as needed
import ProductCard from "../../ProductsCards/ProductCard/ProductCard";

const ProductsSlider = ({ filterFun = () => productsData, customization }) => {
  const filteredProducts = filterFun();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500, // Animation speed in milliseconds
    slidesToShow: 6, // Default number of slides to show
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay speed in milliseconds (adjust as needed)
    pauseOnHover: true, // Pause autoplay on hover
    pauseOnFocus: true, // Pause autoplay on focus
    swipeToSlide: true, // Allow swiping to slide
    draggable: true, // Allow dragging the slider
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1130,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className={s.productsSlider}>
      <Slider {...settings}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={s.slideItem}>
            <ProductCard product={product} customization={customization} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductsSlider;
