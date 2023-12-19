import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/pages";
import Login from "@/pages/auth/login";
import Products from "@/pages/products";
import DetailProduct from "@/pages/products/detail-product";
import Compare from "@/pages/products/compare";
import Profile from "@/pages/profiles";
import EditProfile from "@/pages/profiles/edit-profile";
import WishList from "@/pages/profiles/wishlist";
import Dashboard from "@/pages/admin/Dashboard";
import ProductsAdmin from "@/pages/admin/ProductsAdmin";
import UsersAdmin from "@/pages/admin/UsersAdmin";
import TransactionsAdmin from "@/pages/admin/TransactionsAdmin";
import NotFound from "@/pages/not-found";

import ProtectedRoutes from "@/routes/protected-routes";
import AllByCategories from "@/pages/products/AllByCategories";

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
          path: "/wishlist",
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
