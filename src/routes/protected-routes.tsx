import { Outlet, Navigate, useLocation } from "react-router-dom";

import { useToken } from "@/utils/contexts/token";

const ProtectedRoutes = () => {
  const { pathname } = useLocation();
  const { token, user } = useToken();

  const authProtected = ["/login"];

  const tokenProtected = [
    "/profile",
    "/profile/edit",
    "/wishlist",
    "/transaction",
    "/dashboard",
    "/admin/products",
    "/admin/users",
    "/admin/transactions",
  ];

  const roleAdminProtected = [
    "/dashboard",
    "/admin/users",
    "/admin/products",
    "/admin/transactions",
  ];

  const roleUserProtected = [
    "/",
    "/compare",
    "/products",
    "/wishlist",
    "/transaction",
    "/categories/:category",
  ];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (tokenProtected.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (roleAdminProtected.includes(pathname)) {
      if (user.role === "user") return <Navigate to="/" />;
    }
  }

  if (roleUserProtected.includes(pathname)) {
    if (user.role === "admin") return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
