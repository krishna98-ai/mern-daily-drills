import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { setUser, setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email,
        password,
      });
console.log(response);
      setUser(response.data.data.user);
      setIsLoggedIn(true);

      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;