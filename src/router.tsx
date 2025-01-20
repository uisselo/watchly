import { createBrowserRouter } from "react-router";
import { LayoutComponent } from "@GlobalComponents";
import { HomePage } from "@Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,
    children: [{ path: "", element: <HomePage /> }],
  },
]);

export default router;
