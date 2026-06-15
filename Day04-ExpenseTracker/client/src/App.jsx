import { createBrowserRouter, RouterProvider } from "react-router-dom";
 import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
  element: <ProtectedRoute />,
  children: [
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/expenses",
          element: <Expenses />
        },
        {
          path: "/add-expense",
          element: <AddExpense />
        },
        {
        path: "/edit-expense/:id",
        element: <AddExpense />
      }
      ]
    }
  ]
}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;