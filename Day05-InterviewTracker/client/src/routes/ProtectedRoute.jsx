import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function ProtectedRoute() {
const { isLoggedIn, loading } = useAuth();

if (loading) {
  return <h1>Loading...</h1>;
}

if (!isLoggedIn) {
  return <Navigate to="/" />;
}

return <Outlet />;
}

export default ProtectedRoute;