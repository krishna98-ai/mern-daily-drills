import { useState } from "react";
import { changePassword } from "../services/authService";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let err = {};

    if (!oldPassword) err.oldPassword = "Old password is required";

    if (!newPassword) {
      err.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      err.newPassword = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      err.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await changePassword({
        oldPassword,
        newPassword,
      });

      alert("Password changed successfully");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      alert("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">

        <h1 className="text-2xl font-semibold text-center">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Old Password */}
          <input
            type="password"
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white outline-none focus:border-blue-500"
          />
          {errors.oldPassword && (
            <p className="text-red-400 text-sm">{errors.oldPassword}</p>
          )}

          {/* New Password */}
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white outline-none focus:border-blue-500"
          />
          {errors.newPassword && (
            <p className="text-red-400 text-sm">{errors.newPassword}</p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 text-white outline-none focus:border-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ChangePassword;