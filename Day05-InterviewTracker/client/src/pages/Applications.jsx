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
      applications.map((application) => (
        <div key={application._id}>
          <h3>{application.company}</h3>
          <p>{application.position}</p>
          <p>{application.status}</p>

          <button>Edit</button>
          <button>Delete</button>
        </div>
      ))
    )}
  </>
);
}

export default Applications