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

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const fetchApplications = async () => {
    try {
      const response = await getAllApplications({
        search,
        status,
        page,
        limit,
      });

      const data = response.data.data;

      setApplications(data.applications);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
      setApplications([]);
      setTotalPages(1);
    }
  };

  // Search/Status change -> Page 1
  useEffect(() => {
    setPage(1);
  }, [search, status]);

  // Fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchApplications();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, status, page]);

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-6">

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

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">

          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 rounded bg-gray-800 disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 rounded bg-gray-800 disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default Applications;