import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
    const {loading,isLoggedIn}=useAuth();
    if (loading) {
    return <h1>Loading...</h1>;
  }
  
    if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
   return <Outlet />;
}

export default PublicRoute