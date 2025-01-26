import { createBrowserRouter } from "react-router";
import { LayoutComponent } from "@GlobalComponents";
import { BrowseMoviesPage, ErrorPage, HomePage } from "@Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "browse", element: <BrowseMoviesPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
