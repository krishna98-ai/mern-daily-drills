import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await registerUser({
        username,
        email,
        password,
      });

      setUsername("");
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(
        error?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">

        <h1 className="text-2xl font-semibold text-center text-white">
          Register
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white outline-none focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white outline-none focus:border-blue-500"
          />

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-400 hover:text-blue-300"
          >
            Login
          </button>
        </p>

      </div>

    </div>
  );
};

export default Register;