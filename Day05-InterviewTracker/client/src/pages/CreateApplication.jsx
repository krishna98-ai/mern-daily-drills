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
  if (isEditMode) {
    fetchApplication();
  }
}, [isEditMode, id]);
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "companyName":
        if (!value.trim()) error = "Company name is required";
        break;

      case "jobRole":
        if (!value.trim()) error = "Job role is required";
        break;

      case "status":
        if (!value) error = "Status is required";
        break;

      case "jobLink":
        if (value.trim() && !/^https?:\/\/.+/.test(value)) {
          error = "Enter valid URL (http/https required)";
        }
        break;

      case "location":
        if (value.trim() && value.length > 100) {
          error = "Location too long";
        }
        break;

      case "salary":
        if (value !== "" && Number(value) < 0) {
          error = "Salary cannot be negative";
        }
        break;

      case "notes":
        if (value.trim() && value.length > 500) {
          error = "Notes max 500 characters allowed";
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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateAll = () => {
    const companyErr = validateField("companyName", companyName);
    const roleErr = validateField("jobRole", jobRole);
    const statusErr = validateField("status", status);
    const linkErr = validateField("jobLink", jobLink);
    const locationErr = validateField("location", location);
    const salaryErr = validateField("salary", salary);
    const notesErr = validateField("notes", notes);

    return !(
      companyErr ||
      roleErr ||
      statusErr ||
      linkErr ||
      locationErr ||
      salaryErr ||
      notesErr
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

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
      alert(
        isEditMode
          ? "Failed to update application"
          : "Failed to create application"
      );
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
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onBlur={handleBlur}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName}</p>
          )}

          <input
            type="text"
            name="jobRole"
            placeholder="Job Role"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            onBlur={handleBlur}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800"
          />
          {errors.jobRole && (
            <p className="text-red-500 text-sm">{errors.jobRole}</p>
          )}

          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            onBlur={handleBlur}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800"
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

          <input
            type="text"
            name="jobLink"
            placeholder="Job Link"
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
            onBlur={handleBlur}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800"
          />
          {errors.jobLink && (
            <p className="text-red-500 text-sm">{errors.jobLink}</p>
          )}

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={handleBlur}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            onBlur={handleBlur}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800"
          />
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary}</p>
          )}

          <textarea
            name="notes"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={handleBlur}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-gray-800"
          />
          {errors.notes && (
            <p className="text-red-500 text-sm">{errors.notes}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg"
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