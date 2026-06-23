import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import CreateApplication from "../pages/CreateApplication";
import ApplicationDetail from "../pages/ApplicationDetail";
import  ChangePassword  from "../pages/ChangePassword";
import ProtectedRoute from "./ProtectedRoute";
export const router = createBrowserRouter([
  // Public Routes
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/applications",
            element: <Applications />,
          },
          {path:"/applications/new",
            element:<CreateApplication/>
          },
          {
            path:"/applications/:id/edit",
            element:<CreateApplication/>
          },
        {
         path:"/applications/:id",
         element:<ApplicationDetail/>
         },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
  path:"/change-password",
  element:<ChangePassword/>
}
        ],
      },
    ],
  },
  //404
  {
  path: "*",
  element: <NotFound />,
}
]);