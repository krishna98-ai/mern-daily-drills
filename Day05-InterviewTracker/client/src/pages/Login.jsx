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
      const response = await loginUser({ email, password });

      setUser(response.data.data.user);
      setIsLoggedIn(true);

      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">

      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl w-full max-w-md space-y-4">

        <h1 className="text-white text-2xl font-semibold text-center">
          Login
        </h1>

        <form onSubmit={onSubmit} className="space-y-3">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-950 border border-gray-800 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-950 border border-gray-800 text-white"
          />

          <button className="w-full bg-blue-600 py-2 rounded text-white hover:bg-blue-700">
            Login
          </button>

        </form>

        {/* 👇 REGISTER NAVIGATION */}
        <p className="text-gray-400 text-sm text-center">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-400 hover:text-blue-300"
          >
            Register
          </button>
        </p>

      </div>

    </div>
  );
};

export default Login;