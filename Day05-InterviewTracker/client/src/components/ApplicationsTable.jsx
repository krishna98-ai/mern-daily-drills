import { useNavigate } from "react-router-dom";

const ApplicationsTable = ({
  applications = [],
  handleDelete,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-800 bg-gray-900">

      <table className="w-full text-sm text-left text-gray-300">

        {/* HEADER */}
        <thead className="bg-gray-950 text-gray-400 text-xs uppercase">
          <tr>
            <th className="px-5 py-3">Company</th>
            <th className="px-5 py-3">Role</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Location</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-800">

          {applications.map((application) => (
            <tr
              key={application._id}
              className="hover:bg-gray-800/40 transition"
            >

              {/* Company (clickable) */}
              <td className="px-5 py-4">
                <button
                  onClick={() =>
                    navigate(`/applications/${application._id}`)
                  }
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  {application.companyName || "--"}
                </button>
              </td>

              {/* Role */}
              <td className="px-5 py-4">
                {application.jobRole || "--"}
              </td>

              {/* Status */}
              <td className="px-5 py-4">
                <span className="px-3 py-1 rounded-full text-xs bg-gray-700 text-gray-200">
                  {application.status || "--"}
                </span>
              </td>

              {/* Location */}
              <td className="px-5 py-4 text-gray-400">
                {application.location || "--"}
              </td>

              {/* Actions */}
              <td className="px-5 py-4 text-right space-x-3">

                <button
                  onClick={() =>
                    navigate(
                      `/applications/${application._id}/edit`
                    )
                  }
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(application._id)
                  }
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ApplicationsTable;