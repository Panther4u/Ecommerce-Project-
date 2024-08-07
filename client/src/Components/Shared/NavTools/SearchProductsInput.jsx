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






import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { fetchProducts, setSearchProducts } from "../../../Features/productsSlice";
import { updateGlobalState } from "../../../Features/globalSlice";
import SvgIcon from "../MiniComponents/SvgIcon";
import s from "./SearchProductsInput.module.scss";
import { searchByObjectKey } from 'src/Functions/helper';
import { API_BASE_URL } from 'src/api/index';

const SearchProductsInput = () => {
  const { t } = useTranslation();
  const searchRef = useRef("");
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const pathName = location.pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useSelector((state) => state.products.products);
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);

  const handleClickOutside = (event) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      if (searchRef.current.trim() === "") {
        setInputVisible(false); // Hide the input field if clicked outside and input is empty
      }
      setDropdownVisible(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const focusInput = (e) => {
    e.preventDefault();
    setInputVisible(true);
    searchInputRef.current?.focus();
  };

  const handleSearchOnChange = (e) => {
    const inputValue = e.target.value;
    searchRef.current = inputValue?.trim()?.toLowerCase();
    updateSearchProducts();
  };

  const handleSearchProducts = (e) => {
    e.preventDefault();

    const isEmptyQuery = searchRef.current?.trim()?.length === 0;
    if (isEmptyQuery) return;

    setSearchParams({ query: searchRef.current });
    updateSearchProducts();
  };

  const updateSearchProducts = () => {
    dispatch(updateGlobalState({ key: "loadingSearchProducts", value: true }));

    const queryValue = searchRef.current || searchParams.get("query");
    const isEmptyQuery = queryValue?.trim()?.length < 1;

    if (isEmptyQuery) {
      setSearchResults([]);
      setDropdownVisible(false);
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

    setSearchResults(productsFound);
    setDropdownVisible(productsFound.length > 0);
    dispatch(updateGlobalState({ key: "loadingSearchProducts", value: false }));
    dispatch(setSearchProducts(productsFound));
    navigateTo("/search?query=" + queryValue);
  };

  useEffect(() => {
    const isSearchPage = pathName === "/search";
    if (isSearchPage) updateSearchProducts();

    return () => {
      dispatch(updateGlobalState({ key: "loadingSearchProducts", value: false }));
    };
  }, [pathName, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={s.searchContainerWrapper}>
      <form
        className={s.searchContainer}
        onSubmit={(e) => handleSearchProducts(e)}
        onClick={(e) => focusInput(e)}
      >
        <button type="button" onClick={(e) => focusInput(e)} title={t("tooltips.searchButton")}>
          <SvgIcon name="search" />
        </button>
        {inputVisible && (
          <input
            type="text"
            id="search-input"
            autoComplete="off"
            placeholder={t("inputsPlaceholders.whatYouLookingFor")}
            onChange={(e) => handleSearchOnChange(e)}
            onFocus={() => setDropdownVisible(true)}
            onBlur={() => setTimeout(() => {
              if (searchRef.current.trim() === "") {
                setInputVisible(false); // Hide the input field if it is empty when losing focus
              }
              setDropdownVisible(false);
            }, 200)}
            ref={searchInputRef}
          />
        )}
      </form>

      {dropdownVisible && searchResults.length > 0 && (
        <div className={s.searchDropdown} ref={dropdownRef}>
          {searchResults.map((product) => (
            <div key={product.id} className={s.dropdownItem}>
              <img src={`${API_BASE_URL}/${product.img}`} alt={product.shortName} className={s.productImage} />
              <span className={s.productName}>{product.shortName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProductsInput;
