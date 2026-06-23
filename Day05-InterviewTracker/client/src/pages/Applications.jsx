import { useState, useEffect } from "react";
import {
  getAllApplications,
  deleteApplication,
} from "../services/applicationService";

import ApplicationsTable from "../components/ApplicationsTable";
import SearchFilterBar from "../components/SearchFilterBar";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchApplications = async () => {
    try {
      const response = await getAllApplications({
        search,
        status,
      });

      setApplications(response.data.data || []);
    } catch (error) {
      console.log(error);
      setApplications([]);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchApplications();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (status !== "") {
      fetchApplications();
    }
  }, [status]);

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id);

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-4">

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <ApplicationsTable
        applications={applications}
        handleDelete={handleDelete}
      />

    </div>
  );
};

export default Applications;