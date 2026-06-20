import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../services/applicationService";

const CreateApplication = () => {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await createApplication({
        company,
        position,
        status,
        notes,
      });

      navigate("/applications");
    } catch (error) {
      console.log(error);
      alert("Failed to create application");
    }
  };

  return (
    <div>
      <h1>Create Application</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="OA">OA</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Selected">Selected</option>
        </select>

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">
          Create Application
        </button>
      </form>
    </div>
  );
};

export default CreateApplication;