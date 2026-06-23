import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-300">
        Loading...
      </div>
    );
  }

  const Card = ({ title, value }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-white mt-1 font-medium">{value || "--"}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex justify-center">

      <div className="w-full max-w-2xl space-y-6">

        {/* HEADER */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Card title="Username" value={user.username} />
          <Card title="Email" value={user.email} />

        </div>

        {/* JOINED */}
        <Card
          title="Joined At"
          value={
            user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "--"
          }
        />

        {/* ACTION */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center">

          <p className="text-gray-400">
            Account settings
          </p>

          <button
            onClick={() => navigate("/change-password")}
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg"
          >
            Change Password
          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;