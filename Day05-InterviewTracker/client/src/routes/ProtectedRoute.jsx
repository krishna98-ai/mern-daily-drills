import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function ProtectedRoute() {
const { isLoggedIn, loading } = useAuth();
// console.log("protect raoute p aagya hun ");
console.log("ProtectedRoute");

console.log({
  loading,
  isLoggedIn
});


if (loading) {
  return <h1>Loading...</h1>;
}

if (!isLoggedIn) {

  return <Navigate to="/" />;
}
// console.log(isLoggedIn);
return <Outlet />;
}

export default ProtectedRoute;