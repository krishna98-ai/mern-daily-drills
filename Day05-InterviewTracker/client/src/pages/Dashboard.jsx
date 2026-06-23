import { useEffect, useState } from "react";
import { getApplicationStats } from "../services/applicationService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await getApplicationStats();
      setStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const safeValue = (value) => {
    if (value === null || value === undefined || value === "") return "--";
    return value;
  };

const cards = [
  { label: "Total Applications", value: stats?.total },
  { label: "Applied", value: stats?.applied },
  { label: "Interview", value: stats?.interview },
  { label: "Rejected", value: stats?.rejected },
  { label: "Selected", value: stats?.selected },
];
  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition"
          >
            <p className="text-gray-400 text-sm">
              {item.label}
            </p>

            <p className="text-3xl font-bold mt-2">
              {safeValue(item.value)}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Dashboard;