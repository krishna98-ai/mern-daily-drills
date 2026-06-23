import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplicationById } from "../services/applicationService";

const ApplicationDetail = () => {
  const { id } = useParams();

  const [application, setApplication] = useState(null);

  const fetchApplication = async () => {
    try {
      const response = await getApplicationById(id);
      setApplication(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-300">
        Loading...
      </div>
    );
  }

  const Item = ({ label, value }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white mt-1 font-medium">
        {value || "--"}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      <div className="max-w-3xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
          <h1 className="text-2xl font-bold">
            {application.companyName || "--"}
          </h1>
        </div>

        {/* GRID INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Item label="Role" value={application.jobRole} />
          <Item label="Status" value={application.status} />
          <Item label="Location" value={application.location} />
          <Item label="Salary" value={application.salary} />

        </div>

        {/* LINK */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Job Link</p>
          <a
            href={application.jobLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 break-all"
          >
            {application.jobLink || "--"}
          </a>
        </div>

        {/* NOTES */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Notes</p>
          <p className="text-white mt-1 whitespace-pre-wrap">
            {application.notes || "--"}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ApplicationDetail;