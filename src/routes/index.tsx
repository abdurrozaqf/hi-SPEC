import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/pages";
import NotFound from "@/pages/not-found";
import DetailsProducts from "@/pages/product/details-product";
import AuthLayout from "@/pages/auth/auth-layout";
import RegisterForm from "@/components/form/register-form";
import LoginForm from "@/components/form/login-form";


export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/details-product",
      element: <DetailsProducts />,
    },
    {
      path: "/auth-layout",
      element: <AuthLayout />,
    },
    {
      path: "/register-form",
      element: <RegisterForm />,
    },
    {
      path: "/login-form",
      element: <LoginForm />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}
