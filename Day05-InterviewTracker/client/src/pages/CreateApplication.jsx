import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../services/applicationService";

const CreateApplication = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
const [jobRole, setJobRole] = useState("");
const [jobLink, setJobLink] = useState("");
const [location, setLocation] = useState("");
const [salary, setSalary] = useState("");
const [notes, setNotes] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
   await createApplication({
  companyName,
  jobRole,
  jobLink,
  location,
  salary,
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
  value={companyName}
  onChange={(e) => setCompanyName(e.target.value)}
/>

<input
  type="text"
  placeholder="Job Role"
  value={jobRole}
  onChange={(e) => setJobRole(e.target.value)}
/>

<input
  type="text"
  placeholder="Job Link"
  value={jobLink}
  onChange={(e) => setJobLink(e.target.value)}
/>

<input
  type="text"
  placeholder="Location"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>

<input
  type="number"
  placeholder="Salary"
  value={salary}
  onChange={(e) => setSalary(e.target.value)}
/>

<textarea
  placeholder="Notes"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
/>
<button type="submit">create application</button>
    </form>
    </div>
  );
};

export default CreateApplication;