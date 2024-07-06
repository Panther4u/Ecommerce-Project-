import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import RequiredAuth from "./RequiredAuth";
import RoutesLayout from "./RoutesLayout";
import { ROUTES_CONFIG } from "./routes";

const AppRoutes = () => {
  const routes = createRoutesFromChildren(
    <Route path="/" element={<RoutesLayout />}>
      {ROUTES_CONFIG.map(({ path, element }, index) => (
        <Route
          key={index}
          path={path}
          element={<RequiredAuth>{element}</RequiredAuth>}
        />
      ))}
    </Route>
  );

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default AppRoutes;




// import React from "react";
// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromChildren,
// } from "react-router-dom";
// import RequiredAuth from "./RequiredAuth";
// import RoutesLayout from "./RoutesLayout";
// import { ROUTES_CONFIG } from "./routes";

// const AppRoutes = () => {
//   // Simulate user role (you would get this from your Redux state or context)
//   const isAdmin = true; // Replace with actual logic to check if user is admin

//   // Filter routes to include only admin-specific routes
//   const adminRoutes = ROUTES_CONFIG.filter((route) => route.path === "/dashboard");

//   // Create routes from children based on isAdmin condition
//   const routes = createRoutesFromChildren(
//     <Route path="/" element={<RoutesLayout />}>
//       {ROUTES_CONFIG.map(({ path, element }, index) => (
//         <Route
//           key={index}
//           path={path}
//           element={
//             <RequiredAuth>
//               {element}
//             </RequiredAuth>
//           }
//         />
//       ))}
//       {/* Render /dashboard only if isAdmin */}
//       {isAdmin && adminRoutes.map(({ path, element }, index) => (
//         <Route
//           key={index}
//           path={path}
//           element={
//             <RequiredAuth>
//               {element}
//             </RequiredAuth>
//           }
//         />
//       ))}
//     </Route>
//   );

//   const router = createBrowserRouter(routes);
//   return <RouterProvider router={router} />;
// };

// export default AppRoutes;
