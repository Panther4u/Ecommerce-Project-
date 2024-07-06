// import About from "../Components/About/About";
// import AccountPage from "../Components/AccountPage/AccountPage";
// import Cart from "../Components/Cart/Cart";
// import OrderSummaryPage from "../Components/Cart/OrderProduct/OrderSummaryPage";
// import CheckoutPage from "../Components/CheckoutPage/CheckoutPage";
// import Contact from "../Components/Contact/Contact";
// import AdminSignup from "../Components/Dashboard/AccountMenuSection/AdminSignup/AdminSignup";
// // import DashBoard from "../Components/Dashboard/AccountPage";
// import FavoritePage from "../Components/FavoritePage/FavoritePage";
// import Home from "../Components/Home/Home";
// import ForgotPassword from "../Components/LogIn/ForgotPassword/ ForgotPassword";
// import LogIn from "../Components/LogIn/LogIn";
// import NotFoundPage from "../Components/NotFoundPage/NotFoundPage";
// import ProductDetailsPage from "../Components/ProductDetailsPage/ProductDetailsPage";
// import ProductsCategoryPage from "../Components/ProductsCategory/ProductsCategoryPage";
// import ProductsPage from "../Components/ProductsPage/ProductsPage";
// import SearchPage from "../Components/Search/SearchPage";
// import SignUp from "../Components/SignUp/SignUp";
// import WishList from "../Components/WishList/WishList";

// export const ROUTES_CONFIG = [
//   { path: "/", element: <Home /> },
//   { path: "/contact", element: <Contact /> },
//   { path: "/about", element: <About /> },
//   { path: "/details", element: <ProductDetailsPage /> },
//   { path: "/category", element: <ProductsCategoryPage /> },
//   { path: "/products", element: <ProductsPage /> },
//   { path: "/favorites", element: <FavoritePage /> },
//   { path: "/wishlist", element: <WishList /> },
//   { path: "/cart", element: <Cart /> },
//   { path: "/checkout", element: <CheckoutPage /> },
//   { path: "/signup", element: <SignUp /> },
//   { path: "/adminsignup", element: <AdminSignup /> },
//   { path: "/forgotpassword", element: <ForgotPassword/> },
//   { path: "/order-summary", element: <OrderSummaryPage/> },
//   { path: "/login", element: <LogIn /> },
//   { path: "/profile", element: <AccountPage /> },
//   { path: "/search", element: <SearchPage /> },
//   { path: "*", element: <NotFoundPage /> },
//   // { path: "/dashboard", element: <DashBoard /> },
//   // { path: "/dashboard", element: <DashBoard/> },

import About from "../Components/About/About";
import AccountPage from "../Components/AccountPage/AccountPage";
import Cart from "../Components/Cart/Cart";
import OrderSummaryPage from "../Components/Cart/OrderProduct/OrderSummaryPage";
import CheckoutPage from "../Components/CheckoutPage/CheckoutPage";
import Contact from "../Components/Contact/Contact";
import AdminSignup from "../Components/Dashboard/AccountMenuSection/AdminSignup/AdminSignup";
import DashBoard from "../Components/Dashboard/AccountPage";
import FavoritePage from "../Components/FavoritePage/FavoritePage";
import Home from "../Components/Home/Home";
import ForgotPassword from "../Components/LogIn/ForgotPassword/ ForgotPassword";
import LogIn from "../Components/LogIn/LogIn";
import NotFoundPage from "../Components/NotFoundPage/NotFoundPage";
import ProductDetailsPage from "../Components/ProductDetailsPage/ProductDetailsPage";
import ProductsCategoryPage from "../Components/ProductsCategory/ProductsCategoryPage";
import ProductsPage from "../Components/ProductsPage/ProductsPage";
import SearchPage from "../Components/Search/SearchPage";
import SignUp from "../Components/SignUp/SignUp";
import WishList from "../Components/WishList/WishList";
import DashHome from "../pages/home/Home";
import List from "../pages/list/List";
import Single from "../pages/single/Single";
import New from "../pages/new/New";

export const ROUTES_CONFIG = [
  // { path: "/dashboard", element: <DashHome/> },
  { path: "/users", element: <List /> },
  // { path: "/users/:userId", element: <Single /> },
  // {
  //   path: "/users/new",
  //   element: <New inputs={userInputs} title="Add New User" />,
  // },
  { path: "/product", element: <List /> },
  // { path: "/product/:productId", element: <Single /> },

  // {
  //   path: "/product/new",
  //   element: <New inputs={productInputs} title="Add New Product" />,
  // },
  { path: "/", element: <Home /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
  { path: "/details", element: <ProductDetailsPage /> },
  { path: "/category", element: <ProductsCategoryPage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/favorites", element: <FavoritePage /> },
  { path: "/wishlist", element: <WishList /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/adminsignup", element: <AdminSignup /> },
  { path: "/forgotpassword", element: <ForgotPassword /> },
  { path: "/order-summary", element: <OrderSummaryPage /> },
  { path: "/login", element: <LogIn /> },
  { path: "/profile", element: <AccountPage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/dashboard", element: <DashBoard /> }, // Add this entry for Dashboard
  { path: "*", element: <NotFoundPage /> },
];
