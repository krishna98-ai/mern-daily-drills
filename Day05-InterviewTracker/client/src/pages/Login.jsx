import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  console.log("Login Page Render");

  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Common Validation Function
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (
          !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
        ) {
          error = "Enter a valid email";
        }
        break;

      case "password":
        if (!value.trim()) {
          error = "Password is required";
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,20}$/.test(
            value
          )
        ) {
          error =
            "Password must be 8-20 characters and include uppercase, lowercase, number & special character.";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error;
  };

  // Handle Blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);

    if (emailError || passwordError) return;

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

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              className="w-full p-2 rounded bg-gray-950 border border-gray-800 text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleBlur}
              className="w-full p-2 rounded bg-gray-950 border border-gray-800 text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button className="w-full bg-blue-600 py-2 rounded text-white hover:bg-blue-700">
            Login
          </button>
        </form>

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