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
import Transaction from "@/pages/profiles/transaction";
import ProductsAdmin from "@/pages/admin/products-admin";
import UsersAdmin from "@/pages/admin/users-admin";
import TransactionsAdmin from "@/pages/admin/transactions-admin";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/admin/dashboard";

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
          path: "/profile/edit",
          element: <EditProfile />,
        },
        {
          path: "/wishlist",
          element: <WishList />,
        },
        {
          path: "/transaction",
          element: <Transaction />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/admin/products",
          element: <ProductsAdmin />,
        },
        {
          path: "/admin/users",
          element: <UsersAdmin />,
        },
        {
          path: "/admin/transactions",
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
