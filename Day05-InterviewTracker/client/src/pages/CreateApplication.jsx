import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createApplication,
  updateApplication,
  getApplicationById,
} from "../services/applicationService";

const CreateApplication = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [jobLink, setJobLink] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchApplication = async () => {
    try {
      const response = await getApplicationById(id);
      const app = response.data.data;

      setCompanyName(app.companyName || "");
      setJobRole(app.jobRole || "");
      setStatus(app.status || "Applied");
      setJobLink(app.jobLink || "");
      setLocation(app.location || "");
      setSalary(app.salary || "");
      setNotes(app.notes || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditMode) fetchApplication();
  }, [id]);

  // Validation function
  const validate = () => {
    let err = {};

    if (!companyName.trim()) err.companyName = "Company name is required";
    if (!jobRole.trim()) err.jobRole = "Job role is required";
    if (!status) err.status = "Status is required";

    if (jobLink && !jobLink.startsWith("http")) {
      err.jobLink = "Enter a valid URL (must start with http/https)";
    }

    if (salary && Number(salary) < 0) {
      err.salary = "Salary cannot be negative";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = {
      companyName,
      jobRole,
      status,
      jobLink,
      location,
      salary,
      notes,
    };

    try {
      setLoading(true);

      if (isEditMode) {
        await updateApplication(id, data);
      } else {
        await createApplication(data);
      }

      navigate("/applications");
    } catch (error) {
      console.log(error);
      alert(isEditMode ? "Failed to update application" : "Failed to create application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">

        <h1 className="text-2xl font-semibold text-center">
          {isEditMode ? "Edit Application" : "Create Application"}
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">

          {/* Company */}
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 outline-none focus:border-blue-500"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName}</p>
          )}

          {/* Role */}
          <input
            type="text"
            placeholder="Job Role"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 outline-none focus:border-blue-500"
          />
          {errors.jobRole && (
            <p className="text-red-500 text-sm">{errors.jobRole}</p>
          )}

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 outline-none focus:border-blue-500"
          >
            <option value="Applied">Applied</option>
            <option value="OA">OA</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Selected">Selected</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}

          {/* Job Link */}
          <input
            type="text"
            placeholder="Job Link"
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 outline-none focus:border-blue-500"
          />
          {errors.jobLink && (
            <p className="text-red-500 text-sm">{errors.jobLink}</p>
          )}

          {/* Location */}
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 outline-none focus:border-blue-500"
          />

          {/* Salary */}
          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 outline-none focus:border-blue-500"
          />
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary}</p>
          )}

          {/* Notes */}
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800 outline-none focus:border-blue-500"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-medium disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Application"
              : "Create Application"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default CreateApplication;