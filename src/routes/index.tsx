import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/pages";
import NotFound from "@/pages/not-found";
import DetailsProducts from "@/pages/product/details-product";

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
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}
