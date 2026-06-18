import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = true; // later context/redux

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;