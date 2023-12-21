import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoutes from "@/routes/protected-routes";

import Home from "@/pages";
import Login from "@/pages/auth/login";
import Products from "@/pages/products";
import AllByCategories from "@/pages/products/all-by-categories";
import DetailProduct from "@/pages/products/detail-product";
import Compare from "@/pages/products/compare";
import Profile from "@/pages/profiles";
import EditProfile from "@/pages/profiles/edit-profile";
import WishList from "@/pages/profiles/wishlist";
import Dashboard from "@/pages/admin/dashboard";
import ProductsAdmin from "@/pages/admin/products-admin";
import UsersAdmin from "@/pages/admin/users-admin";
import TransactionsAdmin from "@/pages/admin/transactions-admin";
import NotFound from "@/pages/not-found";

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/categories/:category",
          element: <AllByCategories />,
        },
        {
          path: "/detail-product/:product_id",
          element: <DetailProduct />,
        },
        {
          path: "/compare",
          element: <Compare />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/edit-profile/:user_id",
          element: <EditProfile />,
        },
        {
          path: "/wishlist/:user_id",
          element: <WishList />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/products-admin",
          element: <ProductsAdmin />,
        },
        {
          path: "/users-admin",
          element: <UsersAdmin />,
        },
        {
          path: "/transactions-admin",
          element: <TransactionsAdmin />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
