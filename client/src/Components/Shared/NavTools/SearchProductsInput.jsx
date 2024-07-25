// import { useEffect, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { productsData } from "src/Data/productsData";
// import { searchByObjectKey } from "src/Functions/helper";
// import { updateGlobalState } from "../../../Features/globalSlice";
// import { updateProductsState } from "../../../Features/productsSlice";
// import SvgIcon from "../MiniComponents/SvgIcon";
// import s from "./SearchProductsInput.module.scss";

// const SearchProductsInput = () => {
//   const { t } = useTranslation();
//   const searchRef = useRef("");
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigateTo = useNavigate();
//   const pathName = location.pathname;
//   const [searchParams, setSearchParams] = useSearchParams();

//   function focusInput(e) {
//     const searchInput = e.currentTarget.querySelector("#search-input");
//     searchInput.focus();
//   }

//   function handleSearchOnChange(e) {
//     const inputValue = e.target.value;
//     searchRef.current = inputValue?.trim()?.toLowerCase();
//   }

//   function handleSearchProducts(e) {
//     setSearchParams({ query: searchRef.current });
//     e.preventDefault();

//     const isEmptyQuery = searchRef.current?.trim()?.length === 0;
//     if (isEmptyQuery) return;

//     updateSearchProducts();
//   }

//   function updateSearchProducts() {
//     dispatch(updateGlobalState({ key: "loadingSearchProducts", value: true }));

//     const queryValue = searchRef.current || searchParams.get("query");
//     const isEmptyQuery = queryValue?.trim()?.length === 0;

//     if (isEmptyQuery) {
//       dispatch(updateProductsState({ key: "searchProducts", value: [] }));
//       return;
//     }

//     let productsFound = searchByObjectKey({
//       data: productsData,
//       key: "shortName",
//       query: queryValue,
//     });

//     if (productsFound.length === 0) {
//       productsFound = searchByObjectKey({
//         data: productsData,
//         key: "category",
//         query: queryValue,
//       });
//     }

//     dispatch(updateGlobalState({ key: "loadingSearchProducts", value: true }));
//     dispatch(
//       updateProductsState({ key: "searchProducts", value: productsFound })
//     );
//     navigateTo("/search?query=" + queryValue);
//   }

//   useEffect(() => {
//     const isSearchPage = pathName === "/search";
//     if (isSearchPage) updateSearchProducts();

//     return () => {
//       dispatch(
//         updateGlobalState({ key: "loadingSearchProducts", value: true })
//       );
//     };
//   }, []);

//   return (
//     <form
//       className={s.searchContainer}
//       onSubmit={(e) => handleSearchProducts(e)}
//       onClick={(e) => focusInput(e)}
//     >
//       <input
//         type="text"
//         id="search-input"
//         autoComplete="off"
//         placeholder={t("inputsPlaceholders.whatYouLookingFor")}
//         onChange={(e) => handleSearchOnChange(e)}
//       />

//       <button type="submit" title={t("tooltips.searchButton")}>
//         <SvgIcon name="search" />
//       </button>
//     </form>
//   );
// };

// export default SearchProductsInput;



import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { fetchProducts, setSearchProducts } from "../../../Features/productsSlice";
import { updateGlobalState } from "../../../Features/globalSlice";
import SvgIcon from "../MiniComponents/SvgIcon";
import s from "./SearchProductsInput.module.scss";

const SearchProductsInput = () => {
  const { t } = useTranslation();
  const searchRef = useRef("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const pathName = location.pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useSelector((state) => state.products.products);

  function focusInput(e) {
    const searchInput = e.currentTarget.querySelector("#search-input");
    searchInput.focus();
  }

  function handleSearchOnChange(e) {
    const inputValue = e.target.value;
    searchRef.current = inputValue?.trim()?.toLowerCase();
  }

  function handleSearchProducts(e) {
    setSearchParams({ query: searchRef.current });
    e.preventDefault();

    const isEmptyQuery = searchRef.current?.trim()?.length === 0;
    if (isEmptyQuery) return;

    updateSearchProducts();
  }

  function updateSearchProducts() {
    dispatch(updateGlobalState({ key: "loadingSearchProducts", value: true }));

    const queryValue = searchRef.current || searchParams.get("query");
    const isEmptyQuery = queryValue?.trim()?.length === 0;

    if (isEmptyQuery) {
      dispatch(setSearchProducts([]));
      return;
    }

    let productsFound = searchByObjectKey({
      data: products,
      key: "shortName",
      query: queryValue,
    });

    if (productsFound.length === 0) {
      productsFound = searchByObjectKey({
        data: products,
        key: "category",
        query: queryValue,
      });
    }

    dispatch(updateGlobalState({ key: "loadingSearchProducts", value: false }));
    dispatch(setSearchProducts(productsFound));
    navigateTo("/search?query=" + queryValue);
  }

  useEffect(() => {
    const isSearchPage = pathName === "/search";
    if (isSearchPage) updateSearchProducts();

    return () => {
      dispatch(updateGlobalState({ key: "loadingSearchProducts", value: false }));
    };
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <form
      className={s.searchContainer}
      onSubmit={(e) => handleSearchProducts(e)}
      onClick={(e) => focusInput(e)}
    >
      <input
        type="text"
        id="search-input"
        autoComplete="off"
        placeholder={t("inputsPlaceholders.whatYouLookingFor")}
        onChange={(e) => handleSearchOnChange(e)}
      />

      <button type="submit" title={t("tooltips.searchButton")}>
        <SvgIcon name="search" />
      </button>
    </form>
  );
};

export default SearchProductsInput;
