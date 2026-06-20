import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>

      <Link to="/applications">
        Applications
      </Link>

      <Link to="/applications/new">
        Add Application
      </Link>

      <Link to="/profile">
        Profile
      </Link>
    </nav>
  );
};

export default Navbar;