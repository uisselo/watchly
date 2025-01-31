import { createBrowserRouter } from "react-router";
import { LayoutComponent } from "@GlobalComponents";
import {
  BrowseMoviesPage,
  ErrorPage,
  HomePage,
  MovieDetailsPage,
} from "@Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "browse", element: <BrowseMoviesPage /> },
      { path: "movie/:id", element: <MovieDetailsPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
