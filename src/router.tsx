import { createBrowserRouter } from "react-router-dom";

import { IndexPage } from "src/pages/Index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
]);
