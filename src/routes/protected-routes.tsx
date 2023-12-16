import { Outlet, Navigate, useLocation } from "react-router-dom";

import { useToken } from "@/utils/contexts/token";

const ProtectedRoutes = () => {
  const { pathname } = useLocation();
  const { token, user } = useToken();

  // bagi yg udh login tidak bisa ke sini
  const authProtected = ["/login"];

  // bagi yang belum login tidak bisa ke sini
  const tokenProtected = [
    "/profile",
    "/edit-profile",
    "/wishlist",
    "/dashboard",
    "/products-admin",
    "/users-admin",
    "/transactions-admin",
  ];

  // bagi yang login dan user bukan admin tidak bisa ke sini
  const roleAdminProtected = [
    "/dashboard",
    "/products-admin",
    "/users-admin",
    "/transactions-admin",
  ];

  // bagi yang login dan user admin tidak bisa ke sini
  const roleUserProtected = [
    "/",
    "/products",
    "/compare",
    "/wishlist",
    "/detail-product",
  ];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (tokenProtected.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (roleAdminProtected.includes(pathname)) {
      if (user.user?.name !== "admin") return <Navigate to="/" />;
    }

    if (roleUserProtected.includes(pathname)) {
      if (user.user?.name === "admin") return <Navigate to="/dashboard" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoutes;
