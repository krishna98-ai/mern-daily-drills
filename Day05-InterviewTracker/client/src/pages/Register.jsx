import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) error = "Username is required";
        else if (value.length < 3) error = "Username must be at least 3 characters";
        else if (value.length > 20) error = "Username must not exceed 20 characters";
        break;

      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value))
          error = "Enter a valid email";
        break;

      case "password":
        if (!value.trim()) error = "Password is required";
        else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,20}$/.test(
            value
          )
        )
          error =
            "Password must be 8-20 characters and include uppercase, lowercase, number & special character.";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    const usernameError = validateField("username", username);
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);

    if (usernameError || emailError || passwordError) return;

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

      setErrors({
        username: "",
        email: "",
        password: "",
      });

      navigate("/");
    } catch (err) {
      setServerError(err?.response?.data?.message || "Something went wrong");
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
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={handleBlur}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white"
          />
          {errors.username && (
            <p className="text-red-400 text-sm">{errors.username}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleBlur}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handleBlur}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white"
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}

          {serverError && (
            <p className="text-red-400 text-sm text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg text-white disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <button onClick={() => navigate("/")} className="text-blue-400">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;