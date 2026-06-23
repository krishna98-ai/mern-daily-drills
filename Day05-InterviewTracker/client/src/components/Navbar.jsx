import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {logoutUser} from "../services/authService";
const Navbar = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
await logoutUser();
    setUser(null);
    setIsLoggedIn(false);

    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center gap-6 shadow-md">

      <Link to="/dashboard" className="hover:text-blue-400">
        Dashboard
      </Link>

      <Link to="/applications" className="hover:text-blue-400">
        Applications
      </Link>

      <Link to="/applications/new" className="hover:text-blue-400">
        Add Application
      </Link>

      <Link to="/profile" className="hover:text-blue-400">
        Profile
      </Link>

      {/* RIGHT SIDE PUSH (optional simple) */}
      <div className="ml-auto">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition px-3 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>

    </nav>
  );
};

export default Navbar;