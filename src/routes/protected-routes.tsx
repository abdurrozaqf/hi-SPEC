import { Outlet, Navigate, useLocation } from "react-router-dom";

import { useToken } from "@/utils/contexts/token";

const ProtectedRoutes = () => {
  const { pathname } = useLocation();
  const { token, user } = useToken();

  const authProtected = ["/login"];

  const tokenProtected = [
    "/profile",
    "/profile-edit",
    "/wishlist",
    "/transaction",
    "/dashboard",
    "/products-admin",
    "/users-admin",
    "/transactions-admin",
  ];

  const roleAdminProtected = [
    "/dashboard",
    "/products-admin",
    "/users-admin",
    "/transactions-admin",
  ];

  const roleUserProtected = [
    "/",
    "/products",
    "/categories",
    "/compare",
    "/categories",
    "/wishlist",
    "/transaction",
    "/detail-product",
  ];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (roleUserProtected.includes(pathname)) {
    if (user.user?.role === "admin") return <Navigate to="/dashboard" />;
  }

  if (tokenProtected.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (roleAdminProtected.includes(pathname)) {
      if (user.user?.role === "user") return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoutes;
