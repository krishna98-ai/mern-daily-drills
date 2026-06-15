import {
  useNavigate,
  NavLink,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

const Navbar = () => {
  const { user, logout } =
    useAuth();

  const navigate = useNavigate();

  const handleLogout =
    async () => {
      try {
        await logoutUser();
      } catch (error) {
        console.log(error);
      } finally {
        logout();
        navigate("/login");
      }
    };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/">
          Dashboard
        </NavLink>

        <NavLink to="/expenses">
          Expenses
        </NavLink>

        <NavLink to="/add-expense">
          Add Expense
        </NavLink>
      </div>

      <div className="nav-right">
        <span className="username">
          {user?.username}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;