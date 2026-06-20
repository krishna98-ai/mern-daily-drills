import { useState,useEffect } from "react";
import {getAllApplications } from "../services/applicationService";


const Applications = () => {
  const [applications, setApplications] = useState([]);
 const fetchApplications = async () => {
    try {
      const response = await getAllApplications();
      setApplications(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchApplications()
  },[]);
  

return (
  <>
    <h1>Application renders</h1>

    {applications.length === 0 ? (
      <h2>No element</h2>
    ) : (
     <table>
  <thead>
    <tr>
      <th>Company</th>
      <th>Role</th>
      <th>Status</th>
      <th>Location</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {applications.map((application) => (
      <tr key={application._id}>
        <td>{application.companyName}</td>
        <td>{application.jobRole}</td>
        <td>{application.status}</td>
        <td>{application.location}</td>

        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    )}
  </>
);
}

export default Applications