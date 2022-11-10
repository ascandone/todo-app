import { createBrowserRouter } from "react-router-dom";

import { IndexPage } from "src/pages/Index";
import { RegisterPage } from "src/pages/Register";
import { LoginPage } from "src/pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
