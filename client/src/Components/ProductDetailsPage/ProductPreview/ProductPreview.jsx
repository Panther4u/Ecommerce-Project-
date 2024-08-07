// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { updateGlobalState } from "../../../Features/globalSlice";
// import s from "./ProductPreview.module.scss";

// const ProductPreview = ({ data, handleZoomInEffect }) => {
//   const { previewImg } = useSelector((state) => state.global);
//   const [searchParams] = useSearchParams();
//   const dispatch = useDispatch();
//   const { img, name, otherImages } = data;
//   const hasOtherImages = otherImages?.length !== 0 && otherImages;

//   function setZoomInPreview(value = false) {
//     dispatch(updateGlobalState({ key: "isZoomInPreviewActive", value: value }));
//   }

//   function setPreviewImg(img) {
//     dispatch(updateGlobalState({ key: "previewImg", value: img }));
//   }

//   useEffect(() => {
//     setPreviewImg(img);
//   }, [searchParams]);

//   return (
//     <section className={s.images}>
//       {hasOtherImages && (
//         <PreviewImages
//           data={otherImages}
//           previewImg={previewImg}
//           setPreviewImg={setPreviewImg}
//         />
//       )}

//       <div className={s.previewImgHolder}>
//         <img
//           src={previewImg}
//           alt={name}
//           onMouseMove={handleZoomInEffect}
//           onMouseEnter={() => setZoomInPreview(true)}
//           onMouseLeave={() => setZoomInPreview(false)}
//         />
//       </div>
//     </section>
//   );
// };
// export default ProductPreview;

// const PreviewImages = ({ data, previewImg, setPreviewImg }) => {
//   return (
//     <div className={s.otherImages}>
//       {data.map((img, i) => (
//         <div
//           key={i}
//           className={`${s.imgHolder} ${previewImg === img ? s.active : ""}`}
//           onClick={() => setPreviewImg(data[i])}
//         >
//           <img src={img} alt="product's image" />
//         </div>
//       ))}
//     </div>
//   );
// };



import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { updateGlobalState } from "../../../Features/globalSlice";
import s from "./ProductPreview.module.scss";
import { API_BASE_URL } from 'src/api/index';

const ProductPreview = ({ data, handleZoomInEffect }) => {
  const { previewImg } = useSelector((state) => state.global);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { img, name, otherImages } = data || {}; // Destructure with default empty object
  const hasOtherImages = otherImages?.length !== 0 && otherImages;

  function setZoomInPreview(value = false) {
    dispatch(updateGlobalState({ key: "isZoomInPreviewActive", value: value }));
  }

  function setPreviewImg(img) {
    dispatch(updateGlobalState({ key: "previewImg", value: img }));
  }

  useEffect(() => {
    if (img) {
      setPreviewImg(img);
    }
  }, [searchParams, img]);

  // Check if data is undefined or null
  if (!data) {
    return <div>Loading...</div>; // Placeholder or loading state
  }

  return (
    <section className={s.images}>
      {hasOtherImages && (
        <PreviewImages
          data={otherImages}
          setPreviewImg={setPreviewImg}
        />
      )}

      <div className={s.previewImgHolder}>
        <img
          src={`${API_BASE_URL}/${previewImg}`} // Adjust base URL as per your backend setup
          alt={name}
          onMouseMove={handleZoomInEffect}
          onMouseEnter={() => setZoomInPreview(true)}
          onMouseLeave={() => setZoomInPreview(false)}
        />
      </div>
    </section>
  );
};

export default ProductPreview;

const PreviewImages = ({ data, setPreviewImg }) => {
  const { previewImg } = useSelector((state) => state.global);

  return (
    <div className={s.otherImages}>
      {data.map((img, i) => (
        <div
          key={i}
          className={`${s.imgHolder} ${previewImg === img ? s.active : ""}`}
          onClick={() => setPreviewImg(img)}
        >
          <img src={`${API_BASE_URL}/${img}`} alt="product's image" />
        </div>
      ))}
    </div>
  );
};
