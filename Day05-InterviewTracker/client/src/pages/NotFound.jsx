import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white px-4">

      <h1 className="text-6xl font-bold text-gray-700">
        404
      </h1>

      <p className="text-xl mt-4 text-gray-300">
        Page Not Found
      </p>

      <p className="text-gray-500 mt-2 text-center">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg"
      >
        Go to Dashboard
      </button>

    </div>
  );
};

export default NotFound;